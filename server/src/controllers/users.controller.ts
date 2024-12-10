import { Request, Response } from "express";
import { asyncHanlder } from "../utils/async-handler";

export const signUpController = asyncHanlder((req: Request, res: Response) => {
  return res.json(req.body);
});
