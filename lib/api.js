
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