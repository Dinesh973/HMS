import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (user.role !== role) {
      return res.status(403).json({ message: 'Forbidden: Insufficient Role' });
    }
    next();
  };
};