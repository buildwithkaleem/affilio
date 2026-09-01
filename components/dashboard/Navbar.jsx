// "use client";

// import { Menu, Bell, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";

// export default function Navbar({ onMenuClick }) {
//   return (
//     <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur md:px-6">
//       <Button
//         variant="ghost"
//         size="icon"
//         className="mr-3 lg:hidden"
//         onClick={onMenuClick}
//       >
//         <Menu className="h-5 w-5" />
//       </Button>

//       <div className="flex-1">
//         <h1 className="text-lg font-semibold">Dashboard</h1>
//       </div>

//       <div className="flex items-center gap-2">
//         <Button variant="ghost" size="icon">
//           <Bell className="h-5 w-5" />
//         </Button>

//         <Separator orientation="vertical" className="mx-2 h-6" />

//         <Avatar className="h-9 w-9">
//           <AvatarFallback>
//             <User className="h-4 w-4" />
//           </AvatarFallback>
//         </Avatar>
//       </div>
//     </header>
//   );
// }





// v2
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Menu, Bell, User } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Avatar,
//   AvatarFallback,
// } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";

// import api from "@/lib/api";

// export default function Navbar({ onMenuClick }) {
//   const [unreadCount, setUnreadCount] = useState(0);

//   const getUnreadCount = async () => {
//     try {
//       const response = await api.get(
//         "/api/v1/notification/unreadCount"
//       );

//       setUnreadCount(
//         response.data?.data?.count || 0
//       );
//     } catch (error) {
//       console.error(
//         "Failed to fetch unread notifications:",
//         error
//       );
//     }
//   };

//   useEffect(() => {
//     getUnreadCount();

//     // Har 30 seconds baad count update
//     const interval = setInterval(
//       getUnreadCount,
//       30000
//     );

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <header className="flex h-16 items-center border-b bg-background px-4 lg:px-6">

//       {/* Mobile menu */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="mr-3 lg:hidden"
//         onClick={onMenuClick}
//       >
//         <Menu className="h-5 w-5" />
//       </Button>

//       <div className="flex-1">
//         <h1 className="text-lg font-semibold">
//           Dashboard
//         </h1>
//       </div>

//       <div className="flex items-center gap-2">

//         {/* Notification */}
//         <Link href="/dashboard/notifications">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="relative"
//           >
//             <Bell className="h-5 w-5" />

//             {unreadCount > 0 && (
//               <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
//                 {unreadCount > 99
//                   ? "99+"
//                   : unreadCount}
//               </span>
//             )}
//           </Button>
//         </Link>

//         <Separator
//           orientation="vertical"
//           className="mx-2 h-6"
//         />

//         {/* User */}
//         <Avatar className="h-9 w-9">
//           <AvatarFallback>
//             <User className="h-4 w-4" />
//           </AvatarFallback>
//         </Avatar>
//       </div>
//     </header>
//   );
// }






// v3
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Menu, Bell } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Avatar,
//   AvatarFallback,
// } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";

// import api from "@/lib/api";
// import { useSelector } from "react-redux";

// export default function Navbar({ onMenuClick }) {
//   const [unreadCount, setUnreadCount] = useState(0);
//   const user = useSelector((state) => state.auth.user);

//   const getUnreadCount = async () => {
//     try {
//       const response = await api.get(
//         "/api/v1/notification/unreadCount"
//       );

//       setUnreadCount(
//         response.data?.data?.count || 0
//       );
//     } catch (error) {
//       console.error(
//         "Failed to fetch unread notifications:",
//         error
//       );
//     }
//   };

//   useEffect(() => {
//     getUnreadCount();

//     const interval = setInterval(
//       getUnreadCount,
//       30000
//     );

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <header className="flex h-16 items-center border-b px-4 lg:px-6">

//       {/* Mobile menu */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="mr-3 lg:hidden"
//         onClick={onMenuClick}
//       >
//         <Menu className="h-5 w-5" />
//       </Button>

