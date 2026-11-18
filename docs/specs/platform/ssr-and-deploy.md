---
id: platform/ssr-and-deploy
title: Rendering, build and deployment
status: implemented
created: 2026-11-18
amends: []
---

# Rendering, Build and Deployment

## Purpose
How the site is built, rendered and served.

## Requirements
- **R1.** Angular 22 application with standalone components, signals and client hydration (`provideClientHydration`); HTTP via `provideHttpClient`.
- **R2.** Server-side rendering with all routes prerendered at build time (`RenderMode.Prerender` on `**`); `outputMode: "server"` with `src/server.ts` as the SSR entry.
- **R3.** `src/server.ts` is an Express server that serves the built browser files (long cache), mounts `/api/chat` and `/api/contact` from the shared `api/` handlers, loads a local `.env` if present, caps JSON bodies at 16 kB, and renders the app for every other request. `allowedHosts` for the Angular engine is `localhost` and `127.0.0.1`.
- **R4.** Production hosting is Vercel (project "website-portfolio"); `api/*.ts` are Vercel functions (chat: Edge; contact: Node.js).
- **R5.** Required environment variables: `GEMINI_API_KEY`, `EMAIL_USER`, `EMAIL_APP_PASSWORD`; optional `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`; Vercel supplies `VERCEL_ENV`, `VERCEL_URL`, `VERCEL_PROJECT_PRODUCTION_URL`. Secrets are never sent to the browser.
- **R6.** `npm start` and `npm run build` first run `npm run generate:chat-context`. `npm test` runs the unit tests with Vitest through `ng test`.
- **R7.** Material Symbols are loaded as a subset (`icon_names=` list in `index.html`); any new icon name must be added to that list.

## Acceptance criteria
- [ ] `npm run build` succeeds (budget warning allowed, see [performance-budget](../quality/performance-budget.md)).
- [ ] `npm start` serves the site and both API routes locally.
- [ ] Prerendered HTML contains the section content (view-source).
- [ ] `ng test` passes (run from a shell whose working directory uses an upper-case drive letter on Windows).

## Accessibility
Not applicable.

## Edge cases and errors
`ng serve` with hot module reload on can serve stale component templates; restart with `--hmr=false` if the browser disagrees with the code. A lower-case drive letter in the working directory breaks `ng test`.

## Files
`angular.json`, `src/main.ts`, `src/main.server.ts`, `src/server.ts`, `src/app/app.config.ts`, `src/app/app.routes.server.ts`, `api/`, `package.json`

## Related
[api-chat](api-chat.md), [api-contact](api-contact.md), `docs/decisions.md`

## Change log
- 2026-11-18: baseline written from code.
