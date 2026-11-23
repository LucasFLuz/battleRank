import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "battlerank_super_secret_jwt_key_2026";

export class AuthController {
  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios." });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({ error: "A senha deve conter no mínimo 6 caracteres." });
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();

      const existingUser = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (existingUser) {
        res.status(409).json({ error: "Este e-mail já está cadastrado." });
        return;
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name: name.trim(),
          email: normalizedEmail,
          passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          createdAt: true,
        },
      });

      const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({
        user,
        token,
        message: "Conta criada com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "E-mail e senha são obrigatórios." });
        return;
      }

      const normalizedEmail = email.toLowerCase().trim();

      const user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });

      if (!user) {
        res.status(401).json({ error: "Credenciais inválidas. Verifique seu e-mail e senha." });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        res.status(401).json({ error: "Credenciais inválidas. Verifique seu e-mail e senha." });
        return;
      }

      const token = jwt.sign({ sub: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
        },
        token,
        message: "Login realizado com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  };

  me = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).json({ error: "Token não fornecido." });
        return;
      }

      const [, token] = authHeader.split(" ");
      const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };

      const user = await prisma.user.findUnique({
        where: { id: decoded.sub },
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          createdAt: true,
        },
      });

      if (!user) {
        res.status(404).json({ error: "Usuário não encontrado." });
        return;
      }

      res.status(200).json(user);
    } catch {
      res.status(401).json({ error: "Token inválido ou expirado." });
    }
  };
}
