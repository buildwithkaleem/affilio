
"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import {
  Bell,
  CheckCircle2,
  Clock3,
  Wallet,
  ShoppingBag,
  Package,
  Loader2,
  ArrowRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import {
  markNotificationAsRead,
} from "@/redux/slices/notificationSlice";

import {
  markNotificationAsRead as markNotificationAsReadApi,
} from "@/lib/notificationApi";

export default function AdminNotificationsPage() {
  const dispatch = useDispatch();

  // =========================
  // NOTIFICATION REDUX STATE
  // =========================

  const {
    notifications = [],
    loading,
    error,
  } = useSelector(
    (state) => state.notification
  );

  // =========================
  // MARK AS READ
  // =========================

  const handleNotificationClick = async (
    notification
  ) => {
    if (notification.isRead) {
      return;
    }

    try {
      await markNotificationAsReadApi(
        notification._id
      );

      dispatch(
        markNotificationAsRead(
          notification._id
        )
      );
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  // =========================
  // ICON
  // =========================

  const getNotificationIcon = (
    notification
  ) => {
    const title =
      notification.title?.toLowerCase() || "";

    if (title.includes("withdraw")) {
      return (
        <Wallet className="h-5 w-5" />
      );
    }

    if (title.includes("order")) {
      return (
        <ShoppingBag className="h-5 w-5" />
      );
    }

    if (title.includes("product")) {
      return (
        <Package className="h-5 w-5" />
      );
    }

    return (
      <Bell className="h-5 w-5" />
    );
  };

  // =========================
  // STATUS
  // =========================

  const getStatus = (notification) => {
    if (notification.isRead) {
      return (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Read
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1 text-xs font-medium text-primary">
        <Clock3 className="h-3.5 w-3.5" />
        Unread
      </div>
    );
  };

  // =========================
  // DATE
  // =========================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString(
      undefined,
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading notifications...
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="space-y-6">

      {/* =========================
          HEADER
      ========================= */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Notifications
        </h1>

        <p className="mt-2 text-muted-foreground">
          Stay updated with activity across your platform.
        </p>
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* =========================
          EMPTY
      ========================= */}

      {!error &&
        notifications.length === 0 && (
          <Card>
            <CardContent className="flex min-h-[350px] flex-col items-center justify-center text-center">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <Bell className="h-7 w-7 text-muted-foreground" />
              </div>

              <h2 className="text-lg font-semibold">
                No notifications
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                You're all caught up.
              </p>

            </CardContent>
          </Card>
        )}

      {/* =========================
          NOTIFICATIONS
      ========================= */}

      {notifications.length > 0 && (
        <div className="space-y-3">

          {notifications.map(
            (notification) => (

              <Link
                key={notification._id}
                href={`/admin/notifications/${notification._id}`}
                onClick={() =>
                  handleNotificationClick(
                    notification
                  )
                }
                className="block"
              >

                <Card
                  className={`cursor - pointer transition - all hover: -translate - y - [1px] hover: shadow - md ${
  !notification.isRead
    ? "border-primary/30 bg-primary/[0.03]"
    : ""
} `}
                >

                  <CardContent className="p-4 sm:p-5">

                    <div className="flex gap-4">

                      {/* =========================
                          ICON
                      ========================= */}

                      <div
                        className={`flex h - 11 w - 11 shrink - 0 items - center justify - center rounded - xl ${
  notification.isRead
    ? "bg-muted text-muted-foreground"
    : "bg-primary/10 text-primary"
} `}
                      >
                        {getNotificationIcon(
                          notification
                        )}
                      </div>

                      {/* =========================
                          CONTENT
                      ========================= */}

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                          <div className="min-w-0">

                            <div className="flex items-center gap-2">

                              <h3
                                className={`text - sm sm: text - base ${
  !notification.isRead
    ? "font-semibold"
    : "font-medium"
} `}
                              >
                                {notification.title ||
                                  "Notification"}
                              </h3>

                              {!notification.isRead && (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                              )}

                            </div>

                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                              {notification.message ||
                                "No message available."}
                            </p>

                          </div>

                          {/* STATUS */}

                          <div className="shrink-0">
                            {getStatus(
                              notification
                            )}
                          </div>

                        </div>

                        {/* =========================
                            AMOUNT
                        ========================= */}

                        {notification.amount !==
                          undefined &&
                          notification.amount !==
                            null && (
                            <div className="mt-3 text-sm font-semibold">
                              Rs.{" "}
                              {Number(
                                notification.amount
                              ).toLocaleString()}
                            </div>
                          )}

                        {/* =========================
                            BOTTOM
                        ========================= */}

                        <div className="mt-3 flex items-center justify-between">

                          <p className="text-xs text-muted-foreground">
                            {formatDate(
                              notification.createdAt
                            )}
                          </p>

                          <div className="flex items-center gap-1 text-xs font-medium text-primary">
                            View details
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>

                        </div>

                      </div>

                    </div>

                  </CardContent>

                </Card>

              </Link>

            )
          )}

        </div>
      )}

    </div>
  );
}
