// "use client";

// import { Menu, ShieldCheck } from "lucide-react";

// export default function AdminHeader({
//   onMenuClick,
// }) {
//   return (
//     <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">

//       {/* =========================
//           MOBILE MENU
//       ========================= */}

//       <button
//         type="button"
//         onClick={onMenuClick}
//         className="mr-3 rounded-md p-2 hover:bg-muted lg:hidden"
//         aria-label="Open sidebar"
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {/* =========================
//           TITLE
//       ========================= */}

//       <div className="flex items-center gap-2">

//         <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-muted sm:flex">

//           <ShieldCheck className="h-4 w-4" />

//         </div>

//         <div>

//           <p className="text-sm font-semibold">
//             Admin Panel
//           </p>

//           <p className="hidden text-xs text-muted-foreground sm:block">
//             Manage your platform
//           </p>

//         </div>

//       </div>

//       {/* =========================
//           RIGHT
//       ========================= */}

//       <div className="ml-auto flex items-center">

//         <div className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium">
//           Administrator
//         </div>

//       </div>

//     </header>
//   );
// }






// v2

// "use client";

// import Link from "next/link";

// import {
//   Menu,
//   ShieldCheck,
//   Bell,
// } from "lucide-react";

// export default function AdminHeader({
//   onMenuClick,
// }) {
//   return (
//     <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">

//       {/* =========================
//           MOBILE MENU
//       ========================= */}

//       <button
//         type="button"
//         onClick={onMenuClick}
//         className="mr-3 rounded-md p-2 hover:bg-muted lg:hidden"
//         aria-label="Open sidebar"
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       {/* =========================
//           TITLE
//       ========================= */}

//       <div className="flex items-center gap-2">

//         <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-muted sm:flex">

//           <ShieldCheck className="h-4 w-4" />

//         </div>

//         <div>

//           <p className="text-sm font-semibold">
//             Admin Panel
//           </p>

//           <p className="hidden text-xs text-muted-foreground sm:block">
//             Manage your platform
//           </p>

//         </div>

//       </div>

//       {/* =========================
//           RIGHT
//       ========================= */}

//       <div className="ml-auto flex items-center gap-3">

//         {/* =========================
//             NOTIFICATIONS
//         ========================= */}

//         <Link
//           href="/admin/notifications"
//           className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
//           aria-label="Notifications"
//         >

//           <Bell className="h-5 w-5" />

//           {/* UNREAD BADGE */}

//           <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />

//         </Link>

//         {/* =========================
//             ADMIN
//         ========================= */}

//         <div className="hidden rounded-full bg-muted px-3 py-1.5 text-xs font-medium sm:block">
//           Administrator
//         </div>

//       </div>

//     </header>
//   );
// }




// v3
// "use client";

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

// export default function AdminHeader({
//   onMenuClick,
// }) {
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
//   // NOTIFICATION REDUX
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
//   // BELL
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
//       if (!notification.isRead) {
//         await markNotificationAsReadApi(
//           notification._id
//         );

//         dispatch(
//           markNotificationAsRead(
//             notification._id
//           )
//         );
//       }

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

//   // =========================
//   // LATEST 5
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
//           Admin Dashboard
//         </h1>

//       </div>

//       {/* =========================
//           RIGHT SIDE
//       ========================= */}

//       <div className="flex items-center gap-2">

//         {/* =========================
//             NOTIFICATIONS
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
//             aria-label="Notifications"
//           >

//             <Bell className="h-5 w-5" />

//             {/* UNREAD COUNT */}

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

//               {/* HEADER */}

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

//               {/* LIST */}

//               <div className="max-h-[400px] overflow-y-auto">

//                 {loadingNotifications ? (

//                   <div className="flex h-32 items-center justify-center">

//                     <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />

//                   </div>

//                 ) : latestNotifications.length ===
//                   0 ? (

//                   <div className="flex h-32 flex-col items-center justify-center gap-2 text-muted-foreground">

//                     <Bell className="h-7 w-7 opacity-40" />

//                     <p className="text-sm">
//                       No notifications
//                     </p>

//                   </div>

//                 ) : (

//                   latestNotifications.map(
//                     (notification) => (

//                       <button
//                         key={
//                           notification._id
//                         }
//                         type="button"
//                         onClick={() =>
//                           handleNotificationClick(
//                             notification
//                           )
//                         }
//                         className={`block w-full border-b px-4 py-3 text-left transition-colors hover:bg-muted ${!notification.isRead
//                             ? "bg-primary/[0.03]"
//                             : ""
//                           }`}
//                       >

