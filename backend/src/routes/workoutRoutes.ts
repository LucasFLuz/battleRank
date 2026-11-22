import { Router } from "express";
import { WorkoutController } from "../controllers/workoutController.js";
import { ExerciseController } from "../controllers/exerciseController.js";
import { SessionController } from "../controllers/sessionController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { createWorkoutSchema, updateWorkoutSchema } from "../validations/workoutSchema.js";
import { createExerciseSchema } from "../validations/exerciseSchema.js";
import { saveSessionSchema } from "../validations/sessionSchema.js";

const router = Router();
const workoutController = new WorkoutController();
const exerciseController = new ExerciseController();
const sessionController = new SessionController();

// Rotas de Treinos (AC1)
router.get("/", workoutController.list);
router.post("/", validateRequest(createWorkoutSchema), workoutController.create);
router.get("/:id", workoutController.getById);
router.put("/:id", validateRequest(updateWorkoutSchema), workoutController.update);
router.delete("/:id", workoutController.delete);

// Rotas de Exercícios do Treino (AC2)
router.get("/:workoutId/exercises", exerciseController.listByWorkout);
router.post("/:workoutId/exercises", validateRequest(createExerciseSchema), exerciseController.create);

// Rotas de Execução / Sessão do Treino (AC2)
router.post("/:workoutId/sessions", validateRequest(saveSessionSchema), sessionController.save);

export { router as workoutRoutes };
