import { Router } from "express";
import { SessionController } from "../controllers/sessionController.js";

const router = Router();
const sessionController = new SessionController();

// GET /sessions - Lista histórico cronológico de sessões de treino
router.get("/", sessionController.list);

// GET /sessions/:id - Detalhes de uma sessão com logs e recordes
router.get("/:id", sessionController.getById);

export { router as sessionRoutes };
