# Product Shadow V2 — Architecture & MVP Decisions

*Date: February 11, 2026*
*Authors: Jeremiah Weise + Dross*

---

## Vision

Product Shadow V2 is a **context scaffolding system** for product managers. It creates a structured workspace of markdown files that gives AI assistants persistent memory — your product context, team dynamics, past decisions, and stakeholder preferences — so every conversation starts where the last one left off.

It's not an app. It's not a database. It's the layer that makes your existing AI tools actually useful.
Inspiration/validation:
"Agent Skills" — Anthropic Official Talk
Summary: Anthropic's official presentation on Agent Skills architecture. Core thesis: "We stopped building agents and started building skills instead."
https://www.youtube.com/watch?v=CEvIs9y1uog

"4 Principles of Building AI Systems"
Summary: Watching dozens of community members build "second brain" systems in wildly different ways revealed 4 principles:
https://www.youtube.com/watch?v=_gPODg6br5w


## Core Thesis

RAG alone isn't enough. V1 proved that. The moat is **structured context + opinionated agent behavior + compound memory.** Most competitors are building smarter search. We're building a system that builds itself around you.

Key insight: The magic isn't "files on disk." It's that the AI has direct, unrestricted access to a structured context system it can read, write, and maintain without going through an API, a UI, or a permission layer.

### The Dual-Purpose Test

Every skill output is secretly an input. A PRD draft doesn't just produce a document — it captures decisions, stakeholder requirements, and technical constraints that make the next meeting prep sharper. Meeting prep doesn't just produce talking points — it captures political dynamics that make the next stakeholder update more incisive. RICE scoring doesn't just produce a ranked list — it captures prioritization rationale that the next PRD can reference.

This isn't a linear flywheel. It's a **context mesh** — every skill feeds every other skill, like a knowledge graph where usage in any node enriches the entire system.

**The design principle:** For every skill, ask: *what new input did this output create?* If the answer is "nothing," the skill is incomplete. A skill that produces perfect output but captures zero context is a bad skill — it delivered value once but didn't compound.

This is the moat. Competitors can build a better chatbot. They can't replicate a system where 3 months of accumulated, cross-referenced context makes every interaction meaningfully better than the last.

---

## Architecture Decisions

### Local-First, Cloud-Synced

- Context lives as **structured markdown files** in a local directory
- Source of truth is the folder, not a database
- Works with Claude Desktop, Claude Cowork, Claude Mobile, IDE integrations via MCP
- Sync is a paid feature (future), not the foundation
- No "upload your docs" screen — upload is where products go to die

### The Product Is Structure + Agent Behavior

- An opinionated workspace scaffold that an AI knows how to use and maintain
- Project config file (equivalent to CLAUDE.md / AGENTS.md) defines:
  - Agent personality and working style
  - User profile and preferences
  - Skill discovery and invocation rules
  - Memory management instructions
- Every new Claude session reads this config → behaves as if it has persistent context

### Scaffolding, Not Upload

- Setup process creates the structure and populates initial context
- CLI for power users: `npx pming init`
- Hosted onboarding wizard (future) for everyone else
- Context bootstrapping built into skills — the system populates itself through usage

### Skills Are Core

- Shipped with the scaffold from day one
- Skills = markdown instruction files, not plugins or SDKs
- Vetted, opinionated PM workflows that reference your actual context
- Readable in 30 seconds — trust through transparency
- Three invocation modes:
  - **Explicit**: User asks for it ("prep me for my meeting")
  - **Suggested**: Agent recognizes conversational cues and offers
  - **Woven**: Agent behavior instructions internalize skill principles

---

## Capability Stack (What Users Get)

