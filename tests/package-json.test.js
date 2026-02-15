import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgPath = join(__dirname, '..', 'package.json');

describe('package.json', async () => {
  const raw = await readFile(pkgPath, 'utf8');
  const pkg = JSON.parse(raw);

  it('has name "pming"', () => {
    assert.equal(pkg.name, 'pming');
  });

  it('has version 0.1.0', () => {
    assert.equal(pkg.version, '0.1.0');
  });

  it('has description', () => {
    assert.equal(pkg.description, 'AI-powered PM workspace scaffold');
  });

  it('has type module', () => {
    assert.equal(pkg.type, 'module');
  });

  it('has bin entry pointing to src/cli.js', () => {
    assert.equal(pkg.bin.pming, 'src/cli.js');
  });

  it('has keywords array', () => {
    assert.ok(Array.isArray(pkg.keywords));
    assert.ok(pkg.keywords.length > 0);
  });

  it('has MIT license', () => {
    assert.equal(pkg.license, 'MIT');
  });

  it('has engines requiring node >=18', () => {
    assert.equal(pkg.engines.node, '>=18');
  });

  it('is valid JSON', () => {
    assert.doesNotThrow(() => JSON.parse(raw));
  });
});
