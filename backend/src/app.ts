import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app: Application = express();

// Middlewares essenciais
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Montagem das rotas
app.use(routes);

// Middleware global de erros (deve ser o último)
app.use(errorHandler);

export { app };
