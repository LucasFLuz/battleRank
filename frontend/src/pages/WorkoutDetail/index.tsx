import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Play,
  Dumbbell,
  Clock,
  Repeat,
  Trash2,
  Edit2,
  AlertCircle,
  FileText,
  Target,
  Award,
  GripVertical,
} from "lucide-react";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { ExerciseFormModal } from "../../components/exercises/ExerciseFormModal";
import { useWorkout } from "../../hooks/useWorkouts";
import { useExercises, useDeleteExercise, useUpdateExercise } from "../../hooks/useExercises";
import { Exercise, MODALITY_LABELS } from "../../types/exercise";
import { Modality } from "../../types/workout";
import { GOAL_LABELS, LEVEL_LABELS } from "../../types/workout";
import { ConfirmationModal } from "../../components/ui/ConfirmationModal";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableExerciseItemProps {
  exercise: Exercise;
  index: number;
  onEdit: (ex: Exercise) => void;
  onDelete: (id: string, name: string) => void;
}

const SortableExerciseItem: React.FC<SortableExerciseItemProps> = ({
  exercise,
  index,
  onEdit,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exercise.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-2xl bg-dark-850 border p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDragging
          ? "border-brand-500/50 bg-brand-500/5 shadow-lg shadow-brand-500/10"
          : "border-dark-700/80 hover:border-brand-500/30"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          {...attributes}
          {...listeners}
          className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center font-mono font-bold text-brand-400 text-sm shrink-0 cursor-grab active:cursor-grabbing"
          title="Arraste para reordenar"
          aria-label={`Mover exercício ${exercise.name}`}
        >
          <GripVertical className="w-5 h-5" />
        </div>
        <div className="w-9 h-9 rounded-xl bg-dark-800 border border-dark-700 flex items-center justify-center font-mono font-bold text-brand-400 text-sm shrink-0">
          {index + 1}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white group-hover:text-brand-400 transition-colors">
              {exercise.name}
            </h3>
            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-dark-700 text-slate-300">
              {MODALITY_LABELS[exercise.modality]}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1 font-semibold text-slate-200">
              <Repeat className="w-3.5 h-3.5 text-brand-400" />
              {exercise.sets} séries × {exercise.repetitions} reps
            </span>

            {exercise.weight !== null && exercise.weight !== undefined && (
              <span className="flex items-center gap-1 text-slate-300 font-semibold">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                {exercise.weight} kg sugerido
              </span>
            )}

            {exercise.restTime && (
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {exercise.restTime}s descanso
              </span>
            )}
          </div>

          {exercise.notes && (
            <p className="text-xs text-slate-400 mt-2 flex items-start gap-1.5 leading-relaxed bg-dark-800/40 p-2 rounded-lg">
              <FileText className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" />
              {exercise.notes}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-end">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onEdit(exercise)}
          className="p-2 text-slate-400 hover:text-white"
          title="Editar Exercício"
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onDelete(exercise.id, exercise.name)}
          className="p-2 text-slate-400 hover:text-red-400"
          title="Excluir Exercício"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export const WorkoutDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exerciseToEdit, setExerciseToEdit] = useState<Exercise | null>(null);
  const [deleteConfirmExercise, setDeleteConfirmExercise] = useState<{ id: string; name: string } | null>(null);

  const { data: workout, isLoading: isWorkoutLoading, isError: isWorkoutError } = useWorkout(id || "");
  const { data: exercises, isLoading: isExercisesLoading } = useExercises(id || "");
  const { mutate: deleteExercise } = useDeleteExercise(id || "");
  const { mutate: updateExercise } = useUpdateExercise(id || "");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (isWorkoutLoading || isExercisesLoading) {
    return (
      <Container className="space-y-6">
        <div className="h-8 bg-dark-800 rounded w-1/3 animate-pulse" />
        <div className="h-40 bg-dark-850 rounded-2xl animate-pulse" />
        <div className="h-64 bg-dark-850 rounded-2xl animate-pulse" />
      </Container>
    );
  }

  if (isWorkoutError || !workout) {
    return (
      <Container className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Treino não encontrado</h2>
        <p className="text-sm text-slate-400 mb-6">O plano de treino solicitado não existe ou foi removido.</p>
        <Link to="/workouts">
          <Button variant="primary">Voltar para Meus Treinos</Button>
        </Link>
      </Container>
    );
  }

  const exerciseList = exercises || workout.exercises || [];
  const estimatedVolume = exerciseList.reduce(
    (acc, ex) => acc + ex.sets * ex.repetitions * (ex.weight || 0),
    0
  );

  const handleOpenCreate = () => {
    setExerciseToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ex: Exercise) => {
    setExerciseToEdit(ex);
    setIsModalOpen(true);
  };

  const handleDelete = (exerciseId: string, name: string) => {
    setDeleteConfirmExercise({ id: exerciseId, name });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmExercise) {
      deleteExercise(deleteConfirmExercise.id);
      setDeleteConfirmExercise(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmExercise(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = exerciseList.findIndex((ex) => ex.id === active.id);
      const newIndex = exerciseList.findIndex((ex) => ex.id === over.id);

      const newOrder = arrayMove(exerciseList, oldIndex, newIndex);

      newOrder.forEach((exercise, idx) => {
        if (exercise.order !== idx + 1) {
          updateExercise({ id: exercise.id, data: { order: idx + 1 } });
        }
      });
    }
  };

  return (
    <Container className="space-y-8">
      {/* Top Breadcrumb & Ações Rápidas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to="/workouts"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para Meus Treinos
        </Link>

        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" size="md" onClick={handleOpenCreate} className="gap-2 flex-1 sm:flex-none justify-center">
            <Plus className="w-4 h-4" />
            Adicionar Exercício
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(`/workouts/${workout.id}/live`)}
            disabled={exerciseList.length === 0}
            className="gap-2 shadow-lg shadow-brand-500/20"
          >
            <Play className="w-4 h-4 fill-current" />
            Iniciar Treino
          </Button>
        </div>
      </div>

      {/* Hero Card da Ficha */}
      <div className="rounded-3xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-dark-700/80">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-400 border border-brand-500/20">
                Ficha Técnica
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-dark-700 text-slate-300">
                {GOAL_LABELS[workout.goal]}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-dark-700 text-slate-300">
                {LEVEL_LABELS[workout.level]}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              {workout.name}
            </h1>
            {workout.notes && (
              <p className="text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">{workout.notes}</p>
            )}
          </div>
        </div>

        {/* Estatísticas da Ficha */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-dark-800/60 border border-dark-700/60">
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-brand-400" /> Total de Exercícios
            </p>
            <p className="text-2xl font-black text-white mt-1">{exerciseList.length}</p>
          </div>

          <div className="p-4 rounded-xl bg-dark-800/60 border border-dark-700/60">
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Repeat className="w-3.5 h-3.5 text-cyan-400" /> Séries Planejadas
            </p>
            <p className="text-2xl font-black text-cyan-400 mt-1">
              {exerciseList.reduce((acc, ex) => acc + ex.sets, 0)}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-dark-800/60 border border-dark-700/60 col-span-2 sm:col-span-1">
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-purple-400" /> Carga Total Teórica
            </p>
            <p className="text-2xl font-black text-purple-400 mt-1">
              {estimatedVolume.toLocaleString("pt-BR")} kg
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Exercícios da Ficha */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-brand-400" /> Exercícios Programados
          </h2>
          <span className="text-xs text-slate-400">{exerciseList.length} cadastrados</span>
        </div>

        {exerciseList.length === 0 ? (
          <div className="rounded-2xl bg-dark-850 border border-dashed border-dark-700 p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
              <Dumbbell className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Nenhum exercício na ficha</h3>
            <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
              Adicione exercícios especificando séries, repetições, carga sugerida e tempo de descanso para poder iniciar o treino em tempo real.
            </p>
            <Button variant="primary" onClick={handleOpenCreate} className="gap-2">
              <Plus className="w-4 h-4" /> Adicionar Primeiro Exercício
            </Button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={exerciseList.map((ex) => ex.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3" role="list" aria-label="Lista de exercícios">
                {exerciseList.map((exercise, index) => (
                  <SortableExerciseItem
                    key={exercise.id}
                    exercise={exercise}
                    index={index}
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Modal de Adicionar / Editar Exercício */}
      {workout && (
        <ExerciseFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          workoutId={workout.id}
          exerciseToEdit={exerciseToEdit}
          workoutModality={workout.modality as Modality}
        />
      )}

      {/* Modal de Confirmação de Exclusão de Exercício */}
      {deleteConfirmExercise && (
        <ConfirmationModal
          isOpen={true}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Remover Exercício"
          message={`Tem certeza que deseja remover o exercício "${deleteConfirmExercise.name}" da ficha?`}
          confirmText="Remover"
          cancelText="Cancelar"
          variant="danger"
        />
      )}
    </Container>
  );
};
