# almoq3

The almoq3 platform — software studio website, client portal, and internal management system.

Built with the [almoq3 framework](https://github.com/mustfamoolan/almoq3cli): **Go + Fiber** backend, **React + Vite** frontend, **PostgreSQL** and **Redis**, fully containerized.

## Stack

- **Backend:** Go 1.26, Fiber v2, GORM
- **Frontend:** React 18, Vite, Tailwind CSS
- **Database:** PostgreSQL 15
- **Cache / queues:** Redis 7
- **Runtime:** Docker Compose

## Local development

Requirements: Go 1.26+, Node 20+, Docker (optional).

```bash
# backend (serves the built frontend from ./public)
cp .env.example .env
go mod tidy
go run main.go

# frontend (hot reload on :5173)
cd frontend
npm install
npm run dev
```

Rebuild the frontend into `./public`:

```bash
cd frontend && npm run build
```

## Production

```bash
# on the server, inside /opt/almoq33
docker compose up -d --build
```

The app listens on `127.0.0.1:8081` and is published by the edge reverse proxy (Caddy) at `https://almoq3.com`.

## Project layout

```
app/          controllers, models, services, middleware
bootstrap/    config, database, cache, logger initialization
config/       typed configuration
database/     migrations and seeders
routes/       API and web routes
frontend/     React + Vite source
public/       built frontend assets served by Go
storage/      logs and uploads
```

## Roadmap

1. Public landing page: software products for sale, project requests.
2. Admin panel: products, orders, requests, contact messages, reports.
3. WhatsApp integration: internal socket, inbox, replies, AI-assisted support.
4. Licensing: activation keys, offline activation, customer and device tracking.
5. Integrations with the studio's desktop/mobile products.

## License

Proprietary — © almoq3. All rights reserved.
