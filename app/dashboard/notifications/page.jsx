// v1
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// import {
//   Bell,
//   CheckCircle2,
//   Clock3,
//   Wallet,
//   ShoppingBag,
//   Package,
//   Loader2,
//   ArrowRight,
// } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";

// import api from "@/lib/api";

// import {
//   markNotificationAsRead,
// } from "@/redux/slices/notificationSlice";

// export default function NotificationsPage() {
//   const dispatch = useDispatch();

//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // =========================
//   // GET NOTIFICATIONS
//   // =========================

//   const getNotifications = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get(
//         "/api/v1/notification"
//       );

//       const data =
//         response.data?.data?.notifications || [];

//       setNotifications(data);
//     } catch (error) {
//       console.error(
//         "Failed to fetch notifications:",
//         error
//       );

//       setError(
//         error.response?.data?.message ||
//         "Failed to fetch notifications"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getNotifications();
//   }, []);

//   // =========================
//   // MARK AS READ
//   // =========================

//   const handleNotificationClick = async (
//     notification
//   ) => {
//     if (notification.isRead) {
//       return;
//     }

//     try {
//       const response = await api.post(
//         `/api/v1/notification/read/${notification._id}`
//       );

//       const updatedNotification =
//         response.data?.data?.notification;

//       // Local state update
//       setNotifications((prev) =>
//         prev.map((item) =>
//           item._id === notification._id
//             ? {
//               ...item,
//               isRead: true,
//               expireAt:
//                 updatedNotification?.expireAt ||
//                 item.expireAt,
//             }
//             : item
//         )
//       );

//       // Redux update
//       dispatch(
//         markNotificationAsRead(
//           notification._id
//         )
//       );
//     } catch (error) {
//       console.error(
//         "Failed to mark notification as read:",
//         error
//       );
//     }
//   };

//   // =========================
//   // ICON
//   // =========================

//   const getNotificationIcon = (
//     notification
//   ) => {
//     const title =
//       notification.title?.toLowerCase() || "";

//     if (title.includes("withdraw")) {
//       return (
//         <Wallet className="h-5 w-5" />
//       );
//     }

//     if (title.includes("order")) {
//       return (
//         <ShoppingBag className="h-5 w-5" />
//       );
//     }

//     if (title.includes("product")) {
//       return (
//         <Package className="h-5 w-5" />
//       );
//     }

//     return (
//       <Bell className="h-5 w-5" />
//     );
//   };

//   // =========================
//   // STATUS
//   // =========================

//   const getStatus = (notification) => {
//     if (notification.isRead) {
//       return (
//         <div className="flex items-center gap-1 text-xs text-muted-foreground">
//           <CheckCircle2 className="h-3.5 w-3.5" />
//           Read
//         </div>
//       );
//     }

//     return (
//       <div className="flex items-center gap-1 text-xs font-medium text-primary">
//         <Clock3 className="h-3.5 w-3.5" />
//         Unread
//       </div>
//     );
//   };

//   // =========================
//   // DATE
//   // =========================

//   const formatDate = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleString(
//       undefined,
//       {
//         dateStyle: "medium",
//         timeStyle: "short",
//       }
//     );
//   };

//   // =========================
//   // LOADING
//   // =========================

//   if (loading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//           <Loader2 className="h-5 w-5 animate-spin" />
//           Loading notifications...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">

//       {/* =========================
//           HEADER
//       ========================= */}

//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">
//           Notifications
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Stay updated with your account activity.
//         </p>
//       </div>

//       {/* =========================
//           ERROR
//       ========================= */}

//       {error && (
//         <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
//           {error}
//         </div>
//       )}

//       {/* =========================
//           EMPTY
//       ========================= */}

//       {!error &&
//         notifications.length === 0 && (
//           <Card>
//             <CardContent className="flex min-h-[350px] flex-col items-center justify-center text-center">

//               <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
//                 <Bell className="h-7 w-7 text-muted-foreground" />
//               </div>

//               <h2 className="text-lg font-semibold">
//                 No notifications
//               </h2>

//               <p className="mt-1 text-sm text-muted-foreground">
//                 You're all caught up.
//               </p>

//             </CardContent>
//           </Card>
//         )}

