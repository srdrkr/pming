import Enquirer from 'enquirer';

const enquirer = new Enquirer();

export async function collectAnswers() {
  if (!process.stdin.isTTY) {
    console.error('pming init requires an interactive terminal. Run it directly (not piped).');
    process.exit(1);
  }

  console.log();
  console.log('\u{1F9E0} pming \u2014 your AI PM workspace');
  console.log();
  console.log("Let's set up your workspace. This takes about 5 minutes.");
  console.log();

  try {
    const { name } = await enquirer.prompt({
      type: 'input',
      name: 'name',
      message: "What's your name?",
      validate: (v) => v.trim().length > 0 || 'Name is required',
    });

    const { role } = await enquirer.prompt({
      type: 'input',
      name: 'role',
      message: "What's your role? (e.g., 'Senior PM at Acme Corp')",
      validate: (v) => v.trim().length > 0 || 'Role is required',
    });

    const { aiTool } = await enquirer.prompt({
      type: 'select',
      name: 'aiTool',
      message: 'What AI tool do you primarily use?',
      choices: [
        { name: 'claude-desktop', message: 'Claude Desktop / Claude.ai' },
        { name: 'cursor', message: 'Cursor' },
        { name: 'claude-code', message: 'Claude Code' },
        { name: 'other', message: 'Other (manual setup)' },
      ],
    });

    const { product } = await enquirer.prompt({
      type: 'input',
      name: 'product',
      message:
        "Tell me about your product in a few sentences. (What does it do? Who's it for? What stage is it at?)",
      validate: (v) => v.trim().length > 0 || 'Product description is required',
    });

    const { project } = await enquirer.prompt({
      type: 'input',
      name: 'project',
      message:
        "One specific thing you're working on right now. A feature, a project, an initiative. Just one.",
      validate: (v) => v.trim().length > 0 || 'Project description is required',
    });

    return { name: name.trim(), role: role.trim(), aiTool, product: product.trim(), project: project.trim() };
  } catch {
    console.log();
    console.log('Setup cancelled. Run `pming init` when you\'re ready.');
    process.exit(0);
  }
}
