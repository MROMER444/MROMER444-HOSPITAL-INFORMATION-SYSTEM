/*
  Warnings:

  - You are about to alter the column `quantity` on the `Inventory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `price` on the `Inventory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `total` on the `Inventory` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Inventory` MODIFY `quantity` INTEGER NOT NULL,
    MODIFY `price` INTEGER NOT NULL,
    MODIFY `total` INTEGER NOT NULL;
