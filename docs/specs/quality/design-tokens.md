---
id: quality/design-tokens
title: Design tokens and theming
status: implemented
created: 2026-11-18
amends: []
---

# Design Tokens and Theming

## Purpose
The shared visual vocabulary (colours, type, spacing) and how the two themes work. Fuller brand notes live in `brand.md`.

## Requirements
- **R1.** Tokens are CSS custom properties in `src/styles.css`, consumed through Tailwind utilities (`text-text`, `bg-surface`, `text-accent`, and so on). Components do not hard-code the brand colours, except for a few documented one-offs.
- **R2.** Light theme: background `#fcf8fa`, surface `#e8e9f3`, text `#272635`, muted text `#575665`, border `#cecece`, accent `#1b6375`, primary `#121220`, secondary `#326571`, error `#ba1a1a`.
- **R3.** Dark theme (`.dark` on `<html>`): background `#1C1A27`, surface `#2A1B3D`, text `#fcf8fa`, muted `#cecece`, border `#42414D`, accent `#b1e5f2`; primary follows the accent.
- **R4.** Typography is Roboto Mono for every role (display, headline, label, body, mono), with sizes defined as tokens (for example headline-lg 32px, headline-md 24px, display-lg 64px).
- **R5.** Spacing tokens: section padding 64px (mobile) and 120px (desktop), gutter 24px, container max width 1200px, base unit 8px. Border radii are small (default 0.125rem, lg 0.25rem, xl 0.5rem).
- **R6.** `.accent-on-dark` re-points `--color-accent` and `--color-primary` to `#b1e5f2` inside always-dark sections (Experience, Projects, the Off-Screen eyebrow) so the light-theme accent is never used on a dark background.
- **R7.** Sections use named backgrounds (`section-frosted`, `section-white`, `section-ghost`, `section-dark`); `section-dark` is dark in both themes.

## Acceptance criteria
- [ ] Toggling the theme changes every token-based surface and text colour without a reload.
- [ ] Accent text on `section-dark` is `#b1e5f2` in both themes.
- [ ] No component hard-codes `#1b6375` or `#b1e5f2` outside `styles.css` (known exceptions: a few `dark:` utility literals such as `#272635`).

## Accessibility
Token pairs are chosen for 4.5:1 contrast; verify new pairs against [accessibility](accessibility.md).

## Edge cases and errors
Some utilities use literal hex values (for example `dark:text-[#272635]`), which will not follow a future token change. Status greens and amber stars use Tailwind colours, not tokens.

## Files
`src/styles.css`, `brand.md`

## Related
[theme-toggle](../features/theme-toggle.md), [accessibility](accessibility.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-19: amended by [CHG-0017](../changes/0017-button-system-and-motion.md) (shared button classes, no bounce easing).
