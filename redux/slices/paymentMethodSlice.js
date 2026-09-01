import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: null,
  loading: false,
  saving: false,
  error: null,
  success: null,
};

const paymentMethodSlice = createSlice({
  name: "paymentMethod",

  initialState,

  reducers: {
    paymentMethodRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    paymentMethodSuccess: (state, action) => {
      state.loading = false;
      state.paymentMethod = action.payload;
      state.error = null;
    },

    paymentMethodFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    paymentMethodSaveStart: (state) => {
      state.saving = true;
      state.error = null;
      state.success = null;
    },

    paymentMethodSaveSuccess: (state, action) => {
      state.saving = false;
      state.success = action.payload;
      state.error = null;
    },

    paymentMethodSaveFailure: (state, action) => {
      state.saving = false;
      state.error = action.payload;
      state.success = null;
    },

    clearPaymentMethodMessage: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  paymentMethodRequest,
  paymentMethodSuccess,
  paymentMethodFailure,
  paymentMethodSaveStart,
  paymentMethodSaveSuccess,
  paymentMethodSaveFailure,
  clearPaymentMethodMessage,
} = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;