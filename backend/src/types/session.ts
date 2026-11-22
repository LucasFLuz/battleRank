export interface ExerciseLog {
  id: string;
  sessionId: string;
  exerciseId: string;
  setNumber: number;
  weight: number;
  repetitions: number;
  isCompleted: boolean;
  isPersonalRecord: boolean;
  createdAt: Date;
  exercise?: {
    id: string;
    name: string;
    modality: string;
  };
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  startedAt: Date;
  endedAt?: Date | null;
  durationSeconds?: number | null;
  totalVolume: number;
  notes?: string | null;
  createdAt: Date;
  logs?: ExerciseLog[];
  workout?: {
    id: string;
    name: string;
    goal: string;
    level: string;
  };
}

export interface LogItemDTO {
  exerciseId: string;
  setNumber: number;
  weight: number;
  repetitions: number;
  isCompleted?: boolean;
}

export interface SaveSessionDTO {
  startedAt?: Date | string;
  endedAt?: Date | string;
  durationSeconds: number;
  notes?: string;
  logs: LogItemDTO[];
}