### Without Hosted Services (Free Scaffold)
- ✅ Persistent context across sessions (compound memory)
- ✅ Opinionated agent behavior (personality, PM frameworks, working style)
- ✅ Skills on demand (explicit invocation + conversational triggers)
- ✅ Context bootstrapping (skills build context as they're used)
- ✅ Graceful degradation (works with zero pre-existing context, gets better over time)
- ⚠️ Semi-proactive (conversational triggers, not calendar-driven)
- ❌ True proactive agency (no heartbeats, calendar watching, background work)

### With Hosted Services (Paid Tier — Future)
- ✅ Everything above, plus:
- ✅ Cloud sync across devices
- ✅ Mobile access
- ✅ Proactive agent (calendar integration, background prep, reminders)
- ✅ Hosted onboarding wizard
- ✅ Team workspaces (eventually)

---

## Business Model

Follows the Obsidian model: free core, paid services.

| Tier | What | Price |
|------|------|-------|
| **Free** | CLI scaffold + workspace templates + core skills + works with Claude Desktop/Cowork | $0 |
| **Pro** | Cloud sync + mobile access + hosted onboarding wizard | TBD |
| **Team** | Shared context, team skills, org-level memory | TBD (future) |

Distribution strategy: Open-source scaffold creates the user base. Nerds evangelize. Normal PMs hit the hosted onboarding and start paying. Lock-in is accumulated context, not platform.

---

## 5 Core Skills (MVP)

Ordered by "holy shit" moment for new users:

### 1. Meeting Prep
- Reads stakeholder profiles, recent decisions, project status
- Generates: what each attendee cares about, your agenda, landmines, open questions
- **Context bootstrapping**: If stakeholder profiles don't exist, asks 2-3 questions, saves answers for next time
- **Compound moment**: "I saved notes on Mike — next time I'll already know his priorities"
- Degrades gracefully: thin context → still useful questions; rich context → magic

### 2. Stakeholder Update Generator
- Reads recent decisions, project status, stakeholder profiles
- Generates tailored updates per audience (eng gets specs, execs get outcomes)
- Low effort in, high value out — a single Slack exchange can be the source
- Immediate daily value for every PM

### 3. Decision Log
- Captures: what was decided, why, alternatives considered, who was involved, tradeoffs
- Triggered conversationally ("woven" mode) — agent recognizes decisions being made and offers to log
- **The retention hook**: Other skills reference the decision log (PRDs cite decisions, meeting prep surfaces relevant history)
- This is where "context that compounds" becomes real over months

### 4. PRD Draft
- Reads product context, prior decisions, technical constraints, team structure
- Generates first draft grounded in YOUR product, not generic templates
- 70% done on first generation — user edits, not creates
- Less frequent than meetings/updates but essential for the PM workflow

### 5. Prioritization & Decision Support
- Matches the right framework to the situation: SPADE for hard decisions, Tradeoff Analysis for backlog ranking, Strategy Test for big bets, Direct Pushback for gut checks
- **Replaces RICE scoring** — numerical scoring systems produce false precision from subjective inputs. Tradeoff articulation in plain language is more honest and more useful.
- **Pushes back** on weak reasoning ("What's that score based on?", "Would you bet money on that confidence rating?")
- Uses SPADE (Gokul Rajaram / Square) for consequential decisions: Setting → People → Alternatives → Decide → Explain
- Every prioritization call connects to the Decision Log — killing something is a decision worth capturing

---

## Cross-Cutting Behaviors

Skills are specific workflows. But some behaviors operate *across* all skills and conversations. These live in **CLAUDE.md** (the agent config), not in individual skill files.

### 1. Stakeholder Enrichment
Any time a person is mentioned and the agent learns something new — priorities, communication style, political stance, reporting relationships — update or create their file in `context/stakeholders/`.

- **Don't ask permission for enrichment** of existing files (it's maintenance, not a decision)
- **Do ask before creating a new stakeholder file** for the first time ("I'd like to save notes on Mike — okay?")
- **Sources are everywhere:** Meeting prep, Slack thread analysis, status updates, casual conversation. A user saying "draft a reply to this thread" reveals as much about stakeholder dynamics as a dedicated meeting prep session.

