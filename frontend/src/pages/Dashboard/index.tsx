import React from "react";
import { Link } from "react-router-dom";
import { Dumbbell, Trophy, ArrowRight, Flame, Target, Award, CheckCircle2, Circle } from "lucide-react";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { useWorkouts } from "../../hooks/useWorkouts";

export const DashboardPage: React.FC = () => {
  const { data: workouts } = useWorkouts();
  const totalWorkouts = workouts?.length || 0;

  const trainingPillars = [
    {
      title: "Planejamento & Divisão de Treinos",
      desc: "Estruture suas rotinas por grupamento muscular e nível de intensidade para otimizar seus ganhos.",
      status: "completed",
    },
    {
      title: "Sobrecarga Progressiva",
      desc: "Monitore o volume de treino, ajustando séries e repetições para estimular a hipertrofia e força.",
      status: "active",
    },
    {
      title: "Registro de Cargas & Frequência",
      desc: "Consistência é a chave: registre suas sessões semanais para acompanhar sua evolução física contínua.",
      status: "planned",
    },
    {
      title: "Rankings & Comunidade de Atletas",
      desc: "Dispute as primeiras colocações da temporada, compare marcas de levantamento e motive seus amigos.",
      status: "planned",
    },
  ];

  return (
    <Container className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-850 via-dark-800 to-dark-850 border border-dark-700/80 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>battleRank • Painel do Atleta</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Supere seus limites. Domine o <span className="text-brand-400">Ranking</span>.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Plataforma fitness social para criação de treinos, evolução de cargas e acompanhamento de desempenho com visual moderno e sincronização em tempo real.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/workouts">
              <Button variant="primary" size="lg" className="gap-2 shadow-lg shadow-brand-500/20">
                <Dumbbell className="w-5 h-5" />
                Acessar Meus Treinos
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Estatísticas Rápidas do Atleta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Treinos Cadastrados</p>
            <p className="text-2xl font-black text-white mt-0.5">{totalWorkouts}</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Meta Semanal</p>
            <p className="text-2xl font-black text-white mt-0.5">5 Dias / Semana</p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-dark-850 border border-dark-700/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Liga Atual</p>
            <p className="text-2xl font-black text-white mt-0.5">Divisão Bronze</p>
          </div>
        </div>
      </div>

      {/* Pilares da Jornada Fitness */}
      <div className="rounded-2xl bg-dark-850 border border-dark-700/80 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-400" />
              Jornada de Evolução do Atleta
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Diretrizes de performance para alcançar sua melhor versão física e subir no ranking.
            </p>
          </div>
          <Link to="/workouts" className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300">
            Ver Treinos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-4">
          {trainingPillars.map((pillar, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-dark-800/50 border border-dark-700/60"
            >
              <div className="mt-0.5">
                {pillar.status === "completed" && (
                  <CheckCircle2 className="w-5 h-5 text-brand-400" />
                )}
                {pillar.status === "active" && (
                  <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </div>
                )}
                {pillar.status === "planned" && (
                  <Circle className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-100">{pillar.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
