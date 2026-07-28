import fs from 'fs';
import path from 'path';
import { PLATFORMS } from '../src/config/platforms';

const DAT_DIR = path.join(process.cwd(), 'data/dats');

async function downloadDats() {
  // 1. create DAT_DIR if it doesn't exist
  fs.mkdirSync(DAT_DIR, { recursive: true });

  for (const [key, platform] of Object.entries(PLATFORMS)) {
    if (!platform.datUrl) {
      console.log(`⏭ skipping ${key} - no dat URL`);
      continue;
    }

    const filename = decodeURIComponent(path.basename(platform.datUrl));
    const dest = path.join(DAT_DIR, filename);

    if (fs.existsSync(dest)) {
      console.log(`⏭ already exists: ${filename}`);
      continue;
    }

    console.log(`⬇ downloading: ${filename}`);
    const response = await fetch(platform.datUrl);
    
    if (!response.ok) {
      console.error(`✗ failed: ${filename} (${response.status})`);
      continue;
    }

    const text = await response.text();
    fs.writeFileSync(dest, text, 'utf8');
    console.log(`✓ saved: ${filename}`);
  }

  console.log('\ndone.');
}

downloadDats().catch(console.error);