"use client";

import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { logoutUser } from "@/lib/authApi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";

import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  ArrowDownToLine,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    title: "Withdrawals",
    href: "/admin/withdrawals",
    icon: ArrowDownToLine,
  },
];

export default function AdminSidebar({
  open,
  onClose,
}) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const isActive = (href) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };


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
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r bg-background
          transition-transform duration-300
          lg:translate-x-0
          ${open
            ? "translate-x-0"
            : "-translate-x-full"
          }
        `}
      >

        {/* =========================
            LOGO
        ========================= */}

        <div className="flex h-16 items-center justify-between border-b px-5">

          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-2"
          >

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">

              <ShieldCheck className="h-5 w-5" />

            </div>

            <div>
              <p className="font-bold">
                Admin Panel
              </p>

              <p className="text-xs text-muted-foreground">
                Management
              </p>
            </div>

          </Link>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 hover:bg-muted lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* =========================
            NAVIGATION
        ========================= */}

        <nav className="flex-1 space-y-1 p-3">

          {menuItems.map(
            (item) => {

              const active =
                isActive(item.href);

              const Icon =
                item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="relative block"
                >

                  {active && (
                    <motion.div
                      layoutId="admin-active-menu"
                      className="absolute inset-0 rounded-lg bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <div
                    className={`
                      relative z-10
                      flex items-center gap-3
                      rounded-lg px-3 py-2.5
                      text-sm font-medium
                      transition-colors
                      ${active
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }
                    `}
                  >

                    <Icon className="h-5 w-5 shrink-0" />

                    <span>
                      {item.title}
                    </span>

                  </div>

                </Link>
              );
            }
          )}

        </nav>

        {/* =========================
            BOTTOM
        ========================= */}

        <div className="border-t p-3">

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>
    </>
  );
}