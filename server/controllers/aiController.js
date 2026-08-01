// controllers/aiController.js
const axios = require('axios');
const pool = require('../db');
const bookingController = require('./bookingController');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// ---------------- STEP 1: Ask Gemini to extract structured filters ----------------
async function extractCarFilters(userMessage) {
  const prompt = `
You are a filter-extraction engine for a car rental search system.
Extract search filters from the user's message and respond with ONLY valid JSON, no markdown, no explanation.

Schema:
{
  "type": string | null,          // e.g. "SUV", "Sedan", "Hatchback"
  "transmission": string | null,  // "automatic" or "manual"
  "seats": number | null,         // minimum number of seats needed
  "max_price": number | null      // maximum daily price in SAR
}

If a field is not mentioned, set it to null.

User message: "${userMessage}"
`.trim();

  const response = await axios.post(
    GEMINI_URL,
    { contents: [{ role: 'user', parts: [{ text: prompt }] }] },
    { timeout: 15000 }
  );

  const rawText = response.data.candidates[0].content.parts[0].text;
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('⚠️ Failed to parse Gemini filter JSON:', rawText);
    return { type: null, transmission: null, seats: null, max_price: null };
  }
}

// ---------------- STEP 2: Build SQL from filters, matching your real cars schema ----------------
async function searchCars(filters) {
  const conditions = ['available = true']; // only show available cars
  const values = [];
  let idx = 1;

  if (filters.type) {
    conditions.push(`LOWER(type) = LOWER($${idx++})`);
    values.push(filters.type);
  }
  if (filters.transmission) {
    conditions.push(`LOWER(transmission) = LOWER($${idx++})`);
    values.push(filters.transmission);
  }
  if (filters.seats) {
    conditions.push(`seats >= $${idx++}`);
    values.push(filters.seats);
  }
  if (filters.max_price) {
    conditions.push(`price <= $${idx++}`);
    values.push(filters.max_price);
  }

  const whereClause = `WHERE ${conditions.join(' AND ')}`;
  const query = `
    SELECT id, carname, price, "imageUrl", description, type, seats, transmission, rating, discount
    FROM cars
    ${whereClause}
    ORDER BY price ASC
    LIMIT 5
  `;

  const result = await pool.query(query, values);
  return result.rows;
}

// ---------------- STEP 3: Format results into a natural-language reply ----------------
function formatReply(cars) {
  if (cars.length === 0) {
    return "I couldn't find any cars matching that. Want to try a different budget or car type?";
  }

  const lines = cars.map(c =>
    `🚗 ${c.carname} — ${c.seats || '?'} seats, ${c.transmission || 'N/A'}, ${c.price} SAR/day`
  );

  return `Here are some options for you:\n${lines.join('\n')}`;
}

// ---------------- ROUTE HANDLER: POST /api/ai/chat ----------------
exports.chatWithAI = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Message required.' });

  try {
    const filters = await extractCarFilters(message);
    const cars = await searchCars(filters);
    const reply = formatReply(cars);

    res.json({ reply, filters, results: cars });
  } catch (err) {
    console.error('🔥 AI search error:', err.message);
    res.status(500).json({ reply: 'Sorry, search is unavailable right now.' });
  }
};

// ---------------- STEP 4: Extract booking intent via Gemini ----------------
async function extractBookingIntent(userMessage) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const prompt = `
You are a booking-intent extraction engine for a car rental system.
Today's date is ${today}.
Extract booking details from the user's message and respond with ONLY valid JSON, no markdown, no explanation.

Schema:
{
  "carName": string | null,     // e.g. "Kia Sportage"
  "startDate": string | null,   // YYYY-MM-DD, resolve relative terms like "tomorrow" using today's date
  "endDate": string | null      // YYYY-MM-DD, if not mentioned assume same as startDate + 1 day
}

User message: "${userMessage}"
`.trim();

  const response = await axios.post(
    GEMINI_URL,
    { contents: [{ role: 'user', parts: [{ text: prompt }] }] },
    { timeout: 15000 }
  );

  const rawText = response.data.candidates[0].content.parts[0].text;
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('⚠️ Failed to parse booking intent JSON:', rawText);
    return { carName: null, startDate: null, endDate: null };
  }
}

// ---------------- STEP 5: Find car by name (fuzzy match) ----------------
async function findCarByName(carName) {
  const result = await pool.query(
    `SELECT id, carname, price FROM cars WHERE carname ILIKE $1 AND available = true LIMIT 1`,
    [`%${carName}%`]
  );
  return result.rows[0] || null;
}

