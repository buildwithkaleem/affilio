"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // <ProtectedRoute>
      <div className="min-h-screen bg-muted/30">
        <div className="flex min-h-screen">
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <Navbar onMenuClick={() => setSidebarOpen(true)} />

            <main className="flex-1 p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    {/* </ProtectedRoute> */}
  );
}