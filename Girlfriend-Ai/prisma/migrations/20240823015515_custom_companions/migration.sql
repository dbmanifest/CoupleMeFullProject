/*
  Warnings:

  - A unique constraint covering the columns `[companionId]` on the table `Bodytype` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Breastsize` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Buttsize` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Clothing` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Ethnicity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Eyecolor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Haircolor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Hairstyle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Hobbies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Occupation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Personality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Relationship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companionId]` on the table `Style` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `baseImageFour` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseImageOne` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseImageThree` to the `Companion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseImageTwo` to the `Companion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bodytype` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Breastsize` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Buttsize` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Clothing` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Companion` ADD COLUMN `baseImageFour` VARCHAR(191) NOT NULL,
    ADD COLUMN `baseImageOne` VARCHAR(191) NOT NULL,
    ADD COLUMN `baseImageThree` VARCHAR(191) NOT NULL,
    ADD COLUMN `baseImageTwo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Ethnicity` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Eyecolor` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Haircolor` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Hairstyle` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Hobbies` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Occupation` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Personality` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Relationship` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Style` ADD COLUMN `companionId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Bodytype_companionId_key` ON `Bodytype`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Breastsize_companionId_key` ON `Breastsize`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Buttsize_companionId_key` ON `Buttsize`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Clothing_companionId_key` ON `Clothing`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Ethnicity_companionId_key` ON `Ethnicity`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Eyecolor_companionId_key` ON `Eyecolor`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Haircolor_companionId_key` ON `Haircolor`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Hairstyle_companionId_key` ON `Hairstyle`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Hobbies_companionId_key` ON `Hobbies`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Occupation_companionId_key` ON `Occupation`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Personality_companionId_key` ON `Personality`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Relationship_companionId_key` ON `Relationship`(`companionId`);

-- CreateIndex
CREATE UNIQUE INDEX `Style_companionId_key` ON `Style`(`companionId`);
