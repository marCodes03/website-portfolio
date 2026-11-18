---
id: CHG-0018
title: Contact section replaced by a "Send a message" dialog in the closing band
status: implemented
created: 2026-11-19
amends: [pages/contact, features/site-navigation, features/detail-modals]
superseded_by:
---

# Contact section replaced by a "Send a message" dialog in the closing band

## Purpose
The Contact section and the closing "Get in touch" band both offer email, and the user feels Contact adds nothing beyond the form. Decision (user, 2026-11-19): remove the Contact section, keep the band, and move the contact form into a dialog opened by a new band action. The form, its validation and `/api/contact` stay exactly as they are, so no capability is lost (PRODUCT.md lists the contact form as binding).

## Requirements
- **R1.** The `#contact` section is removed from the page. The closing band (`#get-in-touch`) is the last section before the footer.
- **R2.** The band shows four actions: Download CV, Email me (`mailto:`), Ask my AI, and "Send a message".
- **R3.** "Send a message" opens a dialog containing the existing form with the same four fields, rules, inline messages, button states, toasts and `/api/contact` request described in [pages/contact](../pages/contact.md) R2 to R7. No field, limit or message text changes.
- **R4.** The dialog is modal (`role="dialog"`, `aria-modal="true"`, labelled by its heading "Send me a message"), traps focus, locks page scroll, closes on Escape, on the close button and on a click outside it, and returns focus to the "Send a message" button, by reusing the shared `FocusTrapDirective` like the other dialogs.
- **R5.** After a successful send the success toast shows and the dialog closes; after a failure the error toast shows and the dialog stays open with the values kept.
- **R6.** While a request is sending, Escape and outside click do not close the dialog (so a send is never lost silently); the close button stays available.
- **R7.** The email address and location text that lived in Contact are shown once: the email appears in the band as the visible text of the "Email me" link; the location (Taguig City, Philippines) moves into the footer.
- **R8.** Navigation: the "Contact" nav entry becomes "Contact" pointing at `#get-in-touch`; section highlighting still works; no nav link targets a missing id.
- **R9.** Opening the chat while the dialog is open is not possible (the dialog makes the rest inert); Escape never closes both at once.
- **R10.** `docs/portfolio-content.md` records the page change (Contact section removed, band actions, location in the footer) before the code changes.

## Acceptance criteria
- [ ] AC1. No element with `id="contact"` exists; every nav link and anchor on the page resolves to an existing id.
- [ ] AC2. The band has four visible actions at 1280px and 390px, each at least 44px tall, and none overlap.
- [ ] AC3. "Send a message" opens the dialog; focus lands inside; Tab cycles inside; Escape closes it and focus returns to the button.
- [ ] AC4. Submitting the empty form shows four inline messages and sends no request; a valid submit with the API returning 200 shows the success toast, clears the form and closes the dialog; with 500 it shows the error toast and keeps the values and the dialog.
- [ ] AC5. During a pending request Escape and outside click leave the dialog open.
- [ ] AC6. The footer shows the location; the email appears as one `mailto:` link in the band and nowhere else on the page.
- [ ] AC7. `npm run test:a11y` passes with a new state for the open dialog and its error state (updated script), 0 violations in light and dark at 1280px and 390px.
- [ ] AC8. `ng build` passes; the chat context is regenerated.

## Accessibility
Dialog uses the same pattern as the project and certificate dialogs (focus trap, inert background, scroll lock, Escape, focus return). Fields keep their labels, `aria-invalid` and `aria-describedby`. Errors are also announced by the toast. Close button has a text name. Contrast checked in both themes (dark error colour already fixed).

## Edge cases and errors
- Rate limit (429) and network failure show the existing error toast; the dialog stays open.
- Very narrow screens: the dialog scrolls inside itself, never past the viewport; the submit button is reachable by keyboard and touch.
- Reduced motion: the dialog opens without a transition.
- Dark theme: dialog and fields use theme tokens.
- If JavaScript is unavailable the "Email me" link remains the fallback.

## Out of scope
- Changing the form fields, limits, toast texts or the API.
- Server-side changes to `api/contact.ts`.
- A separate /contact page or route.
- Removing the CV or chat actions.

## Files
`src/app/components/cta-band/cta-band.component.ts`, new `src/app/components/contact-dialog/contact-dialog.component.ts` (form moved from the deleted `contact/contact.component.ts`), `footer/footer.component.ts`, `header/header.component.ts`, `certificates/certificates.component.ts` (anchor), `chat-bot/chat-bot.component.ts` (Escape ignores the dialog), `src/app/app.html`, `src/app/app.ts`, `scripts/a11y-check.mjs`, `docs/portfolio-content.md`.

## Related
- Decision to log in `docs/decisions.md` when this ships; critique of 2026-11-19.
- [pages/contact](../pages/contact.md), [features/detail-modals](../features/detail-modals.md), [platform/api-contact](../platform/api-contact.md), [features/toast-notifications](../features/toast-notifications.md).

## Change log
- 2026-11-19: created.
- 2026-11-19: approved by the user (option "Approve as written") and implemented. Verified in headless Chrome with a mocked API: no #contact, every in-page anchor resolves, last section is the band, four actions at 48px with no overlap, dialog focuses the name field, empty submit shows 4 messages and sends nothing, 500 keeps the dialog and values and shows an inline alert, Escape and backdrop do nothing while sending, 200 closes the dialog and returns focus to the button, Escape closes and returns focus. `npm run test:a11y` now 24 checks (adds the open dialog), 0 violations. Additions beyond the spec: an inline `role="alert"` message on failure (toasts are inert behind the dialog); the footer Email link was removed so the address appears once; the availability sentence moved into the dialog; band icon is `send` because `edit_square` is not in the Material Symbols subset.
