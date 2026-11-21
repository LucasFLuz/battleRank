import React, { useState } from "react";
import { Plus, Sparkles, Filter } from "lucide-react";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { WorkoutForm } from "../../components/workouts/WorkoutForm";
import { WorkoutList } from "../../components/workouts/WorkoutList";
import { useWorkouts } from "../../hooks/useWorkouts";
import { WorkoutGoal } from "../../types/workout";

type WorkoutGoalFilter = WorkoutGoal | "ALL";

const GOAL_FILTERS: WorkoutGoalFilter[] = [
  "ALL",
  "HIPERTROFIA",
  "EMAGRECIMENTO",
  "RESISTENCIA",
  "FORCA",
];

const GOAL_FILTER_LABELS: Record<WorkoutGoalFilter, string> = {
  ALL: "Todos",
  HIPERTROFIA: "Hipertrofia",
  EMAGRECIMENTO: "Emagrecimento",
  RESISTENCIA: "Resistência",
  FORCA: "Força",
};

export const WorkoutsPage: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedGoalFilter, setSelectedGoalFilter] = useState<WorkoutGoalFilter>("ALL");
  const [statusMessage, setStatusMessage] = useState("");

  const { data: workouts, isLoading, isError, error, refetch } = useWorkouts();

  // Filtragem local amigável sem overhead
  const filteredWorkouts = workouts?.filter((workout) => {
    if (selectedGoalFilter === "ALL") return true;
    return workout.goal === selectedGoalFilter;
  });

  const totalWorkouts = workouts?.length || 0;
  const hypertrophyCount = workouts?.filter((w) => w.goal === "HIPERTROFIA").length || 0;

  return (
    <Container className="space-y-8">
      {/* Top Banner & Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dark-700">
        <div>
          <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Planilhas de Treino • Temporada Ativa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Meus Treinos
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Crie planos personalizados, divida grupos musculares e monitore sua performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto shadow-lg shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            Criar Treino
          </Button>
        </div>
      </div>

      {/* Métricas Rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-dark-850 border border-dark-700">
          <p className="text-xs text-slate-400 font-medium">Total de Treinos</p>
          <p className="text-2xl font-black text-white mt-1">{totalWorkouts}</p>
        </div>
        <div className="p-4 rounded-xl bg-dark-850 border border-dark-700">
          <p className="text-xs text-slate-400 font-medium">Foco Hipertrofia</p>
          <p className="text-2xl font-black text-brand-400 mt-1">{hypertrophyCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-dark-850 border border-dark-700">
          <p className="text-xs text-slate-400 font-medium">Frequência Alvo</p>
          <p className="text-xs font-bold text-cyan-400 mt-2">4 a 6 dias / semana</p>
        </div>
        <div className="p-4 rounded-xl bg-dark-850 border border-dark-700">
          <p className="text-xs text-slate-400 font-medium">Sincronização</p>
          <p className="text-xs font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Nuvem Conectada
          </p>
        </div>
      </div>

      {/* Barra de Filtros */}
      {totalWorkouts > 0 && (
        <div
          role="group"
          aria-label="Filtrar treinos por objetivo"
          className="flex items-center gap-2 overflow-x-auto pb-2 text-xs"
        >
          <span className="text-slate-400 flex items-center gap-1 shrink-0 mr-1 font-medium">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" /> Filtrar:
          </span>
          {GOAL_FILTERS.map((goalKey) => {
            const isSelected = selectedGoalFilter === goalKey;

            return (
              <button
                key={goalKey}
                type="button"
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedGoalFilter(goalKey);
                  const count =
                    goalKey === "ALL"
                      ? totalWorkouts
                      : workouts?.filter((workout) => workout.goal === goalKey).length ?? 0;
                  setStatusMessage(
                    `${GOAL_FILTER_LABELS[goalKey]}: ${count} ${count === 1 ? "treino encontrado" : "treinos encontrados"}.`
                  );
                }}
                className={`shrink-0 rounded-lg px-3 py-1.5 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 ${
                  isSelected
                    ? "bg-brand-500 text-dark-900 shadow-sm"
                    : "bg-dark-800 text-slate-300 hover:bg-dark-700 hover:text-white"
                }`}
              >
                {GOAL_FILTER_LABELS[goalKey]}
              </button>
            );
          })}
        </div>
      )}

      {/* Listagem de Treinos com TanStack Query */}
      <WorkoutList
        workouts={filteredWorkouts}
        hasWorkouts={totalWorkouts > 0}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onRetry={() => refetch()}
      />

      {/* Modal de Criação de Treino */}
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {statusMessage}
      </p>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Cadastrar Novo Treino"
        description="Preencha os dados do treino para salvá-lo no PostgreSQL."
      >
        <WorkoutForm
          onSuccess={() => {
            setStatusMessage("Treino criado com sucesso.");
            setIsCreateModalOpen(false);
          }}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};
