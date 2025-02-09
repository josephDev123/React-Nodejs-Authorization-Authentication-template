import mongoose, { Schema, Types } from "mongoose";
import * as bcrypt from "bcrypt";
import { GlobalErrorHandler } from "../utils/GlobalErrorHandler";
import { string } from "joi";

export type IuserTypeOptions = {
  _id: Types.ObjectId;
  name?: string;
  email?: string;
  password?: string;
  username?: string;
  profile_id?: Types.ObjectId;
  otp?: string;
  authenticated: boolean;
  staging?: number;
  status?: boolean;
};

export interface IuserType extends Document {
  googleId?: string;
  name: string;
  email: string;
  password?: string;
  // username: string;
  // profile_id?: Types.ObjectId;
  // otp?: string;
  authenticated?: boolean;
  staging?: number;
  status?: boolean;
}

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
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple users without a googleId
  },
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
    required: function () {
      return !(this as any).googleId; // Require password only if not using Google login
    },
  },

  // username: {
  //   type: String,
  //   unique: true,
  //   validate: {
  //     validator: function (value: any) {
  //       return /^[a-zA-Z0-9]{3,20}$/.test(value);
  //     },
  //     message: (props) =>
  //       `${props.value} is not a valid username. Must be alphanumeric and between 3 to 20 characters.`,
  //   },
  // },

  // profile_id: {
  //   type: Schema.Types.ObjectId,
  //   ref: "UserProfile",
  // },

  // otp: String,

  authenticated: { type: Boolean, default: false },

  staging: { type: Number, default: 0 },
});

//user model

// middlewares

userSchema.pre("save", async function (next) {
  try {
    if (this.password) {
      const saltRounds = 4;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  } catch (errorObj) {
    const errors = errorObj as GlobalErrorHandler;
    const error = new GlobalErrorHandler(
      errors.name,
      // "Something went wrong",
      errors.message,
      500,
      false,
      "error"
    );
    return next(error);
  }
});

export const UserModel = mongoose.model<IuserType>("User", userSchema);
