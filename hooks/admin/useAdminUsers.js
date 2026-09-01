
// "use client";

// import { useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   usersRequest,
//   usersSuccess,
//   usersFailure,

//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,

//   deleteUserStart,
//   deleteUserSuccess,
//   deleteUserFailure,
// } from "@/redux/slices/admin/adminUserSlice";

// import {
//   getAllUsers,
//   updateUser as updateUserApi,
//   deleteUser as deleteUserApi,
// } from "@/lib/admin/adminUserApi";

// export const useAdminUsers = () => {
//   const dispatch = useDispatch();

//   const {
//     users,
//     loading,
//     error,
//     updating,
//     deletingId,
//   } = useSelector(
//     (state) => state.adminUsers
//   );

//   // ==============================
//   // GET ALL USERS
//   // ==============================

//   const fetchUsers = useCallback(async () => {
//     try {
//       dispatch(usersRequest());

//       const response = await getAllUsers();

//       dispatch(
//         usersSuccess(
//           response?.data || []
//         )
//       );

//       return response;

//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "Failed to fetch users";

//       dispatch(
//         usersFailure(message)
//       );

//       throw error;
//     }
//   }, [dispatch]);

//   // ==============================
//   // UPDATE USER
//   // ==============================

//   const updateUser = useCallback(
//     async (userId, userData) => {
//       try {
//         dispatch(updateUserStart());

//         const response =
//           await updateUserApi(
//             userId,
//             userData
//           );

//         const updatedUser =
//           response?.data;

//         if (!updatedUser) {
//           throw new Error(
//             "Updated user data not received"
//           );
//         }

//         dispatch(
//           updateUserSuccess(
//             updatedUser
//           )
//         );

//         return response;

//       } catch (error) {
//         const message =
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to update user";

//         dispatch(
//           updateUserFailure(message)
//         );

//         throw error;
//       }
//     },
//     [dispatch]
//   );

//   // ==============================
//   // DELETE USER
//   // ==============================

//   // const deleteUser = useCallback(
//   //   async (userId) => {
//   //     try {
//   //       dispatch(deleteUserStart(userId));

//   //       await deleteUserApi(userId);

//   //       /*
//   //        * API successful hone ke baad
//   //        * Redux se user foran remove hoga.
//   //        *
//   //        * Dobara GET users call nahi karni.
//   //        */

//   //       dispatch(
//   //         deleteUserSuccess(userId)
//   //       );

//   //     } catch (error) {
//   //       const message =
//   //         error.response?.data?.message ||
//   //         error.message ||
//   //         "Failed to delete user";

//   //       dispatch(
//   //         deleteUserFailure(message)
//   //       );

//   //       throw error;
//   //     }
//   //   },
//   //   [dispatch]
//   // );

//   const deleteUser = useCallback(
//     async (userId) => {
//       try {
//         dispatch(deleteUserStart(userId));

//         await deleteUserApi(userId);

//         dispatch(deleteUserSuccess(userId));

//       } catch (error) {
//         const message =
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to delete user";

//         dispatch(
//           deleteUserFailure(message)
//         );

//         throw error;
//       }
//     },
//     [dispatch]
//   );

//   return {
//     users,
//     loading,
//     error,
//     updating,
//     deletingId,

//     fetchUsers,
//     updateUser,
//     deleteUser,
//   };
// };





// v2
"use client";

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  usersRequest,
  usersSuccess,
  usersFailure,

  updateUserStart,
  updateUserSuccess,
  updateUserFailure,

  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "@/redux/slices/admin/adminUserSlice";

import {
  getAllUsers,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
} from "@/lib/admin/adminUserApi";

export const useAdminUsers = () => {
  const dispatch = useDispatch();

  const {
    users,
    loading,
    error,
    updating,
    deletingId,
  } = useSelector(
    (state) => state.adminUsers
  );

  // ==============================
  // GET ALL USERS
  // ==============================

  const fetchUsers = useCallback(async () => {
    try {
      dispatch(usersRequest());

      const response = await getAllUsers();

      dispatch(
        usersSuccess(
          response?.data || []
        )
      );

      return response;

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch users";

      dispatch(
        usersFailure(message)
      );

      throw error;
    }
  }, [dispatch]);

  // ==============================
  // UPDATE USER
  // ==============================

  const updateUser = useCallback(
    async (userId, userData) => {
      try {
        dispatch(updateUserStart());

        const response =
          await updateUserApi(
            userId,
            userData
          );

        const updatedUser =
          response?.data;

        if (!updatedUser) {
          throw new Error(
            "Updated user data not received"
          );
        }

        dispatch(
          updateUserSuccess(
            updatedUser
          )
        );

        return response;

      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to update user";

        dispatch(
          updateUserFailure(message)
        );

        throw error;
      }
    },
    [dispatch]
  );

  // ==============================
  // DELETE USER
  // ==============================

  const deleteUser = useCallback(
    async (userId) => {
      try {
        // Start deleting specific user
        dispatch(
          deleteUserStart(userId)
        );

        // API request
        await deleteUserApi(userId);

        // Remove immediately from Redux
        dispatch(
          deleteUserSuccess(userId)
        );

      } catch (error) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to delete user";

        dispatch(
          deleteUserFailure(message)
        );

        throw error;
      }
    },
    [dispatch]
  );

  // ==============================
  // RETURN
  // ==============================

  return {
    users,
    loading,
    error,
    updating,
    deletingId,

    fetchUsers,
    updateUser,
    deleteUser,
  };
};