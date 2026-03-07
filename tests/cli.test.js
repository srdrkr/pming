import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = join(__dirname, '..', 'src', 'cli.js');
const scaffoldSkillsDir = join(__dirname, '..', 'scaffold', 'skills');

function runCli(args = [], options = {}) {
  return new Promise((resolve) => {
    execFile('node', [cliPath, ...args], options, (error, stdout, stderr) => {
      resolve({ stdout, stderr, exitCode: error?.code ?? 0 });
    });
  });
}

async function setupWorkspace(t) {
  const workspaceDir = await mkdtemp(join(tmpdir(), 'pming-cli-'));
  await mkdir(join(workspaceDir, 'skills'), { recursive: true });
  t.after(async () => {
    await rm(workspaceDir, { recursive: true, force: true });
  });
  return workspaceDir;
}

async function getBuiltInSkills() {
  const entries = await readdir(scaffoldSkillsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

// parseArgs unit tests (imported function)
test('parseArgs: no arguments returns help command', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs([]), { command: 'help' });
});

test('parseArgs: --help returns help command', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs(['--help']), { command: 'help' });
});

test('parseArgs: -h returns help command', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs(['-h']), { command: 'help' });
});

test('parseArgs: --version returns version command', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs(['--version']), { command: 'version' });
});

test('parseArgs: -v returns version command', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs(['-v']), { command: 'version' });
});

test('parseArgs: init returns init command', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs(['init']), { command: 'init' });
});

test('parseArgs: update returns update command', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs(['update']), { command: 'update' });
});

test('parseArgs: add-skill parses skill name', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs(['add-skill', 'meeting-prep']), {
    command: 'add-skill',
    create: false,
    name: 'meeting-prep',
  });
});

test('parseArgs: add-skill parses --create flag', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs(['add-skill', '--create', 'customer-research']), {
    command: 'add-skill',
    create: true,
    name: 'customer-research',
  });
});

test('parseArgs: list-skills returns list-skills command', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs(['list-skills']), { command: 'list-skills' });
});

test('parseArgs: unknown arg returns unknown with input', async () => {
  const { parseArgs } = await import('../src/cli.js');
  assert.deepEqual(parseArgs(['foo']), { command: 'unknown', input: 'foo' });
});

// Integration tests (CLI as subprocess)
test('cli: no arguments prints help text', async () => {
  const { stdout } = await runCli();
  assert.ok(stdout.includes('Usage: pming'));
  assert.ok(stdout.includes('init'));
  assert.ok(stdout.includes('update'));
  assert.ok(stdout.includes('add-skill'));
  assert.ok(stdout.includes('list-skills'));
});

test('cli: --help prints help text', async () => {
  const { stdout } = await runCli(['--help']);
  assert.ok(stdout.includes('Usage: pming'));
  assert.ok(stdout.includes('add-skill <name>'));
  assert.ok(stdout.includes('list-skills'));
});

test('cli: --version prints version from package.json', async () => {
  const pkg = JSON.parse(await readFile(join(__dirname, '..', 'package.json'), 'utf8'));
  const { stdout } = await runCli(['--version']);
  assert.equal(stdout.trim(), pkg.version);
});

test('cli: unknown command prints error and help', async () => {
  const { stderr, stdout, exitCode } = await runCli(['badcommand']);
  assert.ok(stderr.includes('Unknown command: badcommand'));
  assert.ok(stdout.includes('Usage: pming'));
  assert.equal(exitCode, 1);
});

test('cli: update prints coming soon message', async () => {
  const { stdout } = await runCli(['update']);
  assert.ok(stdout.includes('Coming soon'));
});

