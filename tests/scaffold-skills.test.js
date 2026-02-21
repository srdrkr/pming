import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const skillsDir = join(root, 'skills');
const scaffoldSkillsDir = join(root, 'scaffold', 'skills');

const expectedSkills = [
  '11-star-experience',
  'decision-log',
  'meeting-prep',
  'prd-draft',
  'prioritization',
  'stakeholder-update',
];

describe('scaffold/skills/', () => {
  it('contains all skill directories', async () => {
    const entries = await readdir(scaffoldSkillsDir, { withFileTypes: true });
    const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
    assert.deepEqual(dirs, expectedSkills);
  });

  for (const skill of expectedSkills) {
    it(`${skill}/SKILL.md exists and matches source`, async () => {
      const srcPath = join(skillsDir, skill, 'SKILL.md');
      const scaffoldPath = join(scaffoldSkillsDir, skill, 'SKILL.md');

      const [src, scaffold] = await Promise.all([
        readFile(srcPath, 'utf8'),
        readFile(scaffoldPath, 'utf8'),
      ]);

      assert.equal(scaffold, src, `scaffold/skills/${skill}/SKILL.md should match skills/${skill}/SKILL.md`);
    });
  }

  it('each skill directory contains exactly one SKILL.md file', async () => {
    for (const skill of expectedSkills) {
      const entries = await readdir(join(scaffoldSkillsDir, skill));
      assert.deepEqual(entries, ['SKILL.md'], `scaffold/skills/${skill}/ should contain only SKILL.md`);
    }
  });
});
