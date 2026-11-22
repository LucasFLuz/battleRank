import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Timer,
  Flame,
  Dumbbell,
  ChevronRight,
  Flag,
} from "lucide-react";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { RestStopwatch } from "../../components/exercises/RestStopwatch";
import { useWorkout } from "../../hooks/useWorkouts";
import { useExercises } from "../../hooks/useExercises";
import { useSaveSession } from "../../hooks/useSessions";
import { MODALITY_LABELS } from "../../types/exercise";
import { LogItemPayload } from "../../types/session";

interface SetState {
  weight: number;
  repetitions: number;
  isCompleted: boolean;
}

export const WorkoutLivePage: React.FC = () => {
  const { id: workoutId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: workout, isLoading: wLoading } = useWorkout(workoutId || "");
  const { data: exercises = [], isLoading: eLoading } = useExercises(workoutId || "");

  // Estado da sessão
  const [startedAt] = useState(() => new Date().toISOString());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentExIdx, setCurrentExIdx] = useState(0);
  const [setsState, setSetsState] = useState<Record<string, SetState[]>>({});
  const [showTimer, setShowTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [allFinished, setAllFinished] = useState(false);

  const { mutate: saveSession, isPending: isSaving } = useSaveSession(
    workoutId || "",
    () => navigate("/history")
  );

  // Cronômetro geral do treino
  useEffect(() => {
    if (allFinished) return;
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [allFinished]);

  // Inicializa sets state quando exercises carregam
  useEffect(() => {
    if (exercises.length === 0) return;
    const initial: Record<string, SetState[]> = {};
    exercises.forEach((ex) => {
      if (!initial[ex.id]) {
        initial[ex.id] = Array.from({ length: ex.sets }, () => ({
          weight: ex.weight ?? 0,
          repetitions: ex.repetitions,
          isCompleted: false,
        }));
      }
    });
    setSetsState(initial);
  }, [exercises]);

  if (wLoading || eLoading) {
    return (
      <Container className="space-y-6">
        <div className="h-8 bg-dark-800 rounded w-1/3 animate-pulse" />
        <div className="h-64 bg-dark-850 rounded-2xl animate-pulse" />
      </Container>
    );
  }

  if (!workout || exercises.length === 0) {
    return (
      <Container className="text-center py-12">
        <Dumbbell className="w-12 h-12 text-slate-500 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Treino sem exercícios</h2>
        <p className="text-sm text-slate-400 mb-6">Adicione exercícios antes de iniciar.</p>
        <Link to={`/workouts/${workoutId}`}>
          <Button variant="primary">Voltar para Ficha</Button>
        </Link>
      </Container>
    );
  }

  const currentEx = exercises[currentExIdx];
  const currentSets = setsState[currentEx?.id] || [];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleSetChange = (
    exId: string,
    setIdx: number,
    field: "weight" | "repetitions",
    value: number
  ) => {
    setSetsState((prev) => {
      const copy = { ...prev };
      copy[exId] = [...(copy[exId] || [])];
      copy[exId][setIdx] = { ...copy[exId][setIdx], [field]: value };
      return copy;
    });
  };

  const handleCompleteSet = (exId: string, setIdx: number) => {
    setSetsState((prev) => {
      const copy = { ...prev };
      copy[exId] = [...(copy[exId] || [])];
      copy[exId][setIdx] = { ...copy[exId][setIdx], isCompleted: true };
      return copy;
    });

    // Abre timer de descanso
    const ex = exercises.find((e) => e.id === exId);
    setTimerSeconds(ex?.restTime ?? 60);
    setShowTimer(true);
  };

  const handleNextExercise = () => {
    if (currentExIdx < exercises.length - 1) {
      setCurrentExIdx((i) => i + 1);
      setShowTimer(false);
    }
  };

  const handleFinishWorkout = () => {
    const endedAt = new Date().toISOString();
    const logs: LogItemPayload[] = [];

    exercises.forEach((ex) => {
      const sets = setsState[ex.id] || [];
      sets.forEach((s, idx) => {
        logs.push({
          exerciseId: ex.id,
          setNumber: idx + 1,
          weight: s.weight,
          repetitions: s.repetitions,
          isCompleted: s.isCompleted,
        });
      });
    });

    saveSession({
      startedAt,
      endedAt,
      durationSeconds: elapsedSeconds,
      notes: null,
      logs,
    });

    setAllFinished(true);
  };

  // Calcula totais
  const completedSetsCount = Object.values(setsState).flat().filter((s) => s.isCompleted).length;
  const totalSetsCount = Object.values(setsState).flat().length;
  const totalVolume = Object.values(setsState)
    .flat()
    .filter((s) => s.isCompleted)
    .reduce((acc, s) => acc + s.weight * s.repetitions, 0);

  const allSetsCurrentDone = currentSets.every((s) => s.isCompleted);
  const isLastExercise = currentExIdx === exercises.length - 1;
  const allDone = Object.values(setsState)
    .flat()
    .every((s) => s.isCompleted);

  return (
    <Container className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          to={`/workouts/${workoutId}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar para Ficha
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-dark-800 px-3 py-1.5 rounded-xl border border-dark-700">
            <Timer className="w-4 h-4 text-brand-400 animate-pulse" />
            <span className="font-mono font-bold text-white text-sm">
              {formatTime(elapsedSeconds)}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-dark-800 px-3 py-1.5 rounded-xl border border-dark-700">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-slate-200">
              {totalVolume.toLocaleString("pt-BR")} kg
            </span>
          </div>

          <div className="flex items-center gap-2 bg-dark-800 px-3 py-1.5 rounded-xl border border-dark-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-slate-200">
              {completedSetsCount}/{totalSetsCount}
            </span>
          </div>
        </div>
      </div>

      {/* Treino Hero */}
      <div className="rounded-2xl bg-dark-850 border border-brand-500/20 p-5 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-brand-400">
            Treino em Execução
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {workout.name}
          </h1>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400">Exercício</span>
          <p className="text-lg font-bold text-white">
            {currentExIdx + 1}/{exercises.length}
          </p>
        </div>
      </div>

      {/* Exercício Atual */}
      <div className="rounded-2xl bg-dark-850 border border-dark-700/80 p-5 sm:p-6 space-y-5">
        {/* Nome + Modalidade */}
        <div className="flex items-center gap-3 pb-4 border-b border-dark-700/60">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center font-mono font-bold text-brand-400 text-sm">
            {currentExIdx + 1}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{currentEx.name}</h2>
            <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-dark-700 text-slate-300">
              {MODALITY_LABELS[currentEx.modality]}
            </span>
          </div>
        </div>

        {/* Tabela de Séries */}
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-[40px_1fr_1fr_60px] gap-3 text-[11px] text-slate-400 font-semibold uppercase tracking-wider px-1">
            <span>Série</span>
            <span>Carga (kg)</span>
            <span>Reps</span>
            <span className="text-center">Status</span>
          </div>

          {currentSets.map((set, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-[40px_1fr_1fr_60px] gap-3 items-center p-3 rounded-xl border transition-all ${
                set.isCompleted
                  ? "bg-brand-500/5 border-brand-500/20"
                  : "bg-dark-800/60 border-dark-700/60"
              }`}
            >
              <span className="text-sm font-bold text-slate-300 text-center">{idx + 1}</span>

              <input
                type="number"
                min={0}
                step={0.5}
                value={set.weight}
                disabled={set.isCompleted}
                onChange={(e) =>
                  handleSetChange(currentEx.id, idx, "weight", Number(e.target.value))
                }
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-brand-400 focus:ring-1 focus:ring-brand-400/40 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <input
                type="number"
                min={0}
                value={set.repetitions}
                disabled={set.isCompleted}
                onChange={(e) =>
                  handleSetChange(currentEx.id, idx, "repetitions", Number(e.target.value))
                }
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-brand-400 focus:ring-1 focus:ring-brand-400/40 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <div className="flex justify-center">
                {set.isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-brand-400" />
                ) : (
                  <button
                    onClick={() => handleCompleteSet(currentEx.id, idx)}
                    className="p-1 rounded-lg hover:bg-dark-700 transition-colors"
                    title="Marcar série concluída"
                  >
                    <Circle className="w-6 h-6 text-slate-500 hover:text-brand-400 transition-colors" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ações Exercício */}
        <div className="flex justify-end gap-3 pt-3 border-t border-dark-700/60">
          {allSetsCurrentDone && !isLastExercise && (
            <Button variant="primary" onClick={handleNextExercise} className="gap-2">
              Próximo Exercício <ChevronRight className="w-4 h-4" />
            </Button>
          )}

          {allDone && (
            <Button
              variant="primary"
              onClick={handleFinishWorkout}
              isLoading={isSaving}
              className="gap-2 shadow-lg shadow-brand-500/20"
            >
              <Flag className="w-4 h-4" /> Finalizar Treino
            </Button>
          )}
        </div>
      </div>

      {/* Progresso por exercício (mini cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {exercises.map((ex, idx) => {
          const sets = setsState[ex.id] || [];
          const done = sets.filter((s) => s.isCompleted).length;
          const isActive = idx === currentExIdx;
          return (
            <button
              key={ex.id}
              onClick={() => { setCurrentExIdx(idx); setShowTimer(false); }}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? "bg-brand-500/10 border-brand-500/30"
                  : done === sets.length && sets.length > 0
                  ? "bg-dark-800/40 border-brand-500/10"
                  : "bg-dark-850 border-dark-700/60 hover:border-dark-600"
              }`}
            >
              <p className="text-xs font-bold text-white truncate">{ex.name}</p>
              <p className="text-[10px] text-slate-400 mt-1">
                {done}/{sets.length} séries
              </p>
              {done === sets.length && sets.length > 0 && (
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 mt-1" />
              )}
            </button>
          );
        })}
      </div>

      {/* Cronômetro de Descanso */}
      <RestStopwatch
        initialSeconds={timerSeconds}
        isOpen={showTimer}
        onClose={() => setShowTimer(false)}
      />
    </Container>
  );
};
