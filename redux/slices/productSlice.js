import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    productsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    productsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },

    productsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearProductsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  productsRequest,
  productsSuccess,
  productsFailure,
  clearProductsError,
} = productSlice.actions;

export default productSlice.reducer;