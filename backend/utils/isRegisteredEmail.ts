import { UserModel } from "../models/Users";

export const isRegisteredEmail = async (email: string) => {
  try {
    const checkEmailInDb = await UserModel.findOne({ email });
    if (checkEmailInDb) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};
