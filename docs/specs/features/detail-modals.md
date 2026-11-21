---
id: features/detail-modals
title: Detail modals (project and certificate)
status: implemented
created: 2026-11-18
amends: []
---

# Detail Modals

## Purpose
Full-detail overlays opened from the project cards and the certificate cards.

## Requirements
- **R1.** Opening a modal shows a centred dialog (max 800px wide, 80vh tall) over a dimmed backdrop. Page scrolling is locked while open and restored on close.
- **R2.** Project modal: image header (modal image, else card image, else icon), category, title, "Project Overview", "My Contributions" bullets, "Skills & Technologies" pills, and, when a link exists, a "Visit Live Project" link that opens in a new tab.
- **R3.** Certificate modal: image header that auto-advances through the certificate's images every 3 s when there are 2 or more, with clickable slide dots ("Go to slide N") that restart the timer; category, title, "Recognition Details" (subtitle • year, description) and "Key Highlights" pills.
- **R4.** Close with the close button ("Close modal"), a click on the backdrop, or the Escape key. The slideshow timer is cleared on close.
- **R5.** The dialog has `role="dialog"`, `aria-modal="true"` and an `aria-labelledby` that points at its heading (fixed ids `project-modal-title` and `certificate-modal-title`).
- **R6.** On open, focus moves to the close button; on close, focus returns to the element that opened it.
- **R7.** The scrollable body is keyboard-focusable.

## Acceptance criteria
- [ ] Open a project → focus is on "Close modal"; Escape closes; focus returns to the card.
- [ ] Open a certificate with several images → the image changes after about 3 s; clicking dot 2 shows image 2.
- [ ] The page behind does not scroll while the modal is open.
- [ ] Axe reports no violations with either modal open.

## Accessibility
Dialog name resolves to the heading text. Close button has a visible ring and `aria-hidden` icon. Known gap: focus is not trapped inside the modal (Tab can leave it), and `aria-modal` relies on the user agent to hide the background.

## Edge cases and errors
No images: an icon placeholder replaces the slider. Long text scrolls inside the body. Opening a second modal while one is open is not possible (backdrop blocks clicks).

## Files
`src/app/components/portfolio/project-modal.component.ts`, `src/app/components/certificates/certificate-modal.component.ts`, `src/app/components/portfolio/portfolio.component.ts`, `src/app/components/certificates/certificates.component.ts`

## Related
[portfolio](../pages/portfolio.md), [certificates](../pages/certificates.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: amended by [CHG-0002](../changes/0002-modal-focus-trap.md) (Trap keyboard focus inside open modals). Any "known gap" above that this resolves is now closed.
- 2026-11-18: refactor, no behaviour change: scroll lock and returning focus to the opener now live in the shared FocusTrapDirective instead of being repeated in both modals and both host components.
- 2026-11-19: amended by [CHG-0018](../changes/0018-contact-form-dialog-in-closing-band.md): a third dialog, the contact form, uses the same focus trap, scroll lock, Escape and focus return; Escape and outside click are ignored while a send is in flight.
- 2026-11-19: amended by [CHG-0019](../changes/0019-dialog-tap-targets.md) (modal close buttons at 44px).
- 2026-11-21: amended by [CHG-0026](../changes/0026-fintrack-project-and-source-link.md) (FinTrack project; optional `githubUrl` and a "View Source" button in the project modal).
