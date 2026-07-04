# AGENTS.md

## Project

SoulfulArt — ecommerce platform for artisan products. React 19 + Vite + Tailwind CSS 4 (client) / Express 5 + MySQL 8 + Cloudinary (server).

## Structure

Two independent packages (not a monorepo — no workspace config):

- `client/` — React SPA (Vite), Tailwind CSS 4 via `@tailwindcss/vite`, deployed to GitHub Pages
- `server/` — Express API, ES modules (`"type": "module"`), nodemon for dev
- `database/` — SQL seed files (`soulfulart.sql`)

## Commands

```bash
# Backend (must be running for client API calls)
cd server && npm run dev    # nodemon on port 3001

# Frontend
cd client && npm run dev    # Vite dev server

# Lint (client only)
cd client && npm run lint   # ESLint flat config

# DB export utility
cd server && npm run db:export

# Deploy to GitHub Pages
cd client && npm run deploy  # gh-pages -d dist
```

No test suites exist. No typecheck command. No CI workflows.

## Environment

Server needs `.env` (copy from `server/.env.example`):
- MySQL connection: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (default: `soulfulart`)
- Cloudinary: `CLOUDINARY_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

Client needs `.env` with `VITE_` prefix (already present):
- `VITE_CLOUDINARY_*` for image uploads
- `VITE_URL` for API base URL (default: `http://localhost:3001`)

MySQL must be running with `database/soulfulart.sql` imported before server starts.

## Conventions

- Server: ES modules (`import`/`export`), Express 5, controller/service/model pattern (`server/controller/`, `server/services/`, `server/db/`)
- Client: JSX files (`.jsx`), React Router v7, context-based state (`client/src/context/`), custom hooks (`client/src/hook/`)
- Client components organized under `client/src/UI/pages/` and `client/src/UI/components/{admin,common,home}/`
- ESLint `no-unused-vars` ignores vars starting with uppercase or underscore: `varsIgnorePattern: '^[A-Z_]'`
- API routes: `/api/items` and `/api/categories`
- Vite config allows `.loca.lt` hosts for localtunnel

## Gotchas

- Client and server run independently — you must start both for full functionality
- No build step verification exists; run `cd client && npm run build` to check for build errors
- The `client/.env` contains API secrets (Cloudinary) — do not commit or expose
- `start_ln.sh` and `start.bat` launch both servers (Kitty terminal on Linux, cmd on Windows)