//       <div className="flex-1">
//         <h1 className="text-lg font-semibold">
//           Dashboard
//         </h1>
//       </div>

//       <div className="flex items-center gap-2">

//         {/* Notification */}
//         <Link href="/dashboard/notifications">
//           <Button
//             variant="ghost"
//             size="icon"
//             className="relative"
//           >
//             <Bell className="h-5 w-5" />

//             {unreadCount > 0 && (
//               <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
//                 {unreadCount > 99
//                   ? "99+"
//                   : unreadCount}
//               </span>
//             )}
//           </Button>
//         </Link>

//         <Separator
//           orientation="vertical"
//           className="mx-2 h-6"
//         />

//         <Avatar className="h-9 w-9">
//           <AvatarFallback>
//             {user?.userName?.charAt(0).toUpperCase() || "U"}
//           </AvatarFallback>
//         </Avatar>

//       </div>
//     </header>
//   );
// }




// // v4
// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   Menu,
//   Bell,
//   Wallet,
//   ShoppingBag,
//   Package,
//   CheckCircle2,
//   Clock3,
//   Loader2,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import {
//   Avatar,
//   AvatarFallback,
// } from "@/components/ui/avatar";

// import { Separator } from "@/components/ui/separator";

// import api from "@/lib/api";
// import { useSelector } from "react-redux";

// export default function Navbar({ onMenuClick }) {
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] =
//     useState(false);
//   const [loadingNotifications, setLoadingNotifications] =
//     useState(false);

//   const user = useSelector(
//     (state) => state.auth.user
//   );

//   // =========================
//   // UNREAD COUNT
//   // =========================

//   const getUnreadCount = async () => {
//     try {
//       const response = await api.get(
//         "/api/v1/notification/unreadCount"
//       );

//       setUnreadCount(
//         response.data?.data?.count || 0
//       );
//     } catch (error) {
//       console.error(
//         "Failed to fetch unread notifications:",
//         error
//       );
//     }
//   };

//   // =========================
//   // LATEST NOTIFICATIONS
//   // =========================

//   const getNotifications = async () => {
//     try {
//       setLoadingNotifications(true);

//       const response = await api.get(
//         "/api/v1/notification"
//       );

//       const data =
//         response.data?.data?.notifications || [];

//       // Latest 5 only
//       setNotifications(data.slice(0, 5));
//     } catch (error) {
//       console.error(
//         "Failed to fetch notifications:",
//         error
//       );
//     } finally {
//       setLoadingNotifications(false);
//     }
//   };

//   // =========================
//   // INITIAL
//   // =========================

//   useEffect(() => {
//     getUnreadCount();

//     const interval = setInterval(
//       getUnreadCount,
//       30000
//     );

//     return () => clearInterval(interval);
//   }, []);

//   // =========================
//   // BELL CLICK
//   // =========================

//   const handleBellClick = async () => {
//     const newState = !showNotifications;

//     setShowNotifications(newState);

//     if (newState) {
//       await getNotifications();
//     }
//   };

//   // =========================
//   // MARK AS READ
//   // =========================

//   const handleNotificationClick = async (
//     notification
//   ) => {
//     try {
//       if (!notification.isRead) {
//         await api.post(
//           `/api/v1/notification/read/${notification._id}`
//         );

//         // Local update
//         setNotifications((prev) =>
//           prev.map((item) =>
//             item._id === notification._id
//               ? {
//                 ...item,
//                 isRead: true,
//               }
//               : item
//           )
//         );

//         // Update badge immediately
//         setUnreadCount((prev) =>
//           Math.max(prev - 1, 0)
//         );
//       }
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

//   const getNotificationIcon = (notification) => {
//     const title =
//       notification.title?.toLowerCase() || "";

//     if (title.includes("withdraw")) {
//       return <Wallet className="h-4 w-4" />;
//     }

