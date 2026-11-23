import { Router } from "express";
import { ExerciseController } from "../controllers/exerciseController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";
import { updateExerciseSchema } from "../validations/exerciseSchema.js";

const router = Router();
const exerciseController = new ExerciseController();

// Protege rotas de edição/exclusão de exercícios com autenticação JWT (AC3)
router.use(ensureAuthenticated);

// PUT /exercises/:id - Atualiza exercício
router.put("/:id", validateRequest(updateExerciseSchema), exerciseController.update);

// DELETE /exercises/:id - Remove exercício
router.delete("/:id", exerciseController.delete);

export { router as exerciseRoutes };
