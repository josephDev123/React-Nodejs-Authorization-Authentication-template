import { Router } from "express";
import { Response } from "express";
import {
  register,
  loginController,
  ConfirmOtp,
  refresh_token,
  MiddlewareTesting,
} from "../../controllers/AuthController";
import { authenticateToken } from "../../middleware/authenticateToken";
import { UserController } from "../../controllers/UserController";
import { UserService } from "../../services/UserService";
import { UserRepository } from "../../repository/UserRepo";
import { UserModel } from "../../models/Users";

export const AuthRoute = Router();
const User_repository = new UserRepository(UserModel);
const User_Service = new UserService(User_repository);
const User_controller = new UserController(User_Service);

// AuthRoute.post("/register", register);
AuthRoute.post("/register", User_controller.Register.bind(User_controller));
// AuthRoute.post("/login", loginController);
AuthRoute.post("/login", User_controller.Login.bind(User_controller));
// AuthRoute.post("/confirm-otp", ConfirmOtp);
AuthRoute.post("/confirm-otp", User_controller.verifyOtp.bind(User_controller));
AuthRoute.post("/set-username", loginController);
AuthRoute.post("/profile-pic", loginController);
AuthRoute.get("/refresh-access-token", refresh_token);
AuthRoute.post("/middleware-testing", authenticateToken, MiddlewareTesting);
