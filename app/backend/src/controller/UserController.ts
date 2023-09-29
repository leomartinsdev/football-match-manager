import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) { }

  public async verifyLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const serviceResponse = await this.userService.verifyLogin({ email, password });

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  userRole = (req: Request, res: Response) => {
    res.status(200).json({ role: req.body.role });
  };
}
