# pming

AI-powered PM workspace scaffold. Go from zero to a context-rich AI PM assistant in under 5 minutes.

## Quick Start

```bash
npx pming init
```

Answer 5 questions. Get a fully configured workspace.

## What It Creates

```
pming-workspace/
├── CLAUDE.md              # AI assistant operating manual (or .cursorrules / AGENTS.md)
├── USER.md                # Your profile — name, role, preferences
├── context/
│   ├── product.md         # Product overview, metrics, priorities
│   ├── stakeholders/      # One file per person (auto-maintained)
│   ├── projects/          # Active projects with status tracking
│   └── decisions/         # Decision log entries
├── memory/
│   ├── long-term.md       # Insights that compound across sessions
│   └── YYYY-MM-DD.md      # Daily session notes (auto-created)
├── skills/                # 6 PM workflow skills
│   ├── 11-star-experience/
│   ├── meeting-prep/
│   ├── decision-log/
│   ├── stakeholder-update/
│   ├── prd-draft/
│   └── prioritization/
├── templates/             # Starting points for new files
└── references/            # PM Codex — your principles playbook
```

## Supported AI Tools

- **Claude Desktop / Claude.ai** — generates `CLAUDE.md`
- **Cursor** — generates `.cursorrules`
- **Claude Code** — generates `CLAUDE.md`
- **Claude Cowork** — generates `CLAUDE.md`
- **Other** — generates `AGENTS.md` (same content, generic filename)

## Requirements

Node.js 18 or later.

## How It Works

The workspace gives your AI assistant structured context: who you are, what you're building, past decisions, stakeholder dynamics, and reusable PM skills. Each session builds on the last — the more you use it, the smarter it gets.

Built by [Product Shadow](https://productshadow.app).

## License

MIT
