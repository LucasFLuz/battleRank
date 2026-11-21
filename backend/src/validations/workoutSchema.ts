import { z } from "zod";

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
  notes: z.string().max(1000, "Observações devem ter no máximo 1000 caracteres.").optional(),
});

export type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>;
