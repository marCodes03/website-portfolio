---
id: CHG-0013
title: Layout rhythm: hero fit, section length, overlaps and fixed buttons
status: implemented
created: 2026-11-19
amends: [pages/hero, pages/journey, pages/portfolio, features/chat-bot, features/theme-toggle]
superseded_by:
---

# Layout rhythm: hero fit, section length, overlaps and fixed buttons

## Purpose
The taste-skill gate (2026-11-19, kind `service`, 1440 and 390 px) lists layout failures that a visitor can notice: the hero does not fill the first screen, one section is over three screens tall, fixed buttons cover text on phones, and a layer lies over the hero role text. This spec fixes the ones that are real problems for this site and names the kit rules it deliberately does not follow.

## Requirements
Checker ids in brackets.

- **R1. Hero fills the first screen** [hero-screen]. At 1440x900 and 390x844 the hero ends within 2 px of the bottom of the viewport, so no part of the About section shows on first load. Hero content stays vertically balanced; no new content is added.
- **R2. Journey length** [section-height]. The Journey section is at most two screens tall at 1440x900 (currently 2800 px, about 3.1 screens), without removing any entry listed in `docs/portfolio-content.md`. Reduce vertical spacing and card height; if that is not enough, show the oldest entries behind the section's existing expand pattern.
- **R3. Hero role text not covered** [overlap-text]. No layer lies over "SOFTWARE ENGINEER" at 1440 or 390; the role text is readable and selectable.
- **R4. Fixed buttons do not hide text** [nav-covers]. At 390 px the chat button and theme toggle never sit on top of body text in a way that hides it: they stay clear of the reading column (for example, stacked in the bottom-right gutter with the section's right padding at least their width), or shrink to 44 px. Their tap targets stay at least 44 px (CHG-0008) and they stay reachable by keyboard.
- **R5. Carousel snap** [section-height, scroll-snap]. The two horizontal carousels keep their snap behaviour; this is recorded as an accepted deviation (see Out of scope), not changed.
- **R6. Section spacing** [section-air, hole, flush]. Sections after the hero have equal top and bottom padding (the existing section padding tokens) and no gap larger than one section padding between a section's content and the next section.

## Acceptance criteria
- [ ] AC1. `consistency.mjs ... --widths 1440,390` reports no FAIL for `hero-screen`, `overlap-text`, `nav-covers`; `section-height` fails only for the accepted exceptions.
- [ ] AC2. Screenshots at 1440x900 and 390x844 show the hero alone on first load.
- [ ] AC3. The Journey section measures at most 1800 px at 1440 wide, with every entry still reachable.
- [ ] AC4. At 390 px, scrolling the whole page shows no fixed button hiding a text line.
- [ ] AC5. No horizontal scroll at 320, 390, 768, 1024 and 1440 px; dark and light themes both checked.
- [ ] AC6. AXE (CHG-0012) still reports 0 violations.

## Accessibility
Keyboard order and focus unchanged; focused elements stay clear of fixed buttons (scroll-padding from CHG-0008). Tap targets stay at least 44 px. Text contrast unchanged.

## Edge cases and errors
- Short viewports (landscape phone, 640 px tall): the hero may exceed one screen; use `min-height`, never clip content.
- Very wide screens: hero stays centred.
- Reduced motion: no change in behaviour.

## Out of scope
- Kit rules that conflict with this site's design and are not adopted: every section exactly one or two screens, a `.wrap` container class on each section, sections starting on whole-screen boundaries, no fade-in on scroll (see CHG-0011), the nav inside the container grid.
- Copy changes (headline, first-screen fact, CTAs), button style unification and missing images (`project-eyeko-app.jpg` fails to load), each a separate spec.
- Redesign of any section.

## Files
`src/app/components/hero/hero.component.ts` (min-height fills the viewport below the header), `src/app/components/journey/journey.component.ts` (newest 7 of 13 milestones shown, older 6 behind a toggle with `aria-expanded`, tighter spacing).

## Related
- Decision: "Taste-skill audit: accessibility fixes first (CHG-0008)" in `docs/decisions.md`.
- [pages/hero](pages/hero.md), [pages/journey](pages/journey.md), [features/chat-bot](features/chat-bot.md), [features/theme-toggle](features/theme-toggle.md).
- Content: `docs/portfolio-content.md`.

## Change log
- 2026-11-19: created.
- 2026-11-19: approved by the user.
- 2026-11-19: implemented R1 and R2 (hero-screen passes at 1440 and 390; Journey no longer over two screens). **Not changed, accepted deviations:** R3 `overlap-text` is the rotating 3D role cube, whose faces stack by design (backface hidden); R4 `nav-covers`: the chat and theme buttons are floating controls that necessarily float over text at 390 px, kept at 44 px; R5 unchanged; R6 `section-air` reads 0% because sections are hidden by the scroll reveal at measurement time (a measuring artifact), and the `hole` in Certificates and `flush` of the hero photo on the About section were left. Career-path (2.7 screens) is newly visible in `section-height` and is not covered here.
- 2026-11-19: R1 follow-up: the header now publishes its real height as `--header-h` (ResizeObserver in `header.component.ts`, skipped while the mobile menu is open); the hero's 73px fallback is only used before it runs. `hero-screen` is down to a WARN at 1440 and 390.
