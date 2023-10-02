import { Request, Router, Response } from 'express';
import MatchController from '../controller/MatchController';
import TokenAuth from '../middlewares/auth.middlware';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  TokenAuth.validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

export default router;
