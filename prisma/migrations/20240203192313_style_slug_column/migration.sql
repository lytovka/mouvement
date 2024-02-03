/*
  Warnings:

  - Added the required column `slug` to the `Style` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Style" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_Style" ("id", "name") SELECT "id", "name" FROM "Style";
DROP TABLE "Style";
ALTER TABLE "new_Style" RENAME TO "Style";
CREATE UNIQUE INDEX "Style_name_key" ON "Style"("name");
CREATE UNIQUE INDEX "Style_slug_key" ON "Style"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
