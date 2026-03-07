import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const pkg = JSON.parse(readFileSync(resolve('package.json'), 'utf8'));

describe('package.json', () => {
  it('has name set to pming', () => {
    assert.equal(pkg.name, 'pming');
  });

  it('has bin entry pointing pming to src/cli.js', () => {
    assert.equal(pkg.bin.pming, 'src/cli.js');
  });

  it('uses ESM modules', () => {
    assert.equal(pkg.type, 'module');
  });
});

describe('src/cli.js', () => {
  it('starts with a shebang line', () => {
    const cli = readFileSync(resolve('src/cli.js'), 'utf8');
    assert.ok(cli.startsWith('#!/usr/bin/env node'), 'cli.js should start with #!/usr/bin/env node');
  });

  it('is executable', () => {
    const stats = statSync(resolve('src/cli.js'));
    const isExecutable = (stats.mode & 0o111) !== 0;
    assert.ok(isExecutable, 'cli.js should be executable');
  });
});
