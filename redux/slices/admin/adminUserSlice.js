// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   users: [],
//   loading: false,
//   error: null,
//   updating: false,
//   deleting: false,
// };

// const adminUserSlice = createSlice({
//   name: "adminUsers",

//   initialState,

//   reducers: {
//     // =========================
//     // GET USERS
//     // =========================

//     usersRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },

//     usersSuccess: (state, action) => {
//       state.loading = false;
//       state.users = action.payload || [];
//       state.error = null;
//     },

//     usersFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // =========================
//     // ADD USER
//     // =========================

//     addUser: (state, action) => {
//       state.users.unshift(action.payload);
//     },

//     // =========================
//     // UPDATE USER START
//     // =========================

//     updateUserStart: (state) => {
//       state.updating = true;
//       state.error = null;
//     },

//     // =========================
//     // UPDATE USER SUCCESS
//     // =========================

//     updateUserSuccess: (state, action) => {
//       state.updating = false;

//       const updatedUser = action.payload;

//       const index = state.users.findIndex(
//         (user) => user._id === updatedUser._id
//       );

//       if (index !== -1) {
//         state.users[index] = updatedUser;
//       }

//       state.error = null;
//     },

//     // =========================
//     // UPDATE USER FAILURE
//     // =========================

//     updateUserFailure: (state, action) => {
//       state.updating = false;
//       state.error = action.payload;
//     },

//     // =========================
//     // DELETE USER START
//     // =========================

//     deleteUserStart: (state) => {
//       state.deleting = true;
//       state.error = null;
//     },

//     // =========================
//     // DELETE USER SUCCESS
//     // =========================

//     deleteUserSuccess: (state, action) => {
//       state.deleting = false;

//       const userId = action.payload;

//       state.users = state.users.filter(
//         (user) => user._id !== userId
//       );

//       state.error = null;
//     },

//     // =========================
//     // DELETE USER FAILURE
//     // =========================

//     deleteUserFailure: (state, action) => {
//       state.deleting = false;
//       state.error = action.payload;
//     },

//     // =========================
//     // CLEAR ERROR
//     // =========================

//     clearAdminUserError: (state) => {
//       state.error = null;
//     },

//     // =========================
//     // CLEAR USERS
//     // =========================

//     clearAdminUsers: (state) => {
//       state.users = [];
//       state.loading = false;
//       state.updating = false;
//       state.deleting = false;
//       state.error = null;
//     },
//   },
// });

// export const {
//   usersRequest,
//   usersSuccess,
//   usersFailure,

//   addUser,

//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,

//   deleteUserStart,
//   deleteUserSuccess,
//   deleteUserFailure,

//   clearAdminUserError,
//   clearAdminUsers,
// } = adminUserSlice.actions;

// export default adminUserSlice.reducer;





// v2
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],

  loading: false,
  error: null,

  updating: false,
  deletingId: null,
};

const adminUserSlice = createSlice({
  name: "adminUsers",

  initialState,

  reducers: {
    // =========================
    // GET USERS
    // =========================

    usersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    usersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload || [];
      state.error = null;
    },

    usersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // ADD USER
    // =========================

    addUser: (state, action) => {
      state.users.unshift(action.payload);
    },

    // =========================
    // UPDATE USER START
    // =========================

    updateUserStart: (state) => {
      state.updating = true;
      state.error = null;
    },

    // =========================
    // UPDATE USER SUCCESS
    // =========================

    updateUserSuccess: (state, action) => {
      state.updating = false;

      const updatedUser = action.payload;

      const index = state.users.findIndex(
        (user) => user._id === updatedUser._id
      );

      if (index !== -1) {
        state.users[index] = updatedUser;
      }

      state.error = null;
    },

    // =========================
    // UPDATE USER FAILURE
    // =========================

    updateUserFailure: (state, action) => {
      state.updating = false;
      state.error = action.payload;
    },

    // =========================
    // DELETE USER START
    // =========================

    deleteUserStart: (state, action) => {
      state.deletingId = action.payload;
      state.error = null;
    },

    // =========================
    // DELETE USER SUCCESS
    // =========================

    deleteUserSuccess: (state, action) => {
      const userId = action.payload;

      state.users = state.users.filter(
        (user) => user._id !== userId
      );

      state.deletingId = null;
      state.error = null;
    },

    // =========================
    // DELETE USER FAILURE
    // =========================

    deleteUserFailure: (state, action) => {
      state.deletingId = null;
      state.error = action.payload;
    },

    // =========================
    // CLEAR ERROR
    // =========================

    clearAdminUserError: (state) => {
      state.error = null;
    },

    // =========================
    // CLEAR USERS
    // =========================

    clearAdminUsers: (state) => {
      state.users = [];
      state.loading = false;
      state.updating = false;
      state.deletingId = null;
      state.error = null;
    },
  },
});

export const {
  usersRequest,
  usersSuccess,
  usersFailure,

  addUser,

  updateUserStart,
  updateUserSuccess,
  updateUserFailure,

  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,

  clearAdminUserError,
  clearAdminUsers,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;