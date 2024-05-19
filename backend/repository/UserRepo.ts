import { NextFunction } from "express";
import { IuserType } from "../models/Users";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";
import { Model } from "mongoose";

export class UserRepository {
  constructor(private readonly db: Model<IuserType>) {
    this.db = db;
  }
  async create(email: string, name: string, password: string) {
    try {
      const newUser = new this.db({
        name: name,
        email: email,
        password: password,
        // profile_id: new mongoose.Types.ObjectId(),
      });
      await newUser.save();
      return {
        error: false,
        showMessage: true,
        message: "New user created",
      };
    } catch (errorObject: any) {
      new GlobalErrorHandler(
        errorObject.name,
        "Something went wrong",
        500,
        false,
        "error"
      );
    }
  }

  async findByEmail(email: string) {
    // Assuming you're using an ORM like Sequelize or Mongoose
    return await this.db.findOne({ email });
  }
}
