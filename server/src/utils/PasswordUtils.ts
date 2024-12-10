import bcrypt, { genSalt } from "bcrypt";
import { CustomError } from "../errors/CustomError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
export class PasswordUtils {
  static async hashPassword(password: string) {
    const saltRounds = await genSalt(10);
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new UnauthorizedError("Error Hashing Password");
    }
  }
  static async comparePassword(plainPassword: string, hashedPassword: string) {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
      throw new UnauthorizedError("Error comparing passwords");
    }
  }
}
