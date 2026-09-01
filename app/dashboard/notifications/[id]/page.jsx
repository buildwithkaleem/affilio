// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { ArrowLeft, Bell, Loader2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import api from "@/lib/api";

// export default function NotificationDetailPage({
//   params,
// }) {
//   const [notification, setNotification] =
//     useState(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getNotification = async () => {
//       try {
//         setLoading(true);

//         const response = await api.get(
//           `/api/v1/notification/${params.id}`
//         );

//         setNotification(
//           response.data?.data?.notification
//         );
//       } catch (error) {
//         console.error(
//           "Failed to fetch notification:",
//           error
//         );

//         setError(
//           error.response?.data?.message ||
//           "Failed to load notification"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     getNotification();
//   }, [params.id]);

//   if (loading) {
//     return (
//       <div className="flex min-h-[400px] items-center justify-center">
//         <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
//       </div>
//     );
//   }

//   if (error || !notification) {
//     return (
//       <div className="space-y-4">
//         <Link href="/dashboard/notifications">
//           <Button variant="ghost">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to notifications
//           </Button>
//         </Link>

//         <Card>
//           <CardContent className="flex min-h-40 items-center justify-center text-sm text-destructive">
//             {error || "Notification not found"}
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-3xl space-y-6">

//       {/* Back */}

//       <Link href="/dashboard/notifications">
//         <Button variant="ghost">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to notifications
//         </Button>
//       </Link>

//       {/* Notification */}

//       <Card>
//         <CardHeader>
//           <div className="flex items-start gap-4">

//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//               <Bell className="h-6 w-6" />
//             </div>

//             <div className="min-w-0 flex-1">
//               <CardTitle className="text-xl">
//                 {notification.title}
//               </CardTitle>

//               <p className="mt-1 text-sm text-muted-foreground">
//                 {new Date(
//                   notification.createdAt
//                 ).toLocaleString()}
//               </p>
//             </div>

//           </div>
//         </CardHeader>

//         <CardContent>
//           <div className="rounded-lg bg-muted/50 p-4">
//             <p className="whitespace-pre-wrap text-sm leading-7">
//               {notification.message}
//             </p>
//           </div>
//         </CardContent>
//       </Card>

//     </div>
//   );
// }




// v2
// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useSelector } from "react-redux";
// import { ArrowLeft, Bell } from "lucide-react";

// export default function NotificationDetailPage() {
//   const { id } = useParams();

//   const notification = useSelector((state) =>
//     state.notification.notifications.find(
//       (item) => item._id === id
//     )
//   );

//   if (!notification) {
//     return (
//       <div className="space-y-4">
//         <Link
//           href="/dashboard/notifications"
//           className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to notifications
//         </Link>

//         <div className="rounded-xl border bg-background p-8 text-center">
//           <Bell className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

//           <h2 className="text-lg font-semibold">
//             Notification not found
//           </h2>

//           <p className="mt-1 text-sm text-muted-foreground">
//             This notification is not available in your current notification data.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-3xl space-y-6">

//       <Link
//         href="/dashboard/notifications"
//         className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Back to notifications
//       </Link>

//       <div className="rounded-2xl border bg-background shadow-sm">

//         {/* Header */}
//         <div className="border-b p-6">

//           <div className="flex items-start gap-4">

//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//               <Bell className="h-6 w-6" />
//             </div>

//             <div className="min-w-0 flex-1">

//               <h1 className="text-xl font-semibold">
//                 {notification.title}
//               </h1>

//               <p className="mt-1 text-sm text-muted-foreground">
//                 {new Date(
//                   notification.createdAt
//                 ).toLocaleString()}
//               </p>

//             </div>

//           </div>

//         </div>

//         {/* Content */}
//         <div className="p-6">

//           <p className="whitespace-pre-wrap text-sm leading-7 text-foreground">
//             {notification.message}
//           </p>

//         </div>

//       </div>

//     </div>
//   );
// }





// v3
// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useSelector } from "react-redux";
// import { ArrowLeft, Bell } from "lucide-react";

// export default function NotificationDetailPage() {
//   const { id } = useParams();

//   const notification = useSelector((state) =>
//     state.notification.notifications.find(
//       (item) => item._id === id
//     )
//   );

//   if (!notification) {
//     return (
//       <div className="space-y-4">
//         <Link
//           href="/dashboard/notifications"
//           className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to notifications
//         </Link>

//         <div className="rounded-xl border bg-background p-8 text-center">
//           <Bell className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

//           <h2 className="text-lg font-semibold">
//             Notification not found
//           </h2>

//           <p className="mt-1 text-sm text-muted-foreground">
//             This notification is not available in your current notification data.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">

//       {/* Notification */}
//       <div>
//         <p className="text-sm text-muted-foreground">
//           Message
//         </p>

//         <p className="mt-1 whitespace-pre-wrap text-sm leading-7">
//           {notification.message}
//         </p>
//       </div>

//       {/* Amount */}
//       {notification.amount !== undefined &&
//         notification.amount !== null && (
//           <div>
//             <p className="text-sm text-muted-foreground">
//               Amount
//             </p>

//             <p className="mt-1 text-lg font-semibold">
//               {notification.amount}
//             </p>
//           </div>
//         )}

//       {/* Status */}
//       {notification.status && (
//         <div>
//           <p className="text-sm text-muted-foreground">
//             Status
//           </p>

