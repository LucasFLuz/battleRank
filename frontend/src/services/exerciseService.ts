import { api } from "./api";
import { CreateExerciseFormData, Exercise } from "../types/exercise";

export const exerciseService = {
  async getExercisesByWorkout(workoutId: string): Promise<Exercise[]> {
    const response = await api.get<Exercise[]>(`/workouts/${workoutId}/exercises`);
    return response.data;
  },

  async createExercise(workoutId: string, data: CreateExerciseFormData): Promise<Exercise> {
    const response = await api.post<Exercise>(`/workouts/${workoutId}/exercises`, data);
    return response.data;
  },

  async updateExercise(id: string, data: Partial<CreateExerciseFormData>): Promise<Exercise> {
    const response = await api.put<Exercise>(`/exercises/${id}`, data);
    return response.data;
  },

  async deleteExercise(id: string): Promise<void> {
    await api.delete(`/exercises/${id}`);
  },
};
