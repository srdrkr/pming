# Stakeholder Update

Generate tailored status updates and responses calibrated to the audience, the channel, and the context — whether proactive or reactive.

## When to Use This Skill

**Proactive triggers:**
- "Write an update for Mike on the AI project"
- "I need to send a status update to leadership"
- "Draft a weekly update for my team"
- "Help me update Ammon on where we are"

**Reactive triggers:**
- "Mike just asked me where we are on X — help me reply"
- "How should I respond to this message?" [PM pastes a message]
- "Ammon wants to know about the timeline — what do I say"
- PM shares an inbound message and asks for help crafting a response

## The Two Modes

### Proactive Updates (PM initiates)

The PM wants to push information out — a status email, a Slack summary, a meeting follow-up. You're crafting the first move.

### Reactive Responses (Stakeholder initiated)

A stakeholder reached out, and the PM needs to respond. This mode has an important extra step: **the inbound message is context gold.** Before writing the response, mine it.

---

## Step 1: Read the Room (Both Modes)

Before writing anything, gather context:

**From files:**
- `context/stakeholders/[person].md` — what they care about, communication style, relationship history
- `context/projects/[relevant-project].md` — current status, blockers, progress
- `context/decisions/` — recent decisions relevant to this stakeholder or topic
- `memory/long-term.md` — any ongoing dynamics worth factoring in

