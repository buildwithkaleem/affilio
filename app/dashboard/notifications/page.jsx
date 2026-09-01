// "use client";

// import { useEffect, useState } from "react";
// import {
//   Bell,
//   CheckCircle2,
//   Clock3,
//   Wallet,
//   Info,
//   AlertCircle,
// } from "lucide-react";

// import { motion } from "motion/react";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import api from "@/lib/api";

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const getNotifications = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get(
//         "/api/v1/notification"
//       );

//       setNotifications(
//         response.data?.data?.notifications || []
//       );
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

//   const markAsRead = async (id) => {
//     try {
//       const response = await api.post(
//         `/api/v1/notification/read/${id}`
//       );

//       const updatedNotification =
//         response.data?.data?.notification;

//       setNotifications((prev) =>
//         prev.map((notification) =>
//           notification._id === id
//             ? updatedNotification || {
//               ...notification,
//               isRead: true,
//             }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error(
//         "Failed to mark notification as read:",
//         error
//       );
//     }
//   };

//   const getNotificationIcon = (notification) => {
//     const title =
//       notification.title?.toLowerCase() || "";

//     if (title.includes("withdrawal")) {
//       return (
//         <Wallet className="h-5 w-5" />
//       );
//     }

//     if (notification.status === "completed") {
//       return (
//         <CheckCircle2 className="h-5 w-5" />
//       );
//     }

//     if (notification.status === "pending") {
//       return (
//         <Clock3 className="h-5 w-5" />
//       );
//     }

//     if (notification.status === "failed") {
//       return (
//         <AlertCircle className="h-5 w-5" />
//       );
//     }

//     return <Info className="h-5 w-5" />;
//   };

//   const formatDate = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleString();
//   };

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <motion.div
//         initial={{
//           opacity: 0,
//           y: -10,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//       >
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
//             <Bell className="h-5 w-5 text-primary" />
//           </div>

//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">
//               Notifications
//             </h1>

//             <p className="mt-1 text-sm text-muted-foreground">
//               Stay updated with your account activity.
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Error */}
//       {error && (
//         <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
//           {error}
//         </div>
//       )}

