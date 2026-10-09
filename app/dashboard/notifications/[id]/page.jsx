// v1
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { useDispatch } from "react-redux";

// import {
//   ArrowLeft,
//   Bell,
//   CalendarDays,
//   CircleDollarSign,
//   ClipboardList,
//   Clock3,
//   Loader2,
//   Wallet,
//   ShoppingBag,
//   Package,
// } from "lucide-react";

// import {
//   getNotificationById,
//   markNotificationAsRead,
// } from "@/lib/notificationApi";

// import {
//   markNotificationAsRead as markNotificationAsReadRedux,
// } from "@/redux/slices/notificationSlice";

// export default function NotificationDetailPage() {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const [notification, setNotification] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ========================================
//   // GET SINGLE NOTIFICATION
//   // ========================================

//   useEffect(() => {
//     if (!id) return;

//     let mounted = true;

//     const fetchNotification = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await getNotificationById(id);

//         if (!mounted) return;

//         const data =
//           response?.data?.notification ||
//           response?.notification;

//         if (!data) {
//           setError("Notification not found");
//           return;
//         }

//         setNotification(data);

//         // ========================================
//         // MARK AS READ
//         // ========================================

//         if (!data.isRead) {
//           try {
//             const readResponse =
//               await markNotificationAsRead(id);

//             if (!mounted) return;

//             const updatedNotification =
//               readResponse?.data?.notification ||
//               readResponse?.notification;

//             const updated = {
//               ...data,
//               isRead: true,
//               expireAt:
//                 updatedNotification?.expireAt ||
//                 data.expireAt,
//             };

//             setNotification(updated);

//             // Update Redux
//             dispatch(
//               markNotificationAsReadRedux(id)
//             );
//           } catch (readError) {
//             console.error(
//               "Failed to mark notification as read:",
//               readError
//             );
//           }
//         }
//       } catch (error) {
//         console.error(
//           "Failed to fetch notification:",
//           error
//         );

//         if (!mounted) return;

//         setError(
//           error?.response?.data?.message ||
//             "Notification not found"
//         );
//       } finally {
//         if (mounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchNotification();

//     return () => {
//       mounted = false;
//     };
//   }, [id, dispatch]);

//   // ========================================
//   // LOADING
//   // ========================================

//   if (loading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <div className="flex items-center gap-2 text-sm text-muted-foreground">
//           <Loader2 className="h-5 w-5 animate-spin" />
//           Loading notification...
//         </div>
//       </div>
//     );
//   }

//   // ========================================
//   // NOT FOUND / ERROR
//   // ========================================

//   if (!notification || error) {
//     return (
//       <div className="mx-auto max-w-3xl space-y-6">
//         <Link
//           href="/dashboard/notifications"
//           className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to notifications
//         </Link>

//         <div className="rounded-2xl border bg-background p-10 text-center shadow-sm">
//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
//             <Bell className="h-7 w-7 text-muted-foreground" />
//           </div>

//           <h2 className="mt-5 text-xl font-semibold">
//             Notification not found
//           </h2>

//           <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
//             {error ||
//               "This notification may have been removed, expired, or is no longer available."}
//           </p>

//           <Link
//             href="/dashboard/notifications"
//             className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             View notifications
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   // ========================================
//   // DATE
//   // ========================================

//   const createdAt = notification.createdAt
//     ? new Date(notification.createdAt)
//     : null;

//   const updatedAt = notification.updatedAt
//     ? new Date(notification.updatedAt)
//     : null;

//   // ========================================
//   // NOTIFICATION ICON
//   // ========================================

//   const getNotificationIcon = () => {
//     const title =
//       notification.title?.toLowerCase() || "";

//     if (title.includes("withdraw")) {
//       return <Wallet className="h-6 w-6" />;
//     }

//     if (title.includes("order")) {
//       return <ShoppingBag className="h-6 w-6" />;
//     }

//     if (title.includes("product")) {
//       return <Package className="h-6 w-6" />;
//     }

//     return <Bell className="h-6 w-6" />;
//   };

//   // ========================================
//   // STATUS
//   // ========================================

//   const status =
//     notification.status?.toLowerCase();

//   const getStatusClasses = () => {
//     switch (status) {
//       case "completed":
//       case "success":
//       case "approved":
//         return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

//       case "pending":
//       case "processing":
//         return "bg-amber-500/10 text-amber-600 dark:text-amber-400";

//       case "failed":
//       case "rejected":
//       case "cancelled":
//         return "bg-destructive/10 text-destructive";

