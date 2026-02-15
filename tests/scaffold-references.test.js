import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sourceDir = join(root, 'references');
const scaffoldDir = join(root, 'scaffold', 'references');

describe('scaffold/references', () => {
  it('contains pm-codex.md', async () => {
    const files = await readdir(scaffoldDir);
    assert.ok(files.includes('pm-codex.md'), 'scaffold/references/ should contain pm-codex.md');
  });

  it('pm-codex.md matches the source in references/', async () => {
    const [source, scaffold] = await Promise.all([
      readFile(join(sourceDir, 'pm-codex.md'), 'utf8'),
      readFile(join(scaffoldDir, 'pm-codex.md'), 'utf8'),
    ]);
    assert.equal(scaffold, source, 'scaffold/references/pm-codex.md should be identical to references/pm-codex.md');
  });
});