//       {/* Notifications */}
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             Recent Notifications
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           {loading ? (
//             <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
//               Loading notifications...
//             </div>
//           ) : notifications.length === 0 ? (
//             <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-muted-foreground">
//               <Bell className="h-10 w-10 opacity-30" />

//               <p className="text-sm">
//                 No notifications
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {notifications.map(
//                 (notification, index) => (
//                   <motion.div
//                     key={notification._id}
//                     initial={{
//                       opacity: 0,
//                       y: 10,
//                     }}
//                     animate={{
//                       opacity: 1,
//                       y: 0,
//                     }}
//                     transition={{
//                       delay: index * 0.05,
//                     }}
//                     onClick={() => {
//                       if (!notification.isRead) {
//                         markAsRead(
//                           notification._id
//                         );
//                       }
//                     }}
//                     className={`cursor-pointer rounded-xl border p-4 transition-colors ${notification.isRead
//                         ? "bg-background hover:bg-muted/50"
//                         : "border-primary/20 bg-primary/5 hover:bg-primary/10"
//                       }`}
//                   >
//                     <div className="flex gap-4">

//                       {/* Icon */}
//                       <div
//                         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notification.isRead
//                             ? "bg-muted text-muted-foreground"
//                             : "bg-primary/10 text-primary"
//                           }`}
//                       >
//                         {getNotificationIcon(
//                           notification
//                         )}
//                       </div>

//                       {/* Content */}
//                       <div className="min-w-0 flex-1">

//                         <div className="flex items-start justify-between gap-3">
//                           <div>
//                             <h3
//                               className={`text-sm ${notification.isRead
//                                   ? "font-medium"
//                                   : "font-semibold"
//                                 }`}
//                             >
//                               {notification.title}
//                             </h3>

//                             <p className="mt-1 text-sm text-muted-foreground">
//                               {notification.message}
//                             </p>
//                           </div>

//                           {!notification.isRead && (
//                             <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
//                           )}
//                         </div>

//                         {/* Amount */}
//                         {notification.amount != null && (
//                           <p className="mt-2 text-sm font-semibold">
//                             Rs.{" "}
//                             {Number(
//                               notification.amount
//                             ).toLocaleString()}
//                           </p>
//                         )}

//                         {/* Footer */}
//                         <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
//                           <span>
//                             {formatDate(
//                               notification.createdAt
//                             )}
//                           </span>

//                           {notification.status && (
//                             <>
//                               <span>•</span>

//                               <span className="capitalize">
//                                 {
//                                   notification.status
//                                 }
//                               </span>
//                             </>
//                           )}
//                         </div>

//                       </div>
//                     </div>
//                   </motion.div>
//                 )
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }






// v2
// "use client";

// import { useEffect, useState } from "react";
// import { Bell, CheckCircle2, Clock3 } from "lucide-react";
// import { motion } from "motion/react";

// import { Card, CardContent } from "@/components/ui/card";
// import {
//   getNotifications,
//   markNotificationAsRead,
// } from "@/lib/notificationApi";

// export default function NotificationsPage() {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await getNotifications();

//       setNotifications(
//         response?.data?.notifications || []
//       );
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
//     fetchNotifications();
//   }, []);

//   const handleRead = async (notification) => {
//     if (notification.isRead) return;

//     try {
//       const response =
//         await markNotificationAsRead(
//           notification._id
//         );

//       const updatedNotification =
//         response?.data?.notification;

//       setNotifications((prev) =>
//         prev.map((item) =>
//           item._id === notification._id
//             ? updatedNotification || {
//               ...item,
//               isRead: true,
//             }
//             : item
//         )
//       );
//     } catch (error) {
//       console.error(
//         "Failed to mark notification as read:",
//         error
//       );
//     }
//   };

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">
//           Notifications
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Stay updated with your account activity.
//         </p>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
//           {error}
//         </div>
//       )}

//       {/* Loading */}
//       {loading ? (
//         <Card>
//           <CardContent className="flex min-h-48 items-center justify-center">
//             <p className="text-sm text-muted-foreground">
//               Loading notifications...
//             </p>
//           </CardContent>
//         </Card>
//       ) : notifications.length === 0 ? (
//         <Card>
//           <CardContent className="flex min-h-64 flex-col items-center justify-center gap-3">
//             <Bell className="h-12 w-12 text-muted-foreground opacity-40" />

//             <h2 className="font-semibold">
//               No notifications
//             </h2>

//             <p className="text-sm text-muted-foreground">
//               You're all caught up.
//             </p>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="space-y-3">
//           {notifications.map(
//             (notification, index) => (
//               <motion.div
//                 key={notification._id}
//                 initial={{
//                   opacity: 0,
//                   y: 10,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   delay: index * 0.05,
//                 }}
//               >
//                 <Card
//                   onClick={() =>
//                     handleRead(notification)
//                   }
//                   className={`cursor-pointer transition-all hover:shadow-md ${!notification.isRead
//                       ? "border-primary/40 bg-primary/5"
//                       : ""
//                     }`}
//                 >
//                   <CardContent className="flex gap-4 p-5">

//                     {/* Icon */}
//                     <div
//                       className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${notification.isRead
//                           ? "bg-muted"
//                           : "bg-primary/10"
//                         }`}
//                     >
//                       {notification.isRead ? (
//                         <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
//                       ) : (
//                         <Bell className="h-5 w-5 text-primary" />
//                       )}
//                     </div>

//                     {/* Content */}
//                     <div className="min-w-0 flex-1">

//                       <div className="flex items-start justify-between gap-3">

//                         <h3
//                           className={`font-semibold ${!notification.isRead
//                               ? "text-foreground"
//                               : "text-muted-foreground"
//                             }`}
//                         >
//                           {notification.title}
//                         </h3>

//                         {!notification.isRead && (
//                           <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
//                         )}
//                       </div>

//                       <p className="mt-1 text-sm text-muted-foreground">
//                         {notification.message}
//                       </p>

//                       {notification.amount !==
//                         undefined &&
//                         notification.amount !== null && (
//                           <p className="mt-2 text-sm font-medium">
//                             Amount: Rs.{" "}
//                             {Number(
//                               notification.amount
//                             ).toLocaleString()}
//                           </p>
//                         )}

//                       <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
//                         <Clock3 className="h-3.5 w-3.5" />

//                         {new Date(
//                           notification.createdAt
//                         ).toLocaleString()}
//                       </div>

//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             )
//           )}
//         </div>
//       )}
//     </div>
//   );
// }





// v3
// "use client";

// import { useEffect, useState } from "react";
// import {
//   Bell,
//   CheckCircle2,
//   Clock3,
//   Wallet,
//   ShoppingBag,
//   Package,
//   Info,
//   Loader2,
// } from "lucide-react";

// import { Card, CardContent } from "@/components/ui/card";

// import api from "@/lib/api";

// export default function NotificationsPage() {
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

//   const handleMarkAsRead = async (notification) => {
//     // Already read
//     if (notification.isRead) {
//       return;
//     }

//     try {
//       const response = await api.post(
//         `/api/v1/notification/read/${notification._id}`
//       );

//       const updatedNotification =
//         response.data?.data?.notification;

//       // Update notification locally
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

//     } catch (error) {
//       console.error(
//         "Failed to mark notification as read:",
//         error
//       );
//     }
//   };

//   // =========================
//   // NOTIFICATION ICON
//   // =========================

//   const getNotificationIcon = (notification) => {
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

//       {/* Header */}

//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">
//           Notifications
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Stay updated with your account activity.
//         </p>
//       </div>

//       {/* Error */}

//       {error && (
//         <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
//           {error}
//         </div>
//       )}

//       {/* Empty */}

//       {!error && notifications.length === 0 && (
//         <Card>
//           <CardContent className="flex min-h-[350px] flex-col items-center justify-center text-center">

//             <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
//               <Bell className="h-7 w-7 text-muted-foreground" />
//             </div>

//             <h2 className="text-lg font-semibold">
//               No notifications
//             </h2>

//             <p className="mt-1 text-sm text-muted-foreground">
//               You're all caught up.
//             </p>

//           </CardContent>
//         </Card>
//       )}

//       {/* Notifications */}

//       {notifications.length > 0 && (
//         <div className="space-y-3">

//           {notifications.map((notification) => (

//             <Card
//               key={notification._id}
//               onClick={() =>
//                 handleMarkAsRead(notification)
//               }
//               className={`cursor-pointer transition-all hover:shadow-md ${!notification.isRead
//                   ? "border-primary/30 bg-primary/[0.03]"
//                   : ""
//                 }`}
//             >


//               <CardContent className="p-4 sm:p-5">

//                 <div className="flex gap-4">

//                   {/* Icon */}

//                   <div
//                     className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${notification.isRead
//                         ? "bg-muted text-muted-foreground"
//                         : "bg-primary/10 text-primary"
//                       }`}
//                   >
//                     {getNotificationIcon(
//                       notification
//                     )}
//                   </div>

//                   {/* Content */}

//                   <div className="min-w-0 flex-1">

//                     <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

//                       <div>

//                         <div className="flex items-center gap-2">

//                           <h3
//                             className={`text-sm sm:text-base ${!notification.isRead
//                                 ? "font-semibold"
//                                 : "font-medium"
//                               }`}
//                           >
//                             {notification.title}
//                           </h3>

//                           {!notification.isRead && (
//                             <span className="h-2 w-2 rounded-full bg-primary" />
//                           )}

//                         </div>

//                         <p className="mt-1 text-sm text-muted-foreground">
//                           {notification.message}
//                         </p>

//                       </div>

//                       {/* Status */}

//                       <div className="shrink-0">
//                         {getStatus(notification)}
//                       </div>

//                     </div>

//                     {/* Amount */}

//                     {notification.amount !==
//                       undefined &&
//                       notification.amount !==
//                       null && (
//                         <div className="mt-3 text-sm font-semibold">
//                           Rs.{" "}
//                           {Number(
//                             notification.amount
//                           ).toLocaleString()}
//                         </div>
//                       )}

//                     {/* Bottom */}

//                     <div className="mt-3 flex items-center justify-between">

//                       <p className="text-xs text-muted-foreground">
//                         {formatDate(
//                           notification.createdAt
//                         )}
//                       </p>

//                       {!notification.isRead && (
//                         <span className="text-xs font-medium text-primary">
//                           Click to mark as read
//                         </span>
//                       )}

//                     </div>

//                   </div>

//                 </div>

//               </CardContent>

//             </Card>
//           ))}

//         </div>
//       )}

//     </div>
//   );
// }





// v4
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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

import api from "@/lib/api";

import {
  markNotificationAsRead,
} from "@/redux/slices/notificationSlice";

export default function NotificationsPage() {
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET NOTIFICATIONS
  // =========================

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
      const response = await api.post(
        `/api/v1/notification/read/${notification._id}`
      );

      const updatedNotification =
        response.data?.data?.notification;

      // Local state update
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

      // Redux update
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
          Stay updated with your account activity.
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
                href={`/dashboard/notifications/${notification._id}`}
                onClick={() =>
                  handleNotificationClick(
                    notification
                  )
                }
                className="block"
              >

                <Card
                  className={`cursor-pointer transition-all hover:-translate-y-[1px] hover:shadow-md ${!notification.isRead
                      ? "border-primary/30 bg-primary/[0.03]"
                      : ""
                    }`}
                >

                  <CardContent className="p-4 sm:p-5">

                    <div className="flex gap-4">

                      {/* ICON */}

                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${notification.isRead
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary/10 text-primary"
                          }`}
                      >
                        {getNotificationIcon(
                          notification
                        )}
                      </div>

                      {/* CONTENT */}

                      <div className="min-w-0 flex-1">

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                          <div className="min-w-0">

                            <div className="flex items-center gap-2">

                              <h3
                                className={`text-sm sm:text-base ${!notification.isRead
                                    ? "font-semibold"
                                    : "font-medium"
                                  }`}
                              >
                                {notification.title}
                              </h3>

                              {!notification.isRead && (
                                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                              )}

                            </div>

                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                              {notification.message}
                            </p>

                          </div>

                          {/* STATUS */}

                          <div className="shrink-0">
                            {getStatus(
                              notification
                            )}
                          </div>

                        </div>

                        {/* AMOUNT */}

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

                        {/* BOTTOM */}

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