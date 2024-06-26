import * as bcrypt from "bcrypt";
import { UserModel } from "../models/Users";
import { hashPassword } from "./hashPassword";
import { GlobalErrorHandler } from "./GlobalErrorHandler";

export const isPasswordAlreadyTaken = async (newPassword: string) => {
  try {
    const hashNewPassword = await hashPassword(newPassword);
    const isPasswordRegistered = await UserModel.findOne({
      password: hashNewPassword,
    });
    // const isPasswordRegistered = await bcrypt.compare(hashNewPassword, user.password);
    if (isPasswordRegistered) throw new Error();
    return false;
  } catch (error) {
    throw error;
  }
};

export const isEmailAlreadyUsed = async (email: string) => {
  try {
    const isemail = await UserModel.findOne({ email: email });
    if (isemail) {
      // throw new Error("Email already taken");
      throw new GlobalErrorHandler(
        "AuthError",
        "Email already taken",
        400,
        true,
        "error"
      );
    }
    return false;
  } catch (error) {
    throw error;
  }
};
