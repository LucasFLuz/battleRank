import { ExerciseRepository } from "../repositories/exerciseRepository.js";
import { WorkoutRepository } from "../repositories/workoutRepository.js";
import { CreateExerciseDTO, Exercise, UpdateExerciseDTO } from "../types/exercise.js";

export class ExerciseService {
  constructor(
    private readonly exerciseRepository: ExerciseRepository = new ExerciseRepository(),
    private readonly workoutRepository: WorkoutRepository = new WorkoutRepository()
  ) {}

  private async verifyWorkoutOwnership(workoutId: string, userId: string): Promise<void> {
    const workout = await this.workoutRepository.findById(workoutId);
    if (!workout) {
      const err = new Error(`Treino com ID ${workoutId} não foi encontrado.`);
      (err as unknown as { statusCode: number }).statusCode = 404;
      throw err;
    }

    if (workout.userId !== userId) {
      const err = new Error("Acesso negado.");
      (err as unknown as { statusCode: number }).statusCode = 403;
      throw err;
    }
  }

  async createExercise(workoutId: string, userId: string, data: CreateExerciseDTO): Promise<Exercise> {
    await this.verifyWorkoutOwnership(workoutId, userId);

    const workout = await this.workoutRepository.findById(workoutId);
    // workout is guaranteed to exist after verifyWorkoutOwnership

    const exerciseData: CreateExerciseDTO = {
      ...data,
      modality: data.modality || workout!.modality,
    };

    return await this.exerciseRepository.create(workoutId, exerciseData);
  }

  async listExercisesByWorkout(workoutId: string, userId: string): Promise<Exercise[]> {
    await this.verifyWorkoutOwnership(workoutId, userId);

    return await this.exerciseRepository.findByWorkoutId(workoutId);
  }

  async updateExercise(id: string, userId: string, data: UpdateExerciseDTO): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findById(id);
    if (!exercise) {
      const err = new Error(`Exercício com ID ${id} não foi encontrado.`);
      (err as unknown as { statusCode: number }).statusCode = 404;
      throw err;
    }

    // Verify ownership through the workout
    await this.verifyWorkoutOwnership(exercise.workoutId, userId);

    return await this.exerciseRepository.update(id, data);
  }

  async deleteExercise(id: string, userId: string): Promise<void> {
    const exercise = await this.exerciseRepository.findById(id);
    if (!exercise) {
      const err = new Error(`Exercício com ID ${id} não foi encontrado.`);
      (err as unknown as { statusCode: number }).statusCode = 404;
      throw err;
    }

    // Verify ownership through the workout
    await this.verifyWorkoutOwnership(exercise.workoutId, userId);

    await this.exerciseRepository.delete(id);
  }
}
