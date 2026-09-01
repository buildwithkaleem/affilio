"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ordersRequest,
  ordersSuccess,
  ordersFailure,

  releaseCommissionStart,
  releaseCommissionSuccess,
  releaseCommissionFailure,
} from "@/redux/slices/admin/adminOrderSlice";

import {
  getAllOrders,
  releaseAffiliateCommission as releaseAffiliateCommissionApi,
} from "@/lib/admin/adminOrderApi";

export const useAdminOrders = () => {
  const dispatch = useDispatch();

  const {
    orders,
    loading,
    error,
    releasingId,
  } = useSelector(
    (state) => state.adminOrders
  );

  // ==============================
  // GET ALL ORDERS
  // ==============================

  const fetchOrders = useCallback(async () => {
    try {
      dispatch(ordersRequest());

      const response = await getAllOrders();

      dispatch(
        ordersSuccess(
          response?.data?.orders || []
        )
      );

      return response;

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch orders";

      dispatch(
        ordersFailure(message)
      );

      throw error;
    }
  }, [dispatch]);

  // ==============================
  // RELEASE COMMISSION
  // ==============================

  const releaseAffiliateCommission =
    useCallback(
      async (orderId) => {
        try {
          dispatch(
            releaseCommissionStart(orderId)
          );

          const response =
            await releaseAffiliateCommissionApi(
              orderId
            );

          /*
           * Backend updated order:
           *
           * commissionReleased: true
           *
           * Redux mein bhi foran update hoga.
           */

          const updatedOrder =
            response?.data?.order;

          if (!updatedOrder) {
            throw new Error(
              "Updated order data not received"
            );
          }

          dispatch(
            releaseCommissionSuccess(
              updatedOrder
            )
          );

          return response;

        } catch (error) {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Failed to release affiliate commission";

          dispatch(
            releaseCommissionFailure(message)
          );

          throw error;
        }
      },
      [dispatch]
    );

  return {
    orders,
    loading,
    error,
    releasingId,

    fetchOrders,
    releaseAffiliateCommission,
  };
};