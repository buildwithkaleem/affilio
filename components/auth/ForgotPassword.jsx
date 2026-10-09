// "use client";

// import { useState } from "react";
// // import { api } from "@/lib/api";
// // import toast from "react-hot-toast";
// import { DotsLoader } from "../loaders/DotsLoader";
// import { IoChevronBack } from "react-icons/io5";
// import Link from "next/link";
// import { forgotPassword } from "@/lib/authApi";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   // const handleSubmit = async (e) => {

//   //   e.preventDefault();

//   //   if (!email) {
//   //     // return toast.error("Email is required ❌");
//   //   }

//   //   try {
//   //     setLoading(true);

//   //     const res = await api("/user/forgot-password", "POST", { email });

//   //     if (res.success) {
//   //       // toast.success("Reset link sent to your email 📩");
//   //       setEmail("");
//   //     } else {
//   //       // toast.error(res.message || "Something went wrong ❌");
//   //     }

//   //   } catch (error) {
//   //     console.log(error.message);
//   //     // toast.error("Server error ❌");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//  const handleSubmit = async (e) => {
//     e.preventDefault();


//     try {
//       setLoading(true)
//       const response = await forgotPassword(email);

//       // console.log("LOGIN RESPONSE:", response);


//     } catch (error) {
//     console.log('forget passwor error')
//     } finally {
//         setLoading(false);
//       }
//   };

//   return (
//     <div className="flex justify-center items-center px-4 mt-10">
      
//       <div className="w-full max-w-md bg-white dark:bg-black/40 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-gray-800">

//         <Link href={"/login"} className="w-10 h-10 rounded-2xl bg-green-600 text-white flex items-center justify-center " ><IoChevronBack size={25} /></Link>

//         <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-4 text-center">
//           🔐 Forgot Password
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* 📧 Email Input */}
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
//           />

//           {/* 🚀 Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full cursor-pointer py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold active:scale-95 transition flex items-center justify-center gap-2"
//           >
//             {loading ? <> Sending <DotsLoader color2="#80d175" /> </> : "Send Reset Link"}
//           </button>

//         </form>

//       </div>
//     </div>
//   );
// }





"use client";

import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/lib/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      // API call here
     const res = await forgotPassword({email});
      console.log(res)
      setMessage(
        "If an account exists with this email, a password reset link has been sent."
      );
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
          <h1 className="text-2xl font-bold">Forgot Password?</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2"
            />
          </div>

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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}