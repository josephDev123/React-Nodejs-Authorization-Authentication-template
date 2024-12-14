import { redirect } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { errorAlert } from "../../utils/errorAlert";
import { AxiosError } from "axios";
import { ErrorResponseType } from "./loginAction";
import { getUserSession, SetUserSession } from "../../utils/userSession";

interface sendOtpProps {
  request: Request;
}

export const ConfirmOtp = async ({ request }: sendOtpProps) => {
  try {
    const data = await request.formData();
    const otp = data.get("data");
    const session = getUserSession();

    const payload = {
      otp: otp,
      user_id: session._id,
    };
    console.log(payload);
    const confirmOtp = await axiosInstance({
      method: "post",
      url: "auth/confirm-otp",
      data: payload,
    });

    const resp = confirmOtp.data;
    console.log(resp);
    SetUserSession({ key: "user", value: resp.user });
    return redirect("/");
    // return (window.location.href = "/");
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const responseError = axiosError.response.data as ErrorResponseType;
      if (responseError.type === "error" && responseError.operational) {
        errorAlert(responseError.message);
        return { error: responseError };
      } else {
        errorAlert("Something went wrong");
        return { error: "Something went wrong" };
      }
    }

    if (axiosError.request) {
      errorAlert(axiosError.request.message);
      return axiosError.request;
    } else {
      errorAlert("Something went wrong");
      return { error: "Something went wrong" };
    }
  }
};
