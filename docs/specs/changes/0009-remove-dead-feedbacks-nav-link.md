---
id: CHG-0009
title: Remove the dead "Feedbacks" link while the Reviews section is not on the page
status: implemented
created: 2026-11-18
amends: [features/site-navigation, pages/reviews]
superseded_by:
---

# Remove the dead "Feedbacks" nav link

## Purpose
The user chose to hide the Reviews section until real quotes exist. Checking the code showed the section is already not mounted (`<app-reviews />` is not in `app.html`, and was not at the first commit), yet the header still linked to `#reviews`, a target that does not exist. The link did nothing.

## Requirements
- **R1.** The header navigation has no "Feedbacks" entry on desktop or mobile; the "Other" menu lists six links (Tech Stack, Work Flow Process, Programming Journey, Achievements, Outside Work, Certificates).
- **R2.** Every in-page link in the header points at a section id that exists.
- **R3.** `ReviewsComponent` stays in the repository, unmounted, with its placeholder testimonials, until real content is supplied.
- **R4.** Bringing the section back is a new change spec that supplies the content, re-mounts the component and re-adds the nav entry.

## Acceptance criteria
- [x] No header link targets a missing id (checked in a browser).
- [x] The "Other" dropdown shows 6 links; none says Feedbacks.
- [x] Scroll-spy still highlights the correct entries.

## Accessibility
Removes a link that did nothing when activated.

## Edge cases and errors
A bookmarked `#reviews` URL simply stays at the top of the page, as before.

## Out of scope
Writing real testimonials; deleting `ReviewsComponent`.

## Files
`src/app/components/header/header.component.ts`

**Decision recorded:** hide (leave unmounted) rather than delete, so the section can return cleanly later (user choice, 2026-11-18).

## Related
[features/site-navigation](../features/site-navigation.md), [pages/reviews](../pages/reviews.md)

## Change log
- 2026-11-18: created and implemented in the same pass at the user's request.
