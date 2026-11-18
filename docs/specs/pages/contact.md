---
id: pages/contact
title: Contact
status: implemented
created: 2026-11-18
amends: []
---

# Contact (`#contact`)

## Purpose
Lets a visitor email Marco from the site, and shows direct contact details.

## Requirements
- **R1.** Section `id="contact"` with `<h2>` "Let's talk about your Project", an availability paragraph, the email address (`amira.coder03@gmail.com`) and the location (Taguig City, Philippines). The email text wraps on narrow screens instead of overflowing.
- **R2.** A reactive form with four labelled fields: Your Name (required, min 2, max 100), Email Address (required, valid email, max 254), Subject (required, max 150), Message (required, min 10, max 5000). The form is `novalidate`; the site shows its own messages.
- **R3.** On submit with an invalid form, every field is marked touched, each invalid field shows an inline message under it, and no request is sent. Messages: "Please enter your name." / "Your name must be at least 2 characters." / "Please enter your email address." / "Enter a valid email address, like john@example.com." / "Please enter a subject." / "Please enter a message." / "Your message must be at least 10 characters."
- **R4.** On submit with a valid form, the button shows "Sending…" and is disabled, and the form POSTs JSON `{ name, email, subject, message }` to `/api/contact` (see [api-contact](../platform/api-contact.md)).
- **R5.** On success: a success toast "Thank you! Your message has been sent successfully." and the form resets.
- **R6.** On failure (any non-2xx or network error): an error toast "Something went wrong sending your message. Please try again, or email me directly." The form keeps its values.
- **R7.** Toasts are produced through the shared toast service (see [toast-notifications](../features/toast-notifications.md)); there is no inline success or error paragraph.

## Acceptance criteria
- [ ] Submitting the empty form shows four inline messages and sends no request.
- [ ] A valid submit with the API returning 200 shows the success toast and clears the fields.
- [ ] A valid submit with the API returning 500 shows the error toast and keeps the entered values.
- [ ] Typing past each max length is blocked by `maxlength`.
- [ ] At 390px the email is fully visible and the page does not scroll sideways.

## Accessibility
Each input has a `<label for>`; invalid inputs set `aria-invalid="true"` and `aria-describedby` pointing at their message. Inputs use `autocomplete` (`name`, `email`, `off`); email also has `spellcheck="false"`. Submit is a typed submit button with a visible focus ring.

## Edge cases and errors
Known inconsistency: the form requires Subject, but the server treats it as optional. Double submit is blocked while sending. Server rate limit (10 requests per minute per IP) returns 429, which the form shows as the generic error toast.

## Files
`src/app/components/contact/contact.component.ts`, `src/app/components/toast/`, `api/contact.ts`

## Related
[api-contact](../platform/api-contact.md), [request-guard](../platform/request-guard.md), [toast-notifications](../features/toast-notifications.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0001](../changes/0001-contact-subject-consistency.md) (Contact subject validated the same in form and API). Any "known gap" above that this resolves is now closed.
- 2026-11-19: amended by [CHG-0014](../changes/0014-critique-round-chat-entry-and-page-flow.md): Contact moved to the end of the page, followed by the closing "Get in touch" band.
