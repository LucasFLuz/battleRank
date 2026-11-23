import { Exercise } from "./exercise.js";

export type WorkoutGoal = "HIPERTROFIA" | "EMAGRECIMENTO" | "RESISTENCIA" | "FORCA";

export type WorkoutLevel = "INICIANTE" | "INTERMEDIARIO" | "AVANCADO";

export type ScheduleType = "FIXED_DAYS" | "FLEXIBLE";

export type Modality =
  // Força / Musculação
  | "MUSCULACAO"
  | "CROSSFIT"
  | "CALISTENIA"
  | "POWERLIFTING"
  | "STRONGMAN"
  | "FISICULTURISMO"

  // Cardio / Endurance
  | "CARDIO"
  | "CAMINHADA"
  | "CORRIDA"
  | "NATACAO"
  | "CICLISMO"
  | "TRIATLON"
  | "REMO"
  | "ELIPTICO"
  | "ESCADA"
  | "PULAR_CORDA"

  // Esportes Coletivos
  | "FUTEBOL"
  | "BASQUETE"
  | "VOLEI"
  | "HANDEBOL"
  | "FUTSAL"
  | "BEACH_TENNIS"
  | "PADEL"

  // Esportes de Raquete
  | "TENIS"
  | "SQUASH"
  | "BADMINTON"
  | "MESA_TENIS"

  // Lutas / Artes Marciais
  | "BOXE"
  | "MMA"
  | "JIU_JITSU"
  | "JUDO"
  | "MUAY_THAI"
  | "KARATE"
  | "TAEKWONDO"
  | "WRESTLING"

  // Funcional / Mobilidade
  | "FUNCIONAL"
  | "YOGA"
  | "PILATES"
  | "MOBILIDADE"
  | "ALONGAMENTO"
  | "ANIMAL_FLOW"

  // Outros
  | "OUTROS";

export interface Workout {
  id: string;
  userId: string;
  name: string;
  goal: WorkoutGoal;
  level: WorkoutLevel;
  modality: Modality;
  notes?: string | null;
  scheduleType: ScheduleType;
  daysOfWeek: number[];  // 0=Dom, 1=Seg, ..., 6=Sáb
  frequency?: number | null;
  createdAt: Date;
  updatedAt: Date;
  exercises?: Exercise[];
  _count?: {
    exercises: number;
    sessions: number;
  };
}

export interface CreateWorkoutDTO {
  name: string;
  goal: WorkoutGoal;
  level: WorkoutLevel;
  modality: Modality;
  notes?: string;
  scheduleType?: ScheduleType;
  daysOfWeek?: number[];
  frequency?: number;
  userId: string;
}

export interface UpdateWorkoutDTO {
  name?: string;
  goal?: WorkoutGoal;
  level?: WorkoutLevel;
  modality?: Modality;
  notes?: string;
  scheduleType?: ScheduleType;
  daysOfWeek?: number[];
  frequency?: number;
}
