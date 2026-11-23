import { Request, Response, NextFunction } from "express";
import { WorkoutService } from "../services/workoutService.js";
import { CreateWorkoutDTO, UpdateWorkoutDTO } from "../types/workout.js";
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

export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService = new WorkoutService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const payload: CreateWorkoutDTO = { ...req.body, userId };
      const workout = await this.workoutService.createWorkout(payload);
      res.status(201).json(workout);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const workouts = await this.workoutService.listWorkouts(userId);
      res.status(200).json(workouts);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      const workout = await this.workoutService.getWorkoutById(id, userId);
      res.status(200).json(workout);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      const payload: UpdateWorkoutDTO = req.body;
      const workout = await this.workoutService.updateWorkout(id, userId, payload);
      res.status(200).json(workout);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      await this.workoutService.deleteWorkout(id, userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
