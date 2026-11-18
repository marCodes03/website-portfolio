---
id: features/theme-toggle
title: Theme toggle (light and dark)
status: implemented
created: 2026-11-18
amends: []
---

# Theme Toggle

## Purpose
Lets a visitor switch between light and dark themes and remembers the choice.

## Requirements
- **R1.** A fixed round button at the bottom-right (below the chat button) toggles the `dark` class on `<html>`.
- **R2.** On first load in the browser: if `localStorage.theme` is `dark` → dark; if it is `light` → light; if unset, follow `prefers-color-scheme`.
- **R3.** Toggling writes `theme` = `dark` or `light` to `localStorage`.
- **R4.** The icon is `light_mode` while dark (offering light) and `dark_mode` while light; the accessible name reads "Switch to light mode" or "Switch to dark mode" accordingly.
- **R5.** Theme colours come from CSS custom properties redefined under `.dark` (see [design-tokens](../quality/design-tokens.md)).

## Acceptance criteria
- [ ] With storage empty and the OS in dark mode, the page loads dark.
- [ ] Clicking the button flips the theme and persists after reload.
- [ ] The label announced matches the target theme.

## Accessibility
Real `<button>`, labelled, `focus-visible` ring, icon `aria-hidden`.

## Edge cases and errors
Server-rendered HTML is light; dark is applied after hydration, so a dark-theme visitor can see a brief light flash (unverified). `localStorage` can throw in private modes and is not guarded (known gap).

## Files
`src/app/components/theme-toggle/theme-toggle.component.ts`, `src/styles.css`

## Related
[design-tokens](../quality/design-tokens.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-19: amended by [CHG-0013](../changes/0013-layout-rhythm.md) (layout rhythm).
