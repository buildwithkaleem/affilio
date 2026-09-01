import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],

  loading: false,
  error: null,

  releasingId: null,
  deletingId: null,
};

const adminOrderSlice = createSlice({
  name: "adminOrders",

  initialState,

  reducers: {
    // ==============================
    // GET ORDERS
    // ==============================

    ordersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    ordersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload || [];
      state.error = null;
    },

    ordersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ==============================
    // RELEASE COMMISSION START
    // ==============================

    releaseCommissionStart: (state, action) => {
      state.releasingId = action.payload;
      state.error = null;
    },

    // ==============================
    // RELEASE COMMISSION SUCCESS
    // ==============================

    releaseCommissionSuccess: (state, action) => {
      const updatedOrder = action.payload;

      const index = state.orders.findIndex(
        (order) => order._id === updatedOrder._id
      );

      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }

      state.releasingId = null;
      state.error = null;
    },

    // ==============================
    // RELEASE COMMISSION FAILURE
    // ==============================

    releaseCommissionFailure: (state, action) => {
      state.releasingId = null;
      state.error = action.payload;
    },

    // ==============================
    // DELETE ORDER START
    // ==============================

    deleteOrderStart: (state, action) => {
      state.deletingId = action.payload;
      state.error = null;
    },

    // ==============================
    // DELETE ORDER SUCCESS
    // ==============================

    deleteOrderSuccess: (state, action) => {
      const orderId = action.payload;

      state.orders = state.orders.filter(
        (order) => order._id !== orderId
      );

      state.deletingId = null;
      state.error = null;
    },

    // ==============================
    // DELETE ORDER FAILURE
    // ==============================

    deleteOrderFailure: (state, action) => {
      state.deletingId = null;
      state.error = action.payload;
    },

    // ==============================
    // CLEAR ERROR
    // ==============================

    clearAdminOrderError: (state) => {
      state.error = null;
    },

    // ==============================
    // CLEAR ORDERS
    // ==============================

    clearAdminOrders: (state) => {
      state.orders = [];
      state.loading = false;
      state.releasingId = null;
      state.deletingId = null;
      state.error = null;
    },
  },
});

export const {
  ordersRequest,
  ordersSuccess,
  ordersFailure,

  releaseCommissionStart,
  releaseCommissionSuccess,
  releaseCommissionFailure,

  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,

  clearAdminOrderError,
  clearAdminOrders,
} = adminOrderSlice.actions;

export default adminOrderSlice.reducer;