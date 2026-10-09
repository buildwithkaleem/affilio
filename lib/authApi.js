
// v3
import axios from "axios";
import api from "./api";
import { data } from "motion/react-m";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const auth = async (method ,route,data)=>{
//   const response = await api.method(
//     route,
//     data
//   );

//   return response.data;
// };

export const registerUser = async (data) => {
  const response = await api.post(
    "/auth/api/v1/register",
    data
  );

  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post(
    "/auth/api/v1/login",
    data
  );

  return response.data;
};

export const refreshAccessToken = async () => {
  const response = await axios.post(
    `${API_URL}/auth/api/v1/generate-token`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};


export const logoutUser = async () => {
  const response = await api.post(
    "/auth/api/v1/logout"
  );

  return response.data;
};

export const forgotPassword = async (data) => {
  const response = await api.post(
    "/auth/api/v1/forgot-password",
    data
  );

  return response.data;
};

export const resetPassword = async (data) => {
  const response = await api.post(
    `/auth/api/v1/reset-password/${data.token}`,
    {newPassword:data.password}
  );

  return response.data;
};

// export const resetPassword = 
// auth("post", "/reset-password/:token",data)