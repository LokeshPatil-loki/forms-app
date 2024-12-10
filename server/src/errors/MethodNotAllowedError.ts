import { CustomError } from "./CustomError";

export class MethodNotAllowedError extends CustomError {
  constructor(message: string = "Method Not Allowed") {
    super(message, 405);
  }
}
