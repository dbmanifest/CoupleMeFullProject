-- AlterTable
ALTER TABLE `Wallet` ADD COLUMN `trialMessages` INTEGER NOT NULL DEFAULT 5;

-- CreateIndex
CREATE FULLTEXT INDEX `Companion_description_idx` ON `Companion`(`description`);

-- CreateIndex
CREATE FULLTEXT INDEX `Companion_instructions_idx` ON `Companion`(`instructions`);
