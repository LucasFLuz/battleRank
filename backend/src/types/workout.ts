export type WorkoutGoal = "HIPERTROFIA" | "EMAGRECIMENTO" | "RESISTENCIA" | "FORCA";

export type WorkoutLevel = "INICIANTE" | "INTERMEDIARIO" | "AVANCADO";

export interface Workout {
  id: string;
  name: string;
  goal: WorkoutGoal;
  level: WorkoutLevel;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateWorkoutDTO {
  name: string;
  goal: WorkoutGoal;
  level: WorkoutLevel;
  notes?: string;
}
