# OmniPriv Partner & Channel Admin Portal

Dedicated enterprise B2B partner workspace and SecOps channel administration console for **portal.omnipriv.com**.

## Architecture & Features

- **Domain**: Designed to run as a standalone Next.js application at `portal.omnipriv.com`.
- **Database**: PostgreSQL (shares the core enterprise database `webomni`).
- **Partner Portal**:
  - Self-service partner organization registration (`/sign-up`)
  - Direct authentication without artificial "application pending" gating (`/sign-in`)
  - Real-time deal registration with automated domain conflict arbitration (`/partner-portal/deals`)
  - Inbound lead management with 7-day SLA acceptance workflow (`/partner-portal/leads`)
  - Program tiers (Registered, Silver, Gold, Platinum) with commercial margin rebates.
- **Channel Administration Console**:
  - Internal SecOps purview (`/channel-admin`)
  - Deal protection lock arbitration (granting 90-day locks or declining competing registrations)
  - Partner organization tier overrides & partner manager assignment
  - Inbound lead dispatch & territory routing
  - Immutable cryptographically timestamped audit stream

## Local Development

```bash
cd portal
npm install
npm run dev
```

App runs on `http://localhost:3001` (or next available port).

## Deployment to Vercel (portal.omnipriv.com)

1. **Option A (Separate Repo or Branch)**:
   - Create and push a new branch `portal` (or a dedicated repository `OmniPriv-Portal`).
   - In Vercel, create a new project importing this branch/repository.
   - Set the domain in Vercel to `portal.omnipriv.com`.

2. **Option B (Monorepo root directory setting)**:
   - In Vercel Project Settings > General:
   - Set **Root Directory** to `portal`.
   - Set **Custom Domain** to `portal.omnipriv.com`.

3. **Required Environment Variables**:
   - `DATABASE_URL`: Connection string to PostgreSQL (`postgresql://...`).
   - `SESSION_SECRET`: Secure 64-char hex string for session token signing.
   - `NEXT_PUBLIC_MAIN_SITE_URL`: `https://omnipriv.com`

## Test Matrix

Run tests inside the `portal` folder:

```bash
npm run test:kaspersky   # 10/10 Kaspersky B2B Channel Workflow E2E validation
npm run test:partner     # 15/15 Partner security & audit matrix
```
