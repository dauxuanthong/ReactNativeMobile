-- DropForeignKey
ALTER TABLE "AddNote" DROP CONSTRAINT "AddNote_userId_fkey";

-- AddForeignKey
ALTER TABLE "AddNote" ADD CONSTRAINT "AddNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
