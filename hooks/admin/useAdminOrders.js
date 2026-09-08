// "use client";

// import { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   ordersRequest,
//   ordersSuccess,
//   ordersFailure,

//   releaseCommissionStart,
//   releaseCommissionSuccess,
//   releaseCommissionFailure,
// } from "@/redux/slices/admin/adminOrderSlice";

// import {
//   getAllOrders,
//   releaseAffiliateCommission as releaseAffiliateCommissionApi,
// } from "@/lib/admin/adminOrderApi";

// export const useAdminOrders = () => {
//   const dispatch = useDispatch();

//   const {
//     orders,
//     loading,
//     error,
//     releasingId,
//   } = useSelector(
//     (state) => state.adminOrders
//   );

//   // ==============================
//   // GET ALL ORDERS
//   // ==============================

//   const fetchOrders = useCallback(async () => {
//     try {
//       dispatch(ordersRequest());

//       const response = await getAllOrders();

//       dispatch(
//         ordersSuccess(
//           response?.data?.orders || []
//         )
//       );

//       return response;

//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to fetch orders";

//       dispatch(
//         ordersFailure(message)
//       );

//       throw error;
//     }
//   }, [dispatch]);

//   // ==============================
//   // RELEASE COMMISSION
//   // ==============================

//   const releaseAffiliateCommission =
//     useCallback(
//       async (orderId) => {
//         try {
//           dispatch(
//             releaseCommissionStart(orderId)
//           );

//           const response =
//             await releaseAffiliateCommissionApi(
//               orderId
//             );

//           /*
//            * Backend updated order:
//            *
//            * commissionReleased: true
//            *
//            * Redux mein bhi foran update hoga.
//            */

//           const updatedOrder =
//             response?.data?.order;

//           if (!updatedOrder) {
//             throw new Error(
//               "Updated order data not received"
//             );
//           }

//           dispatch(
//             releaseCommissionSuccess(
//               updatedOrder
//             )
//           );

//           return response;

//         } catch (error) {
//           const message =
//             error.response?.data?.message ||
//             error.message ||
//             "Failed to release affiliate commission";

//           dispatch(
//             releaseCommissionFailure(message)
//           );

//           throw error;
//         }
//       },
//       [dispatch]
//     );

//   return {
//     orders,
//     loading,
//     error,
//     releasingId,

//     fetchOrders,
//     releaseAffiliateCommission,
//   };
// };




// v2
// "use client";

// import { useCallback, useState } from "react";

// import {
//   getAllOrders,
//   releaseAffiliateCommission,
//   deleteOrder,
// } from "@/lib/adminOrderApi";

// export const useAdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [releasingId, setReleasingId] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);

//   // ==============================
//   // GET ORDERS
//   // ==============================

//   const fetchOrders = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await getAllOrders();

//       setOrders(response?.data || []);
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to fetch orders"
//       );

//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // ==============================
//   // RELEASE COMMISSION
//   // ==============================

//   const releaseCommission = useCallback(
//     async (orderId) => {
//       try {
//         setReleasingId(orderId);
//         setError(null);

//         await releaseAffiliateCommission(
//           orderId
//         );

//         await fetchOrders();
//       } catch (error) {
//         setError(
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to release commission"
//         );

//         throw error;
//       } finally {
//         setReleasingId(null);
//       }
//     },
//     [fetchOrders]
//   );

//   // ==============================
//   // DELETE ORDER
//   // ==============================

//   const handleDeleteOrder = useCallback(
//     async (orderId) => {
//       try {
//         setDeletingId(orderId);
//         setError(null);

//         await deleteOrder(orderId);

//         // Remove immediately from UI
//         setOrders((prev) =>
//           prev.filter(
//             (order) => order._id !== orderId
//           )
//         );
//       } catch (error) {
//         setError(
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to delete order"
//         );

//         throw error;
//       } finally {
//         setDeletingId(null);
//       }
//     },
//     []
//   );

//   return {
//     orders,
//     loading,
//     error,

//     releasingId,
//     deletingId,

//     fetchOrders,
//     releaseAffiliateCommission:
//       releaseCommission,
//     deleteOrder: handleDeleteOrder,
//   };
// };






// v3
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
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
} from "@/redux/slices/admin/adminOrderSlice";

import {
  getAllOrders,
  releaseAffiliateCommission as releaseAffiliateCommissionApi,
  deleteOrder as deleteOrderApi,
} from "@/lib/admin/adminOrderApi";

export const useAdminOrders = () => {
  const dispatch = useDispatch();

  const {
    orders,
    loading,
    error,
    releasingId,
    deletingId,
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

  // ==============================
  // DELETE ORDER
  // ==============================

  const deleteOrder = useCallback(
    async (orderId) => {
      try {
        dispatch(
          deleteOrderStart(orderId)
        );

        const response =
          await deleteOrderApi(orderId);

        dispatch(
          deleteOrderSuccess(orderId)
        );

        return response;
      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to delete order";

        dispatch(
          deleteOrderFailure(message)
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
    deletingId,
    fetchOrders,
    releaseAffiliateCommission,
    deleteOrder,
  };
};