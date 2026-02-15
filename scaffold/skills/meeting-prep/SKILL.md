# Meeting Prep

Prepare for an upcoming meeting with distilled talking points you can actually use in conversation.

## When to Use This Skill

**Triggers:**
- User says: "prep me for [meeting]", "what should I know for my 2pm", "I have a meeting with [person] soon"
- Agent recognizes calendar context suggesting a meeting is approaching (proactive tier only)

**Timing:** This skill is designed for 15 minutes or less before a meeting. Not a study session — a sharpening session. The output should be consumable in 2 minutes.

## What This Skill Does

1. **Identifies the meeting context** — who's attending, what's the topic, what's the goal
2. **Reads existing context** — stakeholder profiles, recent decisions, project status, prior meeting notes
3. **Does the thinking work** — synthesizes what matters, identifies tensions, surfaces relevant history
4. **Distills to 2-3 deployable points** — things the user can actually say in conversation, not just know

The output is NOT a briefing document. It's ammunition. Short, sharp, usable in the flow of conversation.

## Inputs

Read these files if they exist (graceful degradation — work with whatever's available):

| Source | What It Provides | If Missing |
|--------|-----------------|------------|
| `context/stakeholders/[name].md` | What each attendee cares about, communication style, relationship history | Ask: "What's your relationship like with [person]? What do they care about?" → save the answer |
| `context/projects/[project].md` | Current status, blockers, recent progress | Ask: "What's the current state of [topic]?" |
| `memory/long-term.md` | Ongoing dynamics, political context, recurring themes | Work without it — less nuanced but still useful |
| `context/decisions/` | Recent decisions relevant to the meeting topic | Skip if empty — decisions compound over time |
| `memory/YYYY-MM-DD.md` | Recent daily notes that may contain relevant context | Skip if empty |

## Output Format

Keep it conversational. Do NOT generate a markdown document unless explicitly asked. Default output:

```
Here's your prep for [Meeting Name] at [Time]:

**The room:** [Who's there and what each person cares about — 1 line per person max]

**Your 3 points:**
1. [Distilled talking point — something you can actually SAY]
2. [Second point]  
3. [Third point, if needed — 2 is fine]

**Landmine:** [One thing to watch out for — a tension, a blindspot, an unstated agenda. Only include if there's a real one.]

**Open question:** [One thing you should try to get answered in this meeting]
```

### Why This Format

- **"The room"** gives situational awareness without being a dossier
- **Points are phrased as things to SAY**, not things to know. "Remind Mike that the NPS data supports the AI investment" not "Mike cares about NPS"
- **Landmine** is singular and optional — if there isn't one, don't invent one
- **Open question** gives the meeting a purpose beyond "attend"

## Bootstrap Behavior (First Use, No Context)

When a user invokes this skill with minimal or no existing context files:

**Ask these questions (and ONLY these — minimize friction):**

1. "Who's in this meeting and what's the topic?"
2. "What do you want to get out of it?"
3. "Anything politically sensitive I should know about?"

That's it. Three questions. Generate prep from their answers.

**Then — cross-cutting behaviors kick in:**

The agent's global behaviors (defined in CLAUDE.md) handle saving what was learned — stakeholder files, project context, relationship dynamics. This isn't meeting-prep-specific; it's how the system works everywhere.

**Tell the user it happened:** "I saved notes on [names] — next time you meet with them, I'll already know the context."

This is the compound moment. This is where the user realizes the system gets smarter with use.

## Progressive Enrichment

Each time the skill is used:

1. **Before generating prep:** Check if stakeholder files have gaps. If so, ask ONE follow-up: "Last time you met with Mike, you mentioned tension around budget. Is that still live?"
2. **After the meeting:** Offer (don't force): "How'd it go? Anything I should remember for next time?" If they share, update the relevant files.
3. **Over time:** The skill shifts from asking questions to surfacing insights. "Mike hasn't heard about the cost issue yet — might want to lead with that."

## Graceful Degradation

| Context Available | Output Quality |
|---|---|
| **Rich** (stakeholder profiles, recent decisions, project status) | Specific, politically aware, references real history. Magic. |
| **Moderate** (some stakeholder info, general product context) | Useful points grounded in what's known, identifies gaps |
| **Thin** (just the user's answers to bootstrap questions) | Generic but structured prep, creates context for next time |
| **None** (first ever use, user gives minimal input) | Basic agenda framing + "here's what I'd want to know if I were you" |

The skill is ALWAYS useful. It just gets dramatically better with context. This gradient is the retention hook.

## Anti-Patterns

- ❌ Don't generate a 2-page briefing document unless explicitly asked
- ❌ Don't list every fact you know about each attendee — distill
- ❌ Don't prep for meetings that don't need it (quick standups, casual 1:1s) — use judgment
- ❌ Don't ask more than 3 bootstrap questions — friction kills first impressions
- ❌ Don't skip saving context after bootstrap — the compound flywheel depends on this

## Example

**User:** "Prep me for my 2pm with Mike and Ammon"

**Agent (with rich context):**

> Here's your prep for the Keap Health Discussion at 2:00 PM:
> 
> **The room:** Mike (your boss, focused on execution velocity and headcount efficiency) and Ammon (Sr VP Product, thinking big-picture about platform direction post-acquisition — he liked your NPS data last time).
>
> **Your 2 points:**
> 1. Lead with the AI inbound agent ROI framing — Ammon responded to "blue ocean" language last week, and this ties directly to it
> 2. Name the NPS risk explicitly: "We're at -11.2 and the 2+ year cohort is worse. The AI bet isn't aspirational, it's urgent."
>
> **Landmine:** Mike hasn't been briefed on the cost-per-request numbers from the POC demo. If it comes up, frame it as "known and being optimized" not "we have a problem."
>
> **Open question:** Try to get Ammon's read on timeline expectations for external AI beta. His answer shapes your next quarter.

## Related Skills & Behaviors

- **Decision Log** — capture decisions made during the meeting
- **Cross-cutting: Stakeholder Enrichment** — every meeting prep session enriches stakeholder files, but so does every other interaction. See CLAUDE.md agent behaviors.
