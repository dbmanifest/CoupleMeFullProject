-- CreateTable
CREATE TABLE `LibraryItem` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `base64_string` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `LibraryItem_userId_key`(`userId`),
    INDEX `LibraryItem_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
