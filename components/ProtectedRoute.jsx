// "use client";

// import { useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useSelector } from "react-redux";

// export default function ProtectedRoute({
//   children,
//   adminOnly = false,
// }) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const {
//     user,
//     isAuthenticated,
//     initialized,
//   } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // Auth check complete hone ka wait
//     if (!initialized) return;

//     // User logged in nahi hai
//     if (!isAuthenticated || !user) {
//       router.replace(
//         `/login?redirect=${encodeURIComponent(
//           pathname
//         )}`
//       );

//       return;
//     }

//     // Admin route ke liye role check
//     if (
//       adminOnly &&
//       user.role?.toLowerCase() !== "admin"
//     ) {
//       router.replace("/dashboard");
//     }
//   }, [
//     initialized,
//     isAuthenticated,
//     user,
//     adminOnly,
//     pathname,
//     router,
//   ]);

//   // Auth initialize hone tak kuch render na karo
//   if (!initialized) {
//     return (
//       <div className="flex min-h-screen items-center justify-center">
//         <div className="text-sm text-muted-foreground">
//           Checking authentication...
//         </div>
//       </div>
//     );
//   }

//   // Unauthorized user ko page briefly render na ho
//   if (!isAuthenticated || !user) {
//     return null;
//   }

//   // Admin page par non-admin ko render na karo
//   if (
//     adminOnly &&
//     user.role?.toLowerCase() !== "admin"
//   ) {
//     return null;
//   }

//   return children;
// }




// v2
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
  adminOnly = false,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    user,
    isAuthenticated,
    initialized,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    // Auth initialization complete hone ka wait
    if (!initialized) return;

    // User login nahi hai
    if (!isAuthenticated || !user) {
      router.replace(
        `/login?redirect=${encodeURIComponent(pathname)}`
      );
      return;
    }

    const role = user.role?.toLowerCase();

    // ==========================================
    // ADMIN-ONLY ROUTE
    // ==========================================

    if (adminOnly) {
      // Affiliate/user admin page access kare
      if (role !== "admin") {
        router.replace("/dashboard");
      }

      return;
    }

    // ==========================================
    // NORMAL DASHBOARD
    // ==========================================

    // Admin normal user dashboard access kare
    if (role === "admin" && pathname === "/dashboard") {
      router.replace("/admin");
      return;
    }
  }, [
    initialized,
    isAuthenticated,
    user,
    adminOnly,
    pathname,
    router,
  ]);

  // ==========================================
  // AUTH CHECKING
  // ==========================================

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Checking authentication...
        </div>
      </div>
    );
  }

  // ==========================================
  // NOT AUTHENTICATED
  // ==========================================

  if (!isAuthenticated || !user) {
    return null;
  }

  const role = user.role?.toLowerCase();

  // ==========================================
  // ADMIN-ONLY PAGE
  // ==========================================

  if (adminOnly && role !== "admin") {
    return null;
  }

  // ==========================================
  // ADMIN ON NORMAL DASHBOARD
  // ==========================================

  if (!adminOnly && role === "admin" && pathname === "/dashboard") {
    return null;
  }

  return children;
}