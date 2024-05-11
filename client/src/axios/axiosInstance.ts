import axios from "axios"; // Axios, // AxiosInstance, // AxiosError, // AxiosRequestConfig,

import { getCredential } from "../utils/getCredential";

const { tokenData, userData } = getCredential();

export const axiosInstance = axios.create({
  baseURL: "http://localhost:7000/",
  withCredentials: true,
});

// Initialize your custom Axios instance
export const axiosDefault = axios.create({
  baseURL: "http://localhost:7000/",
  withCredentials: true,
});

// axiosDefault.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${tokenData.token}`;

// Define a function to refresh the token (customize this for your authentication system)
const refreshAccessToken = async () => {
  try {
    // Make an API request to your server to refresh the token
    const response = await axiosDefault.get("auth/refresh-access-token", {
      params: {
        email: userData.user.email,
      },
    });
    return response.data.data; // Assuming your response provides the new token
  } catch (error) {
    throw error; // Handle token refresh failure as needed
  }
};

// Add a request interceptor
axiosDefault.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    // const header = config.headers.Authorization as string;
    // const token = header.split(" ")[1];

    // if (!tokenData) {
    //   window.location.href = "/login";
    // } else {
    //    config.headers.Authorization = `Bearer ${tokenData.token}`;
    // }

    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosDefault.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const originalRequest = error.config;
    console.log(error);
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      console.log(access_token);
      // axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      // axiosDefault.defaults.headers.common["Authorization"] =
      //   "Bearer " + access_token;
      return axiosDefault(originalRequest);
    }
    return Promise.reject(error);
  }
);
