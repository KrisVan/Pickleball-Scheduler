-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT NOT NULL DEFAULT 'DARK',
    "color" TEXT NOT NULL DEFAULT '#4caf50',
    "username" TEXT NOT NULL,
    CONSTRAINT "Setting_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Setting" ("color", "id", "theme", "username") SELECT "color", "id", "theme", "username" FROM "Setting";
DROP TABLE "Setting";
ALTER TABLE "new_Setting" RENAME TO "Setting";
CREATE UNIQUE INDEX "Setting_username_key" ON "Setting"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
