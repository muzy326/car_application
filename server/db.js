const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,   // MUST be "db" in docker-compose
  port: process.env.DB_PORT || 5432,
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DB_NAME
      : process.env.DB_NAME
});

// ✅ REAL CONNECTION TEST
pool.connect()
  .then(client => {
    console.log("✅ PostgreSQL connected successfully");
    client.release();
  })
  .catch(err => {
    console.error("❌ PostgreSQL connection error:", err.message);
  });

module.exports = pool;