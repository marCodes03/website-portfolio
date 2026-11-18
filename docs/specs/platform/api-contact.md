---
id: platform/api-contact
title: Contact API (`/api/contact`)
status: implemented
created: 2026-11-18
amends: []
---

# Contact API

## Purpose
Receives the contact form and emails it to Marco.

## Requirements
- **R1.** `POST /api/contact` with JSON `{ name, email, subject?, message }`. On Vercel it runs as a Node.js function (nodemailer needs Node, not Edge); locally `src/server.ts` mounts the same handler.
- **R2.** `OPTIONS` → 204; other non-`POST` methods → 405. The request is rate limited first (see [request-guard](request-guard.md)).
- **R3.** Validation, each failure returning 400 with a generic `error`: `name` non-blank string ≤ 100; `email` string matching a basic address pattern ≤ 254; `message` non-blank string ≤ 5000; `subject` omitted, null, or a string ≤ 150.
- **R4.** If `EMAIL_USER` or `EMAIL_APP_PASSWORD` is missing, return 500 `{ error: "Server configuration error" }`.
- **R5.** The email is sent via Gmail (app password) from "Portfolio Contact Form" to `EMAIL_USER`, with `replyTo` set to the visitor's email. Subject: `[Portfolio Contact] <subject>` or `New message from <name>`; line breaks are stripped from the subject. The HTML body escapes `& < > " '` in name, email and message; the text body is plain.
- **R6.** Success: 200 `{ success: true }`. Any send failure: 500 `{ error: "Failed to send message. Please try again later." }`, with details logged only.

## Acceptance criteria
- [ ] `<script>` in the name appears escaped in the email HTML.
- [ ] A subject containing a newline does not produce an extra header.
- [ ] Invalid email → 400; 5001-character message → 400.
- [ ] Missing credentials → 500 with no credential text in the body.
- [ ] A real send arrives at the inbox with the visitor as reply-to.

## Accessibility
Not applicable (API); see [contact](../pages/contact.md).

## Edge cases and errors
Known inconsistency: the UI requires `subject` but the API accepts it as optional. Gmail app-password failures surface to visitors as the generic error toast. Locally, a missing `.env` means every send returns 500.

## Files
`api/contact.ts`, `api/_lib/request-guard.ts`, `src/server.ts`

## Related
[contact](../pages/contact.md), [request-guard](request-guard.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0001](../changes/0001-contact-subject-consistency.md) (Contact subject validated the same in form and API). Any "known gap" above that this resolves is now closed.
- 2026-11-18: refactor, no behaviour change: responses now go through the shared jsonResponse helper.
