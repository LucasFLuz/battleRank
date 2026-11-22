import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Flame,
  Trophy,
  Dumbbell,
  ChevronRight,
  History as HistoryIcon,
  ArrowLeft,
  Star,
} from "lucide-react";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { useHistory } from "../../hooks/useSessions";
import { MODALITY_LABELS } from "../../types/exercise";
import { WorkoutSession } from "../../types/session";

export const HistoryPage: React.FC = () => {
  const { data: sessions, isLoading, isError } = useHistory();

  if (isLoading) {
    return (
      <Container className="space-y-4">
        <div className="h-8 bg-dark-800 rounded w-1/3 animate-pulse" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-dark-850 rounded-2xl animate-pulse" />
        ))}
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="text-center py-12">
        <Dumbbell className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white mb-2">Erro ao carregar histórico</h2>
        <p className="text-sm text-slate-400">Tente novamente em instantes.</p>
      </Container>
    );
  }

  const sessionList = sessions || [];
  const hasPR = (session: WorkoutSession) =>
    session.logs?.some((log) => log.isPersonalRecord) ?? false;

  const formatDuration = (seconds?: number | null) => {
    if (!seconds) return "--:--";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <Container className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HistoryIcon className="w-5 h-5 text-brand-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Histórico de Treinos</h1>
          </div>
          <p className="text-sm text-slate-400">
            {sessionList.length} sessão{sessionList.length !== 1 ? "ões" : ""} registrada{sessionList.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Link to="/workouts">
          <Button variant="outline" size="md" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Meus Treinos
          </Button>
        </Link>
      </div>

      {/* Resumo geral */}
      {sessionList.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-dark-850 border border-dark-700/60">
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-brand-400" /> Total Sessões
            </p>
            <p className="text-2xl font-black text-white mt-1">{sessionList.length}</p>
          </div>
          <div className="p-4 rounded-xl bg-dark-850 border border-dark-700/60">
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" /> Volume Total
            </p>
            <p className="text-2xl font-black text-orange-400 mt-1">
              {sessionList.reduce((acc, s) => acc + s.totalVolume, 0).toLocaleString("pt-BR")} kg
            </p>
          </div>
          <div className="p-4 rounded-xl bg-dark-850 border border-dark-700/60">
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> Tempo Total
            </p>
            <p className="text-2xl font-black text-cyan-400 mt-1">
              {formatDuration(sessionList.reduce((acc, s) => acc + (s.durationSeconds ?? 0), 0))}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-dark-850 border border-dark-700/60">
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" /> Recordes (PR)
            </p>
            <p className="text-2xl font-black text-yellow-400 mt-1">
              {sessionList.reduce(
                (acc, s) => acc + (s.logs?.filter((l) => l.isPersonalRecord).length ?? 0),
                0
              )}
            </p>
          </div>
        </div>
      )}

      {/* Lista de Sessões */}
      {sessionList.length === 0 ? (
        <div className="rounded-2xl bg-dark-850 border border-dashed border-dark-700 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
            <HistoryIcon className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Nenhum treino registrado</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-sm mx-auto">
            Inicie um treino pela ficha e, ao finalizá-lo, sua sessão aparecerá aqui com volume, duração e recordes pessoais.
          </p>
          <Link to="/workouts">
            <Button variant="primary" className="gap-2">
              <Dumbbell className="w-4 h-4" /> Ver Meus Treinos
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sessionList.map((session) => (
            <div
              key={session.id}
              className="rounded-2xl bg-dark-850 border border-dark-700/80 p-5 hover:border-dark-600 transition-all"
            >
              {/* Topo do card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-700/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {session.workout?.name ?? "Treino"}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(session.startedAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(session.durationSeconds)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {hasPR(session) && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-bold uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-current" /> PR
                    </span>
                  )}
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Volume</p>
                    <p className="text-lg font-black text-white">
                      {session.totalVolume.toLocaleString("pt-BR")} kg
                    </p>
                  </div>
                </div>
              </div>

              {/* Logs do treino */}
              {session.logs && session.logs.length > 0 && (
                <div className="mt-4 space-y-2">
                  {/* Agrupar logs por exercício */}
                  {Object.entries(
                    session.logs.reduce((acc, log) => {
                      const name = log.exercise?.name ?? log.exerciseId;
                      if (!acc[name]) acc[name] = [];
                      acc[name].push(log);
                      return acc;
                    }, {} as Record<string, typeof session.logs>)
                  ).map(([exName, logs]) => (
                    <div key={exName} className="flex items-start gap-3">
                      <ChevronRight className="w-3.5 h-3.5 text-brand-400 mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{exName}</span>
                          {logs[0].exercise?.modality && (
                            <span className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded-full bg-dark-700 text-slate-400">
                              {MODALITY_LABELS[logs[0].exercise.modality]}
                            </span>
                          )}
                          {logs.some((l) => l.isPersonalRecord) && (
                            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {logs.map((log) => (
                            <span
                              key={log.id}
                              className={`text-[11px] px-2 py-0.5 rounded-lg font-mono font-semibold ${
                                log.isPersonalRecord
                                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                  : log.isCompleted
                                  ? "bg-dark-800 text-slate-300"
                                  : "bg-dark-800/40 text-slate-500"
                              }`}
                            >
                              {log.weight}kg × {log.repetitions}
                              {log.isPersonalRecord && " 🏆"}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};
