import { CustomError } from "./CustomError";

export class BadGatewayError extends CustomError {
  constructor(message: string = "Bad Gateway") {
    super(message, 502);
  }
}
