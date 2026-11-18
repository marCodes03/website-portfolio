---
id: CHG-0002
title: Trap keyboard focus inside open modals
status: implemented
created: 2026-11-18
amends: [features/detail-modals, quality/accessibility]
superseded_by:
---

# Modal focus trap

## Purpose
Today focus moves into a modal on open and back on close, but Tab can still reach the page behind it. While a modal is open, keyboard users should stay inside it.

## Requirements
- **R1.** While the project or certificate modal is open, pressing Tab on the last focusable element moves focus to the first one inside the modal; Shift+Tab on the first moves to the last.
- **R2.** Focus never lands on any element outside the open modal by keyboard.
- **R3.** The behaviour is shared by both modals through one reusable piece (directive or helper), not duplicated.
- **R4.** Existing behaviour is kept: focus starts on "Close modal"; Escape and backdrop click close; focus returns to the opener.
- **R5.** The page behind the modal is not reachable by assistive tech while open (use `inert` on the main content or equivalent) and is restored on close.

## Acceptance criteria
- [ ] Open a project, press Tab repeatedly: focus cycles within the modal only.
- [ ] Shift+Tab from "Close modal" wraps to the last focusable element.
- [ ] After Escape, focus is back on the card that opened it and the page is interactive again.
- [ ] Axe reports no violations with either modal open.

## Accessibility
This is the accessibility change. Keep `role="dialog"`, `aria-modal="true"` and the labelled heading.

## Edge cases and errors
Certificate modal with a changing slideshow: dots are focusable and stay in the cycle. A modal with only one focusable element keeps focus on it.

## Out of scope
Changing modal visuals or content.

## Files
`src/app/shared/focus-trap.directive.ts` (new), `src/app/components/portfolio/project-modal.component.ts`, `src/app/components/certificates/certificate-modal.component.ts`

**Decision recorded:** Focus is trapped by a shared directive; everything outside the dialog is made `inert` by marking its siblings up to `<body>` (the modal lives inside `<main>`, so `<main>` itself cannot be made inert).

## Related
[features/detail-modals](../features/detail-modals.md), [quality/accessibility](../quality/accessibility.md)

## Change log
- 2026-11-18: created (draft).
- 2026-11-18: approved by the user and implemented; verified in a browser / by request.
