-- DropIndex
DROP INDEX "Movement_styleId_key";

-- CreateIndex
CREATE INDEX "Movement_styleId_idx" ON "Movement"("styleId");
