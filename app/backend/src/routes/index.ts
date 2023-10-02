import { Router } from 'express';
import teamRouter from './team.routes';
import loginRouter from './login.routes';
import matchesRouter from './match.routes';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchesRouter);

export default router;
