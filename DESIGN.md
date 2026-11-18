---
name: Marco O. Amira Portfolio
description: A monospace developer portfolio with frosted-blue accents, light and dark themes, and soft glass layers.
colors:
  canvas-light: "#fcf8fa"
  surface-light: "#e8e9f3"
  ink-light: "#272635"
  ink-muted-light: "#575665"
  hairline-light: "#cecece"
  frosted-teal: "#1b6375"
  canvas-dark: "#1C1A27"
  surface-dark: "#2A1B3D"
  ink-dark: "#fcf8fa"
  ink-muted-dark: "#cecece"
  hairline-dark: "#42414D"
  frosted-blue: "#b1e5f2"
  midnight-navy: "#1F2A40"
  deep-ink: "#121220"
  track-org-light: "#c2410c"
  track-org-dark: "#f24e1e"
  track-award-light: "#a16207"
  track-award-dark: "#eab308"
  error: "#ba1a1a"
  success-light: "#1a6b34"
  success-dark: "#7ddc9a"
typography:
  display:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "64px"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display-mobile:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  headline-lg:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "32px"
    fontWeight: 600
    lineHeight: 1.3
  headline-md:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.4
  body-lg:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
rounded:
  sm: "0.125rem"
  lg: "0.25rem"
  xl: "0.5rem"
  full: "0.75rem"
  card-lg: "1rem"
spacing:
  unit: "8px"
  gutter: "24px"
  section-mobile: "64px"
  section-desktop: "120px"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.ink-light}"
    textColor: "{colors.ink-dark}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.xl}"
    padding: "16px 32px"
  button-primary-dark:
    backgroundColor: "{colors.frosted-blue}"
    textColor: "{colors.ink-light}"
    rounded: "{rounded.xl}"
    padding: "16px 32px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink-light}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.xl}"
    padding: "16px 32px"
---

# Design System: Marco O. Amira Portfolio

## Overview

**Creative North Star: "The Terminal Atelier"**

An engineer's monospace discipline in a studio's soft, gradient-washed room. Headings, labels and buttons are set in JetBrains Mono, which keeps the page technical and honest, while body text is IBM Plex Sans for comfortable reading; while pastel gradients, translucent glass and rounded corners keep it approachable rather than austere. The chronological Journey timeline borrows the language of a git commit log, so the page reads as a record of work.

The system is calm and spacious: wide section padding, a single 1200px column, one accent hue. Light mode is a clean off-white canvas; dark mode is deep indigo and plum with a glowing frosted-blue accent. Both themes are first-class and the user can switch.

**Key Characteristics:**
- Two families: JetBrains Mono for headings, labels and tags; IBM Plex Sans for running text. Hierarchy comes from size, weight and caps labels.
- One accent hue, frosted blue, shifted per theme for contrast.
- Tonal gradient backdrops that change from section to section.
- Soft, rounded, glassy components; glow only in dark mode.
- Git-flavored timeline motifs in Journey.

## Colors

A cool, low-chroma palette: off-white and lavender-grey in light, indigo and plum in dark, joined by one blue-teal accent.

### Primary
- **Frosted Teal** (`#1b6375`): accent on light surfaces; links, tags, active indicators.
- **Frosted Blue** (`#b1e5f2`): the same accent in dark mode, and on any always-dark band.

### Neutral
- **Paper Blush** (`#fcf8fa`) / **Indigo Night** (`#1C1A27`): page canvas, light / dark.
- **Lavender Mist** (`#e8e9f3`) / **Plum Shadow** (`#2A1B3D`): cards and containers, light / dark.
- **Shadow Grey** (`#272635`) / **Paper Blush**: primary text and primary button fill.
- **Pale Slate** (`#575665`) / **Silver** (`#cecece`): muted text, light / dark.
- **Hairline** (`#cecece`) / **Gunmetal** (`#42414D`): borders and dividers.
- **Midnight Navy** (`#1F2A40`) and **Deep Ink** (`#121220`): gradient end stops and the always-dark section.
- **Ink on Accent** (`#272635`, `--color-on-accent`): text on filled accent surfaces (buttons, active chips) in dark mode. Use `text-on-accent`, never a raw hex.
- **Track Orange** (`#c2410c` light / `#f24e1e` dark) and **Track Amber** (`#a16207` light / `#eab308` dark): Journey org and award tracks only (`--color-track-org`, `--color-track-award`).
- Status: error `#ba1a1a` (light) / `#ffb4ab` (dark, 2.45:1 failed on the plum surface otherwise); success `#1a6b34` (light) / `#7ddc9a` (dark).

### Named Rules
**The One Accent Rule.** The frosted blue is the only chromatic accent. The one exception is the Journey timeline, whose org (orange) and award (amber) tracks are data categories, each also coded by line style (dashed, dotted); light-mode values are darkened to clear 3:1. Do not add any other hue.

**The Dark Band Rule.** On the always-dark section (`.accent-on-dark`), use the light accent `#b1e5f2` in every theme; the light-theme accent is only about 2:1 against it.

## Typography

**Display and Label Font:** JetBrains Mono (with generic monospace fallback). **Body Font:** IBM Plex Sans (with generic sans-serif fallback). Both can change in a later redesign; neither is a binding brand commitment.

