import { Router } from 'express';
import { getGames, addGame } from '../controllers/gamesControllers.js';
import { validateGame } from '../middlewares/validateGameMiddleware.js';

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", validateGame, addGame);

export default gamesRouter;