import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sourcePath = join(root, 'CLAUDE.md');
const scaffoldPath = join(root, 'scaffold', 'CLAUDE.md');

describe('scaffold/CLAUDE.md', () => {
  it('exists and matches source CLAUDE.md', async () => {
    const [source, scaffold] = await Promise.all([
      readFile(sourcePath, 'utf8'),
      readFile(scaffoldPath, 'utf8'),
    ]);
    assert.equal(scaffold, source, 'scaffold/CLAUDE.md should be identical to CLAUDE.md');
  });

  it('contains [Name] placeholder token', async () => {
    const content = await readFile(scaffoldPath, 'utf8');
    assert.ok(content.includes('[Name]'), 'scaffold/CLAUDE.md should contain [Name] placeholder');
  });

  it('contains [Role] placeholder token', async () => {
    const content = await readFile(scaffoldPath, 'utf8');
    assert.ok(content.includes('[Role]'), 'scaffold/CLAUDE.md should contain [Role] placeholder');
  });
});
