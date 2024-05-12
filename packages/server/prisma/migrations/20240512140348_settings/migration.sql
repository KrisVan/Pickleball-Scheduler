-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "refreshToken" TEXT
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "username" TEXT NOT NULL,
    CONSTRAINT "Session_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT NOT NULL DEFAULT 'dark',
    "color" TEXT NOT NULL DEFAULT '5e8550',
    "username" TEXT NOT NULL,
    CONSTRAINT "Setting_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_refreshToken_key" ON "User"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Setting_username_key" ON "Setting"("username");
