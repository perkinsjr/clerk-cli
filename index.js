// Run `npm start` to start the demo
import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
} from '@clack/prompts';
import { setTimeout as sleep } from 'node:timers/promises';
import color from 'picocolors';
import { exec } from 'node:child_process';



async function main() {
  intro(color.inverse('Welcome to the Clerk CLI! '));
  const projectType = await select({
    message: 'Pick your starter.',
    options: [
      { value: 'next', label: 'Next.js' },
      { value: 'remix', label: 'Remix' },
      { value: 'expo', label: 'Expo' },
    ],
  });
  if (isCancel(projectType)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  // ask them where they want it?
  // Then install it from.
  const s = spinner();
  s.start('Installing via Github');

  await sleep(3000);
  if (projectType === "next") {
    exec(`git clone https://github.com/clerkinc/clerk-nextjs-starter.git`);
  }

  s.stop('Installed via npm');

  outro("You're all set!");

  await sleep(1000);
}

main().catch(console.error);
