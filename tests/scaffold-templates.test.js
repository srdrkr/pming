import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const sourceDir = join(root, 'templates');
const scaffoldDir = join(root, 'scaffold', 'templates');

const expectedFiles = [
  'decision-template.md',
  'product.md',
  'project-template.md',
  'stakeholder-template.md',
  'USER.md',
];

describe('scaffold/templates', () => {
  it('contains all template files', async () => {
    const files = await readdir(scaffoldDir);
    const sorted = [...files].sort();
    assert.deepEqual(sorted, [...expectedFiles].sort());
  });

  for (const file of expectedFiles) {
    it(`${file} matches the source in templates/`, async () => {
      const [source, scaffold] = await Promise.all([
        readFile(join(sourceDir, file), 'utf8'),
        readFile(join(scaffoldDir, file), 'utf8'),
      ]);
      assert.equal(scaffold, source, `scaffold/templates/${file} should be identical to templates/${file}`);
    });
  }
});
