import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dumbbell, Calendar, Target, Award, AlignLeft, MoreVertical, Trash2 } from "lucide-react";
import { Workout, GOAL_LABELS, LEVEL_LABELS, WorkoutGoal, WorkoutLevel } from "../../types/workout";
import { Button } from "../ui/Button";
import { ConfirmationModal } from "../ui/ConfirmationModal";
import { useDeleteWorkout } from "../../hooks/useWorkouts";

interface WorkoutCardProps {
  workout: Workout;
}

const GOAL_BADGE_COLORS: Record<WorkoutGoal, string> = {
  HIPERTROFIA: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  EMAGRECIMENTO: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  RESISTENCIA: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  FORCA: "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

const LEVEL_BADGE_COLORS: Record<WorkoutLevel, string> = {
  INICIANTE: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  INTERMEDIARIO: "bg-orange-500/10 text-orange-400 border-orange-500/30",
  AVANCADO: "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { mutate: deleteWorkout, isPending: isDeleting } = useDeleteWorkout();

  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(workout.createdAt));

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(false);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteWorkout(workout.id);
    setIsDeleteConfirmOpen(false);
  };

  return (
    <>
      <article className="group relative flex flex-col justify-between rounded-2xl border border-dark-700/80 bg-dark-850 p-5 transition-all duration-300 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/5 sm:p-6">
        {/* Menu dropdown */}
        <div className="absolute top-3 right-3 z-10">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-dark-700 rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              aria-label="Mais opções"
              aria-expanded={isMenuOpen}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                  aria-hidden="true"
                />
                <div className="absolute right-0 top-full mt-1 z-10 w-40 rounded-lg bg-dark-850 border border-dark-700 shadow-lg py-1">
                  <button
                    type="button"
                    onClick={handleDeleteClick}
                    disabled={isDeleting}
                    className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    {isDeleting ? "Excluindo..." : "Excluir Treino"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Link para navegação - card inteiro clicável exceto menu */}
        <Link
          to={`/workouts/${workout.id}`}
          className="block cursor-pointer"
          onClick={(e) => {
            // Evita navegação se clicou no menu
            if (isMenuOpen) {
              e.preventDefault();
              setIsMenuOpen(false);
            }
          }}
        >
          <div>
            {/* Header do Card */}
            <div className="flex items-start justify-between gap-3 mb-4 pr-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-dark-800 border border-dark-700 flex items-center justify-center text-brand-400 group-hover:scale-105 transition-transform">
                  <Dumbbell className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 id={`workout-${workout.id}-title`} className="text-base sm:text-lg font-bold text-white group-hover:text-brand-400 transition-colors uppercase tracking-wide">
                    {workout.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-0.5">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Criado em {formattedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges de Objetivo e Nível */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  GOAL_BADGE_COLORS[workout.goal]
                }`}
              >
                <Target className="w-3 h-3" aria-hidden="true" />
                {GOAL_LABELS[workout.goal]}
              </span>

              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  LEVEL_BADGE_COLORS[workout.level]
                }`}
              >
                <Award className="w-3 h-3" aria-hidden="true" />
                {LEVEL_LABELS[workout.level]}
              </span>
            </div>

            {/* Observações */}
            {workout.notes && (
              <div className="rounded-xl bg-dark-800/60 border border-dark-700/60 p-3 mb-2">
                <div className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                  <AlignLeft className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="line-clamp-3">{workout.notes}</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer de ações/status */}
          <div className="pt-4 mt-2 border-t border-dark-700/60 flex items-center justify-between text-xs text-slate-400">
            <span className="text-brand-400 font-medium">Ativo</span>
          </div>
        </Link>
      </article>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Excluir Treino"
        message={`Tem certeza que deseja excluir o treino "${workout.name}"? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
};