### 2. Decision Capture
Any time a decision is made in conversation — explicitly or implicitly — offer to log it in `context/decisions/`.

- Triggered conversationally: the agent recognizes decisional language ("let's go with," "we're not doing," "I decided to")
- Captures: what, why, alternatives considered, who was involved
- Light touch: "Sounds like you decided X. Want me to log that?" — one question, not a form

### 3. Context Bootstrapping
Any time information is missing that would make the current task better — ask for it, then save it.

- **One question at a time**, not an interrogation
- **Save the answer immediately** to the right file
- **Tell the user you saved it** — the compound moment is explicit
- Skills can trigger bootstrapping (meeting prep asks about unknown attendees), but the behavior pattern is universal

### Why This Matters

Without cross-cutting behaviors, each skill is an island. Meeting prep knows about stakeholders but Slack reply doesn't. With them, **every interaction makes every future interaction better** — regardless of which skill triggered it. This is the compound flywheel.

---

## Workspace Structure (Draft)

```
pming-workspace/
├── CLAUDE.md              # Agent config: personality, behavior, skill discovery
├── USER.md                # User profile: role, preferences, working style
├── context/
│   ├── product.md         # Product overview, positioning, key metrics
│   ├── stakeholders/      # One file per person: role, priorities, relationship
│   │   ├── mike-hilton.md
│   │   └── ...
│   ├── projects/          # Active projects: status, goals, blockers
│   │   ├── ai-copilot.md
│   │   └── ...
│   └── decisions/         # Decision log entries (auto-generated by skill)
│       ├── 2026-02-11-vendor-selection.md
│       └── ...
├── memory/
│   ├── YYYY-MM-DD.md      # Daily session notes (auto-maintained)
│   └── long-term.md       # Curated insights that compound
├── skills/
│   ├── meeting-prep/
│   │   └── SKILL.md
│   ├── stakeholder-update/
│   │   └── SKILL.md
│   ├── decision-log/
│   │   └── SKILL.md
│   ├── prd-draft/
│   │   └── SKILL.md
│   └── prioritization/
│       └── SKILL.md
├── references/
│   └── pm-codex.md        # PM excellence principles (living doc, grows with usage)
└── templates/             # Starting templates for new files
    ├── USER.md
    ├── product.md
    ├── stakeholder-template.md
    ├── project-template.md
    └── decision-template.md
```

---

## PM Codex

A living reference of PM excellence principles that ships with curated seed content and grows through usage.

**Design:**
- Ships with ~12 seed principles across decisions, prioritization, communication, product thinking, and working with AI
- The CLAUDE.md references it: "If `references/pm-codex.md` exists, use it to calibrate your frameworks"
- The agent suggests additions when it observes the PM making strong judgment calls: "That's a sharp instinct. Want me to add that to your PM Codex?"
- "Your Principles" section at the bottom is explicitly the PM's own space
- Over time, becomes the PM's personal playbook — curated wisdom from their own decisions, not just ours

**Why this matters for the moat:** Competitors can copy our skills. They can't copy 6 months of a PM's accumulated judgment codified into their personal Codex. This is personalization that compounds.

---

## Naming & Branding

- **Brand**: Product Shadow — landing page at productshadow.app
- **Tool**: `pming` (CLI name) — from pming.app ("I'm PM-ing this")
- **Repo**: `~/Developer/pming/` (dedicated repo, separate from V1 codebase)
- **V1 codebase**: Preserved in `~/Developer/product-shadow/`. Landing page continues serving both eras.

---

## Sequencing

### Phase 1: Build & Validate the Structure (IN PROGRESS)

**Status as of 2026-02-14:**
- ✅ 5 core skills written (meeting prep, decision log, stakeholder update, PRD draft, prioritization)
- ✅ CLAUDE.md agent template written
- ✅ All templates written (stakeholder, project, decision, USER.md, product.md)
- ✅ PM Codex seed written
- ✅ CLI init spec written
- 🔲 CLI build PRD (next — for Ralphy execution)
- 🔲 Build CLI via Ralphy loop
- 🔲 Internal dogfood
- 🔲 External testing with 3-5 PMs

