import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private readonly UserService: UserService) {
    this.UserService;
  }
  // register users
  async Register(req: Request, res: Response, next: NextFunction) {
    const responseRes = await this.UserService.create(req, res, next);
    return res.status(201).json(responseRes).end();
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
