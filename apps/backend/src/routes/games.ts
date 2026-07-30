import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { prisma } from "../db";
import { Platform } from "../generated/prisma/client";
import { parseDat } from "../lib/datParser"
import { hashFile } from "../lib/crc32";
const DAT_DIR = path.join(__dirname, '../../data/dats');
import { PLATFORMS } from '../config/platforms';

const router = Router();

const ROM_EXTENSIONS: Record<string, Platform> = {};
for (const [key, platform] of Object.entries(PLATFORMS)) {
  for (const ext of platform.extensions) {
    if (key in Platform) {
      ROM_EXTENSIONS[ext] = key as Platform;
    }
  }
}

// build PLATFORM_DAT from PLATFORMS  
const PLATFORM_DAT: Record<string, string> = {};
for (const [key, platform] of Object.entries(PLATFORMS)) {
  if (platform.dat) {
    PLATFORM_DAT[key] = path.join(DAT_DIR, platform.dat);
  }
}

router.post("/scan", async (req: Request, res: Response) => {
  const { path: folderPath } = req.body;

  if (!folderPath || typeof folderPath !== "string") {
    res.status(400).json({ error: "path is required" });
    return;
  }

  if (!fs.existsSync(folderPath)) {
    res.status(400).json({ error: 'folder does not exist' });
    return;
  }

  const files = fs.readdirSync(folderPath);
  const romFiles = files.filter((file) => {
    const extension = path.extname(file).toLowerCase();
    return extension in ROM_EXTENSIONS;
  });

  let added = 0;
  let skipped = 0;

  for (const romFile of romFiles) {
    const extension = path.extname(romFile).toLowerCase();
    const platform = ROM_EXTENSIONS[extension];
    const filePath = path.join(folderPath, romFile);

    const existing = await prisma.game.findUnique({
      where: { filePath },
    });

    if (existing) {
      skipped++;
      continue;
    }

    const baseName = path.basename(romFile, extension);
    const cleanName = baseName.replace(/^\d+ - /, '').trim();
    const hash = hashFile(filePath);

    const newGame = await prisma.game.create({
      data: {
        sku: null,
        crc: hash,
        title: cleanName,
        platform,
        filePath,
      },
    });
    
    // get the dat file for this platform
    const datPath = PLATFORM_DAT[platform];
    
    if (datPath) {
      const datMap = parseDat(datPath);
      const entry = datMap[hash];
    
      if (entry) {
        await prisma.game.update({
          where: { id: newGame.id },
          data: {
            title: entry.title,
            sku: entry.serial ?? null,
          },
        });
      }
    }
    
    added++;
  }

  res.json({
    found: romFiles.length,
    added,
    skipped,
  });
});

router.get('/', async (req: Request, res: Response) => {
  const games = await prisma.game.findMany();
  res.json(games);
});

export default router;
