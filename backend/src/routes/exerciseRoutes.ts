import { Router } from "express";
import { ExerciseController } from "../controllers/exerciseController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { updateExerciseSchema } from "../validations/exerciseSchema.js";

const router = Router();
const exerciseController = new ExerciseController();

// PUT /exercises/:id - Atualiza exercício
router.put("/:id", validateRequest(updateExerciseSchema), exerciseController.update);

// DELETE /exercises/:id - Remove exercício
router.delete("/:id", exerciseController.delete);

export { router as exerciseRoutes };
