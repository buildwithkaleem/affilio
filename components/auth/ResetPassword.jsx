// "use client";

// import { useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { api } from "@/lib/api";
// import toast from "react-hot-toast";
// import { DotsLoader } from "../loaders/DotsLoader";
// import Link from "next/link";
// import { IoChevronBack } from "react-icons/io5";

// export default function ResetPassword() {
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const token = searchParams.get("token"); // 🔑 URL se token

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!newPassword) {
//       return toast.error("Password is required ❌");
//     }

//     if (newPassword.length < 6) {
//       return toast.error("New Password must be at least 6 characters");
//     }

//     try {
//       setLoading(true);

//       const res = await api(`/user/reset-password/${token}`, "POST", {
//         newPassword,
//       });

//       if (res.success) {
//         toast.success("Password updated successfully ✅");

//         setTimeout(() => {
//           router.push("/login"); // 🔁 redirect to login
//         }, 1500);
//       } else {
//         toast.error(res.message || "Invalid or expired token ❌");
//       }

//     } catch (error) {
//       console.log(error.message);
//       toast.error("Server error ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center px-4 mt-10">
      
//       <div className="w-full max-w-md bg-white dark:bg-black/40 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800">

//         <Link href={"/login"} className="w-10 h-10 rounded-2xl bg-green-600 text-white flex items-center justify-center " ><IoChevronBack size={25} /></Link>

//         <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4 text-center">
//           🔐 Set New Password
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* 🔑 Password */}
//           <input
//             type="password"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
//           />

//           {/* 🚀 Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold active:scale-95 transition flex items-center justify-center gap-2"
//           >
//             {loading ? <> Updating <DotsLoader color2="#80d175" /> </> : "Update Password"}
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }















"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { resetPassword } from "@/lib/authApi";

export default function ResetPassword() {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  console.log(token)

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      // API call here
      await resetPassword({
        token,
        password,
      });

      setMessage(
        "Your password has been reset successfully."
      );

      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {!message && (
         <div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
              />
            </div>
         </div>
          )}

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {message && (
            <p className="text-sm text-green-600">
              {message}
            </p>
          )}

          {!message && (
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          )}

          {message && (
            <Link
              href="/login"
              className="block w-full rounded-lg bg-black px-4 py-2 text-center text-white"
            >
              Go to Login
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}