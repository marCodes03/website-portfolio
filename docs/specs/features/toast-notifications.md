---
id: features/toast-notifications
title: Toast notifications
status: implemented
created: 2026-11-18
amends: []
---

# Toast Notifications

## Purpose
Short, dismissible messages for outcomes that do not belong inline (currently the contact form).

## Requirements
- **R1.** A root-provided `ToastService` holds a signal list of toasts (`id`, `kind`, `message`) with `show(kind, message, durationMs = 6000)`, `success(message)`, `error(message)` and `dismiss(id)`.
- **R2.** One `<app-toast />` is mounted in `app.html`; it renders a fixed region at the top-right under the header (full width on mobile, 380px from `sm` up), above all other layers.
- **R3.** Kinds are `error` (red border, `error` icon, `role="alert"`) and `success` (green border, `check_circle` icon, `role="status"`).
- **R4.** Each toast auto-dismisses after 6 seconds and has a close button labelled "Dismiss notification".
- **R5.** Multiple toasts stack vertically in the order they were created.

## Acceptance criteria
- [ ] `toast.error('x')` shows a red toast that disappears after about 6 s.
- [ ] The close button removes it immediately.
- [ ] Two quick calls show two stacked toasts.

## Accessibility
The container is a labelled region ("Notifications") that stays mounted. Each toast has its own live role. Known gaps: no pause on hover or focus (WCAG 2.2.1 timing concern), and success/error colours use fixed Tailwind greens and the error token rather than brand tokens.

## Edge cases and errors
Toasts are not persisted across reloads. Very long messages wrap.

## Files
`src/app/components/toast/toast.service.ts`, `src/app/components/toast/toast.component.ts`, `src/app/app.html`

## Related
[contact](../pages/contact.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0003](../changes/0003-toast-pause-and-tokens.md) (Toasts pause on hover/focus and use brand tokens). Any "known gap" above that this resolves is now closed.
