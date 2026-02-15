# PRD Draft

Generate a first draft of a Product Requirements Document grounded in the PM's actual context — decisions already made, stakeholders already known, constraints already captured. The PM edits and refines. This is a thinking tool, not a final artifact.

## When to Use This Skill

**Triggers:**
- "Help me write a PRD for..."
- "Draft requirements for [feature/project]"
- "I need to spec out [idea]"
- "Help me turn this into a proper doc"
- PM is describing a feature in enough detail that a PRD is the natural next step

## Core Principles

### 1. 70% Draft, Not 100% Document

The goal is a draft good enough that the PM refines rather than creates from scratch. Don't aim for perfection — aim for a starting point that's grounded in real context and saves the PM 2-3 hours of blank-page work.

If you don't have enough context for a section, write what you know and mark gaps explicitly: `[NEEDS INPUT: what metric defines success here?]`. Visible gaps are better than plausible-sounding filler.

### 2. Thinking Tool, Not Bureaucratic Artifact

A PRD that nobody reads after it's written is a failed PRD. The document should provoke thinking, surface tradeoffs, and force decisions — not just catalog features. If the PM reads the draft and says "wait, that's not right" — the PRD is working. It made them think.

Ryan Singer's critique applies: don't prioritize documentation over discussion. The PRD is an input to conversation, not a replacement for it.

### 3. Dual-Audience Readability

**This is a non-negotiable design constraint.**

A PRD is now read by two audiences: **humans** (for alignment, decisions, and understanding) and **agents** (for execution, task decomposition, and implementation). The same document must serve both.

This means: clear enough for a PM or exec to skim and align, specific enough for a coding agent to decompose into tasks and build from.

#### What This Looks Like (Positive Example)

```markdown
## User Onboarding Flow

**Goal:** New users complete setup and reach first value moment within 5 minutes.

**Requirements:**
1. Onboarding consists of exactly 3 steps: Profile Setup → Product Context → First Skill Run
2. Each step collects 1-2 inputs max (name/role, product description, trigger first meeting prep)
3. Progress indicator visible at all times showing current step and total steps
4. If user abandons mid-flow, resume from last completed step on next visit
5. Completion triggers creation of: USER.md, context/product.md, and first skill output

**Success metric:** 80% of users who start onboarding complete it. Median time-to-completion under 5 minutes.

**Out of scope:** Team onboarding, workspace import, SSO.
```

*Why this works:* A human reads this and understands the intent, the scope, and what success looks like. An agent reads this and can decompose it into buildable tasks — each requirement is a testable unit of work with clear acceptance criteria. "Exactly 3 steps" is unambiguous. "1-2 inputs max" is a constraint an agent can enforce. "80% completion" is a measurable target.

#### What This Looks Like (Negative Example)

```markdown
## User Onboarding Flow

The onboarding experience should feel smooth and intuitive. We want users to 
get set up quickly without feeling overwhelmed. The flow should guide them 
through the initial setup process and help them understand the value of the 
product. We should consider progressive disclosure and make sure the UX is 
clean and modern. Mobile responsiveness would be nice to have.
```

*Why this fails:* A human reads this and nods — it sounds reasonable. But nobody can build from it. "Smooth and intuitive" is subjective. "Quickly" has no definition. "Consider progressive disclosure" is a suggestion, not a requirement. "Nice to have" is scope ambiguity. An agent reading this would either guess at implementation details (dangerous) or ask 15 clarifying questions (annoying). The PM would end up specifying everything verbally that should have been in the document.

**The rule:** Every requirement should pass the **two-audience test.** Can a human understand the intent? Can an agent build from the specification? If either answer is no, rewrite it.

### 4. Grounded in Context, Not Templates

Don't generate generic PRD filler. Pull from:
- `context/product.md` — product positioning, stage, key metrics
- `context/projects/[project].md` — existing project context if this extends or relates to one
- `context/decisions/` — decisions already made that constrain or inform this PRD
- `context/stakeholders/` — who cares about this, what they'll push back on

A PRD that references "per the Feb 5 decision on API versioning, this assumes webhook-based integration" is dramatically more useful than one that says "integration approach TBD."

### 5. Surface Tradeoffs, Don't Hide Them

The best PRDs make the hard choices visible. When you draft a section and realize there's a tension (speed vs. quality, scope vs. timeline, this stakeholder's priority vs. that one's), call it out explicitly. Don't resolve it — present it for the PM to decide.

---

## Process

