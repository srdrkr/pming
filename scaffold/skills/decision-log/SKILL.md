# Decision Log

Capture, retrieve, and reference decisions so the PM never has to answer "why did we do it that way?" from memory.

## When to Use This Skill

**Capture triggers (explicit):**
- "Log this decision"
- "We just decided to..."
- "Record that we're going with X"

**Capture triggers (detected — cross-cutting behavior):**
- PM uses decisional language: "let's go with," "we're not doing," "scrap that," "the plan is," "I decided"
- A conversation resolves a previously open question
- The PM commits to a direction after weighing options

**Retrieval triggers:**
- "What did we decide about X?"
- "When did we make that call?"
- "Why did we go with X instead of Y?"
- "Have we decided on...?"
- Another skill needs decision context (meeting prep, PRD draft, RICE scoring)

**Contradiction detection (proactive):**
- PM states an intent that conflicts with a logged decision
- A new decision reverses or undermines a previous one without acknowledging it

## Two Modes

This skill operates in two distinct modes. Know which one you're in.

### Mode 1: Capture

A decision was just made. Your job: log it fast, log it right, get out of the way.

**Step 1: Confirm the decision (one sentence)**

Don't assume. Reflect it back:
> "Sounds like the decision is: [X]. That right?"

If the PM confirms, proceed. If they clarify, adjust. If they say "not quite" — ask what's different. One exchange max.

**Step 2: Capture the entry**

Create `context/decisions/YYYY-MM-DD-[slug].md`:

```markdown
# [Decision Title]

**Date:** YYYY-MM-DD
**Status:** Active
**Participants:** [who was involved in or affected by this decision]

## Decision

[One to three sentences. What was decided, stated clearly enough that someone reading this in 3 months understands it without context.]

## Reasoning

[Why this and not something else. The logic, not just the conclusion. This is the most valuable part — it's what prevents relitigating.]

## Alternatives Considered

- **[Option B]:** [Why not — one line]
- **[Option C]:** [Why not — one line]

(Skip this section if there were no real alternatives discussed.)

## Implications

- [What this decision affects, enables, or constrains]
- [Downstream consequences worth tracking]

(Skip this section if implications are obvious from the decision itself.)

## References

- Related project: `context/projects/[project].md`
- Related stakeholder: `context/stakeholders/[person].md`
- Supersedes: `context/decisions/[prior-decision].md` (if applicable)
```

**Step 3: Tell the PM**

> "Logged to `context/decisions/YYYY-MM-DD-[slug].md`."

One line. Don't read back the whole entry unless they ask.

#### Capture Principles

- **Speed over completeness.** A decision logged with just the what and why is infinitely more valuable than a perfect entry that never gets written. If you don't have alternatives or implications, skip those sections.
- **The "why" is the treasure.** Anyone can record what was decided. The reasoning is what makes the log useful in month 3. Push for it: "What's the main reason you're going this direction?" One question.
- **Don't interrupt flow for perfection.** If a decision happens mid-conversation, log a quick version and move on. Don't derail a productive discussion to fill out every field.
- **Slug naming matters.** Use descriptive slugs: `api-versioning-strategy`, `q3-hiring-freeze`, `copilot-eval-framework`. The filename should be scannable in a directory listing.

### Mode 2: Retrieve

The PM needs to recall a past decision. Your job: find it, contextualize it, connect it.

**Step 1: Search the decision log**

Scan `context/decisions/` for relevant entries. Match on:
- Keywords in titles and content
- Date ranges ("what did we decide last month")
- People involved ("what did Mike and I agree on")
- Projects referenced

**Step 2: Present concisely**

Don't dump the whole file. Summarize:

> "On Feb 5, you decided to use webhooks instead of polling for the integration layer. Main reason: latency requirements ruled out polling at scale. Mike was in that discussion."

If there are multiple relevant decisions, list them with one-line summaries and ask which one they want to dig into.

**Step 3: Connect to current context (the mesh)**

This is where retrieval becomes genuinely valuable. Don't just answer the question — connect it:

