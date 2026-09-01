import api from "./api";

export const getOrders = async () => {
  const response = await api.get("/user/api/v1/getOrders");

  return response.data;
};