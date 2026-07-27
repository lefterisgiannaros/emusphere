import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { prisma } from "../db";
import { Platform } from "../generated/prisma/client";

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
    await prisma.game.create({
      data: {
        sku: baseName,
        title: baseName,
        platform,
        filePath,
      },
    });
    added++;
  }

  res.json({
    found: romFiles.length,
    added,
    skipped,
  });
});

export default router;
