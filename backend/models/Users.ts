import mongoose, { Document, Schema, Types } from "mongoose";
import * as bcrypt from "bcrypt";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";

export type IuserTypeOptions = {
  name?: string;
  email?: string;
  password?: string;
  username?: string;
  profile_id?: Types.ObjectId;
  otp?: string;
  confirm_otp?: boolean;
  staging?: number;
  status?: boolean;
};

export type IuserType = {
  name: string;
  email: string;
  password: string;
  username: string;
  profile_id: Types.ObjectId;
  otp: string;
  confirm_otp: boolean;
  staging: number;
  status: boolean;
};

// interface UserType extends Document {
//   name: string;
//   email: string;
//   password: string;
//   username: string;
//   profile_id: Types.ObjectId;
//   otp: string;
//   confirm_otp: boolean;
//   staging: number;
//   status: boolean;
// }
//user schema

const userSchema = new mongoose.Schema<IuserType>({
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },

  password: {
    type: String,
    // required: true,
    unique: true,
  },

  username: {
    type: String,
    unique: true,
    validate: {
      validator: function (value: any) {
        // Alphanumeric with a length between 3 and 20 characters
        return /^[a-zA-Z0-9]{3,20}$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid username. Must be alphanumeric and between 3 to 20 characters.`,
    },
  },

  profile_id: {
    type: Schema.Types.ObjectId,
    ref: "UserProfile",
  },

  otp: String,

  confirm_otp: { type: Boolean, default: false },

  staging: { type: Number, default: 0 },
});

//user model

// middlewares

userSchema.pre("save", async function (next) {
  try {
    const saltRounds = 4;
    this.password = await bcrypt.hash(this.password, saltRounds);
  } catch (errorObj: any) {
    const error = new GlobalErrorHandler(
      errorObj.name,
      "Something went wrong",
      500,
      false,
      "error"
    );
    return next(error);
  }
});

export const UserModel = mongoose.model<IuserType>("User", userSchema);
