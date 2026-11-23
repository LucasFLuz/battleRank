import { prisma } from "../config/prisma.js";
import { CreateWorkoutDTO, UpdateWorkoutDTO, Workout } from "../types/workout.js";

export class WorkoutRepository {
  async create(data: CreateWorkoutDTO): Promise<Workout> {
    const created = await prisma.workout.create({
      data: {
        name: data.name,
        goal: data.goal,
        level: data.level,
        modality: data.modality,
        notes: data.notes ?? null,
        scheduleType: data.scheduleType ?? "FLEXIBLE",
        daysOfWeek: data.daysOfWeek ?? [],
        frequency: data.frequency ?? null,
        userId: data.userId,
      },
      include: {
        exercises: {
          orderBy: { order: "asc" },
        },
      },
    });

    return created as Workout;
  }

  async findAllByUser(userId: string): Promise<Workout[]> {
    const workouts = await prisma.workout.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        exercises: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: {
            exercises: true,
            sessions: true,
          },
        },
      },
    });

    return workouts as Workout[];
  }

  async findById(id: string): Promise<Workout | null> {
    const workout = await prisma.workout.findUnique({
      where: { id },
      include: {
        exercises: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: {
            exercises: true,
            sessions: true,
          },
        },
      },
    });

    return (workout as Workout) || null;
  }

  async update(id: string, data: UpdateWorkoutDTO): Promise<Workout> {
    const updated = await prisma.workout.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.goal !== undefined && { goal: data.goal }),
        ...(data.level !== undefined && { level: data.level }),
        ...(data.modality !== undefined && { modality: data.modality }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.scheduleType !== undefined && { scheduleType: data.scheduleType }),
        ...(data.daysOfWeek !== undefined && { daysOfWeek: data.daysOfWeek }),
        ...(data.frequency !== undefined && { frequency: data.frequency }),
      },
      include: {
        exercises: {
          orderBy: { order: "asc" },
        },
        _count: {
          select: {
            exercises: true,
            sessions: true,
          },
        },
      },
    });

    return updated as Workout;
  }

  async delete(id: string): Promise<void> {
    await prisma.workout.delete({
      where: { id },
    });
  }
}
