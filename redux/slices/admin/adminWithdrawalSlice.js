import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  withdrawals: [],
  loading: false,
  error: null,
  processingId: null,
};

const adminWithdrawalSlice = createSlice({
  name: "adminWithdrawals",

  initialState,

  reducers: {
    // =========================
    // GET WITHDRAWALS
    // =========================

    withdrawalsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    withdrawalsSuccess: (state, action) => {
      state.loading = false;
      state.withdrawals = action.payload || [];
      state.error = null;
    },

    withdrawalsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // APPROVAL START
    // =========================

    withdrawalApprovalStart: (state, action) => {
      state.processingId = action.payload;
      state.error = null;
    },

    // =========================
    // APPROVAL SUCCESS
    // =========================

    withdrawalApprovalSuccess: (
      state,
      action
    ) => {
      const updatedWithdrawal =
        action.payload;

      const index =
        state.withdrawals.findIndex(
          (withdrawal) =>
            withdrawal._id ===
            updatedWithdrawal._id
        );

      if (index !== -1) {
        state.withdrawals[index] =
          updatedWithdrawal;
      }

      state.processingId = null;
      state.error = null;
    },

    // =========================
    // APPROVAL FAILURE
    // =========================

    withdrawalApprovalFailure: (
      state,
      action
    ) => {
      state.processingId = null;
      state.error = action.payload;
    },

    // =========================
    // CLEAR ERROR
    // =========================

    clearAdminWithdrawalError: (state) => {
      state.error = null;
    },

    // =========================
    // CLEAR DATA
    // =========================

    clearAdminWithdrawals: (state) => {
      state.withdrawals = [];
      state.loading = false;
      state.processingId = null;
      state.error = null;
    },
  },
});

export const {
  withdrawalsRequest,
  withdrawalsSuccess,
  withdrawalsFailure,

  withdrawalApprovalStart,
  withdrawalApprovalSuccess,
  withdrawalApprovalFailure,

  clearAdminWithdrawalError,
  clearAdminWithdrawals,
} =
  adminWithdrawalSlice.actions;

export default adminWithdrawalSlice.reducer;