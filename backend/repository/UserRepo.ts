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

  async findOneAndUpdate(
    condition: IuserTypeOptions,
    fieldToUpdate: IuserTypeOptions,
    option?: Object
  ) {
    return await this.db.findOneAndUpdate(
      condition,
      fieldToUpdate,
      option // This option returns the updated document
    );
    // console.log(updatedUser)
  }
}
