import { Request, Router, Response } from 'express';
import UserController from '../controller/UserController';

const userController = new UserController();

const router = Router();

router.post('/', (req: Request, res: Response) => userController.verifyLogin(req, res));

export default router;