//                         <div className="flex gap-3">

//                           {/* ICON */}

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

//                           {/* CONTENT */}

//                           <div className="min-w-0 flex-1">

//                             <div className="flex items-start justify-between gap-2">

//                               <p
//                                 className={`truncate text-sm ${!notification.isRead
//                                     ? "font-semibold"
//                                     : "font-medium"
//                                   }`}
//                               >
//                                 {
//                                   notification.title
//                                 }
//                               </p>

//                               {/* UNREAD DOT */}

//                               {!notification.isRead && (
//                                 <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
//                               )}

//                             </div>

//                             <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
//                               {
//                                 notification.message
//                               }
//                             </p>

//                             <p className="mt-1 text-[10px] text-muted-foreground">
//                               {formatDate(
//                                 notification.createdAt
//                               )}
//                             </p>

//                           </div>

//                         </div>

//                       </button>

//                     )
//                   )

//                 )}

//               </div>

//               {/* FOOTER */}

//               <div className="border-t p-2">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowNotifications(false)
//                   }
//                   className="flex w-full items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-muted"
//                 >
//                   View all notifications
//                 </button>

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
//             ADMIN AVATAR
//         ========================= */}

//         <Avatar className="h-9 w-9">

//           <AvatarFallback>
//             {user?.userName
//               ?.charAt(0)
//               .toUpperCase() || "A"}
//           </AvatarFallback>

//         </Avatar>

//       </div>

//     </header>
//   );
// }




// v4

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
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import {
  markNotificationAsRead,
} from "@/redux/slices/notificationSlice";

import {
  markNotificationAsRead as markNotificationAsReadApi,
} from "@/lib/notificationApi";

export default function AdminHeader({
  onMenuClick,
}) {
  const dispatch = useDispatch();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const notificationRef = useRef(null);

  // =========================
  // AUTH ADMIN
  // =========================

  const user = useSelector(
    (state) => state.auth.user
  );

  // =========================
  // NOTIFICATION STATE
  // =========================

  const {
    notifications = [],
    unreadCount = 0,
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
  // ESC
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
  // BELL
  // =========================

  const handleBellClick = () => {
    setShowNotifications((prev) => !prev);
  };

  // =========================
  // MARK AS READ
  // =========================

  const handleNotificationClick = async (
    notification
  ) => {
    try {
      if (!notification.isRead) {
        await markNotificationAsReadApi(
          notification._id
        );

        dispatch(
          markNotificationAsRead(
            notification._id
          )
        );
      }

      setShowNotifications(false);
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
  // DATE
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
  // LATEST 5
  // =========================

  const latestNotifications =
    notifications.slice(0, 5);

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background/95 px-4 backdrop-blur sm:px-6">

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
          ADMIN TITLE
      ========================= */}

      <div className="flex items-center gap-2">

        <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-muted sm:flex">
          <ShieldCheck className="h-4 w-4" />
        </div>

        <div>
          <p className="text-sm font-semibold">
            Admin Panel
          </p>

          <p className="hidden text-xs text-muted-foreground sm:block">
            Manage your platform
          </p>
        </div>

      </div>

      {/* =========================
          RIGHT SIDE
      ========================= */}

      <div className="ml-auto flex items-center gap-2">

        {/* =========================
            NOTIFICATIONS
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

            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}

          </Button>

          {/* =========================
              DROPDOWN
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

              {/* LIST */}

              <div className="max-h-[400px] overflow-y-auto">

                {loadingNotifications ? (

                  <div className="flex h-32 items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>

                ) : latestNotifications.length === 0 ? (

                  <div className="flex h-32 flex-col items-center justify-center gap-2 text-muted-foreground">

                    <Bell className="h-7 w-7 opacity-40" />

                    <p className="text-sm">
                      No notifications
                    </p>

                  </div>

                ) : (

                  latestNotifications.map(
                    (notification) => (
                      <Link
                        key={notification._id}
                        href={`/admin/notifications/${notification._id}`}
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
                                {notification.title}
                              </p>

                              {!notification.isRead && (
                                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                              )}

                            </div>

                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                              {notification.message}
                            </p>

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
                  href="/admin/notifications"
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

        {/* SEPARATOR */}

        <Separator
          orientation="vertical"
          className="mx-2 h-6"
        />

        {/* ADMIN */}

        <div className="hidden text-right sm:block">

          <p className="text-sm font-medium">
            {user?.userName || "Administrator"}
          </p>

          <p className="text-xs text-muted-foreground">
            Admin
          </p>

        </div>

      </div>

    </header>
  );
}

