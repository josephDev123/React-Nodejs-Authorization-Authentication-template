import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repository/UserRepo";
import {
  isEmailAlreadyUsed,
  isPasswordAlreadyTaken,
} from "../utils/comparePassword";
import { registercredentialValidation } from "../utils/authDataValidation";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";

export class UserService {
  constructor(private readonly UserRepository: UserRepository) {
    this.UserRepository;
  }
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password } = req.body;

      // const hashedPassword = await hashPassword(password);
      // const isPasswordAlreadyUsed = await isPasswordAlreadyTaken(password);
      const isEmailUsed = await isEmailAlreadyUsed(email);

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

      if (isEmailUsed === false) {
        return await this.UserRepository.create(email, name, password);
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
}
