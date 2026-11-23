import { Request, Response, NextFunction } from "express";
import { SessionService } from "../services/sessionService.js";
import { SaveSessionDTO } from "../types/session.js";
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

export class SessionController {
  constructor(private readonly sessionService: SessionService = new SessionService()) {}

  save = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const { workoutId } = req.params;
      const payload: SaveSessionDTO = req.body;
      const session = await this.sessionService.finishSession(workoutId, userId, payload);
      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const history = await this.sessionService.listHistory(userId);
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = getUserId(req);
      const { id } = req.params;
      const session = await this.sessionService.getSessionById(id, userId);
      res.status(200).json(session);
    } catch (error) {
      next(error);
    }
  };
}