//     if (title.includes("order")) {
//       return (
//         <ShoppingBag className="h-4 w-4" />
//       );
//     }

//     if (title.includes("product")) {
//       return <Package className="h-4 w-4" />;
//     }

//     return <Bell className="h-4 w-4" />;
//   };

//   // =========================
//   // DATE
//   // =========================

//   const formatDate = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleString(
//       undefined,
//       {
//         dateStyle: "short",
//         timeStyle: "short",
//       }
//     );
//   };

//   return (
//     <header className="flex h-16 items-center border-b bg-background px-4 sm:px-6">

//       {/* Mobile menu */}

//       <Button
//         variant="ghost"
//         size="icon"
//         className="mr-3 lg:hidden"
//         onClick={onMenuClick}
//       >
//         <Menu className="h-5 w-5" />
//       </Button>

//       {/* Title */}

//       <div className="flex-1">
//         <h1 className="text-lg font-semibold">
//           Dashboard
//         </h1>
//       </div>

//       {/* Right */}

//       <div className="flex items-center gap-2">

//         {/* Notification */}

//         <div className="relative">

//           <Button
//             variant="ghost"
//             size="icon"
//             className="relative"
//             onClick={handleBellClick}
//           >
//             <Bell className="h-5 w-5" />

//             {unreadCount > 0 && (
//               <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
//                 {unreadCount > 99
//                   ? "99+"
//                   : unreadCount}
//               </span>
//             )}
//           </Button>

//           {/* Notification Dropdown */}

//           {showNotifications && (
//             <div className="absolute right-0 top-12 z-50 w-[350px] overflow-hidden rounded-xl border bg-background shadow-xl">

//               {/* Header */}

//               <div className="flex items-center justify-between border-b px-4 py-3">

//                 <div>
//                   <h3 className="font-semibold">
//                     Notifications
//                   </h3>

//                   <p className="text-xs text-muted-foreground">
//                     {unreadCount} unread
//                   </p>
//                 </div>

//                 <Bell className="h-5 w-5 text-muted-foreground" />

//               </div>

//               {/* Body */}

//               <div className="max-h-[400px] overflow-y-auto">

//                 {loadingNotifications ? (
//                   <div className="flex h-32 items-center justify-center">
//                     <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
//                   </div>
//                 ) : notifications.length === 0 ? (

//                   <div className="flex h-32 flex-col items-center justify-center gap-2 text-muted-foreground">

//                     <Bell className="h-7 w-7 opacity-40" />

//                     <p className="text-sm">
//                       No notifications
//                     </p>

//                   </div>

//                 ) : (

//                   notifications.map((notification) => (

//                     <Link
//                       key={notification._id}
//                       href="/dashboard/notifications"
//                       onClick={() =>
//                         handleNotificationClick(
//                           notification
//                         )
//                       }
//                       className={`block border-b px-4 py-3 transition-colors hover:bg-muted ${!notification.isRead
//                           ? "bg-primary/[0.03]"
//                           : ""
//                         }`}
//                     >

//                       <div className="flex gap-3">

//                         {/* Icon */}

//                         <div
//                           className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${notification.isRead
//                               ? "bg-muted text-muted-foreground"
//                               : "bg-primary/10 text-primary"
//                             }`}
//                         >
//                           {getNotificationIcon(
//                             notification
//                           )}
//                         </div>

//                         {/* Content */}

//                         <div className="min-w-0 flex-1">

//                           <div className="flex items-start justify-between gap-2">

//                             <p
//                               className={`truncate text-sm ${!notification.isRead
//                                   ? "font-semibold"
//                                   : "font-medium"
//                                 }`}
//                             >
//                               {notification.title}
//                             </p>

//                             {!notification.isRead && (
//                               <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
//                             )}

//                           </div>

//                           <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
//                             {notification.message}
//                           </p>

//                           <p className="mt-1 text-[10px] text-muted-foreground">
//                             {formatDate(
//                               notification.createdAt
//                             )}
//                           </p>

