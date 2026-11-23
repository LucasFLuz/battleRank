import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app: Application = express();

// Middlewares essenciais
// CORS: suporta origens do .env e dinamicamente qualquer localhost/rede local
const corsOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Requisições sem origin (mobile, curl, SSR)
      if (!origin) return callback(null, true);

      // Sempre aceitar localhost, 127.0.0.1 e redes locais
      if (
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        origin.includes("192.168.") ||
        origin.includes("100.") ||
        origin.includes("10.") ||
        corsOrigins.includes(origin) ||
        corsOrigins.includes("*")
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-user-id"],
    credentials: true,
  })
);
app.use(express.json());

// Montagem das rotas
app.use(routes);

// Middleware global de erros (deve ser o último)
app.use(errorHandler);

export { app };
