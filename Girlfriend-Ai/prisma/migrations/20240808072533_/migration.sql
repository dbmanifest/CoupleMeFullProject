/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Bodytype` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Bodytype` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Breastsize` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Breastsize` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Buttsize` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Buttsize` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Clothing` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Ethnicity` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Ethnicity` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Eyecolor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Eyecolor` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Haircolor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Haircolor` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Hairstyle` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Hairstyle` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Hobbies` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Occupation` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Personality` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Personality` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Relationship` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Relationship` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `Style` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Style` table. All the data in the column will be lost.
  - Added the required column `imageSrc` to the `Bodytype` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Bodytype` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSrc` to the `Breastsize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Breastsize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSrc` to the `Buttsize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Buttsize` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Clothing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Ethnicity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `src` to the `Ethnicity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Eyecolor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `src` to the `Eyecolor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Haircolor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `src` to the `Haircolor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Hairstyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `src` to the `Hairstyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Hobbies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Occupation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSrc` to the `Personality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Personality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageSrc` to the `Relationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Relationship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bodytype` DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    ADD COLUMN `imageSrc` VARCHAR(191) NOT NULL,
    ADD COLUMN `label` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Breastsize` DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    ADD COLUMN `imageSrc` VARCHAR(191) NOT NULL,
    ADD COLUMN `label` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Buttsize` DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    ADD COLUMN `imageSrc` VARCHAR(191) NOT NULL,
    ADD COLUMN `label` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Clothing` DROP COLUMN `name`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Ethnicity` DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `src` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Eyecolor` DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `src` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Haircolor` DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `src` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Hairstyle` DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL,
    ADD COLUMN `src` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Hobbies` DROP COLUMN `name`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Occupation` DROP COLUMN `name`,
    ADD COLUMN `label` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Personality` DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    ADD COLUMN `imageSrc` VARCHAR(191) NOT NULL,
    ADD COLUMN `label` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Relationship` DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    ADD COLUMN `imageSrc` VARCHAR(191) NOT NULL,
    ADD COLUMN `label` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Style` DROP COLUMN `imageUrl`,
    DROP COLUMN `name`,
    ADD COLUMN `imgSrc` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `label` VARCHAR(191) NOT NULL DEFAULT '';
