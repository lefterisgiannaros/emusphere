import fs from 'fs';
import path from 'path';
import os from 'os';
import extract from 'extract-zip';

function getRetroArchCoresPath(): string {
  const platform = os.platform();
  
  if (platform === 'darwin') {
    return path.join(os.homedir(), 'Library/Application Support/RetroArch/cores');
  } else if (platform === 'win32') {
    return path.join('C:\\RetroArch-Win64\\cores');
  } else {
    return path.join(os.homedir(), '.config/retroarch/cores');
  }
}

export async function installCores(): Promise<void> {
  const platform = os.platform();
  const coresSource = path.join(process.cwd(), 'data/cores', platform);
  const coresDest = getRetroArchCoresPath();

  if (!fs.existsSync(coresSource)) {
    console.log('No bundled cores found. Run setup script first.');
    return;
  }

  fs.mkdirSync(coresDest, { recursive: true });

  const zips = fs.readdirSync(coresSource).filter(f => f.endsWith('.zip'));

  for (const zip of zips) {
    const coreName = zip.replace('.zip', '');
    const destFile = path.join(coresDest, coreName);

    if (fs.existsSync(destFile)) {
      console.log(`⏭ already installed: ${coreName}`);
      continue;
    }

    console.log(`⬇ installing: ${coreName}`);
    await extract(path.join(coresSource, zip), { dir: coresDest });
    console.log(`✓ installed: ${coreName}`);
  }

  console.log('Core installation complete.');
}