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
// "use client";

// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

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

// import {
//   markNotificationAsRead,
// } from "@/redux/slices/notificationSlice";

// import {
//   markNotificationAsRead as markNotificationAsReadApi,
// } from "@/lib/notificationApi";

// export default function Navbar({ onMenuClick }) {
//   const dispatch = useDispatch();

//   const [showNotifications, setShowNotifications] =
//     useState(false);

//   const notificationRef = useRef(null);

//   // =========================
//   // AUTH USER
//   // =========================

//   const user = useSelector(
//     (state) => state.auth.user
//   );

//   // =========================
//   // NOTIFICATION REDUX STATE
//   // =========================

//   const {
//     notifications,
//     unreadCount,
//     loading: loadingNotifications,
//   } = useSelector(
//     (state) => state.notification
//   );

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

//   const handleBellClick = () => {
//     setShowNotifications(
//       (prev) => !prev
//     );
//   };

//   // =========================
//   // MARK AS READ
//   // =========================

//   const handleNotificationClick = async (
//     notification
//   ) => {
//     try {
//       // Already read hai to API call ki zaroorat nahi
//       if (!notification.isRead) {
//         // Backend ko read request
//         await markNotificationAsReadApi(
//           notification._id
//         );

//         // Redux ko instantly update karo
//         dispatch(
//           markNotificationAsRead(
//             notification._id
//           )
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

//   const getNotificationIcon = (
//     notification
//   ) => {
//     const title =
//       notification.title?.toLowerCase() || "";

//     if (title.includes("withdraw")) {
//       return (
//         <Wallet className="h-4 w-4" />
//       );
//     }

//     if (title.includes("order")) {
//       return (
//         <ShoppingBag className="h-4 w-4" />
//       );
//     }

//     if (title.includes("product")) {
//       return (
//         <Package className="h-4 w-4" />
//       );
//     }

//     return (
//       <Bell className="h-4 w-4" />
//     );
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

//   // =========================
//   // LATEST 5 NOTIFICATIONS
//   // =========================

//   const latestNotifications =
//     notifications?.slice(0, 5) || [];

//   return (
//     <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background px-4 sm:px-6">

//       {/* =========================
//           MOBILE MENU
//       ========================= */}

//       <Button
//         variant="ghost"
//         size="icon"
//         className="mr-3 lg:hidden"
//         onClick={onMenuClick}
//       >
//         <Menu className="h-5 w-5" />
//       </Button>

//       {/* =========================
//           PAGE TITLE
//       ========================= */}

//       <div className="flex-1">
//         <h1 className="text-lg font-semibold">
//           Dashboard
//         </h1>
//       </div>

//       {/* =========================
//           RIGHT SIDE
//       ========================= */}

//       <div className="flex items-center gap-2">

//         {/* =========================
//             NOTIFICATION
//         ========================= */}
// {/* v1 */}
        
//         <div
//           ref={notificationRef}
//           className="relative"
//         >
//           {/* =========================
//       NOTIFICATION BUTTON
//   ========================= */}

//           <Button
//             variant="ghost"
//             size="icon"
//             className="relative h-9 w-9 rounded-full transition-all duration-200 hover:bg-muted/80 hover:shadow-sm"
//             onClick={handleBellClick}
//             aria-label="Notifications"
//           >
//             <Bell
//               className={`h-5 w-5 transition-all duration-200 ${unreadCount > 0
//                   ? "text-foreground"
//                   : "text-muted-foreground"
//                 }`}
//             />

//             {/* UNREAD BADGE */}

//             {unreadCount > 0 && (
//               <span className="absolute -right-0.5 -top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full border-2 border-background bg-destructive px-1 text-[9px] font-bold leading-none text-destructive-foreground shadow-sm">
//                 {unreadCount > 99 ? "99+" : unreadCount}
//               </span>
//             )}
//           </Button>

//           {/* =========================
//       NOTIFICATION DROPDOWN
//   ========================= */}

//           {showNotifications && (
//             <div className="absolute right-0 top-12 z-50 w-[min(380px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-border/60 bg-background/95 shadow-2xl shadow-black/10 backdrop-blur-xl">

//               {/* =========================
//           HEADER
//       ========================= */}

//               <div className="flex items-center justify-between border-b border-border/60 bg-muted/20 px-4 py-3.5">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
//                     <Bell className="h-4.5 w-4.5" />
//                   </div>

