import { Request, Response } from "express";
import { asyncHanlder } from "../utils/async-handler";
import { UserModel } from "../models/user.model";
import { CustomError } from "../utils/CustomError";

export const signUpController = asyncHanlder(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });
    if (!user) {
      throw new CustomError("Cannot create user", 500);
    }
    const data = await UserModel.findById(user._id, { password: 0 });
    return res.status(201).json({ user: data });
  }
);

const loginController = asyncHanlder(async (req: Request, res: Response) => {});
