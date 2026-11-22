import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Exercise, CreateExerciseFormData, Modality, MODALITY_LABELS, MODALITY_CATEGORIES } from "../../types/exercise";
import { useCreateExercise, useUpdateExercise } from "../../hooks/useExercises";

const exerciseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve possuir pelo menos 2 caracteres.")
    .max(100, "Nome deve possuir no máximo 100 caracteres."),
  modality: z.enum([
    "MUSCULACAO", "CROSSFIT", "CALISTENIA", "POWERLIFTING", "STRONGMAN", "FISICULTURISMO",
    "CARDIO", "CAMINHADA", "CORRIDA", "NATACAO", "CICLISMO", "TRIATLON", "REMO", "ELIPTICO", "ESCADA", "PULAR_CORDA",
    "FUTEBOL", "BASQUETE", "VOLEI", "HANDEBOL", "FUTSAL", "BEACH_TENNIS", "PADEL",
    "TENIS", "SQUASH", "BADMINTON", "MESA_TENIS",
    "BOXE", "MMA", "JIU_JITSU", "JUDO", "MUAY_THAI", "KARATE", "TAEKWONDO", "WRESTLING",
    "FUNCIONAL", "YOGA", "PILATES", "MOBILIDADE", "ALONGAMENTO", "ANIMAL_FLOW",
    "OUTROS"
  ]).optional(),
  sets: z.coerce.number().int().min(1, "Mínimo 1 série.").max(50, "Máximo 50 séries."),
  repetitions: z.coerce.number().int().min(1, "Mínimo 1 repetição.").max(500, "Máximo 500 reps."),
  weight: z.coerce.number().min(0, "Carga não pode ser negativa.").max(1000).optional().nullable(),
  restTime: z.coerce.number().int().min(0, "Descanso não pode ser negativo.").max(600).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
});

type ExerciseFormValues = z.infer<typeof exerciseSchema>;

interface ExerciseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  workoutId: string;
  exerciseToEdit?: Exercise | null;
  workoutModality?: Modality;
}

export const ExerciseFormModal: React.FC<ExerciseFormModalProps> = ({
  isOpen,
  onClose,
  workoutId,
  exerciseToEdit,
  workoutModality = "MUSCULACAO",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      name: "",
      modality: undefined,
      sets: 3,
      repetitions: 10,
      weight: 0,
      restTime: 60,
      notes: "",
    },
  });

  useEffect(() => {
    if (exerciseToEdit) {
      reset({
        name: exerciseToEdit.name,
        modality: exerciseToEdit.modality,
        sets: exerciseToEdit.sets,
        repetitions: exerciseToEdit.repetitions,
        weight: exerciseToEdit.weight ?? 0,
        restTime: exerciseToEdit.restTime ?? 60,
        notes: exerciseToEdit.notes ?? "",
      });
    } else {
      reset({
        name: "",
        modality: undefined,
        sets: 3,
        repetitions: 10,
        weight: 0,
        restTime: 60,
        notes: "",
      });
    }
  }, [exerciseToEdit, reset, isOpen]);

  const { mutate: createExercise, isPending: isCreating } = useCreateExercise(workoutId, () => {
    onClose();
  });

  const { mutate: updateExercise, isPending: isUpdating } = useUpdateExercise(workoutId, () => {
    onClose();
  });

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: ExerciseFormValues) => {
    const payload: CreateExerciseFormData = {
      name: data.name,
      modality: data.modality || workoutModality,
      sets: data.sets,
      repetitions: data.repetitions,
      weight: data.weight ? Number(data.weight) : null,
      restTime: data.restTime ? Number(data.restTime) : null,
      notes: data.notes?.trim() || null,
    };

    if (exerciseToEdit) {
      updateExercise({ id: exerciseToEdit.id, data: payload });
    } else {
      createExercise(payload);
    }
  };

  const modalityOptions = useMemo(() =>
    MODALITY_CATEGORIES.map((cat) => ({
      label: cat.label,
      options: cat.items.map((value) => ({
        value,
        label: MODALITY_LABELS[value as Modality],
      })),
    })),
    []
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={exerciseToEdit ? "Editar Exercício" : "Adicionar Exercício à Ficha"}
      description="Configure séries, repetições alvo, carga planejada e tempo de descanso."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nome do Exercício"
          placeholder="Ex: Supino Reto com Barra, Agachamento Livre..."
          error={errors.name?.message}
          {...register("name")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Modalidade (opcional - padrão do treino)"
            options={modalityOptions}
            placeholder="Usar a do treino"
            error={errors.modality?.message}
            {...register("modality")}
          />

          <Input
            label="Tempo de Descanso (segundos)"
            type="number"
            placeholder="Ex: 60, 90, 120"
            error={errors.restTime?.message}
            {...register("restTime")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Séries Alvo"
            type="number"
            placeholder="Ex: 4"
            error={errors.sets?.message}
            {...register("sets")}
          />

          <Input
            label="Repetições Alvo"
            type="number"
            placeholder="Ex: 10"
            error={errors.repetitions?.message}
            {...register("repetitions")}
          />

          <Input
            label="Carga Planejada (kg)"
            type="number"
            step="0.5"
            placeholder="Ex: 50"
            error={errors.weight?.message}
            {...register("weight")}
          />
        </div>

        <div className="w-full space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300 tracking-wide uppercase">
            Instruções Técnicas / Dicas de Execução
          </label>
          <textarea
            rows={3}
            placeholder="Ex: Pegada média, cadência 2-0-2, foco na contração no pico do movimento..."
            className="w-full rounded-lg bg-dark-850 border border-dark-600 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 resize-none"
            {...register("notes")}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-700">
          <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" isLoading={isPending}>
            {exerciseToEdit ? "Salvar Alterações" : "Adicionar à Ficha"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
