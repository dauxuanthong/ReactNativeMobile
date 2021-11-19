-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "bedrooms" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "price" TEXT NOT NULL,
    "furnitureType" TEXT,
    "name" TEXT NOT NULL,
    "note" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
