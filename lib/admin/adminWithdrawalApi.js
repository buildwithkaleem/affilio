import api from "@/lib/api";

// ==============================
// GET ALL WITHDRAWALS
// ==============================

export const getAllWithdrawals = async () => {
  const response = await api.get(
    "/admin/api/v1/getAllWithdrawals"
  );

  return response.data;
};

// ==============================
// APPROVE / REJECT WITHDRAWAL
// ==============================

export const withdrawalApproval = async (
  withdrawalId,
  status
) => {
  const response = await api.post(
    `/admin/api/v1/withdrawalApproval/${withdrawalId}`,
    {
      status,
    }
  );

  return response.data;
};