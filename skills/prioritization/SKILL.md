# Prioritization & Decision Support

Help the PM make hard tradeoffs with explicit reasoning, not fake precision.

## Trigger

Use this skill when the PM is choosing what to do now vs later vs never.

**Typical prompts:**
- "Help me prioritize these"
- "Should we do X or Y?"
- "What do we build next?"
- "I need to make a call on this"

## Artifacts and Save Paths

- Read: `context/product.md`
- Read: `context/projects/*.md`
- Read: `context/decisions/*.md`
- Read relevant stakeholder files: `context/stakeholders/[name].md`
- Save outcome decision when requested: `context/decisions/YYYY-MM-DD-[slug].md`
- Update strategic emphasis if it shifts: `context/product.md`

## Workflow

### 1. Classify the decision type

- **Hard choice (2-3 alternatives):** use SPADE
- **Backlog ranking (5+ items):** use tradeoff grouping
- **Strategic bet:** run assumption/cost/review test
- **Single-item gut check:** give direct pushback

### 2. Force optimization clarity

Ask one question if missing:
- "What are we optimizing for this cycle?"

No optimization target = no prioritization.

### 3. Ambient checkpoint

**Ambient checkpoint.** Review conversation so far for stakeholder intel, decisions, commitments, or project state changes. Capture per CLAUDE.md §Ambient Behaviors. Acknowledge anything captured in one line.

### 4. Analyze in plain language

For each option, state:
- expected upside
- real cost and opportunity cost
- dependency/risk
- what must be true for success

### 5. Group outcomes, do not fake rank

Default groups:
- `Do now`
- `Do next`
- `Reconsider`
- `Kill`

### 6. Ambient checkpoint

**Ambient checkpoint.** Review conversation so far for stakeholder intel, decisions, commitments, or project state changes. Capture per CLAUDE.md §Ambient Behaviors. Acknowledge anything captured in one line.

### 7. Pressure-test "Do now"

Challenge assumptions and urgency. If weak evidence, say so directly.

### 8. Capture the call

If the PM confirms direction, offer to log reasoning in decision log.

## Output Format

Return a concise tradeoff brief:

```markdown
## Optimization Target
[What we're optimizing for and why]

## Recommended Grouping

### Do now
- **[Item]:** [reason + key tradeoff]

### Do next
- **[Item]:** [reason + dependency/timing]

### Reconsider
- **[Item]:** [what evidence is missing]

### Kill
- **[Item]:** [why it should be dropped]

## Hardest Tradeoff
[What we are choosing to sacrifice]

## Confidence and Risk
- Confidence: [High/Medium/Low + why]
- Main risk: [specific risk]
- Review trigger: [signal that should change this plan]
```

## Mesh References

- Feeds **Decision Log**: every prioritization call is a decision artifact
- Feeds **PRD Draft**: "Do now" items should map to concrete requirements
- Feeds **Stakeholder Update**: rationale explains sequencing to execs/partners
- Feeds **Meeting Prep**: likely objections become prep points

## Anti-Patterns

- Don't hide subjective judgment behind numbers.
- Don't accept "everything is priority".
- Don't produce ordering without reasoning.
- Don't keep dead items undead; explicitly kill when appropriate.
