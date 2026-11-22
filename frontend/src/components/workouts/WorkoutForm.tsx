import React from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { useCreateWorkout } from "../../hooks/useWorkouts";
import { GOAL_LABELS, LEVEL_LABELS, SCHEDULE_TYPE_LABELS, DAY_SHORT_LABELS, MODALITY_CATEGORIES } from "../../types/workout";

const workoutFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Nome deve possuir pelo menos 3 caracteres.")
    .max(100, "Nome deve ter no máximo 100 caracteres."),
  goal: z.enum(["HIPERTROFIA", "EMAGRECIMENTO", "RESISTENCIA", "FORCA"], {
    required_error: "Selecione um objetivo válido.",
  }),
  level: z.enum(["INICIANTE", "INTERMEDIARIO", "AVANCADO"], {
    required_error: "Selecione o nível do treino.",
  }),
  modality: z.enum([
    "MUSCULACAO", "CROSSFIT", "CALISTENIA", "POWERLIFTING", "STRONGMAN", "FISICULTURISMO",
    "CARDIO", "CAMINHADA", "CORRIDA", "NATACAO", "CICLISMO", "TRIATLON", "REMO", "ELIPTICO", "ESCADA", "PULAR_CORDA",
    "FUTEBOL", "BASQUETE", "VOLEI", "HANDEBOL", "FUTSAL", "BEACH_TENNIS", "PADEL",
    "TENIS", "SQUASH", "BADMINTON", "MESA_TENIS",
    "BOXE", "MMA", "JIU_JITSU", "JUDO", "MUAY_THAI", "KARATE", "TAEKWONDO", "WRESTLING",
    "FUNCIONAL", "YOGA", "PILATES", "MOBILIDADE", "ALONGAMENTO", "ANIMAL_FLOW",
    "OUTROS"
  ], {
    required_error: "Selecione uma modalidade.",
  }),
  notes: z.string().max(1000, "Observações devem ter no máximo 1000 caracteres.").optional(),
  scheduleType: z.enum(["FIXED_DAYS", "FLEXIBLE"]).default("FLEXIBLE"),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).default([]),
  frequency: z.number().int().min(1).max(7).optional(),
});

type WorkoutFormData = z.infer<typeof workoutFormSchema>;

interface WorkoutFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSuccess, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      name: "",
      goal: "HIPERTROFIA",
      level: "INTERMEDIARIO",
      modality: "MUSCULACAO",
      notes: "",
      scheduleType: "FLEXIBLE",
      daysOfWeek: [],
      frequency: 3,
    },
    mode: "onChange",
  });

  const { mutate: createWorkout, isPending, error } = useCreateWorkout(() => {
    reset();
    onSuccess();
  });

  const onSubmit = (data: WorkoutFormData) => {
    createWorkout({
      name: data.name,
      goal: data.goal,
      level: data.level,
      modality: data.modality,
      notes: data.notes || undefined,
      scheduleType: data.scheduleType,
      daysOfWeek: data.daysOfWeek,
      frequency: data.frequency,
    });
  };

  const onInvalid = (formErrors: FieldErrors<WorkoutFormData>) => {
    const firstInvalidField = (["name", "goal", "level", "notes"] as const).find(
      (field) => formErrors[field] !== undefined
    );
    if (firstInvalidField) setFocus(firstInvalidField);
  };

  const goalOptions = Object.entries(GOAL_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const levelOptions = Object.entries(LEVEL_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const scheduleTypeOptions = Object.entries(SCHEDULE_TYPE_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const daysOfWeekOptions = DAY_SHORT_LABELS.map((label, idx) => ({
    value: idx,
    label,
  }));

  const watchedScheduleType = watch("scheduleType", "FLEXIBLE");

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4" aria-busy={isPending}>
      <p className="text-xs text-slate-300">Campos marcados com * são obrigatórios.</p>

      {error && (
        <div
          role="alert"
          aria-live="assertive"
          className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400"
        >
          Erro ao salvar treino: {error.message || "Tente novamente mais tarde."}
        </div>
      )}

      <Input
        label="Nome do Treino *"
        required
        placeholder="Ex: Treino A - Peito e Tríceps"
        error={errors.name?.message}
        {...register("name")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Objetivo *"
          required
          options={goalOptions}
          error={errors.goal?.message}
          {...register("goal")}
        />

        <Select
          label="Nível *"
          required
          options={levelOptions}
          error={errors.level?.message}
          {...register("level")}
        />
      </div>

      <Select
        label="Modalidade *"
        required
        options={MODALITY_CATEGORIES}
        error={errors.modality?.message}
        {...register("modality")}
      />

      {/* Programação / Agenda */}
      <fieldset className="rounded-xl bg-dark-800/50 border border-dark-700/60 p-4 space-y-4">
        <legend className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-500" />
          Programação do Treino
        </legend>

        <Select
          label="Tipo de Agenda *"
          required
          options={scheduleTypeOptions}
          error={errors.scheduleType?.message}
          {...register("scheduleType")}
        />

        {watchedScheduleType === "FIXED_DAYS" && (
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-300">
              Dias da Semana
            </label>
            <div className="flex flex-wrap gap-2">
              {daysOfWeekOptions.map((day) => {
                const isChecked = watch("daysOfWeek")?.includes(day.value) || false;
                return (
                  <label
                    key={day.value}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${
                      isChecked
                        ? "bg-brand-500/20 border-brand-500/30 text-brand-300"
                        : "bg-dark-850 border-dark-600 text-slate-200 hover:bg-dark-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={day.value}
                      className="w-4 h-4 accent-brand-500"
                      {...register("daysOfWeek")}
                    />
                    {day.label}
                  </label>
                );
              })}
            </div>
            {errors.daysOfWeek?.message && (
              <p className="text-xs font-medium text-red-400">{errors.daysOfWeek.message}</p>
            )}
          </div>
        )}

        {watchedScheduleType === "FLEXIBLE" && (
          <div className="space-y-1.5">
            <Input
              label="Frequência Semanal (vezes)"
              type="number"
              min={1}
              max={7}
              placeholder="Ex: 3"
              error={errors.frequency?.message}
              {...register("frequency", { valueAsNumber: true })}
            />
            <p className="text-xs text-slate-400">
              Quantas vezes por semana você pretende treinar este plano
            </p>
          </div>
        )}
      </fieldset>

      <div className="w-full space-y-1.5">
        <label
          htmlFor="workout-notes"
          className="block text-xs font-semibold uppercase tracking-wide text-slate-300"
        >
          Observações / Grupos Musculares
        </label>
        <textarea
          id="workout-notes"
          rows={3}
          placeholder="Ex: Foco em supino inclinado, drop-sets na última série..."
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "workout-notes-error" : undefined}
          className="w-full resize-none rounded-lg border border-slate-500 bg-dark-850 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-400 transition-colors focus-visible:border-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          {...register("notes")}
        />
        {errors.notes?.message && (
          <p id="workout-notes-error" className="text-xs font-medium text-red-400">
            {errors.notes.message}
          </p>
        )}
      </div>

      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {isPending ? "Salvando treino..." : ""}
      </p>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-700">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isPending}>
          Salvar Treino
        </Button>
      </div>
    </form>
  );
};