// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useSelector } from "react-redux";

// import {
//   ArrowLeft,
//   Bell,
//   CalendarDays,
//   CircleDollarSign,
//   ClipboardList,
//   Clock3,
//   Wallet,
//   ShoppingBag,
//   Package,
// } from "lucide-react";

// export default function NotificationDetailPage() {
//   const { id } = useParams();

//   // =========================
//   // GET NOTIFICATION
//   // =========================

//   const notification = useSelector((state) =>
//     state.notification.notifications.find(
//       (item) =>
//         String(item._id) === String(id)
//     )
//   );

//   // =========================
//   // NOT FOUND
//   // =========================

//   if (!notification) {
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
//             This notification may have been removed,
//             expired, or is not available.
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

//   // =========================
//   // DATES
//   // =========================

//   const createdAt = notification.createdAt
//     ? new Date(notification.createdAt)
//     : null;

//   const updatedAt = notification.updatedAt
//     ? new Date(notification.updatedAt)
//     : null;

//   // =========================
//   // NOTIFICATION ICON
//   // =========================

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

//   // =========================
//   // STATUS
//   // =========================

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

//       {/* =========================
//           TOP BAR
//       ========================= */}

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
//           className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${notification.isRead
//               ? "bg-muted text-muted-foreground"
//               : "bg-primary/10 text-primary"
//             }`}
//         >
//           <span
//             className={`h-2 w-2 rounded-full ${notification.isRead
//                 ? "bg-muted-foreground"
//                 : "bg-primary"
//               }`}
//           />

//           {notification.isRead
//             ? "Read"
//             : "Unread"}
//         </div>

//       </div>

//       {/* =========================
//           MAIN CARD
//       ========================= */}

//       <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">

//         {/* HEADER */}

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

//         {/* =========================
//             CONTENT
//         ========================= */}

//         <div className="p-6 sm:p-8">

//           {/* MESSAGE */}

//           <div className="space-y-2">

//             <h2 className="text-sm font-semibold">
//               Notification details
//             </h2>

//             <div className="rounded-xl border bg-muted/30 p-5">

//               <p className="whitespace-pre-wrap text-sm leading-7">
//                 {notification.message ||
//                   "No additional message available."}
//               </p>

//             </div>

//           </div>

//           {/* =========================
//               INFORMATION
//           ========================= */}

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
//                       className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClasses()}`}
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

//           {/* =========================
//               TIMESTAMPS
//           ========================= */}

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
// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// import {
//   ArrowLeft,
//   Bell,
//   CalendarDays,
//   CircleDollarSign,
//   ClipboardList,
//   Clock3,
//   Wallet,
//   ShoppingBag,
//   Package,
//   Loader2,
// } from "lucide-react";

// import api from "@/lib/api";

// export default function NotificationDetailPage() {
//   const { id } = useParams();

//   const reduxNotification = useSelector((state) =>
//     state.notification.notifications.find(
//       (item) =>
//         String(item._id) === String(id)
//     )
//   );

//   const [notification, setNotification] =
//     useState(null);

//   const [loading, setLoading] =
//     useState(true);

//   const [error, setError] =
//     useState("");

//   // =========================
//   // GET NOTIFICATION
//   // =========================

//   useEffect(() => {
//     if (!id) return;

//     let mounted = true;

//     const fetchNotification = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         // Agar Redux mein notification already available hai
//         if (reduxNotification) {
//           if (mounted) {
//             setNotification(
//               reduxNotification
//             );
//           }

//           return;
//         }

//         // Direct URL / refresh ke liye API
//         const response = await api.get(
//           `/ api / v1 / notification / ${ id } `
//         );

//         const data =
//           response.data?.data?.notification;

//         if (!mounted) return;

//         if (!data) {
//           setError(
//             "Notification not found"
//           );
//           return;
//         }

//         setNotification(data);

//       } catch (error) {
//         console.error(
//           "Failed to fetch notification:",
//           error
//         );

//         if (!mounted) return;

//         setError(
//           error.response?.data?.message ||
//           "Failed to fetch notification"
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
//   }, [id, reduxNotification]);

//   // =========================
//   // LOADING
//   // =========================

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

