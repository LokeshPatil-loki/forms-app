import { Request, Response } from "express";
import { asyncHanlder } from "../utils/AsyncHandler";
import { UserModel } from "../models/user.model";
import { CustomError } from "../errors/CustomError";
import { PasswordUtils } from "../utils/PasswordUtils";
import { BadRequestError } from "../errors/BadRequestError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { NotFoundError } from "../errors/NotFoundError";
import { JwtService } from "../utils/JwtService";
import { createApiResponse } from "../utils/ApiResponse";
import { ErrorMessages } from "../utils/ErrorMessages";
export const signUpController = asyncHanlder(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestError(ErrorMessages.EMAIL_EXISTS);
    }
    const hashedPassword = await PasswordUtils.hashPassword(password);
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    if (!user) {
      throw new BadRequestError(ErrorMessages.USER_CREATE_FAILED);
    }
    const data = await UserModel.findById(user._id, { password: 0 });
    return res
      .status(201)
      .json(
        createApiResponse(true, "User registered successfully", { user: data })
      );
  }
);
export const loginController = asyncHanlder(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new NotFoundError(ErrorMessages.USER_NOT_FOUND);
    }

    const isMatch = await PasswordUtils.comparePassword(
      password,
      user.password
    );

    if (!isMatch) {
      throw new UnauthorizedError(ErrorMessages.INVALID_CREDENTIALS);
    }

    const token = JwtService.generateToken({
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    return res
      .status(200)
      .json(createApiResponse(true, "Login successful", { token, user }));
  }
);
