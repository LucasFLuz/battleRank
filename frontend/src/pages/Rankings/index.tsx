import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Trophy, Medal, Shield, Sparkles, User as UserIcon } from "lucide-react";
import { Container } from "../../components/layout/Container";
import { socialService, RankedAthlete } from "../../services/socialService";
import { useAuth } from "../../context/AuthContext";

export const RankingsPage: React.FC = () => {
  const { user } = useAuth();
  const [filterDivision, setFilterDivision] = useState<string>("ALL");

  const { data: athletes = [], isLoading } = useQuery<RankedAthlete[]>({
    queryKey: ["rankings"],
    queryFn: socialService.getRankings,
    staleTime: 1000 * 30,
  });

  const filteredAthletes = athletes.filter((a) => {
    if (filterDivision === "ALL") return true;
    return a.division.toUpperCase() === filterDivision;
  });

  const top3 = athletes.slice(0, 3);

  const getDivisionBadge = (division: string) => {
    switch (division) {
      case "Diamante":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "Ouro":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Prata":
        return "bg-slate-300/10 text-slate-300 border-slate-300/20";
      default:
        return "bg-amber-600/10 text-amber-500 border-amber-600/20";
    }
  };

  return (
    <Container className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dark-700">
        <div>
          <div className="flex items-center gap-2 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>Temporada de Competição • Liga battleRank</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Rankings de Atletas
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Suba de divisão acumulando volume de carga e consistência nos treinos semanais.
          </p>
        </div>

        {/* Filtros de Divisão */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-dark-850 rounded-xl border border-dark-700/60 self-start sm:self-auto text-xs">
          {["ALL", "BRONZE", "PRATA", "OURO", "DIAMANTE"].map((divKey) => (
            <button
              key={divKey}
              onClick={() => setFilterDivision(divKey)}
              className={`px-3 py-1.5 font-bold rounded-lg transition-all ${
                filterDivision === divKey
                  ? "bg-brand-500 text-dark-900 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {divKey === "ALL" ? "Geral" : divKey}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-64 bg-dark-850 rounded-3xl animate-pulse" />
          <div className="h-48 bg-dark-850 rounded-2xl animate-pulse" />
        </div>
      ) : (
        <>
          {/* Pódio dos Top 3 */}
          {top3.length > 0 && filterDivision === "ALL" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {/* 2º Lugar */}
              {top3[1] && (
                <div className="order-2 md:order-1 bg-dark-850 border border-slate-400/20 rounded-3xl p-6 text-center flex flex-col items-center justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-slate-400">
                    <Medal className="w-8 h-8 text-slate-300" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-slate-300/10 border-2 border-slate-300/40 flex items-center justify-center font-black text-xl text-slate-200 mb-3">
                    2º
                  </div>
                  <h3 className="text-base font-bold text-white truncate max-w-[200px]">
                    {top3[1].name}
                  </h3>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border mt-1 ${getDivisionBadge(top3[1].division)}`}>
                    {top3[1].division}
                  </span>
                  <div className="mt-4 pt-3 border-t border-dark-700/60 w-full flex justify-around text-xs">
                    <div>
                      <p className="text-slate-400">XP</p>
                      <p className="font-bold text-brand-400">{top3[1].xp.toLocaleString("pt-BR")}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Volume</p>
                      <p className="font-bold text-white">{top3[1].totalVolume.toLocaleString("pt-BR")} kg</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 1º Lugar (Campeão - Destaque Maior) */}
              {top3[0] && (
                <div className="order-1 md:order-2 bg-gradient-to-b from-dark-800 to-dark-850 border-2 border-yellow-500/40 rounded-3xl p-6 sm:p-8 text-center flex flex-col items-center justify-between relative shadow-2xl shadow-yellow-500/5">
                  <div className="absolute top-2 right-3 text-yellow-400 animate-bounce">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="w-20 h-20 rounded-full bg-yellow-500/10 border-2 border-yellow-400 flex items-center justify-center font-black text-3xl text-yellow-400 mb-3 shadow-lg shadow-yellow-500/20">
                    1º
                  </div>
                  <div className="flex items-center gap-1.5 justify-center">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <h3 className="text-lg font-black text-white truncate max-w-[220px]">
                      {top3[0].name}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full border mt-1 ${getDivisionBadge(top3[0].division)}`}>
                    {top3[0].division} • Campeão
                  </span>
                  <div className="mt-4 pt-3 border-t border-dark-700/60 w-full flex justify-around text-xs">
                    <div>
                      <p className="text-slate-400">Pontuação Total</p>
                      <p className="text-lg font-black text-brand-400">{top3[0].xp.toLocaleString("pt-BR")} XP</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Volume Total</p>
                      <p className="text-lg font-black text-white">{top3[0].totalVolume.toLocaleString("pt-BR")} kg</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3º Lugar */}
              {top3[2] && (
                <div className="order-3 bg-dark-850 border border-amber-600/20 rounded-3xl p-6 text-center flex flex-col items-center justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-amber-600">
                    <Medal className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="w-16 h-16 rounded-full bg-amber-600/10 border-2 border-amber-600/40 flex items-center justify-center font-black text-xl text-amber-500 mb-3">
                    3º
                  </div>
                  <h3 className="text-base font-bold text-white truncate max-w-[200px]">
                    {top3[2].name}
                  </h3>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border mt-1 ${getDivisionBadge(top3[2].division)}`}>
                    {top3[2].division}
                  </span>
                  <div className="mt-4 pt-3 border-t border-dark-700/60 w-full flex justify-around text-xs">
                    <div>
                      <p className="text-slate-400">XP</p>
                      <p className="font-bold text-brand-400">{top3[2].xp.toLocaleString("pt-BR")}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Volume</p>
                      <p className="font-bold text-white">{top3[2].totalVolume.toLocaleString("pt-BR")} kg</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tabela de Classificação Completa */}
          <div className="bg-dark-850 border border-dark-700/80 rounded-3xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-dark-700/80 flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-brand-400" /> Tabela de Classificação
              </h2>
              <span className="text-xs text-slate-400 font-medium">
                {filteredAthletes.length} atletas
              </span>
            </div>

            {/* Mobile: cards empilhados */}
            <div className="sm:hidden divide-y divide-dark-700/40">
              {filteredAthletes.map((athlete) => {
                const isCurrentUser = athlete.id === user?.id;
                return (
                  <div
                    key={athlete.id}
                    className={`p-4 flex items-center gap-3 ${
                      isCurrentUser ? "bg-brand-500/10 border-l-4 border-l-brand-500" : ""
                    }`}
                  >
                    <div className="text-center w-8 shrink-0 font-black">
                      {athlete.rank === 1 && <span className="text-lg">🥇</span>}
                      {athlete.rank === 2 && <span className="text-lg">🥈</span>}
                      {athlete.rank === 3 && <span className="text-lg">🥉</span>}
                      {athlete.rank > 3 && <span className="text-xs text-slate-400 font-mono">#{athlete.rank}</span>}
                    </div>
                    <div className="w-9 h-9 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-xs uppercase shrink-0">
                      {athlete.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm truncate flex items-center gap-1.5">
                        {athlete.name}
                        {isCurrentUser && (
                          <span className="text-[9px] uppercase font-extrabold px-1.5 rounded bg-brand-500 text-dark-900">Você</span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getDivisionBadge(athlete.division)}`}>
                          {athlete.division}
                        </span>
                        <span className="text-[11px] text-slate-400">{athlete.totalSessions} treinos</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-black text-brand-400">{athlete.xp.toLocaleString("pt-BR")} XP</p>
                      <p className="text-[11px] text-slate-400">{athlete.totalVolume.toLocaleString("pt-BR")} kg</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop: tabela */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-dark-700/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-dark-800/40">
                    <th className="py-3 px-4 w-16 text-center">Pos.</th>
                    <th className="py-3 px-4">Atleta</th>
                    <th className="py-3 px-4 text-center">Divisão</th>
                    <th className="py-3 px-4 text-center">Treinos</th>
                    <th className="py-3 px-4 text-right">Volume</th>
                    <th className="py-3 px-4 text-right">XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-700/40">
                  {filteredAthletes.map((athlete) => {
                    const isCurrentUser = athlete.id === user?.id;
                    return (
                      <tr
                        key={athlete.id}
                        className={`transition-colors ${
                          isCurrentUser
                            ? "bg-brand-500/10 font-bold border-l-4 border-l-brand-500"
                            : "hover:bg-dark-800/50"
                        }`}
                      >
                        <td className="py-3 px-4 text-center font-black">
                          {athlete.rank === 1 && <span className="text-yellow-400 text-base">🥇</span>}
                          {athlete.rank === 2 && <span className="text-slate-300 text-base">🥈</span>}
                          {athlete.rank === 3 && <span className="text-amber-500 text-base">🥉</span>}
                          {athlete.rank > 3 && <span className="text-slate-400 font-mono">#{athlete.rank}</span>}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-xs uppercase">
                              {athlete.name.charAt(0) || <UserIcon className="w-3.5 h-3.5" />}
                            </div>
                            <div>
                              <p className="font-bold text-white flex items-center gap-2">
                                <span>{athlete.name}</span>
                                {isCurrentUser && (
                                  <span className="text-[10px] uppercase font-extrabold px-1.5 rounded bg-brand-500 text-dark-900">Você</span>
                                )}
                              </p>
                              <p className="text-xs text-slate-400">{athlete.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${getDivisionBadge(athlete.division)}`}>
                            {athlete.division}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-slate-300">{athlete.totalSessions}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-white">{athlete.totalVolume.toLocaleString("pt-BR")} kg</td>
                        <td className="py-3 px-4 text-right font-mono font-black text-brand-400">{athlete.xp.toLocaleString("pt-BR")} XP</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};
