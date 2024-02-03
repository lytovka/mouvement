/*
  Warnings:

  - The primary key for the `StyleImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Style` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Movement` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MovementImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "altText" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "movementId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MovementImage_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MovementImage" ("altText", "blob", "contentType", "createdAt", "id", "movementId", "updatedAt") SELECT "altText", "blob", "contentType", "createdAt", "id", "movementId", "updatedAt" FROM "MovementImage";
DROP TABLE "MovementImage";
ALTER TABLE "new_MovementImage" RENAME TO "MovementImage";
CREATE INDEX "MovementImage_movementId_idx" ON "MovementImage"("movementId");
CREATE TABLE "new_StyleImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "styleId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StyleImage_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "Style" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_StyleImage" ("altText", "blob", "contentType", "createdAt", "id", "styleId", "updatedAt") SELECT "altText", "blob", "contentType", "createdAt", "id", "styleId", "updatedAt" FROM "StyleImage";
DROP TABLE "StyleImage";
ALTER TABLE "new_StyleImage" RENAME TO "StyleImage";
CREATE UNIQUE INDEX "StyleImage_styleId_key" ON "StyleImage"("styleId");
CREATE INDEX "StyleImage_styleId_idx" ON "StyleImage"("styleId");
CREATE TABLE "new_Style" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_Style" ("id", "name", "slug") SELECT "id", "name", "slug" FROM "Style";
DROP TABLE "Style";
ALTER TABLE "new_Style" RENAME TO "Style";
CREATE UNIQUE INDEX "Style_name_key" ON "Style"("name");
CREATE UNIQUE INDEX "Style_slug_key" ON "Style"("slug");
CREATE TABLE "new_Movement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "styleId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Movement_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "Style" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Movement" ("content", "createdAt", "id", "name", "styleId", "updatedAt") SELECT "content", "createdAt", "id", "name", "styleId", "updatedAt" FROM "Movement";
DROP TABLE "Movement";
ALTER TABLE "new_Movement" RENAME TO "Movement";
CREATE UNIQUE INDEX "Movement_styleId_key" ON "Movement"("styleId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
