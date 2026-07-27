import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { prisma } from "../db";
import { Platform } from "../generated/prisma/client";
import { parseDat } from "../lib/datParser"
import { hashFile } from "../lib/crc32";
const DAT_DIR = path.join(__dirname, '../../data/dats');

const router = Router();

const ROM_EXTENSIONS: Record<string, Platform> = {
  ".chd": "PS1",
  ".iso": "PS1",
  ".n64": "N64",
  ".z64": "N64",
  ".gb": "GAMEBOY",
  ".nds": "NDS",
  ".sfc": "SNES",
  ".smc": "SNES",
  ".gbc": "GBC",
  ".gba": "GBA",
};

const PLATFORM_DAT: Record<string, string> = {
  "GBA": path.join(DAT_DIR, "Nintendo - Game Boy Advance.dat"),
  "GBC": path.join(DAT_DIR, "Nintendo - Game Boy Color.dat"),
  "GB":  path.join(DAT_DIR, "Nintendo - Game Boy.dat"),
  "NDS": path.join(DAT_DIR, "Nintendo - Nintendo DS.dat"),
  "PS1": path.join(DAT_DIR, "Sony - PlayStation.dat"),
};

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
    const newGame = await prisma.game.create({
      data: {
        sku: null,
        title: cleanName,
        platform,
        filePath,
      },
    });
    
    // hash the ROM file
    const hash = hashFile(filePath);
    
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


export default router;
