# Drift Operations Manager

Frontend-only interactive prototype for a drift motorsport event operations
platform (tickets, access control, Drift Taxi, track control, technical
inspection, Car Expo, finance, and more).

Everything runs locally against mock data — no backend, no login, no
external API.

## Getting started

```bash
npm install
npm run dev
```

## Structure

- `src/pages` — one file per screen (route), Romanian-named to match the app's UI language.
- `src/components` — app shell (Layout, Sidebar, TopBar, RoleSwitcher) and shared UI primitives (`components/ui`).
- `src/lib` — app state (AppContext, AuthContext), mock data, formatting helpers.
- `src/hooks` — small reusable hooks.

Everything is currently a working skeleton (stub content) so the app builds
and every route renders — fill in each screen's real UI and mock-data wiring
next.
