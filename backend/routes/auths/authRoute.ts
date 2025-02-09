import { Router } from "express";
import { authenticateToken } from "../../middleware/authenticateToken";
import { UserController } from "../../controllers/UserController";
import { UserService } from "../../services/UserService";
import { UserRepository } from "../../repository/UserRepo";
import { UserModel } from "../../models/Users";
import { OtpModel } from "../../models/Otp";
import passport from "passport";
import { createToken, generateTokens } from "../../utils/createToken";

export const AuthRoute = Router();
const User_repository = new UserRepository(UserModel, OtpModel);
const User_Service = new UserService(User_repository);
const User_controller = new UserController(User_Service);

AuthRoute.post("/register", User_controller.Register.bind(User_controller));
AuthRoute.post("/login", User_controller.Login.bind(User_controller));
AuthRoute.post("/confirm-otp", User_controller.verifyOtp.bind(User_controller));
AuthRoute.post("/resend-otp", User_controller.resendOtp.bind(User_controller));
AuthRoute.get(
  "/refresh-access-token",
  User_controller.refreshAccessToken.bind(User_controller)
);
AuthRoute.post("/middleware-testing", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Access granted" });
});

AuthRoute.get(
  "/login/federated/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
AuthRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false, //disable session
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Google authentication failed" });
    }
    const user = req.user as any;
    console.log("from the token setting part", user);
    const { accessToken, refreshToken } = await generateTokens(user?.email);
    res.cookie("token", accessToken, {
      maxAge: 900000,
      secure: false,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 604800000,
      secure: false,
      httpOnly: true,
    });

    const result = {
      success: true,
      showMessage: false,
      message: "login successful",
      user: req.user,
      // token:accessToken,
    };

    res.redirect(process.env.CLIENT_URL as string); // Redirect to client
  }
);
