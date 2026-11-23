import { Router } from "express";
import { workoutRoutes } from "./workoutRoutes.js";
import { exerciseRoutes } from "./exerciseRoutes.js";
import { sessionRoutes } from "./sessionRoutes.js";
import { authRoutes } from "./authRoutes.js";
import { socialRoutes } from "./socialRoutes.js";

const routes = Router();

// Rota de Health Check
routes.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Autenticação (AC3)
routes.use("/auth", authRoutes);

// Treinos e Exercícios (AC1 e AC2)
routes.use("/workouts", workoutRoutes);
routes.use("/exercises", exerciseRoutes);
routes.use("/sessions", sessionRoutes);

// Prova Final (PF): Feed Social, Rankings e Atletas
routes.use("/social", socialRoutes);

export { routes };
