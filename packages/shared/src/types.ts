export interface Game {
    id: number;
    title: string;
    platform: string;
    filePath: string;
    coverImagePath: string | null;
    sku: string | null;
    isInBacklog: boolean;
    retroAchievementsId: string | null;
    emulatorId: number | null;
    createdAt: string;
  }