//                   <div>
//                     <h3 className="text-sm font-semibold tracking-tight">
//                       Notifications
//                     </h3>

//                     <p className="mt-0.5 text-[11px] text-muted-foreground">
//                       {unreadCount > 0
//                         ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""
//                         }`
//                         : "You're all caught up"}
//                     </p>
//                   </div>

//                 </div>

//                 {/* UNREAD COUNT */}

//                 {unreadCount > 0 && (
//                   <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
//                     {unreadCount > 99 ? "99+" : unreadCount}
//                   </span>
//                 )}

//               </div>

//               {/* =========================
//           NOTIFICATION LIST
//       ========================= */}

//               <div className="max-h-[420px] overflow-y-auto overscroll-contain">

//                 {/* LOADING */}

//                 {loadingNotifications ? (
//                   <div className="flex h-40 flex-col items-center justify-center gap-2">
//                     <Loader2 className="h-5 w-5 animate-spin text-primary" />

//                     <p className="text-xs text-muted-foreground">
//                       Loading notifications...
//                     </p>
//                   </div>
//                 ) : latestNotifications.length === 0 ? (

//                   /* =========================
//                      EMPTY STATE
//                   ========================= */

//                   <div className="flex h-40 flex-col items-center justify-center px-6 text-center">

//                     <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
//                       <Bell className="h-6 w-6 text-muted-foreground/60" />
//                     </div>

//                     <p className="text-sm font-medium">
//                       No notifications
//                     </p>

//                     <p className="mt-1 text-xs text-muted-foreground">
//                       You're all caught up. We'll notify you when something happens.
//                     </p>

//                   </div>

//                 ) : (

//                   /* =========================
//                      NOTIFICATION LIST
//                   ========================= */

//                   latestNotifications.map((notification) => (

//                     <Link
//                       key={notification._id}
//                       href={`/dashboard/notifications/${notification._id}`}
//                       onClick={() =>
//                         handleNotificationClick(notification)
//                       }
//                       className={`group relative block border-b border-border/40 px-4 py-3.5 transition-all duration-200 hover:bg-muted/60 ${!notification.isRead
//                           ? "bg-primary/[0.035]"
//                           : "bg-transparent"
//                         }`}
//                     >

//                       <div className="flex gap-3">

//                         {/* =========================
//                     ICON
//                 ========================= */}

//                         <div
//                           className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-105 ${notification.isRead
//                               ? "bg-muted text-muted-foreground"
//                               : "bg-primary/10 text-primary"
//                             }`}
//                         >
//                           {getNotificationIcon(notification)}

//                           {/* UNREAD INDICATOR */}

//                           {!notification.isRead && (
//                             <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
//                           )}
//                         </div>

//                         {/* =========================
//                     CONTENT
//                 ========================= */}

//                         <div className="min-w-0 flex-1">

//                           {/* TITLE + TIME */}

//                           <div className="flex items-start justify-between gap-3">

//                             <p
//                               className={`min-w-0 truncate text-sm leading-5 ${!notification.isRead
//                                   ? "font-semibold text-foreground"
//                                   : "font-medium text-foreground/90"
//                                 }`}
//                             >
//                               {notification.title}
//                             </p>

//                             {!notification.isRead && (
//                               <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
//                             )}

//                           </div>

//                           {/* MESSAGE */}

//                           <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground">
//                             {notification.message}
//                           </p>

//                           {/* DATE */}

//                           <p className="mt-1.5 text-[10px] font-medium text-muted-foreground/70">
//                             {formatDate(notification.createdAt)}
//                           </p>

//                         </div>

//                       </div>

//                       {/* SUBTLE UNREAD BORDER */}

//                       {!notification.isRead && (
//                         <span className="absolute bottom-0 left-0 top-0 w-0.5 bg-primary" />
//                       )}

//                     </Link>

//                   ))
//                 )}

//               </div>

//               {/* =========================
//           FOOTER
//       ========================= */}

//               <div className="border-t border-border/60 bg-muted/20 p-2">

//                 <Link
//                   href="/dashboard/notifications"
//                   onClick={() =>
//                     setShowNotifications(false)
//                   }
//                   className="flex w-full items-center justify-center rounded-xl px-3 py-2.5 text-xs font-semibold text-primary transition-all duration-200 hover:bg-primary/10"
//                 >
//                   View all notifications
//                 </Link>

