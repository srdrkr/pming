# `npx pming init` — CLI Specification

*Date: February 12, 2026*

---

## Philosophy

The init is NOT the product. The product is what happens in sessions 2, 3, and 10. Init's job is to get the user to a first conversation fast, capture just enough context that session 2 feels different from session 1.

**Design principles:**
- Rush to chat. Get them talking to their AI within 5 minutes.
- Don't front-load value. Earn it over time.
- Every question asked must result in a file that makes the next session better.
- If we don't know what to do with an answer, don't ask the question.

---

## The Experience (5-7 minutes total)

### Phase 1: Quick Setup (1-2 minutes)

```
$ npx pming init

🧠 pming — your AI PM workspace

Let's set up your workspace. This takes about 5 minutes.

What's your name? 
> Jeremiah Weise

What's your role? (e.g., "Senior PM at Acme Corp")
> Group Product Manager at Keap

What AI tool do you primarily use? 
  ❯ Claude Desktop / Claude.ai
    Cursor
    Claude Code
    Other (manual setup)
```

**What this does:**
- Creates the workspace directory structure
- Writes `USER.md` with name and role
- Generates the appropriate config file:
  - Claude Desktop → `CLAUDE.md`
  - Cursor → `.cursorrules`  
  - Claude Code → `CLAUDE.md`
  - Other → `AGENTS.md` (generic)
- Config file includes: agent personality, skill discovery instructions, memory management rules

**Why we ask about the AI tool:**
- Config file name and format differs (CLAUDE.md vs .cursorrules vs AGENTS.md)
- Skill invocation instructions may vary slightly
- Future: tool-specific optimizations

### Phase 2: Product Context (2-3 minutes)

```
Tell me about your product in a few sentences. 
(What does it do? Who's it for? What stage is it at?)

> Keap is a CRM and marketing automation platform for small 
> businesses. We were acquired by Thryv last year. I lead the 
> AI initiative, platform unification, and third-party ecosystem.

Got it. I've saved that to context/product.md.

Now — one specific thing you're working on right now.
A feature, a project, an initiative. Just one.

> We're building an AI Copilot that lets users interact with 
> their CRM data through natural language. POC is working, 
> trying to get to internal beta.

Saved to context/projects/ai-copilot.md.
```

**What this does:**
- Creates `context/product.md` from their product description
- Creates one `context/projects/[slug].md` from their current focus
- These two files are the seed. Everything else grows from here.

**Why just one project:**
- Reduces friction (asking for all projects is overwhelming)
- Creates the pattern (user sees the file, understands the structure)
- More projects get added naturally through skill usage

### Phase 3: First Conversation Nudge (1-2 minutes)

```
✅ Your workspace is ready!

📁 Created:
   CLAUDE.md          — Your AI assistant's operating manual
   USER.md            — Your profile  
   context/product.md — Your product context
   context/projects/  — Your current project
   skills/            — 5 PM skills ready to use
   memory/            — Where context compounds over time

🚀 What to do next:

Open this folder in Claude Desktop (or your AI tool) and 
start a conversation. Try one of these:

  "Tell me more about what you know about me and my product"
  "Prep me for a meeting with my VP tomorrow"
  "I just made a decision I want to log"

The more you use it, the smarter it gets. See you in there.
```

**What this does:**
- Shows what was created (transparency builds trust)
- Gives 3 starter prompts (reduces blank-page anxiety)
- Sets the expectation: this gets better with use

---

## What Init Creates

```
pming-workspace/
├── CLAUDE.md                    # Agent config (or .cursorrules)
├── USER.md                      # Name, role, preferences (sparse initially)
├── context/
│   ├── product.md               # Product description from init
│   ├── stakeholders/            # Empty — populated by meeting prep skill
│   │   └── .gitkeep
│   ├── projects/
│   │   └── [first-project].md   # One project from init
│   └── decisions/               # Empty — populated by decision log skill
│       └── .gitkeep
├── memory/
│   ├── long-term.md             # Empty — curated over time
│   └── .gitkeep
├── skills/
│   ├── meeting-prep/
│   │   └── SKILL.md
│   ├── stakeholder-update/
│   │   └── SKILL.md
│   ├── decision-log/
│   │   └── SKILL.md
│   ├── prd-draft/
│   │   └── SKILL.md
│   └── rice-scoring/
│       └── SKILL.md
└── templates/
    ├── stakeholder-template.md
    ├── project-template.md
    └── decision-template.md
```

