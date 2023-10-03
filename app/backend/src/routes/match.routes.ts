import { Request, Router, Response } from 'express';
import MatchController from '../controller/MatchController';
import TokenAuth from '../middlewares/auth.middlware';
import MatchValidations from '../middlewares/match.middleware';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  TokenAuth.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch(
  '/:id',
  TokenAuth.validateToken,
  (req: Request, res: Response) => matchController.updateMatch(req, res),
);

router.post(
  '/',
  TokenAuth.validateToken,
  MatchValidations.validateTeams,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
