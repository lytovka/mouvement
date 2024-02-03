/*
  Warnings:

  - The primary key for the `MovementImage` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MovementImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