**Character:** Technical headings over a calm, readable sans body; the mono is for what looks like code or a label, the sans is for sentences.

### Hierarchy
- **Display** (700, 64px / 40px mobile, 1.1 / 1.2, -0.02em): hero name only.
- **Headline Large** (600, 32px, 1.3): section titles.
- **Headline Medium** (600, 24px, 1.4): card and subsection titles.
- **Body Large** (400, 18px, 1.6): lead paragraphs.
- **Body** (400, 16px, 1.6): running text.
- **Body Small** (400, 14px, 1.5; `text-body-sm`): compact card titles such as Journey milestones (set bold at the use site).
- **Label** (600, 12px, 0.1em, uppercase): buttons, tags, eyebrows.

### Named Rules
**The Caps Label Rule.** Uppercase tracked text is reserved for the 12px label style (buttons, tags); never for body or headlines.

## Layout

Single centered container, max 1200px, 24px gutters, 8px base unit. Sections pad 120px vertically on desktop and 64px on mobile. Each section sits on its own horizontal gradient backdrop (ghost, frosted, white, dark) so the page changes tone as it scrolls. Journey places three commit tracks (main, org, award) down the center on desktop and as parallel left rails on mobile. Anchor scrolling clears the sticky header (`scroll-padding-top: 6rem`) and the fixed chat and theme buttons (`scroll-padding-bottom: 7rem`).

## Elevation & Depth

Tonal layers and gradient backdrops carry depth; shadows are not used at rest. Cards lift by being a different surface tone from the canvas, and by translucent white-alpha glass (5% to 20% in dark, higher in light). Glow is dark-mode only: `box-glow`, `box-glow-border` and `active-glow` use a frosted-blue halo for primary actions and active states.

### Shadow Vocabulary
- **Box Glow** (`box-shadow: 0 0 12px rgba(177,229,242,.6), 0 0 24px rgba(177,229,242,.3)`): dark-mode primary buttons.
- **Border Glow** (`box-shadow: 0 0 10px rgba(177,229,242,.3), inset 0 0 4px rgba(177,229,242,.1)`): dark-mode outline buttons and active cards.
- **Active Glow** (`box-shadow: 0 0 15px rgba(177,229,242,.5)`): selected state.

- **Card Lift** (`box-shadow: 0 10px 20px rgba(0,0,0,.12)`; skill cards on hover: `0 8px 24px rgba(0,0,0,.15)` plus a faint blue halo): neutral offset shadows that appear only on hover, never at rest.

### Named Rules
**The Dark-Only Glow Rule.** Glow appears only in dark mode; light mode stays flat.

## Shapes

Soft, rounded rectangles. Buttons and cards use 0.5rem (8px) to 0.75rem; the scale is 0.125rem / 0.25rem / 0.5rem / 0.75rem, with larger rounded-xl and rounded-full shapes in places such as chat and chips. Skill cards use 1rem (`card-lg`). Borders are 1px hairlines; no sharp 0px corners.

## Components

### Buttons
- **Shape:** rounded rectangle (8px).
- **Primary:** Shadow Grey fill, off-white label, 16px 32px padding, uppercase 12px label with a leading or trailing icon. Dark mode: Frosted Blue fill, dark text, box glow.
- **Outline:** 1px border in text colour, transparent fill; fills on hover. Dark mode: accent border with border glow.
- **Hover / Focus:** background and colour swap over 300ms; `active:scale-95` press. Focus uses a 2px accent outline with a 2px contrasting gap.

### Cards / Containers
- **Corner Style:** 8px to 12px.
- **Background:** Lavender Mist (light) / Plum Shadow (dark), or translucent glass.
- **Border:** 1px Hairline / Gunmetal; in dark, hovered cards pick up a 40% frosted-blue border.

### Inputs / Fields
- **Style:** hairline border, Indigo Night fill in dark, off-white text.
- **Focus:** the global 2px accent outline.
- **Error:** `#ba1a1a`.

### Navigation
Sticky glass header (backdrop blur) with a typewriter logo: it reads "mr" and expands to "marCodes" on hover. A skip link appears on focus. A fixed theme toggle and chat button sit at the bottom corners.

### Journey Timeline (signature)
Git-commit-style vertical timeline with three tracks (main, org, award) and dot nodes; cards reveal on scroll unless reduced motion is requested.

### Certificate Marquee
Two opposing, infinitely scrolling rows of certificates that pause under reduced motion; a modal opens details.

## Do's and Don'ts

### Do:
- **Do** use the type tokens (`font-body-md`, `text-label-caps`) rather than raw sizes or font names.
- **Do** use one accent hue per theme (`#1b6375` light, `#b1e5f2` dark).
- **Do** keep every tap target at least 44px (`.tap-44`).
- **Do** respect `prefers-reduced-motion`; all transitions collapse.
- **Do** keep light mode flat and reserve glow for dark mode.

### Don't:
- **Don't** add a second accent colour outside the Journey track hues.
- **Don't** use accent `#1b6375` on the always-dark section; use `#b1e5f2`.
- **Don't** put shadows on resting elements.
- **Don't** hide content by default behind scroll reveals; content must be visible without JavaScript or reduced-motion preference.