**From the PM (only what you're missing):**
- If stakeholder file is thin: "What does [person] care most about right now?" (one question, save the answer)
- If project status is unclear: "What's the latest on [topic]?" (one question, save the answer)

**Reactive mode — mine the inbound first:**

When the PM shares an incoming message from a stakeholder, read it carefully before responding. Extract:

- **What they're actually asking** (may differ from what they literally said)
- **What's behind the question** (urgency? anxiety? political positioning? genuine curiosity?)
- **New information revealed** about the stakeholder's priorities, concerns, or knowledge state

Then trigger **Stakeholder Enrichment** (cross-cutting behavior):
- Update `context/stakeholders/[person].md` with what you learned
- If the message reveals a shift in priorities, a new concern, or a change in tone — capture it with a date
- Do this silently for existing files. Tell the PM: "I updated [person]'s profile with [insight] from their message."

**This is the mesh in action.** An inbound Slack message asking "where are we on the API?" isn't just a prompt for a reply — it's a signal that this stakeholder cares about the API, might be under pressure about timelines, and is checking in more frequently than before. All of that is context worth capturing.

## Step 2: Match the Channel and Weight

**This is critical.** The format of the update must match how it will actually be delivered. Do NOT default to a structured document.

**Ask if not obvious:** "Is this a Slack message, an email, or something else?"

### Slack Message
- **Tone:** Conversational, direct, brief
- **Length:** 2-6 lines typical. Rarely more than a short paragraph.
- **Structure:** No headers, no bullet lists unless genuinely needed. Write like a human typing in Slack.
- **Emoji:** Light use is fine if it matches the PM's style. Don't force it.
- **Example:** "Hey Mike — quick update on Copilot: internal beta is tracking for end of month. Main risk is the eval framework — we're migrating to Promptfoo this week which should close the gap. I'll flag if that timeline shifts."

### Email (Individual)
- **Tone:** Professional but not stiff. Match the relationship.
- **Length:** 3-8 sentences for a quick update. Longer only if the topic demands it.
- **Structure:** Can use light formatting (bold key points, short bullets for multiple items). No headers unless it's genuinely long.
- **Example:** Direct opening (no "I hope this finds you well"), substance, clear next steps or ask.

### Email (Group/Leadership)
- **Tone:** Crisp, outcome-oriented. Executives read subject lines and first sentences.
- **Length:** Keep the core update to 3-5 bullets max. Details below the fold or linked.
- **Structure:** Lead with the headline. Bullets for status items. Bold the key takeaway. End with asks or decisions needed.
- **Example:**
  ```
  Subject: AI Copilot — Internal Beta on Track for Feb 28

  Team —

  Quick status on the AI Copilot initiative:

  • **Internal beta: Feb 28** (on track)
  • Eval framework migration to Promptfoo in progress — closes our LLM-as-Judge gap
  • Key risk: [specific risk] — mitigation plan is [X]

  Decision needed: [if applicable]

  I'll send a more detailed update after the beta launch. Questions welcome.
  ```

### Meeting Follow-Up
- **Tone:** Concise, action-oriented
- **Length:** Bullets only. What was discussed, what was decided, who does what by when.
- **Structure:** Decisions + action items. Skip the recap of discussion unless something non-obvious needs documenting.

### Verbal Prep (PM will deliver in person)
- **Tone:** Talking points, not a script
- **Length:** 2-4 bullet points they can internalize
- **Output:** Phrased as things to *say*, not things to know (same principle as meeting prep)

## Step 3: Tailor to the Audience

Different stakeholders need different framings of the same information.

**Read the stakeholder file.** The communication style, priorities, and relationship history should shape:

- **What you lead with.** Technical stakeholders want specifics. Executives want outcomes and risks. Peers want honest status.
- **What you emphasize.** Frame progress in terms of what THIS person cares about. Same project, different angle per audience.
- **What you leave out.** Don't surface internal team struggles to executives. Don't over-simplify for technical peers. Don't include details that create questions you're not ready to answer.
- **What level of confidence you project.** Some stakeholders need reassurance. Others need honesty about risk. The file should tell you which.

**If no stakeholder file exists:** Ask the PM one question — "What does [person] care about most in this context?" Save the answer. Generate the update. You now have a stakeholder file started.

## Step 4: Generate and Refine

**First draft:** Generate the update in the appropriate format. Don't caveat it to death — write it like you'd send it.

**Offer refinement, don't force it:**
- "Here's a draft. Want me to adjust the tone, add/remove anything?"
- If the PM makes edits, note the pattern for next time (long-term memory: "PM prefers shorter updates to Mike" or "PM always adds a personal note for Ammon")

**Learn from feedback.** If the PM rewrites your draft significantly, that's signal. What did they change? Tone? Content emphasis? Length? Update the stakeholder file with communication preferences. Next time, get closer.

## Step 5: Mesh Enrichment (Post-Generation)

After the update is drafted, check:

- **Did the PM share new project status?** → Update `context/projects/[project].md`
- **Did a decision get implicitly referenced?** → Check if it's logged in `context/decisions/`. If not, offer to log it.
- **Did the PM reveal something about the stakeholder relationship?** → Update the stakeholder file
- **Did the conversation surface a risk or blocker?** → Note it in the project file

This should feel natural, not like a checklist. If nothing new was learned, don't force enrichment.

## Graceful Degradation

| Context Available | Output Quality |
|---|---|
| **Rich** (stakeholder profiles, project status, decision history) | Precisely tailored — right framing, right emphasis, right channel format. Feels like the PM wrote it. |
| **Moderate** (some stakeholder info, general project context) | Solid update with correct tone. May need PM adjustment on emphasis. |
| **Thin** (just the PM's description of the situation) | Competent draft in the right format. Creates context for next time. |
| **None** (first use, no files) | Ask 3 questions: who, what topic, what channel. Generate and bootstrap. |

## Anti-Patterns

- ❌ **Don't default to formal structure.** A Slack reply that reads like a memo is worse than no help at all. Match the channel.
- ❌ **Don't write the same update for every audience.** The whole point is tailoring. If the PM asks for updates to 3 different people, they should get 3 different drafts.
- ❌ **Don't add information the PM didn't provide or that isn't in files.** Especially dangerous here — stakeholder updates go to real humans. Fabricated progress or invented metrics destroy credibility.
- ❌ **Don't ignore the inbound message in reactive mode.** If a stakeholder reached out, their message is context. Mine it before responding to it.
- ❌ **Don't over-produce.** If the PM needs a 2-line Slack reply, give them a 2-line Slack reply. Not a 2-line Slack reply plus a "here's a longer version in case you want more detail" plus suggestions for follow-up. Respect the ask.
- ❌ **Don't skip the audience question.** "Write an update for Mike" — about what? In what format? If it's ambiguous, ask. One question: "Is this a Slack message or an email?"

## Example

**Reactive mode — Slack reply:**

> **PM:** "Ammon just Slacked me asking about the AI timeline. Here's what he said: 'Hey — where are we landing on the external beta timeline? Reese is asking me for a date.' What should I say?"
>
> **Agent:** *(Updates stakeholder file: Ammon is getting pressure from Reese on AI timeline. Reese is a stakeholder who cares about dates.)*
>
> "Updated Ammon's profile — he's getting timeline pressure from Reese, which is new context.
>
> Here's a reply:
>
> 'End of March for external beta, assuming internal beta (Feb 28) goes clean. Main variable is eval framework — we're closing that gap this week. I'll have a firmer date after internal beta. Happy to loop Reese in on the update if that helps.'"
>
> *(Note: Conversational tone, specific date, acknowledges the pressure chain without over-promising, offers to help manage up.)*

**Proactive mode — Leadership email:**

> **PM:** "I need to send a weekly update to Mike and Ammon on the AI initiative. Email."
>
> **Agent:** *(Reads project files, recent decisions, stakeholder profiles)*
>
> "Here's a draft:
>
> Subject: AI Initiative — Week of Feb 14
>
> Mike, Ammon —
>
> **Headline:** Internal beta on track for Feb 28. Eval migration to Promptfoo underway — closes our biggest quality gap.
>
> This week:
> • Completed: 45-scenario eval suite migration started, phased rollout strategy decided (internal → 10 customers → GA)
> • In progress: Promptfoo integration (~4 hours remaining), LLM-as-Judge rubric definition
> • Risk: None blocking. Eval migration is the critical path item this week.
>
> Next week: Complete migration, begin internal beta prep, draft external beta criteria.
>
> Let me know if you want to discuss any of this before the Thursday review.
>
> Want me to adjust anything?"

---

*Stakeholder updates are where accumulated context becomes visible value. Every well-tailored update proves the system works — to the PM and to their stakeholders.*
