import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { JwtService } from "../utils/JwtService";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("Invalid token");
    }

    const payload = JwtService.verifyToken(token);
    if (!payload) {
      throw new UnauthorizedError("Invalid token");
    }
    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
};
