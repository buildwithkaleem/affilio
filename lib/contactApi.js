import api from "./api";

// ========================================
// CREATE CONTACT - PUBLIC
// ========================================

export const createContact = async (data) => {
  const response = await api.post("/api/v1/contact", data);
  return response.data;
};


// ========================================
// GET ALL CONTACTS - ADMIN
// ========================================

export const getAllContacts = async () => {
  const response = await api.get("/admin/api/v1/getAllContacts");
  return response.data;
};


// ========================================
// GET SINGLE CONTACT - ADMIN
// ========================================

export const getSingleContact = async (id) => {
  const response = await api.get(`/admin/api/v1/contact/${id}`);
  return response.data;
};


// ========================================
// DELETE CONTACT - ADMIN
// ========================================

export const deleteContact = async (id) => {
  const response = await api.delete(`/admin/api/v1/contact/${id}`);
  return response.data;
};