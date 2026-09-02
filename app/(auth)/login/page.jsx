"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "@/redux/slices/authSlice";

import { loginUser } from "@/lib/authApi";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.login || !form.password) {
      dispatch(loginFailure("All fields are required."));
      return;
    }

    try {
      dispatch(loginStart());

      const response = await loginUser({
        login: form.login,
        password: form.password,
      });

      console.log("LOGIN RESPONSE:", response);

      dispatch(loginSuccess(response.data));

      // router.push("/dashboard");

      if (user?.role?.toLowerCase() === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }

    } catch (error) {
      dispatch(
        loginFailure(
          error.response?.data?.message ||
          "Login failed."
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
              <LogIn
                className="text-primary"
                size={24}
              />
            </div>

            <h1 className="text-2xl font-bold">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Login to your Affilio account
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
                htmlFor="login"
                className="text-sm font-medium"
              >
                Email or Username
              </label>

              <input
                id="login"
                name="login"
                value={form.login}
                onChange={handleChange}
                placeholder="Email or username"
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
                  placeholder="Enter your password"
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

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full"
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>

          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}

            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Create account
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}