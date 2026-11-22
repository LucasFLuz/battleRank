import { api } from "./api";
import { SaveSessionPayload, WorkoutSession } from "../types/session";

export const sessionService = {
  async saveSession(workoutId: string, payload: SaveSessionPayload): Promise<WorkoutSession> {
    const response = await api.post<WorkoutSession>(`/workouts/${workoutId}/sessions`, payload);
    return response.data;
  },

  async getHistory(): Promise<WorkoutSession[]> {
    const response = await api.get<WorkoutSession[]>("/sessions");
    return response.data;
  },

  async getSessionById(id: string): Promise<WorkoutSession> {
    const response = await api.get<WorkoutSession>(`/sessions/${id}`);
    return response.data;
  },
};
