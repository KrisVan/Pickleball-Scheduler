-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "refreshToken" TEXT
);
INSERT INTO "new_User" ("displayName", "id", "password", "refreshToken", "role", "username") SELECT "displayName", "id", "password", "refreshToken", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_refreshToken_key" ON "User"("refreshToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
