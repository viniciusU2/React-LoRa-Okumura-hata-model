/*
  Warnings:

  - You are about to alter the column `lat` on the `reserver` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `lng` on the `reserver` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.

*/
-- AlterTable
ALTER TABLE `reserver` MODIFY `lat` DOUBLE NOT NULL,
    MODIFY `lng` DOUBLE NOT NULL;
