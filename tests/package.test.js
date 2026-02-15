import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

describe('package.json', () => {
  let pkg;

  it('exists and is valid JSON', async () => {
    const raw = await readFile(join(root, 'package.json'), 'utf8');
    pkg = JSON.parse(raw);
    assert.ok(pkg);
  });

  it('has name set to "pming"', async () => {
    const raw = await readFile(join(root, 'package.json'), 'utf8');
    pkg = JSON.parse(raw);
    assert.equal(pkg.name, 'pming');
  });

  it('has bin entry "pming" pointing to src/cli.js', async () => {
    const raw = await readFile(join(root, 'package.json'), 'utf8');
    pkg = JSON.parse(raw);
    assert.deepEqual(pkg.bin, { pming: 'src/cli.js' });
  });

  it('uses ESM modules', async () => {
    const raw = await readFile(join(root, 'package.json'), 'utf8');
    pkg = JSON.parse(raw);
    assert.equal(pkg.type, 'module');
  });
});

describe('src/cli.js', () => {
  it('exists', async () => {
    await access(join(root, 'src', 'cli.js'), constants.F_OK);
  });

  it('starts with node shebang', async () => {
    const content = await readFile(join(root, 'src', 'cli.js'), 'utf8');
    assert.ok(content.startsWith('#!/usr/bin/env node'));
  });
});
