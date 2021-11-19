-- CreateTable
CREATE TABLE "AddNote" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "propertyTypeNote" TEXT NOT NULL,
    "bedroomsNote" TEXT NOT NULL,
    "furnitureTypeNote" TEXT NOT NULL,

    CONSTRAINT "AddNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AddNote_userId_key" ON "AddNote"("userId");

-- AddForeignKey
ALTER TABLE "AddNote" ADD CONSTRAINT "AddNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
