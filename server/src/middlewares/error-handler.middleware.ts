// import { Request, Response, NextFunction } from "express";
// import { CustomError } from "../utils/CustomError";

// export const errorHandler = (
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (err instanceof CustomError) {
//     return res.status(err.statusCode).json({
//       success: false,
//       message: err.message,
//     });
//   }

//   console.error(err);
//   return res.status(500).json({
//     success: false,
//     message: "Something went wrong. Please try again later.",
//   });
// };

import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      erros: [
        {
          success: false,
          message: err.message,
        },
      ],
    });
    return;
  }
  res
    .status(500)
    .json({ errors: [{ status: 500, message: "Something went wrong" }] });
};
