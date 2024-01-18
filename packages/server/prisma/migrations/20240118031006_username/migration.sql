-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "creationDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
