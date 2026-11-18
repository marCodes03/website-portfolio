---
id: platform/app-icon
title: App icon (favicon)
status: implemented
created: 2026-11-18
amends: []
---

# App Icon

## Purpose
The site's brand mark in browser tabs, bookmarks and home screens.

## Requirements
- **R1.** The icon is the header logo mark "mr[]": Roboto Mono Bold, "mr" in `#1b6375`, "[]" in `#121220`, on a `#e8e9f3` rounded square.
- **R2.** `public/app-icon.png` is 512×512 with rounded, transparent corners. `public/apple-touch-icon.png` is 180×180 with square corners. `public/favicon.ico` contains 16, 32 and 48 px PNG images.
- **R3.** `index.html` links all three: `<link rel="icon" type="image/png" sizes="512x512">`, `<link rel="icon" href="favicon.ico">` and `<link rel="apple-touch-icon">`.
- **R4.** The icon is raster (PNG), not SVG, because SVG text would depend on the viewer's fonts.

## Acceptance criteria
- [ ] The tab shows the mark after a hard reload.
- [ ] All three files return 200.
- [ ] The mark is legible at 16 px.

## Accessibility
Not applicable.

## Edge cases and errors
Browsers cache favicons aggressively; a change can take a reload or a new tab to appear. Regenerating requires rendering the HTML mark again (no source design file exists).

## Files
`public/app-icon.png`, `public/apple-touch-icon.png`, `public/favicon.ico`, `src/index.html`

## Related
[seo-and-social-meta](seo-and-social-meta.md), [design-tokens](../quality/design-tokens.md)

## Change log
- 2026-11-18: baseline written from code.
