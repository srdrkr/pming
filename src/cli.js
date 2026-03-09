#!/usr/bin/env node

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { realpathSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import fse from 'fs-extra';
import Enquirer from 'enquirer';
import chalk from 'chalk';

const nodeMajor = parseInt(process.versions.node.split('.')[0], 10);
if (nodeMajor < 18) {
  console.error(`pming requires Node.js 18 or later. You're running ${process.versions.node}.`);
  process.exit(1);
}

const require = createRequire(import.meta.url);
const { version } = require('../package.json');
const __dirname = dirname(fileURLToPath(import.meta.url));
const SCAFFOLD_SKILLS_DIR = join(__dirname, '..', 'scaffold', 'skills');

const COMMANDS = ['init', 'update', 'add-skill', 'list-skills'];

function parseArgs(argv = process.argv.slice(2)) {
  const [arg, ...rest] = argv;

  if (!arg || arg === '--help' || arg === '-h') {
    return { command: 'help' };
  }

  if (arg === '--version' || arg === '-v') {
    return { command: 'version' };
  }

  if (arg === 'add-skill') {
    return parseAddSkillArgs(rest);
  }

  if (arg === 'list-skills') {
    return parseListSkillsArgs(rest);
  }

  if (COMMANDS.includes(arg)) {
    return { command: arg };
  }

  return { command: 'unknown', input: arg };
}

function parseAddSkillArgs(args) {
  let create = false;
  let name;

  for (const arg of args) {
    if (arg === '--help' || arg === '-h') {
      return { command: 'add-skill-help' };
    }

    if (arg === '--create') {
      create = true;
      continue;
    }

    if (arg.startsWith('-')) {
      return {
        command: 'invalid',
        error: `Unknown option for add-skill: ${arg}`,
        help: 'add-skill',
      };
    }

    if (name) {
      return {
        command: 'invalid',
        error: 'add-skill accepts exactly one <name> argument.',
        help: 'add-skill',
      };
    }

    name = arg;
  }

  return { command: 'add-skill', create, name };
}

function parseListSkillsArgs(args) {
  if (args.length === 0) {
    return { command: 'list-skills' };
  }

  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    return { command: 'list-skills-help' };
  }

  return {
    command: 'invalid',
    error: 'list-skills does not accept positional arguments.',
    help: 'list-skills',
  };
}

function showHelp() {
  console.log(`
pming v${version} — AI-powered PM workspace scaffold

Usage: pming <command>

Commands:
  init                 Create a new PM workspace
  update               Update an existing workspace
  add-skill <name>     Add a built-in skill or create a custom skill
  list-skills          List installed, available, and custom skills

Options:
  --help, -h       Show this help message
  --version, -v    Show version number
`.trim());
}

function showAddSkillHelp() {
  console.log(`
Usage: pming add-skill <name> [--create]

Modes:
  default      Install a built-in skill from scaffold/skills/<name>/
  --create     Create skills/<slug>/SKILL.md from a starter template

Examples:
  pming add-skill meeting-prep
  pming add-skill --create customer-research
`.trim());
}

function showListSkillsHelp() {
  console.log(`
Usage: pming list-skills

Lists:
  - Installed built-in skills in your workspace
  - Built-in skills available but not installed
  - Custom skills in your workspace
`.trim());
}

function showVersion() {
  console.log(version);
}

