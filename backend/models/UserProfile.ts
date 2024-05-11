import mongoose, { Document, Schema, Types } from "mongoose";

interface IUserProfile extends Document {
  // user_id: Types.ObjectId;
  fullName: string;
  //   email: string;
  phoneNumber: string;
  Bio: string;
  address: {
    street: string;
    city: string;
    state: string;
    // postalCode: string;
    country: string;
  };
  dateOfBirth: Date;
  photo?: string;
  identification?: string;
  // accountBalance: number;
  //   transactions: Types.ObjectId[];
  //   linkedBankAccounts: Types.ObjectId[];
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    // user_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User", // Reference to the User model
    //   required: true,
    //   unique: true,
    // },
    fullName: {
      type: String,
      // required: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    //   unique: true,
    //   trim: true,
    //   lowercase: true,
    // },
    phoneNumber: {
      type: String,
      // required: true,
    },
    Bio: {
      type: String,
      maxlength: 50,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    dateOfBirth: {
      type: Date,
      // required: true,
    },
    photo: String,
    identification: String,
    // accountBalance: {
    //   type: Number,
    //   default: 0,
    // },
    // transactions: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Transaction", // Reference to the Transaction model
    //   },
    // ],
    // linkedBankAccounts: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "BankAccount", // Reference to the BankAccount model
    //   },
    // ],
    // Add more fields as needed
  },

  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const UserProfile = mongoose.model<IUserProfile>(
  "UserProfile",
  userProfileSchema
);

export default UserProfile;
