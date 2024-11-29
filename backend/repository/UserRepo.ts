import { Types } from "mongoose";
import { IOtp } from "../models/Otp";
import { IuserType, IuserTypeOptions } from "../models/Users";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";
import { Model } from "mongoose";

export class UserRepository {
  constructor(
    private readonly db: Model<IuserType>,
    private readonly Otp: Model<IOtp>
  ) {}
  async create(email: string, name: string, password: string) {
    try {
      const newUser = new this.db({
        name: name,
        email: email,
        password: password,
        // profile_id: new mongoose.Types.ObjectId(),
      });
      return await newUser.save();
    } catch (errorObject) {
      const error = errorObject as GlobalErrorHandler;
      console.log(error);
      throw new GlobalErrorHandler(
        error.name,
        // "Something went wrong",
        error.message,
        500,
        false,
        "error"
      );
    }
  }

  async createOpt(user_id: string, otp: string, expiresAfter?: Date) {
    try {
      const otpDocument = new this.Otp({
        otp,
        user_id,
        expiresAfter,
      });

      await otpDocument.save();
    } catch (error) {
      const CustomError = error as GlobalErrorHandler;
      throw new GlobalErrorHandler(
        CustomError.name,
        CustomError.message,
        500,
        false,
        "error"
      );
    }
  }

  async getOptByUserId(user_id: string, otp: string) {
    console.log(user_id, otp);
    try {
      const otpDocument = await this.Otp.findOne({
        user_id: user_id,
        otp: otp,
      });
      // console.log(otpDocument);
      return otpDocument;
    } catch (error) {
      const CustomError = error as GlobalErrorHandler;
      throw new GlobalErrorHandler(
        CustomError.name,
        CustomError.message,
        500,
        false,
        "error"
      );
    }
  }

  async deleteOpt(_id: Types.ObjectId) {
    try {
      await this.Otp.findOneAndDelete({ _id });
    } catch (error) {
      const CustomError = error as GlobalErrorHandler;
      throw new GlobalErrorHandler(
        CustomError.name,
        CustomError.message,
        500,
        false,
        "error"
      );
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.db.findOne({ email });
    } catch (error) {
      const CustomError = error as GlobalErrorHandler;
      throw new GlobalErrorHandler(
        CustomError.name,
        "Something went wrong",
        500,
        false,
        "error"
      );
    }
  }

  async findByFields(field_values: IuserTypeOptions) {
    return await this.db.findOne(field_values);
  }

  async updateOne(email: string, fieldToUpdate: any, value: any) {
    const updateObject = { [fieldToUpdate]: value };
    return await this.db.updateOne({ email }, updateObject);
  }

  async findByUserIdAndUpdate(user_id: string) {
    try {
      const updateUser = await this.db.findByIdAndUpdate(
        { _id: user_id },
        { authenticated: true },
        { new: true }
      );
      return updateUser;
    } catch (error) {
      const CustomError = error as GlobalErrorHandler;
      throw new GlobalErrorHandler(
        CustomError.name,
        CustomError.message,
        500,
        false,
        "error"
      );
    }
  }
}
