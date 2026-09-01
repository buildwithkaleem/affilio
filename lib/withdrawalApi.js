import api from "./api";

export const requestWithdrawal = async (amount) => {
  const response = await api.post(
    "/user/api/v1/withdrawalReq",
    { amount }
  );

  return response.data;
};

export const getUserWithdrawals = async () => {
  const response = await api.get(
    "/user/api/v1/getUserWithdrawals"
  );

  return response.data;
};