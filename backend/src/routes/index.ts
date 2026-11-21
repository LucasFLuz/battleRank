import { Router } from "express";
import { workoutRoutes } from "./workoutRoutes.js";

const routes = Router();

// Rota de Health Check
routes.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// AC1: Entidade de Treinos
routes.use("/workouts", workoutRoutes);

// Rotas preparadas para as próximas ACs:
// routes.use("/users", userRoutes);
// routes.use("/exercises", exerciseRoutes);
// routes.use("/rankings", rankingRoutes);

export { routes };
