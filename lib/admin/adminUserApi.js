// import api from "@/lib/api";

// // ==============================
// // GET ALL USERS
// // ==============================

// export const getAllUsers = async () => {
//   const response = await api.get(
//     "/admin/api/v1/getAllUsers"
//   );

//   return response.data;
// };

// // ==============================
// // DELETE USER
// // ==============================

// export const deleteUser = async (userId) => {
//   const response = await api.delete(
//     `/admin/api/v1/deleteUser/${userId}`
//   );

//   return response.data;
// };

// // ==============================
// // UPDATE USER
// // ==============================

// export const updateUser = async (userId, userData) => {
//   const response = await api.post(
//     `/admin/api/v1/updateUser/${userId}`,
//     userData
//   );

//   return response.data;
// };



// v2
import api from "@/lib/api";

export const getAllUsers = async () => {
  const response = await api.get(
    "/admin/api/v1/getAllUsers"
  );

  return response.data;
};

export const updateUser = async (
  userId,
  userData
) => {
  const response = await api.post(
    `/admin/api/v1/updateUser/${userId}`,
    userData
  );

  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(
    `/admin/api/v1/deleteUser/${userId}`
  );

  return response.data;
};