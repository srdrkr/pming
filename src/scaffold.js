import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import fse from 'fs-extra';
import Enquirer from 'enquirer';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const SCAFFOLD_DIR = join(__dirname, '..', 'scaffold');

const DIRECTORIES = [
  'context',
  'context/stakeholders',
  'context/projects',
  'context/decisions',
  'memory',
  'skills',
  'skills/11-star-experience',
  'skills/meeting-prep',
  'skills/decision-log',
  'skills/stakeholder-update',
  'skills/prd-draft',
  'skills/prioritization',
  'templates',
  'references',
];

export async function createWorkspace(targetDir) {
  if (await fse.pathExists(targetDir)) {
    const enquirer = new Enquirer();
    const { overwrite } = await enquirer.prompt({
      type: 'confirm',
      name: 'overwrite',
      message: 'A pming workspace already exists here. Overwrite?',
      initial: false,
    });
    if (!overwrite) return false;
    await fse.remove(targetDir);
  }

  // Create all directories
  for (const dir of DIRECTORIES) {
    await fse.ensureDir(join(targetDir, dir));
  }

  // Create .gitkeep files in empty directories
  for (const dir of ['context/stakeholders', 'context/decisions', 'memory']) {
    await fse.writeFile(join(targetDir, dir, '.gitkeep'), '');
  }

  // Copy skills
  try {
    await fse.copy(join(SCAFFOLD_DIR, 'skills'), join(targetDir, 'skills'));
  } catch (err) {
    console.warn(`Warning: could not copy skills — ${err.message}`);
  }

  // Copy templates
  try {
    await fse.copy(join(SCAFFOLD_DIR, 'templates'), join(targetDir, 'templates'));
  } catch (err) {
    console.warn(`Warning: could not copy templates — ${err.message}`);
  }

  // Copy references
  try {
    await fse.copy(join(SCAFFOLD_DIR, 'references'), join(targetDir, 'references'));
  } catch (err) {
    console.warn(`Warning: could not copy references — ${err.message}`);
  }

  return true;
}
