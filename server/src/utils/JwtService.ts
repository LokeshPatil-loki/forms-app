import { Types } from "mongoose";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { appConfig } from "../config/app.config";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { UserPayload } from "../types/user-payload";

export class JwtService {
  static generateToken(userData: UserPayload) {
    return jwt.sign(userData, appConfig.JWT_SECRET!);
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, appConfig.JWT_SECRET!);
    } catch (error) {
      throw new UnauthorizedError("Invalid JWT Token");
    }
  }
}
