// import axios from "axios";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;



// v2
// import axios from "axios";
// import { store } from "@/redux/store";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const accessToken = store.getState().auth.accessToken;

//     console.log("ACCESS TOKEN:", accessToken);

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default api;




// // v3
// import axios from "axios";
// import { store } from "@/redux/store";
// import { setAccessToken, logout } from "@/redux/slices/authSlice";

// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     const accessToken = store.getState().auth.accessToken;

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// // Response interceptor
// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     // Access token expired
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/auth/api/v1/generate-token")
//     ) {
//       originalRequest._retry = true;

//       try {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/api/v1/generate-token`,
//           {},
//           {
//             withCredentials: true,
//           }
//         );

//         const newAccessToken =
//           response.data.data.accessToken;

//         // Redux mein new access token save
//         store.dispatch(
//           setAccessToken(newAccessToken)
//         );

//         // Original request mein new token
//         originalRequest.headers.Authorization =
//           `Bearer ${newAccessToken}`;

//         // Original request dobara
//         return api(originalRequest);

//       } catch (refreshError) {
//         // Refresh token bhi expire/invalid
//         store.dispatch(logout());

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;




// v4
// import axios from "axios";
// import { store } from "@/redux/store";
// import {
//   setAccessToken,
//   logout,
// } from "@/redux/slices/authSlice";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Refresh request ke waqt multiple requests ko control karne ke liye
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((promise) => {
//     if (error) {
//       promise.reject(error);
//     } else {
//       promise.resolve(token);
//     }
//   });

//   failedQueue = [];
// };


// // ==============================
// // REQUEST INTERCEPTOR
// // ==============================

// api.interceptors.request.use(
//   (config) => {
//     const accessToken =
//       store.getState().auth.accessToken;

//     // Refresh endpoint par Access Token nahi bhejna
//     const isRefreshRequest =
//       config.url?.includes(
//         "/auth/api/v1/generate-token"
//       );

//     if (accessToken && !isRefreshRequest) {
//       config.headers.Authorization =
//         `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// // ==============================
// // RESPONSE INTERCEPTOR
// // ==============================

// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     // Request hi nahi hai
//     if (!originalRequest) {
//       return Promise.reject(error);
//     }

//     const isRefreshRequest =
//       originalRequest.url?.includes(
//         "/auth/api/v1/generate-token"
//       );

//     // Agar refresh request hi fail ho gayi
//     if (isRefreshRequest) {
//       store.dispatch(logout());

//       return Promise.reject(error);
//     }

//     // Sirf 401 par refresh
//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry
//     ) {

//       // Agar already refresh chal raha hai
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {

//           failedQueue.push({
//             resolve,
//             reject,
//           });

//         }).then((newAccessToken) => {

//           originalRequest.headers.Authorization =
//             `Bearer ${newAccessToken}`;

//           return api(originalRequest);

//         }).catch((err) => {

//           return Promise.reject(err);

//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {

//         console.log("Refreshing access token...");

//         // IMPORTANT:
//         // axios direct use kar rahe hain,
//         // api instance nahi
//         const response = await axios.post(
//           `${API_URL}/auth/api/v1/generate-token`,
//           {},
//           {
//             withCredentials: true,
//           }
//         );

//         const newAccessToken =
//           response.data?.data?.accessToken;

//         if (!newAccessToken) {
//           throw new Error(
//             "New access token not received"
//           );
//         }

//         console.log(
//           "New access token received"
//         );

//         // Redux mein save
//         store.dispatch(
//           setAccessToken(newAccessToken)
//         );

//         // Waiting requests ko new token do
//         processQueue(
//           null,
//           newAccessToken
//         );

//         // Original request mein token update
//         originalRequest.headers.Authorization =
//           `Bearer ${newAccessToken}`;

//         // Original request retry
//         return api(originalRequest);

//       } catch (refreshError) {

//         console.error(
//           "Refresh token failed:",
//           refreshError
//         );

//         processQueue(refreshError, null);

//         store.dispatch(logout());

//         return Promise.reject(
//           refreshError
//         );

//       } finally {

//         isRefreshing = false;

//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;




// v5
// import axios from "axios";
// import { store } from "@/redux/store";
// import {
//   setAccessToken,
//   logout,
// } from "@/redux/slices/authSlice";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ======================================
// // SINGLE REFRESH PROMISE
// // ======================================

// let refreshPromise = null;

// // ======================================
// // REQUEST INTERCEPTOR
// // ======================================

// api.interceptors.request.use(
//   (config) => {
//     const accessToken =
//       store.getState().auth.accessToken;

//     if (accessToken) {
//       config.headers =
//         config.headers || {};

//       config.headers.Authorization =
//         `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ======================================
// // REFRESH TOKEN REQUEST
// // ======================================

// const refreshTokenRequest = async () => {
//   try {
//     console.log("Refreshing access token...");

//     const response = await axios.post(
//       `${API_URL}/auth/api/v1/generate-token`,
//       {},
//       {
//         withCredentials: true,
//       }
//     );

//     const newAccessToken =
//       response.data?.data?.accessToken;

//     if (!newAccessToken) {
//       throw new Error(
//         "New access token not received"
//       );
//     }

//     store.dispatch(
//       setAccessToken(newAccessToken)
//     );

//     console.log(
//       "Access token refreshed successfully"
//     );

//     return newAccessToken;

//   } catch (error) {
//     console.error(
//       "Refresh token failed:",
//       error.response?.data || error.message
//     );

//     store.dispatch(logout());

//     throw error;
//   }
// };

// // ======================================
// // RESPONSE INTERCEPTOR
// // ======================================

// api.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const originalRequest = error.config;

//     if (!originalRequest) {
//       return Promise.reject(error);
//     }

//     // ----------------------------------
//     // Refresh endpoint ko retry nahi karna
//     // ----------------------------------

//     if (
//       originalRequest.url?.includes(
//         "/auth/api/v1/generate-token"
//       )
//     ) {
//       return Promise.reject(error);
//     }

//     // ----------------------------------
//     // Sirf 401 handle karo
//     // ----------------------------------

//     if (
//       error.response?.status !== 401 ||
//       originalRequest._retry
//     ) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     try {
//       // --------------------------------
//       // Agar refresh already chal raha hai
//       // to same promise wait karo
//       // --------------------------------

//       if (!refreshPromise) {
//         refreshPromise =
//           refreshTokenRequest();

//         refreshPromise.finally(() => {
//           refreshPromise = null;
//         });
//       }

//       const newAccessToken =
//         await refreshPromise;

//       // --------------------------------
//       // Original request retry
//       // --------------------------------

//       originalRequest.headers =
//         originalRequest.headers || {};

//       originalRequest.headers.Authorization =
//         `Bearer ${newAccessToken}`;

//       return api(originalRequest);

//     } catch (refreshError) {
//       return Promise.reject(
//         refreshError
//       );
//     }
//   }
// );

// export default api;





// v6
import axios from "axios";
import { store } from "@/redux/store";
import {
  setAccessToken,
  logout,
} from "@/redux/slices/authSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// ==============================
// REQUEST INTERCEPTOR
// ==============================

api.interceptors.request.use(
  (config) => {
    const accessToken =
      store.getState().auth.accessToken;

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==============================
// RESPONSE INTERCEPTOR
// ==============================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Sirf 401 handle karo
    if (
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ==============================
    // AGAR ALREADY REFRESH HO RAHA HAI
    // ==============================

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve,
          reject,
        });
      })
        .then((newAccessToken) => {
          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;

          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    // ==============================
    // START REFRESH
    // ==============================

    isRefreshing = true;

    try {
      console.log("Refreshing access token...");

      const response = await axios.post(
        `${API_URL}/auth/api/v1/generate-token`,
        {},
        {
          withCredentials: true,
        }
      );

      const newAccessToken =
        response.data?.data?.accessToken;

      if (!newAccessToken) {
        throw new Error(
          "New access token not received"
        );
      }

      console.log(
        "New access token received"
      );

      // Redux update
      store.dispatch(
        setAccessToken(newAccessToken)
      );

      // Waiting requests
      processQueue(
        null,
        newAccessToken
      );

      // Original request
      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      // Retry
      return api(originalRequest);

    } catch (refreshError) {

      console.error(
        "Refresh token failed:",
        refreshError.response?.data ||
        refreshError.message
      );

      processQueue(
        refreshError,
        null
      );

      store.dispatch(logout());

      return Promise.reject(
        refreshError
      );

    } finally {
      isRefreshing = false;
    }
  }
);

export default api;