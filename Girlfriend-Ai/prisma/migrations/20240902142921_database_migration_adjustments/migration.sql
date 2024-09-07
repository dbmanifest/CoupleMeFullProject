/*
  Warnings:

  - You are about to drop the column `companionId` on the `Bodytype` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Breastsize` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Buttsize` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Clothing` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Ethnicity` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Eyecolor` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Haircolor` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Hairstyle` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Hobbies` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Occupation` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Personality` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Relationship` table. All the data in the column will be lost.
  - You are about to drop the column `companionId` on the `Style` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Bodytype_companionId_key` ON `Bodytype`;

-- DropIndex
DROP INDEX `Breastsize_companionId_key` ON `Breastsize`;

-- DropIndex
DROP INDEX `Buttsize_companionId_key` ON `Buttsize`;

-- DropIndex
DROP INDEX `Clothing_companionId_key` ON `Clothing`;

-- DropIndex
DROP INDEX `Ethnicity_companionId_key` ON `Ethnicity`;

-- DropIndex
DROP INDEX `Eyecolor_companionId_key` ON `Eyecolor`;

-- DropIndex
DROP INDEX `Haircolor_companionId_key` ON `Haircolor`;

-- DropIndex
DROP INDEX `Hairstyle_companionId_key` ON `Hairstyle`;

-- DropIndex
DROP INDEX `Hobbies_companionId_key` ON `Hobbies`;

-- DropIndex
DROP INDEX `Occupation_companionId_key` ON `Occupation`;

-- DropIndex
DROP INDEX `Personality_companionId_key` ON `Personality`;

-- DropIndex
DROP INDEX `Relationship_companionId_key` ON `Relationship`;

-- DropIndex
DROP INDEX `Style_companionId_key` ON `Style`;

-- AlterTable
ALTER TABLE `Bodytype` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Breastsize` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Buttsize` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Clothing` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Ethnicity` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Eyecolor` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Haircolor` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Hairstyle` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Hobbies` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Occupation` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Personality` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Relationship` DROP COLUMN `companionId`;

-- AlterTable
ALTER TABLE `Style` DROP COLUMN `companionId`;
