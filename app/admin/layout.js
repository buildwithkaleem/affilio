

// import AdminInitializer from "@/components/AdminInitializer";

// export default function AdminLayout({
//   children,
// }) {
//   return (
//     <AdminInitializer>
//       {children}
//     </AdminInitializer>
//   );
// }


// v2

"use client";

import { useState } from "react";

import AdminInitializer from "@/components/AdminInitializer";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    // <ProtectedRoute adminOnly>
      <AdminInitializer>


        <div className="min-h-screen bg-muted/20">

          {/* =========================
            SIDEBAR
        ========================= */}

          <AdminSidebar
            open={sidebarOpen}
            onClose={() =>
              setSidebarOpen(false)
            }
          />

          {/* =========================
            MAIN
        ========================= */}

          <div className="lg:pl-64">

            {/* HEADER */}

            <AdminHeader
              onMenuClick={() =>
                setSidebarOpen(true)
              }
            />

            {/* CONTENT */}

            <main className="p-4 sm:p-6">

              {children}

            </main>

          </div>

        </div>
      </AdminInitializer>
    // </ProtectedRoute>
  );
}