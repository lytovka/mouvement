-- CreateTable
CREATE TABLE "StyleImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "altText" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "styleId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "StyleImage_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES "Style" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "StyleImage_styleId_key" ON "StyleImage"("styleId");

-- CreateIndex
CREATE INDEX "StyleImage_styleId_idx" ON "StyleImage"("styleId");
