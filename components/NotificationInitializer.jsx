"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  notificationsRequest,
  notificationsSuccess,
  notificationsFailure,
} from "@/redux/slices/notificationSlice";

import {
  getNotifications,
  getUnreadCount,
} from "@/lib/notificationApi";

export default function NotificationInitializer({
  children,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const fetchNotifications = async () => {
      try {
        dispatch(notificationsRequest());

        const [notificationsResponse, countResponse] =
          await Promise.all([
            getNotifications(),
            getUnreadCount(),
          ]);

        if (!mounted) return;

        const notifications =
          notificationsResponse?.data?.notifications || [];

        const unreadCount =
          countResponse?.data?.count || 0;

        dispatch(
          notificationsSuccess({
            notifications,
            unreadCount,
          })
        );
      } catch (error) {
        if (!mounted) return;

        console.error(
          "Notification fetch error:",
          error
        );

        dispatch(
          notificationsFailure(
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch notifications"
          )
        );
      }
    };

    fetchNotifications();

    const interval = setInterval(
      fetchNotifications,
      30000
    );

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [dispatch]);

  return children;
}