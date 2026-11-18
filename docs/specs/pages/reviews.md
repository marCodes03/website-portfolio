---
id: pages/reviews
title: Client feedback (reviews)
status: implemented
created: 2026-11-18
amends: []
---

# Client Feedback (`#reviews`)

## Purpose
Testimonial cards from clients.

> **Status: this section is NOT on the page.** `<app-reviews />` is not mounted in `app.html` (it was not at the first commit either), so visitors never see it. The component and its placeholder data exist only in the repository. The requirements below describe the component as written, for when it is mounted again.

## Requirements
- **R1.** Section `id="reviews"` with `<h2>` "Our Clients Feedback".
- **R2.** Testimonials come from a `testimonials` array (name, role, title, quote, rating, image, `approved`). Only items with `approved: true` are rendered.
- **R3.** Each card shows an avatar image, the title, the quote, a 5-star row (`aria-label="5 out of 5 stars"`), and the person's name and role.
- **R4.** The section has a top border and uses the white section background.

## Acceptance criteria
- [ ] Setting an item's `approved` to `false` removes its card.
- [ ] Each rendered card has a non-empty name, role and quote.

## Accessibility
Avatar images need meaningful or empty `alt` (unverified which). Star glyphs are decorative; the row carries the rating label.

## Edge cases and errors
**Known gap (matters only if the section is mounted): the two current testimonials (Harsh P. and Jane D.) contain placeholder Latin filler text ("Nam libero tempore…") and generic titles, so this section does not show real client feedback.** Treat the section as unfinished until real quotes replace the filler; do that through a change spec. The star count is hard-coded to 5 regardless of the `rating` field (unverified).

## Files
`src/app/components/reviews/reviews.component.ts`, `public/assets/image/reviews/`

## Related
`docs/portfolio-content.md` (check whether reviews are listed there)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-18: corrected: the baseline wrongly implied the section is rendered; it is unmounted. See [CHG-0009](../changes/0009-remove-dead-feedbacks-nav-link.md).
