import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { MongoServerError } from "mongodb";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    res.status(400).json({ errors: err.errors });
  } else if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      errors: [
        {
          success: false,
          message: err.message,
        },
      ],
    });
  } else if (err instanceof MongoServerError) {
    const fields = Object.keys(err.keyValue).join(", ");
    if (err.code === 11000) {
      res.status(409).json({
        status: 409,
        message: `Duplicate value for fields: ${fields}`,
      });
    }
  } else {
    res.status(500).json({
      errors: [{ status: 500, message: err.message || "something went wrong" }],
    });
  }
};
