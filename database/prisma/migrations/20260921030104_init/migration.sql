-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('HIPERTROFIA', 'EMAGRECIMENTO', 'RESISTENCIA', 'FORCA');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('INICIANTE', 'INTERMEDIARIO', 'AVANCADO');

-- CreateTable
CREATE TABLE "workouts" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "goal" "Goal" NOT NULL,
    "level" "Level" NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);
