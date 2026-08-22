> [!NOTE]
> **Archived predecessor.** pming was superseded by [Phronesis](https://craftphronesis.com). The current package is available on [npm](https://www.npmjs.com/package/phronesis).

# pming

**Your PM brain, scaffolded.** Go from zero to a context-rich AI workspace in under 5 minutes.

```bash
npx pm-brain init
```

---

## Why

AI assistants are only as good as the context you give them. Most PMs start every session from scratch — re-explaining their product, their team, their priorities. pming fixes that.

One command creates a structured workspace that persists across sessions. Your AI assistant gets your product context, stakeholder map, decision history, and reusable PM skills from the first prompt. The more you use it, the smarter it gets.

## Philosophy

Context compounds, templates don't. Skills are the new features.

Generic AI chat is broad but shallow: it can answer almost anything, but it rarely knows enough about your actual work to make sharp calls. pming flips that by giving the model structured, persistent context about your product, org, decisions, and constraints.

Then it adds opinionated skills with clear workflows. Instead of "give me a PRD" and hoping for the best, you trigger a repeatable process that uses your context, asks the right questions, and outputs artifacts you can ship to real stakeholders.

The result is leverage that improves over time. Better context makes skills better. Better skill outputs enrich your context. That loop is the product.

## What You Get

```
your-workspace/
├── CLAUDE.md              # AI assistant operating manual
├── .gitignore             # Keeps session memory private by default
├── USER.md                # Your profile — role, preferences, working style
├── context/
│   ├── product.md         # Product overview, metrics, priorities
│   ├── stakeholders/      # One file per person (auto-maintained)
│   ├── projects/          # Active projects with status tracking
│   └── decisions/         # Decision log with reasoning
├── memory/
│   └── long-term.md       # Insights that compound across sessions
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

1. **`npx pm-brain init`** — answer 5 questions about you and your product
2. **Open in your AI tool** — it reads the config and context files automatically
3. **Work normally** — decisions, stakeholders, and insights accumulate across sessions
4. **Context compounds** — each session builds on the last

Your AI assistant becomes a genuine thinking partner — not because it's smarter, but because it *remembers*.

## How Skills Work

1. You ask in natural language ("prep me for this exec meeting", "log this decision", "draft a PRD for this initiative").
2. The assistant maps your request to a skill and reads that skill's `SKILL.md`.
3. It follows the workflow in that file, pulling from your workspace context.
4. It produces a concrete artifact (brief, decision log, draft, update) and updates context where appropriate.

This creates a mesh, not a menu. Each skill output becomes structured context that strengthens the next skill run.

## License

MIT

---

Built by [Product Shadow](https://productshadow.app)
