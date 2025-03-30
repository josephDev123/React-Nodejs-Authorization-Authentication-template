import express, { Express, Request, Response, NextFunction } from "express";
import { DbConfig } from "./db";
import cors from "cors";
import dotenv from "dotenv";
import { AuthRoute } from "./routes/auths/authRoute";
import cookieParser from "cookie-parser";
import { authenticateToken } from "./middleware/authenticateToken";
import { ErrorHandlerMiddleware } from "./middleware/ErrorHandlerMiddleware";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "./models/Users";
import { googleStrategyConf } from "./utils/Googlestrategy";

dotenv.config();

//CORS middleware
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app: Express = express();
const db = new DbConfig(process.env.DATABASE_URL!);

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false,
//       httpOnly: false,
//     },
//   })
// );

app.use(passport.initialize());
passport.use(googleStrategyConf);

// session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60,
//     },
//   })
// );

const startApp = async () => {
  try {
    await db.connect();
    app.use("/auth", AuthRoute);
    app.use("/test", (req, res) => {
      return res
        .status(200)
        .json({ message: "success", data: "testing Nginx on Docker" });
    });
    app.use(ErrorHandlerMiddleware);

    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
