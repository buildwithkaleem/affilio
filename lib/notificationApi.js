import api from "./api";

export const getNotifications = async () => {
  const response = await api.get("/api/v1/notification");
  return response.data;
};

export const getNotificationById = async (id) => {
  const response = await api.get(
    `/api/v1/notification/${id}`
  );

  return response.data;
};

export const getUnreadCount = async () => {
  const response = await api.get(
    "/api/v1/notification/unreadCount"
  );

  return response.data;
};

export const markNotificationAsRead = async (id) => {
  const response = await api.post(
    `/api/v1/notification/read/${id}`
  );

  return response.data;
};