//   // =========================
//   // ERROR / NOT FOUND
//   // =========================

//   if (error || !notification) {
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
//               "This notification is not available."}
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

//   // =========================
//   // DATES
//   // =========================

//   const createdAt =
//     notification.createdAt
//       ? new Date(notification.createdAt)
//       : null;

//   const updatedAt =
//     notification.updatedAt
//       ? new Date(notification.updatedAt)
//       : null;

//   // =========================
//   // ICON
//   // =========================

//   const getNotificationIcon = () => {
//     const title =
//       notification.title?.toLowerCase() || "";

//     if (title.includes("withdraw")) {
//       return (
//         <Wallet className="h-6 w-6" />
//       );
//     }

//     if (title.includes("order")) {
//       return (
//         <ShoppingBag className="h-6 w-6" />
//       );
//     }

//     if (title.includes("product")) {
//       return (
//         <Package className="h-6 w-6" />
//       );
//     }

//     return (
//       <Bell className="h-6 w-6" />
//     );
//   };

//   // =========================
//   // STATUS
//   // =========================

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

//       {/* =========================
//           TOP BAR
//       ========================= */}

//       <div className="flex items-center justify-between gap-4">

//         <Link
//           href="/dashboard/notifications"
//           className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//         >
//           <ArrowLeft className="h-4 w-4" />

//           Back to notifications
//         </Link>

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

//       {/* =========================
//           MAIN CARD
//       ========================= */}

//       <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">

//         {/* HEADER */}

//         <div className="border-b p-6 sm:p-8">

//           <div className="flex items-start gap-4">

//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//               {getNotificationIcon()}
//             </div>

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

//         {/* CONTENT */}

//         <div className="p-6 sm:p-8">

//           {/* MESSAGE */}

//           <div className="space-y-2">

//             <h2 className="text-sm font-semibold">
//               Notification details
//             </h2>

//             <div className="rounded-xl border bg-muted/30 p-5">

//               <p className="whitespace-pre-wrap text-sm leading-7">
//                 {notification.message ||
//                   "No additional message available."}
//               </p>

//             </div>

//           </div>

//           {/* INFORMATION */}

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

//           {/* TIMESTAMPS */}

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




// v3
// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// import {
//   ArrowLeft,
//   Bell,
//   CalendarDays,
//   CircleDollarSign,
//   ClipboardList,
//   Clock3,
//   Wallet,
//   ShoppingBag,
//   Package,
//   Loader2,
// } from "lucide-react";

// import api from "@/lib/api";

// import {
//   markNotificationAsRead,
// } from "@/redux/slices/notificationSlice";

// export default function AdminNotificationDetailPage() {
//   const { id } = useParams();

//   const dispatch = useDispatch();

//   const [notification, setNotification] =
//     useState(null);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState("");

//   // =========================
//   // GET NOTIFICATION
//   // =========================

//   useEffect(() => {
//     if (!id) return;

//     const fetchNotification = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await api.get(
//           `/ api / v1 / notification / ${ id } `
//         );

//         const data =
//           response.data?.data?.notification;

//         setNotification(data || null);
//       } catch (error) {
//         console.error(
//           "Failed to fetch notification:",
//           error
//         );

//         setError(
//           error.response?.data?.message ||
//             "Failed to fetch notification"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotification();
//   }, [id]);

//   // =========================
//   // MARK AS READ
//   // =========================

//   useEffect(() => {
//     if (!notification || notification.isRead) {
//       return;
//     }

//     const markRead = async () => {
//       try {
//         const response = await api.post(
//           `/ api / v1 / notification / read / ${ notification._id } `
//         );

//         const updatedNotification =
//           response.data?.data?.notification;

//         setNotification((prev) => ({
//           ...prev,
//           isRead: true,
//           expireAt:
//             updatedNotification?.expireAt ||
//             prev.expireAt,
//         }));

//         dispatch(
//           markNotificationAsRead(
//             notification._id
//           )
//         );
//       } catch (error) {
//         console.error(
//           "Failed to mark notification as read:",
//           error
//         );
//       }
//     };

//     markRead();
//   }, [notification?._id]);

//   // =========================
//   // LOADING
//   // =========================

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

//   // =========================
//   // ERROR / NOT FOUND
//   // =========================

