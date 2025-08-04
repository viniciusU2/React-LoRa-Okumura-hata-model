-- CreateTable
CREATE TABLE `LoraData` (
    `id` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `rssi` DOUBLE NOT NULL,
    `snr` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
