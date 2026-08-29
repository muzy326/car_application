// const { Pool } = require('pg');

// // On Replit, PG* vars are set automatically; fall back to DB_* for local Docker
// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   host: process.env.PGHOST || process.env.DB_HOST,
//   user: process.env.PGUSER || process.env.DB_USER,
//   password: process.env.PGPASSWORD || process.env.DB_PASSWORD,
//   database: process.env.PGDATABASE || process.env.DB_NAME,
//   port: process.env.PGPORT || process.env.DB_PORT || 5432,
//   ssl: process.env.PGHOST ? { rejectUnauthorized: false } : false,
// });

// module.exports = pool;
const { Pool } = require('pg');

const isTest = process.env.NODE_ENV === 'test';

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: isTest ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: false,
});

// Safety net: if we're in test mode, double-check we're NOT connected to the real database.
if (isTest) {
  const dbName = process.env.TEST_DB_NAME;
  if (!dbName || !dbName.toLowerCase().includes('test')) {
    throw new Error(
      `🚫 Refusing to start: NODE_ENV is "test" but TEST_DB_NAME ("${dbName}") ` +
      `doesn't look like a test database. Check your .env file.`
    );
  }
  console.log(`🧪 Running in TEST mode — connected to database: ${dbName}`);
}

module.exports = pool;