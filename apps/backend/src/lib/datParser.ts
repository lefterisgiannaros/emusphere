import fs from 'fs';

interface DatEntry {
  title: string;
  serial: string | null;
}

const cache: Record<string, Record<string, DatEntry>> = {};

export function parseDat(filePath: string): Record<string, DatEntry> {
  if (cache[filePath]) return cache[filePath];

  const gameBlocks = fs.readFileSync(filePath, 'utf8').split('game (');
  const map: Record<string, DatEntry> = {};

  for (const gameBlock of gameBlocks) {
    const nameMatch = gameBlock.match(/name "([^"]+)"/);
    const crcMatch = gameBlock.match(/\bcrc\s+([0-9A-Fa-f]{8})\b/);
    const serialMatch = gameBlock.match(/serial "([^"]+)"/);

    if (nameMatch && crcMatch) {
      map[crcMatch[1].toUpperCase()] = {
        title: nameMatch[1],
        serial: serialMatch ? serialMatch[1] : null,
      };
    }
  }

  cache[filePath] = map;
  return map;
}