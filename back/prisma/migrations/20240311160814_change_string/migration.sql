/*
  Warnings:

  - You are about to alter the column `lat` on the `reserver` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `lng` on the `reserver` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `reserver` MODIFY `lat` VARCHAR(191) NOT NULL,
    MODIFY `lng` VARCHAR(191) NOT NULL;
