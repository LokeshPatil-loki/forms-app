import { CustomError } from "./CustomError";

export class ServiceUnavailableError extends CustomError {
  constructor(message: string = "Service Unavailable") {
    super(message, 503);
  }
}
