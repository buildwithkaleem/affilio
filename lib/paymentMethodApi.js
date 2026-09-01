import api from "./api";

export const getPaymentMethod = async () => {
  const response = await api.get(
    "/user/api/v1/getPaymentMethod"
  );

  return response.data;
};

export const addEditPaymentMethod = async (data) => {
  const response = await api.post(
    "/user/api/v1/pymentMethodAddEdit",
    data
  );

  return response.data;
};