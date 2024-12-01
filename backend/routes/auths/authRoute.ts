import { Router } from "express";
import { authenticateToken } from "../../middleware/authenticateToken";
import { UserController } from "../../controllers/UserController";
import { UserService } from "../../services/UserService";
import { UserRepository } from "../../repository/UserRepo";
import { UserModel } from "../../models/Users";
import { OtpModel } from "../../models/Otp";

export const AuthRoute = Router();
const User_repository = new UserRepository(UserModel, OtpModel);
const User_Service = new UserService(User_repository);
const User_controller = new UserController(User_Service);

AuthRoute.post("/register", User_controller.Register.bind(User_controller));
AuthRoute.post("/login", User_controller.Login.bind(User_controller));
AuthRoute.post("/confirm-otp", User_controller.verifyOtp.bind(User_controller));
AuthRoute.get(
  "/refresh-access-token",
  User_controller.refreshAccessToken.bind(User_controller)
);
AuthRoute.post("/middleware-testing", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});
