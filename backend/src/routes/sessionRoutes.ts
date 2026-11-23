import { Router } from "express";
import { SessionController } from "../controllers/sessionController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const router = Router();
const sessionController = new SessionController();

// Protege todas as rotas de histórico com autenticação JWT (AC3)
router.use(ensureAuthenticated);

// GET /sessions - Lista histórico cronológico de sessões de treino do usuário logado
router.get("/", sessionController.list);

// GET /sessions/:id - Detalhes de uma sessão com logs e recordes
router.get("/:id", sessionController.getById);

export { router as sessionRoutes };
