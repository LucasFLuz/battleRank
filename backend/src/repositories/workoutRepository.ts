import { prisma } from "../config/prisma.js";
import { CreateWorkoutDTO, Workout } from "../types/workout.js";

export class WorkoutRepository {
  async create(data: CreateWorkoutDTO): Promise<Workout> {
    const created = await prisma.workout.create({
      data: {
        name: data.name,
        goal: data.goal,
        level: data.level,
        notes: data.notes ?? null,
      },
    });

    return {
      id: created.id,
      name: created.name,
      goal: created.goal,
      level: created.level,
      notes: created.notes,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  async findAll(): Promise<Workout[]> {
    const workouts = await prisma.workout.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return workouts.map((w) => ({
      id: w.id,
      name: w.name,
      goal: w.goal,
      level: w.level,
      notes: w.notes,
      createdAt: w.createdAt,
      updatedAt: w.updatedAt,
    }));
  }

  async findById(id: string): Promise<Workout | null> {
    const workout = await prisma.workout.findUnique({
      where: { id },
    });

    if (!workout) {
      return null;
    }

    return {
      id: workout.id,
      name: workout.name,
      goal: workout.goal,
      level: workout.level,
      notes: workout.notes,
      createdAt: workout.createdAt,
      updatedAt: workout.updatedAt,
    };
  }
}
