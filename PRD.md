# `pming` CLI — Build PRD

**Author:** Jeremiah Weise + Dross
**Date:** 2026-02-14
**Status:** Ready for Build
**Build method:** Ralphy loop → Claude Code agents (branch-per-task, PR review)

---

## Problem

Product managers who use AI assistants (Claude Desktop, Claude Code, Cursor) get dramatically more value when their AI has structured context — who they are, what they're building, who their stakeholders are, past decisions. But setting up this structured workspace manually requires knowing what files to create, what format to use, and how to instruct the AI to use them.

`pming` solves this: a CLI that scaffolds an opinionated PM workspace in under 5 minutes, pre-loaded with skills, templates, and an agent configuration that turns a generic AI session into a PM-aware thought partner.

## Solution Overview

A Node.js CLI tool distributed via npm (`npx pming init`) that:
1. Asks 4-5 questions interactively
2. Generates a structured workspace directory with populated files
3. Copies pre-written skill files and templates
4. Generates a configured CLAUDE.md (or equivalent) with the PM's name and role injected
5. Provides clear next-step instructions for opening the workspace in their AI tool

---

## Requirements

### Task Group 1: Project Setup

- [x] 1.1 Initialize npm package with name `pming`, set `bin` entry to `pming` pointing to `src/cli.js`
- [x] 1.2 Add `package.json` with fields: name, version (0.1.0), description ("AI-powered PM workspace scaffold"), bin, keywords, license (MIT), engines (node >=18)
- [x] 1.3 Add shebang `#!/usr/bin/env node` to `src/cli.js`
- [x] 1.4 Install dependencies: `enquirer` (interactive prompts), `chalk` (colored output), `fs-extra` (file operations), `slugify` (project name slugging)
- [x] 1.5 Create directory structure:
```
pming/
├── src/
│   ├── cli.js              # Entry point, argument parsing
│   ├── init.js             # Init command logic
│   ├── prompts.js          # Interactive question definitions
│   ├── scaffold.js         # Directory and file creation
│   └── templates.js        # Template loading and variable injection
├── scaffold/               # Pre-written files copied into workspace
│   ├── CLAUDE.md
│   ├── skills/
│   │   ├── meeting-prep/SKILL.md
│   │   ├── decision-log/SKILL.md
│   │   ├── stakeholder-update/SKILL.md
│   │   ├── prd-draft/SKILL.md
│   │   └── prioritization/SKILL.md
│   ├── templates/
│   │   ├── stakeholder-template.md
│   │   ├── project-template.md
│   │   └── decision-template.md
│   └── references/
│       └── pm-codex.md
├── package.json
├── README.md
└── .gitignore
```
- [x] 1.6 Copy all existing skill files from the repo's `skills/` directory into `scaffold/skills/`
- [x] 1.7 Copy all existing template files from the repo's `templates/` directory into `scaffold/templates/`
- [x] 1.8 Copy `references/pm-codex.md` into `scaffold/references/`
- [x] 1.9 Copy `CLAUDE.md` into `scaffold/` as the base template (with placeholder tokens for variable injection)

### Task Group 2: CLI Entry Point & Argument Parsing

- [x] 2.1 `src/cli.js` parses command-line arguments. Supported commands: `init`, `update`, `--help`, `--version`
- [x] 2.2 `pming` with no arguments displays help text showing available commands
- [x] 2.3 `pming --version` prints the version from package.json
- [x] 2.4 `pming --help` displays usage information with descriptions of each command
- [x] 2.5 `pming init` invokes the init flow from `src/init.js`
- [x] 2.6 `pming update` prints "Coming soon — check https://github.com/srdrkr/pming for updates" (placeholder for future skill updates)
- [x] 2.7 Unknown commands display an error message and the help text

### Task Group 3: Interactive Prompts (Init Flow)

