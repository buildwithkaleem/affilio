"use client";

import { useEffect, useState } from "react";
import { User, Lock, Mail, Save } from "lucide-react";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getMe, updateUser } from "@/lib/userApi";

import {
  loginSuccess,
  setUser,
} from "@/redux/slices/authSlice";

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
          throw new Error(
            "User data not found"
          );
        }

        setForm((prev) => ({
          ...prev,
          userName: user.userName || "",
          email: user.email || "",
        }));

        // Redux user update
        dispatch(setUser(user));
        // dispatch(
        //   loginSuccess({
        //     user,
        //     accessToken: undefined,
        //   })
        // );

      } catch (error) {
        console.error(
          "Failed to fetch profile:",
          error
        );

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
  };

  // =========================
  // UPDATE USER
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (form.newPassword && !form.oldPassword) {
      setError(
        "Old password is required."
      );
      return;
    }

    if (
      form.newPassword &&
      form.newPassword.length < 6
    ) {
      setError(
        "New password must be at least 6 characters."
      );
      return;
    }

    try {
      setSaving(true);

      const response = await updateUser({
        userName: form.userName,
        email: form.email,
        oldPassword: form.oldPassword,
        ...(form.newPassword && {
          newPassword: form.newPassword,
        }),
      });

      const updatedUser =
        response?.data?.user;

      if (updatedUser) {
        setForm((prev) => ({
          ...prev,
          userName:
            updatedUser.userName ||
            prev.userName,
          email:
            updatedUser.email ||
            prev.email,
          oldPassword: "",
          newPassword: "",
        }));

        dispatch(setUser(updatedUser));
        // dispatch({
        //   type: "auth/loginSuccess",
        //   payload: {
        //     user: updatedUser,
        //     accessToken: undefined,
        //   },
        // });
      }

      setSuccess(
        response?.message ||
        "Profile updated successfully"
      );

    } catch (error) {
      console.error(
        "Profile update failed:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: -10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Profile
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your account information.
        </p>
      </motion.div>

      {/* Messages */}

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600">
          {success}
        </div>
      )}

      {/* Profile Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <Card>

          <CardHeader>
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>

              <div>
                <CardTitle>
                  Account Information
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                  Update your profile details.
                </p>
              </div>

            </div>
          </CardHeader>

          <CardContent>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Username */}

              <div className="space-y-2">

                <label className="text-sm font-medium">
                  Username
                </label>

                <div className="relative">

                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    name="userName"
                    value={form.userName}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Username"
                  />

                </div>

              </div>

              {/* Email */}

              <div className="space-y-2">

                <label className="text-sm font-medium">
                  Email
                </label>

                <div className="relative">

                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Email"
                  />

                </div>

              </div>

              <div className="border-t pt-6">

                <div className="mb-5">

                  <h3 className="font-semibold">
                    Change Password
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Leave new password empty if you don't
                    want to change it.
                  </p>

                </div>

                {/* Old Password */}

                <div className="space-y-2">

                  <label className="text-sm font-medium">
                    Current Password
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      type="password"
                      name="oldPassword"
                      value={form.oldPassword}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Current password"
                    />

                  </div>

                </div>

                {/* New Password */}

                <div className="mt-4 space-y-2">

                  <label className="text-sm font-medium">
                    New Password
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <input
                      type="password"
                      name="newPassword"
                      value={form.newPassword}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="New password"
                    />

                  </div>

                </div>

              </div>

              {/* Submit */}

              <div className="flex justify-end">

                <Button
                  type="submit"
                  disabled={saving}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />

                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </Button>

              </div>

            </form>

          </CardContent>
        </Card>
      </motion.div>

    </div>
  );
}