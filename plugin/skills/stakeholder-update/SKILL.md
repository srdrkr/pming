---
name: stakeholder-update
description: Draft audience-calibrated updates and replies for stakeholder communication. Use when the PM says "draft an update", "help me reply to this message", or needs a status email.
---

# Stakeholder Update

Draft audience-calibrated updates and replies that match the channel, the relationship, and the real status.

## Trigger

Use this skill when the PM needs to send or respond to stakeholder communication.

**Typical prompts:**
- "Draft an update for [name]"
- "I need a weekly leadership status email"
- "[Person] just asked about timeline in Slack, how should I reply?"

## Artifacts and Save Paths

- Read: `context/stakeholders/[name].md`
- Read: `context/projects/[project].md`
- Read: `context/decisions/*.md`
- Read: `memory/long-term.md`
- Update stakeholder signal: `context/stakeholders/[name].md`
- Update project truth when status changes: `context/projects/[project].md`
- Offer decision capture when applicable: `context/decisions/YYYY-MM-DD-[slug].md`

## Workflow

### 1. Identify mode: proactive or reactive

- **Proactive:** PM is initiating an update.
- **Reactive:** PM is replying to inbound communication.

If reactive, treat the inbound message as context data, not just text to answer.

### 2. Read context before writing

Collect:
- what this stakeholder optimizes for
- where the project actually stands
- which recent decisions shape the message

If one key gap blocks quality, ask one targeted question.

### 3. Match the delivery channel

Ask once if unclear: "Slack or email?"

Rules:
- Slack: short, conversational, direct
- Exec/group email: headline first, then 3-5 bullets max
- 1:1 email: concise narrative + clear ask/next step
- meeting follow-up: decisions and action items only

### 4. Write the message in the PM's voice

- lead with the most relevant headline
- state confidence and risk honestly
- avoid invented metrics or fabricated certainty
- include explicit next step when useful

### 5. Learn from edits and save signal

If the PM rewrites substantially, capture preference signals in stakeholder files.

## Output Format

Output is the message itself, ready to send.

**Slack example shape:**
```text
Hey [Name] — [headline]. [status + risk]. [next step/date].
```

**Leadership email example shape:**
```text
Subject: [Initiative] — [headline + date]

[Name/Team],

- [Status]
- [Risk + mitigation]
- [Decision/ask if needed]

Next: [checkpoint/date]
```

## Reactive Mining Rules

When PM provides inbound text, extract and save:
- hidden concern (urgency, political pressure, confidence issues)
- new stakeholder priority
- shifts in tone/frequency

Tell the PM what was captured in one line.

## Mesh References

- Feeds **Meeting Prep**: better room-read and landmine detection
- Feeds **Decision Log**: implied commitments often encode decisions
- Feeds **PRD Draft**: stakeholder requirements become explicit
- Feeds **Prioritization**: reveals who is pushing for what and why

## Anti-Patterns

- Don't send memo-format text for Slack asks.
- Don't write the same update for three different audiences.
- Don't over-produce when PM needs a 2-line reply.
- Don't ignore signal in inbound stakeholder messages.
