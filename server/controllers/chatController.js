// controllers/chatController.js
const pool = require('../db'); // Make sure this is your PostgreSQL connection pool

// ---------------- CORE CHAT LOGIC ----------------
async function getChatResponse(message) {
  const lowerMsg = message.toLowerCase().trim();

  // ----- Greetings -----
  if (['hi', 'hello', 'hey'].includes(lowerMsg)) {
    return 'Hello! Welcome to our car rental service. 🚗 How can I help you today?';
  }

  // ----- Cars query -----
  if (lowerMsg.includes('car')) {
    try {
      const cars = await pool.query('SELECT * FROM cars LIMIT 5');
      if (cars.rows.length === 0) return 'Sorry, no cars are available right now.';
      return cars.rows.map(c => `🚗 ${c.carname} - 💰 ${c.price} SAR`).join('\n');
    } catch (err) {
      console.error('Error fetching cars:', err);
      return 'Sorry, cannot fetch cars right now.';
    }
  }

  // ----- Bookings query -----
  if (lowerMsg.includes('booking')) {
    try {
      const bookings = await pool.query('SELECT * FROM bookings LIMIT 5');
      if (bookings.rows.length === 0) return 'You have no bookings.';
      return bookings.rows.map(b => `📅 Booking ID: ${b.id}`).join('\n');
    } catch (err) {
      console.error('Error fetching bookings:', err);
      return 'Sorry, cannot fetch bookings right now.';
    }
  }

  // ----- Default fallback -----
  return "I'm not sure how to answer that. Try asking about cars or bookings!";
}

// ---------------- ROUTE HANDLERS ----------------

// POST /api/chat
exports.chat = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Message required.' });

  try {
    const reply = await getChatResponse(message);
    res.json({ reply });
  } catch (err) {
    console.error('Chat handler error:', err);
    res.status(500).json({ reply: 'Server error.' });
  }
};

// POST /api/chat/send (simple echo placeholder)
exports.sendMessage = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Message required.' });

  res.json({ reply: `You said: ${message}` });
};