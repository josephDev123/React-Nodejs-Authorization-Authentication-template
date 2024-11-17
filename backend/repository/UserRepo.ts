import { IuserType, IuserTypeOptions } from "../models/Users";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";
import { Model } from "mongoose";

export class UserRepository {
  constructor(private readonly db: Model<IuserType>) {}
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

  async findByEmail(email: string) {
    // Assuming you're using an ORM like Sequelize or Mongoose
    return await this.db.findOne({ email });
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
