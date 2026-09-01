"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  productsRequest,
  productsSuccess,
  productsFailure,

  addProductStart,
  addProductSuccess,
  addProductFailure,
} from "@/redux/slices/admin/adminProductSlice";

import {
  getAllAffiliateProducts,
  addAffiliateProduct,
} from "@/lib/admin/adminProductApi";

export const useAdminProducts = () => {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    adding,
    error,
  } = useSelector(
    (state) => state.adminProducts
  );

  // ==============================
  // GET ALL PRODUCTS
  // ==============================

  const fetchProducts = useCallback(async () => {
    try {
      dispatch(productsRequest());

      const response =
        await getAllAffiliateProducts();

      /*
       * Backend response:
       *
       * {
       *   success: true,
       *   data: {
       *     products: [...]
       *   }
       * }
       */

      const products =
        response?.data?.products || [];

      dispatch(
        productsSuccess(products)
      );

      return response;

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch affiliate products";

      dispatch(
        productsFailure(message)
      );

      throw error;
    }
  }, [dispatch]);

  // ==============================
  // ADD PRODUCT
  // ==============================

  const addProduct = useCallback(
    async (productUrl, persent) => {
      try {
        dispatch(addProductStart());

        const response =
          await addAffiliateProduct(
            productUrl,
            persent
          );

        /*
         * Backend response:
         *
         * {
         *   success: true,
         *   data: {
         *     product: {...}
         *   }
         * }
         */

        const product =
          response?.data?.product;

        if (!product) {
          throw new Error(
            "Product data not received"
          );
        }

        /*
         * Product ko directly Redux mein add
         * kar rahe hain.
         *
         * Dobara GET request nahi hogi.
         */

        dispatch(
          addProductSuccess(product)
        );

        return response;

      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to add affiliate product";

        dispatch(
          addProductFailure(message)
        );

        throw error;
      }
    },
    [dispatch]
  );

  return {
    products,
    loading,
    adding,
    error,

    fetchProducts,
    addProduct,
  };
};