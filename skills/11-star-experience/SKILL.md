# 11-Star Experience

Define the ambition ladder for the product, from failure floor to absurd aspiration, and keep the baseline moving up over time.

## Trigger

Use this skill for vision calibration, strategy resets, or first-time workspace bootstrapping.

**Typical prompts:**
- "Let's do the 11-star exercise"
- "Help me define product vision"
- "Where are we on the ambition ladder?"

## Artifacts and Save Paths

- Read: `context/product.md`
- Read: `context/projects/*.md`
- Read: `context/decisions/*.md`
- Read existing ladder if present: `context/11-star.md`
- Save/update ladder: `context/11-star.md`
- Update product framing if clarified: `context/product.md`
- Offer decision capture for strategic calls: `context/decisions/YYYY-MM-DD-[slug].md`

## Workflow

### 1. Anchor the current baseline (5-star)

Define what users reliably get today when the product works as intended.

### 2. Walk up (6-star to 11-star)

One level at a time. Each step must be a meaningful jump, not a minor feature increment.

### 3. Walk down (4-star to 1-star)

Name failure floors clearly. This exposes quality cliffs and churn triggers.

### 4. Ambient checkpoint

**Ambient checkpoint.** Review conversation so far for stakeholder intel, decisions, commitments, or project state changes. Capture per CLAUDE.md §Ambient Behaviors. Acknowledge anything captured in one line.

### 5. Convert ambition to near-term action

Identify:
- next star to target
- smallest move that advances toward it
- biggest barrier to reaching it

### 6. Ambient checkpoint

**Ambient checkpoint.** Review conversation so far for stakeholder intel, decisions, commitments, or project state changes. Capture per CLAUDE.md §Ambient Behaviors. Acknowledge anything captured in one line.

### 7. Run revision protocol (quarterly)

If ladder already exists:
- compare prior 5-star baseline vs current reality
- record baseline drift in history
- recalibrate upper levels for market/product changes

## Output Format

Save markdown to `context/11-star.md`:

```markdown
# [Product Name] - 11-Star Experience

**Last updated:** YYYY-MM-DD
**Current baseline:** 5-star

## Ladder
### 1-star - [label]
[description]
...
### 11-star - [label]
[description]

## Current Focus
- Next star to reach: [N-star]
- Smallest move: [specific action]
- Biggest barrier: [constraint]

## History
| Date | Change | Notes |
|------|--------|-------|
| YYYY-MM-DD | Initial version | - |
```

## Bootstrap Mode (No Product Context)

Ask exactly three questions:
1. "What's your product in one sentence?"
2. "What do users love today?"
3. "What makes users leave today?"

Use answers to seed both `context/product.md` and `context/11-star.md`.

## Mesh References

- Feeds **PRD Draft**: ties feature work to star-level movement
- Feeds **Prioritization**: clarifies which initiatives move baseline vs vanity scope
- Feeds **Stakeholder Update**: gives a strategic narrative of progress
- Feeds **Meeting Prep**: equips vision conversations with concrete ambition language

## Anti-Patterns

- Don't treat this as a one-time workshop artifact.
- Don't allow 6-star to be incremental.
- Don't skip 1-star to 3-star failure definitions.
- Don't force precise specs for 9-star to 11-star; direction is enough.
