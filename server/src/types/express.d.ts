// express.d.ts
import * as express from "express";
import { UserPayload } from "./user-payload";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; // You can replace `any` with the actual type of the user payload
    }
  }
}
