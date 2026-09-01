// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   ShoppingBag,
//   Package,
//   CreditCard,
//   Wallet,
//   Bell,
//   User,
//   Settings,
//   LogOut,
//   X,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { useEffect, useState } from "react";
// import api from "@/lib/api";

// const menuItems = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Products",
//     href: "/dashboard/products",
//     icon: Package,
//   },
//   {
//     title: "Orders",
//     href: "/dashboard/orders",
//     icon: ShoppingBag,
//   },
//   {
//     title: "Payment Method",
//     href: "/dashboard/payment-method",
//     icon: CreditCard,
//   },
//   {
//     title: "Withdrawals",
//     href: "/dashboard/withdrawals",
//     icon: Wallet,
//   },
//   {
//     title: "Notifications",
//     href: "/dashboard/notifications",
//     icon: Bell,
//   },
//   {
//     title: "Profile",
//     href: "/dashboard/profile",
//     icon: User,
//   },
// ];

// export default function Sidebar({ open, onClose }) {
//   const pathname = usePathname();

//   const [unreadCount, setUnreadCount] = useState(0);

//   useEffect(() => {
//     const getUnreadCount = async () => {
//       try {
//         const response = await api.get(
//           "/api/v1/notification/unreadCount"
//         );

//         setUnreadCount(
//           response.data?.data?.count || 0
//         );
//       } catch (error) {
//         console.error(
//           "Failed to fetch unread count:",
//           error
//         );
//       }
//     };

//     getUnreadCount();

//     const interval = setInterval(
//       getUnreadCount,
//       30000
//     );

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       {/* Mobile overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 z-40 bg-black/50 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-300 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
//           }`}
//       >
//         {/* Logo */}
//         <div className="flex h-16 items-center justify-between px-5">
//           <Link
//             href="/dashboard"
//             className="text-2xl font-bold tracking-tight"
//           >
//             Affilio
//           </Link>

//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={onClose}
//           >
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         <Separator />

//         {/* Navigation */}
//         <nav className="flex-1 space-y-1 p-4">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const active = pathname === item.href;

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={onClose}
//                 className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-muted hover:text-foreground"
//                   }`}
//               >
//                 <Icon className="h-5 w-5" />
//                 {item.title}
//               </Link>
//             );
//           })}
//         </nav>

//         <Separator />

//         {/* Bottom */}
//         <div className="space-y-1 p-4">
//           <Link
//             href="/dashboard/settings"
//             className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
//           >
//             <Settings className="h-5 w-5" />
//             Settings
//           </Link>

//           <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
//             <LogOut className="h-5 w-5" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }




// v2

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   ShoppingBag,
//   Package,
//   CreditCard,
//   Wallet,
//   Bell,
//   User,
//   Settings,
//   LogOut,
//   X,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { useEffect, useState } from "react";
// import api from "@/lib/api";

// const menuItems = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     title: "Products",
//     href: "/dashboard/products",
//     icon: Package,
//   },
//   {
//     title: "Orders",
//     href: "/dashboard/orders",
//     icon: ShoppingBag,
//   },
//   {
//     title: "Payment Method",
//     href: "/dashboard/payment-method",
//     icon: CreditCard,
//   },
//   {
//     title: "Withdrawals",
//     href: "/dashboard/withdrawals",
//     icon: Wallet,
//   },
//   {
//     title: "Notifications",
//     href: "/dashboard/notifications",
//     icon: Bell,
//   },
//   {
//     title: "Profile",
//     href: "/dashboard/profile",
//     icon: User,
//   },
// ];

// export default function Sidebar({ open, onClose }) {
//   const pathname = usePathname();

//   const [unreadCount, setUnreadCount] = useState(0);

//   const getUnreadCount = async () => {
//     try {
//       const response = await api.get(
//         "/api/v1/notification/unreadCount"
//       );

//       setUnreadCount(response.data?.data?.count || 0);
//     } catch (error) {
//       console.error(
//         "Failed to fetch unread notification count:",
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
//     <>
//       {/* Mobile overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 z-40 bg-black/50 lg:hidden"
//           onClick={onClose}
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-300 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"
//           }`}
//       >
//         {/* Logo */}
//         <div className="flex h-16 items-center justify-between px-5">
//           <Link
//             href="/dashboard"
//             className="text-2xl font-bold tracking-tight"
//           >
//             Affilio
//           </Link>

