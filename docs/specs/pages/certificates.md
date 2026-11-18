---
id: pages/certificates
title: Certificates and training
status: implemented
created: 2026-11-18
amends: []
---

# Certificates & Training (`#certificates`)

## Purpose
Highlights awards, certificates and trainings through a scrolling strip and a grid of six detail cards.

## Requirements
- **R1.** Section `id="certificates"` with eyebrow "ACHIEVEMENTS" and `<h2>` "Certificates & Training".
- **R2.** An upper marquee strip of pills (type "Award" or other, title, year) scrolls continuously leftwards (30 s per loop, list duplicated for a seamless loop) and pauses while hovered.
- **R3.** Below it, a 12-column grid shows six featured cards (icon, year, title, subtitle, description, category pill). The first is Cum Laude & Valedictorian; the last is the 11th IT Skills Olympics runner-up (2022). Card widths come from each certificate's `colSpan`.
- **R4.** Clicking a card, or pressing Enter while it is focused, opens the certificate modal for that card (see [detail-modals](../features/detail-modals.md)). Each card is focusable (`role="button"`, `tabindex="0"`) with the label "View certificate details for <title>".
- **R5.** One card (index 5) shows a photo through `NgOptimizedImage`.

## Acceptance criteria
- [ ] The strip moves continuously and stops moving while the pointer is over it.
- [ ] Every card opens a modal with that card's title and images.
- [ ] Keyboard: Tab reaches each card; Enter opens it; Escape closes the modal and returns focus to the card.

## Accessibility
Cards contain no nested interactive controls. The marquee is decorative motion that pauses on hover; with reduced motion it effectively stops (global CSS). Unverified: marquee content is exposed to screen readers twice because the list is duplicated.

## Edge cases and errors
Narrow screens: pills stay on one line and are clipped by the strip. Certificates without images show an icon instead of a slider in the modal.

## Files
`src/app/components/certificates/certificates.component.ts`, `src/app/components/certificates/certificate-modal.component.ts`

## Related
`docs/portfolio-content.md` (Certificates & Trainings), [detail-modals](../features/detail-modals.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-19: amended by [CHG-0014](../changes/0014-critique-round-chat-entry-and-page-flow.md): Certificates is now the only place with full award cards; IT Olympics card shows its photo without the overlay label.
- 2026-11-19: the "Contact me" button below the certificate marquee was removed at the user's request (redundant with the closing "Get in touch" band); this is a removal only, no new requirement.
- 2026-11-19: amended by [CHG-0016](../changes/0016-hero-headline-and-copy.md) (copy and label changes).
