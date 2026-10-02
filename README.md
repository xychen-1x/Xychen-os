# Xychen OS

Website foundation release of Xychen OS.

## Included
- Public website pages
- Real account registration/login/logout
- Persistent SQLite database
- User dashboard
- Community reports, feature requests, and support tickets
- Announcements
- Admin dashboard and moderation endpoints
- Health/status endpoint

## Run
Requires Node.js 18.17+.

1. Copy `.env.example` to `.env`.
2. Change `SESSION_SECRET` and `ADMIN_PASSWORD`.
3. Run `npm install`.
4. Run `npm run seed`.
5. Run `npm start`.
6. Open `http://localhost:3000`.

Discord, Roblox/game integrations, external APIs, payments, and real toolkit utilities are not implemented in this release.
