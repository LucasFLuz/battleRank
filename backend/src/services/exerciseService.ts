import { ExerciseRepository } from "../repositories/exerciseRepository.js";
import { WorkoutRepository } from "../repositories/workoutRepository.js";
import { CreateExerciseDTO, Exercise, UpdateExerciseDTO } from "../types/exercise.js";

export class ExerciseService {
  constructor(
    private readonly exerciseRepository: ExerciseRepository = new ExerciseRepository(),
    private readonly workoutRepository: WorkoutRepository = new WorkoutRepository()
  ) {}

  async createExercise(workoutId: string, data: CreateExerciseDTO): Promise<Exercise> {
    const workout = await this.workoutRepository.findById(workoutId);
    if (!workout) {
      const err = new Error(`Treino com ID ${workoutId} não foi encontrado.`);
      (err as unknown as { statusCode: number }).statusCode = 404;
      throw err;
    }

    const exerciseData: CreateExerciseDTO = {
      ...data,
      modality: data.modality || workout.modality,
    };

    return await this.exerciseRepository.create(workoutId, exerciseData);
  }

  async listExercisesByWorkout(workoutId: string): Promise<Exercise[]> {
    const workout = await this.workoutRepository.findById(workoutId);
    if (!workout) {
      const err = new Error(`Treino com ID ${workoutId} não foi encontrado.`);
      (err as unknown as { statusCode: number }).statusCode = 404;
      throw err;
    }

    return await this.exerciseRepository.findByWorkoutId(workoutId);
  }

  async updateExercise(id: string, data: UpdateExerciseDTO): Promise<Exercise> {
    const exercise = await this.exerciseRepository.findById(id);
    if (!exercise) {
      const err = new Error(`Exercício com ID ${id} não foi encontrado.`);
      (err as unknown as { statusCode: number }).statusCode = 404;
      throw err;
    }

    return await this.exerciseRepository.update(id, data);
  }

  async deleteExercise(id: string): Promise<void> {
    const exercise = await this.exerciseRepository.findById(id);
    if (!exercise) {
      const err = new Error(`Exercício com ID ${id} não foi encontrado.`);
      (err as unknown as { statusCode: number }).statusCode = 404;
      throw err;
    }

    await this.exerciseRepository.delete(id);
  }
}
