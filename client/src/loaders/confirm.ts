import { redirect } from "react-router-dom";
import { getCredential } from "../utils/getCredential";

export async function ConfirmOtpLoader() {
  const { userData } = getCredential();
  const { user } = userData;

  if (user) {
    return user.email;
  } else {
    return redirect("/login");
  }
}
