import mongoose, { Schema } from "mongoose";

export interface IOtp extends Document {
  otp: string;
  user_id: Schema.Types.ObjectId;
  expiresAfter: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    otp: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    expiresAfter: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const OtpModel = mongoose.model<IOtp>("Otp", OtpSchema);
