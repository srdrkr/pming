import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliPath = join(__dirname, '..', 'src', 'cli.js');

test('src/cli.js starts with shebang line', async () => {
  const content = await readFile(cliPath, 'utf8');
  const firstLine = content.split('\n')[0];
  assert.equal(firstLine, '#!/usr/bin/env node');
});

test('src/cli.js shebang is the very first bytes of the file', async () => {
  const content = await readFile(cliPath, 'utf8');
  assert.ok(content.startsWith('#!'), 'file must start with #!');
});
