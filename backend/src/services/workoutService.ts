import { WorkoutRepository } from "../repositories/workoutRepository.js";
import { CreateWorkoutDTO, Workout } from "../types/workout.js";

export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository = new WorkoutRepository()) {}

  async createWorkout(data: CreateWorkoutDTO): Promise<Workout> {
    const sanitizedData: CreateWorkoutDTO = {
      name: data.name.trim(),
      goal: data.goal,
      level: data.level,
      notes: data.notes?.trim() ? data.notes.trim() : undefined,
    };

    return await this.workoutRepository.create(sanitizedData);
  }

  async listWorkouts(): Promise<Workout[]> {
    return await this.workoutRepository.findAll();
  }

  async getWorkoutById(id: string): Promise<Workout> {
    const workout = await this.workoutRepository.findById(id);

    if (!workout) {
      throw new Error(`Treino com ID ${id} não foi encontrado.`);
    }

    return workout;
  }
}
