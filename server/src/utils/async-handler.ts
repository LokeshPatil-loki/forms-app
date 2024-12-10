import { error } from "console";
import { NextFunction, Request, Response } from "express";

type RequestHanlder = (req: Request, res: Response, next?: NextFunction) => {};

export const asyncHanlder = (requestHanlder: RequestHanlder) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHanlder(req, res, next)).catch((error) =>
      next(error)
    );
  };
};
