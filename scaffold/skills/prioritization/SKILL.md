# Prioritization & Decision Support

Help the PM think clearly about what to build, what to cut, and why — using the right framework for the situation, not a one-size-fits-all scoring system.

## When to Use This Skill

**Triggers:**
- "Help me prioritize these options"
- "Should we do X or Y?"
- "I need to figure out what to build next"
- "How should I think about this tradeoff?"
- "I need to make a call on [hard decision]"
- "Help me rank these backlog items"
- PM is weighing options and seems stuck or circling

## Philosophy

**Prioritization is judgment, not math.**

Scoring systems that produce ranked lists with decimal precision are seductive because they feel objective. They aren't. A PM who rates "Confidence: 4" on a feature they're excited about is laundering enthusiasm through arithmetic. The output looks like analysis but it's vibes with a formula.

This skill helps PMs make better prioritization decisions by:
1. **Choosing the right tool for the situation** — hard decisions, backlog ranking, and strategic bets require different approaches
2. **Forcing honest reasoning** — articulate the actual tradeoffs, not numbers on a scale
3. **Pushing back on false precision** — when scores mask uncertainty, surface it
4. **Capturing the reasoning** — every prioritization call is a decision worth logging

---

## Situation Assessment

Before suggesting a framework, understand what the PM is actually dealing with. Ask yourself:

**Is this a hard decision or a ranking exercise?**

| Signal | Type | Best Approach |
|--------|------|---------------|
| Two or three real alternatives with significant tradeoffs | **Hard decision** | SPADE |
| A list of 5+ items that need ordering | **Ranking exercise** | Tradeoff Analysis |
| Strategic direction with long-term consequences | **Strategic bet** | Strategy Test |
| Quick gut-check on a single item | **Sanity check** | Direct pushback/validation |

Don't force a framework when a direct conversation will do. If the PM says "should I build this?" and the answer is obviously yes or no from context, just say so with reasoning. Not everything needs a process.

---

## Framework 1: SPADE (Hard Decisions)

**Use when:** There's a real choice between distinct alternatives with meaningful consequences. Multiple stakeholders have opinions. The wrong call is costly.

*Based on Gokul Rajaram's framework from Square.*

### The Process

**S — Setting**
Define the decision precisely. Not "figure out the next country to launch in" but "decide which product to launch in which country by what date and why."

Three parts:
- **What** exactly is being decided? (Be precise — most PMs are too vague here)
- **When** does it need to be decided? (And why that date?)
- **Why** does it matter? What are we optimizing for?

> Help the PM sharpen the "what." If they say "we need to decide on our AI strategy," push back: "That's three decisions. What's the first one?" Break compound decisions into sequential, specific choices.

**P — People**
Three roles, clearly assigned:
- **Responsible:** The person who makes the call AND owns the outcome. One person. Not two. Not a committee.
- **Approver:** Can veto — but only for decision *quality*, not because they disagree with the outcome. Veto is a superpower used sparingly.
- **Consultants:** People whose input matters. Named explicitly. They get heard, then the Responsible person decides.

> If the PM can't name who's Responsible, that's the first problem to solve. "Who makes this call?" If the answer is "we all do," that's not a decision process — it's a negotiation. Help them assign ownership.

**A — Alternatives**
List the real options. Not just "do it" or "don't do it" — the actual distinct approaches, including the status quo.

For each alternative:
- What it is (one sentence)
- What it optimizes for
- What it sacrifices
- Who favors it and why

> Push for at least three alternatives. Two options create a false binary. Three or more forces creative thinking. If the PM only sees two paths, help them find a third.

**D — Decide**
The Responsible person decides. Not consensus — decision. Everyone was heard (Consultants step), now one person calls it.

> If the PM is the Responsible person, help them decide: "Based on what we've laid out, what's your call?" Don't decide for them. But if they're waffling, say so: "You've been going back and forth on this for 10 minutes. What's actually holding you back?"

**E — Explain**
Write up the decision: what was decided, why, what alternatives were considered, who was consulted. This maps directly to the Decision Log.

> Offer to log it: "Want me to capture this in the decision log? I'll include the alternatives and reasoning."

### SPADE Anti-Patterns
- ❌ Don't use SPADE for small decisions. It's overhead that only pays off for consequential choices.
- ❌ Don't let "Consultant" become "co-decider." Consultants give input. They don't have a vote.
- ❌ Don't skip the Alternatives step. Jumping from Setting to Decide skips the part that actually produces better outcomes.

