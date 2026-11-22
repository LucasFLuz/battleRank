import { z } from "zod";

const modalityEnum = z.enum([
  "MUSCULACAO", "CROSSFIT", "CALISTENIA", "POWERLIFTING", "STRONGMAN", "FISICULTURISMO",
  "CARDIO", "CAMINHADA", "CORRIDA", "NATACAO", "CICLISMO", "TRIATLON", "REMO", "ELIPTICO", "ESCADA", "PULAR_CORDA",
  "FUTEBOL", "BASQUETE", "VOLEI", "HANDEBOL", "FUTSAL", "BEACH_TENNIS", "PADEL",
  "TENIS", "SQUASH", "BADMINTON", "MESA_TENIS",
  "BOXE", "MMA", "JIU_JITSU", "JUDO", "MUAY_THAI", "KARATE", "TAEKWONDO", "WRESTLING",
  "FUNCIONAL", "YOGA", "PILATES", "MOBILIDADE", "ALONGAMENTO", "ANIMAL_FLOW",
  "OUTROS"
], {
  required_error: "Modalidade é obrigatória.",
  invalid_type_error: "Modalidade inválida.",
});

export const createWorkoutSchema = z.object({
  name: z
    .string({ required_error: "Nome é obrigatório." })
    .trim()
    .min(3, "Nome deve possuir pelo menos 3 caracteres.")
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  goal: z.enum(["HIPERTROFIA", "EMAGRECIMENTO", "RESISTENCIA", "FORCA"], {
    required_error: "Objetivo é obrigatório.",
    invalid_type_error: "Objetivo inválido. Opções permitidas: HIPERTROFIA, EMAGRECIMENTO, RESISTENCIA, FORCA.",
  }),
  level: z.enum(["INICIANTE", "INTERMEDIARIO", "AVANCADO"], {
    required_error: "Nível é obrigatório.",
    invalid_type_error: "Nível inválido. Opções permitidas: INICIANTE, INTERMEDIARIO, AVANCADO.",
  }),
  modality: modalityEnum,
  notes: z.string().max(1000, "Observações devem ter no máximo 1000 caracteres.").optional(),
  scheduleType: z.enum(["FIXED_DAYS", "FLEXIBLE"]).default("FLEXIBLE").optional(),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).default([]).optional(),
  frequency: z.number().int().min(1).max(7).optional(),
});

export const updateWorkoutSchema = createWorkoutSchema.partial();

export type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>;
export type UpdateWorkoutInput = z.infer<typeof updateWorkoutSchema>;
