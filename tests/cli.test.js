import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readFile } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = join(__dirname, '..', 'src', 'cli.js');

function runCli(args = []) {
  return new Promise((resolve) => {
    execFile('node', [cliPath, ...args], (error, stdout, stderr) => {
      resolve({ stdout, stderr, exitCode: error?.code ?? 0 });
    });
  });
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
});

test('cli: --help prints help text', async () => {
  const { stdout } = await runCli(['--help']);
  assert.ok(stdout.includes('Usage: pming'));
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
