-- AlterTable
ALTER TABLE `Staff` ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT 'pass',
    MODIFY `role` ENUM('Physician', 'Diagnostic', 'Pharmacy', 'Inventory', 'Reception') NOT NULL;
