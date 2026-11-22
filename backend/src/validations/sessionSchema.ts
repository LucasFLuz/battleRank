import { z } from "zod";

export const logItemSchema = z.object({
  exerciseId: z.string({ required_error: "ID do exercício é obrigatório." }).uuid("ID do exercício inválido."),
  setNumber: z.number().int().min(1, "O número da série deve ser pelo menos 1."),
  weight: z.number().min(0, "O peso não pode ser negativo."),
  repetitions: z.number().int().min(1, "As repetições devem ser pelo menos 1."),
  isCompleted: z.boolean().default(true).optional(),
});

export const saveSessionSchema = z.object({
  startedAt: z.string().datetime().or(z.date()).optional(),
  endedAt: z.string().datetime().or(z.date()).optional(),
  durationSeconds: z
    .number({ required_error: "Duração da sessão em segundos é obrigatória." })
    .int()
    .min(0, "Duração não pode ser negativa."),
  notes: z.string().max(1000, "Observações devem ter no máximo 1000 caracteres.").optional().nullable(),
  logs: z
    .array(logItemSchema)
    .min(1, "A sessão deve conter pelo menos 1 série registrada."),
});

export type SaveSessionInput = z.infer<typeof saveSessionSchema>;
