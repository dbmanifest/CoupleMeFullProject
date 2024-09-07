-- AlterTable
ALTER TABLE `Companion` MODIFY `src` LONGTEXT NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `Companion_baseImageOne_idx` ON `Companion`(`baseImageOne`);

-- CreateIndex
CREATE FULLTEXT INDEX `Companion_src_idx` ON `Companion`(`src`);
