---
id: CHG-0024
title: Chat bot answers from docs/portfolio-content.md via a generated, untracked module
status: implemented
created: 2026-11-19
amends: [platform/api-chat, features/chat-bot]
superseded_by:
---

# Chat knowledge base pipeline (catch-up spec)

## Purpose
This work shipped on 2026-11-18 without a spec file. It records what exists so it can be tested, and records one change made now: the generated module is no longer committed.

## Requirements
- **R1.** The chat system prompt contains the full text of `docs/portfolio-content.md` and tells the bot to say it does not know rather than guess.
- **R2.** `scripts/generate-chat-context.mjs` writes `api/_lib/portfolio-content.generated.ts` from that file. `npm run generate:chat-context` runs it, and it runs automatically on `prestart` and `prebuild`.
- **R3.** `api/chat.ts` (Vercel) and `src/server.ts` (local Express) share one implementation in `api/_lib/chat-assistant.ts`.
- **R4.** Visitor messages longer than 500 characters are rejected; error responses never contain upstream error details.
- **R5.** `api/_lib/portfolio-content.generated.ts` is listed in `.gitignore` and is not tracked. A fresh clone gets it from `npm start` or `npm run build`.

## Acceptance criteria
- [ ] After editing `docs/portfolio-content.md` and running `npm run generate:chat-context`, the bot answers using the edit.
- [ ] `git ls-files api/_lib` does not list the generated file.
- [ ] `npm run build` on a clean clone succeeds and produces the file first.
- [ ] A 501-character message returns a validation error, not a Gemini call.

## Accessibility
None affected.

## Edge cases and errors
If the Vercel project builds with a command that skips `prebuild` (for example a custom build command not using `npm run build`), the `api/` functions would fail to import the missing file. Keep the build command as `npm run build`.

## Out of scope
Reading the markdown at runtime, or bundling it with a loader.

## Files
- `docs/portfolio-content.md`
- `scripts/generate-chat-context.mjs`
- `api/_lib/chat-assistant.ts`, `api/chat.ts`, `src/server.ts`
- `api/_lib/portfolio-content.generated.ts` (generated, ignored)
- `.gitignore`, `package.json`

## Related
`docs/decisions.md`: "2026-11-18 - Chatbot now uses docs/portfolio-content.md as its knowledge base" and "2026-11-19 - Pre-push review fixes (CHG-0023 to CHG-0025)".

## Change log
- 2026-11-19: created as a catch-up spec and implemented; R5 supersedes the earlier decision to commit the generated file.
