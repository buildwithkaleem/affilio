// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   withdrawals: [],
//   loading: false,
//   submitting: false,
//   error: null,
//   success: null,
// };

// const withdrawalSlice = createSlice({
//   name: "withdrawal",

//   initialState,

//   reducers: {
//     withdrawalsRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },

//     withdrawalsSuccess: (state, action) => {
//       state.loading = false;
//       state.withdrawals = action.payload;
//       state.error = null;
//     },

//     withdrawalsFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     withdrawalRequestStart: (state) => {
//       state.submitting = true;
//       state.error = null;
//       state.success = null;
//     },

//     withdrawalRequestSuccess: (state, action) => {
//       state.submitting = false;
//       state.success = action.payload;
//       state.error = null;
//     },

//     withdrawalRequestFailure: (state, action) => {
//       state.submitting = false;
//       state.error = action.payload;
//       state.success = null;
//     },

//     clearWithdrawalMessage: (state) => {
//       state.error = null;
//       state.success = null;
//     },
//   },
// });

// export const {
//   withdrawalsRequest,
//   withdrawalsSuccess,
//   withdrawalsFailure,
//   withdrawalRequestStart,
//   withdrawalRequestSuccess,
//   withdrawalRequestFailure,
//   clearWithdrawalMessage,
// } = withdrawalSlice.actions;

// export default withdrawalSlice.reducer;






// v2
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  withdrawals: [],
  loading: false,
  submitting: false,
  error: null,
  success: null,
};

const withdrawalSlice = createSlice({
  name: "withdrawal",

  initialState,

  reducers: {
    // =========================
    // FETCH REQUEST
    // =========================

    withdrawalsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // =========================
    // FETCH SUCCESS
    // =========================

    withdrawalsSuccess: (
      state,
      action
    ) => {
      state.loading = false;
      state.withdrawals =
        action.payload || [];
      state.error = null;
    },

    // =========================
    // FETCH FAILURE
    // =========================

    withdrawalsFailure: (
      state,
      action
    ) => {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // ADD WITHDRAWAL
    // =========================

    addWithdrawal: (
      state,
      action
    ) => {
      const withdrawal =
        action.payload;

      if (!withdrawal?._id) {
        return;
      }

      const exists =
        state.withdrawals.some(
          (item) =>
            item._id === withdrawal._id
        );

      if (exists) {
        return;
      }

      state.withdrawals.unshift(
        withdrawal
      );
    },

    // =========================
    // REQUEST START
    // =========================

    withdrawalRequestStart: (
      state
    ) => {
      state.submitting = true;
      state.error = null;
      state.success = null;
    },

    // =========================
    // REQUEST SUCCESS
    // =========================

    withdrawalRequestSuccess: (
      state,
      action
    ) => {
      state.submitting = false;
      state.success = action.payload;
      state.error = null;
    },

    // =========================
    // REQUEST FAILURE
    // =========================

    withdrawalRequestFailure: (
      state,
      action
    ) => {
      state.submitting = false;
      state.error = action.payload;
      state.success = null;
    },

    // =========================
    // CLEAR MESSAGE
    // =========================

    clearWithdrawalMessage: (
      state
    ) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  withdrawalsRequest,
  withdrawalsSuccess,
  withdrawalsFailure,
  addWithdrawal,
  withdrawalRequestStart,
  withdrawalRequestSuccess,
  withdrawalRequestFailure,
  clearWithdrawalMessage,
} = withdrawalSlice.actions;

export default withdrawalSlice.reducer;