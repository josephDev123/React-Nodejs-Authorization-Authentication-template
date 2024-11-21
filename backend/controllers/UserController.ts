import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";

export class UserController {
  constructor(private readonly UserService: UserService) {
    this.UserService;
  }
  // register users
  async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password } = req.body;
      const responseRes = await this.UserService.create(email, name, password);
      return res.status(201).json(responseRes).end();
    } catch (error) {
      const errorFormat = error as GlobalErrorHandler;
      next(errorFormat);
    }
  }

  // login users
  async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const responseRes = await this.UserService.loginService(
        body.email,
        body.name,
        body.password
      );
      res.cookie("token", responseRes?.accessToken, {
        maxAge: 900000,
        secure: true,
        //httpOnly: false,// the token can be accessed by the browser
      });
      res.cookie("refreshToken", responseRes?.refreshToken, {
        maxAge: 604800000,
        secure: true,
        httpOnly: false,
      });
      res.cookie("user", JSON.stringify(responseRes?.user));
      const result = {
        success: true,
        showMessage: false,
        message: "login successful",
      };
      return res.status(200).json(result);
    } catch (error) {
      const errorFormat = error as GlobalErrorHandler;
      next(errorFormat);
    }
  }

  //verify confirm otp
  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    const responseRes = await this.UserService.verifyOtpService(req, res, next);
    return res.status(200).json(responseRes);
  }
}
