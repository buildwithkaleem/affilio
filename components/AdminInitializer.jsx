
// "use client";

// import { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";

// import { useAdminUsers } from "@/hooks/admin/useAdminUsers";

// export default function AdminInitializer({
//   children,
// }) {
//   const { fetchUsers } = useAdminUsers();

//   const user = useSelector(
//     (state) => state.auth.user
//   );

//   const accessToken = useSelector(
//     (state) => state.auth.accessToken
//   );

//   const hasFetched = useRef(false);

//   useEffect(() => {
//     /*
//      * Admin user + access token available hone ke baad
//      * users ko sirf ek baar fetch karo.
//      */

//     if (
//       !user ||
//       user.role !== "admin" ||
//       !accessToken ||
//       hasFetched.current
//     ) {
//       return;
//     }

//     hasFetched.current = true;

//     fetchUsers().catch(() => {
//       /*
//        * Error already Redux mein store ho raha hai.
//        * Yahan extra handling ki zarurat nahi.
//        */
//     });
//   }, [
//     user,
//     accessToken,
//     fetchUsers,
//   ]);

//   return children;
// }




// v2
// "use client";

// import { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";

// import { useAdminUsers } from "@/hooks/admin/useAdminUsers";

// export default function AdminInitializer({
//   children,
// }) {
//   const { fetchUsers } = useAdminUsers();

//   const user = useSelector(
//     (state) => state.auth.user
//   );

//   const accessToken = useSelector(
//     (state) => state.auth.accessToken
//   );

//   /*
//    * Track kis admin ke liye users
//    * already fetch ho chuke hain.
//    */
//   const fetchedForUser = useRef(null);

//   useEffect(() => {
//     /*
//      * Admin authenticated nahi hai
//      */
//     if (
//       !user ||
//       user.role !== "admin" ||
//       !accessToken
//     ) {
//       return;
//     }

//     /*
//      * User ID
//      *
//      * Agar auth user mein _id hai to _id use hoga.
//      * Agar id hai to id use hoga.
//      */
//     const userId =
//       user._id || user.id;

//     if (!userId) {
//       return;
//     }

//     /*
//      * Isi admin ke liye already fetch ho chuka hai.
//      * Dobara API call nahi karni.
//      */
//     if (
//       fetchedForUser.current === userId
//     ) {
//       return;
//     }

//     /*
//      * Pehle mark kar rahe hain taake
//      * multiple renders mein duplicate request na ho.
//      */
//     fetchedForUser.current = userId;

//     fetchUsers().catch(() => {
//       /*
//        * API fail ho gayi to reset kar do
//        * taake next suitable render par retry ho sake.
//        */
//       fetchedForUser.current = null;
//     });
//   }, [
//     user,
//     accessToken,
//     fetchUsers,
//   ]);

//   return children;
// }






// v3
"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { useAdminProducts } from "@/hooks/admin/useAdminProducts";

export default function AdminInitializer({
  children,
}) {
  const { fetchUsers } = useAdminUsers();
  const { fetchProducts } = useAdminProducts();

  const user = useSelector(
    (state) => state.auth.user
  );

  const accessToken = useSelector(
    (state) => state.auth.accessToken
  );

  const hasFetched = useRef(false);

  useEffect(() => {
    /*
     * Sirf admin user + access token available
     * hone ke baad initial admin data fetch hoga.
     */

    if (
      !user ||
      user.role !== "admin" ||
      !accessToken ||
      hasFetched.current
    ) {
      return;
    }

    hasFetched.current = true;

    const initializeAdmin = async () => {
      /*
       * Dono GET requests parallel chalengi.
       * Is se unnecessary waiting nahi hogi.
       */

      await Promise.allSettled([
        fetchUsers(),
        fetchProducts(),
      ]);
    };

    initializeAdmin();
  }, [
    user,
    accessToken,
    fetchUsers,
    fetchProducts,
  ]);

  return children;
}