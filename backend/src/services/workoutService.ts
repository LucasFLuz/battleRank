import { WorkoutRepository } from "../repositories/workoutRepository.js";
import { CreateWorkoutDTO, UpdateWorkoutDTO, Workout } from "../types/workout.js";

export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository = new WorkoutRepository()) {}

  async createWorkout(data: CreateWorkoutDTO): Promise<Workout> {
    const sanitizedData: CreateWorkoutDTO = {
      name: data.name.trim(),
      goal: data.goal,
      level: data.level,
      modality: data.modality,
      notes: data.notes?.trim() ? data.notes.trim() : undefined,
      scheduleType: data.scheduleType,
      daysOfWeek: data.daysOfWeek,
      frequency: data.frequency,
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

  async updateWorkout(id: string, data: UpdateWorkoutDTO): Promise<Workout> {
    const workout = await this.workoutRepository.findById(id);
    if (!workout) {
      throw new Error(`Treino com ID ${id} não foi encontrado.`);
    }

    const sanitizedData: UpdateWorkoutDTO = {
      ...(data.name !== undefined && { name: data.name.trim() }),
      ...(data.goal !== undefined && { goal: data.goal }),
      ...(data.level !== undefined && { level: data.level }),
      ...(data.modality !== undefined && { modality: data.modality }),
      ...(data.notes !== undefined && { notes: data.notes?.trim() ? data.notes.trim() : undefined }),
      ...(data.scheduleType !== undefined && { scheduleType: data.scheduleType }),
      ...(data.daysOfWeek !== undefined && { daysOfWeek: data.daysOfWeek }),
      ...(data.frequency !== undefined && { frequency: data.frequency }),
    };

    return await this.workoutRepository.update(id, sanitizedData);
  }

  async deleteWorkout(id: string): Promise<void> {
    const workout = await this.workoutRepository.findById(id);
    if (!workout) {
      throw new Error(`Treino com ID ${id} não foi encontrado.`);
    }

    await this.workoutRepository.delete(id);
  }
}
