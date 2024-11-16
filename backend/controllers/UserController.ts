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
    const responseRes = await this.UserService.loginService(req, res, next);
    return res.status(200).json(responseRes);
  }

  //verify confirm otp
  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    const responseRes = await this.UserService.verifyOtpService(req, res, next);
    return res.status(200).json(responseRes);
  }
}