//                         </div>

//                       </div>

//                     </Link>

//                   ))

//                 )}

//               </div>

//               {/* Footer */}

//               <div className="border-t p-2">

//                 <Link
//                   href="/dashboard/notifications"
//                   onClick={() =>
//                     setShowNotifications(false)
//                   }
//                   className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
//                 >
//                   View all notifications
//                 </Link>

//               </div>

//             </div>
//           )}

//         </div>

//         <Separator
//           orientation="vertical"
//           className="mx-2 h-6"
//         />

//         {/* Avatar */}

//         <Avatar className="h-9 w-9">

//           <AvatarFallback>
//             {user?.userName
//               ?.charAt(0)
//               .toUpperCase() || "U"}
//           </AvatarFallback>

//         </Avatar>

//       </div>

//     </header>
//   );
// }





// v5
// "use client";

// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import {
//   Menu,
//   Bell,
//   Wallet,
//   ShoppingBag,
//   Package,
//   Loader2,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Avatar,
//   AvatarFallback,
// } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";

// import api from "@/lib/api";
// import { useSelector } from "react-redux";

// export default function Navbar({ onMenuClick }) {
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] =
//     useState(false);
//   const [loadingNotifications, setLoadingNotifications] =
//     useState(false);

//   const notificationRef = useRef(null);

//   const user = useSelector(
//     (state) => state.auth.user
//   );

//   // =========================
//   // GET UNREAD COUNT
//   // =========================

//   const getUnreadCount = async () => {
//     try {
//       const response = await api.get(
//         "/api/v1/notification/unreadCount"
//       );

//       setUnreadCount(
//         response.data?.data?.count || 0
//       );
//     } catch (error) {
//       console.error(
//         "Failed to fetch unread notifications:",
//         error
//       );
//     }
//   };

//   // =========================
//   // GET LATEST NOTIFICATIONS
//   // =========================

//   const getNotifications = async () => {
//     try {
//       setLoadingNotifications(true);

//       const response = await api.get(
//         "/api/v1/notification"
//       );

//       const data =
//         response.data?.data?.notifications || [];

//       setNotifications(data.slice(0, 5));
//     } catch (error) {
//       console.error(
//         "Failed to fetch notifications:",
//         error
//       );
//     } finally {
//       setLoadingNotifications(false);
//     }
//   };

//   // =========================
//   // INITIAL + AUTO REFRESH
//   // =========================

//   useEffect(() => {
//     getUnreadCount();

//     const interval = setInterval(
//       getUnreadCount,
//       30000
//     );

//     return () => clearInterval(interval);
//   }, []);