// ---------------- ROUTE HANDLER: POST /api/ai/book ----------------
exports.bookWithAI = async (req, res) => {
  const { message } = req.body;
  const userId = req.user.id; // requires authenticateToken

  if (!message) return res.status(400).json({ reply: 'Message required.' });

  try {
    const intent = await extractBookingIntent(message);

    if (!intent.carName) {
      return res.json({ reply: "Which car would you like to book, and for what dates?" });
    }

    const car = await findCarByName(intent.carName);
    if (!car) {
      return res.json({ reply: `Sorry, I couldn't find a car matching "${intent.carName}".` });
    }

    if (!intent.startDate) {
      return res.json({ reply: `What date would you like to book the ${car.carname} for?` });
    }

    const endDate = intent.endDate || intent.startDate;

    const { booking } = await bookingController.bookCarCore({
      userId,
      carId: car.id,
      startDate: intent.startDate,
      endDate,
      status: 'Pending'
    });

    return res.json({
      reply: `✅ Your booking for the ${car.carname} from ${intent.startDate} to ${endDate} has been created (status: ${booking.status}). Booking ID: ${booking.id}.`,
      booking
    });

  } catch (err) {
    console.error('🔥 AI booking error:', err.message);

    if (err.statusCode === 409) {
      return res.json({ reply: `Sorry, that car is already booked for those dates. Want to try different dates?` });
    }

    return res.status(500).json({ reply: 'Sorry, booking is unavailable right now.' });
  }
};

// ================================================================
// PHASE 4 — ADMIN AI ANALYTICS
// ================================================================

const ALLOWED_QUERY_TYPES = [
  'bookings_count',
  'total_revenue',
  'top_car_revenue',
  'bookings_by_status',
  'most_popular_car'
];

const ALLOWED_DATE_FILTERS = ['today', 'this_week', 'this_month', 'all_time'];

// ---------------- STEP 1: Classify the admin's question via Gemini ----------------
async function extractAdminIntent(userMessage) {
  const prompt = `
You are an intent-classification engine for a car rental admin analytics assistant.
Classify the admin's question and respond with ONLY valid JSON, no markdown, no explanation.

Schema:
{
  "queryType": one of ["bookings_count", "total_revenue", "top_car_revenue", "bookings_by_status", "most_popular_car"],
  "dateFilter": one of ["today", "this_week", "this_month", "all_time"],
  "limit": number  // only relevant for top_car_revenue / most_popular_car, default 1
}

Examples:
"How many bookings today?" -> {"queryType":"bookings_count","dateFilter":"today","limit":1}
"Which car earns the most revenue?" -> {"queryType":"top_car_revenue","dateFilter":"all_time","limit":1}
"Total revenue this month" -> {"queryType":"total_revenue","dateFilter":"this_month","limit":1}
"Show me the top 3 cars by revenue" -> {"queryType":"top_car_revenue","dateFilter":"all_time","limit":3}

Admin question: "${userMessage}"
`.trim();

  const response = await axios.post(
    GEMINI_URL,
    { contents: [{ role: 'user', parts: [{ text: prompt }] }] },
    { timeout: 15000 }
  );

  const rawText = response.data.candidates[0].content.parts[0].text;
  const cleaned = rawText.replace(/```json|```/g, '').trim();

  let intent;
  try {
    intent = JSON.parse(cleaned);
  } catch (err) {
    console.error('⚠️ Failed to parse admin intent JSON:', rawText);
    return null;
  }

  // Whitelist validation — never trust Gemini's output blindly
  if (!ALLOWED_QUERY_TYPES.includes(intent.queryType)) return null;
  if (!ALLOWED_DATE_FILTERS.includes(intent.dateFilter)) intent.dateFilter = 'all_time';
  if (!Number.isInteger(intent.limit) || intent.limit < 1 || intent.limit > 20) intent.limit = 1;

  return intent;
}

// ---------------- STEP 2: Map dateFilter (whitelisted) to a safe SQL condition ----------------
function dateFilterToSQL(dateFilter, column = 'start_date') {
  switch (dateFilter) {
    case 'today':
      return `${column}::date = CURRENT_DATE`;
    case 'this_week':
      return `${column} >= date_trunc('week', CURRENT_DATE)`;
    case 'this_month':
      return `${column} >= date_trunc('month', CURRENT_DATE)`;
    case 'all_time':
    default:
      return `TRUE`;
  }
}

