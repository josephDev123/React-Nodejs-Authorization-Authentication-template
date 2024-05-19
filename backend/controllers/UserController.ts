import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  constructor(private readonly UserService: UserService) {
    this.UserService;
  }
  // register users
  async create(req: Request, res: Response, next: NextFunction) {
    const responseRes = await this.UserService.create(req, res, next);
    console.log(responseRes);
    return res.status(201).json(responseRes).end();
  }
}
