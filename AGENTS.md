# almoq3 platform — project memory

> Persistent context for AI agents working on this repository. Keep it current.

## Identity

- **Product:** almoq3 — software studio platform (public site + admin + client operations).
- **Repository:** https://github.com/mustfamoolan/almoq33 (branch `main`).
- **Primary domain:** `almoq3.com` and `www.almoq3.com`.
- **Existing subdomain:** `ai.almoq3.com` serves the clinic WhatsApp assistant. It belongs to a **separate project** (`whtsappai`) and must not be broken.
- **Framework:** almoq3 CLI v2.1.3 (`D:\almoq3cli`, `almoq3 new`).

## Stack

- Go 1.26, Fiber v2, GORM
- React 18 + Vite + Tailwind CSS (built into `public/`, served by Go)
- PostgreSQL 15, Redis 7
- Docker + Docker Compose v5

## Server

- **VPS:** `72.60.180.203`, Ubuntu 24.04.3 LTS, 2 vCPU, 8 GB RAM, 96 GB SSD.
- **Existing project:** `/root/whtsappai` — Go app on `127.0.0.1:8080`, PostgreSQL, Redis.
- **Edge reverse proxy:** `/opt/edge` — Caddy on host network, ports 80/443, routes:
  - `almoq3.com`, `www.almoq3.com` → `127.0.0.1:8081` (this project)
  - `ai.almoq3.com` → `127.0.0.1:8080` (`whtsappai`)
- **This project deploys to:** `/opt/almoq33`, publishes `127.0.0.1:8081`.
- **Deploy:** `git pull && docker compose up -d --build` (run in `/opt/almoq33`).
- **Secrets:** `/opt/almoq33/.env` (mode 600) holds `APP_KEY`, `DB_PASSWORD`, `DB_DATABASE`, `DB_USERNAME`. Never commit it.
- **Rollback:** `/root/whtsappai/docker-compose.yml.bak-2026-11-03` restores the old Caddy setup.
- **DNS:** Hostinger nameservers (`ns1/ns2.dns-parking.com`). All A records point to the VPS.

## Product scope

1. **Public landing page** — showcase software products for sale, allow project/implementation requests.
2. **Admin panel** — manage products, purchase requests, contact messages, clients, reports.
3. **WhatsApp service** — internal WhatsApp socket/connection, inbox, manual replies, later AI-assisted support and order completion.
4. **Licensing** — generate activation keys, offline activation, track customers and devices for the studio's software products.
5. **Integrations** — connect the studio's desktop/mobile products and their customers to the platform.
6. **Reports** — sales, projects, clients.

## Current status (2026-11-03)

- Project scaffolded with `almoq3 new almoq33`.
- Single landing page displaying the `almoq3` wordmark only (deployment smoke test).
- Production Dockerfile (multi-stage: Node → Go → Alpine, non-root user).
- Compose stack: app + PostgreSQL + Redis, app bound to `127.0.0.1:8081`.
- `bootstrap/config.go` tolerates a missing `.env` and reads process environment variables.

## Conventions

- Never commit `.env`, secrets, tokens, certificates, `node_modules`, or built assets (`public/`).
- Keep each deployment isolated: its own Compose project name, volumes, and network.
- Do not expose database or Redis ports publicly.
- Frontend source lives in `frontend/`; build output goes to `public/`.
- API routes live in `routes/api.go`; web/static routes in `routes/web.go`.
- UI design will be handled in a dedicated phase — do not invent branding beyond the current `almoq3` wordmark.
