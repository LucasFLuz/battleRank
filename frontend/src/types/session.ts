import { Modality } from "./exercise";

export interface ExerciseLog {
  id: string;
  sessionId: string;
  exerciseId: string;
  setNumber: number;
  weight: number;
  repetitions: number;
  isCompleted: boolean;
  isPersonalRecord: boolean;
  createdAt: string;
  exercise?: {
    id: string;
    name: string;
    modality: Modality;
  };
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  startedAt: string;
  endedAt?: string | null;
  durationSeconds?: number | null;
  totalVolume: number;
  notes?: string | null;
  createdAt: string;
  logs?: ExerciseLog[];
  workout?: {
    id: string;
    name: string;
    goal: string;
    level: string;
  };
}

export interface LogItemPayload {
  exerciseId: string;
  setNumber: number;
  weight: number;
  repetitions: number;
  isCompleted: boolean;
}

export interface SaveSessionPayload {
  startedAt?: string;
  endedAt?: string;
  durationSeconds: number;
  notes?: string | null;
  logs: LogItemPayload[];
}
