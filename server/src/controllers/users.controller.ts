import { Request, Response } from "express";
import { asyncHanlder } from "../utils/async-handler";
import { UserModel } from "../models/user.model";
import { CustomError } from "../errors/CustomError";
import { PasswordUtils } from "../utils/PasswordUtils";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { JwtService } from "../utils/JwtService";

export const signUpController = asyncHanlder(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await PasswordUtils.hashPassword(password);
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    if (!user) {
      throw new BadRequestError("Cannot create user");
    }
    const data = await UserModel.findById(user._id, { password: 0 });
    return res.status(201).json({ user: data });
  }
);
export const loginController = asyncHanlder(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new NotFoundError(`User with ${email} not found! `);
    }

    const isMatch = await PasswordUtils.comparePassword(
      password,
      user.password
    );

    if (!isMatch) {
      throw new UnauthorizedError("Invalid email / password");
    }

    const token = JwtService.generateToken({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }
);
