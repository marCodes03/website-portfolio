# Brand & Design Guidelines for WebsitePortfolioTest

This document defines the visual design system, typography, colors, and interactive guidelines for **WebsitePortfolioTest**. It acts as a reference to keep all components visually cohesive and consistent.

---

## 🎨 Visual Identity & Aesthetic Concept

The design is built on a **premium, high-contrast, modern developer aesthetic**. 
- **Tech-meets-Creative**: Uses monospace typefaces paired with soft, elegant gradient backdrops to bridge the gap between engineering and clean design.
- **Glassmorphism & Gradients**: Subtle translucent cards with smooth background linear gradients define section transitions.
- **Dual-Theme Design**: Standard light mode that feels clean and spacious, and a highly immersive dark mode centered around deep indigo and rich plum tones.

---

## 🅰️ Typography

The project relies solely on **Roboto Mono** to give a structured, professional, yet technical character to the portfolio.

| Token | Family | Font Size | Font Weight | Line Height | Letter Spacing |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `--font-display-lg` | `"Roboto Mono", monospace` | `64px` | `700` (Bold) | `1.1` | `-0.02em` |
| `--font-display-lg-mobile` | `"Roboto Mono", monospace` | `40px` | `700` (Bold) | `1.2` | `-0.02em` |
| `--font-headline-lg` | `"Roboto Mono", monospace` | `32px` | `600` (Semi-Bold) | `1.3` | Default |
| `--font-headline-md` | `"Roboto Mono", monospace` | `24px` | `600` (Semi-Bold) | `1.4` | Default |
| `--font-body-lg` | `"Roboto Mono", monospace` | `18px` | `400` (Regular) | `1.6` | Default |
| `--font-body-md` | `"Roboto Mono", monospace` | `16px` | `400` (Regular) | `1.6` | Default |
| `--font-label-caps` | `"Roboto Mono", monospace` | `12px` | `600` (Semi-Bold) | `1.0` | `0.1em` (Caps) |

---

## 🎨 Color Palette & Themes

The application features a fully reactive light-to-dark theme. Below are the design tokens used across the themes.

### ☀️ Light Mode Tokens
* **Base background & clean canvas colors** with dark slate typography and frosted blue details.

| Token Name | Hex Value | Application |
| :--- | :--- | :--- |
| `--color-background` | `#fcf8fa` | Global page background canvas |
| `--color-surface` | `#e8e9f3` | Card and element container background (lifts off canvas) |
| `--color-text` | `#272635` | Primary typography, high-contrast text, primary buttons |
| `--color-text-muted` | `#a6a6a8` | Subtitles, captions, and secondary text |
| `--color-border` | `#cecece` | Default subtle borders and dividers |
| `--color-accent` | `#b1e5f2` | Key brand accent color (links, tags, active indicators) |

---

### 🌙 Dark Mode Tokens (`.dark`)
* **Deep Indigo and Rich Plum** tones with high-contrast pastel accent colors.

| Token Name | Hex Value | Application |
| :--- | :--- | :--- |
| `--color-background` | `#1C1A27` | Deep near-black indigo global background canvas |
| `--color-surface` | `#2A1B3D` | Rich plum-shadow card and element container background |
| `--color-text` | `#fcf8fa` | Primary high-contrast off-white typography |
| `--color-text-muted` | `#cecece` | Muted labels, secondary paragraph text, and metadata |
| `--color-border` | `#42414D` | Gunmetal slate borders and dividers |
| `--color-accent` | `#b1e5f2` | Glowing frosted blue accent for active links and active details |

---

## 📐 Layout & Spacing

To keep sections breathable and readable on both desktop and mobile viewports.

- **Desktop Section Padding**: `120px` (`--spacing-section-padding-desktop`)
- **Mobile Section Padding**: `64px` (`--spacing-section-padding-mobile`)
- **Max Content Container Width**: `1200px` (`--spacing-container-max-width`)
- **Gutter Spacing**: `24px` (`--spacing-gutter`)
- **Base Grid Spacing Unit**: `8px` (`--spacing-unit`)
- **Border Radius**:
  - Default: `0.125rem` (`--radius-DEFAULT`)
  - Medium/Large: `0.25rem` (`--radius-lg`)
  - Cards/Inputs: `0.5rem` (`--radius-xl`)
  - Buttons/Modals: `0.75rem` (`--radius-full`)

---

## ✨ Gradients & Visual Effects

The sections transition smoothly into one another using linear gradient backdrops.

### Linear Gradients
* **Section Ghost**:
  * *Light*: `linear-gradient(90deg, #e8e9f3 40%, #b1e5f2 100%)`
  * *Dark*: `linear-gradient(90deg, #1C1A27 40%, #1F2A40 100%)`
* **Section Frosted**:
  * *Light*: `linear-gradient(90deg, #b1e5f2 30%, #ffffff 100%)`
  * *Dark*: `linear-gradient(90deg, #1F2A40 30%, #1C1A27 100%)`
* **Section White**:
  * *Light*: `linear-gradient(90deg, #ffffff 30%, #e8e9f3 100%)`
  * *Dark*: `linear-gradient(90deg, #2A1B3D 30%, #1C1A27 100%)`
* **Section Dark**:
  * *Light*: `linear-gradient(90deg, #272635 30%, #121220 100%)`
  * *Dark*: `linear-gradient(90deg, #1C1A27 30%, #121220 100%)`

### Glassmorphism Opacities
Used extensively for headers, filters, badge pills, and decorative backdrops.
- **Glass-10**: `rgba(255, 255, 255, 0.05)` (Dark mode standard layer)
- **Glass-20**: `rgba(255, 255, 255, 0.1)`
- **Glass-40**: `rgba(255, 255, 255, 0.15)`
- **Glass-60**: `rgba(255, 255, 255, 0.2)`

---

## 🎬 Micro-Animations & Dynamic States

- **Scroll Reveal**: Sections start at `opacity-0` and `translate-y-10`, fading up smoothly via an `IntersectionObserver` in the root component.
- **Accordion Animation**: Utilizes `cubic-bezier(0, 1, 0, 1)` transition on `max-height` for a snappy expanding experience.
- **Hover Transitions**: Interactive elements (buttons, links, certificates) scale or swap colors with smooth `duration-300` or `duration-500` transitions.
