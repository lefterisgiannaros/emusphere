import path from 'path';
import { downloadFile } from './utils';

const RETROARCH_DIR = path.join(process.cwd(), 'data/retroarch');

const RETROARCH_URLS: Record<string, string> = {
  darwin: 'https://buildbot.libretro.com/stable/1.9.0/apple/osx/universal/RetroArch_Metal.dmg',
  win32: 'https://buildbot.libretro.com/stable/1.22.2/windows/x86_64/RetroArch-Win64-setup.exe',
  linux: 'https://buildbot.libretro.com/stable/1.22.2/linux/x86_64/RetroArch.tar.gz',
};

export async function downloadRetroarch() {
  for (const [platform, url] of Object.entries(RETROARCH_URLS)) {
    const filename = path.basename(url);
    const dest = path.join(RETROARCH_DIR, platform, filename);
    await downloadFile(url, dest);
  }

  console.log('\nretroarch done.');
}