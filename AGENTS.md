# Growlink Demo — Codex Context

## Project
UX prototype for Growlink design review. Not a production app — all data is mock, no backend.
React 19 + Vite, pure JSX (no TypeScript), inline styles only (no Tailwind/CSS modules).
Renders inside a fixed 375×812px iPhone frame in `App.jsx`.

## Dev server
`npm run dev` — defaults to port 5173 (may fall back to 5174 if in use).
Preview via `.Codex/launch.json` + `mcp__Claude_Preview__preview_start`.

## Key files
- `src/App.jsx` — global state + screen routing (conditional rendering, no React Router)
- `src/constants/tokens.js` — all colors as `T.p600`, `T.amber` etc.; gradient as `GRAD`
- `src/constants/data.js` — all mock data (STUDENT, TEACHERS, BOOKINGS, MSGS, ACTIVITY)
- `src/components/icons/Icon.jsx` — custom SVG icons; usage: `<Icon n="bell" s={17} c="white" />`
- `src/components/primitives/index.js` — barrel export for all primitive components
- `src/docs/` — UX research MDs with function priorities and homepage recommendations

## Patterns
- All styles are inline JS objects using design tokens (`T.p600`, `T.border`, `T.gray900`)
- Animation keyframes (`fadeIn`, `pulse`, `popIn`, `slideDown`) defined in `src/index.css`
- Screen navigation: set `screen` state in `App.jsx`; overlays (QuickPeek, Chat) render on top
- Icon names must match keys in the `PATHS` object in `Icon.jsx` — check before using
- `preview_eval` cannot update React state via `element.value + dispatchEvent` (React synthetic events)

## UX research docs
`src/docs/HOMEPAGE_FUNCTION_RESEARCH.md` — 22 homepage functions with usage %, priority, recommendations
`src/docs/SKILLS_HOMEPAGE_RESEARCH.md` — skills taxonomy, intent navigation, filter panel design
HomeScreen has 3 adaptive states (A/B/C) driven by `UserSelectScreen` persona selector.