//       default:
//         return "bg-muted text-muted-foreground";
//     }
//   };

//   return (
//     <div className="mx-auto max-w-4xl space-y-6">

//       {/* ========================================
//           TOP BAR
//       ======================================== */}

//       <div className="flex items-center justify-between gap-4">
//         <Link
//           href="/dashboard/notifications"
//           className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to notifications
//         </Link>

//         {/* READ STATUS */}

//         <div
//           className={`inline - flex items - center gap - 2 rounded - full px - 3 py - 1.5 text - xs font - medium ${
//   notification.isRead
//     ? "bg-muted text-muted-foreground"
//     : "bg-primary/10 text-primary"
// } `}
//         >
//           <span
//             className={`h - 2 w - 2 rounded - full ${
//   notification.isRead
//     ? "bg-muted-foreground"
//     : "bg-primary"
// } `}
//           />

//           {notification.isRead
//             ? "Read"
//             : "Unread"}
//         </div>
//       </div>

//       {/* ========================================
//           MAIN CARD
//       ======================================== */}

//       <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">

//         {/* ========================================
//             HEADER
//         ======================================== */}

//         <div className="border-b p-6 sm:p-8">
//           <div className="flex items-start gap-4">

//             {/* ICON */}

//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//               {getNotificationIcon()}
//             </div>

//             {/* TITLE */}

//             <div className="min-w-0 flex-1">
//               <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
//                 {notification.title ||
//                   "Notification"}
//               </h1>

//               {createdAt && (
//                 <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">

//                   <span className="inline-flex items-center gap-1.5">
//                     <CalendarDays className="h-4 w-4" />

//                     {createdAt.toLocaleDateString()}
//                   </span>

//                   <span className="inline-flex items-center gap-1.5">
//                     <Clock3 className="h-4 w-4" />

//                     {createdAt.toLocaleTimeString(
//                       [],
//                       {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       }
//                     )}
//                   </span>

//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* ========================================
//             CONTENT
//         ======================================== */}

//         <div className="p-6 sm:p-8">

//           {/* MESSAGE */}

//           <div className="space-y-2">
//             <h2 className="text-sm font-semibold">
//               Notification details
//             </h2>

//             <div className="rounded-xl border bg-muted/30 p-5">
//               <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
//                 {notification.message ||
//                   "No additional message available."}
//               </p>
//             </div>
//           </div>

//           {/* ========================================
//               INFORMATION GRID
//           ======================================== */}

//           <div className="mt-8 grid gap-4 sm:grid-cols-2">

//             {/* AMOUNT */}

//             {notification.amount !==
//               undefined &&
//               notification.amount !== null && (
//                 <div className="rounded-xl border p-4">
//                   <div className="flex items-center gap-3">

//                     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                       <CircleDollarSign className="h-5 w-5" />
//                     </div>

//                     <div>
//                       <p className="text-xs font-medium text-muted-foreground">
//                         Amount
//                       </p>

//                       <p className="mt-1 text-lg font-semibold">
//                         Rs.{" "}
//                         {Number(
//                           notification.amount
//                         ).toLocaleString()}
//                       </p>
//                     </div>

//                   </div>
//                 </div>
//               )}

//             {/* STATUS */}

//             {notification.status && (
//               <div className="rounded-xl border p-4">
//                 <div className="flex items-center gap-3">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
//                     <Bell className="h-5 w-5 text-muted-foreground" />
//                   </div>

//                   <div>
//                     <p className="text-xs font-medium text-muted-foreground">
//                       Status
//                     </p>

//                     <span
//                       className={`mt - 1 inline - flex rounded - full px - 2.5 py - 1 text - xs font - medium capitalize ${ getStatusClasses() } `}
//                     >
//                       {notification.status}
//                     </span>
//                   </div>

//                 </div>
//               </div>
//             )}

//             {/* ORDER ID */}

//             {notification.orderId && (
//               <div className="rounded-xl border p-4 sm:col-span-2">
//                 <div className="flex items-center gap-3">

//                   <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
//                     <ClipboardList className="h-5 w-5" />
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-xs font-medium text-muted-foreground">
//                       Order ID
//                     </p>

//                     <p className="mt-1 break-all font-mono text-sm font-medium">
//                       {notification.orderId}
//                     </p>
//                   </div>

//                 </div>
//               </div>
//             )}

//           </div>

//           {/* ========================================
//               TIMESTAMPS
//           ======================================== */}

//           <div className="mt-8 grid gap-4 border-t pt-6 sm:grid-cols-2">