- [x] 3.1 Display welcome banner on `pming init`:
```
🧠 pming — your AI PM workspace

Let's set up your workspace. This takes about 5 minutes.
```
- [x] 3.2 Prompt 1 — Name: "What's your name?" (text input, required)
- [x] 3.3 Prompt 2 — Role: "What's your role? (e.g., 'Senior PM at Acme Corp')" (text input, required)
- [x] 3.4 Prompt 3 — AI Tool: "What AI tool do you primarily use?" (select from list):
  - Claude Desktop / Claude.ai
  - Cursor
  - Claude Code
  - Other (manual setup)
- [x] 3.5 Prompt 4 — Product: "Tell me about your product in a few sentences. (What does it do? Who's it for? What stage is it at?)" (multiline text input, required)
- [x] 3.6 Prompt 5 — Current Project: "One specific thing you're working on right now. A feature, a project, an initiative. Just one." (multiline text input, required)
- [x] 3.7 All prompts handle Ctrl+C gracefully with a clean exit message: "Setup cancelled. Run `pming init` when you're ready."
- [x] 3.8 Collect all responses into a context object: `{ name, role, aiTool, product, project }`

### Task Group 4: Scaffold Generation

- [ ] 4.1 Create workspace directory. Default: `./pming-workspace/` in current directory. If it already exists, prompt: "A pming workspace already exists here. Overwrite? (y/N)"
- [ ] 4.2 Create directory structure inside workspace:
```
pming-workspace/
├── context/
│   ├── stakeholders/
│   ├── projects/
│   └── decisions/
├── memory/
├── skills/
│   ├── meeting-prep/
│   ├── decision-log/
│   ├── stakeholder-update/
│   ├── prd-draft/
│   └── prioritization/
├── templates/
└── references/
```
- [ ] 4.3 Create `.gitkeep` files in empty directories: `context/stakeholders/`, `context/decisions/`, `memory/`
- [ ] 4.4 Copy all skill SKILL.md files from `scaffold/skills/` to `workspace/skills/`
- [ ] 4.5 Copy all template files from `scaffold/templates/` to `workspace/templates/`
- [ ] 4.6 Copy `scaffold/references/pm-codex.md` to `workspace/references/pm-codex.md`

### Task Group 5: Dynamic File Generation

- [ ] 5.1 Generate `USER.md` from template, injecting `name` and `role` from prompts. Place in workspace root.
- [ ] 5.2 Generate `context/product.md` from template, injecting the product description from prompt 4. Use the first sentence or product name as the heading.
- [ ] 5.3 Generate `context/projects/[slug].md` from template. Slug derived from project description (first ~5 words, lowercased, hyphenated via `slugify`). Inject the project description from prompt 5.
- [ ] 5.4 Generate the agent config file based on AI tool selection:
  - Claude Desktop / Claude.ai → `CLAUDE.md`
  - Cursor → `.cursorrules` (same content as CLAUDE.md)
  - Claude Code → `CLAUDE.md`
  - Other → `AGENTS.md` (same content as CLAUDE.md)
- [ ] 5.5 Agent config file generation: read `scaffold/CLAUDE.md`, replace `[Name]` with PM's name and `[Role]` with PM's role. Write to appropriate filename per 5.4.
- [ ] 5.6 Generate `memory/long-term.md` with header only:
```markdown
# Long-Term Memory

*Curated insights that compound across sessions. Updated by your AI assistant as it learns.*
```
- [ ] 5.7 Generate `.gitignore`:
```
# Private session notes (don't commit to shared repos)
memory/

# OS files
.DS_Store
Thumbs.db
```

### Task Group 6: Completion Output