//   // =========================
//   // OUTSIDE CLICK
//   // =========================

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (
//         notificationRef.current &&
//         !notificationRef.current.contains(
//           event.target
//         )
//       ) {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener(
//       "mousedown",
//       handleOutsideClick
//     );

//     return () => {
//       document.removeEventListener(
//         "mousedown",
//         handleOutsideClick
//       );
//     };
//   }, []);

//   // =========================
//   // ESC KEY
//   // =========================

//   useEffect(() => {
//     const handleEscape = (event) => {
//       if (event.key === "Escape") {
//         setShowNotifications(false);
//       }
//     };

//     document.addEventListener(
//       "keydown",
//       handleEscape
//     );

//     return () => {
//       document.removeEventListener(
//         "keydown",
//         handleEscape
//       );
//     };
//   }, []);

//   // =========================
//   // BELL CLICK
//   // =========================

//   const handleBellClick = async () => {
//     if (showNotifications) {
//       setShowNotifications(false);
//       return;
//     }

//     setShowNotifications(true);

//     await getNotifications();
//   };

//   // =========================
//   // MARK AS READ
//   // =========================

//   const handleNotificationClick = async (
//     notification
//   ) => {
//     try {
//       if (!notification.isRead) {
//         await api.post(
//           `/api/v1/notification/read/${notification._id}`
//         );

//         setNotifications((prev) =>
//           prev.map((item) =>
//             item._id === notification._id
//               ? {
//                 ...item,
//                 isRead: true,
//               }
//               : item
//           )
//         );

//         setUnreadCount((prev) =>
//           Math.max(prev - 1, 0)
//         );
//       }

//       // Dropdown close
//       setShowNotifications(false);
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
//       return <Wallet className="h-4 w-4" />;
//     }

//     if (title.includes("order")) {
//       return (
//         <ShoppingBag className="h-4 w-4" />
//       );
//     }

//     if (title.includes("product")) {
//       return <Package className="h-4 w-4" />;
//     }

//     return <Bell className="h-4 w-4" />;
//   };

//   // =========================
//   // DATE FORMAT
//   // =========================

//   const formatDate = (date) => {
//     if (!date) return "";

//     return new Date(date).toLocaleString(
//       undefined,
//       {
//         dateStyle: "short",
//         timeStyle: "short",
//       }
//     );
//   };

//   return (
//     <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background px-4 sm:px-6">

//       {/* Mobile Menu */}

//       <Button
//         variant="ghost"
//         size="icon"
//         className="mr-3 lg:hidden"
//         onClick={onMenuClick}
//       >
//         <Menu className="h-5 w-5" />
//       </Button>

//       {/* Page Title */}

//       <div className="flex-1">
//         <h1 className="text-lg font-semibold">
//           Dashboard
//         </h1>
//       </div>

//       {/* Right Side */}

//       <div className="flex items-center gap-2">

//         {/* =========================
//             NOTIFICATION
//         ========================= */}

//         <div
//           ref={notificationRef}
//           className="relative"
//         >
//           <Button
//             variant="ghost"
//             size="icon"
//             className="relative"
//             onClick={handleBellClick}
//           >
//             <Bell className="h-5 w-5" />

//             {unreadCount > 0 && (
//               <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
//                 {unreadCount > 99
//                   ? "99+"
//                   : unreadCount}
//               </span>
//             )}
//           </Button>

//           {/* =========================
//               DROPDOWN
//           ========================= */}

//           {showNotifications && (
//             <div className="absolute right-0 top-12 z-50 w-[350px] overflow-hidden rounded-xl border bg-background shadow-xl">

//               {/* Header */}

//               <div className="flex items-center justify-between border-b px-4 py-3">
//                 <div>
//                   <h3 className="font-semibold">
//                     Notifications
//                   </h3>

//                   <p className="text-xs text-muted-foreground">
//                     {unreadCount} unread
//                   </p>
//                 </div>

//                 <Bell className="h-5 w-5 text-muted-foreground" />
//               </div>

//               {/* Notifications */}

//               <div className="max-h-[400px] overflow-y-auto">

//                 {loadingNotifications ? (
//                   <div className="flex h-32 items-center justify-center">
//                     <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
//                   </div>
//                 ) : notifications.length === 0 ? (
//                   <div className="flex h-32 flex-col items-center justify-center gap-2 text-muted-foreground">
//                     <Bell className="h-7 w-7 opacity-40" />

//                     <p className="text-sm">
//                       No notifications
//                     </p>
//                   </div>
//                 ) : (
//                   notifications.map(
//                     (notification) => (
//                       <Link
//                         key={notification._id}
//                         href="/dashboard/notifications"
//                         onClick={() =>
//                           handleNotificationClick(
//                             notification
//                           )
//                         }
//                         className={`block border-b px-4 py-3 transition-colors hover:bg-muted ${!notification.isRead
//                             ? "bg-primary/[0.03]"
//                             : ""
//                           }`}
//                       >
//                         <div className="flex gap-3">

//                           {/* Icon */}

//                           <div
//                             className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${notification.isRead
//                                 ? "bg-muted text-muted-foreground"
//                                 : "bg-primary/10 text-primary"
//                               }`}
//                           >
//                             {getNotificationIcon(
//                               notification
//                             )}
//                           </div>

//                           {/* Content */}

//                           <div className="min-w-0 flex-1">

//                             <div className="flex items-start justify-between gap-2">

//                               <p
//                                 className={`truncate text-sm ${!notification.isRead
//                                     ? "font-semibold"
//                                     : "font-medium"
//                                   }`}
//                               >
//                                 {notification.title}
//                               </p>

//                               {!notification.isRead && (
//                                 <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
//                               )}
//                             </div>

//                             <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
//                               {notification.message}
//                             </p>

//                             <p className="mt-1 text-[10px] text-muted-foreground">
//                               {formatDate(
//                                 notification.createdAt
//                               )}
//                             </p>

//                           </div>
//                         </div>
//                       </Link>
//                     )
//                   )
//                 )}
//               </div>

//               {/* Footer */}

//               <div className="border-t p-2">
//                 <Link
//                   href="/dashboard/notifications"
//                   onClick={() =>
//                     setShowNotifications(false)
//                   }
//                   className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
//                 >
//                   View all notifications
//                 </Link>
//               </div>

//             </div>
//           )}
//         </div>

//         <Separator
//           orientation="vertical"
//           className="mx-2 h-6"
//         />

//         {/* =========================
//             USER AVATAR
//         ========================= */}

//         <Avatar className="h-9 w-9">
//           <AvatarFallback>
//             {user?.userName
//               ?.charAt(0)
//               .toUpperCase() || "U"}
//           </AvatarFallback>
//         </Avatar>

//       </div>
//     </header>
//   );
// }



// v6
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Menu,
  Bell,
  Wallet,
  ShoppingBag,
  Package,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

import {
  markNotificationAsRead,
} from "@/redux/slices/notificationSlice";

import {
  markNotificationAsRead as markNotificationAsReadApi,
} from "@/lib/notificationApi";

export default function Navbar({ onMenuClick }) {
  const dispatch = useDispatch();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const notificationRef = useRef(null);

  // =========================
  // AUTH USER
  // =========================

  const user = useSelector(
    (state) => state.auth.user
  );

  // =========================
  // NOTIFICATION REDUX STATE
  // =========================

  const {
    notifications,
    unreadCount,
    loading: loadingNotifications,
  } = useSelector(
    (state) => state.notification
  );

  // =========================
  // OUTSIDE CLICK
  // =========================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target
        )
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  // =========================
  // ESC KEY
  // =========================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // =========================
  // BELL CLICK
  // =========================

  const handleBellClick = () => {
    setShowNotifications(
      (prev) => !prev
    );
  };

  // =========================
  // MARK AS READ
  // =========================

  const handleNotificationClick = async (
    notification
  ) => {
    try {
      // Already read hai to API call ki zaroorat nahi
      if (!notification.isRead) {
        // Backend ko read request
        await markNotificationAsReadApi(
          notification._id
        );

        // Redux ko instantly update karo
        dispatch(
          markNotificationAsRead(
            notification._id
          )
        );
      }

      // Dropdown close
      setShowNotifications(false);
    } catch (error) {
      console.error(
        "Failed to mark notification as read:",
        error
      );
    }
  };

  // =========================
  // NOTIFICATION ICON
  // =========================

  const getNotificationIcon = (
    notification
  ) => {
    const title =
      notification.title?.toLowerCase() || "";

    if (title.includes("withdraw")) {
      return (
        <Wallet className="h-4 w-4" />
      );
    }

    if (title.includes("order")) {
      return (
        <ShoppingBag className="h-4 w-4" />
      );
    }

    if (title.includes("product")) {
      return (
        <Package className="h-4 w-4" />
      );
    }

    return (
      <Bell className="h-4 w-4" />
    );
  };

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString(
      undefined,
      {
        dateStyle: "short",
        timeStyle: "short",
      }
    );
  };

  // =========================
  // LATEST 5 NOTIFICATIONS
  // =========================

  const latestNotifications =
    notifications?.slice(0, 5) || [];

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background px-4 sm:px-6">

      {/* =========================
          MOBILE MENU
      ========================= */}

      <Button
        variant="ghost"
        size="icon"
        className="mr-3 lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* =========================
          PAGE TITLE
      ========================= */}

      <div className="flex-1">
        <h1 className="text-lg font-semibold">
          Dashboard
        </h1>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="flex items-center gap-2">

        {/* =========================
            NOTIFICATION
        ========================= */}

        <div
          ref={notificationRef}
          className="relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={handleBellClick}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />

            {/* UNREAD BADGE */}

            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}
          </Button>

          {/* =========================
              NOTIFICATION DROPDOWN
          ========================= */}

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-[350px] overflow-hidden rounded-xl border bg-background shadow-xl">

              {/* HEADER */}

              <div className="flex items-center justify-between border-b px-4 py-3">
                <div>
                  <h3 className="font-semibold">
                    Notifications
                  </h3>

                  <p className="text-xs text-muted-foreground">
                    {unreadCount} unread
                  </p>
                </div>

                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* NOTIFICATIONS */}

              <div className="max-h-[400px] overflow-y-auto">

                {/* LOADING */}

                {loadingNotifications ? (
                  <div className="flex h-32 items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : latestNotifications.length ===
                  0 ? (
                  /* EMPTY */

                  <div className="flex h-32 flex-col items-center justify-center gap-2 text-muted-foreground">
                    <Bell className="h-7 w-7 opacity-40" />

                    <p className="text-sm">
                      No notifications
                    </p>
                  </div>
                ) : (
                  /* LIST */

                  latestNotifications.map(
                    (notification) => (
                      <Link
                        key={notification._id}
                        href={`/dashboard/notifications/${ notification._id } `}
                        onClick={() =>
                          handleNotificationClick(
                            notification
                          )
                        }
                        className={`block border-b px-4 py-3 transition-colors hover:bg-muted ${
  !notification.isRead
    ? "bg-primary/[0.03]"
    : ""
} `}
                      >
                        <div className="flex gap-3">

                          {/* ICON */}

                          <div
                            className={`flex h - 9 w - 9 shrink - 0 items - center justify - center rounded - lg ${
  notification.isRead
    ? "bg-muted text-muted-foreground"
    : "bg-primary/10 text-primary"
} `}
                          >
                            {getNotificationIcon(
                              notification
                            )}
                          </div>

                          {/* CONTENT */}

                          <div className="min-w-0 flex-1">

                            <div className="flex items-start justify-between gap-2">

                              <p
                                className={`truncate text - sm ${
  !notification.isRead
    ? "font-semibold"
    : "font-medium"
} `}
                              >
                                {
                                  notification.title
                                }
                              </p>

                              {/* UNREAD DOT */}

                              {!notification.isRead && (
                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                              )}
                            </div>

                            {/* MESSAGE */}

                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                              {
                                notification.message
                              }
                            </p>

                            {/* DATE */}

                            <p className="mt-1 text-[10px] text-muted-foreground">
                              {formatDate(
                                notification.createdAt
                              )}
                            </p>

                          </div>
                        </div>
                      </Link>
                    )
                  )
                )}
              </div>

              {/* FOOTER */}

              <div className="border-t p-2">
                <Link
                  href="/dashboard/notifications"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                  className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
                >
                  View all notifications
                </Link>
              </div>

            </div>
          )}
        </div>

        {/* =========================
            SEPARATOR
        ========================= */}

        <Separator
          orientation="vertical"
          className="mx-2 h-6"
        />

        {/* =========================
            USER AVATAR
        ========================= */}

        <Avatar className="h-9 w-9">
          <AvatarFallback>
            {user?.userName
              ?.charAt(0)
              .toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

      </div>
    </header>
  );
}