//               </div>

//             </div>
//           )}
//         </div>

//         {/* =========================
//             SEPARATOR
//         ========================= */}

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




// v7

"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  Menu,
  Bell,
  Wallet,
  ShoppingBag,
  Package,
  Loader2,
  ChevronRight,
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
  const router = useRouter();

  const notificationRef = useRef(null);
  const bellButtonRef = useRef(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const [markingId, setMarkingId] = useState(null);

  // =========================
  // REDUX STATE
  // =========================

  const user = useSelector((state) => state.auth.user);

  const {
    notifications = [],
    unreadCount = 0,
    loading: loadingNotifications,
  } = useSelector((state) => state.notification);

  // =========================
  // USER AVATAR
  // =========================

  const userName = user?.userName || "User";

  const avatarInitials = userName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("") || "U";

  // =========================
  // CLOSE DROPDOWN
  // =========================

  const closeNotifications = useCallback(() => {
    setShowNotifications(false);
  }, []);

  // =========================
  // OUTSIDE CLICK + ESCAPE
  // =========================

  useEffect(() => {
    if (!showNotifications) return;

    const handlePointerDown = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        closeNotifications();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeNotifications();
        bellButtonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNotifications, closeNotifications]);

  // =========================
  // TOGGLE NOTIFICATIONS
  // =========================

  const handleBellClick = () => {
    setShowNotifications((prev) => !prev);
  };

  // =========================
  // NOTIFICATION ICON
  // =========================

  const getNotificationIcon = (notification) => {
    const title = notification.title?.toLowerCase() || "";
    const message = notification.message?.toLowerCase() || "";
    const content = `${ title } ${ message } `;

    if (content.includes("withdraw")) {
      return <Wallet className="h-4 w-4" />;
    }

    if (content.includes("order")) {
      return <ShoppingBag className="h-4 w-4" />;
    }

    if (content.includes("product")) {
      return <Package className="h-4 w-4" />;
    }

    return <Bell className="h-4 w-4" />;
  };

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(parsedDate);
  };

  // =========================
  // MARK READ + NAVIGATE
  // =========================

  const handleNotificationClick = async (event, notification) => {
    event.preventDefault();

    const destination = `/ dashboard / notifications / ${ notification._id } `;

    closeNotifications();

    try {
      if (!notification.isRead) {
        setMarkingId(notification._id);

        await markNotificationAsReadApi(notification._id);

        dispatch(markNotificationAsRead(notification._id));
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    } finally {
      setMarkingId(null);
      router.push(destination);
    }
  };

  // =========================
  // LATEST NOTIFICATIONS
  // =========================

  const latestNotifications = notifications
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 5);

  const safeUnreadCount = Math.max(0, Number(unreadCount) || 0);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:px-6">

      {/* MOBILE MENU */}

      <Button
        variant="ghost"
        size="icon"
        className="mr-2 shrink-0 lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* PAGE TITLE */}

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
          Dashboard
        </h1>

        <p className="hidden text-xs text-muted-foreground sm:block">
          Welcome back, {userName}
        </p>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex shrink-0 items-center gap-1 sm:gap-2">

        {/* NOTIFICATIONS */}

        <div ref={notificationRef} className="relative">

          <Button
            ref={bellButtonRef}
            variant="ghost"
            size="icon"
            className="relative cursor-pointer h-10 w-10 rounded-full"
            onClick={handleBellClick}
            aria-label={
              safeUnreadCount > 0
                ? `Notifications, ${ safeUnreadCount } unread`
                : "Notifications"
            }
            aria-expanded={showNotifications}
            aria-haspopup="dialog"
            aria-controls="notification-dropdown"
          >
            <Bell
              className={`h - 5 w - 5 transition - colors ${
  safeUnreadCount > 0
    ? "text-foreground"
    : "text-muted-foreground"
} `}
            />

            {safeUnreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full border-2 border-background bg-destructive px-1 text-[9px] font-bold leading-none text-destructive-foreground">
                {safeUnreadCount > 99 ? "99+" : safeUnreadCount}
              </span>
            )}
          </Button>

          {/* DROPDOWN */}

          {showNotifications && (
            <div
              id="notification-dropdown"
              role="dialog"
              aria-label="Notifications"
              className="absolute right-0 top-12 z-50 w-[min(380px,calc(100vw-20px))] overflow-hidden rounded-2xl border bg-background shadow-xl shadow-black/10"
            >

              {/* HEADER */}

              <div className="flex items-center justify-between border-b bg-muted/20 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Bell className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">
                      Notifications
                    </h2>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {safeUnreadCount > 0
                        ? `${ safeUnreadCount } unread notification${
  safeUnreadCount === 1 ? "" : "s"
} `
                        : "You're all caught up"}
                    </p>
                  </div>
                </div>

                {safeUnreadCount > 0 && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {safeUnreadCount > 99 ? "99+" : safeUnreadCount}
                  </span>
                )}
              </div>

              {/* LIST */}

              <div className="max-h-[min(420px,65vh)] overflow-y-auto overscroll-contain">

                {loadingNotifications ? (
                  <div className="flex h-40 flex-col items-center justify-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />

                    <p className="text-xs text-muted-foreground">
                      Loading notifications...
                    </p>
                  </div>
                ) : latestNotifications.length === 0 ? (
                  <div className="flex min-h-48 flex-col items-center justify-center px-6 py-8 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
                      <Bell className="h-6 w-6 text-muted-foreground/60" />
                    </div>

                    <p className="text-sm font-semibold">
                      No notifications yet
                    </p>

                    <p className="mt-1 max-w-[240px] text-xs leading-5 text-muted-foreground">
                      We'll let you know when there's an update about your orders, products, or withdrawals.
                    </p>
                  </div>
                ) : (
                  latestNotifications.map((notification) => {
                    const isUnread = !notification.isRead;
                    const isMarking = markingId === notification._id;

                    return (
                      <Link
                        key={notification._id}
                        href={`/ dashboard / notifications / ${ notification._id } `}
                        onClick={(event) =>
                          handleNotificationClick(event, notification)
                        }
                        aria-label={`${ notification.title || "Notification" }${
  isUnread ? ", unread" : ""
} `}
                        className={`group relative block border - b last: border - b - 0 transition - colors hover: bg - muted / 60 focus - visible: outline - none focus - visible: ring - 2 focus - visible: ring - inset focus - visible: ring - primary ${
  isUnread ? "bg-primary/[0.035]" : ""
} `}
                      >
                        <div className="flex gap-3 px-4 py-3.5">

                          {/* ICON */}

                          <div
                            className={`relative flex h - 10 w - 10 shrink - 0 items - center justify - center rounded - xl ${
  isUnread
    ? "bg-primary/10 text-primary"
    : "bg-muted text-muted-foreground"
} `}
                          >
                            {isMarking ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              getNotificationIcon(notification)
                            )}

                            {isUnread && (
                              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                            )}
                          </div>

                          {/* CONTENT */}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`line - clamp - 1 text - sm leading - 5 ${
  isUnread
    ? "font-semibold text-foreground"
    : "font-medium text-foreground/90"
} `}
                              >
                                {notification.title || "Notification"}
                              </p>

                              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>

                            <p className="mt-1 line-clamp-2 break-words text-xs leading-5 text-muted-foreground">
                              {notification.message || "You have a new update."}
                            </p>

                            <p className="mt-2 text-[10px] font-medium text-muted-foreground/70">
                              {formatDate(notification.createdAt)}
                            </p>
                          </div>
                        </div>

                        {isUnread && (
                          <span className="absolute bottom-0 left-0 top-0 w-0.5 bg-primary" />
                        )}
                      </Link>
                    );
                  })
                )}
              </div>

              {/* FOOTER */}

              <div className="border-t bg-muted/20 p-2">
                <Link
                  href="/dashboard/notifications"
                  onClick={closeNotifications}
                  className="flex w-full items-center justify-center rounded-xl px-3 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  View all notifications
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* SEPARATOR */}

        <Separator
          orientation="vertical"
          className="mx-1 h-6 sm:mx-2"
        />

        {/* USER AVATAR */}

        <Link
          href="/dashboard/profile"
          aria-label={`View ${ userName } 's profile`}
className = "rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
  >
  <Avatar className="h-9 w-9 border transition-colors hover:border-primary">
    <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
      {avatarInitials}
    </AvatarFallback>
  </Avatar>
        </Link >
      </div >
    </header >
  );
}