- "That decision was before the Q3 timeline change — might be worth revisiting given the new constraints."
- "This ties to the PRD you're drafting — want me to reference it in the requirements?"
- "I see two decisions that might be in tension: [X from Jan 15] and [Y from Feb 3]. Want to reconcile?"

## Contradiction Detection

This is the skill's proactive superpower. When you detect a potential contradiction:

**Be direct but not accusatory:**

> "Heads up — on [date] you decided [X], and what you're describing now sounds like it reverses that. Totally fine if things changed, but want to make sure it's intentional. What's different now?"

**If they confirm the change:**
- Update the old decision's status to `Superseded`
- Add a reference to the new decision: `Superseded by: context/decisions/[new-decision].md`
- Log the new decision with a note about what it replaces

**If they didn't realize the conflict:**
- This is the moment the decision log earns its existence. Surface the reasoning from the original decision and let the PM decide how to proceed.

**Don't be annoying about this.** Not every slight shift is a contradiction. Use judgment. If the PM said "no to feature X" and now they're discussing a variation of feature X with different scope, that's evolution, not contradiction. Flag genuine reversals, not nitpicks.

## Graceful Degradation

| Decision Log State | Behavior |
|---|---|
| **Rich** (20+ entries over months) | Proactive contradiction detection, rich cross-references, pattern recognition ("you've deprioritized UX work three times — is that intentional?") |
| **Moderate** (5-15 entries) | Solid retrieval, beginning to connect dots across decisions |
| **Thin** (1-5 entries) | Basic capture and retrieval, building the foundation |
| **Empty** (first use) | Capture this first decision well. Tell the PM: "This is your first logged decision. As these accumulate, I'll be able to spot patterns and contradictions across your decisions." Set the expectation. |

## How Other Skills Use the Decision Log

This is the mesh in action:

- **Meeting Prep** reads recent decisions to surface: "You decided X last week — Mike hasn't heard yet. Might come up."
- **PRD Draft** cites decisions as requirements rationale: "Per the Feb 5 decision on API versioning, this PRD assumes webhook-based integration."
- **RICE Scoring** checks for consistency: "You're scoring this high on confidence, but the decision log shows you haven't validated the assumption that drove this."
- **Stakeholder Update** references decisions to frame progress: "Since deciding to prioritize the AI inbound agent, here's where we are."

**The decision log doesn't just serve the PM's memory. It serves the entire skill ecosystem.**

## Anti-Patterns

- ❌ Don't log every micro-decision. "Let's use blue for the button" is not worth logging. Decisions that affect strategy, priorities, architecture, people, or timelines are.
- ❌ Don't nag. If the PM makes a small call and you offer to log it and they decline, drop it. Don't ask again for similar-weight decisions.
- ❌ Don't editorialize in the log entry. The reasoning section captures *their* logic, not your opinion on whether it was a good call. Save opinions for conversation.
- ❌ Don't create entries without the PM's confirmation. The cross-cutting behavior *offers* to log; this skill *executes* the logging. The PM always confirms before a file is created.
- ❌ Don't let the template override judgment. If a decision is simple ("we're not doing X"), a 2-line entry is fine. Don't pad it to fill every section.

## Example

**Mid-conversation capture:**

> **PM:** "OK so we're definitely going with the phased rollout. Internal beta first, then 10 customers, then GA. I don't want a big bang launch — too risky with the NPS situation."
>
> **Agent:** "Got it — phased rollout: internal → 10 customers → GA, driven by NPS risk. Want me to log that?"
>
> **PM:** "Yeah."
>
> **Agent:** "Logged to `context/decisions/2026-02-14-phased-rollout-strategy.md`. I noted the NPS risk as the primary driver and big-bang as the rejected alternative."

**Retrieval with connection:**

> **PM:** "Why aren't we doing a big launch again?"
>
> **Agent:** "Feb 14 decision: phased rollout over big-bang, driven by NPS risk at -11.2. You wanted to limit blast radius with internal beta first. Worth noting — the NPS has improved slightly since then (now -8.7 per last week's data). Want to revisit, or does the phased approach still feel right?"

---

*The decision log is the compound memory of the workspace. Every other skill gets smarter when this one is active. Capture fast, retrieve smart, connect everything.*
