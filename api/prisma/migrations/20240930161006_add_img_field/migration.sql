/*
  Warnings:

  - Added the required column `img` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car` ADD COLUMN `img` VARCHAR(191) NOT NULL;