//   if (error || !notification) {
//     return (
//       <div className="mx-auto max-w-3xl space-y-6">

//         <Link
//           href="/admin/notifications"
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
//               "This notification may have been removed or expired."}
//           </p>

//           <Link
//             href="/admin/notifications"
//             className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             View notifications
//           </Link>

//         </div>
//       </div>
//     );
//   }

//   // =========================
//   // DATES
//   // =========================

//   const createdAt = notification.createdAt
//     ? new Date(notification.createdAt)
//     : null;

//   const updatedAt = notification.updatedAt
//     ? new Date(notification.updatedAt)
//     : null;

//   // =========================
//   // ICON
//   // =========================

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

//   // =========================
//   // STATUS
//   // =========================

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

//       {/* =========================
//           TOP BAR
//       ========================= */}

//       <div className="flex items-center justify-between gap-4">

//         <Link
//           href="/admin/notifications"
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

//       {/* =========================
//           MAIN CARD
//       ========================= */}

//       <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">

//         {/* =========================
//             HEADER
//         ========================= */}

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

//         {/* =========================
//             CONTENT
//         ========================= */}

//         <div className="p-6 sm:p-8">

//           {/* MESSAGE */}

//           <div className="space-y-2">

//             <h2 className="text-sm font-semibold">
//               Notification details
//             </h2>

//             <div className="rounded-xl border bg-muted/30 p-5">

//               <p className="whitespace-pre-wrap text-sm leading-7">
//                 {notification.message ||
//                   "No additional message available."}
//               </p>

//             </div>

//           </div>

//           {/* =========================
//               INFORMATION
//           ========================= */}

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

//           {/* =========================
//               TIMESTAMPS
//           ========================= */}

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




// v4
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  ArrowLeft,
  Bell,
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Wallet,
  ShoppingBag,
  Package,
  Loader2,
} from "lucide-react";

import {
  getNotificationById,
  markNotificationAsRead as markNotificationAsReadApi,
} from "@/lib/notificationApi";

import {
  markNotificationAsRead,
} from "@/redux/slices/notificationSlice";

