import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Flame,
  Clock,
  Award,
  MessageCircle,
  UserPlus,
  UserCheck,
  Send,
  Calendar,
  Users,
  Search,
  Zap,
  TrendingUp,
  Heart,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from "lucide-react";
import { Container } from "../../components/layout/Container";
import { socialService, FeedItem, Athlete } from "../../services/socialService";
import { useAuth } from "../../context/AuthContext";

const GOAL_LABEL: Record<string, string> = {
  HIPERTROFIA: "Hipertrofia",
  EMAGRECIMENTO: "Emagrecimento",
  RESISTENCIA: "Resistência",
  FORCA: "Força",
};

const GOAL_COLOR: Record<string, string> = {
  HIPERTROFIA: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  EMAGRECIMENTO: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  RESISTENCIA: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  FORCA: "bg-red-500/10 text-red-400 border-red-500/20",
};

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "agora";
  if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
  return `${Math.floor(diff / 86400)}d atrás`;
}

function formatDuration(seconds?: number | null): string {
  if (!seconds) return "--";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ─── Feed Card ─── */
interface FeedCardProps {
  item: FeedItem;
  currentUserId?: string;
  currentUserInitial?: string;
  onLike: (id: string) => void;
  onComment: (id: string, text: string) => void;
}

const FeedCard: React.FC<FeedCardProps> = ({ item, currentUserId, currentUserInitial = "?", onLike, onComment }) => {
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const isMe = item.athlete?.id === currentUserId;
  const prCount = item.logs?.filter((l) => l.isPersonalRecord).length ?? 0;
  const goalKey = item.workoutGoal ?? "";

  const send = () => {
    if (commentText.trim()) {
      onComment(item.id, commentText.trim());
      setCommentText("");
    }
  };

  return (
    <article className="bg-dark-850 border border-dark-700/60 rounded-2xl overflow-hidden hover:border-dark-600 transition-all duration-200 shadow-lg">

      {/* ── Topo: avatar + nome + tempo ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500/30 to-brand-600/10 border-2 border-brand-500/40 flex items-center justify-center text-brand-300 font-black text-base uppercase shadow-sm">
              {item.athlete?.name?.charAt(0) ?? "A"}
            </div>
            {isMe && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-brand-500 border-2 border-dark-850 flex items-center justify-center">
                <Zap className="w-2 h-2 text-dark-900" />
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
              {item.athlete?.name ?? "Atleta"}
              {isMe && (
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  Você
                </span>
              )}
            </p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3 h-3" />
              {timeAgo(item.createdAt)}
            </p>
          </div>
        </div>

        <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${GOAL_COLOR[goalKey] ?? "bg-dark-700 text-slate-400 border-dark-600"}`}>
          {GOAL_LABEL[goalKey] ?? goalKey}
        </span>
      </div>

      {/* ── Nome do treino ── */}
      <div className="px-5 pb-3">
        <h3 className="text-base font-black text-white leading-snug">{item.workoutName}</h3>
      </div>

      {/* ── Métricas ── */}
      <div className="mx-5 mb-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-dark-800/80 border border-dark-700/50 p-3 text-center">
          <Flame className="w-4 h-4 text-orange-400 mx-auto mb-1" />
          <p className="text-[10px] text-slate-500 font-medium">Volume</p>
          <p className="text-sm font-black text-white leading-tight">
            {item.totalVolume > 0 ? `${item.totalVolume.toLocaleString("pt-BR")}kg` : "--"}
          </p>
        </div>
        <div className="rounded-xl bg-dark-800/80 border border-dark-700/50 p-3 text-center">
          <Clock className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
          <p className="text-[10px] text-slate-500 font-medium">Tempo</p>
          <p className="text-sm font-black text-white leading-tight">{formatDuration(item.durationSeconds)}</p>
        </div>
        <div className={`rounded-xl border p-3 text-center ${prCount > 0 ? "bg-yellow-500/5 border-yellow-500/20" : "bg-dark-800/80 border-dark-700/50"}`}>
          <Award className={`w-4 h-4 mx-auto mb-1 ${prCount > 0 ? "text-yellow-400" : "text-slate-600"}`} />
          <p className="text-[10px] text-slate-500 font-medium">PRs</p>
          <p className={`text-sm font-black leading-tight ${prCount > 0 ? "text-yellow-400" : "text-slate-500"}`}>{prCount}</p>
        </div>
      </div>

      {/* ── Tags de exercícios ── */}
      {item.logs && item.logs.length > 0 && (
        <div className="px-5 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {Array.from(new Set(item.logs.map((l) => l.exercise?.name).filter(Boolean)))
              .slice(0, 5)
              .map((name) => (
                <span key={name} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-dark-700/80 text-slate-300 border border-dark-600/50 font-medium">
                  {name}
                </span>
              ))}
            {new Set(item.logs.map((l) => l.exercise?.name).filter(Boolean)).size > 5 && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-lg bg-dark-700/40 text-slate-500 font-medium">
                +{new Set(item.logs.map((l) => l.exercise?.name).filter(Boolean)).size - 5}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Divisor ── */}
      <div className="border-t border-dark-700/40 mx-5" />

      {/* ── Ações ── */}
      <div className="px-5 py-3 flex items-center gap-3">
        {/* Like */}
        <button
          onClick={() => onLike(item.id)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
            item.isLikedByMe
              ? "bg-brand-500 text-dark-900 shadow-md shadow-brand-500/25 scale-[1.02]"
              : "bg-dark-800 text-slate-400 hover:text-white hover:bg-dark-700 border border-dark-700/50"
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${item.isLikedByMe ? "fill-current" : ""}`} />
          <span>{item.isLikedByMe ? "Apoiado" : "Apoiar"} 👊</span>
          {item.likesCount > 0 && (
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${item.isLikedByMe ? "bg-dark-900/30" : "bg-dark-700 text-slate-300"}`}>
              {item.likesCount}
            </span>
          )}
        </button>

        {/* Comentários toggle */}
        <button
          onClick={() => setShowComments((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-dark-800 transition-colors border border-dark-700/50"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{item.comments?.length ?? 0}</span>
          {showComments ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* ── Seção de comentários (colapsável) ── */}
      {showComments && (
        <div className="px-5 pb-4 space-y-3">
          {/* Lista */}
          {item.comments && item.comments.length > 0 && (
            <div className="space-y-2">
              {item.comments.map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-dark-700 border border-dark-600 flex items-center justify-center text-slate-400 text-xs font-bold uppercase shrink-0">
                    {c.user?.name?.charAt(0) ?? "?"}
                  </div>
                  <div className="flex-1 bg-dark-800/60 rounded-xl px-3 py-2">
                    <p className="text-[11px] font-bold text-brand-400">{c.user?.name ?? "Atleta"}</p>
                    <p className="text-xs text-slate-300 mt-0.5">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Input de novo comentário */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 text-xs font-bold uppercase shrink-0">
                <span>{currentUserInitial}</span>
              </div>
            <div className="flex-1 flex items-center gap-2 bg-dark-800 border border-dark-700/60 rounded-xl px-3 py-1.5 focus-within:border-brand-500 transition-colors">
              <input
                type="text"
                placeholder="Escreva um comentário..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 outline-none"
              />
              <button
                onClick={send}
                disabled={!commentText.trim()}
                className="text-brand-400 hover:text-brand-300 disabled:text-slate-600 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

/* ─── Athlete Card (sidebar) ─── */
interface AthleteCardProps {
  athlete: Athlete;
  isMe: boolean;
  onFollow: (id: string) => void;
}

const AthleteCard: React.FC<AthleteCardProps> = ({ athlete, isMe, onFollow }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-800/60 transition-colors group">
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/10 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-sm uppercase shrink-0">
      {athlete.name.charAt(0)}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-white truncate">{athlete.name}</p>
      <p className="text-[11px] text-slate-500">
        {athlete.followersCount} seguidor{athlete.followersCount !== 1 ? "es" : ""}
        {athlete.xp > 0 && <span className="ml-1.5 text-brand-400 font-semibold">{athlete.xp} XP</span>}
      </p>
    </div>
    {!isMe && (
      <button
        onClick={() => onFollow(athlete.id)}
        className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
          athlete.isFollowing
            ? "bg-dark-700 text-slate-400 hover:bg-dark-600 hover:text-red-400"
            : "bg-brand-500/10 text-brand-400 border border-brand-500/30 hover:bg-brand-500 hover:text-dark-900"
        }`}
      >
        {athlete.isFollowing ? (
          <><UserCheck className="w-3 h-3" /><span>Seguindo</span></>
        ) : (
          <><UserPlus className="w-3 h-3" /><span>Seguir</span></>
        )}
      </button>
    )}
  </div>
);

/* ─── Page ─── */
export const CommunityPage: React.FC = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [athleteSearch, setAthleteSearch] = useState("");

  const { data: feed = [], isLoading: isFeedLoading, refetch: refetchFeed } = useQuery<FeedItem[]>({
    queryKey: ["socialFeed"],
    queryFn: socialService.getFeed,
    staleTime: 1000 * 15,
  });

  const { data: athletes = [], isLoading: isAthletesLoading } = useQuery<Athlete[]>({
    queryKey: ["athletes", athleteSearch],
    queryFn: () => socialService.getAthletes(athleteSearch),
    staleTime: 1000 * 30,
  });

  const { mutate: toggleLike } = useMutation({
    mutationFn: (sessionId: string) => socialService.toggleLike(sessionId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["socialFeed"] }),
  });

  const { mutate: addComment } = useMutation({
    mutationFn: ({ sessionId, content }: { sessionId: string; content: string }) =>
      socialService.addComment(sessionId, content),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["socialFeed"] }),
  });

  const { mutate: toggleFollow } = useMutation({
    mutationFn: (athleteId: string) => socialService.toggleFollow(athleteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["athletes"] }),
  });

  const totalLikes = feed.reduce((acc, f) => acc + f.likesCount, 0);
  const totalPR = feed.reduce((acc, f) => acc + (f.logs?.filter((l) => l.isPersonalRecord).length ?? 0), 0);

  return (
    <Container className="space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>Comunidade • Feed de Atividades</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Feed Social</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Acompanhe a galera, dê apoio e veja quem está quebrando recordes.
          </p>
        </div>

        {/* Stats do feed */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-850 border border-dark-700/60 text-xs">
            <Heart className="w-3.5 h-3.5 text-brand-400" />
            <span className="font-bold text-white">{totalLikes}</span>
            <span className="text-slate-500">apoios</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-850 border border-dark-700/60 text-xs">
            <Award className="w-3.5 h-3.5 text-yellow-400" />
            <span className="font-bold text-white">{totalPR}</span>
            <span className="text-slate-500">PRs</span>
          </div>
          <button
            onClick={() => refetchFeed()}
            className="p-2 rounded-xl bg-dark-850 border border-dark-700/60 text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
            title="Atualizar feed"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Layout grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Coluna feed ── */}
        <div className="lg:col-span-2 space-y-4">
          {isFeedLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-dark-850 rounded-2xl animate-pulse border border-dark-700/40" />
              ))}
            </div>
          ) : feed.length === 0 ? (
            <div className="rounded-2xl bg-dark-850 border border-dashed border-dark-700 p-14 text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center mx-auto mb-4">
                <Flame className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Nenhum treino no feed</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Conclua um treino para aparecer no feed da comunidade!
              </p>
            </div>
          ) : (
            feed.map((item) => (
              <FeedCard
                key={item.id}
                item={item}
                currentUserId={user?.id}
                currentUserInitial={user?.name?.charAt(0) ?? "?"}
                onLike={toggleLike}
                onComment={(id, text) => addComment({ sessionId: id, content: text })}
              />
            ))
          )}
        </div>

        {/* ── Coluna lateral: atletas ── */}
        <div className="space-y-4">

          {/* Stats gerais */}
          <div className="bg-dark-850 border border-dark-700/60 rounded-2xl p-4 space-y-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-brand-400" />
              Atividade da Comunidade
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-dark-800/60 p-3 text-center">
                <p className="text-xl font-black text-white">{feed.length}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">treinos</p>
              </div>
              <div className="rounded-xl bg-dark-800/60 p-3 text-center">
                <p className="text-xl font-black text-brand-400">{athletes.length}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">atletas</p>
              </div>
            </div>
          </div>

          {/* Encontrar atletas */}
          <div className="bg-dark-850 border border-dark-700/60 rounded-2xl p-4 space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-400" />
              Encontrar Atletas
            </h2>

            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={athleteSearch}
                onChange={(e) => setAthleteSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-dark-800 border border-dark-700/60 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>

            {/* Lista */}
            {isAthletesLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-14 bg-dark-800 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : athletes.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">Nenhum atleta encontrado.</p>
            ) : (
              <div className="space-y-1">
                {athletes.slice(0, 8).map((ath) => (
                  <AthleteCard
                    key={ath.id}
                    athlete={ath}
                    isMe={ath.id === user?.id}
                    onFollow={toggleFollow}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
