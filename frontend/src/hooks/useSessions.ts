import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionService } from "../services/sessionService";
import { SaveSessionPayload, WorkoutSession } from "../types/session";
import { useAuth } from "../context/AuthContext";

export const useHistory = () => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery<WorkoutSession[], Error>({
    queryKey: ["sessions", userId],
    queryFn: sessionService.getHistory,
    enabled: Boolean(userId),
    staleTime: 0,
    retry: false,
  });
};

export const useSessionDetail = (id: string) => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery<WorkoutSession, Error>({
    queryKey: ["session", id, userId],
    queryFn: () => sessionService.getSessionById(id),
    enabled: Boolean(id) && Boolean(userId),
    staleTime: 0,
  });
};

export const useSaveSession = (workoutId: string, onSuccessCallback?: (saved: WorkoutSession) => void) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation({
    mutationFn: (payload: SaveSessionPayload) => sessionService.saveSession(workoutId, payload),
    onSuccess: (savedSession) => {
      queryClient.invalidateQueries({ queryKey: ["sessions", userId] });
      queryClient.invalidateQueries({ queryKey: ["workouts", userId] });
      queryClient.invalidateQueries({ queryKey: ["workout", workoutId, userId] });
      if (onSuccessCallback) onSuccessCallback(savedSession);
    },
  });
};