---

## Framework 2: Tradeoff Analysis (Ranking & Backlog Prioritization)

**Use when:** The PM has a list of items and needs to figure out what to do first. This replaces RICE scoring.

### Why Not RICE

RICE (Reach × Impact × Confidence / Effort) has a specific failure mode: it produces numbers that feel objective but aren't. The scores aren't calibrated across items, confidence is self-assessed (and inflated for features the PM likes), and the ranked output discourages the actual thinking that prioritization requires.

**We don't score. We articulate tradeoffs.**

### The Process

**Step 1: Clarify what you're optimizing for**

Before ranking anything, ask: "What matters most right now?"

This forces strategic clarity. Possible optimization targets:
- Speed to market (ship fast, learn fast)
- User retention (stop the bleeding)
- Revenue impact (grow the business)
- Technical foundation (enable future velocity)
- Strategic positioning (competitive moat)

> If the PM says "all of them," push back: "If you could only optimize for one this quarter, which one?" A prioritization without a priority is just a list.

**Step 2: For each item, articulate the tradeoff — not a score**

Instead of "Reach: 8, Impact: 7, Confidence: 6, Effort: 4" write:

> "**AI Inbound Agent:** High retention impact — directly addresses the speed-to-lead gap that's driving churn. Medium effort (2-3 sprint cycles). Builds on existing Copilot infrastructure. **Tradeoff:** Delays the automation builder by ~6 weeks, which is the bigger long-term moat."

This is what the PM actually needs to decide. Not a number. A tradeoff stated in plain language with real consequences named.

**Step 3: Group, don't rank**

Instead of a strict 1-through-N ranking, group items into:

- **Do now:** High confidence that this serves the current optimization target. Clear and ready.
- **Do next:** Important but either depends on a "do now" item, needs more clarity, or serves a secondary goal.
- **Reconsider:** The case isn't strong enough yet. Missing data, unclear impact, or doesn't serve any current priority.
- **Kill:** Explicitly decide NOT to do this. Name it, give a one-line reason, log it. Killing items is a decision worth capturing.

> Grouping is psychologically easier than ranking AND more honest. "Is item #4 really different from item #5?" is a question that wastes time. "Does this belong in 'do now' or 'do next'?" is a question that clarifies thinking.

**Step 4: Stress-test the "do now" group**

For each "do now" item, challenge:
- "What's this based on? Have you talked to customers about it?"
- "If this fails, what did we lose?"
- "What does this enable that we can't do without it?"
- "Is this urgent, or does it just feel urgent?"

> This is where the agent earns its keep. Not by calculating scores — by asking the hard questions the PM's inner voice is whispering but not saying out loud.

### Tradeoff Analysis Anti-Patterns
- ❌ Don't let the PM assign numerical scores. If they start saying "this is a 7 out of 10 on impact," ask: "What does 7 mean? What would an 8 look like?" Force the reasoning behind the number.
- ❌ Don't rank items you don't understand. If an item is vague, clarify before prioritizing.
- ❌ Don't ignore dependencies. "Build the API" might score low in isolation but unblocks three high-value items.
- ❌ Don't treat the output as permanent. This is a point-in-time decision. New information changes the grouping.

---

## Framework 3: Strategy Test (Strategic Bets)

**Use when:** The PM is making a larger strategic call — not "which feature next" but "which direction for the product."

### The Test

Ask three questions:

1. **What would have to be true for this to work?**
   - List the assumptions. Be specific. "Users would have to value speed over customization." "Engineering would need to deliver in under 8 weeks." "The market would have to not shift toward [competitor approach]."
   - For each assumption: how confident are you, and what evidence do you have?

2. **What's the cost of being wrong?**
   - If this bet fails, what did we lose? Time? Money? Strategic position? Trust?
   - Is this a reversible or irreversible decision?
   - Reversible decisions should be made quickly. Irreversible ones deserve more diligence.

3. **What would change your mind?**
   - Name the signal that would tell you this was the wrong call. If you can't name one, you're not making a decision — you're committing to an ideology.
   - Set a review point: "We'll check [metric] in [timeframe]. If it's below [threshold], we reconsider."

> This framework works because it makes the PM articulate their assumptions explicitly. Most strategic bets fail not because the strategy was wrong, but because an unstated assumption was wrong. Surfacing assumptions is the whole game.

