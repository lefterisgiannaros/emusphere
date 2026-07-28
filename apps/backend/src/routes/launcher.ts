import { Router, Request, Response } from "express";
import { prisma } from '../db';
import { spawn } from 'child_process';
import path from 'path';
import os from 'os';
import { PLATFORMS } from '../config/platforms';

const router = Router();

// const PLATFORM_CORES: Record<string, string> = {
//   "GBA": "mgba_libretro",
//   "GBC": "gambatte_libretro",
//   "GB":  "gambatte_libretro",
//   "NDS": "desmume_libretro",
//   "PS1": "pcsx_rearmed_libretro",
//   "N64": "mupen64plus_next_libretro",
// };

const PLATFORM_CORES: Record<string, string> = {};
for (const [key, platform] of Object.entries(PLATFORMS)) {
  for (const ext of platform.extensions) {
    PLATFORM_CORES[ext] = key;
  }
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
  const retroarchPath = '/Applications/RetroArch.app/Contents/MacOS/RetroArch';
  const corePath = path.join(os.homedir(), 'Library/Application Support/RetroArch/cores', `${core}${coreExt}`);

  spawn(retroarchPath, ['-L', corePath, game.filePath], {
    detached: true,
    stdio: 'ignore',
  });

  res.json({ status: "launched", game: game.title });
});

export default router;