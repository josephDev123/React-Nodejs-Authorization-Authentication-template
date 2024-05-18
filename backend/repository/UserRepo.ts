import { NextFunction } from "express";
import { UserModel } from "../models/Users";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";

export class UserRepository {
  async create(
    email: string,
    name: string,
    password: string
    // next: NextFunction
  ) {
    try {
      const newUser = new UserModel({
        name: name,
        email: email,
        password: password,
        // profile_id: new mongoose.Types.ObjectId(),
      });
      await newUser.save();
      return {
        error: false,
        showMessage: true,
        message: "New user created",
      };
    } catch (errorObject: any) {
      new GlobalErrorHandler(
        errorObject.name,
        "Something went wrong",
        500,
        false,
        "error"
      );
      // return next(error);
    }
  }
}
