# 11-Star Experience

Define and maintain an ambition ladder for your product — from baseline expectation to impossible aspiration. Track how your baseline shifts upward over time.

## When to Use This Skill

**Triggers:**
- User says: "let's do the 11-star exercise", "help me define our product vision", "where are we on the ambition ladder?"
- User is writing a major PRD and needs to ground it in product direction
- User is preparing a strategic stakeholder update about product vision
- First workspace setup — excellent for bootstrapping product context

**Timing:** This is a 20-30 minute thinking exercise the first time. Revisits are 10 minutes. Not a daily tool — a quarterly calibration ritual that makes every other skill sharper.

## What This Skill Does

1. **Establishes the baseline (5★)** — what users experience today when the product works as designed
2. **Walks up the ladder (6★–11★)** — guided conversation to articulate each step-change in ambition
3. **Walks down the ladder (4★–1★)** — surfaces failure modes and quality floors
4. **Identifies the gap** — what's the smallest move to the next level? What's the biggest barrier?
5. **Saves and enriches** — captures the ladder as a living artifact that other skills reference

The output is a structured ambition map, not a vision statement. It's specific enough to prioritize against and track over time.

## The Framework

| Star | Definition |
|------|-----------|
| **1★** | Terrible. Actively harmful. User regrets engaging. |
| **2★** | Bad. Functional in theory, broken in practice. |
| **3★** | Meh. Works but forgettable. Users tolerate it. |
| **4★** | Good. Meets expectations. No complaints, no praise. |
| **5★** | Great. Current baseline — what a good version of this product delivers today. |
| **6★** | Wow. Noticeably better than alternatives. Users tell a friend. |
| **7★** | Amazing. Changes user behavior. They restructure work around it. |
| **8★** | Magical. Users feel like they have a superpower. Can't imagine going back. |
| **9★** | Transformative. Redefines the category. Competitors scramble. |
| **10★** | Industry-defining. Creates or collapses a market. |
| **11★** | Absurd. Not achievable — but the direction matters more than the destination. |

## Inputs

Read these files if they exist:

| Source | What It Provides | If Missing |
|--------|-----------------|------------|
| `context/product.md` | Current product state, positioning, key metrics | Ask: "Give me the 30-second pitch for your product" → save the answer |
| `context/projects/` | Active initiatives that map to star levels | Work without — the exercise itself surfaces these |
| `context/decisions/` | Past strategic decisions that shaped current state | Skip if empty |
| `context/11-star.md` | Previous version of the ladder (for revision sessions) | First time — start fresh |

## Process

### First Time: Full Exercise

**Step 1: Anchor the Baseline (5★)**

> "What does a user experience today when your product is working as designed? Not the best case — the normal, expected case."

Pull from `context/product.md` if available. Validate with the user. This is the foundation — get it right.

**Step 2: Walk Up (6★ → 11★)**

For each level, ask ONE question. Don't interrogate — draw it out conversationally.

- **6★:** "What's the thing that would make users actually recommend you? Not just 'it works' — 'you have to try this.'"
- **7★:** "What would make someone change how they work because of your product?"
- **8★:** "When would a user say 'this feels like cheating — how is this legal?'"
- **9★:** "What would make your competitors panic and pivot?"
- **10★:** "What would make people say your product created a new category?"
- **11★:** "Forget constraints. What's the absurd, science-fiction version? The one that's physically impossible but points the right direction?"

**Pushback built in:**
- If 6★ already exists in the market: *"If competitors offer this, it's not above-baseline. This might be your current 5★ — which means you're behind."*
- If the jump between levels feels incremental: *"That sounds like 6.5★, not 7★. Each level should feel like a genuine step-change. What would genuinely change user behavior?"*
- If the user goes vague at higher levels: That's fine. 9★–11★ are supposed to be fuzzy. Capture the direction, not the spec.

**Step 3: Walk Down (4★ → 1★)**

> "Now the other direction. What does it look like when your product fails? What makes users leave?"

This surfaces quality floors and failure modes. Equally important for prioritization — knowing what NOT to let happen.

**Step 4: Identify the Gap**

> "You're at 5★ today. What's the smallest thing that would get you to 6★? And what's the biggest barrier between where you are and 8★?"

This is where vision becomes actionable. Connect the ladder to real work.

### Revision Sessions (Quarterly)

When `context/11-star.md` already exists:

1. Read the previous ladder
2. Ask: *"Last time we did this, your 5★ was [X]. Is that still your baseline, or has it moved?"*
3. If the baseline shifted upward → that's a win. Capture it in the History section.
4. Recalibrate the upper levels based on market changes, product progress, or new ambition
5. The key insight to surface: *"Your 7★ from [date] is now your 5★. That's [N months] of ambition realized."*

## Output Format

Save to `context/11-star.md`:

```markdown
# [Product Name] — 11-Star Experience

**Last updated:** YYYY-MM-DD
**Current baseline:** 5★

---

## The Ladder

### 1★ — Actively Harmful
[Description]

### 2★ — Broken
[Description]

### 3★ — Forgettable
[Description]

### 4★ — Meets Expectations
[Description]

### 5★ — Current Baseline
[Description — what users experience today]

### 6★ — Tell a Friend
[Description]
**Gap from current:** [What's missing]

### 7★ — Behavior-Changing
[Description]
**Gap from current:** [What's missing]

### 8★ — Superpower
[Description]
**Gap from current:** [What's missing]

### 9★ — Category-Defining
[Description]

### 10★ — Market-Creating
[Description]

### 11★ — Absurd Aspiration
[Description — the direction, not the destination]

---

## Current Focus

**Next star to reach:** [N]★
**Smallest move to get there:** [Specific action or feature]
**Biggest barrier:** [What's in the way]

---

## History

| Date | Change | Notes |
|------|--------|-------|
| YYYY-MM-DD | Initial creation | — |
```

## Mesh Enrichment

After completing the exercise, enrich other context:

- **`context/product.md`** — update positioning if the exercise surfaced new clarity about what the product IS (the 5★ definition often sharpens this)
- **`context/decisions/`** — if the exercise surfaced implicit decisions ("we're NOT trying to be X"), offer to log them
- **`context/projects/`** — if specific initiatives map to star levels, note which star they target: "Project Copilot is a 5★→6★ move on the AI experience"
- **`references/pm-codex.md`** — if the user articulates a sharp principle during the exercise, offer to capture it

**Feeding other skills:**
- **PRD Draft** references the ladder: "This feature moves us from 5★ to 6★ on [dimension]"
- **Prioritization** uses star levels as an input: which star does this unlock?
- **Stakeholder Update** uses the narrative: "We've moved our baseline from 5★ to what was 6★ last quarter"
- **Meeting Prep** surfaces relevant star context when discussing product direction

## Bootstrap Behavior (No Product Context)

When invoked with no `context/product.md`:

1. Ask: "Give me the 30-second pitch — what does your product do, and who's it for?"
2. Ask: "What's the one thing users love about it today?"
3. Ask: "What's the one thing that makes users leave?"

Three questions. Use the answers to seed both the 5★ baseline AND `context/product.md`. Tell the user: *"I saved your product context — every other skill will use this too."*

This makes the 11-star exercise an excellent FIRST skill to run in a new workspace. It bootstraps product context as a side effect.

## Graceful Degradation

| Context Available | Output Quality |
|---|---|
| **Rich** (product.md, projects, decisions, prior ladder) | Grounded recalibration with specific features mapped to stars. Can track ambition drift over time. |
| **Moderate** (product.md, some projects) | Strong ladder with real specificity at 5★–7★. Upper levels get fuzzier — that's expected. |
| **Thin** (just conversation) | Framework introduced, PM walks through verbally, agent captures. Bootstraps product context as a side effect. |
| **None** (brand new workspace) | Bootstrap questions → seed product.md → basic ladder. Still valuable as a thinking exercise. |

## Anti-Patterns

- ❌ **Don't make it a one-time exercise.** The value is tracking baseline drift over time. A ladder that's never revisited is just a document.
- ❌ **Don't let 6★ be incremental.** Each level is a step-change, not a feature addition. If it sounds like a backlog item, it's not a star level.
- ❌ **Don't skip the bottom.** Understanding 1★–3★ surfaces failure modes that matter for prioritization and quality gates.
- ❌ **Don't treat 11★ as a goal.** It's a compass heading. The value is in the gradient between where you are and where you're pointing.
- ❌ **Don't force specificity above 8★.** It's fine for 9★–11★ to be directional. Premature specificity at the top of the ladder is false precision.
- ❌ **Don't run this weekly.** It's a quarterly ritual. More frequent and it becomes busywork instead of calibration.

## Example

**User:** "Let's do the 11-star exercise for Keap's AI experience"

**Agent (with moderate context):**

> Let's build the ladder. I'll start from what I know about Keap's AI work.
>
> **Your 5★ today — what users get when it works:**
> Copilot answers questions about their Keap account, surfaces relevant data, helps with basic tasks. Functional AI assistant embedded in the product. Sound right?

*User validates or refines.*

> **Now 6★ — what makes a user tell another small business owner "you have to try this":**
> What would make Keap's AI noticeably better than just using ChatGPT for the same questions?

*User: "If it could actually DO things — not just answer questions but take actions. Send a follow-up, create an automation, tag contacts based on behavior."*

> That's a real step-change — from informational to operational. Let me push on this: if the AI takes actions, what separates 6★ (users tell a friend) from 7★ (users restructure how they work)?

*Conversation continues up the ladder...*

## Related Skills & Behaviors

- **PRD Draft** — references star levels to ground features in product ambition
- **Prioritization** — uses star mapping as a prioritization input
- **Stakeholder Update** — uses baseline drift as a strategic narrative
- **Cross-cutting: Context Bootstrapping** — 11-star exercise is one of the best bootstrap triggers for new workspaces
