-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sku" TEXT NOT NULL,
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

-- CreateTable
CREATE TABLE "GameSession" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME,
    CONSTRAINT "GameSession_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "retroAchievementsUsername" TEXT,
    "retroAchievementsApiKey" TEXT,
    "romDirectories" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "Emulator" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "executablePath" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_filePath_key" ON "Game"("filePath");
