import { join } from 'node:path';
import fse from 'fs-extra';
import slugify from 'slugify';
import { SCAFFOLD_DIR } from './scaffold.js';

const AI_TOOL_CONFIG_FILENAMES = {
  'claude-desktop': 'CLAUDE.md',
  cursor: '.cursorrules',
  'claude-code': 'CLAUDE.md',
  cowork: 'CLAUDE.md',
  other: 'AGENTS.md',
};

export async function generateFiles(targetDir, context) {
  const { name, role, aiTool, product, project } = context;

  // 5.5 + 5.4: Agent config file — read scaffold/CLAUDE.md, inject name/role, write per tool
  const configFilename = AI_TOOL_CONFIG_FILENAMES[aiTool] || 'AGENTS.md';
  const claudeTemplate = await fse.readFile(join(SCAFFOLD_DIR, 'CLAUDE.md'), 'utf8');
  const configContent = claudeTemplate.replaceAll('[Name]', name).replaceAll('[Role]', role);
  await fse.writeFile(join(targetDir, configFilename), configContent);

  // 5.1: USER.md
  const userTemplate = await fse.readFile(join(SCAFFOLD_DIR, 'templates', 'USER.md'), 'utf8');
  const userContent = userTemplate.replaceAll('[Name]', name).replaceAll('[Role]', role);
  await fse.writeFile(join(targetDir, 'USER.md'), userContent);

  // 5.2: context/product.md
  const productTemplate = await fse.readFile(join(SCAFFOLD_DIR, 'templates', 'product.md'), 'utf8');
  const firstSentence = product.split(/[.!?]/)[0].trim();
  const productContent = productTemplate
    .replace('[Product Name]', firstSentence)
    .replace(
      '[Product description from init. What does it do, who\'s it for, what stage is it at.]',
      product,
    );
  await fse.writeFile(join(targetDir, 'context', 'product.md'), productContent);

  // 5.3: context/projects/[slug].md
  const projectTemplate = await fse.readFile(
    join(SCAFFOLD_DIR, 'templates', 'project-template.md'),
    'utf8',
  );
  const words = project.split(/\s+/).slice(0, 5).join(' ');
  const projectSlug = slugify(words, { lower: true, strict: true });
  const today = new Date().toISOString().slice(0, 10);
  const projectContent = projectTemplate
    .replace('[Project Name]', project.split(/[.!?]/)[0].trim())
    .replace('[Active / On Hold / Completed / Killed]', 'Active')
    .replace('[PM or team responsible]', name)
    .replace('YYYY-MM-DD', today)
    .replace('[Key milestone or ship date, if known]', 'TBD')
    .replace(
      '[2-3 sentences. What is this project, why does it exist, and what does success look like? Write for someone encountering this project for the first time.]',
      project,
    );
  await fse.writeFile(join(targetDir, 'context', 'projects', `${projectSlug}.md`), projectContent);

  // 5.6: memory/long-term.md
  await fse.writeFile(
    join(targetDir, 'memory', 'long-term.md'),
    '# Long-Term Memory\n\n*Curated insights that compound across sessions. Updated by your AI assistant as it learns.*\n',
  );

  // 5.7: .gitignore
  await fse.writeFile(
    join(targetDir, '.gitignore'),
    `# Private session notes (don't commit to shared repos)\nmemory/\n\n# OS files\n.DS_Store\nThumbs.db\n`,
  );

  return { configFilename, projectSlug };
}
