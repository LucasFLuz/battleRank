import { api } from "./api";
import { CreateWorkoutFormData, Workout } from "../types/workout";

export const workoutService = {
  async getWorkouts(): Promise<Workout[]> {
    const response = await api.get<Workout[]>("/workouts");
    return response.data;
  },

  async createWorkout(data: CreateWorkoutFormData): Promise<Workout> {
    const response = await api.post<Workout>("/workouts", data);
    return response.data;
  },
};
