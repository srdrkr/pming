import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = join(__dirname, '..', 'package.json');

describe('dependencies', async () => {
  const raw = await readFile(pkgPath, 'utf8');
  const pkg = JSON.parse(raw);
  const deps = pkg.dependencies || {};

  it('has enquirer as a dependency', () => {
    assert.ok(deps.enquirer, 'enquirer should be listed in dependencies');
  });

  it('has chalk as a dependency', () => {
    assert.ok(deps.chalk, 'chalk should be listed in dependencies');
  });

  it('has fs-extra as a dependency', () => {
    assert.ok(deps['fs-extra'], 'fs-extra should be listed in dependencies');
  });

  it('has slugify as a dependency', () => {
    assert.ok(deps.slugify, 'slugify should be listed in dependencies');
  });

  it('can import enquirer', async () => {
    const mod = await import('enquirer');
    assert.ok(mod.default || mod, 'enquirer should be importable');
  });

  it('can import chalk', async () => {
    const { default: chalk } = await import('chalk');
    assert.equal(typeof chalk, 'function');
  });

  it('can import fs-extra', async () => {
    const mod = await import('fs-extra');
    assert.equal(typeof mod.copy, 'function');
    assert.equal(typeof mod.ensureDir, 'function');
  });

  it('can import slugify', async () => {
    const { default: slugify } = await import('slugify');
    assert.equal(typeof slugify, 'function');
    assert.equal(slugify('Hello World'), 'Hello-World');
  });
});
