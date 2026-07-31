import { Router, Request, Response } from 'express';
import { prisma } from '../db';

const router = Router();

// GET /settings
router.get('/', async (req: Request, res: Response) => {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 }
    });
    
    res.json(settings ?? {});
  });

// PUT /settings  
router.put('/', async (req: Request, res: Response) => {
    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      create: { id: 1, ...req.body },
      update: { ...req.body },
    });
    
    res.json(settings);
  });

export default router;