import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workoutService } from "../services/workoutService";
import { CreateWorkoutFormData, Workout } from "../types/workout";

export const WORKOUTS_QUERY_KEY = ["workouts"];

export const useWorkouts = () => {
  return useQuery<Workout[], Error>({
    queryKey: WORKOUTS_QUERY_KEY,
    queryFn: workoutService.getWorkouts,
    staleTime: 1000 * 60, // 1 minuto de cache fresco
  });
};

export const useCreateWorkout = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkoutFormData) => workoutService.createWorkout(data),
    onSuccess: () => {
      // Invalidação e re-busca automática sem recarregar a página
      queryClient.invalidateQueries({ queryKey: WORKOUTS_QUERY_KEY });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
