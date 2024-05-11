import { axiosInstance } from "../../axios/axiosInstance";
import { errorAlert } from "../../utils/errorAlert";
import { AxiosError } from "axios";

export interface loginActionProps {
  request: Request;
}

export interface ErrorResponseType {
  message: string;
  name: string;
  operational: boolean;
  type: string;
}
export const loginAction = async ({ request }: loginActionProps) => {
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
    const res = req.data;
    console.log(res);
    // if (res.error && res.showMessage) {
    //   errorAlert(res.message);
    //   return null;
    // } else if (res.error && !res.showMessage) {
    //   errorAlert("Something went wrong");
    //   return null;
    // } else {
    return (window.location.href = "/confirm-otp");
    // }
    // return null;
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
