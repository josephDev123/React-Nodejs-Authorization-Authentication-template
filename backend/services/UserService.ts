import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/UserRepo";
import {
  isEmailAlreadyUsed,
  isPasswordAlreadyTaken,
} from "../utils/comparePassword";
import { registercredentialValidation } from "../utils/authDataValidation";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";
import { createToken } from "../utils/createToken";
import { generateRandomPIN } from "../utils/generateRandomPin";
import { sendMail } from "../utils/sendMail";

export class UserService {
  constructor(private readonly UserRepository: UserRepository) {
    this.UserRepository;
  }
  async isUserRegistered(email: string) {
    const user = await this.UserRepository.findByEmail(email);
    return user !== null;
  }
  //Register user service ---------------------------------
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password } = req.body;
      const userExists = await this.isUserRegistered(email);
      if (userExists) {
        throw new GlobalErrorHandler(
          "AuthError",
          "Email already taken",
          400,
          true,
          "error"
        );
      }

      const validationResult = await registercredentialValidation(
        name,
        email,
        password
      );

      if (validationResult.error) {
        const error = new GlobalErrorHandler(
          "ValidateError",
          validationResult.error.message,
          400,
          true,
          "error"
        );
        next(error);
        return;
      }

      if (userExists === false) {
        const result = await this.UserRepository.create(email, name, password);
        if (result && result.email) {
          return {
            error: false,
            showMessage: true,
            message: "New user created",
          };
        }
      }
    } catch (errorObject: any) {
      console.log(
        errorObject.name,
        errorObject.operational,
        errorObject.message
      );
      if (errorObject.name == "AuthError" && errorObject.operational) {
        const error = new GlobalErrorHandler(
          errorObject.name,
          errorObject.message,
          errorObject.statusCode,
          errorObject.operational,
          errorObject.type
        );
        return next(error);
      } else {
        const error = new GlobalErrorHandler(
          errorObject.name,
          "Something went wrong",
          500,
          false,
          "error"
        );
        return next(error);
      }
    }
  }

  //login user service ---------------------------------
  async loginService(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body;
    const userExists = await this.isUserRegistered(email);
    const validationResult = await registercredentialValidation(
      name,
      email,
      password
    );

    if (validationResult.error) {
      const error = new GlobalErrorHandler(
        "ValidateError",
        validationResult.error.message,
        400,
        true,
        "error"
      );
      next(error);
      return;
    }

    if (!userExists) {
      throw new GlobalErrorHandler(
        "AuthError",
        "The email is not yet registered",
        400,
        true,
        "error"
      );
    }
    const token = await createToken(email);
    const otp = generateRandomPIN();
    const payload = { email: email, otp: otp };
    const updateUserOtpStatus = await this.UserRepository.updateOne(
      email,
      "otp",
      otp
    );
    if (updateUserOtpStatus && !updateUserOtpStatus.acknowledged) {
      const error = new GlobalErrorHandler(
        "EmailOptError",
        "Otp Email fail to send",
        500,
        true,
        "error"
      );
      return next(error);
    }
    // await sendMail(payload);
    const user = await this.UserRepository.findByEmail(email);
    res.cookie("token", token, {
      maxAge: 300000,
      secure: true,
      httpOnly: false,
    });
    res.cookie("user", JSON.stringify(user));
    return {
      success: true,
      showMessage: false,
      message: "login successful",
    };
  }
}
