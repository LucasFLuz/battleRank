import { api } from "./api";

export interface RankedAthlete {
  rank: number;
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  xp: number;
  division: string;
  totalVolume: number;
  totalSessions: number;
}

export interface FeedComment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
}

export interface FeedItem {
  id: string;
  startedAt: string;
  endedAt?: string | null;
  durationSeconds?: number | null;
  totalVolume: number;
  notes?: string | null;
  createdAt: string;
  athlete: {
    id: string;
    name: string;
    avatarUrl?: string | null;
    xp: number;
  };
  workoutName: string;
  workoutGoal: string;
  workoutLevel: string;
  logs: Array<{
    id: string;
    setNumber: number;
    weight: number;
    repetitions: number;
    isPersonalRecord: boolean;
    exercise: {
      name: string;
      modality: string;
    };
  }>;
  likesCount: number;
  isLikedByMe: boolean;
  comments: FeedComment[];
}

export interface Athlete {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  xp: number;
  followersCount: number;
  followingCount: number;
  isFollowing: boolean;
}

export const socialService = {
  async getRankings(): Promise<RankedAthlete[]> {
    const response = await api.get<RankedAthlete[]>("/social/rankings");
    return response.data;
  },

  async getFeed(): Promise<FeedItem[]> {
    const response = await api.get<FeedItem[]>("/social/feed");
    return response.data;
  },

  async toggleLike(sessionId: string): Promise<{ liked: boolean }> {
    const response = await api.post<{ liked: boolean }>(`/social/feed/${sessionId}/like`);
    return response.data;
  },

  async addComment(sessionId: string, content: string): Promise<FeedComment> {
    const response = await api.post<FeedComment>(`/social/feed/${sessionId}/comments`, { content });
    return response.data;
  },

  async getAthletes(search?: string): Promise<Athlete[]> {
    const response = await api.get<Athlete[]>("/social/athletes", {
      params: search ? { search } : undefined,
    });
    return response.data;
  },

  async toggleFollow(athleteId: string): Promise<{ following: boolean }> {
    const response = await api.post<{ following: boolean }>(`/social/athletes/${athleteId}/follow`);
    return response.data;
  },
};
