import { redirect } from "react-router-dom";
import { getUserSession } from "../../utils/userSession";

export const verifyUserStatus = async () => {
  try {
    const session = getUserSession();

    if (!session) {
      return redirect("/login");
    } else if (!session?.authenticated) {
      return redirect("/confirm-otp");
    } else {
      return "hello";
    }
  } catch (error) {
    throw Error("User not authorized");
  }

  return null;
};
