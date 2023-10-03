import { Router } from 'express';
import teamRouter from './team.routes';
import loginRouter from './login.routes';
import matchesRouter from './match.routes';
import leaderboardRouter from './leaderboard.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
