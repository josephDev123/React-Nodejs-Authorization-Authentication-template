import mongoose, { Schema } from "mongoose";

export interface IOtp {
  otp: string;
  user_id: Schema.Types.ObjectId;
  expireAt: Date;
}

const OtpSchema = new Schema<IOtp>(
  {
    otp: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expireAt: {
      type: Date,
      expires: 60,
    },
  },
  { timestamps: true }
);

export const TokenModel = mongoose.model<IOtp>("Otp", OtpSchema);
