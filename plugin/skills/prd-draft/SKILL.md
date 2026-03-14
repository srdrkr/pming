---
name: prd-draft
description: Generate a sharp first PRD draft grounded in existing workspace context. Use when the PM says "help me write a PRD", "draft requirements", or "turn this idea into a real doc."
---

# PRD Draft

Generate a sharp first PRD draft grounded in existing workspace context, then close gaps conversationally.

## Trigger

Use this skill when the PM needs a spec-quality draft for a feature or project.

**Typical prompts:**
- "Help me write a PRD for..."
- "Draft requirements for [feature]"
- "Turn this idea into a real doc"

## Artifacts and Save Paths

- Read: `context/product.md`
- Read: `context/projects/[project].md`
- Read: `context/decisions/*.md`
- Read: `context/stakeholders/*.md` (only relevant ones)
- Draft destination (default): `context/projects/[project]-prd.md`
- Decision capture when new calls appear: `context/decisions/YYYY-MM-DD-[slug].md`
- Project updates when scope/status shifts: `context/projects/[project].md`

## Workflow

### 1. Pull context before asking questions

Do not ask for info already in files.

### 2. Ask only for blocking gaps

At most two high-value questions:
- "What problem are we solving, for whom?"
- "What outcome defines success?"

Optional third only if critical constraints are unknown.

### 3. Draft for two audiences

Every requirement must work for:
- humans aligning on scope and tradeoffs
- agents decomposing and implementing tasks

Requirements must be specific, testable, and unambiguous.

### 4. Mark unknowns explicitly

Use `[NEEDS INPUT: ...]` for genuine gaps.
No filler prose pretending certainty.

### 5. Refine in conversation

Walk through unresolved markers one by one and update the draft in-session.

### 6. Enrich mesh

After draft completion:
- log any newly made decisions
- update project file with current scope/timeline
- append stakeholder expectations uncovered during drafting

## Output Format

Write a markdown PRD with this structure:

```markdown
# [Feature/Project Name] - PRD

**Author:** [PM]
**Date:** YYYY-MM-DD
**Status:** Draft

## Problem
[Who has what problem, why now]

## Solution Overview
[3-5 sentences]

## Requirements
1. [Specific, testable requirement]
2. [Specific, testable requirement]

## Success Metrics
- [Launch metric]
- [Outcome metric]

## Scope
**In scope**
- [Item]

**Out of scope**
- [Item]

## Dependencies and Constraints
- [Dependency/constraint]

## Stakeholders
- [Name]: [what they care about]

## Open Questions
- [NEEDS INPUT: ...]
```

Optional sections when useful: `Alternatives Considered`, `Phasing`, `Risks`, `Technical Notes`.

## Mesh References

- Feeds **Decision Log**: PRD assumptions often imply real decisions
- Feeds **Stakeholder Update**: PRD gives crisp narrative for status communication
- Feeds **Prioritization**: requirements and constraints sharpen tradeoff analysis
- Feeds **Meeting Prep**: stakeholder-specific objections become prep landmines

## Anti-Patterns

- Don't output generic template filler.
- Don't hide tradeoffs to make the draft look clean.
- Don't over-document trivial work.
- Don't ask PM to "go edit the doc" before attempting conversational gap-fill.