test('add-skill copies a built-in skill correctly', async (t) => {
  const workspaceDir = await setupWorkspace(t);
  const builtInSkills = await getBuiltInSkills();
  const skillName = builtInSkills.includes('meeting-prep') ? 'meeting-prep' : builtInSkills[0];

  const { stdout, stderr, exitCode } = await runCli(['add-skill', skillName], { cwd: workspaceDir });
  assert.equal(exitCode, 0);
  assert.equal(stderr, '');
  assert.ok(stdout.includes(`Added skill: ${skillName} → skills/${skillName}/`));

  const [copied, scaffold] = await Promise.all([
    readFile(join(workspaceDir, 'skills', skillName, 'SKILL.md'), 'utf8'),
    readFile(join(scaffoldSkillsDir, skillName, 'SKILL.md'), 'utf8'),
  ]);
  assert.equal(copied, scaffold);
});

test('add-skill --create generates the template SKILL.md', async (t) => {
  const workspaceDir = await setupWorkspace(t);

  const { stdout, stderr, exitCode } = await runCli(
    ['add-skill', '--create', 'Customer Research'],
    { cwd: workspaceDir },
  );

  assert.equal(exitCode, 0);
  assert.equal(stderr, '');
  assert.ok(
    stdout.includes('Created custom skill: skills/customer-research/SKILL.md'),
  );

  const template = await readFile(
    join(workspaceDir, 'skills', 'customer-research', 'SKILL.md'),
    'utf8',
  );

  assert.ok(template.includes('# Customer Research Skill'));
  assert.ok(template.includes('## When to Use'));
  assert.ok(template.includes('## Workflow'));
  assert.ok(template.includes('## Output Format'));
  assert.ok(template.includes('## Mesh References'));
});

test('add-skill rejects unknown names without --create', async (t) => {
  const workspaceDir = await setupWorkspace(t);
  const { stderr, exitCode } = await runCli(['add-skill', 'unknown-skill'], { cwd: workspaceDir });

  assert.equal(exitCode, 1);
  assert.ok(stderr.includes("No built-in skill named 'unknown-skill'."));
  assert.ok(stderr.includes('Or use --create to make a custom skill.'));
});

test('list-skills shows installed, available, and custom skills correctly', async (t) => {
  const workspaceDir = await setupWorkspace(t);
  const builtInSkills = await getBuiltInSkills();
  const [firstInstalled, secondInstalled, ...remainingBuiltIns] = builtInSkills;

  await Promise.all([
    mkdir(join(workspaceDir, 'skills', firstInstalled), { recursive: true }),
    mkdir(join(workspaceDir, 'skills', secondInstalled), { recursive: true }),
    mkdir(join(workspaceDir, 'skills', 'customer-research'), { recursive: true }),
  ]);

  const { stdout, stderr, exitCode } = await runCli(['list-skills'], { cwd: workspaceDir });
  assert.equal(exitCode, 0);
  assert.equal(stderr, '');
  assert.ok(stdout.includes('Installed skills:'));
  assert.ok(stdout.includes(`✓ ${firstInstalled}`));
  assert.ok(stdout.includes(`✓ ${secondInstalled}`));
  assert.ok(stdout.includes('Available (not installed):'));
  for (const available of remainingBuiltIns) {
    assert.ok(stdout.includes(available), `${available} should be listed as available`);
  }
  assert.ok(stdout.includes('Custom skills:'));
  assert.ok(stdout.includes('★ customer-research'));
});

test('list-skills works when all built-in skills are installed', async (t) => {
  const workspaceDir = await setupWorkspace(t);
  const builtInSkills = await getBuiltInSkills();

  await Promise.all(
    builtInSkills.map((skill) => mkdir(join(workspaceDir, 'skills', skill), { recursive: true })),
  );

  const { stdout, stderr, exitCode } = await runCli(['list-skills'], { cwd: workspaceDir });
  assert.equal(exitCode, 0);
  assert.equal(stderr, '');
  assert.ok(stdout.includes('Installed skills:'));
  for (const skill of builtInSkills) {
    assert.ok(stdout.includes(`✓ ${skill}`), `${skill} should be listed as installed`);
  }
  assert.ok(stdout.includes('Available (not installed):'));
  assert.ok(stdout.includes('(none — all built-in skills installed)'));
});
