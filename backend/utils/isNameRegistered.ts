import { UserModel } from "../models/Users";

export const isNameAlreadyReqistered = async (name: string) => {
  try {
    const isName = await UserModel.findOne({ name });
    if (isName) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};