//             {createdAt && (
//               <div>
//                 <p className="text-xs font-medium text-muted-foreground">
//                   Created
//                 </p>

//                 <p className="mt-1 text-sm">
//                   {createdAt.toLocaleString()}
//                 </p>
//               </div>
//             )}

//             {updatedAt && (
//               <div>
//                 <p className="text-xs font-medium text-muted-foreground">
//                   Last updated
//                 </p>

//                 <p className="mt-1 text-sm">
//                   {updatedAt.toLocaleString()}
//                 </p>
//               </div>
//             )}

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }








// v2
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { motion } from "motion/react";

import {
  ArrowLeft,
  Bell,
  CalendarDays,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Copy,
  CopyCheck,
  Loader2,
  Package,
  ShoppingBag,
  Sparkles,
  Wallet,
  XCircle,
} from "lucide-react";

import {
  getNotificationById,
  markNotificationAsRead,
} from "@/lib/notificationApi";

import {
  markNotificationAsRead as markNotificationAsReadRedux,
} from "@/redux/slices/notificationSlice";

export default function NotificationDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [notification, setNotification] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // =========================================================
  // GET NOTIFICATION
  // =========================================================

  useEffect(() => {
    if (!id) return;

    let mounted = true;

    const fetchNotification = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getNotificationById(id);

        if (!mounted) return;

        const data =
          response?.data?.notification ||
          response?.notification;

        if (!data) {
          setError("Notification not found");
          return;
        }

        setNotification(data);

        // =====================================================
        // MARK AS READ
        // =====================================================

        if (!data.isRead) {
          try {
            const readResponse =
              await markNotificationAsRead(id);

            if (!mounted) return;

            const updatedNotification =
              readResponse?.data?.notification ||
              readResponse?.notification;

            const updated = {
              ...data,
              isRead: true,
              expireAt:
                updatedNotification?.expireAt ||
                data.expireAt,
            };

            setNotification(updated);

            dispatch(
              markNotificationAsReadRedux(id)
            );
          } catch (readError) {
            console.error(
              "Failed to mark notification as read:",
              readError
            );
          }
        }
      } catch (error) {
        console.error(
          "Failed to fetch notification:",
          error
        );

        if (!mounted) return;

        setError(
          error?.response?.data?.message ||
            "Notification not found"
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchNotification();

    return () => {
      mounted = false;
    };
  }, [id, dispatch]);

  // =========================================================
  // DATE HELPERS
  // =========================================================

  const createdAt = useMemo(() => {
    if (!notification?.createdAt) return null;

    const date = new Date(
      notification.createdAt
    );

    return Number.isNaN(date.getTime())
      ? null
      : date;
  }, [notification]);

  const updatedAt = useMemo(() => {
    if (!notification?.updatedAt) return null;

    const date = new Date(
      notification.updatedAt
    );

    return Number.isNaN(date.getTime())
      ? null
      : date;
  }, [notification]);

  // =========================================================
  // NOTIFICATION TYPE
  // =========================================================

  const notificationType = useMemo(() => {
    const title =
      notification?.title?.toLowerCase() || "";

    if (title.includes("withdraw")) {
      return {
        label: "Withdrawal",
        Icon: Wallet,
        iconStyle:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        heroStyle:
          "from-emerald-500/[0.10] via-background to-background",
      };
    }

    if (title.includes("order")) {
      return {
        label: "Order",
        Icon: ShoppingBag,
        iconStyle:
          "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        heroStyle:
          "from-blue-500/[0.10] via-background to-background",
      };
    }

    if (title.includes("product")) {
      return {
        label: "Product",
        Icon: Package,
        iconStyle:
          "bg-violet-500/10 text-violet-600 dark:text-violet-400",
        heroStyle:
          "from-violet-500/[0.10] via-background to-background",
      };
    }

    return {
      label: "Notification",
      Icon: Bell,
      iconStyle:
        "bg-primary/10 text-primary",
      heroStyle:
        "from-primary/[0.10] via-background to-background",
    };
  }, [notification]);

  // =========================================================
  // STATUS
  // =========================================================

  const status =
    notification?.status?.toLowerCase();

  const statusConfig = useMemo(() => {
    switch (status) {
      case "completed":
      case "success":
      case "approved":
        return {
          label: notification?.status,
          className:
            "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          Icon: CheckCircle2,
        };

      case "pending":
      case "processing":
        return {
          label: notification?.status,
          className:
            "border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400",
          Icon: Clock3,
        };

      case "failed":
      case "rejected":
      case "cancelled":
        return {
          label: notification?.status,
          className:
            "border-destructive/20 bg-destructive/10 text-destructive",
          Icon: XCircle,
        };

      default:
        return {
          label: notification?.status,
          className:
            "border-border bg-muted text-muted-foreground",
          Icon: Bell,
        };
    }
  }, [notification, status]);

  // =========================================================
  // COPY ORDER ID
  // =========================================================

  const copyOrderId = async () => {
    if (!notification?.orderId) return;

    try {
      await navigator.clipboard.writeText(
        String(notification.orderId)
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy order ID:",
        error
      );
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Back */}

        <div className="h-5 w-40 animate-pulse rounded bg-muted" />

        {/* Hero skeleton */}

        <div className="overflow-hidden rounded-3xl border">

          <div className="h-56 animate-pulse bg-muted" />

          <div className="space-y-4 p-6 sm:p-8">

            <div className="h-7 w-2/3 animate-pulse rounded bg-muted" />

            <div className="h-5 w-full animate-pulse rounded bg-muted" />

            <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />

          </div>

        </div>

        {/* Content skeleton */}

        <div className="grid gap-5 md:grid-cols-2">

          <div className="h-32 animate-pulse rounded-2xl bg-muted" />

          <div className="h-32 animate-pulse rounded-2xl bg-muted" />

        </div>

      </div>
    );
  }

  // =========================================================
  // ERROR / NOT FOUND
  // =========================================================

  if (!notification || error) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mx-auto max-w-3xl space-y-6"
      >

        <Link
          href="/dashboard/notifications"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to notifications
        </Link>

        <div className="relative overflow-hidden rounded-3xl border bg-background p-8 text-center shadow-sm sm:p-12">

          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <Bell className="h-7 w-7 text-muted-foreground" />
          </div>

          <h2 className="relative mt-6 text-xl font-bold">
            Notification not found
          </h2>

          <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {error ||
              "This notification may have been removed, expired, or is no longer available."}
          </p>

          <Link
            href="/dashboard/notifications"
            className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            View notifications
          </Link>

        </div>

      </motion.div>
    );
  }

  const Icon = notificationType.Icon;
  const StatusIcon = statusConfig.Icon;

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">

      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="flex items-center justify-between gap-4"
      >

        <Link
          href="/dashboard/notifications"
          className="group inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to notifications
        </Link>

        {/* Read state */}

        <div
          className={`
inline - flex items - center gap - 2 rounded - full
            border px - 3 py - 1.5 text - xs font - semibold
            ${
  notification.isRead
    ? "bg-muted text-muted-foreground"
    : "border-primary/20 bg-primary/10 text-primary"
}
`}
        >
          <span
            className={`h - 2 w - 2 rounded - full ${
  notification.isRead
    ? "bg-muted-foreground"
    : "bg-primary"
} `}
          />

          {notification.isRead
            ? "Read"
            : "Unread"}
        </div>

      </motion.div>

      {/* =====================================================
          HERO
      ===================================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        className={`
          relative overflow - hidden rounded - 3xl border
bg - gradient - to - br
          ${ notificationType.heroStyle }
`}
      >

        {/* Decorative elements */}

        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative p-6 sm:p-8 lg:p-10">

          {/* Category */}

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {notificationType.label}
            </div>

            {notification.status && (
              <div
                className={`
inline - flex items - center gap - 1.5
rounded - full border px - 3 py - 1.5
text - xs font - semibold capitalize
                  ${ statusConfig.className }
`}
              >
                <StatusIcon className="h-3.5 w-3.5" />
                {notification.status}
              </div>
            )}

          </div>

          {/* Main hero */}

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">

            {/* Icon */}

            <div
              className={`
                flex h - 16 w - 16 shrink - 0
items - center justify - center
rounded - 2xl border
bg - background / 70
shadow - sm backdrop - blur
                ${ notificationType.iconStyle }
`}
            >
              <Icon className="h-7 w-7" />
            </div>

            {/* Heading */}

            <div className="min-w-0">

              <h1 className="max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {notification.title ||
                  "Notification"}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                {notification.message ||
                  "No additional message available."}
              </p>

              {/* Date */}

              {createdAt && (
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">

                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />

                    {createdAt.toLocaleDateString(
                      undefined,
                      {
                        dateStyle: "medium",
                      }
                    )}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-3.5 w-3.5" />

                    {createdAt.toLocaleTimeString(
                      undefined,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>

                </div>
              )}

            </div>

          </div>

        </div>

      </motion.section>

      {/* =====================================================
          INFORMATION CARDS
      ===================================================== */}

      <div className="grid gap-5 md:grid-cols-2">

        {/* ===================================================
            AMOUNT
        =================================================== */}

        {notification.amount !== undefined &&
          notification.amount !== null && (
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
                delay: 0.1,
              }}
              className="relative overflow-hidden rounded-2xl border bg-background p-5 shadow-sm"
            >

              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />

              <div className="relative flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Transaction amount
                  </p>

                  <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    Rs.{" "}
                    {Number(
                      notification.amount
                    ).toLocaleString()}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Amount associated with this activity
                  </p>

                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CircleDollarSign className="h-6 w-6" />
                </div>

              </div>

            </motion.div>
          )}

        {/* ===================================================
            STATUS
        =================================================== */}

        {notification.status && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
              delay: 0.15,
            }}
            className="rounded-2xl border bg-background p-5 shadow-sm"
          >

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Current status
                </p>

                <div
                  className={`
mt - 3 inline - flex items - center gap - 2
rounded - full border px - 3 py - 1.5
text - sm font - semibold capitalize
                    ${ statusConfig.className }
`}
                >
                  <StatusIcon className="h-4 w-4" />
                  {notification.status}
                </div>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>

            </div>

          </motion.div>
        )}

      </div>

      {/* =====================================================
          ORDER ID
      ===================================================== */}

      {notification.orderId && (
        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
            delay: 0.2,
          }}
          className="rounded-2xl border bg-background p-5 shadow-sm sm:p-6"
        >

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ClipboardList className="h-5 w-5" />
              </div>

              <div className="min-w-0">

                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Order ID
                </p>

                <p className="mt-1 break-all font-mono text-sm font-semibold">
                  {notification.orderId}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={copyOrderId}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border bg-background px-4 text-xs font-semibold transition-all hover:bg-muted"
            >
              {copied ? (
                <>
                  <CopyCheck className="h-4 w-4 text-emerald-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy ID
                </>
              )}
            </button>

          </div>

        </motion.section>
      )}

      {/* =====================================================
          DETAILS
      ===================================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
          delay: 0.25,
        }}
        className="rounded-2xl border bg-background shadow-sm"
      >

        <div className="border-b px-5 py-4 sm:px-6">

          <h2 className="font-semibold">
            Notification details
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Full information about this activity.
          </p>

        </div>

        <div className="p-5 sm:p-6">

          {/* Message */}

          <div className="rounded-2xl border bg-muted/20 p-5">

            <p className="whitespace-pre-wrap text-sm leading-7">
              {notification.message ||
                "No additional message available."}
            </p>

          </div>

          {/* Timeline */}

          <div className="relative mt-8 space-y-7 pl-7">

            {/* Vertical line */}

            <div className="absolute bottom-4 left-[9px] top-4 w-px bg-border" />

            {/* Created */}

            {createdAt && (
              <div className="relative">

                <div className="absolute -left-7 top-0 flex h-5 w-5 items-center justify-center rounded-full border bg-background">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Created
                </p>

                <p className="mt-1 text-sm font-medium">
                  {createdAt.toLocaleString()}
                </p>

              </div>
            )}

            {/* Updated */}

            {updatedAt && (
              <div className="relative">

                <div className="absolute -left-7 top-0 flex h-5 w-5 items-center justify-center rounded-full border bg-background">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                </div>

                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Last updated
                </p>

                <p className="mt-1 text-sm font-medium">
                  {updatedAt.toLocaleString()}
                </p>

              </div>
            )}

            {/* Read */}

            <div className="relative">

              <div className="absolute -left-7 top-0 flex h-5 w-5 items-center justify-center rounded-full border bg-background">
                <CheckCircle2
                  className={`h - 3 w - 3 ${
  notification.isRead
    ? "text-emerald-600"
    : "text-muted-foreground"
} `}
                />
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Read status
              </p>

              <p className="mt-1 text-sm font-medium">
                {notification.isRead
                  ? "This notification has been read."
                  : "This notification is unread."}
              </p>

            </div>

          </div>

        </div>

      </motion.section>

      {/* =====================================================
          BOTTOM ACTION
      ===================================================== */}

      <div className="flex justify-center pt-2">

        <Link
          href="/dashboard/notifications"
          className="group inline-flex items-center gap-2 rounded-xl border bg-background px-5 py-2.5 text-sm font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:bg-muted hover:shadow-md"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to all notifications
        </Link>

      </div>

    </div>
  );
}

