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
    "/admin/api/v1/addAffilliateProducts",
    {
      productUrl,
      persent,
    }
  );

  return response.data;
};