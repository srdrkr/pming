# Product Shadow V2 — Thesis

*Captured: 2026-02-10*
*Origin: Morning conversation between Jeremiah & Dross, triggered by Lenny's "Building AI Product Sense" article + How I AI episode on compound skills*

---

## The Core Insight

RAG-based PM tools answer questions. But answering questions isn't the bottleneck — **thinking clearly and compounding context** is.

Product Shadow V1 (RAG + MCP + web UI for doc management) was useful five months ago but is now insufficient. Jeremiah stopped using it in favor of a Claude Code workspace with structured text files, skills, and slash commands. That setup is dramatically more effective.

**Why it works better:**
- Value lives in *documents*, not conversation history
- Structured files accumulate context session over session
- Skills encode repeatable PM workflows
- The agent reads/writes files proactively — it *thinks with you*, not just *answers you*
- Opinions and perspectives compound over time

**The uncomfortable truth:** The "prototype" for Product Shadow V2 already exists. It's Dross's workspace — AGENTS.md, SOUL.md, USER.md, memory/, pm-perspectives/, skills, taxonomy. It was built accidentally by just... doing PM work with an AI agent.

---

## What V1 Got Wrong

- **RAG alone isn't enough.** Retrieval answers "what did we say about X?" but doesn't help with "what should we do about X?"
- **Web UI for doc management** adds friction without enough value. Power users don't need it; non-power users need more than it.
- **No compounding.** Each session starts cold. There's no persistent identity, memory, or accumulated judgment.

---

## What V2 Should Be

A **structured workspace system** that builds itself around a PM, with an opinionated agent that maintains it.

### The Architecture (proven in practice)

| Layer | What It Does | Analog in Dross's Workspace |
|-------|-------------|---------------------------|
| **Identity** | Who the agent is, how it operates | SOUL.md, AGENTS.md |
| **Context** | Who the PM is, their team, their product | USER.md, taxonomy.md |
| **Memory** | Compound knowledge across sessions | MEMORY.md, memory/*.md |
| **Skills** | Repeatable PM workflows | Skills directory, slash commands |
| **Perspectives** | Opinionated takes that evolve | pm-perspectives/ |
| **References** | Product docs, meeting notes, research | PM knowledge base, LennyRAG |

### Key Design Principles

1. **Guided scaffolding, not blank canvas.** Templates: "Here's your PM workspace — drop in your product context, team dynamics, OKRs." The system asks you questions and builds the files.

2. **Pre-built PM skills** that work out of the box:
   - Meeting prep (reads calendar + context, surfaces what matters)
   - Decision log (capture, retrieve, contradiction detection)
   - Stakeholder update generator (channel-aware, audience-tailored)
   - PRD draft (dual-audience: human-readable + agent-buildable)
   - Prioritization & decision support (SPADE for hard decisions, tradeoff analysis for ranking — replaces RICE)

3. **The agent maintains the system.** PMs shouldn't have to be power users of file organization. The agent creates files, updates indexes, suggests what to capture. "Will I ever need to explain this again?" — if yes, the agent writes it down.

4. **Opinions that compound.** Not just "here's what the data says" but "here's what *I* think based on everything I've learned about your product, team, and market." The agent develops PM judgment specific to YOUR context.

5. **Accessible to "dum-dums."** The power of a Claude Code workspace without needing to know what AGENTS.md is or how to structure a skills directory. The system does the hard part.

6. **Dual-purpose actions (The Mesh Principle).** *(Added 2026-02-13)* Every skill output must simultaneously enrich inputs for other skills. Meeting prep doesn't just produce a brief — it populates stakeholder files, surfaces decision history, and flags open questions. These enrichments aren't a linear flywheel; they form a **graph/mesh** where one action touches multiple data nodes. The effect is exponential in early usage: a single meeting prep might enrich stakeholder profiles, decision logs, AND product context — making the *next* RICE scoring, 1:1 prep, and PRD generation all meaningfully better. This is the core compounding mechanism and the primary design constraint: **if a skill only produces output without enriching the mesh, it's incomplete.**

---

## The Moat

Most competitors are building **smarter search** (better RAG, better embeddings, better retrieval). That's table stakes.

The real moat is **structured context + opinionated agent + compound memory.** This is harder to copy because:
- You have to *live it* to design it right (we have)
- The value accrues over time (switching cost increases with use)
- The agent gets better the longer it works with you (personalization moat)
- Pre-built PM skills encode domain expertise competitors would need to develop

---

## Competitive Urgency

> "If we don't build it, I'm sure 20 other people already are." — Jeremiah, 2026-02-10

The window is open but narrowing. The Lenny article is literally telling PMs to build personal AI systems with coding agents. The ones who do will realize the same thing Jeremiah did: RAG isn't enough. Whoever productizes the *compound workspace pattern* first wins.

---

6. **PM Codex** — a living reference of PM excellence principles, shipped with curated seed content and designed to grow with usage. The agent suggests additions when it observes strong judgment calls. Over time, the Codex becomes the PM's own playbook.

---

## What's Next

- [x] Define MVP scope for V2
- [x] Technical architecture: local-first, CLI scaffold, markdown files
- [x] Write 5 core skills (meeting prep, decision log, stakeholder update, PRD draft, prioritization)
- [x] Write CLAUDE.md agent template
- [x] Write templates (stakeholder, project, decision, USER.md, product.md)
- [x] Write PM Codex seed
- [x] Write CLI init spec
- [ ] Write CLI build PRD (for Ralphy execution)
- [ ] Build CLI via Ralphy loop (Opus-powered Claude Code agents, branch-per-task)
- [ ] Internal dogfood with real PM work
- [ ] User research: Talk to 3-5 PMs about their current AI workflow pain points
- [ ] Competitive scan: Who's building in this space and what are they getting wrong?

### Build Strategy (decided 2026-02-14)

1. **Phase 1:** Comprehensive PRD written collaboratively (Opus, interactive)
2. **Phase 2:** Ralphy executes PRD tasks via Claude Code agents (branch-per-task, PR review)
3. **Phase 3:** Manual integration and polish (interactive, Opus)
4. **Phase 4:** Ongoing dev via agent swarms/Teamwork (existing codebase, dynamic decomposition)

Ralphy chosen over agent swarms because: well-defined PRD eliminates need for dynamic re-planning. Simpler, local, controllable. Review checkpoints via PRs catch surprises.

---

## Source Material

- Lenny's Newsletter: "How to Build AI Product Sense" (Tal Raviv & Aman Khan, Feb 2026)
- How I AI Podcast: "How to Build Your Own AI Developer Tools with Claude Code" (CJ Hess, Feb 2026)
- Dross workspace architecture (living proof-of-concept since Feb 2026)
- Product Shadow V1 learnings (5 months of use → abandonment)
