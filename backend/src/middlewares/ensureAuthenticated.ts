import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "battlerank_super_secret_jwt_key_2026";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export function ensureAuthenticated(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token de autenticação não fornecido." });
    return;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).json({ error: "Formato de token inválido." });
    return;
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
    req.userId = decoded.sub;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido ou expirado." });
  }
}
