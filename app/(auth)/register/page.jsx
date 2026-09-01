"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  registerStart,
  registerSuccess,
  registerFailure,
} from "@/redux/slices/authSlice";

import { registerUser } from "@/lib/authApi";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.userName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      dispatch(registerFailure("All fields are required."));
      return;
    }

    if (form.password !== form.confirmPassword) {
      dispatch(registerFailure("Passwords do not match."));
      return;
    }

    try {
      dispatch(registerStart());

      const response = await registerUser({
        userName: form.userName,
        email: form.email,
        password: form.password,
      });

      dispatch(registerSuccess(response.data));

      router.push("/login");
    } catch (error) {
      dispatch(
        registerFailure(
          error.response?.data?.message ||
          "Registration failed."
        )
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="rounded-2xl border bg-background p-6 shadow-sm sm:p-8">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <UserPlus
                className="text-primary"
                size={24}
              />
            </div>

            <h1 className="text-2xl font-bold">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Start earning with Affilio
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div className="space-y-2">
              <label
                htmlFor="userName"
                className="text-sm font-medium"
              >
                Username
              </label>

              <input
                id="userName"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Enter username"
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="h-11 w-full rounded-lg border bg-background px-3 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="h-11 w-full rounded-lg border bg-background px-3 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full"
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </Button>

          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}

            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}