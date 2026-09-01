"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  withdrawalsRequest,
  withdrawalsSuccess,
  withdrawalsFailure,

  withdrawalApprovalStart,
  withdrawalApprovalSuccess,
  withdrawalApprovalFailure,
} from "@/redux/slices/admin/adminWithdrawalSlice";

import {
  getAllWithdrawals,
  withdrawalApproval as withdrawalApprovalApi,
} from "@/lib/admin/adminWithdrawalApi";

export const useAdminWithdrawals = () => {
  const dispatch = useDispatch();

  const {
    withdrawals,
    loading,
    error,
    processingId,
  } = useSelector(
    (state) => state.adminWithdrawals
  );

  // ==============================
  // GET ALL WITHDRAWALS
  // ==============================

  const fetchWithdrawals = useCallback(
    async () => {
      try {
        dispatch(withdrawalsRequest());

        const response =
          await getAllWithdrawals();

        dispatch(
          withdrawalsSuccess(
            response?.data?.withdrawals || []
          )
        );

        return response;
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch withdrawals";

        dispatch(
          withdrawalsFailure(message)
        );

        throw error;
      }
    },
    [dispatch]
  );

  // ==============================
  // APPROVE / REJECT WITHDRAWAL
  // ==============================

  const processWithdrawal = useCallback(
    async (withdrawalId, status) => {
      try {
        dispatch(
          withdrawalApprovalStart(
            withdrawalId
          )
        );

        const response =
          await withdrawalApprovalApi(
            withdrawalId,
            status
          );

        const updatedWithdrawal =
          response?.data?.withdrawal;

        if (!updatedWithdrawal) {
          throw new Error(
            "Updated withdrawal data not received"
          );
        }

        dispatch(
          withdrawalApprovalSuccess(
            updatedWithdrawal
          )
        );

        return response;
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to update withdrawal";

        dispatch(
          withdrawalApprovalFailure(
            message
          )
        );

        throw error;
      }
    },
    [dispatch]
  );

  return {
    withdrawals,
    loading,
    error,
    processingId,

    fetchWithdrawals,
    processWithdrawal,
  };
};