import { redirect, useActionData } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { errorAlert } from "../../utils/errorAlert";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { ErrorResponseType } from "./loginAction";

interface sendOtpProps {
  request: Request;
}

export const ConfirmOtp = async ({ request }: sendOtpProps) => {
  try {
    const data = await request.formData();
    const otp = data.get("data");
    const auth = Cookies.get("user");
    const authEmail = auth ? JSON.parse(auth).email : "";

    const payload = {
      otp: otp,
      email: authEmail,
    };
    console.log(payload);
    const confirmOtp = await axiosInstance({
      method: "post",
      url: "auth/confirm-otp",
      data: payload,
    });

    const resp = confirmOtp.data;
    console.log(resp);

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
