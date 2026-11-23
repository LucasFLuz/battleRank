import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workoutService } from "../services/workoutService";
import { CreateWorkoutFormData, Workout } from "../types/workout";
import { useAuth } from "../context/AuthContext";

export const useWorkouts = () => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery<Workout[], Error>({
    queryKey: ["workouts", userId],
    queryFn: workoutService.getWorkouts,
    enabled: Boolean(userId),
    staleTime: 0,
    retry: false,
  });
};

export const useWorkout = (id: string) => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery<Workout, Error>({
    queryKey: ["workout", id, userId],
    queryFn: () => workoutService.getWorkoutById(id),
    enabled: Boolean(id) && Boolean(userId),
    staleTime: 0,
  });
};

export const useCreateWorkout = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation({
    mutationFn: (data: CreateWorkoutFormData) => workoutService.createWorkout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", userId] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};

export const useDeleteWorkout = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id;

  return useMutation({
    mutationFn: (id: string) => workoutService.deleteWorkout(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts", userId] });
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
