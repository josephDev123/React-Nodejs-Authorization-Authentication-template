import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hashPassword";
import {
  isPasswordAlreadyTaken,
  isEmailAlreadyUsed,
} from "../utils/comparePassword";
import { UserModel } from "../models/Users";
import { registercredentialValidation } from "../utils/authDataValidation";
import { isRegisteredEmail } from "../utils/isRegisteredEmail";
import { isNameAlreadyReqistered } from "../utils/isNameRegistered";
import jwt from "jsonwebtoken";
import { exist, string } from "joi";
import { createToken } from "../utils/createToken";
import UserProfile from "../models/UserProfile";
import mongoose from "mongoose";
import { Console, error, log, profile } from "console";
import { randomBytes, randomUUID } from "crypto";
import { sendMail } from "../utils/sendMail";
import { generateRandomPIN } from "../utils/generateRandomPin";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, password } = req.body;

    // const hashedPassword = await hashPassword(password);
    const isPasswordAlreadyUsed = await isPasswordAlreadyTaken(password);
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

    if (isPasswordAlreadyUsed === false && isEmailUsed === false) {
      const newUser = new UserModel({
        name: name,
        email: email,
        password: password,
        profile_id: new mongoose.Types.ObjectId(),
      });
      const user = await newUser.save();

      // note: user and profile should not be save in the cookie  when it has not be confirm
      // const userAndProfile = await UserModel.findOne({ email });

      // const userAndProfileJSON = JSON.stringify(userAndProfile);

      // res.cookie("user", userAndProfileJSON, {});

      return res.status(201).json({
        error: false,
        showMessage: true,
        message: "New user created",
        // data: userAndProfile,
      });
    } else {
      const error = new GlobalErrorHandler(
        "AuthError",
        "Already registered",
        400,
        true,
        "error"
      );
      return next(error);
    }
  } catch (errorObject: any) {
    // console.log(error);
    const error = new GlobalErrorHandler(
      errorObject.name,
      "Something went wrong",
      500,
      false,
      "error"
    );
    return next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;
    const validationResult = await registercredentialValidation(
      name,
      email,
      "Password@123"
    );

    if (validationResult.error) {
      // Handle validation error
      console.log("validation error");
      // return res.json({
      //   error: true,
      //   showMessage: true,
      //   message: validationResult.error.message,
      // });

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

    const new_Email = await isRegisteredEmail(email);
    if (new_Email === false) {
      const error = new GlobalErrorHandler(
        "AuthError",
        "The email is not yet registered",
        500,
        true,
        "error"
      );

      return next(error);
    }

    const checkNameAlreadyRegistered = await isNameAlreadyReqistered(name);
    if (checkNameAlreadyRegistered === false) {
      const error = new GlobalErrorHandler(
        "AuthError",
        "The name is not yet registered",
        500,
        true,
        "error"
      );

      return next(error);
    }
    const token = await createToken(email);
    // console.log(token);
    // const user_id = await UserModel.findOne({ email }, "_id");
    // const userProfile = await UserProfile.findOne({
    //   user_id: user_id?._id,
    // }).populate("user_id");

    // send otp to mail for 2FA

    const otp = generateRandomPIN();
    const payload = { email: email, otp: otp };
    const MAILTRAPstoredOtp = await UserModel.updateOne(
      // { _id: user._id },
      { email },
      { otp: otp }
    );

    if (MAILTRAPstoredOtp) {
      // Email sent successfully
      await sendMail(payload);
      console.log("Email sent successfully!");
    } else {
      const error = new GlobalErrorHandler(
        "EmailOptError",
        "Otp Email fail to send",
        500,
        true,
        "error"
      );
      return next(error);
    }

    const user = await UserModel.findOne({ email: email });

    // check whether the user is real by checking for OTP status
    // if (user?.confirm_otp == false) {
    //   return res.json({
    //     error: true,
    //     showMessage: true,
    //     message: "Otp unconfirmed",
    //   });
    // }

    res.cookie("token", token, {
      maxAge: 300000,
      secure: true,
      httpOnly: false,
    });
    res.cookie("user", JSON.stringify(user));

    return res.json({
      success: true,
      showMessage: false,
      message: "login successful",
    });
  } catch (error) {
    const errorObj = error as Error;
    const errorHandler = new GlobalErrorHandler(
      "Unknown",
      errorObj.message,
      500,
      false,
      "error"
    );

    return next(error);
  }
};

export const ConfirmOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otp, email } = req.body;
    const formatOtp = otp.split(",").join("");
    // console.log(formatOtp);

    const confirmOtp = await UserModel.findOne({
      email: email,
      otp: formatOtp,
    });

    // console.log(confirmOtp);

    if (!confirmOtp) {
      const error = new GlobalErrorHandler(
        "OtpError",
        "User/Otp not found",
        500,
        true,
        "error"
      );
      next(error);
      return;
    } else {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email: email },
        { confirm_otp: true },
        { new: true } // This option returns the updated document
      );
      res.cookie("user", JSON.stringify(updatedUser));

      return (
        res
          .status(200)
          // .json({ error: false, showMessage: true, message: "Otp confirm" });
          .json({
            error: false,
            showMessage: true,
            message: "New user created",
          })
      );
    }
  } catch (error) {
    const errorFormat = error as GlobalErrorHandler;
    const errorObj = new GlobalErrorHandler(
      errorFormat.name,
      "Something went wrong",
      500,
      false,
      "error"
    );

    return next(errorObj);
  }
};

export const refresh_token = async (req: Request, res: Response) => {
  const { email } = req.query;

  try {
    //  1. check whether the user exist
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      // The user with the specified email exists
      // You can add your logic here
      const token = await createToken(email);
      // console.log(token);
      res.cookie("token", token, {
        maxAge: 300000,
        secure: true,
        httpOnly: false,
      });
      return res.status(200).json({
        error: false,
        showMessage: true,
        message: "token created successful",
        data: token,
      });
    } else {
      // The user with the specified email does not exist
      // You can add your logic here
      return res.status(400).json({
        error: true,
        showMessage: false,
        message: "User doesn't exist",
        data: "",
      });
    }
  } catch (error) {
    // Handle any errors, such as a database connection issue
    console.error(`Error checking if the user exists: ${error}`);
    return res.status(200).json({
      error: true,
      showMessage: false,
      message: (error as Error).message,
    });
  }
};

export const MiddlewareTesting = async (req: Request, res: Response) => {
  try {
    return res.json({
      error: false,
      showMessage: true,
      message: "hello world from the middleware testing",
    });
  } catch (error: any) {
    return res.json({
      error: true,
      showMessage: true,
      message: error.message,
    });
  }
};