export default function AdminNotificationDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // GET SINGLE NOTIFICATION
  // ========================================

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
          response?.data?.notification;

        if (!data) {
          setError("Notification not found");
          setNotification(null);
          return;
        }

        setNotification(data);

        // ========================================
        // MARK AS READ
        // ========================================

        if (!data.isRead) {
          try {
            const readResponse =
              await markNotificationAsReadApi(
                data._id
              );

            if (!mounted) return;

            const updatedNotification =
              readResponse?.data?.notification;

            const updatedData = {
              ...data,
              isRead: true,
              expireAt:
                updatedNotification?.expireAt ??
                data.expireAt,
              updatedAt:
                updatedNotification?.updatedAt ??
                data.updatedAt,
            };

            setNotification(updatedData);

            // Update Redux notification list
            dispatch(
              markNotificationAsRead(data._id)
            );
          } catch (readError) {
            console.error(
              "Failed to mark notification as read:",
              readError
            );

            // Notification still remains visible
            // even if mark-as-read fails.
          }
        }
      } catch (error) {
        if (!mounted) return;

        console.error(
          "Failed to fetch notification:",
          error
        );

        setError(
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch notification"
        );

        setNotification(null);
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

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading notification...
        </div>
      </div>
    );
  }

  // ========================================
  // ERROR / NOT FOUND
  // ========================================

  if (error || !notification) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">

        <Link
          href="/admin/notifications"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to notifications
        </Link>

        <div className="rounded-2xl border bg-background p-10 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Bell className="h-7 w-7 text-muted-foreground" />
          </div>

          <h2 className="mt-5 text-xl font-semibold">
            Notification not found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            {error ||
              "This notification may have been removed, expired, or is no longer available."}
          </p>

          <Link
            href="/admin/notifications"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            View notifications
          </Link>

        </div>
      </div>
    );
  }

  // ========================================
  // DATES
  // ========================================

  const createdAt = notification.createdAt
    ? new Date(notification.createdAt)
    : null;

  const updatedAt = notification.updatedAt
    ? new Date(notification.updatedAt)
    : null;

  // ========================================
  // NOTIFICATION ICON
  // ========================================

  const getNotificationIcon = () => {
    const title =
      notification.title?.toLowerCase() || "";

    if (title.includes("withdraw")) {
      return <Wallet className="h-6 w-6" />;
    }

    if (title.includes("order")) {
      return <ShoppingBag className="h-6 w-6" />;
    }

    if (title.includes("product")) {
      return <Package className="h-6 w-6" />;
    }

    return <Bell className="h-6 w-6" />;
  };

  // ========================================
  // STATUS
  // ========================================

  const status =
    notification.status?.toLowerCase();

  const getStatusClasses = () => {
    switch (status) {
      case "completed":
      case "success":
      case "approved":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

      case "pending":
      case "processing":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400";

      case "failed":
      case "rejected":
      case "cancelled":
        return "bg-destructive/10 text-destructive";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">

      {/* ========================================
          TOP BAR
      ======================================== */}

      <div className="flex items-center justify-between gap-4">

        <Link
          href="/admin/notifications"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to notifications
        </Link>

        {/* READ STATUS */}

        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${notification.isRead
              ? "bg-muted text-muted-foreground"
              : "bg-primary/10 text-primary"
            }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${notification.isRead
                ? "bg-muted-foreground"
                : "bg-primary"
              }`}
          />

          {notification.isRead
            ? "Read"
            : "Unread"}
        </div>

      </div>

      {/* ========================================
          MAIN CARD
      ======================================== */}

      <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="border-b p-6 sm:p-8">

          <div className="flex items-start gap-4">

            {/* ICON */}

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {getNotificationIcon()}
            </div>

            {/* TITLE */}

            <div className="min-w-0 flex-1">

              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {notification.title ||
                  "Notification"}
              </h1>

              {createdAt && (
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">

                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />

                    {createdAt.toLocaleDateString()}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4" />

                    {createdAt.toLocaleTimeString(
                      [],
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

        {/* ========================================
            CONTENT
        ======================================== */}

        <div className="p-6 sm:p-8">

          {/* MESSAGE */}

          <div className="space-y-2">

            <h2 className="text-sm font-semibold">
              Notification details
            </h2>

            <div className="rounded-xl border bg-muted/30 p-5">

              <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
                {notification.message ||
                  "No additional message available."}
              </p>

            </div>

          </div>

          {/* ========================================
              INFORMATION GRID
          ======================================== */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">

            {/* AMOUNT */}

            {notification.amount !==
              undefined &&
              notification.amount !== null && (
                <div className="rounded-xl border p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CircleDollarSign className="h-5 w-5" />
                    </div>

                    <div>

                      <p className="text-xs font-medium text-muted-foreground">
                        Amount
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        Rs.{" "}
                        {Number(
                          notification.amount
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                </div>
              )}

            {/* STATUS */}

            {notification.status && (
              <div className="rounded-xl border p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div>

                    <p className="text-xs font-medium text-muted-foreground">
                      Status
                    </p>

                    <span
                      className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${getStatusClasses()}`}
                    >
                      {notification.status}
                    </span>

                  </div>

                </div>

              </div>
            )}

            {/* ORDER ID */}

            {notification.orderId && (
              <div className="rounded-xl border p-4 sm:col-span-2">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ClipboardList className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">

                    <p className="text-xs font-medium text-muted-foreground">
                      Order ID
                    </p>

                    <p className="mt-1 break-all font-mono text-sm font-medium">
                      {notification.orderId}
                    </p>

                  </div>

                </div>

              </div>
            )}

          </div>

          {/* ========================================
              TIMESTAMPS
          ======================================== */}

          <div className="mt-8 grid gap-4 border-t pt-6 sm:grid-cols-2">

            {createdAt && (
              <div>

                <p className="text-xs font-medium text-muted-foreground">
                  Created
                </p>

                <p className="mt-1 text-sm">
                  {createdAt.toLocaleString()}
                </p>

              </div>
            )}

            {updatedAt && (
              <div>

                <p className="text-xs font-medium text-muted-foreground">
                  Last updated
                </p>

                <p className="mt-1 text-sm">
                  {updatedAt.toLocaleString()}
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
