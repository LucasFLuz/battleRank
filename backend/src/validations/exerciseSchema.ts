import { z } from "zod";

export const createExerciseSchema = z.object({
  name: z
    .string({ required_error: "Nome do exercício é obrigatório." })
    .trim()
    .min(2, "Nome deve possuir pelo menos 2 caracteres.")
    .max(100, "Nome deve possuir no máximo 100 caracteres."),
  modality: z
    .enum([
      // Força / Musculação
      "MUSCULACAO", "CROSSFIT", "CALISTENIA", "POWERLIFTING", "STRONGMAN", "FISICULTURISMO",
      // Cardio / Endurance
      "CARDIO", "CAMINHADA", "CORRIDA", "NATACAO", "CICLISMO", "TRIATLON", "REMO", "ELIPTICO", "ESCADA", "PULAR_CORDA",
      // Esportes Coletivos
      "FUTEBOL", "BASQUETE", "VOLEI", "HANDEBOL", "FUTSAL", "BEACH_TENNIS", "PADEL",
      // Esportes de Raquete
      "TENIS", "SQUASH", "BADMINTON", "MESA_TENIS",
      // Lutas / Artes Marciais
      "BOXE", "MMA", "JIU_JITSU", "JUDO", "MUAY_THAI", "KARATE", "TAEKWONDO", "WRESTLING",
      // Funcional / Mobilidade
      "FUNCIONAL", "YOGA", "PILATES", "MOBILIDADE", "ALONGAMENTO", "ANIMAL_FLOW",
      // Outros
      "OUTROS"
    ], {
      invalid_type_error: "Modalidade inválida.",
    })
    .default("MUSCULACAO")
    .optional(),
  sets: z
    .number({ required_error: "Número de séries é obrigatório." })
    .int("Séries devem ser um número inteiro.")
    .min(1, "O treino deve possuir no mínimo 1 série.")
    .max(50, "Número de séries não pode exceder 50."),
  repetitions: z
    .number({ required_error: "Número de repetições é obrigatório." })
    .int("Repetições devem ser um número inteiro.")
    .min(1, "O exercício deve possuir no mínimo 1 repetição.")
    .max(500, "Número de repetições não pode exceder 500."),
  weight: z
    .number()
    .min(0, "A carga planejada não pode ser negativa.")
    .max(1000, "Carga máxima permitida é de 1000kg.")
    .optional()
    .nullable(),
  restTime: z
    .number()
    .int("O tempo de descanso deve ser em segundos.")
    .min(0, "O tempo de descanso não pode ser negativo.")
    .max(600, "Tempo de descanso máximo é de 600 segundos (10 min).")
    .optional()
    .nullable(),
  notes: z
    .string()
    .max(1000, "Observações devem ter no máximo 1000 caracteres.")
    .optional()
    .nullable(),
  order: z.number().int().min(1).optional(),
});

export const updateExerciseSchema = createExerciseSchema.partial();

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>;
export type UpdateExerciseInput = z.infer<typeof updateExerciseSchema>;
