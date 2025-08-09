import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { jwtSecret } from './config';

export interface AuthRequest extends Request {
  user?: JwtPayload | string | any;
}

export function authMiddleware(requiredRoles: string[] = []) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;

      if (requiredRoles.length && !requiredRoles.includes((decoded as any).role)) {
        return res.status(403).json({ error: 'Forbidden: insufficient role' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}
