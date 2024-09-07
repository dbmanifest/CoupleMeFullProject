/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Companion` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Companion_categoryId_idx` ON `Companion`;

-- AlterTable
ALTER TABLE `Companion` DROP COLUMN `categoryId`,
    MODIFY `age` VARCHAR(191) NOT NULL;
