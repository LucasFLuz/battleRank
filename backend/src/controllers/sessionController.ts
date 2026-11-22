import { Request, Response, NextFunction } from "express";
import { SessionService } from "../services/sessionService.js";
import { SaveSessionDTO } from "../types/session.js";

export class SessionController {
  constructor(private readonly sessionService: SessionService = new SessionService()) {}

  save = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { workoutId } = req.params;
      const payload: SaveSessionDTO = req.body;
      const session = await this.sessionService.finishSession(workoutId, payload);
      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const history = await this.sessionService.listHistory();
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const session = await this.sessionService.getSessionById(id);
      res.status(200).json(session);
    } catch (error) {
      next(error);
    }
  };
}
