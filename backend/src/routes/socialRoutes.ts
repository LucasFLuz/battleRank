import { Router } from "express";
import { SocialController } from "../controllers/socialController.js";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated.js";

const router = Router();
const socialController = new SocialController();

// Rotas protegidas
router.use(ensureAuthenticated);

// PF-03: Rankings / Leaderboard
router.get("/rankings", socialController.getRankings);

// PF-02: Feed Social
router.get("/feed", socialController.getFeed);
router.post("/feed/:sessionId/like", socialController.toggleLike);
router.post("/feed/:sessionId/comments", socialController.addComment);

// PF-01: Atletas e Seguidores
router.get("/athletes", socialController.getAthletes);
router.post("/athletes/:athleteId/follow", socialController.toggleFollow);

export { router as socialRoutes };
