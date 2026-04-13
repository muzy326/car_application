const { Pool } = require('pg');
require('dotenv').config();

console.log("Connected DB:", process.env.DB_NAME);

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  // database: process.env.DB_NAME,
   database:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DB_NAME   // 👈 use test DB
      : process.env.DB_NAME  
});

// optional (for transactions if needed)
const getClient = async () => {
  return await pool.connect();
};

module.exports = pool;   // ✅ EXPORT ONLY pool