### Step 1: Gather Context

**From files (read silently):**
- `context/product.md`
- Relevant `context/projects/` files
- Recent `context/decisions/` entries
- Relevant `context/stakeholders/` files

**From the PM (ask only what's missing):**

Essential (if not answerable from files):
1. "What problem does this solve, and for whom?"
2. "What does success look like?"

Helpful (ask if the conversation allows, but don't interrogate):
3. "Are there hard constraints I should know about?" (timeline, tech, dependencies)
4. "Who needs to approve or align on this?"

That's it. Start drafting. The PM will fill gaps during review.

### Step 2: Generate the Draft

Use this structure. Every section is optional except the first three — scale the document to the weight of the feature.

```markdown
# [Feature/Project Name] — PRD

**Author:** [PM Name]
**Date:** YYYY-MM-DD
**Status:** Draft

## Problem

[What problem are we solving? For whom? Why now? Ground this in real data 
or user evidence if available from the context files.]

## Solution Overview

[High-level description of what we're building. 3-5 sentences max. 
A reader should understand the shape of the solution without reading 
the full requirements.]

## Requirements

[Numbered list of specific, testable requirements. Each requirement 
should pass the two-audience test: human-readable intent + agent-buildable 
specification. Group by feature area if the PRD covers multiple surfaces.]

## Success Metrics

[How we'll know this worked. Specific, measurable. Include both 
launch metrics (did we ship what we said?) and outcome metrics 
(did it achieve the goal?).]

## Scope

**In scope:**
- [Explicit list of what's included]

**Out of scope:**
- [Explicit list of what's NOT included — this prevents scope creep 
  and sets expectations]

## Open Questions

[Things that need to be decided before or during development. 
Don't pretend to have answers you don't have. Flag them.]

## Dependencies & Constraints

[Technical dependencies, timeline constraints, stakeholder approvals needed.
Reference decision log entries where relevant.]

## Stakeholders

[Who cares about this, what they care about, and any known positions.
Pull from stakeholder files.]
```

**Optional sections (include when relevant):**
- **Alternatives Considered** — what else we could have done and why we chose this path
- **Phasing** — if this ships in stages, what's in each phase
- **Technical Notes** — architecture considerations, if the PM has them (not required — eng adds these)
- **Risks** — known risks and mitigation strategies

### Step 3: Deliver and Invite Refinement

Present the draft. Don't caveat it to death, but set expectations:

> "Here's a first draft. I pulled from [what you referenced — decisions, project context, stakeholder files]. The sections I'm most confident in are [X]. There are a few gaps I've marked — want to knock those out now? I'll ask you each one and fill them in as we talk."

**Conversational gap-filling is the preferred workflow.** Don't tell the PM to go edit the document. Instead, walk through the `[NEEDS INPUT]` markers in dialogue: "First gap — which channels should V1 support? Email only, or email plus web forms?" The PM answers verbally, you update the draft in real-time. This is dramatically lower friction than asking someone to open a doc and fill in blanks. The document gets completed through conversation, which is why the PM has an AI assistant in the first place.

**If the PM edits significantly:** Note what they changed. Did they rewrite requirements to be more specific? Did they cut sections? Did they add context you didn't have? These patterns improve the next PRD.

### Step 4: Mesh Enrichment

After the PRD is drafted:

- **Decisions embedded in the PRD?** Check if they're logged. Offer to capture any new ones: "The PRD assumes [X] — want me to log that as a decision?"
- **New stakeholder context surfaced?** Update stakeholder files with any requirements, concerns, or positions revealed during the PRD process.
- **Project context changed?** Update `context/projects/[project].md` with the new scope, timeline, or status.
- **Open questions worth tracking?** If they're significant, they might deserve their own entries or flags in project files.

---

## Alternative Frameworks

Some PMs prefer different approaches. Offer these when appropriate:

### Amazon PR/FAQ (Bill Carr)
Start with a fictional press release announcing the finished product, then write FAQs that address customer and internal questions. Works backward from the customer experience. Best for: new products, major features, when the PM needs to clarify the "so what?"

> "Want to try the PR/FAQ approach instead? We'd start with the press release — what would the headline be when this ships?"

### Shape Up Pitch (Ryan Singer)
A pitch instead of a spec — defines the problem, the appetite (how much time we're willing to spend), the solution shape, and rabbit holes to avoid. Best for: time-boxed projects, when flexibility in implementation matters more than detailed requirements.

> "This might work better as a Shape Up pitch — you define the appetite and the shape, eng figures out the details within those boundaries. Want to go that direction?"

Don't force either of these. Default to the standard PRD structure. Offer alternatives when the PM's situation suggests they'd be a better fit.

---

## Graceful Degradation

| Context Available | Output Quality |
|---|---|
| **Rich** (product context, decisions, stakeholder files, project history) | PRD grounded in real constraints, references past decisions, anticipates stakeholder concerns. Feels like the PM wrote it. |
| **Moderate** (product context, some project info) | Solid structure with real context in the Problem and Solution sections. Requirements may need more PM input. |
| **Thin** (just the PM's verbal description) | Clean structure with what's known, clear `[NEEDS INPUT]` markers for gaps. Still saves the PM significant time. |
| **None** (first ever PRD, minimal workspace context) | Ask the 2 essential questions, generate a skeleton, bootstrap context from answers. |

## Anti-Patterns

- ❌ **Don't generate a 10-page PRD for a small feature.** Scale the document to the feature. A minor enhancement might be 1 page. A major initiative might be 5. Never more than necessary.
- ❌ **Don't fill sections with generic filler.** "The solution should be scalable and maintainable" adds nothing. Every sentence should be specific to THIS feature.
- ❌ **Don't write vague requirements.** If you catch yourself writing "the experience should feel intuitive," stop. Rewrite with specifics that pass the two-audience test.
- ❌ **Don't pretend you have context you don't.** Mark gaps with `[NEEDS INPUT]` rather than generating plausible-sounding details. A PM who finds fabricated requirements in their PRD will never trust the tool again.
- ❌ **Don't skip the mesh.** A PRD touches decisions, stakeholders, and project context. If you drafted a PRD and didn't offer to update anything, you missed enrichment opportunities.
- ❌ **Don't resist alternative formats.** If the PM wants a pitch instead of a PRD, or a PR/FAQ instead of requirements, adapt. The structure serves the thinking, not the other way around.

## Example

**PM:** "I need to write a PRD for the AI inbound response agent — the speed-to-lead feature."

**Agent:** *(reads context/projects/ai-copilot.md, context/decisions/2026-02-14-phased-rollout-strategy.md, context/stakeholders/mike-hilton.md, context/product.md)*

> "Here's a first draft. I pulled from the AI Copilot project file, the phased rollout decision from last week, and what I know about Mike's priorities. The requirements section needs your input on response time SLAs and which channels we're supporting in V1.
>
> ---
>
> # AI Inbound Response Agent — PRD
>
> **Author:** [Name]
> **Date:** 2026-02-14
> **Status:** Draft
>
> ## Problem
>
> Keap users lose leads due to slow response times. Industry data shows that responding to an inbound inquiry within 5 minutes increases conversion 10x compared to 30-minute response times. Most Keap SMB users can't monitor channels in real-time. An AI agent that responds immediately to inbound inquiries — with context from the user's CRM data — closes this gap.
>
> ## Solution Overview
>
> An AI agent that monitors configured inbound channels (email, web form, SMS) and generates contextual responses within 60 seconds. The agent pulls relevant contact history and business context from the CRM to craft personalized responses, then routes the lead to the appropriate human follow-up workflow.
>
> ## Requirements
>
> 1. Agent monitors inbound inquiries on configured channels and responds within 60 seconds of receipt
> 2. Response incorporates contact history from CRM (prior purchases, open deals, last interaction date) when available
> 3. Response tone matches business owner's configured brand voice (setup during onboarding)
> 4. Agent escalates to human when: inquiry is a complaint, involves billing, or confidence score is below threshold — `[NEEDS INPUT: what threshold?]`
> 5. All agent responses are logged and visible to the business owner with one-click override
> 6. `[NEEDS INPUT: which channels in V1? Email only? Email + web form? All three?]`
> 7. Per phased rollout decision (Feb 14): internal beta first, then 10 customers, then GA
>
> ## Success Metrics
>
> - **Launch:** Agent responds to 95% of inbound inquiries within 60 seconds during beta
> - **Outcome:** Beta users show measurable improvement in speed-to-lead vs. pre-agent baseline
> - `[NEEDS INPUT: what's the target conversion lift? Or is speed-to-lead the primary metric?]`
>
> ..."

---

*A good PRD draft saves the PM 3 hours and makes them think harder about the 20% that matters. A bad one generates 10 pages of confident-sounding filler that nobody builds from.*