**Build strategy:** Ralphy loop — comprehensive PRD → Claude Code agents execute tasks (branch-per-task, PR review) → manual integration/polish. Opus for all build agents (foundation matters).

**Ship:** CLI scaffold + context templates + 5 core skills + PM Codex
**Distribution:** GitHub repo, `npx pming init`
**Test with:** Internal Thryv PMs (dogfood) + selective external PMs
**Success metric:** Do users who set it up keep using it after 2 weeks?

### Phase 2: Community
- Other PMs contribute skills
- We curate for quality and trust
- Skills repo grows organically

### Phase 3: Lower the Bar
- Hosted onboarding wizard (pming.app or productshadow.app)
- Guided setup: asks about your role, product, team → generates populated workspace
- Free or paid TBD based on Phase 1 learnings

### Phase 4: Scale
- Cloud sync ($)
- Mobile access ($)
- Team workspaces ($)
- Proactive agent tier (calendar, background work, reminders)

---

## Open Questions (To Resolve Through Iteration)

1. ~~**What carries from V1?**~~ **Resolved:** Start fresh. V1 codebase preserved but not carried forward.
2. **Claude Desktop project support**: Do enterprise Claude/Cowork users get directory/project functionality? Determines internal dogfooding feasibility at Thryv.
3. **Hosted wizard scope**: How much context can we generate from a 5-minute onboarding flow? Needs prototyping. (Phase 3)
4. **Skill marketplace timing**: When does community contribution become a real thing vs. distraction? After Phase 2 at earliest.
5. **MCP server role**: Does the scaffold include an MCP server for tool-use, or is file reading sufficient for MVP? Leaning toward files-only for simplicity.
6. **PM Codex depth**: How many seed principles is the right amount? Current: ~12. Too few feels empty, too many feels prescriptive. Test with dogfood users.
7. **Dual-audience PRD testing**: The two-audience test (human-readable + agent-buildable) is a core principle. Need to validate with real coding agents building from pming-generated PRDs.

---

## What This Doc Doesn't Cover (Yet)

- Competitive analysis (how this positions against Notion AI, Guru, etc.)
- User research plan for Phase 1 testers
- Pricing research for Pro/Team tiers
- Marketing strategy for public launch (Greg Isenberg x Boring Marketer skill-chaining pattern identified as launch approach)

---

## Artifacts

| Artifact | Path | Status |
|----------|------|--------|
| V2 Thesis | `docs/v2-thesis.md` | Written |
| V2 Architecture (this doc) | `docs/v2-architecture.md` | Living doc |
| CLI Init Spec | `docs/cli-init-spec.md` | Draft — review pending |
| CLAUDE.md Template | `pming/CLAUDE.md` | Draft — Jeremiah approved 2026-02-14 |
| Meeting Prep SKILL.md | `pming/skills/meeting-prep/SKILL.md` | Draft — review pending |
| Decision Log SKILL.md | `pming/skills/decision-log/SKILL.md` | Draft — Jeremiah approved 2026-02-14 |
| Stakeholder Update SKILL.md | `pming/skills/stakeholder-update/SKILL.md` | Draft — Jeremiah approved 2026-02-14 |
| PRD Draft SKILL.md | `pming/skills/prd-draft/SKILL.md` | Draft — Jeremiah approved 2026-02-14 |
| Prioritization SKILL.md | `pming/skills/prioritization/SKILL.md` | Draft — replaces RICE Scoring, approved 2026-02-14 |
| CLI Build PRD | `PRD.md` | Ready for Ralphy execution — 2026-02-14 |

---

*This document captures decisions made during the Feb 11-12, 2026 Product Shadow V2 sessions. It's a living doc — update as we learn.*
