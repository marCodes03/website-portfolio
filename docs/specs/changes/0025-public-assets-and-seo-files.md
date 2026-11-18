---
id: CHG-0025
title: Static assets served from public/, new icons, robots.txt, sitemap.xml and richer meta tags
status: implemented
created: 2026-11-19
amends: [platform/seo-and-social-meta, platform/app-icon]
superseded_by:
---

# Public assets and SEO files (catch-up spec)

## Purpose
This work was done without a spec file. It records the asset move, icon set and SEO files so they can be verified before the branch is pushed.

## Requirements
- **R1.** Images, the CV and logos used by the site are served from `public/assets/`. Images in `src/app/assets/` are PNG conversions of the former JPGs for the activities, awards and projects sections.
- **R2.** `public/` holds `favicon.ico`, `app-icon.png`, `apple-touch-icon.png` and `og-image.png` (1200x630); `src/index.html` links them.
- **R3.** `src/index.html` has a title, description, `theme-color`, `color-scheme`, Open Graph and Twitter Card tags, and a `Person` JSON-LD block, all consistent with `docs/portfolio-content.md`.
- **R4.** `public/robots.txt` and `public/sitemap.xml` exist and use the production origin from `og:url`.
- **R5.** No component or content file references a deleted asset (`app-icon.svg`, `marco-amira-hero-w-bg.jpeg`, the HEIC photo, or removed `.jpg` files).

## Acceptance criteria
- [ ] `npm run build` has no missing-file warnings and every image on the page loads (no 404 in the network panel).
- [ ] Pasting the site URL into a link-preview tool shows the title, description and og-image.
- [ ] `/robots.txt` and `/sitemap.xml` return 200 with the production origin.
- [ ] `grep -r "\.jpg\|\.jpeg\|\.HEIC\|app-icon.svg" src docs/portfolio-content.md` finds only files that still exist.

## Accessibility
Every image keeps meaningful `alt` text; `NgOptimizedImage` stays in use for static images.

## Edge cases and errors
`public/assets/image/` still holds some `.jpg` files alongside PNGs; unused ones can be removed in a later cleanup once step R5 is confirmed.

## Out of scope
Changing the production domain, adding more structured data types.

## Files
`public/` (icons, `robots.txt`, `sitemap.xml`, `assets/`), `src/app/assets/image/**`, `src/index.html`, `angular.json` (bundle warning raised to 560kB).

## Related
`docs/decisions.md`: "2026-11-19 - Pre-push review fixes (CHG-0023 to CHG-0025)".

## Change log
- 2026-11-19: created as a catch-up spec and marked implemented; R5 still to be confirmed by the checks above.
