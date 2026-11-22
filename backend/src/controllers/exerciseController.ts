import { Request, Response, NextFunction } from "express";
import { ExerciseService } from "../services/exerciseService.js";
import { CreateExerciseDTO, UpdateExerciseDTO } from "../types/exercise.js";

export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService = new ExerciseService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { workoutId } = req.params;
      const payload: CreateExerciseDTO = req.body;
      const exercise = await this.exerciseService.createExercise(workoutId, payload);
      res.status(201).json(exercise);
    } catch (error) {
      next(error);
    }
  };

  listByWorkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { workoutId } = req.params;
      const exercises = await this.exerciseService.listExercisesByWorkout(workoutId);
      res.status(200).json(exercises);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const payload: UpdateExerciseDTO = req.body;
      const updated = await this.exerciseService.updateExercise(id, payload);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.exerciseService.deleteExercise(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
