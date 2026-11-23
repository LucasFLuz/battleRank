import { Request, Response, NextFunction } from "express";
import { ExerciseService } from "../services/exerciseService.js";
import { CreateExerciseDTO, UpdateExerciseDTO } from "../types/exercise.js";
import { AuthenticatedRequest } from "../middlewares/ensureAuthenticated.js";

const DEV_USER_ID = "00000000-0000-0000-0000-000000000001";

function getUserId(req: Request): string {
  return (
    (req as AuthenticatedRequest).userId ||
    (req.headers["x-user-id"] as string) ||
    (req.query.userId as string) ||
    DEV_USER_ID
  );
}

export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService = new ExerciseService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const { workoutId } = req.params;
      const payload: CreateExerciseDTO = req.body;
      const exercise = await this.exerciseService.createExercise(workoutId, userId, payload);
      res.status(201).json(exercise);
    } catch (error) {
      next(error);
    }
  };

  listByWorkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const { workoutId } = req.params;
      const exercises = await this.exerciseService.listExercisesByWorkout(workoutId, userId);
      res.status(200).json(exercises);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      const payload: UpdateExerciseDTO = req.body;
      const updated = await this.exerciseService.updateExercise(id, userId, payload);
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      await this.exerciseService.deleteExercise(id, userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
