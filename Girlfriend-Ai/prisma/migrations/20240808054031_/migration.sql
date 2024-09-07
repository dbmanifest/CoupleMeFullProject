/*
  Warnings:

  - Added the required column `value` to the `Bodytype` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Breastsize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Buttsize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Clothing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Ethnicity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Eyecolor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Haircolor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Hairstyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Hobbies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Occupation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Personality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Relationship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bodytype` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Breastsize` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Buttsize` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Clothing` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Ethnicity` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Eyecolor` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Haircolor` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Hairstyle` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Hobbies` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Occupation` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Personality` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Relationship` ADD COLUMN `value` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Style` ADD COLUMN `value` VARCHAR(191) NOT NULL DEFAULT '';
