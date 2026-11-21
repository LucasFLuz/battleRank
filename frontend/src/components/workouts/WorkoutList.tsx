import React from "react";
import { Dumbbell, AlertCircle, Plus } from "lucide-react";
import { WorkoutCard } from "./WorkoutCard";
import { Workout } from "../../types/workout";
import { Button } from "../ui/Button";

interface WorkoutListProps {
  workouts?: Workout[];
  hasWorkouts: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onOpenCreateModal: () => void;
  onRetry?: () => void;
}

export const WorkoutList: React.FC<WorkoutListProps> = ({
  workouts,
  hasWorkouts,
  isLoading,
  isError,
  errorMessage,
  onOpenCreateModal,
  onRetry,
}) => {
  const statusMessage = isLoading
    ? "Carregando treinos."
    : isError
      ? ""
      : !workouts || workouts.length === 0
        ? hasWorkouts
          ? "Nenhum treino corresponde ao filtro selecionado."
          : "Nenhum treino cadastrado."
        : `${workouts.length} ${workouts.length === 1 ? "treino encontrado" : "treinos encontrados"}.`;

  // Skeleton Loading State
  if (isLoading) {
    return (
      <>
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {statusMessage}
        </p>
        <div aria-hidden="true" className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse space-y-4 rounded-2xl border border-dark-700/80 bg-dark-850 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-dark-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 rounded bg-dark-700" />
                  <div className="h-3 w-1/3 rounded bg-dark-700" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-24 rounded-full bg-dark-700" />
                <div className="h-6 w-24 rounded-full bg-dark-700" />
              </div>
              <div className="h-14 rounded-xl bg-dark-700/60" />
            </div>
          ))}
        </div>
      </>
    );
  }

  // Error State
  if (isError) {
    return (
      <>
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {statusMessage}
        </p>
        <div
          role="alert"
          className="mx-auto max-w-md rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            <AlertCircle className="h-6 w-6" aria-hidden="true" />
          </div>
          <h3 className="mb-1 text-base font-bold text-white">Falha ao carregar treinos</h3>
          <p className="mb-6 text-xs text-slate-400">
            {errorMessage || "Não foi possível conectar ao servidor. Verifique se o backend está em execução."}
          </p>
          {onRetry && (
            <Button variant="secondary" size="sm" onClick={onRetry}>
              Tentar novamente
            </Button>
          )}
        </div>
      </>
    );
  }

  // Empty State
  if (!workouts || workouts.length === 0) {
    return (
      <>
        <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {statusMessage}
        </p>
        <div className="mx-auto max-w-lg rounded-2xl border border-dark-700/80 bg-dark-850 p-12 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10 text-brand-400 shadow-lg shadow-brand-500/5">
            <Dumbbell className="h-8 w-8" aria-hidden="true" />
          </div>
          <h3 className="mb-2 text-lg font-bold text-white">
            {hasWorkouts ? "Nenhum treino encontrado" : "Nenhum treino cadastrado"}
          </h3>
          <p className="mx-auto mb-6 max-w-xs text-sm text-slate-400">
            {hasWorkouts
              ? "Nenhum treino corresponde ao filtro selecionado."
              : "Comece criando seu primeiro plano de treinamento para acompanhar sua evolução e cargas."}
          </p>
          {!hasWorkouts && (
            <Button variant="primary" onClick={onOpenCreateModal} className="gap-2">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Criar Primeiro Treino
            </Button>
          )}
        </div>
      </>
    );
  }

  // Populated Grid State
  return (
    <>
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {statusMessage}
      </p>
      <ul className="grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <li key={workout.id}>
            <WorkoutCard workout={workout} />
          </li>
        ))}
      </ul>
    </>
  );
};
