// controllers/chatController.js
const axios = require('axios');
const pool = require('../db'); // PostgreSQL connection pool

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL; 
// e.g. https://your-n8n-domain/webhook/chatbot

// ---------------- FALLBACK CHAT LOGIC (rule-based, uses DB directly) ----------------
async function getFallbackResponse(message) {
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

// ---------------- PRIMARY: CALL n8n -> GEMINI ----------------
async function getAIResponse(message, sessionId) {
  if (!N8N_WEBHOOK_URL) {
    console.warn('⚠️ N8N_WEBHOOK_URL not set — falling back to rule-based logic');
    return getFallbackResponse(message);
  }

  try {
    const response = await axios.post(
      N8N_WEBHOOK_URL,
      { message, sessionId: sessionId || `session-${Date.now()}` },
      { timeout: 15000 } // avoid hanging forever if n8n is slow/down
    );

    if (response.data && response.data.reply) {
      return response.data.reply;
    }

    console.warn('⚠️ n8n responded without a reply field, using fallback');
    return getFallbackResponse(message);
  } catch (err) {
    console.error('🔥 n8n/Gemini call failed:', err.message);
    // graceful degrade instead of erroring out the whole chat
    return getFallbackResponse(message);
  }
}

// ---------------- ROUTE HANDLERS ----------------

// POST /api/chat
exports.chat = async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message) return res.status(400).json({ reply: 'Message required.' });

  try {
    const reply = await getAIResponse(message, sessionId);
    res.json({ reply, sessionId: sessionId || `session-${Date.now()}` });
  } catch (err) {
    console.error('Chat handler error:', err);
    res.status(500).json({ reply: 'Server error.' });
  }
};

// POST /api/chat/send
exports.sendMessage = async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message) return res.status(400).json({ reply: 'Message required.' });

  try {
    const reply = await getAIResponse(message, sessionId);
    res.json({ reply, sessionId: sessionId || `session-${Date.now()}` });
  } catch (err) {
    console.error('SendMessage handler error:', err);
    res.status(500).json({ reply: 'Server error.' });
  }
};