import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workoutService } from "../services/workoutService";
import { CreateWorkoutFormData, Workout } from "../types/workout";

export const WORKOUTS_QUERY_KEY = ["workouts"];

export const useWorkouts = () => {
  return useQuery<Workout[], Error>({
    queryKey: WORKOUTS_QUERY_KEY,
    queryFn: workoutService.getWorkouts,
    staleTime: 1000 * 60,
  });
};

export const useWorkout = (id: string) => {
  return useQuery<Workout, Error>({
    queryKey: ["workout", id],
    queryFn: () => workoutService.getWorkoutById(id),
    enabled: Boolean(id),
  });
};

export const useCreateWorkout = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkoutFormData) => workoutService.createWorkout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKOUTS_QUERY_KEY });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteWorkout = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workoutService.deleteWorkout(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKOUTS_QUERY_KEY });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