// ---------------- STEP 3: Run the actual whitelisted query ----------------
async function runAdminQuery(intent) {
  const dateCondition = dateFilterToSQL(intent.dateFilter);

  switch (intent.queryType) {

    case 'bookings_count': {
      const result = await pool.query(
        `SELECT COUNT(*) FROM bookings WHERE ${dateCondition} AND status != 'Cancelled'`
      );
      return { count: parseInt(result.rows[0].count, 10) };
    }

    case 'total_revenue': {
      const result = await pool.query(`
        SELECT COALESCE(SUM(c.price * GREATEST(EXTRACT(DAY FROM (b.end_date - b.start_date))::int, 1)), 0) AS revenue
        FROM bookings b
        JOIN cars c ON b.car_id = c.id
        WHERE ${dateCondition} AND b.status != 'Cancelled'
      `);
      return { revenue: parseFloat(result.rows[0].revenue) };
    }

    case 'top_car_revenue': {
      const result = await pool.query(`
        SELECT c.carname,
               SUM(c.price * GREATEST(EXTRACT(DAY FROM (b.end_date - b.start_date))::int, 1)) AS revenue
        FROM bookings b
        JOIN cars c ON b.car_id = c.id
        WHERE ${dateCondition} AND b.status != 'Cancelled'
        GROUP BY c.carname
        ORDER BY revenue DESC
        LIMIT $1
      `, [intent.limit]);
      return { cars: result.rows };
    }

    case 'most_popular_car': {
      const result = await pool.query(`
        SELECT c.carname, COUNT(*) AS bookings_count
        FROM bookings b
        JOIN cars c ON b.car_id = c.id
        WHERE ${dateCondition} AND b.status != 'Cancelled'
        GROUP BY c.carname
        ORDER BY bookings_count DESC
        LIMIT $1
      `, [intent.limit]);
      return { cars: result.rows };
    }

    case 'bookings_by_status': {
      const result = await pool.query(`
        SELECT status, COUNT(*) AS count
        FROM bookings
        WHERE ${dateCondition}
        GROUP BY status
      `);
      return { statuses: result.rows };
    }

    default:
      return null;
  }
}

// ---------------- STEP 4: Format the result into natural language ----------------
function formatAdminReply(intent, data) {
  const periodLabel = {
    today: 'today',
    this_week: 'this week',
    this_month: 'this month',
    all_time: 'overall'
  }[intent.dateFilter];

  switch (intent.queryType) {
    case 'bookings_count':
      return `📊 There ${data.count === 1 ? 'is' : 'are'} ${data.count} booking${data.count === 1 ? '' : 's'} ${periodLabel}.`;

    case 'total_revenue':
      return `💰 Total revenue ${periodLabel}: ${data.revenue.toFixed(2)} SAR.`;

    case 'top_car_revenue':
      if (data.cars.length === 0) return `No revenue data found ${periodLabel}.`;
      return `🏆 Top earning car${data.cars.length > 1 ? 's' : ''} ${periodLabel}:\n` +
        data.cars.map((c, i) => `${i + 1}. ${c.carname} — ${parseFloat(c.revenue).toFixed(2)} SAR`).join('\n');

    case 'most_popular_car':
      if (data.cars.length === 0) return `No booking data found ${periodLabel}.`;
      return `🔥 Most booked car${data.cars.length > 1 ? 's' : ''} ${periodLabel}:\n` +
        data.cars.map((c, i) => `${i + 1}. ${c.carname} — ${c.bookings_count} bookings`).join('\n');

    case 'bookings_by_status':
      if (data.statuses.length === 0) return `No bookings found ${periodLabel}.`;
      return `📋 Bookings by status ${periodLabel}:\n` +
        data.statuses.map(s => `${s.status}: ${s.count}`).join('\n');

    default:
      return "I couldn't understand that analytics request.";
  }
}

// ---------------- ROUTE HANDLER: POST /api/ai/admin ----------------
exports.adminAIQuery = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Message required.' });

  try {
    const intent = await extractAdminIntent(message);

    if (!intent) {
      return res.json({
        reply: "I can answer things like 'How many bookings today?', 'Total revenue this month', or 'Which car earns the most revenue?'. Could you rephrase?"
      });
    }

    const data = await runAdminQuery(intent);
    const reply = formatAdminReply(intent, data);

    res.json({ reply, intent, data });

  } catch (err) {
    console.error('🔥 Admin AI error:', err.message);
    res.status(500).json({ reply: 'Sorry, analytics are unavailable right now.' });
  }
};