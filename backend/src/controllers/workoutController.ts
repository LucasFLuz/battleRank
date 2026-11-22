import { Request, Response, NextFunction } from "express";
import { WorkoutService } from "../services/workoutService.js";
import { CreateWorkoutDTO, UpdateWorkoutDTO } from "../types/workout.js";

export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService = new WorkoutService()) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload: CreateWorkoutDTO = req.body;
      const workout = await this.workoutService.createWorkout(payload);
      res.status(201).json(workout);
    } catch (error) {
      next(error);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const workouts = await this.workoutService.listWorkouts();
      res.status(200).json(workouts);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const workout = await this.workoutService.getWorkoutById(id);
      res.status(200).json(workout);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const payload: UpdateWorkoutDTO = req.body;
      const workout = await this.workoutService.updateWorkout(id, payload);
      res.status(200).json(workout);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.workoutService.deleteWorkout(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