//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden"
//             onClick={onClose}
//           >
//             <X className="h-5 w-5" />
//           </Button>
//         </div>

//         <Separator />

//         {/* Navigation */}
//         <nav className="flex-1 space-y-1 p-4">
//           {menuItems.map((item) => {
//             const Icon = item.icon;
//             const active = pathname === item.href;

//             const isNotification =
//               item.href === "/dashboard/notifications";

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={onClose}
//                 className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active
//                     ? "bg-primary text-primary-foreground"
//                     : "text-muted-foreground hover:bg-muted hover:text-foreground"
//                   }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <Icon className="h-5 w-5" />

//                   {item.title}
//                 </div>

//                 {/* Notification badge */}
//                 {isNotification && unreadCount > 0 && (
//                   <span
//                     className={`flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${active
//                         ? "bg-primary-foreground text-primary"
//                         : "bg-destructive text-destructive-foreground"
//                       }`}
//                   >
//                     {unreadCount > 99
//                       ? "99+"
//                       : unreadCount}
//                   </span>
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         <Separator />

//         {/* Bottom */}
//         <div className="space-y-1 p-4">
//           <Link
//             href="/dashboard/settings"
//             className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
//           >
//             <Settings className="h-5 w-5" />
//             Settings
//           </Link>

//           <button
//             className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
//           >
//             <LogOut className="h-5 w-5" />
//             Logout
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }





// v3
"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
import { logoutUser } from "@/lib/authApi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  CreditCard,
  Wallet,
  Bell,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import api from "@/lib/api";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingBag,
  },
  {
    title: "Payment Method",
    href: "/dashboard/payment-method",
    icon: CreditCard,
  },
  {
    title: "Withdrawals",
    href: "/dashboard/withdrawals",
    icon: Wallet,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const [unreadCount, setUnreadCount] = useState(0);


  // logout
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response?.data || error.message
      );
    } finally {
      // Frontend session clear
      dispatch(logout());

      // Login page
      router.replace("/login");
    }
  };

  // =========================
  // UNREAD COUNT
  // =========================

  const getUnreadCount = async () => {
    try {
      const response = await api.get(
        "/api/v1/notification/unreadCount"
      );

      setUnreadCount(
        response.data?.data?.count || 0
      );
    } catch (error) {
      console.error(
        "Failed to fetch unread notification count:",
        error
      );
    }
  };

  // =========================
  // INITIAL + AUTO REFRESH
  // =========================

  useEffect(() => {
    getUnreadCount();

    const interval = setInterval(
      getUnreadCount,
      30000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* =========================
          MOBILE OVERLAY
      ========================= */}

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64 flex-col
          border-r bg-background
          transition-transform duration-300

          ${open
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:sticky
          lg:top-0
          lg:h-screen
          lg:translate-x-0
        `}
      >

        {/* =========================
            LOGO
        ========================= */}

        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <Link
            href="/dashboard"
            className="text-2xl font-bold tracking-tight"
          >
            Affilio
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Separator />

        {/* =========================
            NAVIGATION
        ========================= */}

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            const isNotification =
              item.href ===
              "/dashboard/notifications";

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center justify-between
                  rounded-lg px-3 py-2.5
                  text-sm font-medium
                  transition-colors

                  ${active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                `}
              >

                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />

                  {item.title}
                </div>

                {/* Notification badge */}

                {isNotification &&
                  unreadCount > 0 && (
                    <span
                      className={`
                        flex min-w-5
                        items-center justify-center
                        rounded-full
                        px-1.5 py-0.5
                        text-[11px]
                        font-semibold

                        ${active
                          ? "bg-primary-foreground text-primary"
                          : "bg-destructive text-destructive-foreground"
                        }
                      `}
                    >
                      {unreadCount > 99
                        ? "99+"
                        : unreadCount}
                    </span>
                  )}
              </Link>
            );
          })}

        </nav>

        <Separator />

        {/* =========================
            BOTTOM
        ========================= */}

        <div className="shrink-0 space-y-1 p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>

          {/* <Link
            href="/dashboard/settings"
            onClick={onClose}
            className="
              flex items-center gap-3
              rounded-lg px-3 py-2.5
              text-sm font-medium
              text-muted-foreground
              hover:bg-muted
              hover:text-foreground
            "
          >
            <Settings className="h-5 w-5" />

            Settings
          </Link> */}

        </div>

      </aside>
    </>
  );
}