import path from 'path';
import { PLATFORMS } from '../src/config/platforms';
import { downloadFile } from './utils';

const DAT_DIR = path.join(process.cwd(), 'data/dats');

export async function downloadDats() {
  for (const [key, platform] of Object.entries(PLATFORMS)) {
    if (!platform.datUrl) {
      console.log(`⏭ skipping ${key} - no dat URL`);
      continue;
    }

    const filename = decodeURIComponent(path.basename(platform.datUrl));
    const dest = path.join(DAT_DIR, filename);
    await downloadFile(platform.datUrl, dest);
  }

  console.log('\ndats done.');
}