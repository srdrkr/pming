---
name: decision-log
description: Capture and retrieve consequential decisions so "why did we do this?" is always answerable. Use when the PM says "log this decision" or "what did we decide about..."
---

# Decision Log

Capture and retrieve consequential decisions so "why did we do this?" is always answerable.

## Trigger

Use this skill when a real product, strategy, scope, people, timeline, or architecture decision is made or queried.

**Typical prompts:**
- "Log this decision"
- "We decided to go with X"
- "What did we decide about Y?"
- "Why did we choose X over Y?"

## Artifacts and Save Paths

- Create/update: `context/decisions/YYYY-MM-DD-[slug].md`
- Cross-link project context: `context/projects/[project].md`
- Cross-link stakeholder context when relevant: `context/stakeholders/[name].md`

## Workflow

### 1. Determine mode

- **Capture mode:** a decision just happened
- **Retrieve mode:** PM needs prior decision context

### 2. Capture mode steps

1. Confirm the decision in one sentence.
2. Ask for missing "why" if absent (one question max).
3. Write the decision file.
4. Reply with save confirmation path.

If a previous decision is reversed, mark old entry `Superseded` and link the replacement.

### 3. Retrieve mode steps

1. Scan `context/decisions/` for relevant entries.
2. Return the best match with date, decision, and rationale.
3. If multiple matches, list concise options and ask which to expand.
4. Note conflicts with current direction when detected.

### 4. Contradiction guardrail

If current intent conflicts with a logged decision, flag directly:
- "On [date], you decided [X]. Today's direction sounds like [not-X]. Intentional change?"

No accusation, no hedging.

## Output Format

### Decision file template

```markdown
# [Decision Title]

**Date:** YYYY-MM-DD
**Status:** Active
**Decision owner:** [single accountable person]
**Participants:** [who gave input or is directly affected]

## Decision
[1-3 sentences]

## Reasoning
[Why this path]

## Alternatives Considered
- **[Option]:** [Why not]

## Consequences
- [Immediate effect]
- [Downstream effect]

## References
- Related project: `context/projects/[project].md`
- Related stakeholder: `context/stakeholders/[person].md`
- Supersedes: `context/decisions/[prior].md` *(if applicable)*
```

### Retrieval response shape

```text
On YYYY-MM-DD, you decided [X] over [Y].
Why: [core rationale].
Relevant now because: [connection to current topic].
```

## Mesh References

- Feeds **PRD Draft**: decisions become explicit constraints/rationale
- Feeds **Meeting Prep**: unresolved or sensitive decisions become talking points
- Feeds **Stakeholder Update**: status framed through prior decisions
- Feeds **Prioritization**: prevents repeating dead paths and exposes reversals

## Anti-Patterns

- Don't log trivial UI nits or micro-calls.
- Don't capture without PM confirmation.
- Don't omit rationale; "what" without "why" has low half-life.
- Don't dump full files in retrieval responses unless requested.
