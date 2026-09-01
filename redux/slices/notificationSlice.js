// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   notifications: [],
//   unreadCount: 0,
//   loading: false,
//   error: null,
// };

// const notificationSlice = createSlice({
//   name: "notification",

//   initialState,

//   reducers: {
//     // =========================
//     // FETCH START
//     // =========================

//     notificationsRequest: (state) => {
//       state.loading = true;
//       state.error = null;
//     },

//     // =========================
//     // FETCH SUCCESS
//     // =========================

//     notificationsSuccess: (state, action) => {
//       state.loading = false;
//       state.notifications = action.payload.notifications || [];
//       state.unreadCount = action.payload.unreadCount ?? 0;
//       state.error = null;
//     },

//     // =========================
//     // FETCH FAILURE
//     // =========================

//     notificationsFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // =========================
//     // SET NOTIFICATIONS
//     // =========================

//     setNotifications: (state, action) => {
//       state.notifications = action.payload || [];

//       state.unreadCount = state.notifications.filter(
//         (notification) => !notification.isRead
//       ).length;
//     },

//     // =========================
//     // SET UNREAD COUNT
//     // =========================

//     setUnreadCount: (state, action) => {
//       state.unreadCount = action.payload || 0;
//     },

//     // =========================
//     // ADD NEW NOTIFICATION
//     // =========================

//     addNotification: (state, action) => {
//       const notification = action.payload;

//       state.notifications.unshift(notification);

//       if (!notification.isRead) {
//         state.unreadCount += 1;
//       }
//     },

//     // =========================
//     // MARK ONE AS READ
//     // =========================

//     markNotificationAsRead: (state, action) => {
//       const notificationId = action.payload;

//       const notification = state.notifications.find(
//         (item) => item._id === notificationId
//       );

//       if (notification && !notification.isRead) {
//         notification.isRead = true;

//         state.unreadCount = Math.max(
//           state.unreadCount - 1,
//           0
//         );
//       }
//     },

//     // =========================
//     // MARK ALL AS READ
//     // =========================

//     markAllNotificationsAsRead: (state) => {
//       state.notifications.forEach(
//         (notification) => {
//           notification.isRead = true;
//         }
//       );

//       state.unreadCount = 0;
//     },

//     // =========================
//     // REMOVE NOTIFICATION
//     // =========================

//     removeNotification: (state, action) => {
//       const notificationId = action.payload;

//       const notification =
//         state.notifications.find(
//           (item) => item._id === notificationId
//         );

//       if (notification && !notification.isRead) {
//         state.unreadCount = Math.max(
//           state.unreadCount - 1,
//           0
//         );
//       }

//       state.notifications =
//         state.notifications.filter(
//           (item) => item._id !== notificationId
//         );
//     },

//     // =========================
//     // CLEAR NOTIFICATIONS
//     // =========================

//     clearNotifications: (state) => {
//       state.notifications = [];
//       state.unreadCount = 0;
//       state.loading = false;
//       state.error = null;
//     },

//     // =========================
//     // CLEAR ERROR
//     // =========================

//     clearNotificationError: (state) => {
//       state.error = null;
//     },
//   },
// });

// export const {
//   notificationsRequest,
//   notificationsSuccess,
//   notificationsFailure,
//   setNotifications,
//   setUnreadCount,
//   addNotification,
//   markNotificationAsRead,
//   markAllNotificationsAsRead,
//   removeNotification,
//   clearNotifications,
//   clearNotificationError,
// } = notificationSlice.actions;

// export default notificationSlice.reducer;






// v2
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",

  initialState,

  reducers: {
    // =========================
    // FETCH START
    // =========================

    notificationsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    // =========================
    // FETCH SUCCESS
    // =========================

    notificationsSuccess: (state, action) => {
      state.loading = false;

      state.notifications =
        action.payload.notifications || [];

      state.unreadCount =
        action.payload.unreadCount ??
        state.notifications.filter(
          (notification) => !notification.isRead
        ).length;

      state.error = null;
    },

    // =========================
    // FETCH FAILURE
    // =========================

    notificationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // =========================
    // SET NOTIFICATIONS
    // =========================

    setNotifications: (state, action) => {
      state.notifications =
        action.payload || [];

      state.unreadCount =
        state.notifications.filter(
          (notification) => !notification.isRead
        ).length;
    },

    // =========================
    // SET UNREAD COUNT
    // =========================

    setUnreadCount: (state, action) => {
      state.unreadCount =
        action.payload || 0;
    },

    // =========================
    // ADD NEW NOTIFICATION
    // =========================

    addNotification: (state, action) => {
      const notification = action.payload;

      if (!notification?._id) {
        return;
      }

      // Duplicate notification prevent
      const exists = state.notifications.some(
        (item) =>
          item._id === notification._id
      );

      if (exists) {
        return;
      }

      // New notification top par
      state.notifications.unshift(
        notification
      );

      // Unread count
      if (!notification.isRead) {
        state.unreadCount += 1;
      }
    },

    // =========================
    // MARK ONE AS READ
    // =========================

    markNotificationAsRead: (
      state,
      action
    ) => {
      const notificationId =
        action.payload;

      const notification =
        state.notifications.find(
          (item) =>
            item._id === notificationId
        );

      if (
        notification &&
        !notification.isRead
      ) {
        notification.isRead = true;

        state.unreadCount = Math.max(
          state.unreadCount - 1,
          0
        );
      }
    },

    // =========================
    // MARK ALL AS READ
    // =========================

    markAllNotificationsAsRead: (
      state
    ) => {
      state.notifications.forEach(
        (notification) => {
          notification.isRead = true;
        }
      );

      state.unreadCount = 0;
    },

    // =========================
    // REMOVE NOTIFICATION
    // =========================

    removeNotification: (
      state,
      action
    ) => {
      const notificationId =
        action.payload;

      const notification =
        state.notifications.find(
          (item) =>
            item._id === notificationId
        );

      if (
        notification &&
        !notification.isRead
      ) {
        state.unreadCount = Math.max(
          state.unreadCount - 1,
          0
        );
      }

      state.notifications =
        state.notifications.filter(
          (item) =>
            item._id !== notificationId
        );
    },

    // =========================
    // CLEAR NOTIFICATIONS
    // =========================

    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
      state.loading = false;
      state.error = null;
    },

    // =========================
    // CLEAR ERROR
    // =========================

    clearNotificationError: (state) => {
      state.error = null;
    },
  },
});

export const {
  notificationsRequest,
  notificationsSuccess,
  notificationsFailure,
  setNotifications,
  setUnreadCount,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearNotifications,
  clearNotificationError,
} = notificationSlice.actions;

export default notificationSlice.reducer;