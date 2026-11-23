import React from "react";
import { Link } from "react-router-dom";
import {
  Dumbbell,
  Trophy,
  ArrowRight,
  Flame,
  TrendingUp,
  Activity,
  Users,
} from "lucide-react";
import { Container } from "../../components/layout/Container";
import { Button } from "../../components/ui/Button";
import { useWorkouts } from "../../hooks/useWorkouts";
import { useHistory } from "../../hooks/useSessions";
import { useAuth } from "../../context/AuthContext";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { data: workouts = [] } = useWorkouts();
  const { data: sessions = [] } = useHistory();

  const totalWorkouts = workouts.length;
  const totalSessions = sessions.length;
  const totalVolume = sessions.reduce((acc, s) => acc + s.totalVolume, 0);

  // Calcula XP e Divisão do Atleta
  const userXp = Math.round(totalVolume * 0.1) + totalSessions * 100;
  let division = "Divisão Bronze";
  if (userXp >= 3500) division = "Divisão Diamante";
  else if (userXp >= 1500) division = "Divisão Ouro";
  else if (userXp >= 500) division = "Divisão Prata";

  // Gráfico semanal de volume dos últimos 7 dias (PF-04)
  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const weeklyVolume = daysOfWeek.map((dayName, idx) => {
    const daySessions = sessions.filter((s) => new Date(s.startedAt).getDay() === idx);
    const volume = daySessions.reduce((acc, s) => acc + s.totalVolume, 0);
    return { day: dayName, volume };
  });

  const maxDayVolume = Math.max(...weeklyVolume.map((d) => d.volume), 100);

  return (
    <Container className="space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-dark-850 via-dark-800 to-dark-850 border border-dark-700/80 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>battleRank • Bem-vindo, {user?.name || "Atleta"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Supere seus limites. Domine o <span className="text-brand-400">Ranking</span>.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Crie suas fichas de treino, registre cargas em tempo real, dispute posições no ranking e interaja com outros atletas no feed social.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link to="/workouts">
              <Button variant="primary" size="lg" className="gap-2 shadow-lg shadow-brand-500/20">
                <Dumbbell className="w-5 h-5" />
                Acessar Meus Treinos
              </Button>
            </Link>
            <Link to="/rankings">
              <Button variant="outline" size="lg" className="gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Ver Rankings
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Estatísticas Rápidas do Atleta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-dark-850 border border-dark-700/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
            <Dumbbell className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Meus Treinos</p>
            <p className="text-2xl font-black text-white mt-0.5">{totalWorkouts}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-850 border border-dark-700/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Treinos Feitos</p>
            <p className="text-2xl font-black text-white mt-0.5">{totalSessions}</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-850 border border-dark-700/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Volume Total</p>
            <p className="text-2xl font-black text-white mt-0.5">{totalVolume.toLocaleString("pt-BR")} kg</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-dark-850 border border-dark-700/80 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{division}</p>
            <p className="text-2xl font-black text-brand-400 mt-0.5">{userXp.toLocaleString("pt-BR")} XP</p>
          </div>
        </div>
      </div>

      {/* Gráfico Analítico de Volume Semanal (PF-04) */}
      <div className="rounded-3xl bg-dark-850 border border-dark-700/80 p-5 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-400" />
              Volume Semanal (kg)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Sobrecarga progressiva por dia da semana.
            </p>
          </div>
          <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20 self-start sm:self-auto">
            {totalVolume.toLocaleString("pt-BR")} kg total
          </span>
        </div>

        {/* Gráfico em Barras */}
        <div className="grid grid-cols-7 gap-1 sm:gap-4 items-end h-36 sm:h-48 border-b border-dark-700/60 pb-3">
          {weeklyVolume.map((col) => {
            const heightPercent = col.volume > 0 ? Math.max((col.volume / maxDayVolume) * 100, 15) : 8;
            return (
              <div key={col.day} className="flex flex-col items-center gap-1 sm:gap-2 h-full justify-end group">
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity truncate">
                  {col.volume > 0 ? `${col.volume}` : "0"}
                </span>
                <div className="w-full bg-dark-800 rounded-t-lg sm:rounded-t-xl overflow-hidden h-full flex items-end">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-t-lg sm:rounded-t-xl transition-all duration-500 ${
                      col.volume > 0
                        ? "bg-gradient-to-t from-brand-600 to-brand-400 group-hover:brightness-125 shadow-lg shadow-brand-500/20"
                        : "bg-dark-700/40"
                    }`}
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-300">{col.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Acesso Rápido às Frentes da Prova Final */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/rankings"
          className="group p-6 rounded-3xl bg-dark-850 border border-dark-700/80 hover:border-yellow-500/30 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 group-hover:scale-105 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">
                Rankings & Leaderboard
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Veja o pódio e compare sua pontuação com os outros atletas.
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          to="/community"
          className="group p-6 rounded-3xl bg-dark-850 border border-dark-700/80 hover:border-brand-500/30 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-brand-400 transition-colors">
                Feed Social & Atletas
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Dê apoio nos treinos da comunidade e faça novos amigos.
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </Container>
  );
};
