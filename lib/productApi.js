import api from "./api";

export const getAllProducts = async () => {
  const response = await api.get(
    "/user/api/v1/getAllProducts"
  );

  return response.data;
};