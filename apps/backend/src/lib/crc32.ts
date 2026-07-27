import fs from 'fs';
import CRC32 from 'crc-32';

export function hashFile(filePath: string): string {
    const buffer = fs.readFileSync(filePath);
    const result = CRC32.buf(buffer);
    return (result >>> 0).toString(16).toUpperCase().padStart(8, '0');
  }