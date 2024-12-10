import { CustomError } from "./CustomError";

export class RequestTimeoutError extends CustomError {
  constructor(message: string = "Request Timeout") {
    super(message, 408);
  }
}
