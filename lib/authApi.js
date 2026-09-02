
// v3
import axios from "axios";
import api from "./api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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