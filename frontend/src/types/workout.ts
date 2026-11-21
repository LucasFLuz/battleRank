export type WorkoutGoal =
  | "HIPERTROFIA"
  | "EMAGRECIMENTO"
  | "RESISTENCIA"
  | "FORCA";

export type WorkoutLevel =
  | "INICIANTE"
  | "INTERMEDIARIO"
  | "AVANCADO";

export interface Workout {
  id: string;
  name: string;
  goal: WorkoutGoal;
  level: WorkoutLevel;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWorkoutFormData {
  name: string;
  goal: WorkoutGoal;
  level: WorkoutLevel;
  notes?: string;
}

export const GOAL_LABELS: Record<WorkoutGoal, string> = {
  HIPERTROFIA: "Hipertrofia",
  EMAGRECIMENTO: "Emagrecimento",
  RESISTENCIA: "Resistência",
  FORCA: "Força",
};

export const LEVEL_LABELS: Record<WorkoutLevel, string> = {
  INICIANTE: "Iniciante",
  INTERMEDIARIO: "Intermediário",
  AVANCADO: "Avançado",
};
