import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma.js";
import { AuthenticatedRequest } from "../middlewares/ensureAuthenticated.js";

export class SocialController {
  // PF-03: Leaderboard / Rankings de Atletas
  getRankings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          xp: true,
          workouts: {
            select: {
              sessions: {
                select: {
                  totalVolume: true,
                  durationSeconds: true,
                },
              },
            },
          },
        },
      });

      // Calcula métricas consolidadas
      const leaderboard = users.map((u) => {
        const allSessions = u.workouts.flatMap((w) => w.sessions);
        const totalVolume = allSessions.reduce((acc, s) => acc + s.totalVolume, 0);
        const totalSessions = allSessions.length;

        // Se o usuário ainda não tiver XP salvo, calculamos dinamicamente
        const dynamicXp =
          u.xp > 0
            ? u.xp
            : Math.round(totalVolume * 0.1) + totalSessions * 100;

        let division = "Bronze";
        if (dynamicXp >= 3500) division = "Diamante";
        else if (dynamicXp >= 1500) division = "Ouro";
        else if (dynamicXp >= 500) division = "Prata";

        return {
          id: u.id,
          name: u.name,
          email: u.email,
          avatarUrl: u.avatarUrl,
          xp: dynamicXp,
          division,
          totalVolume,
          totalSessions,
        };
      });

      // Ordena por pontuação (XP) decrescente
      leaderboard.sort((a, b) => b.xp - a.xp);

      // Adiciona a posição do ranking (1º, 2º, 3º...)
      const ranked = leaderboard.map((item, index) => ({
        rank: index + 1,
        ...item,
      }));

      res.status(200).json(ranked);
    } catch (error) {
      next(error);
    }
  };

  // PF-02: Feed Social de Treinos
  getFeed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const currentUserId = (req as AuthenticatedRequest).userId;

      const sessions = await prisma.workoutSession.findMany({
        take: 30,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          workout: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatarUrl: true,
                  xp: true,
                },
              },
            },
          },
          logs: {
            include: {
              exercise: {
                select: {
                  name: true,
                  modality: true,
                },
              },
            },
            orderBy: {
              setNumber: "asc",
            },
          },
          likes: {
            select: {
              userId: true,
            },
          },
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatarUrl: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      const formattedFeed = sessions.map((session) => {
        const isLikedByMe = currentUserId
          ? session.likes.some((l) => l.userId === currentUserId)
          : false;

        return {
          id: session.id,
          startedAt: session.startedAt,
          endedAt: session.endedAt,
          durationSeconds: session.durationSeconds,
          totalVolume: session.totalVolume,
          notes: session.notes,
          createdAt: session.createdAt,
          athlete: session.workout.user,
          workoutName: session.workout.name,
          workoutGoal: session.workout.goal,
          workoutLevel: session.workout.level,
          logs: session.logs,
          likesCount: session.likes.length,
          isLikedByMe,
          comments: session.comments,
        };
      });

      res.status(200).json(formattedFeed);
    } catch (error) {
      next(error);
    }
  };

  // PF-02: Curtir / Descurtir Treino ("Fist Bump / Apoio 👊")
  toggleLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as AuthenticatedRequest).userId!;
      const { sessionId } = req.params;

      const existingLike = await prisma.sessionLike.findUnique({
        where: {
          sessionId_userId: {
            sessionId,
            userId,
          },
        },
      });

      if (existingLike) {
        await prisma.sessionLike.delete({
          where: { id: existingLike.id },
        });
        res.status(200).json({ liked: false });
      } else {
        await prisma.sessionLike.create({
          data: {
            sessionId,
            userId,
          },
        });
        res.status(201).json({ liked: true });
      }
    } catch (error) {
      next(error);
    }
  };

  // PF-02: Comentar em Treino
  addComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as AuthenticatedRequest).userId!;
      const { sessionId } = req.params;
      const { content } = req.body;

      if (!content || !content.trim()) {
        res.status(400).json({ error: "O comentário não pode ser vazio." });
        return;
      }

      const comment = await prisma.sessionComment.create({
        data: {
          sessionId,
          userId,
          content: content.trim(),
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      });

      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  };

  // PF-01: Listar / Buscar Atletas
  getAthletes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const currentUserId = (req as AuthenticatedRequest).userId;
      const { search } = req.query;

      const athletes = await prisma.user.findMany({
        where: search
          ? {
              OR: [
                { name: { contains: String(search), mode: "insensitive" } },
                { email: { contains: String(search), mode: "insensitive" } },
              ],
            }
          : undefined,
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
          xp: true,
          followers: {
            select: { followerId: true },
          },
          following: {
            select: { followingId: true },
          },
        },
      });

      const formatted = athletes.map((a) => ({
        id: a.id,
        name: a.name,
        email: a.email,
        avatarUrl: a.avatarUrl,
        xp: a.xp,
        followersCount: a.followers.length,
        followingCount: a.following.length,
        isFollowing: currentUserId
          ? a.followers.some((f) => f.followerId === currentUserId)
          : false,
      }));

      res.status(200).json(formatted);
    } catch (error) {
      next(error);
    }
  };

  // PF-01: Seguir / Deixar de Seguir Atleta
  toggleFollow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const followerId = (req as AuthenticatedRequest).userId!;
      const { athleteId: followingId } = req.params;

      if (followerId === followingId) {
        res.status(400).json({ error: "Você não pode seguir a si mesmo." });
        return;
      }

      const existingFollow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId,
            followingId,
          },
        },
      });

      if (existingFollow) {
        await prisma.follow.delete({
          where: { id: existingFollow.id },
        });
        res.status(200).json({ following: false });
      } else {
        await prisma.follow.create({
          data: {
            followerId,
            followingId,
          },
        });
        res.status(201).json({ following: true });
      }
    } catch (error) {
      next(error);
    }
  };
}
