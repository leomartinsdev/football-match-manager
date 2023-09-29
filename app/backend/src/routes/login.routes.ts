import { Request, Router, Response } from 'express';
import UserController from '../controller/UserController';
import Validations from '../middlewares/login.middleware';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.verifyLogin(req, res),
);

export default router;