async function getBuiltInSkills() {
  const entries = await readdir(SCAFFOLD_SKILLS_DIR, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function toSkillSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toTitleCase(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

async function confirmOverwrite(skillName) {
  const enquirer = new Enquirer();
  const { overwrite } = await enquirer.prompt({
    type: 'confirm',
    name: 'overwrite',
    message: `${skillName} already exists. Overwrite? (y/N)`,
    initial: false,
  });
  return overwrite;
}

function renderCustomSkillTemplate(skillSlug) {
  const title = toTitleCase(skillSlug);
  return `# ${title} Skill

## When to Use
[Describe when this skill should activate — what triggers it, what phrases or situations invoke it]

## Workflow
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Output Format
[Describe what artifact this skill produces and where it should be saved]

## Mesh References
- **Reads from:** [What context files does this skill use? e.g., context/product.md, context/stakeholders/]
- **Writes to:** [Where do outputs go? e.g., context/projects/, context/decisions/]
- **Feeds into:** [What other skills benefit from this skill's output?]
`;
}

async function addSkill({ name, create = false }) {
  if (!name) {
    console.error('Skill name is required.');
    console.log();
    showAddSkillHelp();
    process.exitCode = 1;
    return;
  }

  const skillSlug = toSkillSlug(name);
  if (!skillSlug) {
    console.error(`Invalid skill name: ${name}`);
    process.exitCode = 1;
    return;
  }

  const workspaceSkillsDir = join(process.cwd(), 'skills');
  if (!await fse.pathExists(workspaceSkillsDir)) {
    console.error("No pming workspace found. Run 'pming init' first.");
    process.exitCode = 1;
    return;
  }

  const targetDir = join(workspaceSkillsDir, skillSlug);

  if (create) {
    if (await fse.pathExists(targetDir)) {
      const overwrite = await confirmOverwrite(skillSlug);
      if (!overwrite) {
        console.log('Cancelled.');
        return;
      }
      await fse.remove(targetDir);
    }

    await fse.ensureDir(targetDir);
    const skillPath = join(targetDir, 'SKILL.md');
    await fse.writeFile(skillPath, renderCustomSkillTemplate(skillSlug), 'utf8');
    console.log(
      `${chalk.green('\u2713')} Created custom skill: skills/${skillSlug}/SKILL.md \u2014 edit it to define your workflow`,
    );
    return;
  }

  const builtInSkills = await getBuiltInSkills();
  if (!builtInSkills.includes(skillSlug)) {
    console.error(
      `No built-in skill named '${name}'. Did you mean one of: ${builtInSkills.join(', ')}? Or use --create to make a custom skill.`,
    );
    process.exitCode = 1;
    return;
  }

  if (await fse.pathExists(targetDir)) {
    const overwrite = await confirmOverwrite(skillSlug);
    if (!overwrite) {
      console.log('Cancelled.');
      return;
    }
    await fse.remove(targetDir);
  }

  await fse.copy(join(SCAFFOLD_SKILLS_DIR, skillSlug), targetDir);
  console.log(`${chalk.green('\u2713')} Added skill: ${skillSlug} \u2192 skills/${skillSlug}/`);
}

async function listSkills() {
  const workspaceSkillsDir = join(process.cwd(), 'skills');
  if (!await fse.pathExists(workspaceSkillsDir)) {
    console.log("No pming workspace found. Run 'pming init' first.");
    process.exitCode = 1;
    return;
  }

  const builtInSkills = await getBuiltInSkills();
  const entries = await readdir(workspaceSkillsDir, { withFileTypes: true });
  const workspaceSkills = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const installed = builtInSkills.filter((skill) => workspaceSkills.includes(skill));
  const available = builtInSkills.filter((skill) => !workspaceSkills.includes(skill));
  const custom = workspaceSkills.filter((skill) => !builtInSkills.includes(skill));

  console.log('Installed skills:');
  if (installed.length === 0) {
    console.log('  (none)');
  } else {
    for (const skill of installed) {
      console.log(`  ${chalk.green('\u2713')} ${skill}`);
    }
  }

  console.log();
  console.log('Available (not installed):');
  if (available.length === 0) {
    console.log('  (none \u2014 all built-in skills installed)');
  } else {
    for (const skill of available) {
      console.log(`  ${skill}`);
    }
  }

  console.log();
  console.log('Custom skills:');
  if (custom.length === 0) {
    console.log('  (none)');
  } else {
    for (const skill of custom) {
      console.log(`  ${chalk.yellow('\u2605')} ${skill}`);
    }
  }
}

async function run(argv) {
  const {
    command,
    create,
    error,
    help,
    input,
    name,
  } = parseArgs(argv);

  switch (command) {
    case 'help':
      showHelp();
      break;
    case 'add-skill-help':
      showAddSkillHelp();
      break;
    case 'list-skills-help':
      showListSkillsHelp();
      break;
    case 'version':
      showVersion();
      break;
    case 'init': {
      const { init } = await import('./init.js');
      await init();
      break;
    }
    case 'update':
      console.log('Coming soon — check https://github.com/srdrkr/pming for updates');
      break;
    case 'add-skill':
      await addSkill({ name, create });
      break;
    case 'list-skills':
      await listSkills();
      break;
    case 'invalid':
      console.error(error);
      console.log();
      if (help === 'add-skill') {
        showAddSkillHelp();
      } else if (help === 'list-skills') {
        showListSkillsHelp();
      } else {
        showHelp();
      }
      process.exitCode = 1;
      break;
    case 'unknown':
      console.error(`Unknown command: ${input}`);
      console.log();
      showHelp();
      process.exitCode = 1;
      break;
  }
}

export {
  addSkill,
  listSkills,
  parseArgs,
  run,
  showAddSkillHelp,
  showHelp,
  showListSkillsHelp,
  showVersion,
};

if (process.argv[1]) {
  try {
    const arg1Real = realpathSync(resolve(process.argv[1]));
    const selfReal = fileURLToPath(import.meta.url);
    if (arg1Real === selfReal) {
      run();
    }
  } catch {
    // realpathSync can fail if the path doesn't exist; skip silently
  }
}
