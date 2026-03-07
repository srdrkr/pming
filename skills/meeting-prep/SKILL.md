# Meeting Prep

Prepare the PM for an upcoming meeting with high-signal talking points they can use immediately.

## Trigger

Use this skill when the PM asks for meeting prep or when a time-bound meeting is clearly imminent.

**Typical prompts:**
- "Prep me for my 2pm with [name]"
- "What should I know before this meeting?"
- "I have a check-in with [person] in 10 minutes"

## Artifacts and Save Paths

- Read: `context/stakeholders/*.md`
- Read: `context/projects/*.md`
- Read: `context/decisions/*.md`
- Read: `memory/long-term.md` and latest `memory/YYYY-MM-DD.md`
- Update when new intel appears: `context/stakeholders/[name].md`
- Update when status shifts: `context/projects/[project].md`
- Offer to log if a decision is surfaced: `context/decisions/YYYY-MM-DD-[slug].md`

## Workflow

### 1. Lock the meeting objective

If unclear, ask one question:
- "What outcome do you need from this meeting?"

Do not ask more unless absolutely required.

### 2. Read the room from existing context

Pull only what matters for this specific meeting:
- each attendee's priorities and pressure
- project status likely to come up
- decisions that could be questioned
- political or relationship risks

### 3. Distill to deployable points

Convert context into 2-3 things the PM can actually say.

Rules:
- phrase points as spoken lines, not abstract notes
- include evidence anchors when available (metric, date, prior decision)
- do not over-brief; this is a sharpening pass, not a dossier

### 4. Flag one landmine and one open question

- **Landmine:** only include if real and consequential
- **Open question:** one question that advances the meeting outcome

### 5. Enrich the mesh after delivery

If new context emerged during prep, capture it immediately and tell the PM what was saved.

## Output Format

Default to plain chat output, not a document.

```text
Prep for [meeting name] ([time]):

The room
- [Person]: [what they care about right now]
- [Person]: [what they care about right now]

Your points
1. [Line you can say]
2. [Line you can say]
3. [Optional third line]

Landmine
- [Risk to avoid]  (omit if none)

Open question
- [One question to get answered]
```

## Bootstrap Mode (No Context Yet)

Ask exactly three questions:
1. "Who's in the meeting and what's the topic?"
2. "What outcome do you want?"
3. "Any political sensitivity I should know?"

Then generate prep and save durable context to stakeholder/project files.

## Mesh References

- Feeds **Stakeholder Update**: sharper audience framing after the meeting
- Feeds **Decision Log**: meeting decisions can be captured immediately
- Feeds **PRD Draft**: constraints and stakeholder expectations become spec inputs
- Feeds **Prioritization**: reveals current political and strategic pressure

## Anti-Patterns

- Don't produce a long briefing by default.
- Don't list every fact you know.
- Don't invent risks to fill the template.
- Don't ask five setup questions for a 15-minute prep request.
