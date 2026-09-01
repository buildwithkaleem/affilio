// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   balance: 0,
//   totalCommission: 0,
//   totalOrders: 0,
//   totalWithdrawals: 0,
//   recentOrders: [],
//   loading: false,
//   error: null,
// };

// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState,

//   reducers: {
//     dashboardRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },

//     dashboardSuccess: (state, action) => {
//       state.loading = false;

//       state.balance = action.payload.balance || 0;
//       state.totalCommission = action.payload.totalCommission || 0;
//       state.totalOrders = action.payload.totalOrders || 0;
//       state.totalWithdrawals = action.payload.totalWithdrawals || 0;
//       state.recentOrders = action.payload.recentOrders || [];
//     },

//     dashboardFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     clearDashboard: (state) => {
//       state.balance = 0;
//       state.totalCommission = 0;
//       state.totalOrders = 0;
//       state.totalWithdrawals = 0;
//       state.recentOrders = [];
//       state.error = null;
//     },
//   },
// });

// export const {
//   dashboardRequest,
//   dashboardSuccess,
//   dashboardFailure,
//   clearDashboard,
// } = dashboardSlice.actions;

// export default dashboardSlice.reducer;





// v2
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  balance: 0,
  totalCommission: 0,
  totalOrders: 0,
  totalWithdrawals: 0,
  recentOrders: [],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState,

  reducers: {
    // =========================
    // REQUEST
    // =========================

    dashboardRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // =========================
    // SUCCESS
    // =========================

    dashboardSuccess: (state, action) => {
      state.loading = false;

      state.balance =
        action.payload.balance || 0;

      state.totalCommission =
        action.payload.totalCommission || 0;

      state.totalOrders =
        action.payload.totalOrders || 0;

      state.totalWithdrawals =
        action.payload.totalWithdrawals || 0;

      state.recentOrders =
        action.payload.recentOrders || [];

      state.error = null;
    },

    // =========================
    // UPDATE BALANCE
    // =========================

    setBalance: (state, action) => {
      state.balance = Number(
        action.payload || 0
      );
    },

    // =========================
    // FAILURE
    // =========================

    dashboardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // CLEAR
    // =========================

    clearDashboard: (state) => {
      state.balance = 0;
      state.totalCommission = 0;
      state.totalOrders = 0;
      state.totalWithdrawals = 0;
      state.recentOrders = [];
      state.error = null;
    },
  },
});

export const {
  dashboardRequest,
  dashboardSuccess,
  setBalance,
  dashboardFailure,
  clearDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;