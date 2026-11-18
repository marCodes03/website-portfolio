# Required AI Skills

`.claude/` is gitignored, so these skills are **not** in the repo. After cloning, install them before asking an AI assistant to design or review UI.

Entries marked **link needed** have no verified source URL yet; add it before relying on them.

| Skill (install name) | Purpose | Source | Install |
|---|---|---|---|
| `impeccable` | Design, critique, audit, polish frontends | https://github.com/pbakaus/impeccable | `npx impeccable install --yes --providers=claude --scope=project` |
| `design-taste-frontend` (taste-skill) | Anti-generic frontend design, checker and finish gate | https://github.com/Leonxlnx/taste-skill | Copy the repo's skill folder to `.claude/skills/taste-skill` (or run its `install.sh`) |
| `frontend-design` | Distinctive visual design guidance | link needed | Copy to `.claude/skills/frontend-design` |
| `ui-ux-pro-max` | UI/UX styles, palettes, fonts, guidelines | link needed | Copy to `.claude/skills/ui-ux-pro-max` |
| `ui-animation` | UI motion, springs, easing | link needed | Copy to `.claude/skills/ui-animation` |
| `web-design-guidelines` | Web Interface Guidelines compliance review | link needed | Copy to `.claude/skills/web-design-guidelines` |
| `vercel-react-best-practices` | React/Next performance rules (Vercel Engineering) | link needed | Copy to `.claude/skills/react-best-practices` |
| `backend-patterns` | Node/Express API and backend patterns | link needed | Copy to `.claude/skills/backend-patterns` |
| `code-review` | Standards + spec review since a commit/branch | link needed | Copy to `.claude/skills/code-review` |

## Notes
- Install at project scope so skills live in `.claude/skills/`. Do not commit them.
- impeccable also adds agents to `.claude/agents/` and a hook to `.claude/settings.local.json`.
- Verify afterwards: each folder in `.claude/skills/` contains a `SKILL.md`.
