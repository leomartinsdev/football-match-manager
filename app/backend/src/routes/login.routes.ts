import { Request, Router, Response } from 'express';
import UserController from '../controller/UserController';
import Validations from '../middlewares/login.middleware';
import TokenAuth from '../middlewares/auth.middlware';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => userController.verifyLogin(req, res),
);

router.get('/role', TokenAuth.validateToken, userController.userRole);

export default router;
