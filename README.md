# CarApplication

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# 🚗 DriveAI — AI-Powered Car Rental Platform

An end-to-end car rental platform that automates the entire customer and admin journey using AI — from natural-language search and booking, to automated email confirmations, to conversational admin analytics. Built with Angular, Node.js/Express, PostgreSQL, n8n, and Google's Gemini API, fully containerized and deployed with HTTPS on live infrastructure.

**Live demo:** https://mujeeba-drive-ai.duckdns.org

---

## 💡 The Problem

Car rental staff lose hours every day to repetitive work: answering the same customer questions, manually checking date-range availability, generating reports by hand, and sending booking confirmations one by one. DriveAI automates all of it — not as a chatbot bolted onto an existing site, but as seven integrated AI-driven phases covering the full operational lifecycle.

---

## ✨ What It Does — 7 AI Phases

| Phase | Feature | What it does |
|---|---|---|
| 1 | **AI Chatbot** | Conversational assistant answers customer questions in natural language |
| 2 | **Smart Car Search** | "Automatic SUV for 5 people under 250 SAR" → Gemini extracts structured filters → safe parameterized SQL query |
| 3 | **AI Booking Assistant** | "Book the Kia Sportage for tomorrow" → parses intent, checks real date-range availability, creates the booking |
| 4 | **Admin AI Analytics** | Admins ask "How many bookings today?" or "Which car earns the most revenue?" in plain English |
| 5 | **Email Automation** | Every booking automatically triggers an HTML invoice emailed via Gmail OAuth2 |
| 6 | **WhatsApp Notifications** | Booking confirmations via WhatsApp Business API (dummy-mode fallback built in for demo reliability) |
| 7 | **AI Dashboard** | Visual analytics — revenue trends, popular cars, booking status, customer growth |

---

## 🏗️ Architecture
Nginx sits in front of everything as a reverse proxy, routing `/api/*` to the backend, `/n8n/*` to the automation layer, and serving the Angular SPA — all behind a single HTTPS-secured domain (Let's Encrypt).

---

## 🔒 Security-First AI Design

A key design decision: **the LLM never generates or touches raw SQL.**

- **Phase 4 (Admin AI)** works by having Gemini classify the admin's question into a fixed, whitelisted set of query types (`bookings_count`, `total_revenue`, `top_car_revenue`, etc.) and a whitelisted date range. The backend then runs pre-built, parameterized queries matching that classification — giving the natural-language experience without any SQL-injection surface.
- **Phase 2 (Search)** follows the same pattern: Gemini extracts structured filters (type, price, seats, transmission) as JSON, and the backend builds a safe parameterized query from validated fields — never from raw model output.

---

## 🧱 Shared Core Logic, Zero Duplication

Manual bookings (via the web form) and AI-driven bookings (via chat) both run through a single shared function, `bookCarCore()`, which:
- Checks real date-range overlap against existing bookings (not just car existence)
- Performs the insert
- Fires a non-blocking notification event

This means both booking paths stay consistent — a bug fix or business rule change only needs to happen once.

---

## 🛡️ Resilient by Design

- Email/WhatsApp notifications are **fire-and-forget** — a failure in the notification pipeline never blocks or fails the booking transaction itself
- The AI chatbot has a **rule-based fallback** if the n8n/Gemini pipeline is ever unavailable, so the assistant never goes fully silent
- All AI-facing endpoints validate and whitelist model output before it reaches the database layer

---

## 🐳 Deployment

Fully containerized with Docker Compose — four services running together:

| Service | Role |
|---|---|
| `frontend` | Angular build served via Nginx, HTTPS via Let's Encrypt |
| `backend` | Node.js/Express API |
| `db` | PostgreSQL 17 |
| `n8n` | Workflow automation engine orchestrating Gemini, Gmail, and WhatsApp |

```bash
docker compose up -d --build
```

Deployed on AWS EC2 with a DuckDNS domain and a free Let's Encrypt SSL certificate — this is a live, internet-reachable deployment, not a localhost demo.

---

## 🛠️ Tech Stack

- **Frontend:** Angular 21, amCharts4 (dashboard visualizations), Bootstrap
- **Backend:** Node.js, Express, PostgreSQL, JWT auth, bcryptjs
- **AI/Automation:** n8n, Google Gemini API
- **Infrastructure:** Docker, Docker Compose, Nginx (reverse proxy), Let's Encrypt, AWS EC2

---

## 📦 Project Structure

---

## 🚀 Running Locally

```bash
git clone <repo-url>
cd car_application
cp .env.example .env   # fill in your own secrets
docker compose up -d --build
```

The app will be available at `http://localhost`, with n8n at `http://localhost/n8n/`.

## Environment Variables

| Key | Purpose |
|---|---|
| `JWT_SECRET` | Signs authentication tokens |
| `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT` | PostgreSQL connection |
| `GEMINI_API_KEY` | Google Gemini API access |
| `N8N_WEBHOOK_URL`, `N8N_BOOKING_WEBHOOK_URL` | Backend → n8n automation triggers |
| `N8N_USER`, `N8N_PASSWORD` | n8n editor basic auth |

## Database

Schema lives in `server/database.sql`. Tables: `users`, `cars`, `bookings`, `payments`.

Default admin login (demo/local only — change in production):
`admin@gmail.com` / `123456`

---

## 🎯 What Makes This Different

Most AI-integrated projects wrap a single chatbot around existing functionality. DriveAI treats AI as infrastructure across the entire business — search, booking, admin reporting, and communications all share the same safety-first design pattern (classify intent → validate → execute), and the whole system is deployed as a real, HTTPS-secured, internet-facing service rather than a local demo.