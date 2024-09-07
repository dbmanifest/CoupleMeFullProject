-- AlterTable
ALTER TABLE `LibraryItem` MODIFY `base64_string` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `Message` MODIFY `content` LONGTEXT NOT NULL;

-- CreateIndex
CREATE FULLTEXT INDEX `LibraryItem_base64_string_idx` ON `LibraryItem`(`base64_string`);

-- CreateIndex
CREATE FULLTEXT INDEX `Message_content_idx` ON `Message`(`content`);
