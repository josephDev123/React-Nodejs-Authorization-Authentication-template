import { redirect } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { errorAlert } from "../../utils/errorAlert";
import { AxiosError } from "axios";
import { SetUserSession } from "../../utils/userSession";

export interface ErrorResponseType {
  message: string;
  name: string;
  operational: boolean;
  type: string;
}
export const loginAction = async ({ request }: { request: Request }) => {
  try {
    const formData = await request.formData();

    const extractFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    console.log(extractFormData);
    const req = await axiosInstance({
      method: "post",
      url: "auth/login",
      data: extractFormData,
    });
    const res = await req.data;
    // console.log(res);
    SetUserSession({ key: "user", value: res.user });

    return redirect("/confirm-otp");
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const responseError = axiosError.response.data as ErrorResponseType;
      // console.log(responseError);
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
