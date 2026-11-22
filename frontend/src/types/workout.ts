import { Exercise } from "./exercise";

export type WorkoutGoal =
  | "HIPERTROFIA"
  | "EMAGRECIMENTO"
  | "RESISTENCIA"
  | "FORCA";

export type WorkoutLevel =
  | "INICIANTE"
  | "INTERMEDIARIO"
  | "AVANCADO";

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
  name: string;
  goal: WorkoutGoal;
  level: WorkoutLevel;
  modality: Modality;
  notes?: string | null;
  scheduleType: ScheduleType;
  daysOfWeek: number[];  // 0=Dom, 1=Seg, ..., 6=Sáb
  frequency?: number | null;
  createdAt: string;
  updatedAt: string;
  exercises?: Exercise[];
  _count?: {
    exercises: number;
    sessions: number;
  };
}

export interface CreateWorkoutFormData {
  name: string;
  goal: WorkoutGoal;
  level: WorkoutLevel;
  modality: Modality;
  notes?: string;
  scheduleType: ScheduleType;
  daysOfWeek: number[];
  frequency?: number;
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

export const SCHEDULE_TYPE_LABELS: Record<ScheduleType, string> = {
  FIXED_DAYS: "Dias Fixos da Semana",
  FLEXIBLE: "Frequência Semanal Livre",
};

export const DAY_LABELS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
] as const;

export const DAY_SHORT_LABELS = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
] as const;

export const MODALITY_LABELS: Record<Modality, string> = {
  // Força / Musculação
  MUSCULACAO: "Musculação",
  CROSSFIT: "CrossFit",
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

export const MODALITY_CATEGORIES = [
  {
    label: "Força / Musculação",
    options: [
      { value: "MUSCULACAO", label: "Musculação" },
      { value: "CROSSFIT", label: "CrossFit" },
      { value: "CALISTENIA", label: "Calistenia" },
      { value: "POWERLIFTING", label: "Powerlifting" },
      { value: "STRONGMAN", label: "Strongman" },
      { value: "FISICULTURISMO", label: "Fisiculturismo" },
    ],
  },
  {
    label: "Cardio / Endurance",
    options: [
      { value: "CARDIO", label: "Cardio" },
      { value: "CAMINHADA", label: "Caminhada" },
      { value: "CORRIDA", label: "Corrida" },
      { value: "NATACAO", label: "Natação" },
      { value: "CICLISMO", label: "Ciclismo" },
      { value: "TRIATLON", label: "Triatlo" },
      { value: "REMO", label: "Remo" },
      { value: "ELIPTICO", label: "Elíptico" },
      { value: "ESCADA", label: "Escada" },
      { value: "PULAR_CORDA", label: "Pular Corda" },
    ],
  },
  {
    label: "Esportes Coletivos",
    options: [
      { value: "FUTEBOL", label: "Futebol" },
      { value: "BASQUETE", label: "Basquete" },
      { value: "VOLEI", label: "Vôlei" },
      { value: "HANDEBOL", label: "Handebol" },
      { value: "FUTSAL", label: "Futsal" },
      { value: "BEACH_TENNIS", label: "Beach Tennis" },
      { value: "PADEL", label: "Padel" },
    ],
  },
  {
    label: "Esportes de Raquete",
    options: [
      { value: "TENIS", label: "Tênis" },
      { value: "SQUASH", label: "Squash" },
      { value: "BADMINTON", label: "Badminton" },
      { value: "MESA_TENIS", label: "Tênis de Mesa" },
    ],
  },
  {
    label: "Lutas / Artes Marciais",
    options: [
      { value: "BOXE", label: "Boxe" },
      { value: "MMA", label: "MMA" },
      { value: "JIU_JITSU", label: "Jiu-Jitsu" },
      { value: "JUDO", label: "Judô" },
      { value: "MUAY_THAI", label: "Muay Thai" },
      { value: "KARATE", label: "Karate" },
      { value: "TAEKWONDO", label: "Taekwondo" },
      { value: "WRESTLING", label: "Wrestling" },
    ],
  },
  {
    label: "Funcional / Mobilidade",
    options: [
      { value: "FUNCIONAL", label: "Funcional" },
      { value: "YOGA", label: "Yoga" },
      { value: "PILATES", label: "Pilates" },
      { value: "MOBILIDADE", label: "Mobilidade" },
      { value: "ALONGAMENTO", label: "Alongamento" },
      { value: "ANIMAL_FLOW", label: "Animal Flow" },
    ],
  },
  {
    label: "Outros",
    options: [
      { value: "OUTROS", label: "Outros" },
    ],
  },
] as const;