- [ ] 6.1 After all files are created, display completion summary:
```
✅ Your workspace is ready!

📁 Created:
   CLAUDE.md          — Your AI assistant's operating manual
   USER.md            — Your profile
   context/product.md — Your product context
   context/projects/  — Your current project
   skills/            — 5 PM skills ready to use
   references/        — PM Codex (your principles playbook)
   memory/            — Where context compounds over time
   templates/         — Starting points for new files

🚀 What to do next:

   Open this folder in [AI Tool Name] and start a conversation.
   Try one of these:

   "Tell me what you know about me and my product"
   "Prep me for a meeting with my VP tomorrow"
   "I just made a decision I want to log"

   The more you use it, the smarter it gets. See you in there.
```
- [ ] 6.2 The `[AI Tool Name]` in the completion output should match the selected tool from prompt 3
- [ ] 6.3 If AI tool is "Claude Desktop," add: "Tip: In Claude Desktop, click 'Add to project' and select your pming-workspace folder."
- [ ] 6.4 If AI tool is "Cursor," add: "Tip: Open the pming-workspace folder in Cursor — it'll pick up .cursorrules automatically."

### Task Group 7: Error Handling & Edge Cases

- [ ] 7.1 If Node.js version is below 18, print error and exit: "pming requires Node.js 18 or later. You're running [version]."
- [ ] 7.2 If `fs.mkdir` fails due to permissions, print clear error: "Couldn't create workspace directory. Check your permissions for [path]."
- [ ] 7.3 If any file copy fails, print which file failed and continue with remaining files. Don't abort entire scaffold on single file failure.
- [ ] 7.4 If the user's terminal doesn't support interactive prompts (non-TTY), print: "pming init requires an interactive terminal. Run it directly (not piped)."

### Task Group 8: README

- [ ] 8.1 Create `README.md` in the package root (not the workspace) with:
  - Project description: "AI-powered PM workspace scaffold"
  - Install/usage: `npx pming init`
  - What it creates (directory structure overview)
  - Supported AI tools
  - Link to Product Shadow (productshadow.app)
  - License: MIT

### Task Group 9: Testing

- [ ] 9.1 Create `tests/` directory with test file `tests/scaffold.test.js`
- [ ] 9.2 Test: `pming init` creates all expected directories
- [ ] 9.3 Test: `pming init` creates all expected files (CLAUDE.md, USER.md, product.md, project file, all skills, all templates, pm-codex.md, .gitignore)
- [ ] 9.4 Test: Variable injection replaces `[Name]` and `[Role]` in generated CLAUDE.md
- [ ] 9.5 Test: Project slug generation produces valid filesystem-safe slugs
- [ ] 9.6 Test: Overwrite prompt appears when workspace directory already exists
- [ ] 9.7 Test: `--version` outputs the correct version
- [ ] 9.8 Test: `--help` outputs usage information
- [ ] 9.9 Use Node.js built-in test runner (`node:test`) — no additional test framework dependency

---

## Success Metrics

- **Build:** All tests pass. `npx pming init` completes in under 10 seconds.
- **Usability:** A PM goes from `npx pming init` to first AI conversation with context in under 5 minutes.
- **Validation:** Session 2 feels meaningfully different from Session 1 (the AI remembers and references context).

## Scope

**In scope:**
- `pming init` command with interactive prompts
- Workspace directory scaffold with all files
- Support for Claude Desktop, Cursor, Claude Code, and generic (Other)
- `pming update` placeholder
- README, .gitignore, basic tests

**Out of scope:**
- Hosted onboarding wizard (Phase 3)
- Cloud sync (Phase 4)
- MCP server integration
- `pming update` actual implementation (future)
- Analytics or telemetry (none, ever — trust through transparency)
- Account creation or login

## Dependencies

- Node.js 18+
- npm packages: `enquirer`, `chalk`, `fs-extra`, `slugify`
- No external APIs, no network calls, no accounts

## Technical Notes

- Use ESM modules (`"type": "module"` in package.json)
- Keep dependencies minimal — this ships as a lightweight CLI, not a framework
- All scaffold files are static copies + simple string replacement. No templating engine needed.
- The `scaffold/` directory contains the canonical versions of all files that get copied into workspaces. These ARE the product.

---

*This PRD is designed to be executed by Ralphy via Claude Code agents. Each task group can be executed as a parallel group (groups 1-2 first, then 3-5, then 6-8, then 9). Tasks within a group can run in parallel where there are no dependencies.*
