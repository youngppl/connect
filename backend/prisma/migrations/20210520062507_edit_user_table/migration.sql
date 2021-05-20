/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pronouns` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Pronouns" AS ENUM ('THEY_THEM', 'HE_HIS', 'SHE_HER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "pronouns" "Pronouns" NOT NULL;
