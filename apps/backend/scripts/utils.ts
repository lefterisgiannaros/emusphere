import fs from 'fs';
import path from 'path';

export async function downloadFile(url: string, dest: string): Promise<boolean> {
  if (fs.existsSync(dest)) {
    console.log(`⏭ already exists: ${path.basename(dest)}`);
    return false;
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });

  console.log(`⬇ downloading: ${path.basename(dest)}`);
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`✗ failed: ${path.basename(dest)} (${response.status})`);
    return false;
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  console.log(`✓ done: ${path.basename(dest)}`);
  return true;
}