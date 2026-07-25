const { Pool } = require('pg');

// On Replit, PG* vars are set automatically; fall back to DB_* for local Docker
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST || process.env.DB_HOST,
  user: process.env.PGUSER || process.env.DB_USER,
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD,
  database: process.env.PGDATABASE || process.env.DB_NAME,
  port: process.env.PGPORT || process.env.DB_PORT || 5432,
  ssl: process.env.PGHOST ? { rejectUnauthorized: false } : false,
});

module.exports = pool;