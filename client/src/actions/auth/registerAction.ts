import { axiosInstance } from "../../axios/axiosInstance";
import { AxiosError } from "axios";
import { errorAlert } from "../../utils/errorAlert";

export interface registerActionProps {
  request: Request;
}

interface ErrorResponseType {
  message: string;
  name: string;
  operational: boolean;
  type: string;
}

export const registerAction = async ({ request }: registerActionProps) => {
  try {
    const formData = await request.formData();
    const submittedFormData = {
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
    };
    const req = await axiosInstance({
      method: "post",
      url: "auth/register",
      data: submittedFormData,
    });

    const resp = req.data;
    console.log(resp);
    return (window.location.href = "login");
    // }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const responseError = axiosError.response.data as ErrorResponseType;

      if (
        responseError &&
        responseError.type === "error" &&
        responseError.operational === true
      ) {
        console.log(axiosError.response.data);
        errorAlert(responseError.message);

        return { error: responseError };
      } else {
        errorAlert("Something went wrong");
        return { error: "Something went wrong" };
      }
    }
    if (axiosError.request) {
      errorAlert(axiosError.request.message);
      return { error: axiosError.request };
    } else {
      errorAlert("something went wrong");
      return { error: "something went wrong" };
    }
  }
};
