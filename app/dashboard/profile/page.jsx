// "use client";

// import { useEffect, useState } from "react";
// import { User, Lock, Mail, Save } from "lucide-react";
// import { motion } from "motion/react";
// import { useDispatch } from "react-redux";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import { getMe, updateUser } from "@/lib/userApi";

// import {
//   loginSuccess,
//   setUser,
// } from "@/redux/slices/authSlice";

// export default function ProfilePage() {
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [form, setForm] = useState({
//     userName: "",
//     email: "",
//     oldPassword: "",
//     newPassword: "",
//   });

//   // =========================
//   // GET USER
//   // =========================

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await getMe();

//         const user = response?.data?.user;

//         if (!user) {
//           throw new Error(
//             "User data not found"
//           );
//         }

//         setForm((prev) => ({
//           ...prev,
//           userName: user.userName || "",
//           email: user.email || "",
//         }));

//         // Redux user update
//         dispatch(setUser(user));
//         // dispatch(
//         //   loginSuccess({
//         //     user,
//         //     accessToken: undefined,
//         //   })
//         // );

//       } catch (error) {
//         console.error(
//           "Failed to fetch profile:",
//           error
//         );

//         setError(
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to fetch profile"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [dispatch]);

//   // =========================
//   // INPUT CHANGE
//   // =========================

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // =========================
//   // UPDATE USER
//   // =========================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     if (form.newPassword && !form.oldPassword) {
//       setError(
//         "Old password is required."
//       );
//       return;
//     }

//     if (
//       form.newPassword &&
//       form.newPassword.length < 6
//     ) {
//       setError(
//         "New password must be at least 6 characters."
//       );
//       return;
//     }

//     try {
//       setSaving(true);

//       const response = await updateUser({
//         userName: form.userName,
//         email: form.email,
//         oldPassword: form.oldPassword,
//         ...(form.newPassword && {
//           newPassword: form.newPassword,
//         }),
//       });

//       const updatedUser =
//         response?.data?.user;

//       if (updatedUser) {
//         setForm((prev) => ({
//           ...prev,
//           userName:
//             updatedUser.userName ||
//             prev.userName,
//           email:
//             updatedUser.email ||
//             prev.email,
//           oldPassword: "",
//           newPassword: "",
//         }));

//         dispatch(setUser(updatedUser));
//         // dispatch({
//         //   type: "auth/loginSuccess",
//         //   payload: {
//         //     user: updatedUser,
//         //     accessToken: undefined,
//         //   },
//         // });
//       }

//       setSuccess(
//         response?.message ||
//         "Profile updated successfully"
//       );

//     } catch (error) {
//       console.error(
//         "Profile update failed:",
//         error
//       );

//       setError(
//         error.response?.data?.message ||
//         "Failed to update profile"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-64 items-center justify-center">
//         <p className="text-sm text-muted-foreground">
//           Loading profile...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">

//       {/* Header */}
//       <motion.div
//         initial={{
//           opacity: 0,
//           y: -10,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//       >
//         <h1 className="text-3xl font-bold tracking-tight">
//           Profile
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Manage your account information.
//         </p>
//       </motion.div>

//       {/* Messages */}

//       {error && (
//         <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
//           {error}
//         </div>
//       )}

//       {success && (
//         <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600">
//           {success}
//         </div>
//       )}

//       {/* Profile Card */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 20,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//       >
//         <Card>

//           <CardHeader>
//             <div className="flex items-center gap-3">

//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
//                 <User className="h-5 w-5 text-primary" />
//               </div>

//               <div>
//                 <CardTitle>
//                   Account Information
//                 </CardTitle>

//                 <p className="text-sm text-muted-foreground">
//                   Update your profile details.
//                 </p>
//               </div>

//             </div>
//           </CardHeader>

//           <CardContent>

//             <form
//               onSubmit={handleSubmit}
//               className="space-y-6"
//             >

//               {/* Username */}

//               <div className="space-y-2">

//                 <label className="text-sm font-medium">
//                   Username
//                 </label>

//                 <div className="relative">

//                   <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//                   <input
//                     name="userName"
//                     value={form.userName}
//                     onChange={handleChange}
//                     className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                     placeholder="Username"
//                   />

//                 </div>

//               </div>

//               {/* Email */}

//               <div className="space-y-2">

//                 <label className="text-sm font-medium">
//                   Email
//                 </label>

//                 <div className="relative">

//                   <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//                   <input
//                     type="email"
//                     name="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                     placeholder="Email"
//                   />

//                 </div>

//               </div>

//               <div className="border-t pt-6">

//                 <div className="mb-5">

//                   <h3 className="font-semibold">
//                     Change Password
//                   </h3>

//                   <p className="text-sm text-muted-foreground">
//                     Leave new password empty if you don't
//                     want to change it.
//                   </p>

//                 </div>

//                 {/* Old Password */}

//                 <div className="space-y-2">

//                   <label className="text-sm font-medium">
//                     Current Password
//                   </label>

//                   <div className="relative">

//                     <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//                     <input
//                       type="password"
//                       name="oldPassword"
//                       value={form.oldPassword}
//                       onChange={handleChange}
//                       className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                       placeholder="Current password"
//                     />

//                   </div>

//                 </div>

//                 {/* New Password */}

//                 <div className="mt-4 space-y-2">

//                   <label className="text-sm font-medium">
//                     New Password
//                   </label>

//                   <div className="relative">

//                     <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//                     <input
//                       type="password"
//                       name="newPassword"
//                       value={form.newPassword}
//                       onChange={handleChange}
//                       className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                       placeholder="New password"
//                     />

//                   </div>

//                 </div>

//               </div>

//               {/* Submit */}

//               <div className="flex justify-end">

//                 <Button
//                   type="submit"
//                   disabled={saving}
//                   className="gap-2"
//                 >
//                   <Save className="h-4 w-4" />

//                   {saving
//                     ? "Saving..."
//                     : "Save Changes"}
//                 </Button>

//               </div>

//             </form>

//           </CardContent>
//         </Card>
//       </motion.div>

//     </div>
//   );
// }







// v2
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import {
  User,
  Lock,
  Mail,
  Save,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CircleUserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { getMe, updateUser } from "@/lib/userApi";

import { setUser } from "@/redux/slices/authSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    userName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  // =========================
  // GET USER
  // =========================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMe();
        const user = response?.data?.user;

        if (!user) {
          throw new Error("User data not found");
        }

        setForm((prev) => ({
          ...prev,
          userName: user.userName || "",
          email: user.email || "",
        }));

        dispatch(setUser(user));
      } catch (error) {
        console.error("Failed to fetch profile:", error);

        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) setError("");
    if (success) setSuccess("");
  };

  // =========================
  // UPDATE USER
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const userName = form.userName.trim();
    const email = form.email.trim();
    const oldPassword = form.oldPassword;
    const newPassword = form.newPassword;

    if (!userName) {
      setError("Username is required.");
      return;
    }

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (newPassword && !oldPassword) {
      setError("Current password is required to set a new password.");
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    try {
      setSaving(true);

      const response = await updateUser({
        userName,
        email,
        oldPassword,
        ...(newPassword && {
          newPassword,
        }),
      });

      const updatedUser = response?.data?.user;

      if (updatedUser) {
        setForm((prev) => ({
          ...prev,
          userName: updatedUser.userName || prev.userName,
          email: updatedUser.email || prev.email,
          oldPassword: "",
          newPassword: "",
        }));

        dispatch(setUser(updatedUser));
      }

      setSuccess(
        response?.message || "Profile updated successfully."
      );
    } catch (error) {
      console.error("Profile update failed:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="h-8 w-40 animate-pulse rounded-lg bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="h-72 animate-pulse rounded-2xl bg-muted" />
          <div className="h-[500px] animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  const initials =
    form.userName?.slice(0, 2).toUpperCase() || "US";

  return (
    <div className="relative space-y-8 pb-10">
      {/* =========================
          PAGE HEADER
      ========================= */}

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/[0.12] via-background to-background p-6 sm:p-8"
      >
        <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <CircleUserRound className="h-3.5 w-3.5 text-primary" />
              Account Settings
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Profile
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Manage your personal information and keep your
              account details up to date.
            </p>
          </div>

          <div className="hidden h-20 w-20 items-center justify-center rounded-2xl border bg-background/70 shadow-sm backdrop-blur sm:flex">
            <User className="h-9 w-9 text-primary" />
          </div>
        </div>
      </motion.div>

      {/* =========================
          ALERTS
      ========================= */}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
            <AlertCircle className="h-4.5 w-4.5 text-destructive" />
          </div>

          <div>
            <p className="text-sm font-semibold text-destructive">
              Update failed
            </p>
            <p className="mt-0.5 text-sm text-destructive/80">
              {error}
            </p>
          </div>
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
            <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div>
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
              Changes saved
            </p>
            <p className="mt-0.5 text-sm text-emerald-700/80 dark:text-emerald-400/80">
              {success}
            </p>
          </div>
        </motion.div>
      )}

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* =========================
            PROFILE SUMMARY
        ========================= */}

        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="overflow-hidden rounded-3xl border shadow-sm">
            <CardContent className="p-0">
              <div className="relative overflow-hidden bg-gradient-to-br from-primary/[0.14] via-primary/[0.05] to-background px-6 pb-7 pt-8">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

                <div className="relative flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-2xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
                    {initials}
                  </div>

                  <h2 className="mt-5 max-w-full truncate px-2 text-xl font-bold">
                    {form.userName || "User"}
                  </h2>

                  <p className="mt-1 max-w-full truncate px-2 text-sm text-muted-foreground">
                    {form.email || "No email"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 p-5">
                <div className="flex items-center gap-3 rounded-2xl border bg-muted/30 p-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Account Security
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Keep your credentials secure
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border bg-muted/20 p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Profile
                  </p>

                  <div className="mt-3 space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">
                        Username
                      </span>
                      <span className="max-w-[140px] truncate font-medium">
                        {form.userName || "—"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-muted-foreground">
                        Email
                      </span>
                      <span className="max-w-[140px] truncate font-medium">
                        {form.email || "—"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* =========================
            SETTINGS FORM
        ========================= */}

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Card className="overflow-hidden rounded-3xl border shadow-sm">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit}>
                {/* ACCOUNT SECTION */}

                <div className="border-b p-6 sm:p-8">
                  <div className="mb-7 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        Account Information
                      </h2>

                      <p className="mt-1 text-sm leading-5 text-muted-foreground">
                        Update the basic information associated
                        with your account.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    {/* USERNAME */}

                    <div className="space-y-2">
                      <label
                        htmlFor="userName"
                        className="text-sm font-medium"
                      >
                        Username
                      </label>

                      <div className="group relative">
                        <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <input
                          id="userName"
                          name="userName"
                          value={form.userName}
                          onChange={handleChange}
                          autoComplete="username"
                          placeholder="Enter username"
                          className="h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
                        />
                      </div>

                      <p className="text-xs text-muted-foreground">
                        This name will identify you across the
                        platform.
                      </p>
                    </div>

                    {/* EMAIL */}

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium"
                      >
                        Email Address
                      </label>

                      <div className="group relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          autoComplete="email"
                          placeholder="Enter email address"
                          className="h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
                        />
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Use an email address you have access to.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SECURITY SECTION */}

                <div className="p-6 sm:p-8">
                  <div className="mb-7 flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10">
                      <KeyRound className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        Password & Security
                      </h2>

                      <p className="mt-1 text-sm leading-5 text-muted-foreground">
                        Change your password to keep your account
                        protected.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-muted/20 p-5 sm:p-6">
                    <div className="mb-5 flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Change Password
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      {/* CURRENT PASSWORD */}

                      <div className="space-y-2">
                        <label
                          htmlFor="oldPassword"
                          className="text-sm font-medium"
                        >
                          Current Password
                        </label>

                        <div className="group relative">
                          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                          <input
                            id="oldPassword"
                            type="password"
                            name="oldPassword"
                            value={form.oldPassword}
                            onChange={handleChange}
                            autoComplete="current-password"
                            placeholder="Enter current password"
                            className="h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                      </div>

                      {/* NEW PASSWORD */}

                      <div className="space-y-2">
                        <label
                          htmlFor="newPassword"
                          className="text-sm font-medium"
                        >
                          New Password
                        </label>

                        <div className="group relative">
                          <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />

                          <input
                            id="newPassword"
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            placeholder="Enter new password"
                            className="h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-500/15 bg-amber-500/5 p-3.5 text-xs leading-5 text-muted-foreground">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />

                      <span>
                        Leave both password fields empty if you
                        don't want to change your password. A new
                        password must contain at least 6 characters.
                      </span>
                    </div>
                  </div>
                </div>

                {/* FORM FOOTER */}

                <div className="flex flex-col gap-4 border-t bg-muted/20 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    Your account information is securely updated.
                  </div>

                  <Button
                    type="submit"
                    disabled={saving}
                    className="h-11 w-full gap-2 rounded-xl px-6 shadow-sm sm:w-auto"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

