import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

describe('src/ module files', () => {
  for (const file of ['cli.js', 'init.js', 'prompts.js', 'scaffold.js', 'templates.js']) {
    it(`src/${file} exists`, async () => {
      await access(join(root, 'src', file), constants.F_OK);
    });
  }
});

describe('scaffold/ directory structure', () => {
  it('scaffold/ directory exists', async () => {
    await access(join(root, 'scaffold'), constants.F_OK);
  });

  it('scaffold/skills/ directory exists', async () => {
    await access(join(root, 'scaffold', 'skills'), constants.F_OK);
  });

  for (const skill of ['meeting-prep', 'decision-log', 'stakeholder-update', 'prd-draft', 'prioritization']) {
    it(`scaffold/skills/${skill}/ directory exists`, async () => {
      await access(join(root, 'scaffold', 'skills', skill), constants.F_OK);
    });
  }

  it('scaffold/templates/ directory exists', async () => {
    await access(join(root, 'scaffold', 'templates'), constants.F_OK);
  });

  it('scaffold/references/ directory exists', async () => {
    await access(join(root, 'scaffold', 'references'), constants.F_OK);
  });
});
