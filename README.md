# TalentBridgeHR Backend (Prisma + PostgreSQL)

## Prerequisites
- Node 18+
- PostgreSQL running
- npm

## Setup
1. Clone repo and `cd talentbridgehr-backend`
2. Copy `.env.example` → `.env` and set values (DATABASE_URL, JWT_SECRET, etc.)
3. Install:
   ```
   npm install
   ```
4. Initialize Prisma client:
   ```
   npx prisma generate
   ```
5. Run migrations (dev):
   ```
   npx prisma migrate dev --name init
   ```
   This will create DB tables.

6. Start dev server:
   ```
   npm run dev
   ```
   Or production:
   ```
   npm start
   ```

## Endpoints (basic)
- `POST /api/v1/auth/register` — register user
- `POST /api/v1/auth/login` — login
- `GET /api/v1/users/me` — get profile (requires Bearer token)
- `POST /api/v1/clients` — create client (ADMIN/HR)
- `POST /api/v1/jobs` — create job (ADMIN/HR)
- `POST /api/v1/jobs/:jobId/applications` — apply to job

See code for more routes.
