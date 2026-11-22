import { prisma } from "../config/prisma.js";
import { SaveSessionDTO, WorkoutSession } from "../types/session.js";

export class SessionRepository {
  async saveSession(workoutId: string, data: SaveSessionDTO, calculatedVolume: number): Promise<WorkoutSession> {
    // Processa cada log e verifica se é PR (Personal Record)
    const processedLogs = await Promise.all(
      data.logs.map(async (log) => {
        // Busca a carga máxima anterior em logs desse mesmo exercício
        const maxPreviousLog = await prisma.exerciseLog.findFirst({
          where: {
            exerciseId: log.exerciseId,
            isCompleted: true,
          },
          orderBy: {
            weight: "desc",
          },
        });

        const previousMaxWeight = maxPreviousLog ? maxPreviousLog.weight : 0;
        // É PR se o peso for maior que 0 e superar o recorde histórico anterior
        const isPersonalRecord = log.weight > 0 && log.weight > previousMaxWeight;

        return {
          exerciseId: log.exerciseId,
          setNumber: log.setNumber,
          weight: log.weight,
          repetitions: log.repetitions,
          isCompleted: log.isCompleted ?? true,
          isPersonalRecord,
        };
      })
    );

    const created = await prisma.workoutSession.create({
      data: {
        workoutId,
        startedAt: data.startedAt ? new Date(data.startedAt) : new Date(),
        endedAt: data.endedAt ? new Date(data.endedAt) : new Date(),
        durationSeconds: data.durationSeconds,
        totalVolume: calculatedVolume,
        notes: data.notes ?? null,
        logs: {
          create: processedLogs,
        },
      },
      include: {
        workout: {
          select: {
            id: true,
            name: true,
            goal: true,
            level: true,
          },
        },
        logs: {
          include: {
            exercise: {
              select: {
                id: true,
                name: true,
                modality: true,
              },
            },
          },
          orderBy: {
            setNumber: "asc",
          },
        },
      },
    });

    return created as WorkoutSession;
  }

  async findAll(): Promise<WorkoutSession[]> {
    const sessions = await prisma.workoutSession.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        workout: {
          select: {
            id: true,
            name: true,
            goal: true,
            level: true,
          },
        },
        logs: {
          include: {
            exercise: {
              select: {
                id: true,
                name: true,
                modality: true,
              },
            },
          },
          orderBy: {
            setNumber: "asc",
          },
        },
      },
    });

    return sessions as WorkoutSession[];
  }

  async findById(id: string): Promise<WorkoutSession | null> {
    const session = await prisma.workoutSession.findUnique({
      where: { id },
      include: {
        workout: {
          select: {
            id: true,
            name: true,
            goal: true,
            level: true,
          },
        },
        logs: {
          include: {
            exercise: {
              select: {
                id: true,
                name: true,
                modality: true,
              },
            },
          },
          orderBy: {
            setNumber: "asc",
          },
        },
      },
    });

    return session as WorkoutSession | null;
  }
}
