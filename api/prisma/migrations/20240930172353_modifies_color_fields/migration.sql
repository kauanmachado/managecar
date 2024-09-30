/*
  Warnings:

  - You are about to drop the column `externalColor` on the `car` table. All the data in the column will be lost.
  - You are about to drop the column `internalColor` on the `car` table. All the data in the column will be lost.
  - Added the required column `color` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car` DROP COLUMN `externalColor`,
    DROP COLUMN `internalColor`,
    ADD COLUMN `color` VARCHAR(191) NOT NULL;
