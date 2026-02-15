import { test, describe, after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile, readdir, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = join(__dirname, '..', 'src', 'cli.js');

function runCli(args = []) {
  return new Promise((resolve) => {
    execFile('node', [cliPath, ...args], (error, stdout, stderr) => {
      resolve({ stdout, stderr, exitCode: error?.code ?? 0 });
    });
  });
}

// 9.2: createWorkspace creates all expected directories
describe('createWorkspace', () => {
  let tmpDir;

  after(async () => {
    if (tmpDir) await rm(tmpDir, { recursive: true, force: true });
  });

  test('creates all 13 expected directories', async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'pming-test-'));
    const targetDir = join(tmpDir, 'workspace');

    const { createWorkspace } = await import('../src/scaffold.js');
    const result = await createWorkspace(targetDir);
    assert.equal(result, true);

    const expectedDirs = [
      'context',
      'context/stakeholders',
      'context/projects',
      'context/decisions',
      'memory',
      'skills',
      'skills/meeting-prep',
      'skills/decision-log',
      'skills/stakeholder-update',
      'skills/prd-draft',
      'skills/prioritization',
      'templates',
      'references',
    ];

    for (const dir of expectedDirs) {
      const info = await stat(join(targetDir, dir));
      assert.ok(info.isDirectory(), `${dir} should be a directory`);
    }
  });

  // 9.3: generateFiles creates all expected files
  test('generateFiles creates all expected files', async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'pming-test-'));
    const targetDir = join(tmpDir, 'workspace');

    const { createWorkspace } = await import('../src/scaffold.js');
    await createWorkspace(targetDir);

    const { generateFiles } = await import('../src/templates.js');
    const context = {
      name: 'Test User',
      role: 'PM at TestCo',
      aiTool: 'claude-code',
      product: 'A test product. It does testing things.',
      project: 'Build the testing framework',
    };
    const { configFilename, projectSlug } = await generateFiles(targetDir, context);

    assert.equal(configFilename, 'CLAUDE.md');

    // Check all expected files exist
    const expectedFiles = [
      'CLAUDE.md',
      'USER.md',
      'context/product.md',
      `context/projects/${projectSlug}.md`,
      'skills/meeting-prep/SKILL.md',
      'skills/decision-log/SKILL.md',
      'skills/stakeholder-update/SKILL.md',
      'skills/prd-draft/SKILL.md',
      'skills/prioritization/SKILL.md',
      'templates/stakeholder-template.md',
      'templates/project-template.md',
      'templates/decision-template.md',
      'templates/product.md',
      'templates/USER.md',
      'references/pm-codex.md',
      '.gitignore',
      'memory/long-term.md',
    ];

    for (const file of expectedFiles) {
      const info = await stat(join(targetDir, file));
      assert.ok(info.isFile(), `${file} should exist`);
    }
  });

  // 9.4: Variable injection replaces [Name] and [Role]
  test('variable injection replaces [Name] and [Role] in generated CLAUDE.md', async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'pming-test-'));
    const targetDir = join(tmpDir, 'workspace');

    const { createWorkspace } = await import('../src/scaffold.js');
    await createWorkspace(targetDir);

    const { generateFiles } = await import('../src/templates.js');
    await generateFiles(targetDir, {
      name: 'Alice Johnson',
      role: 'Director of Product at Widgets Inc',
      aiTool: 'claude-desktop',
      product: 'Widget Manager. Manages widgets for enterprises.',
      project: 'Launch the enterprise dashboard',
    });

    const content = await readFile(join(targetDir, 'CLAUDE.md'), 'utf8');
    assert.ok(content.includes('Alice Johnson'), 'CLAUDE.md should contain injected name');
    assert.ok(
      content.includes('Director of Product at Widgets Inc'),
      'CLAUDE.md should contain injected role',
    );
    assert.ok(!content.includes('[Name]'), 'CLAUDE.md should not contain [Name] placeholder');
    assert.ok(!content.includes('[Role]'), 'CLAUDE.md should not contain [Role] placeholder');
  });
});

// 9.5: Slug generation produces valid filesystem-safe slugs
describe('slug generation', () => {
  let tmpDir;

  after(async () => {
    if (tmpDir) await rm(tmpDir, { recursive: true, force: true });
  });

  test('produces valid filesystem-safe slugs from project descriptions', async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'pming-test-'));

    const testCases = [
      { input: 'Build the new dashboard feature', expected: 'build-the-new-dashboard-feature' },
      { input: 'Launch MVP for enterprise customers today', expected: 'launch-mvp-for-enterprise-customers' },
      { input: "Fix the user's login flow", expected: 'fix-the-users-login-flow' },
      { input: 'API & SDK improvements phase 2', expected: 'api-and-sdk-improvements-phase' },
    ];

    const { generateFiles } = await import('../src/templates.js');
    const { createWorkspace } = await import('../src/scaffold.js');

    for (const { input, expected } of testCases) {
      const targetDir = join(tmpDir, `ws-${expected}`);
      await createWorkspace(targetDir);
      const { projectSlug } = await generateFiles(targetDir, {
        name: 'Test',
        role: 'PM',
        aiTool: 'claude-code',
        product: 'Test product',
        project: input,
      });
      assert.equal(projectSlug, expected, `"${input}" should produce slug "${expected}"`);

      // Verify the file was actually created with this slug
      const info = await stat(join(targetDir, 'context', 'projects', `${projectSlug}.md`));
      assert.ok(info.isFile());
    }
  });
});

// 9.6: createWorkspace returns true for new directory
describe('createWorkspace overwrite behavior', () => {
  let tmpDir;

  after(async () => {
    if (tmpDir) await rm(tmpDir, { recursive: true, force: true });
  });

  test('returns true for new directory', async () => {
    tmpDir = await mkdtemp(join(tmpdir(), 'pming-test-'));
    const targetDir = join(tmpDir, 'fresh-workspace');

    const { createWorkspace } = await import('../src/scaffold.js');
    const result = await createWorkspace(targetDir);
    assert.equal(result, true);
  });
});

// 9.7: --version outputs correct version
test('--version outputs the correct version', async () => {
  const pkg = JSON.parse(await readFile(join(__dirname, '..', 'package.json'), 'utf8'));
  const { stdout } = await runCli(['--version']);
  assert.equal(stdout.trim(), pkg.version);
});

// 9.8: --help outputs usage information
test('--help outputs usage information', async () => {
  const { stdout } = await runCli(['--help']);
  assert.ok(stdout.includes('Usage: pming'));
  assert.ok(stdout.includes('init'));
  assert.ok(stdout.includes('update'));
  assert.ok(stdout.includes('--help'));
  assert.ok(stdout.includes('--version'));
});
