#!/usr/bin/env node

import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const COMMANDS = ['init', 'update'];

function parseArgs(argv = process.argv.slice(2)) {
  const arg = argv[0];

  if (!arg || arg === '--help' || arg === '-h') {
    return { command: 'help' };
  }

  if (arg === '--version' || arg === '-v') {
    return { command: 'version' };
  }

  if (COMMANDS.includes(arg)) {
    return { command: arg };
  }

  return { command: 'unknown', input: arg };
}

function showHelp() {
  console.log(`
pming v${version} — AI-powered PM workspace scaffold

Usage: pming <command>

Commands:
  init      Create a new PM workspace
  update    Update an existing workspace

Options:
  --help, -h       Show this help message
  --version, -v    Show version number
`.trim());
}

function showVersion() {
  console.log(version);
}

async function run(argv) {
  const { command, input } = parseArgs(argv);

  switch (command) {
    case 'help':
      showHelp();
      break;
    case 'version':
      showVersion();
      break;
    case 'init':
      // TODO: wire up init flow (task 2.5)
      break;
    case 'update':
      console.log('Coming soon — check https://github.com/srdrkr/pming for updates');
      break;
    case 'unknown':
      console.error(`Unknown command: ${input}`);
      console.log();
      showHelp();
      process.exitCode = 1;
      break;
  }
}

export { parseArgs, showHelp, showVersion, run };

if (process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  run();
}
