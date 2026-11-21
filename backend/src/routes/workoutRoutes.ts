import { Router } from "express";
import { WorkoutController } from "../controllers/workoutController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createWorkoutSchema } from "../validations/workoutSchema.js";

const router = Router();
const workoutController = new WorkoutController();

// POST /workouts - Cadastra novo treino com validação Zod
router.post("/", validateRequest(createWorkoutSchema), workoutController.create);

// GET /workouts - Lista todos os treinos cadastrados
router.get("/", workoutController.list);

export { router as workoutRoutes };
