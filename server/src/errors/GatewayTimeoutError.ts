import { CustomError } from "./CustomError";

export class GatewayTimeoutError extends CustomError {
  constructor(message: string = "Gateway Timeout") {
    super(message, 504);
  }
}
