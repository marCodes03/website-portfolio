---
id: CHG-0001
title: Contact subject is validated the same way in the form and the API
status: implemented
created: 2026-11-18
amends: [pages/contact, platform/api-contact]
superseded_by:
---

# Contact subject consistency

## Purpose
The contact form requires a subject, but the API treats it as optional and invents one from the visitor's name. The two should agree so behaviour is predictable and direct API calls cannot bypass the rule.

## Decision needed (default proposed)
**Proposed: subject is required everywhere.** Alternative: make it optional in the form too (remove `Validators.required`, hide the "Please enter a subject." message). Approve one before build.

## Requirements
- **R1.** `POST /api/contact` returns 400 when `subject` is missing, null, not a string, or blank after trimming.
- **R2.** The existing maximum of 150 characters stays; the 400 response keeps the same generic message shape (`{ error: string }`).
- **R3.** The email subject line is always `[Portfolio Contact] <subject>`; the fallback "New message from <name>" is removed.
- **R4.** The contact form is unchanged (subject already required with "Please enter a subject.").

## Acceptance criteria
- [ ] POST with no `subject` → 400; with `"   "` → 400; with 151 characters → 400.
- [ ] POST with a valid subject sends mail with subject `[Portfolio Contact] <subject>`.
- [ ] The form still blocks an empty subject and shows its message.

## Accessibility
No change.

## Edge cases and errors
Existing clients that omit `subject` (none known) would now get 400. CR/LF stripping in the subject stays.

## Out of scope
Changing the other field rules.

## Files
`api/contact.ts`

**Decision recorded:** Subject is required everywhere (approved by the user).

## Related
[pages/contact](../pages/contact.md), [platform/api-contact](../platform/api-contact.md)

## Change log
- 2026-11-18: created (draft).
- 2026-11-18: approved by the user and implemented; verified in a browser / by request.
