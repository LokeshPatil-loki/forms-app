import bcrypt, { genSalt } from "bcrypt";
import { CustomError } from "./CustomError";
export class PasswordUtils {
  static async hashPassword(password: string) {
    const saltRounds = await genSalt(10);
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new CustomError("Error Hashing Password", 401);
    }
  }
  static async comparePassword(plainPassword: string, hashedPassword: string) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new CustomError("Error comparing passwords", 401);
    }
  }
}
