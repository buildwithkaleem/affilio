import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    ordersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    ordersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
      state.error = null;
    },

    ordersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearOrdersError: (state) => {
      state.error = null;
    },
  },
});

export const {
  ordersRequest,
  ordersSuccess,
  ordersFailure,
  clearOrdersError,
} = orderSlice.actions;

export default orderSlice.reducer;