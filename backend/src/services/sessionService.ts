import { SessionRepository } from "../repositories/sessionRepository.js";
import { WorkoutRepository } from "../repositories/workoutRepository.js";
import { SaveSessionDTO, WorkoutSession } from "../types/session.js";

export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository = new SessionRepository(),
    private readonly workoutRepository: WorkoutRepository = new WorkoutRepository()
  ) {}

  async finishSession(workoutId: string, data: SaveSessionDTO): Promise<WorkoutSession> {
    const workout = await this.workoutRepository.findById(workoutId);
    if (!workout) {
      const err = new Error(`Treino com ID ${workoutId} não foi encontrado.`);
      (err as unknown as { statusCode: number }).statusCode = 404;
      throw err;
    }

    // Calcula volume total levantado: soma de (peso * repeticoes) para todas as series completadas
    const calculatedVolume = data.logs.reduce((acc, log) => {
      if (log.isCompleted !== false) {
        return acc + log.weight * log.repetitions;
      }
      return acc;
    }, 0);

    return await this.sessionRepository.saveSession(workoutId, data, calculatedVolume);
  }

  async listHistory(): Promise<WorkoutSession[]> {
    return await this.sessionRepository.findAll();
  }

  async getSessionById(id: string): Promise<WorkoutSession> {
    const session = await this.sessionRepository.findById(id);
    if (!session) {
      const err = new Error(`Sessão com ID ${id} não foi encontrada.`);
      (err as unknown as { statusCode: number }).statusCode = 404;
      throw err;
    }

    return session;
  }
}