//       {/* =========================
//           NOTIFICATIONS
//       ========================= */}

//       {notifications.length > 0 && (
//         <div className="space-y-3">

//           {notifications.map(
//             (notification) => (

//               <Link
//                 key={notification._id}
//                 href={`/dashboard/notifications/${notification._id}`}
//                 onClick={() =>
//                   handleNotificationClick(
//                     notification
//                   )
//                 }
//                 className="block"
//               >

//                 <Card
//                   className={`cursor-pointer transition-all hover:-translate-y-[1px] hover:shadow-md ${!notification.isRead
//                       ? "border-primary/30 bg-primary/[0.03]"
//                       : ""
//                     }`}
//                 >

//                   <CardContent className="p-4 sm:p-5">

//                     <div className="flex gap-4">

//                       {/* ICON */}

//                       <div
//                         className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${notification.isRead
//                             ? "bg-muted text-muted-foreground"
//                             : "bg-primary/10 text-primary"
//                           }`}
//                       >
//                         {getNotificationIcon(
//                           notification
//                         )}
//                       </div>

//                       {/* CONTENT */}

//                       <div className="min-w-0 flex-1">

//                         <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

//                           <div className="min-w-0">

//                             <div className="flex items-center gap-2">

//                               <h3
//                                 className={`text-sm sm:text-base ${!notification.isRead
//                                     ? "font-semibold"
//                                     : "font-medium"
//                                   }`}
//                               >
//                                 {notification.title}
//                               </h3>

//                               {!notification.isRead && (
//                                 <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
//                               )}

//                             </div>

//                             <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
//                               {notification.message}
//                             </p>

//                           </div>

//                           {/* STATUS */}

//                           <div className="shrink-0">
//                             {getStatus(
//                               notification
//                             )}
//                           </div>

//                         </div>

//                         {/* AMOUNT */}

//                         {notification.amount !==
//                           undefined &&
//                           notification.amount !==
//                           null && (
//                             <div className="mt-3 text-sm font-semibold">
//                               Rs.{" "}
//                               {Number(
//                                 notification.amount
//                               ).toLocaleString()}
//                             </div>
//                           )}

//                         {/* BOTTOM */}

//                         <div className="mt-3 flex items-center justify-between">

//                           <p className="text-xs text-muted-foreground">
//                             {formatDate(
//                               notification.createdAt
//                             )}
//                           </p>

//                           <div className="flex items-center gap-1 text-xs font-medium text-primary">
//                             View details
//                             <ArrowRight className="h-3.5 w-3.5" />
//                           </div>

//                         </div>

//                       </div>

//                     </div>

//                   </CardContent>

//                 </Card>

//               </Link>
//             )
//           )}

//         </div>
//       )}

//     </div>
//   );
// }








// v2
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";

import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Clock3,
  Loader2,
  Package,
  ShoppingBag,
  Sparkles,
  Wallet,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import api from "@/lib/api";

import {
  markNotificationAsRead,
} from "@/redux/slices/notificationSlice";

