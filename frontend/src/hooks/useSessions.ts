import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionService } from "../services/sessionService";
import { SaveSessionPayload, WorkoutSession } from "../types/session";

export const SESSIONS_QUERY_KEY = ["sessions"];

export const useHistory = () => {
  return useQuery<WorkoutSession[], Error>({
    queryKey: SESSIONS_QUERY_KEY,
    queryFn: sessionService.getHistory,
    staleTime: 1000 * 30,
  });
};

export const useSessionDetail = (id: string) => {
  return useQuery<WorkoutSession, Error>({
    queryKey: ["session", id],
    queryFn: () => sessionService.getSessionById(id),
    enabled: Boolean(id),
  });
};

export const useSaveSession = (workoutId: string, onSuccessCallback?: (saved: WorkoutSession) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SaveSessionPayload) => sessionService.saveSession(workoutId, payload),
    onSuccess: (savedSession) => {
      queryClient.invalidateQueries({ queryKey: SESSIONS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      queryClient.invalidateQueries({ queryKey: ["workout", workoutId] });
      if (onSuccessCallback) onSuccessCallback(savedSession);
    },
  });
};
