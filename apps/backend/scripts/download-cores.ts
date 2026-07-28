import path from 'path';
import os from 'os';
import { PLATFORMS } from '../src/config/platforms';
import { downloadFile } from './utils';

const CORES_DIR = path.join(process.cwd(), 'data/cores');

const CORE_BASE_URLS: Record<string, string> = {
  darwin: os.arch() === 'arm64' 
    ? 'https://buildbot.libretro.com/nightly/apple/osx/arm64/latest'
    : 'https://buildbot.libretro.com/nightly/apple/osx/x86_64/latest',
  win32: 'https://buildbot.libretro.com/nightly/windows/x86_64/latest',
  linux: 'https://buildbot.libretro.com/nightly/linux/x86_64/latest',
};

const CORE_EXTENSIONS: Record<string, string> = {
  darwin: '.dylib',
  win32: '.dll',
  linux: '.so',
};

export async function downloadCores() {
  const coresToDownload = new Set<string>();
  for (const platform of Object.values(PLATFORMS)) {
    coresToDownload.add(platform.core);
  }

  for (const [osPlatform, baseUrl] of Object.entries(CORE_BASE_URLS)) {
    const ext = CORE_EXTENSIONS[osPlatform];
    console.log('Downloading cores from:', CORE_BASE_URLS[osPlatform]);
    for (const core of coresToDownload) {
      const filename = `${core}_libretro${ext}.zip`;
      const url = `${baseUrl}/${filename}`;
      const dest = path.join(CORES_DIR, osPlatform, filename);
      await downloadFile(url, dest);
    }
  }

  console.log('\ncores done.');
}