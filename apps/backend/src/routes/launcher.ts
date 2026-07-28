import { Router, Request, Response } from "express";
import { prisma } from '../db';
import { spawn } from 'child_process';
import path from 'path';
import os from 'os';
import { PLATFORMS } from '../config/platforms';

const router = Router();

const PLATFORM_CORES: Record<string, string> = {};
for (const [key, platform] of Object.entries(PLATFORMS)) {
  PLATFORM_CORES[key] = platform.core;
}

function getRetroArchPath(): string {
  const platform = os.platform();
  if (platform === 'darwin') return '/Applications/RetroArch.app/Contents/MacOS/RetroArch';
  if (platform === 'win32') return 'C:\\RetroArch-Win64\\retroarch.exe';
  return '/usr/bin/retroarch';
}

function getCoresPath(): string {
  const platform = os.platform();
  if (platform === 'darwin') return path.join(os.homedir(), 'Library/Application Support/RetroArch/cores');
  if (platform === 'win32') return 'C:\\RetroArch-Win64\\cores';
  return path.join(os.homedir(), '.config/retroarch/cores');
}

router.post("/:id/launch", async (req: Request, res: Response) => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const gameId = parseInt(rawId, 10);

  if (isNaN(gameId)) {
    res.status(400).json({ error: "invalid game id" });
    return;
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
  });

  if (!game) {
    res.status(404).json({ error: "game not found" });
    return;
  }

  const core = PLATFORM_CORES[game.platform];

  if (!core) {
    res.status(400).json({ error: `no core configured for platform ${game.platform}` });
    return;
  }

  const coreExt = os.platform() === 'win32' ? '.dll' : '.dylib';
  const retroarchPath = getRetroArchPath();
  const corePath = path.join(getCoresPath(), `${core}_libretro${coreExt}`);

  spawn(retroarchPath, ['-L', corePath, game.filePath], {
    detached: true,
    stdio: 'ignore',
  });

  res.json({ status: "launched", game: game.title });
});

export default router;