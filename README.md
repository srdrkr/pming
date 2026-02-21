# pming

**Your PM brain, scaffolded.** Go from zero to a context-rich AI workspace in under 5 minutes.

```bash
npx pming-cli init
```

---

## Why

AI assistants are only as good as the context you give them. Most PMs start every session from scratch — re-explaining their product, their team, their priorities. pming fixes that.

One command creates a structured workspace that persists across sessions. Your AI assistant gets your product context, stakeholder map, decision history, and reusable PM skills from the first prompt. The more you use it, the smarter it gets.

## What You Get

```
your-workspace/
├── CLAUDE.md              # AI assistant operating manual
├── USER.md                # Your profile — role, preferences, working style
├── context/
│   ├── product.md         # Product overview, metrics, priorities
│   ├── stakeholders/      # One file per person (auto-maintained)
│   ├── projects/          # Active projects with status tracking
│   └── decisions/         # Decision log with reasoning
├── memory/
│   ├── long-term.md       # Insights that compound across sessions
│   └── YYYY-MM-DD.md      # Daily session notes (auto-created)
├── skills/                # 6 PM workflow skills
│   ├── meeting-prep/      # Context-aware meeting briefs
│   ├── decision-log/      # Structured decision capture
│   ├── stakeholder-update/# Stakeholder-aware communications
│   ├── prd-draft/         # PRDs grounded in your product context
│   ├── prioritization/    # Tradeoff-explicit prioritization
│   └── 11-star-experience/# Airbnb-style experience design
├── templates/             # Starting points for new context files
└── references/
    └── pm-codex.md        # Curated PM principles — yours to grow
```

## The PM Codex

Ships with curated principles from top PMs and founders (Gokul Rajaram, Ami Vora, Adriel Frederick, and others). Designed as a living document — your AI assistant will suggest additions based on strong calls you make in real work. Over time, it becomes *your* playbook.

## Supported Tools

pming detects your AI tool during setup and generates the right config file:

- **Claude Code / Claude Desktop / Cowork / Windsurf** → `CLAUDE.md`
- **Cursor** → `.cursorrules`
- **Other** → `AGENTS.md`

## Requirements

Node.js 18+

## How It Works

1. **`npx pming-cli init`** — answer 5 questions about you and your product
2. **Open in your AI tool** — it reads the config and context files automatically
3. **Work normally** — decisions, stakeholders, and insights accumulate across sessions
4. **Context compounds** — each session builds on the last

Your AI assistant becomes a genuine thinking partner — not because it's smarter, but because it *remembers*.

## Philosophy

Skills are the new features. Context is the new moat. The best AI assistant isn't the one with the most capabilities — it's the one that knows your product, your team, and your history well enough to have an opinion worth hearing.

## License

MIT

---

Built by [Product Shadow](https://productshadow.app)
