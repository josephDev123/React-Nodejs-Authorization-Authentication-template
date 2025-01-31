import { UserRepository } from "../repository/UserRepo";
import { registercredentialValidation } from "../utils/authDataValidation";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";
import { createToken, generateTokens } from "../utils/createToken";
import { generateRandomPIN } from "../utils/generateRandomPin";
import { sendMail } from "../utils/sendMail";
import tokenIsVerify from "../utils/VerifyToken";

export class UserService {
  constructor(private readonly UserRepository: UserRepository) {
    this.UserRepository;
  }
  async isUserRegistered(email: string) {
    const user = await this.UserRepository.findByEmail(email);
    return user !== null;
  }
  //Register user service ---------------------------------
  async create(email: string, name: string, password: string) {
    try {
      const userExists = await this.isUserRegistered(email);
      if (userExists) {
        throw new GlobalErrorHandler(
          "AuthError",
          "Email already taken",
          400,
          true,
          "error"
        );
      }

      const validationResult = await registercredentialValidation(
        name,
        email,
        password
      );

      if (validationResult.error) {
        throw new GlobalErrorHandler(
          "ValidateError",
          validationResult.error.message,
          400,
          true,
          "error"
        );
      }

      if (userExists === false) {
        const result = await this.UserRepository.create(email, name, password);
        if (result && result.email) {
          return {
            error: false,
            showMessage: true,
            message: "New user created",
          };
        }
      }
    } catch (errorObject) {
      const error = errorObject as GlobalErrorHandler;

      if (error.operational) {
        throw new GlobalErrorHandler(
          error.name,
          error.message,
          error.statusCode,
          error.operational,
          error.type
        );
      } else {
        throw new GlobalErrorHandler(
          error.name,
          "Something went wrong",
          500,
          false,
          "error"
        );
      }
    }
  }

  //login user service ---------------------------------
  async loginService(email: string, name: string, password: string) {
    try {
      const userExists = await this.isUserRegistered(email);
      const validationResult = await registercredentialValidation(
        name,
        email
        // password
      );

      if (validationResult.error) {
        throw new GlobalErrorHandler(
          "ValidateError",
          validationResult.error.message,
          400,
          true,
          "error"
        );
      }

      if (!userExists) {
        throw new GlobalErrorHandler(
          "AuthError",
          "The email is not yet registered",
          400,
          true,
          "error"
        );
      }
      // const token = await createToken(email);
      const { accessToken, refreshToken } = await generateTokens(email);
      const otp = generateRandomPIN();
      const payload = { recieverEmail: email, otp: otp };

      // const updateUserOtpStatus = await this.UserRepository.updateOne(
      //   email,
      //   "otp",
      //   otp
      // );
      // if (updateUserOtpStatus && !updateUserOtpStatus.acknowledged) {
      //   throw new GlobalErrorHandler(
      //     "EmailOptError",
      //     "Otp Email fail to send",
      //     500,
      //     true,
      //     "error"
      //   );
      // }

      const user = await this.UserRepository.findByEmail(email);
      //create otp in db
      await this.UserRepository.createOpt(String(user?._id), otp, new Date());
      await sendMail(payload);

      return {
        user: user,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      const CustomError = error as GlobalErrorHandler;
      if (CustomError.operational) {
        throw new GlobalErrorHandler(
          CustomError.name,
          CustomError.message,
          CustomError.statusCode,
          CustomError.operational,
          CustomError.type
        );
      } else {
        throw new GlobalErrorHandler(
          CustomError.name,
          "Something went wrong",
          CustomError.statusCode,
          CustomError.operational,
          CustomError.type
        );
      }
    }
  }

  async resendOtpService(email: string) {
    try {
      const user = await this.UserRepository.findByEmail(email);
      if (!user) {
        throw new GlobalErrorHandler(
          "UserError",
          "Email not found",
          404,
          true,
          "error"
        );
      }
      const otp = generateRandomPIN();
      const payload = { recieverEmail: email, otp: otp };
      await this.UserRepository.createOpt(String(user?._id), otp, new Date());
      await sendMail(payload);
      return;
    } catch (error) {
      const CustomError = error as GlobalErrorHandler;
      throw new GlobalErrorHandler(
        CustomError.name,
        CustomError.message,
        CustomError.statusCode,
        CustomError.operational,
        CustomError.type
      );
    }
  }
  //verify otp service ---------------------------------
  async verifyOtpService(email: string, otp: string, user_id: string) {
    try {
      const formatOtp = otp.split(",").join(""); //still important
      const otpDocument = await this.UserRepository.getOptByUserId(
        user_id,
        formatOtp
      );

      console.log(otpDocument);
      if (!otpDocument) {
        throw new GlobalErrorHandler(
          "OtpError",
          "Otp not found or has expired",
          500,
          true,
          "error"
        );
      }

      await this.UserRepository.deleteOpt(otpDocument._id);
      const updatedUser = await this.UserRepository.findByUserIdAndUpdate(
        user_id
      );

      return {
        error: false,
        showMessage: true,
        message: "user verified",
        user: updatedUser,
      };
    } catch (error) {
      const errorFormat = error as GlobalErrorHandler;
      throw new GlobalErrorHandler(
        errorFormat.name,
        // "Something went wrong",
        errorFormat.message,
        500,
        false,
        "error"
      );
    }
  }

  async refreshTokenService(refreshToken: string, email: string) {
    try {
      if (!refreshToken) {
        throw new GlobalErrorHandler(
          "RefreshTokenError",
          "Refresh Token Required",
          401,
          true,
          "error"
        );
      }

      await tokenIsVerify(refreshToken); //decode or verify token
      // generate a new access token
      const newAccessToken = await createToken(
        process.env.TOKEN_SECRET as string,
        email,
        "15m"
      );
      return {
        accessToken: newAccessToken,
      };
    } catch (error) {
      const errorFormat = error as GlobalErrorHandler;
      throw errorFormat;
    }
  }
}
