import api from "./api";

export const getMe = async () => {
  const response = await api.get("/user/api/v1/me");

  return response.data;
};

export const updateUser = async (data) => {
  const response = await api.post(
    "/user/api/v1/updateUser",
    data
  );

  return response.data;
};