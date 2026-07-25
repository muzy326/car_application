# CarApplication

A car rental web app with an Angular frontend and a Node.js/Express backend, backed by Replit's built-in PostgreSQL database.

## Stack

- **Frontend**: Angular 21 (port 5000)
- **Backend**: Node.js + Express (port 3000)
- **Database**: PostgreSQL (Replit-managed)

## Running the app

Two workflows run simultaneously:

| Workflow | Command | Port |
|----------|---------|------|
| `Start application` | `cd frontend && npx ng serve` | 5000 (webview) |
| `Backend API` | `cd server && node index.js` | 3000 (console) |

The Angular dev server proxies all `/api` requests to `http://localhost:3000` via `frontend/proxy.conf.json`.

## Environment / Secrets

| Key | Where | Notes |
|-----|-------|-------|
| `JWT_SECRET` | Replit Secret | Signs auth tokens |
| `DATABASE_URL`, `PG*` | Auto-set by Replit | PostgreSQL connection |
| `NODE_ENV` | Shared env var | `development` |
| `PORT` | Shared env var | `3000` (backend) |

## Database

Schema lives in `server/database.sql`. Tables: `users`, `cars`, `bookings`, `payments`.

Seed data (admin user + 3 cars) is applied on first run.

Default admin login: `admin@gmail.com` (password is bcrypt-hashed in the seed — see `server/database.sql`).

## Project structure

```
frontend/          Angular app
  src/
    environments/  environment.ts (apiUrl: '/api')
  proxy.conf.json  proxies /api → localhost:3000
server/
  index.js         Express entry point
  db.js            PostgreSQL pool (uses Replit PG* env vars)
  routes/          API routes
  controllers/     Business logic
  models/          DB query helpers
  database.sql     Schema + seed data
```

## User preferences

(none yet)
