# Specs

Behavioural specifications for the portfolio site. A spec says **what the site must do** in numbered, testable requirements. `docs/decisions.md` says **why** a choice was made; `docs/portfolio-content.md` holds the **copy** (jobs, projects, certificates). Specs link to both and never duplicate them.

## Layout

| Folder | Holds |
|---|---|
| `pages/` | One spec per page section (what a visitor sees and does there). Baseline of the current site. |
| `features/` | Behaviour shared across pages: navigation, theme, chat bot, toasts, modals, scroll reveal. |
| `platform/` | APIs, security, SEO/meta, icons, SSR and deployment. |
| `quality/` | Cross-cutting bars: accessibility, performance budget, design tokens. |
| `changes/` | **New requirements.** One numbered file per requirement: `NNNN-short-slug.md`. |

`pages/`, `features/`, `platform/` and `quality/` were written from the code on 2026-11-18 and describe the site **as it is**. Anything marked *Unverified* was not confirmed in a browser or against the source.

## Rules

1. **Every new feature or requirement gets its own file in `changes/` before any code is written.** Copy `_template.md`, take the next free number (zero-padded, never reused), write requirements and acceptance criteria, and set `status: draft`.
2. Get the spec approved (`status: approved`), then build it. When it ships, set `status: implemented` and fill in **Files**.
3. A change spec that alters existing behaviour lists the baseline specs it touches under `amends:`. Add one line to each of those baseline specs' **Change log** pointing at the change spec. Do not rewrite the baseline in place.
4. If a later change replaces an earlier one, set the old one to `superseded` and name the new one in `superseded_by:`.
5. Record the *why* of non-trivial choices in `docs/decisions.md` (newest first) and link the spec ID there.
6. Requirements must be testable: say what is observed, not what is intended.

## Status values

`draft` → `approved` → `implemented` → (`superseded`). Baseline specs are `implemented`.

## Index

### Pages
| Spec | Section id |
|---|---|
| [hero](pages/hero.md) | `#home` |
| [about](pages/about.md) | `#about` |
| [experience](pages/experience.md) | `#experience` |
| [skills](pages/skills.md) | `#skills` |
| [career-path](pages/career-path.md) | `#career-path` |
| [portfolio](pages/portfolio.md) | `#projects` |
| [contact](pages/contact.md) | `#contact` |
| [reviews](pages/reviews.md) | `#reviews` (component exists but is **not mounted** on the page) |
| [journey](pages/journey.md) | `#journey` |
| [off-screen-activities](pages/off-screen-activities.md) | `#off-screen-activities` |
| [certificates](pages/certificates.md) | `#certificates` |
| [footer](pages/footer.md) | footer |

### Features
[site-navigation](features/site-navigation.md) · [theme-toggle](features/theme-toggle.md) · [chat-bot](features/chat-bot.md) · [toast-notifications](features/toast-notifications.md) · [detail-modals](features/detail-modals.md) · [scroll-reveal](features/scroll-reveal.md)

### Platform
[api-chat](platform/api-chat.md) · [api-contact](platform/api-contact.md) · [request-guard](platform/request-guard.md) · [seo-and-social-meta](platform/seo-and-social-meta.md) · [app-icon](platform/app-icon.md) · [ssr-and-deploy](platform/ssr-and-deploy.md)

### Quality
[accessibility](quality/accessibility.md) · [performance-budget](quality/performance-budget.md) · [design-tokens](quality/design-tokens.md)

### Changes
| Spec | Title | Status |
|---|---|---|
| [0001](changes/0001-contact-subject-consistency.md) | Contact subject validated the same in form and API | implemented |
| [0002](changes/0002-modal-focus-trap.md) | Trap keyboard focus inside open modals | implemented |
| [0003](changes/0003-toast-pause-and-tokens.md) | Toasts pause on hover/focus and use brand tokens | implemented |
| [0004](changes/0004-local-rate-limiting.md) | Rate limiting also works locally without Upstash | implemented |
| [0005](changes/0005-chat-failure-status.md) | Chat API returns an error status on model failure | implemented |
| [0006](changes/0006-carousel-arrows-on-focus.md) | Projects carousel arrows visible on keyboard focus | implemented |
| [0007](changes/0007-tabs-and-step-semantics.md) | Tab and current-step semantics for Skills and Workflow | implemented |
| [0008](changes/0008-taste-skill-accessibility-fixes.md) | Fix accessibility failures found by the taste-skill checker | implemented |
| [0009](changes/0009-remove-dead-feedbacks-nav-link.md) | Remove the dead "Feedbacks" nav link (Reviews is not on the page) | implemented |
| [0010](changes/0010-chat-announcements-and-escape.md) | Chat announces replies cleanly; Escape closes it from anywhere | implemented |
| [0011](changes/0011-safe-scroll-reveal.md) | Scroll reveal can never leave content hidden | implemented |
| [0012](changes/0012-automated-axe-check.md) | Repeatable AXE check across themes, widths and interactive states | implemented |
| [0013](changes/0013-layout-rhythm.md) | Layout rhythm: hero fit, section length, overlaps and fixed buttons | implemented |

| [0014](changes/0014-critique-round-chat-entry-and-page-flow.md) | Critique round 1: chat entry, AI workflow, page ending, awards, skills by depth, polish | implemented |

| [0015](changes/0015-career-path-length.md) | Workflow Process section fits two screens | implemented |
| [0016](changes/0016-hero-headline-and-copy.md) | Hero headline names the role and one hard fact; consistent main action | implemented |
| [0017](changes/0017-button-system-and-motion.md) | One primary and one secondary button style; no bounce easing | implemented |

| [0018](changes/0018-contact-form-dialog-in-closing-band.md) | Contact section replaced by a "Send a message" dialog in the closing band | implemented |

| [0019](changes/0019-dialog-tap-targets.md) | Dialog controls meet the 44px target size | implemented |

| [0020](changes/0020-typography-jetbrains-mono-plex-sans.md) | Typography: JetBrains Mono for headings and labels, IBM Plex Sans for body | implemented |

| [0021](changes/0021-consistent-section-headings.md) | Every section heading has the blue eyebrow label and the same weight | implemented |

| [0022](changes/0022-chat-thinking-indicator.md) | Chat thinking indicator, slow-reply note and typed-out replies | implemented |

The next number is **0023**. New drafts need your approval before any code is written.