### Files That Are Pre-Written (Not Generated)
- `CLAUDE.md` — agent personality, skill discovery, memory management (template with user name/role injected)
- All `SKILL.md` files — shipped as-is, not customized per user
- All templates — starting points for manual creation

### Files That Are Generated From User Input
- `USER.md` — name, role (enriched over time through usage)
- `context/product.md` — product description
- `context/projects/[slug].md` — first project

### Files That Start Empty (Populated Through Usage)
- `context/stakeholders/` — created and enriched by cross-cutting behaviors (see architecture doc)
- `context/decisions/` — created by cross-cutting behaviors when decisions are made in any context
- `memory/long-term.md` — agent curates this over sessions
- `memory/YYYY-MM-DD.md` — created per session as needed

> **Note:** Stakeholder and decision files aren't owned by any single skill. They're populated by **cross-cutting agent behaviors** defined in CLAUDE.md — any skill or conversation that surfaces stakeholder context or decisions triggers enrichment. See "Cross-Cutting Behaviors" in the architecture doc.

---

## The CLAUDE.md (Agent Config)

This is the most important file. It turns a generic Claude session into a PM-aware assistant. Key sections:

```markdown
# Your PM Assistant

You are a product management assistant working with [Name], 
a [Role]. Your workspace contains structured context about 
their product, team, and decisions.

## How to Work

- Read USER.md and context/product.md at the start of every session
- Check memory/ for recent session notes
- Be direct and opinionated — PMs need thought partners, not yes-machines
- When you learn something worth remembering, save it to the appropriate file
- When a decision is made in conversation, offer to log it

## Skills

You have access to specialized PM skills in the skills/ directory.
When a task matches a skill, read its SKILL.md and follow it.

Available skills:
- meeting-prep — Prepare for upcoming meetings
- stakeholder-update — Generate tailored status updates  
- decision-log — Capture and retrieve decisions
- prd-draft — Draft PRDs grounded in your product context
- rice-scoring — Score and prioritize with pushback

## Memory

- Save session notes to memory/YYYY-MM-DD.md
- Curate long-term insights to memory/long-term.md
- Update stakeholder and project files when you learn new information
- Prefer retrieval-led reasoning over pre-training-led reasoning
  for anything about this user's product, team, or decisions
```

---

## What Init Does NOT Do

- ❌ Ask about stakeholders (meeting prep bootstraps this)
- ❌ Ask about team structure (emerges through usage)
- ❌ Ask about communication preferences (too abstract upfront)
- ❌ Generate dummy/example data (everything should be real)
- ❌ Require an account, login, or API key
- ❌ Phone home or collect analytics (trust through transparency)

---

## The Session 2 Moment (Why This Works)

The entire init is designed for one payoff: **Session 2 feels different.**

Session 1: User chats with an AI that knows their name, role, product, and one project. Better than generic Claude, but not dramatically.

Session 2: User comes back. The AI remembers. It references yesterday's conversation. It knows the project status. If they used meeting prep, it knows their stakeholders. The delta between session 1 and session 2 is the hook.

Session 5: The AI reads your decision log and spots contradictions. You deprioritized Feature X on Feb 3rd — it's right there in `context/decisions/`. Now you're bringing it back. "I see you deprioritized this on Feb 3rd. What changed?" The intelligence isn't temporal memory — it's that the system captured the decision when it happened, so the agent can find it later.

Session 10+: The workspace has accumulated enough context that the AI is genuinely a thought partner. Not because it "remembers" — because the files remember, and the agent reads them. This is the moat. This is what competitors can't replicate with a chatbot.

---

## Open Questions

1. **Do we run `pming init` in the workspace directory, or does it create one?** 
   Leaning: creates `./pming-workspace/` in current directory. Or maybe just `./` with a flag.

2. **Package manager**: `npx pming init` vs `npx create-pming` vs `npx @productshadow/init`?
   Leaning: `npx pming init` (clean, matches the brand)

3. **Updates**: How do users get new/updated skills? `pming update`? Auto-check?
   Leaning: `pming update` manual command. No auto-update (trust).

4. **Git**: Should init create a `.gitignore` and suggest version control?
   Leaning: Yes. `.gitignore` with `memory/` excluded by default (private), context/ included.

---

*This spec will evolve as we build. The test is: does a PM go from `npx pming init` to "oh, this is different" in under 10 minutes?*
