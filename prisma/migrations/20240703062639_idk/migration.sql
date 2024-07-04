-- AlterTable
ALTER TABLE `Staff` MODIFY `role` ENUM('Admin', 'Physician', 'Diagnostic', 'Pharmacy', 'Inventory', 'Reception') NOT NULL;
