-- DropForeignKey
ALTER TABLE `Queue` DROP FOREIGN KEY `Queue_patientId_fkey`;

-- AddForeignKey
ALTER TABLE `Queue` ADD CONSTRAINT `Queue_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
