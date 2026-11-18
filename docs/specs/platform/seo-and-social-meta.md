---
id: platform/seo-and-social-meta
title: SEO and social sharing
status: implemented
created: 2026-11-18
amends: []
---

# SEO and Social Sharing

## Purpose
How the site appears in search results and when a link is shared.

## Requirements
- **R1.** Canonical production host: `https://marcodes-web-portfolio.vercel.app` (a second production domain, `website-portfolio-five-eta.vercel.app`, also exists). All absolute URLs below use the first.
- **R2.** `index.html` has `<title>` "Marco O. Amira | Full-Stack Developer", a meta description, `lang="en"`, a responsive viewport (zoom not disabled), `color-scheme` and `theme-color` (`#272635`).
- **R3.** Open Graph: type `website`, title, description, `og:url` = the canonical host, `og:image` = `/og-image.png` (1200×630) with width, height and alt. Twitter card is `summary_large_image` with title, description and image.
- **R4.** `og-image.png` is a 1200×630 card showing the "mr[]" icon, the name, "Full-Stack Software Engineer" and ".NET · Angular · Mobile".
- **R5.** A JSON-LD `Person` block lists name, job title, employer (Eclectus Technologies Inc.), alma mater (Taguig City University) and the GitHub and LinkedIn profiles.
- **R6.** `public/robots.txt` allows all and points to `https://marcodes-web-portfolio.vercel.app/sitemap.xml`; `public/sitemap.xml` lists the home page (monthly, priority 1.0).

## Acceptance criteria
- [ ] Pasting the URL into a link-preview tool shows the OG image, title and description.
- [ ] `/robots.txt` and `/sitemap.xml` return 200 with the canonical host.
- [ ] The JSON-LD validates as a `Person`.

## Accessibility
Document language and title are set; the title names the person and role.

## Edge cases and errors
If the canonical domain changes, update `index.html`, `robots.txt` and `sitemap.xml` together. Social platforms cache previews, so changes may not show immediately. The Open Graph image is not generated from the content; it must be re-made by hand.

## Files
`src/index.html`, `public/og-image.png`, `public/robots.txt`, `public/sitemap.xml`

## Related
[app-icon](app-icon.md), [ssr-and-deploy](ssr-and-deploy.md)

## Change log
- 2026-11-18: baseline written from code.
- 2026-11-19: amended by [CHG-0025](../changes/0025-public-assets-and-seo-files.md) (robots.txt, sitemap.xml, richer meta and JSON-LD).
