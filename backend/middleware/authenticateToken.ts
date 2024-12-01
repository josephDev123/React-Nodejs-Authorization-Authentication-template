import { Request, Response, NextFunction } from "express";
import tokenIsVerify from "../utils/VerifyToken";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tokenHeader = req.headers.cookie;
    // const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      return res.status(403).json({
        error: true,
        showMessage: false,
        message: "Missing authorization header",
      });
    }

    const tokenParts = tokenHeader.split(" ");

    const tokenCredential = tokenParts.filter((token) =>
      token.startsWith("token")
    );

    let token = tokenCredential[0]?.split("=")[1];
    if (!token) {
      return res.status(403).json({
        error: true,
        showMessage: false,
        message: "token not provided",
      });
    }
    // verify the token
    await tokenIsVerify(token);
    next();
  } catch (error: any) {
    const errorFormat = error as GlobalErrorHandler;
    throw errorFormat;
    // Handle any errors that occur within the try block here.
    // console.log(error.message);
    // if (error?.message === "jwt expired") {
    //   return res.status(403).json({
    //     error: true,
    //     showMessage: false,
    //     message: "jwt expired",
    //   });
    // } else if (error?.message === "jwt malformed") {
    //   return res.status(403).json({
    //     error: true,
    //     showMessage: false,
    //     message: "Json Web Token error/improper jwt structure",
    //   });
    // } else {
    //   return res.status(500).json({
    //     error: true,
    //     showMessage: false,
    //     message: "server internal error",
    //   });
    // }
  }
}
