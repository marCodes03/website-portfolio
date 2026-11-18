---
id: CHG-0003
title: Toasts pause while hovered or focused, and use brand colours
status: implemented
created: 2026-11-18
amends: [features/toast-notifications]
superseded_by:
---

# Toast pause and tokens

## Purpose
Toasts disappear after 6 seconds no matter what, which can be too fast for slower readers (WCAG 2.2.1 timing). They also use fixed Tailwind greens instead of brand tokens.

## Requirements
- **R1.** While the pointer is over a toast, or keyboard focus is inside it, its dismiss timer is paused. When the pointer leaves and focus leaves, the **full** duration restarts.
- **R2.** Pressing Escape while a toast has focus dismisses it.
- **R3.** Success and error toasts take their border and icon colours from design tokens (existing `--color-error`; a new success token defined for both themes) instead of `text-green-*` / `border-green-*` classes.
- **R4.** Token pairs meet 4.5:1 contrast for text and 3:1 for icons and borders in light and dark.
- **R5.** Duration stays 6000 ms by default; behaviour of `show`, `success`, `error`, `dismiss` is otherwise unchanged.

## Acceptance criteria
- [ ] Hover a toast for 10 s: it stays; move away: it disappears about 6 s later.
- [ ] Tab into the toast's close button: it stays until focus leaves.
- [ ] No `green-` utility classes remain in the toast component; both themes pass contrast.

## Accessibility
Keeps `role="alert"` / `role="status"` and the labelled region. Adds the pause and Escape behaviours above.

## Edge cases and errors
Several toasts: each has its own timer. Toast removed while hovered: no timer leaks.

## Out of scope
Persisting toasts, action buttons, positioning changes.

## Files
`src/app/components/toast/toast.service.ts`, `src/app/components/toast/toast.component.ts`, `src/styles.css`

**Decision recorded:** New token `--color-success` (#1a6b34 light, #7ddc9a dark) for success; `--color-error` reused for errors.

## Related
[features/toast-notifications](../features/toast-notifications.md), [quality/design-tokens](../quality/design-tokens.md)

## Change log
- 2026-11-18: created (draft).
- 2026-11-18: approved by the user and implemented; verified in a browser / by request.
