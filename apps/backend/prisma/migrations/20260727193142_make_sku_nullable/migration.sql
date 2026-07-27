-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sku" TEXT,
    "title" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "coverImagePath" TEXT,
    "retroAchievementsId" TEXT,
    "isInBacklog" BOOLEAN NOT NULL DEFAULT false,
    "emulatorId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Game_emulatorId_fkey" FOREIGN KEY ("emulatorId") REFERENCES "Emulator" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Game" ("coverImagePath", "createdAt", "emulatorId", "filePath", "id", "isInBacklog", "platform", "retroAchievementsId", "sku", "title") SELECT "coverImagePath", "createdAt", "emulatorId", "filePath", "id", "isInBacklog", "platform", "retroAchievementsId", "sku", "title" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
CREATE UNIQUE INDEX "Game_filePath_key" ON "Game"("filePath");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
