import { NextFunction, Request, Response } from 'express';
import jwt from '../utils/jwt.util';

export default class TokenAuth {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token);
      req.body.role = decoded.role;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
