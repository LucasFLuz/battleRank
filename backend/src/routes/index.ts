import { Router } from "express";
import { workoutRoutes } from "./workoutRoutes.js";
import { exerciseRoutes } from "./exerciseRoutes.js";
import { sessionRoutes } from "./sessionRoutes.js";

const routes = Router();

// Rota de Health Check
routes.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// AC1: Entidade de Treinos
routes.use("/workouts", workoutRoutes);

// AC2: Exercícios individuais (PUT/DELETE) e Histórico de Sessões
routes.use("/exercises", exerciseRoutes);
routes.use("/sessions", sessionRoutes);

export { routes };
