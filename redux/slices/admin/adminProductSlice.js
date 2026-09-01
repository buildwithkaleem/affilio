import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],

  // GET products
  loading: false,

  // ADD product
  adding: false,

  error: null,
};

const adminProductSlice = createSlice({
  name: "adminProducts",

  initialState,

  reducers: {
    // =========================
    // GET PRODUCTS
    // =========================

    productsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    productsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload || [];
      state.error = null;
    },

    productsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // ADD PRODUCT START
    // =========================

    addProductStart: (state) => {
      state.adding = true;
      state.error = null;
    },

    // =========================
    // ADD PRODUCT SUCCESS
    // =========================

    addProductSuccess: (state, action) => {
      state.adding = false;

      const product = action.payload;

      // Duplicate protection
      const exists = state.products.some(
        (item) =>
          item._id === product._id ||
          item.productId === product.productId
      );

      if (!exists) {
        state.products.unshift(product);
      }

      state.error = null;
    },

    // =========================
    // ADD PRODUCT FAILURE
    // =========================

    addProductFailure: (state, action) => {
      state.adding = false;
      state.error = action.payload;
    },

    // =========================
    // REMOVE PRODUCT
    // =========================

    removeProduct: (state, action) => {
      const productId = action.payload;

      state.products = state.products.filter(
        (product) =>
          product._id !== productId
      );
    },

    // =========================
    // CLEAR ERROR
    // =========================

    clearAdminProductError: (state) => {
      state.error = null;
    },

    // =========================
    // CLEAR PRODUCTS
    // =========================

    clearAdminProducts: (state) => {
      state.products = [];
      state.loading = false;
      state.adding = false;
      state.error = null;
    },
  },
});

export const {
  productsRequest,
  productsSuccess,
  productsFailure,

  addProductStart,
  addProductSuccess,
  addProductFailure,

  removeProduct,

  clearAdminProductError,
  clearAdminProducts,
} = adminProductSlice.actions;

export default adminProductSlice.reducer;