export default function NotificationsPage() {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // GET NOTIFICATIONS
  // =========================================================

  const getNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/api/v1/notification"
      );

      const data =
        response.data?.data?.notifications || [];

      setNotifications(data);
    } catch (error) {
      console.error(
        "Failed to fetch notifications:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  // =========================================================
  // MARK AS READ
  // =========================================================

  const handleNotificationClick = async (
    notification
  ) => {
    if (notification.isRead) {
      return;
    }

    try {
      const response = await api.post(
        `/api/v1/notification/read/${notification._id}`
      );

      const updatedNotification =
        response.data?.data?.notification;

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === notification._id
            ? {
                ...item,
                isRead: true,
                expireAt:
                  updatedNotification?.expireAt ||
                  item.expireAt,
              }
            : item
        )
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

  // =========================================================
  // UNREAD COUNT
  // =========================================================

  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) => !notification.isRead
    ).length;
  }, [notifications]);

  // =========================================================
  // NOTIFICATION TYPE
  // =========================================================

  const getNotificationType = (notification) => {
    const title =
      notification.title?.toLowerCase() || "";

    if (title.includes("withdraw")) {
      return {
        icon: Wallet,
        label: "Withdrawal",
        style: "bg-emerald-500/10 text-emerald-600",
      };
    }

    if (title.includes("order")) {
      return {
        icon: ShoppingBag,
        label: "Order",
        style: "bg-blue-500/10 text-blue-600",
      };
    }

    if (title.includes("product")) {
      return {
        icon: Package,
        label: "Product",
        style: "bg-violet-500/10 text-violet-600",
      };
    }

    return {
      icon: Bell,
      label: "Notification",
      style: "bg-primary/10 text-primary",
    };
  };

  // =========================================================
  // DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "";

    const notificationDate = new Date(date);

    if (Number.isNaN(notificationDate.getTime())) {
      return "";
    }

    return notificationDate.toLocaleString(
      undefined,
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="space-y-8">

        {/* Header skeleton */}

        <div className="space-y-3">
          <div className="h-9 w-52 animate-pulse rounded-lg bg-muted" />
          <div className="h-5 w-80 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Hero skeleton */}

        <div className="h-32 animate-pulse rounded-3xl bg-muted" />

        {/* Notification skeletons */}

        <div className="space-y-4">
          {Array.from({ length: 5 }).map(
            (_, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-2xl"
              >
                <CardContent className="p-5">
                  <div className="flex gap-4">

                    <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl bg-muted" />

                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-48 animate-pulse rounded-md bg-muted" />
                      <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                      <div className="h-4 w-2/3 animate-pulse rounded-md bg-muted" />
                    </div>

                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-8 pb-10">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >

        <div>

          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Bell className="h-4 w-4" />
            Activity center
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Notifications
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Stay up to date with your orders,
            withdrawals, products and account activity.
          </p>

        </div>

        {/* Unread counter */}

        {unreadCount > 0 && (
          <div className="flex w-fit items-center gap-3 rounded-2xl border bg-background px-4 py-3 shadow-sm">

            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Bell className="h-4 w-4 text-primary" />

              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                New activity
              </p>

              <p className="text-sm font-semibold">
                {unreadCount} unread
              </p>
            </div>

          </div>
        )}

      </motion.div>

      {/* =====================================================
          ACTIVITY HERO
      ===================================================== */}

      {notifications.length > 0 && (
        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.05,
          }}
          className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/[0.08] via-background to-background"
        >

          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border bg-background/80 shadow-sm backdrop-blur">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Your activity at a glance
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {notifications.length} total notification
                  {notifications.length !== 1
                    ? "s"
                    : ""}
                  {unreadCount > 0
                    ? ` · ${unreadCount} waiting for you`
                    : " · You're all caught up"}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2 rounded-xl border bg-background/70 px-3 py-2 text-xs font-medium backdrop-blur">

              {unreadCount > 0 ? (
                <>
                  <Clock3 className="h-3.5 w-3.5 text-primary" />
                  Unread activity
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  All caught up
                </>
              )}

            </div>

          </div>

        </motion.div>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <motion.div
          initial={{
            opacity: 0,
            y: -8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4"
        >
          <div className="flex items-start gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
              <Bell className="h-4 w-4 text-destructive" />
            </div>

            <div>
              <p className="font-semibold text-destructive">
                Unable to load notifications
              </p>

              <p className="mt-1 text-sm text-destructive/80">
                {error}
              </p>
            </div>

          </div>
        </motion.div>
      )}

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {!error &&
        notifications.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="relative flex min-h-[420px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed bg-muted/[0.15] px-6 text-center"
          >

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border bg-background shadow-sm">

              <Bell className="h-8 w-8 text-muted-foreground" />

            </div>

            <div className="relative mt-6">

              <h2 className="text-xl font-bold tracking-tight">
                You're all caught up
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                There are no notifications right now.
                New account activity, orders and
                withdrawal updates will appear here.
              </p>

            </div>

          </motion.div>
        )}

      {/* =====================================================
          NOTIFICATION LIST
      ===================================================== */}

      {notifications.length > 0 && (
        <section className="space-y-4">

          {/* Section heading */}

          <div className="flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Recent activity
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your latest account updates.
              </p>
            </div>

            <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Unread
            </div>

          </div>

          {/* Notifications */}

          <div className="space-y-3">

            {notifications.map(
              (notification, index) => {
                const type =
                  getNotificationType(
                    notification
                  );

                const Icon = type.icon;

                const isUnread =
                  !notification.isRead;

                return (
                  <motion.div
                    key={notification._id}
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: Math.min(
                        index * 0.04,
                        0.35
                      ),
                    }}
                  >

                    <Link
                      href={`/dashboard/notifications/${notification._id}`}
                      onClick={() =>
                        handleNotificationClick(
                          notification
                        )
                      }
                      className="group block"
                    >

                      <Card
                        className={`
                          relative overflow-hidden rounded-2xl
                          transition-all duration-300
                          hover:-translate-y-0.5
                          hover:shadow-lg
                          ${
                            isUnread
                              ? "border-primary/25 bg-primary/[0.025] shadow-sm"
                              : "hover:border-primary/15"
                          }
                        `}
                      >

                        {/* Unread indicator */}

                        {isUnread && (
                          <div className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
                        )}

                        <CardContent className="p-4 sm:p-5">

                          <div className="flex gap-4">

                            {/* =================================================
                                ICON
                            ================================================= */}

                            <div
                              className={`
                                flex h-12 w-12 shrink-0
                                items-center justify-center
                                rounded-2xl
                                transition-transform
                                duration-300
                                group-hover:scale-105
                                ${
                                  isUnread
                                    ? type.style
                                    : "bg-muted text-muted-foreground"
                                }
                              `}
                            >
                              <Icon className="h-5 w-5" />
                            </div>

                            {/* =================================================
                                CONTENT
                            ================================================= */}

                            <div className="min-w-0 flex-1">

                              {/* Top row */}

                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                                <div className="min-w-0">

                                  <div className="flex flex-wrap items-center gap-2">

                                    <span
                                      className={`
                                        rounded-full px-2.5 py-1
                                        text-[10px] font-semibold
                                        uppercase tracking-wide
                                        ${
                                          isUnread
                                            ? "bg-primary/10 text-primary"
                                            : "bg-muted text-muted-foreground"
                                        }
                                      `}
                                    >
                                      {type.label}
                                    </span>

                                    {isUnread && (
                                      <span className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        New
                                      </span>
                                    )}

                                  </div>

                                  <h3
                                    className={`
                                      mt-2 text-base leading-6
                                      ${
                                        isUnread
                                          ? "font-bold"
                                          : "font-semibold"
                                      }
                                    `}
                                  >
                                    {notification.title}
                                  </h3>

                                </div>

                                {/* Status */}

                                <div
                                  className={`
                                    flex w-fit shrink-0
                                    items-center gap-1.5
                                    rounded-full border px-2.5 py-1
                                    text-[11px] font-medium
                                    ${
                                      isUnread
                                        ? "border-primary/20 bg-primary/5 text-primary"
                                        : "bg-muted/50 text-muted-foreground"
                                    }
                                  `}
                                >
                                  {isUnread ? (
                                    <>
                                      <Clock3 className="h-3 w-3" />
                                      Unread
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="h-3 w-3" />
                                      Read
                                    </>
                                  )}
                                </div>

                              </div>

                              {/* Message */}

                              <p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                                {notification.message}
                              </p>

                              {/* Amount */}

                              {notification.amount !==
                                undefined &&
                                notification.amount !==
                                  null && (
                                  <div className="mt-4 flex w-fit items-center gap-3 rounded-xl border bg-muted/30 px-3.5 py-2.5">

                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                                      <Wallet className="h-3.5 w-3.5 text-primary" />
                                    </div>

                                    <div>
                                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                        Amount
                                      </p>

                                      <p className="text-sm font-bold">
                                        Rs.{" "}
                                        {Number(
                                          notification.amount
                                        ).toLocaleString()}
                                      </p>
                                    </div>

                                  </div>
                                )}

                              {/* Bottom */}

                              <div className="mt-4 flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between">

                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock3 className="h-3.5 w-3.5" />
                                  {formatDate(
                                    notification.createdAt
                                  )}
                                </div>

                                <div className="flex items-center gap-1 text-xs font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                                  View details
                                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </div>

                              </div>

                            </div>

                          </div>

                        </CardContent>

                      </Card>

                    </Link>

                  </motion.div>
                );
              }
            )}

          </div>

        </section>
      )}

    </div>
  );
}
