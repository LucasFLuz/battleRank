import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { exerciseService } from "../services/exerciseService";
import { CreateExerciseFormData, Exercise } from "../types/exercise";

export const EXERCISES_QUERY_KEY = (workoutId: string) => ["exercises", workoutId];

export const useExercises = (workoutId: string) => {
  return useQuery<Exercise[], Error>({
    queryKey: EXERCISES_QUERY_KEY(workoutId),
    queryFn: () => exerciseService.getExercisesByWorkout(workoutId),
    enabled: Boolean(workoutId),
  });
};

export const useCreateExercise = (workoutId: string, onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateExerciseFormData) => exerciseService.createExercise(workoutId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXERCISES_QUERY_KEY(workoutId) });
      queryClient.invalidateQueries({ queryKey: ["workout", workoutId] });
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};

export const useUpdateExercise = (workoutId: string, onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateExerciseFormData> }) =>
      exerciseService.updateExercise(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXERCISES_QUERY_KEY(workoutId) });
      queryClient.invalidateQueries({ queryKey: ["workout", workoutId] });
      if (onSuccessCallback) onSuccessCallback();
    },
  });
};

export const useDeleteExercise = (workoutId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => exerciseService.deleteExercise(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXERCISES_QUERY_KEY(workoutId) });
      queryClient.invalidateQueries({ queryKey: ["workout", workoutId] });
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
};
