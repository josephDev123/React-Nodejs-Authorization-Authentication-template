import { redirect } from "react-router-dom";
import { getCredential } from "../../utils/getCredential";

export const verifyUserStatus = async () => {
  try {
    const { userData } = getCredential();
    const { user } = userData;

    if (!user) {
      return redirect("/login");
    } else if (!user?.confirm_otp) {
      return redirect("/confirm-otp");
    } else {
      return "hello";
    }
  } catch (error) {
    throw Error("User not authorized");
  }

  return null;
};