//           <p className="mt-1 font-medium capitalize">
//             {notification.status}
//           </p>
//         </div>
//       )}

//       {/* Order ID - OPTIONAL */}
//       {notification.orderId && (
//         <div>
//           <p className="text-sm text-muted-foreground">
//             Order ID
//           </p>

//           <p className="mt-1 font-mono text-sm">
//             {notification.orderId}
//           </p>
//         </div>
//       )}

//       {/* Created At */}
//       <div>
//         <p className="text-sm text-muted-foreground">
//           Date
//         </p>

//         <p className="mt-1 text-sm">
//           {new Date(
//             notification.createdAt
//           ).toLocaleString()}
//         </p>
//       </div>

//     </div>
//   );
// }






// v4
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
// } from "lucide-react";

// export default function NotificationDetailPage() {
//   const { id } = useParams();

//   const notification = useSelector((state) =>
//     state.notification.notifications.find(
//       (item) => String(item._id) === String(id)
//     )
//   );

//   // ========================================
//   // NOT FOUND
//   // ========================================

//   if (!notification) {
//     return (
//       <div className="mx-auto max-w-3xl space-y-6">

//         {/* Back */}
//         <Link
//           href="/dashboard/notifications"
//           className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
//         >
//           <ArrowLeft className="h-4 w-4" />
//           Back to notifications
//         </Link>

//         {/* Empty State */}
//         <div className="rounded-2xl border bg-background p-10 text-center shadow-sm">
//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
//             <Bell className="h-7 w-7 text-muted-foreground" />
//           </div>

//           <h2 className="mt-5 text-xl font-semibold">
//             Notification not found
//           </h2>

//           <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
//             This notification may have been removed,
//             expired, or is not available in your current
//             notification data.
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
//   // STATUS
//   // ========================================

//   const status = notification.status?.toLowerCase();

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

//         {/* Read Status */}
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

//       {/* ========================================
//           MAIN CARD
//       ======================================== */}

//       <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">

//         {/* ======================================
//             HEADER
//         ====================================== */}

//         <div className="border-b p-6 sm:p-8">

//           <div className="flex items-start gap-4">

//             {/* Icon */}

//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//               <Bell className="h-6 w-6" />
//             </div>

//             {/* Title */}

//             <div className="min-w-0 flex-1">

//               <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
//                 {notification.title || "Notification"}
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

//         {/* ======================================
//             MESSAGE
//         ====================================== */}

//         <div className="p-6 sm:p-8">

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

//           {/* ====================================
//               INFORMATION GRID
//           ==================================== */}

//           <div className="mt-8 grid gap-4 sm:grid-cols-2">

//             {/* Amount */}

//             {notification.amount !== undefined &&
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
//                         {Number(
//                           notification.amount
//                         ).toLocaleString()}
//                       </p>
//                     </div>

//                   </div>
//                 </div>
//               )}

//             {/* Status */}

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

//             {/* Order ID */}

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

          

//           {/* ====================================
//               TIMESTAMPS
//           ==================================== */}

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




// v5
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
// } from "lucide-react";

// import api from "@/lib/api";

// import {
//   markNotificationAsRead,
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

//     const fetchNotification = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await api.get(
//           `/ api / v1 / notification / ${ id } `
//         );

//         const data =
//           response.data?.data?.notification;

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
//             const readResponse = await api.post(
//               `/ api / v1 / notification / read / ${ id } `
//             );

//             const updatedNotification =
//               readResponse.data?.data?.notification;

//             const updated = {
//               ...data,
//               isRead: true,
//               expireAt:
//                 updatedNotification?.expireAt ||
//                 data.expireAt,
//             };

//             setNotification(updated);

//             // Redux bell/list update
//             dispatch(
//               markNotificationAsRead(id)
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

//         setError(
//           error.response?.data?.message ||
//           "Notification not found"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNotification();
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

//         {/* HEADER */}

//         <div className="border-b p-6 sm:p-8">

//           <div className="flex items-start gap-4">

//             {/* ICON */}

//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//               <Bell className="h-6 w-6" />
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

//         {/* MESSAGE */}

//         <div className="p-6 sm:p-8">

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

//           {/* INFORMATION GRID */}

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






// v6
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";

import {
  ArrowLeft,
  Bell,
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Loader2,
  Wallet,
  ShoppingBag,
  Package,
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

        const response = await getNotificationById(id);

        if (!mounted) return;

        const data =
          response?.data?.notification ||
          response?.notification;

        if (!data) {
          setError("Notification not found");
          return;
        }

        setNotification(data);

        // ========================================
        // MARK AS READ
        // ========================================

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

            // Update Redux
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
  // NOT FOUND / ERROR
  // ========================================

  if (!notification || error) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href="/dashboard/notifications"
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
            href="/dashboard/notifications"
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
  // DATE
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
          href="/dashboard/notifications"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to notifications
        </Link>

        {/* READ STATUS */}

        <div
          className={`inline - flex items - center gap - 2 rounded - full px - 3 py - 1.5 text - xs font - medium ${
  notification.isRead
    ? "bg-muted text-muted-foreground"
    : "bg-primary/10 text-primary"
} `}
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
                      className={`mt - 1 inline - flex rounded - full px - 2.5 py - 1 text - xs font - medium capitalize ${ getStatusClasses() } `}
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

