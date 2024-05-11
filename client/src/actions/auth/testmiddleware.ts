import { axiosInstance } from "../../axios/axiosInstance";

const testMiddleware = async () => {
  const testReg = await axiosInstance({
    method: "POST",
    url: "",
  });
};