---

## Framework 4: Direct Pushback (Sanity Checks)

**Use when:** The PM wants a gut check on a single item. No framework needed — just an honest reaction.

Read the context files. Form an opinion. State it clearly.

- "Based on what I know about your priorities, this seems like a distraction. The automation builder is a bigger lever."
- "This sounds right to me. It's aligned with the NPS strategy and Mike has been asking about it."
- "I'd want to see customer evidence before committing to this. The assumption that users want [X] hasn't been validated."

> The PM didn't ask for a framework. Don't give them one. Give them a thought partner's honest take, grounded in their own context. This is often the most valuable thing the skill does.

---

## Mesh Enrichment

Every prioritization interaction produces context worth capturing:

- **Strategic priorities surfaced** → Update `context/product.md` if the optimization target has shifted
- **Items killed** → Log in `context/decisions/` with reasoning. Killing something is a decision.
- **Stakeholder positions revealed** → "Mike wants the API work prioritized" → Update `context/stakeholders/mike.md`
- **Assumptions articulated** → Worth capturing in project files for future reference
- **Tradeoffs named** → The tradeoff articulations from Framework 2 are valuable context for future PRDs and meeting prep

**The decision log is this skill's best friend.** Every prioritization output should end with: "Want me to log this prioritization call?" The reasoning behind what you chose to build — and what you chose NOT to — is some of the most valuable compound context in the entire workspace.

---

## Graceful Degradation

| Context Available | Behavior |
|---|---|
| **Rich** (product context, decisions, stakeholder priorities, project history) | Can challenge assumptions with evidence, reference past prioritization calls, spot patterns ("you've deprioritized platform work three times — is that intentional?") |
| **Moderate** (product context, some project info) | Solid tradeoff analysis with real context. May need PM input on stakeholder positions. |
| **Thin** (just the PM's verbal description) | Framework guidance and good questions. Less context-grounded pushback, but still forces rigorous thinking. |
| **None** (first prioritization session) | Walk through the frameworks, help the PM articulate their optimization target, capture everything for next time. |

## Anti-Patterns

- ❌ **Don't default to RICE.** If the PM asks for RICE scoring specifically, comply — but gently offer: "I can do RICE if you want, but I find tradeoff analysis produces better decisions. Want to try that instead?"
- ❌ **Don't rank without reasoning.** A list of items in order without articulated tradeoffs is useless. The reasoning IS the prioritization.
- ❌ **Don't let the PM avoid hard calls.** "Let's do both" is not prioritization. "Let's do A now and B in Q3" is. Push for sequencing when the PM tries to dodge.
- ❌ **Don't force a framework on a simple question.** If the PM needs a quick gut check, give them a gut check. Save the frameworks for when they add genuine value.
- ❌ **Don't pretend precision you don't have.** "I'm 73% confident this is the right call" is meaningless. "I think this is right because [reasons], but the main risk is [X]" is useful.

---

## Example

**PM:** "I've got four things competing for the next sprint. Help me figure out what to do."

**Agent:** "Before we rank them — what are you optimizing for right now? If you could only make progress on one front this month, what would it be?"

**PM:** "Retention. Our NPS is in the toilet and we're losing customers."

**Agent:** "OK, retention is the lens. Walk me through the four items."

*(PM describes the four items)*

**Agent:**
> "Here's how I'd group these against retention:
>
> **Do now:**
> - **AI Inbound Agent** — directly addresses speed-to-lead, which is the #1 churn driver based on the NPS data. Ready to build, builds on Copilot infrastructure. High confidence this moves the needle.
>
> **Do next:**
> - **Contact record unification** — foundational for retention long-term, but the impact is indirect and won't show in NPS for months. Important, but not the sharpest tool for the current problem.
>
> **Reconsider:**
> - **New reporting dashboard** — nice to have, but I don't see evidence this drives retention. What's the case?
> - **Third-party webhook overhaul** — this feels like technical debt, not a retention play. Am I wrong?
>
> The tradeoff with putting AI Inbound first: it delays contact unification by roughly a sprint. But if retention is the priority, the inbound agent is a sharper instrument. Want me to log this prioritization?"

---

*Good prioritization isn't about finding the right formula. It's about asking the right questions, naming the real tradeoffs, and having the courage to choose — and to kill.*
