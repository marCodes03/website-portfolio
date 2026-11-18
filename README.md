# Marco O. Amira — Portfolio

Personal portfolio site for Marco O. Amira, built with Angular (standalone components, signals,
SSR via `@angular/ssr`), Tailwind, and two small serverless API endpoints (an AI chat assistant and
a contact form) deployed as Vercel functions.

## Tech stack

- **Frontend:** Angular 22 (standalone components, signals, native `@if`/`@for` control flow), Tailwind CSS
- **SSR:** `@angular/ssr` + Express (`src/server.ts`)
- **Serverless API** (`api/`, deployed as Vercel Functions):
  - `api/chat.ts` — AI chat widget, powered by Google Gemini (`@google/genai`), edge runtime
  - `api/contact.ts` — contact form email delivery via `nodemailer` over Gmail SMTP, Node.js runtime
    (not edge — nodemailer needs Node's `net`/`tls` modules)

## Prerequisites

- Node.js (LTS; matches whatever Angular 22 requires — check with `node -v`)
- npm

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root (or copy/edit the existing one) with:
   ```bash
   # Required for the AI chat widget (api/chat.ts)
   GEMINI_API_KEY=your-gemini-api-key

   # Required for the contact form (api/contact.ts)
   # EMAIL_USER is the Gmail address that sends and receives the mail.
   # EMAIL_APP_PASSWORD is a Gmail App Password, NOT your normal Gmail password.
   # Generate one at https://myaccount.google.com/apppasswords (requires 2-Step Verification).
   EMAIL_USER=your-gmail-address@gmail.com
   EMAIL_APP_PASSWORD=your-16-char-app-password
   ```
   These env vars are read by the `api/` serverless functions. For local full-stack testing
   (API routes included) use the [Vercel CLI](https://vercel.com/docs/cli) (`vercel dev`), which
   loads `.env` automatically. If you only need the Angular app without live chat/contact-form
   calls, plain `ng serve`/`npm start` is enough.

## Running locally

**Frontend only** (fastest, but the chat widget and contact form won't actually call an API):
```bash
npm start
```
Open http://localhost:4200/. The app reloads automatically on source changes.

**Full stack, including the `api/` serverless functions** (recommended if you're working on the
chat widget or contact form):
```bash
npx vercel dev
```
This serves the Angular app and proxies `/api/*` to the functions in `api/`, using your local
`.env` for secrets.

## Building

```bash
npm run build
```
Compiles the app and SSR server; output goes to `dist/website-portfolio-test/`.

To serve the SSR build locally after building:
```bash
npm run serve:ssr:website-portfolio-test
```

## Testing

```bash
npm test
```
Runs unit tests with Vitest.

Accessibility: after `npm run build`, run `npm run test:a11y` to check the build with axe-core in headless Chrome (1280px and 390px, light and dark, chat and modals open, form errors shown). Set `CHROME_PATH` if Chrome is not in a standard location.

There is no end-to-end test setup configured.

## Deployment

The site is set up to deploy on [Vercel](https://vercel.com): the Angular build output and the
`api/` directory are both picked up automatically by Vercel's framework detection. Set
`GEMINI_API_KEY`, `EMAIL_USER`, and `EMAIL_APP_PASSWORD` as environment variables in the Vercel
project settings — the local `.env` file is not deployed.

## Project structure

```
src/app/components/   Angular standalone components, one per page section
src/app/assets/files/  Resume PDF, referenced directly by the Hero component's download link
src/app/assets/image/  NOTE: not wired into angular.json's assets config, so it is not actually
                       served at runtime - it's a leftover duplicate of public/assets/image/.
                       See docs/decisions.md for details.
public/                Static assets actually served at the site root (robots.txt, sitemap.xml,
                       favicon, and the images referenced via "assets/..." paths)
api/                  Vercel serverless functions (chat, contact form)
docs/decisions.md     Log of non-trivial decisions made while working on this project (see
                       AGENTS.md's "Decision Logging" rule)
brand.md              Design system reference (colors, type, spacing tokens)
AGENTS.md             Coding standards and conventions for this repo
```
