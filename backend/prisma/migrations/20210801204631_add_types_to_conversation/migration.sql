-- CreateEnum
CREATE TYPE "ConversationType" AS ENUM ('DEEP', 'LIGHT', 'SMALL');

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "type" "ConversationType";
