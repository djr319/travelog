/*
  Warnings:

  - You are about to drop the column `userId` on the `Journal` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Plan` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `uid` to the `Journal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Journal" DROP CONSTRAINT "Journal_userId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_userId_fkey";

-- DropIndex
DROP INDEX "User_password_key";

-- AlterTable
ALTER TABLE "Journal" DROP COLUMN "userId",
ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "userId",
ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "userId",
ADD COLUMN     "uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "password",
ADD COLUMN     "photoURL" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "uid" TEXT NOT NULL,
ALTER COLUMN "firstName" SET DEFAULT E'',
ALTER COLUMN "lastName" SET DEFAULT E'',
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("uid");

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
