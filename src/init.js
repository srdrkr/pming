import { join } from 'node:path';
import { collectAnswers } from './prompts.js';
import { createWorkspace } from './scaffold.js';
import { generateFiles } from './templates.js';

const AI_TOOL_DISPLAY_NAMES = {
  'claude-desktop': 'Claude Desktop',
  cursor: 'Cursor',
  'claude-code': 'Claude Code',
  cowork: 'Claude Cowork',
  other: 'your AI tool',
};

export async function init() {
  const context = await collectAnswers();
  const targetDir = join(process.cwd(), 'pming-workspace');

  let created;
  try {
    created = await createWorkspace(targetDir);
  } catch (err) {
    if (err.code === 'EACCES' || err.code === 'EPERM') {
      console.error(`Couldn't create workspace directory. Check your permissions for ${targetDir}`);
      process.exitCode = 1;
      return;
    }
    throw err;
  }

  if (!created) {
    console.log('Setup cancelled.');
    return;
  }

  const { configFilename } = await generateFiles(targetDir, context);
  const toolName = AI_TOOL_DISPLAY_NAMES[context.aiTool] || 'your AI tool';

  console.log();
  console.log('\u2705 Your workspace is ready!');
  console.log();
  console.log('\uD83D\uDCC1 Created:');
  console.log(`   ${configFilename.padEnd(19)}\u2014 Your AI assistant's operating manual`);
  console.log('   USER.md            \u2014 Your profile');
  console.log('   context/product.md \u2014 Your product context');
  console.log('   context/projects/  \u2014 Your current project');
  console.log('   skills/            \u2014 6 PM skills ready to use');
  console.log('   references/        \u2014 PM Codex (your principles playbook)');
  console.log('   memory/            \u2014 Where context compounds over time');
  console.log('   templates/         \u2014 Starting points for new files');
  console.log();
  console.log('\uD83D\uDE80 What to do next:');
  console.log();
  console.log(`   Open this folder in ${toolName} and start a conversation.`);
  console.log('   Try one of these:');
  console.log();
  console.log('   "Tell me what you know about me and my product"');
  console.log('   "Prep me for a meeting with my VP tomorrow"');
  console.log('   "I just made a decision I want to log"');
  console.log();

  if (context.aiTool === 'claude-desktop') {
    console.log(
      "   Tip: In Claude Desktop, click 'Add to project' and select your pming-workspace folder.",
    );
    console.log();
  } else if (context.aiTool === 'cursor') {
    console.log(
      "   Tip: Open the pming-workspace folder in Cursor \u2014 it'll pick up .cursorrules automatically.",
    );
    console.log();
  } else if (context.aiTool === 'cowork') {
    console.log(
      '   Tip: Open the pming-workspace folder in Cowork and start a conversation.',
    );
    console.log();
  }

  console.log('   The more you use it, the smarter it gets. See you in there.');
}
