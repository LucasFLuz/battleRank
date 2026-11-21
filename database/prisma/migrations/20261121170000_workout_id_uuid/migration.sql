ALTER TABLE "workouts"
ALTER COLUMN "id" TYPE UUID USING "id"::uuid;
