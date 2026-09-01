// import api from "@/lib/api";

// // ==============================
// // GET ALL ORDERS
// // ==============================

// export const getAllOrders = async () => {
//   const response = await api.get(
//     "/admin/api/v1/getAllOrders"
//   );

//   return response.data;
// };

// // ==============================
// // RELEASE AFFILIATE COMMISSION
// // ==============================

// export const releaseAffiliateCommission = async (
//   orderId
// ) => {
//   const response = await api.post(
//     `/admin/api/v1/releaseAffiliateCommission/${orderId}`
//   );

//   return response.data;
// };

// // ==============================
// // DELETE ORDER
// // ==============================

// export const deleteOrder = async (orderId) => {
//   const response = await api.delete(
//     `/admin/api/v1/deleteOrder/${orderId}`
//   );

//   return response.data;
// };






// v2
import api from "@/lib/api";

// ==============================
// GET ALL ORDERS
// ==============================

export const getAllOrders = async () => {
  const response = await api.get(
    "/admin/api/v1/getAllOrders"
  );

  return response.data;
};


// ==============================
// RELEASE AFFILIATE COMMISSION
// ==============================

export const releaseAffiliateCommission = async (
  orderId
) => {
  const response = await api.post(
    `/admin/api/v1/releaseAffiliateCommission/${orderId}`
  );

  return response.data;
};


// ==============================
// DELETE ORDER
// ==============================

export const deleteOrder = async (orderId) => {
  const response = await api.delete(
    `/admin/api/v1/deleteOrder/${orderId}`
  );

  return response.data;
};