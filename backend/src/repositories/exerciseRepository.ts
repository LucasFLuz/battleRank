import { prisma } from "../config/prisma.js";
import { CreateExerciseDTO, Exercise, UpdateExerciseDTO } from "../types/exercise.js";

export class ExerciseRepository {
  async create(workoutId: string, data: CreateExerciseDTO): Promise<Exercise> {
    const nextOrder =
      data.order ??
      ((await prisma.exercise.count({
        where: { workoutId },
      })) + 1);

    const created = await prisma.exercise.create({
      data: {
        workoutId,
        name: data.name,
        modality: data.modality ?? "MUSCULACAO",
        sets: data.sets,
        repetitions: data.repetitions,
        weight: data.weight ?? null,
        restTime: data.restTime ?? null,
        notes: data.notes ?? null,
        order: nextOrder,
      },
    });

    return {
      id: created.id,
      workoutId: created.workoutId,
      name: created.name,
      modality: created.modality,
      sets: created.sets,
      repetitions: created.repetitions,
      weight: created.weight,
      restTime: created.restTime,
      notes: created.notes,
      order: created.order,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    };
  }

  async findByWorkoutId(workoutId: string): Promise<Exercise[]> {
    const exercises = await prisma.exercise.findMany({
      where: { workoutId },
      orderBy: { order: "asc" },
    });

    return exercises.map((e) => ({
      id: e.id,
      workoutId: e.workoutId,
      name: e.name,
      modality: e.modality,
      sets: e.sets,
      repetitions: e.repetitions,
      weight: e.weight,
      restTime: e.restTime,
      notes: e.notes,
      order: e.order,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
    }));
  }

  async findById(id: string): Promise<Exercise | null> {
    const exercise = await prisma.exercise.findUnique({
      where: { id },
    });

    if (!exercise) return null;

    return {
      id: exercise.id,
      workoutId: exercise.workoutId,
      name: exercise.name,
      modality: exercise.modality,
      sets: exercise.sets,
      repetitions: exercise.repetitions,
      weight: exercise.weight,
      restTime: exercise.restTime,
      notes: exercise.notes,
      order: exercise.order,
      createdAt: exercise.createdAt,
      updatedAt: exercise.updatedAt,
    };
  }

  async update(id: string, data: UpdateExerciseDTO): Promise<Exercise> {
    const updated = await prisma.exercise.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.modality !== undefined && { modality: data.modality }),
        ...(data.sets !== undefined && { sets: data.sets }),
        ...(data.repetitions !== undefined && { repetitions: data.repetitions }),
        ...(data.weight !== undefined && { weight: data.weight }),
        ...(data.restTime !== undefined && { restTime: data.restTime }),
        ...(data.notes !== undefined && { notes: data.notes }),
        ...(data.order !== undefined && { order: data.order }),
      },
    });

    return {
      id: updated.id,
      workoutId: updated.workoutId,
      name: updated.name,
      modality: updated.modality,
      sets: updated.sets,
      repetitions: updated.repetitions,
      weight: updated.weight,
      restTime: updated.restTime,
      notes: updated.notes,
      order: updated.order,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.exercise.delete({
      where: { id },
    });
  }
}
