// "use client";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// import {
//   setAccessToken,
//   setAuthUser,
//   logout,
//   authInitialized,
// } from "@/redux/slices/authSlice";

// import { refreshAccessToken } from "@/lib/authApi";

// export default function AuthInitializer({ children }) {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const response = await refreshAccessToken();

//         console.log("REFRESH RESPONSE:", response);

//         const result = response.data;

//         if (result?.data?.accessToken) {
//           dispatch(
//             setAccessToken(result.data.accessToken)
//           );
//         }

//         if (result?.data?.user) {
//           dispatch(
//             setAuthUser(result.data.user)
//           );
//         }

//       } catch (error) {
//         console.log(
//           "Refresh failed:",
//           error.response?.data || error.message
//         );

//         dispatch(logout());
//       } finally {
//         dispatch(authInitialized());
//       }
//     };

//     initializeAuth();
//   }, [dispatch]);

//   return children;
// }




// v2
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setAccessToken,
  setAuthUser,
  logout,
  authInitialized,
} from "@/redux/slices/authSlice";

import { refreshAccessToken } from "@/lib/authApi";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const response =
          await refreshAccessToken();

        console.log(
          "REFRESH RESPONSE:",
          response
        );

        const result = response;

        if (!mounted) return;

        if (result?.data?.accessToken) {
          dispatch(
            setAccessToken(
              result.data.accessToken
            )
          );
        }

        if (result?.data?.user) {
          dispatch(
            setAuthUser(
              result.data.user
            )
          );
        }

      } catch (error) {
        console.log(
          "Initial auth refresh failed:",
          error.response?.data ||
          error.message
        );

        if (mounted) {
          dispatch(logout());
        }

      } finally {
        if (mounted) {
          dispatch(authInitialized());
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return children;
}