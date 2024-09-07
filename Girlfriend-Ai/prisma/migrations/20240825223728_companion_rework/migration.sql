/*
  Warnings:

  - You are about to drop the column `baseImageFour` on the `Companion` table. All the data in the column will be lost.
  - You are about to drop the column `baseImageThree` on the `Companion` table. All the data in the column will be lost.
  - You are about to drop the column `baseImageTwo` on the `Companion` table. All the data in the column will be lost.
  - Added the required column `baseImagePrompt` to the `Companion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Companion` DROP COLUMN `baseImageFour`,
    DROP COLUMN `baseImageThree`,
    DROP COLUMN `baseImageTwo`,
    ADD COLUMN `baseImagePrompt` VARCHAR(191) NOT NULL;
