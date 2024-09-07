/*
  Warnings:

  - Added the required column `categoryId` to the `Companion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Companion` ADD COLUMN `categoryId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Companion_categoryId_idx` ON `Companion`(`categoryId`);
