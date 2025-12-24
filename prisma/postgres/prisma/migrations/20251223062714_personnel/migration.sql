-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'ENGINEER', 'OPERATOR', 'DATA_SCIENTIST');

-- CreateEnum
CREATE TYPE "ToolStatus" AS ENUM ('IDLE', 'RUNNING', 'MAINTENANCE', 'ERROR');

-- CreateEnum
CREATE TYPE "WaferStatus" AS ENUM ('CREATED', 'PROCESSING', 'HOLD', 'COMPLETED', 'SCRAPPED');

-- CreateEnum
CREATE TYPE "ObjectType" AS ENUM ('FAB', 'TOOL', 'WAFER_LOT', 'WAFER', 'PROCESS_STEP', 'USER', 'AI_MODEL', 'SENSOR_STREAM', 'EXTERNAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fab" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "fabId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "status" "ToolStatus" NOT NULL,
    "installedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaferLot" (
    "id" TEXT NOT NULL,
    "fabId" TEXT NOT NULL,
    "lotNumber" TEXT NOT NULL,
    "status" "WaferStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaferLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wafer" (
    "id" TEXT NOT NULL,
    "waferLotId" TEXT NOT NULL,
    "serial" TEXT NOT NULL,
    "currentStep" TEXT,

    CONSTRAINT "Wafer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProcessStep" (
    "id" TEXT NOT NULL,
    "toolId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "parameters" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProcessStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ObjectRegistry" (
    "id" TEXT NOT NULL,
    "objectType" "ObjectType" NOT NULL,
    "objectId" TEXT NOT NULL,
    "displayName" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ObjectRegistry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "objectRegistryId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WaferLot_lotNumber_key" ON "WaferLot"("lotNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ObjectRegistry_objectType_objectId_key" ON "ObjectRegistry"("objectType", "objectId");

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_fabId_fkey" FOREIGN KEY ("fabId") REFERENCES "Fab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaferLot" ADD CONSTRAINT "WaferLot_fabId_fkey" FOREIGN KEY ("fabId") REFERENCES "Fab"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wafer" ADD CONSTRAINT "Wafer_waferLotId_fkey" FOREIGN KEY ("waferLotId") REFERENCES "WaferLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProcessStep" ADD CONSTRAINT "ProcessStep_toolId_fkey" FOREIGN KEY ("toolId") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_objectRegistryId_fkey" FOREIGN KEY ("objectRegistryId") REFERENCES "ObjectRegistry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
