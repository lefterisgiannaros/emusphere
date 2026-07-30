-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "retroAchievementsUsername" TEXT,
    "retroAchievementsApiKey" TEXT,
    "romDirectories" TEXT NOT NULL DEFAULT '[]',
    "screenScraperUsername" TEXT,
    "screenScraperPassword" TEXT,
    "retroArchPath" TEXT,
    "preferredLanguage" TEXT NOT NULL DEFAULT 'en',
    "preferredRegion" TEXT NOT NULL DEFAULT 'us',
    "artworkType" TEXT NOT NULL DEFAULT 'box-2D'
);
INSERT INTO "new_Settings" ("id", "retroAchievementsApiKey", "retroAchievementsUsername", "romDirectories") SELECT "id", "retroAchievementsApiKey", "retroAchievementsUsername", "romDirectories" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
