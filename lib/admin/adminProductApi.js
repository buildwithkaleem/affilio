// import api from "@/lib/api";

// // ==============================
// // GET ALL AFFILIATE PRODUCTS
// // ==============================

// export const getAllAffiliateProducts = async () => {
//   const response = await api.get(
//     "/admin/api/v1/getAllAffiliateProducts"
//   );

//   return response.data;
// };

// // ==============================
// // ADD AFFILIATE PRODUCT
// // ==============================

// export const addAffiliateProduct = async (
//   productUrl,
//   persent
// ) => {
//   const response = await api.post(
//     "/admin/api/v1/addAffiliateProducts",
//     {
//       productUrl,
//       persent,
//     }
//   );

//   return response.data;
// };




// v2
import api from "@/lib/api";

// ==============================
// GET ALL AFFILIATE PRODUCTS
// ==============================

export const getAllAffiliateProducts = async () => {
  const response = await api.get(
    "/admin/api/v1/getAllAffiliateProducts"
  );

  return response.data;
};

// ==============================
// ADD AFFILIATE PRODUCT
// ==============================

export const addAffiliateProduct = async (
  productUrl,
  persent
) => {
  const response = await api.post(
    "/admin/api/v1/addAffiliateProducts",
    {
      productUrl,
      persent,
    }
  );

  return response.data;
};

// ==============================
// DELETE AFFILIATE PRODUCT
// ==============================

export const deleteAffiliateProduct = async (
  productId
) => {
  const response = await api.delete(
    `/admin/api/v1/deleteAffiliateProduct/${productId}`
  );

  return response.data;
};