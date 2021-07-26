/*
  Warnings:

  - A unique constraint covering the columns `[channel]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channel` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "channel" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "text" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Conversation.channel_unique" ON "Conversation"("channel");
