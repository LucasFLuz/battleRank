export type Modality =
  // Força / Musculação
  | "MUSCULACAO" | "CROSSFIT" | "CALISTENIA" | "POWERLIFTING" | "STRONGMAN" | "FISICULTURISMO"
  // Cardio / Endurance
  | "CARDIO" | "CAMINHADA" | "CORRIDA" | "NATACAO" | "CICLISMO" | "TRIATLON" | "REMO" | "ELIPTICO" | "ESCADA" | "PULAR_CORDA"
  // Esportes Coletivos
  | "FUTEBOL" | "BASQUETE" | "VOLEI" | "HANDEBOL" | "FUTSAL" | "BEACH_TENNIS" | "PADEL"
  // Esportes de Raquete
  | "TENIS" | "SQUASH" | "BADMINTON" | "MESA_TENIS"
  // Lutas / Artes Marciais
  | "BOXE" | "MMA" | "JIU_JITSU" | "JUDO" | "MUAY_THAI" | "KARATE" | "TAEKWONDO" | "WRESTLING"
  // Funcional / Mobilidade
  | "FUNCIONAL" | "YOGA" | "PILATES" | "MOBILIDADE" | "ALONGAMENTO" | "ANIMAL_FLOW"
  // Outros
  | "OUTROS";

export interface Exercise {
  id: string;
  workoutId: string;
  name: string;
  modality: Modality;
  sets: number;
  repetitions: number;
  weight?: number | null;
  restTime?: number | null;
  notes?: string | null;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateExerciseDTO {
  name: string;
  modality?: Modality;
  sets: number;
  repetitions: number;
  weight?: number;
  restTime?: number;
  notes?: string;
  order?: number;
}

export interface UpdateExerciseDTO {
  name?: string;
  modality?: Modality;
  sets?: number;
  repetitions?: number;
  weight?: number;
  restTime?: number;
  notes?: string;
  order?: number;
}
