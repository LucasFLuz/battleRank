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
  createdAt: string;
  updatedAt: string;
}

export interface CreateExerciseFormData {
  name: string;
  modality?: Modality; // Optional - defaults to workout's modality
  sets: number;
  repetitions: number;
  weight?: number | null;
  restTime?: number | null;
  notes?: string | null;
  order?: number;
}

export const MODALITY_LABELS: Record<Modality, string> = {
  // Força / Musculação
  MUSCULACAO: "Musculação",
  CROSSFIT: "Crossfit",
  CALISTENIA: "Calistenia",
  POWERLIFTING: "Powerlifting",
  STRONGMAN: "Strongman",
  FISICULTURISMO: "Fisiculturismo",
  // Cardio / Endurance
  CARDIO: "Cardio",
  CAMINHADA: "Caminhada",
  CORRIDA: "Corrida",
  NATACAO: "Natação",
  CICLISMO: "Ciclismo",
  TRIATLON: "Triatlo",
  REMO: "Remo",
  ELIPTICO: "Elíptico",
  ESCADA: "Escada",
  PULAR_CORDA: "Pular Corda",
  // Esportes Coletivos
  FUTEBOL: "Futebol",
  BASQUETE: "Basquete",
  VOLEI: "Vôlei",
  HANDEBOL: "Handebol",
  FUTSAL: "Futsal",
  BEACH_TENNIS: "Beach Tennis",
  PADEL: "Padel",
  // Esportes de Raquete
  TENIS: "Tênis",
  SQUASH: "Squash",
  BADMINTON: "Badminton",
  MESA_TENIS: "Tênis de Mesa",
  // Lutas / Artes Marciais
  BOXE: "Boxe",
  MMA: "MMA",
  JIU_JITSU: "Jiu-Jitsu",
  JUDO: "Judô",
  MUAY_THAI: "Muay Thai",
  KARATE: "Karate",
  TAEKWONDO: "Taekwondo",
  WRESTLING: "Wrestling",
  // Funcional / Mobilidade
  FUNCIONAL: "Funcional",
  YOGA: "Yoga",
  PILATES: "Pilates",
  MOBILIDADE: "Mobilidade",
  ALONGAMENTO: "Alongamento",
  ANIMAL_FLOW: "Animal Flow",
  // Outros
  OUTROS: "Outros",
};

// Categorias para agrupar no select
export const MODALITY_CATEGORIES = [
  { label: "Força / Musculação", items: ["MUSCULACAO", "CROSSFIT", "CALISTENIA", "POWERLIFTING", "STRONGMAN", "FISICULTURISMO"] },
  { label: "Cardio / Endurance", items: ["CARDIO", "CAMINHADA", "CORRIDA", "NATACAO", "CICLISMO", "TRIATLON", "REMO", "ELIPTICO", "ESCADA", "PULAR_CORDA"] },
  { label: "Esportes Coletivos", items: ["FUTEBOL", "BASQUETE", "VOLEI", "HANDEBOL", "FUTSAL", "BEACH_TENNIS", "PADEL"] },
  { label: "Esportes de Raquete", items: ["TENIS", "SQUASH", "BADMINTON", "MESA_TENIS"] },
  { label: "Lutas / Artes Marciais", items: ["BOXE", "MMA", "JIU_JITSU", "JUDO", "MUAY_THAI", "KARATE", "TAEKWONDO", "WRESTLING"] },
  { label: "Funcional / Mobilidade", items: ["FUNCIONAL", "YOGA", "PILATES", "MOBILIDADE", "ALONGAMENTO", "ANIMAL_FLOW"] },
  { label: "Outros", items: ["OUTROS"] },
] as const;
