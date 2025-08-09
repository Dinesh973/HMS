import { Request, Response, NextFunction } from "express";
import { verifyJwt, JwtPayload } from "../utils/jwt.util";

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token missing" });

  const payload = verifyJwt(token);

  if (!payload) return res.status(403).json({ message: "Invalid or expired token" });

  req.user = payload;
  next();
}
