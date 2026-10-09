
"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  SearchX,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-12">
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-3xl" />

        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-primary/[0.04] blur-3xl" />

        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-primary/[0.05] blur-3xl" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 w-full max-w-2xl text-center">

        {/* Logo / Brand */}

        <motion.div
          initial={{
            opacity: 0,
            y: -12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          className="mb-10 flex justify-center"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Affilio
            </span>
          </Link>
        </motion.div>

        {/* 404 Visual */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.08,
          }}
          className="relative mx-auto mb-8 flex h-52 w-52 items-center justify-center sm:h-64 sm:w-64"
        >
          {/* Outer rings */}

          <div className="absolute inset-0 rounded-full border border-primary/10" />

          <div className="absolute inset-5 rounded-full border border-primary/10" />

          <div className="absolute inset-10 rounded-full border border-primary/10" />

          {/* Glow */}

          <div className="absolute inset-14 rounded-full bg-primary/10 blur-2xl" />

          {/* Main circle */}

          <motion.div
            animate={{
              y: [0, -7, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border bg-background shadow-xl shadow-primary/10 sm:h-40 sm:w-40"
          >
            <SearchX className="mb-1 h-7 w-7 text-primary sm:h-8 sm:w-8" />

            <span className="text-5xl font-black tracking-tighter text-primary sm:text-6xl">
              404
            </span>
          </motion.div>

          {/* Floating dot */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
          >
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/30" />
          </motion.div>
        </motion.div>

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.18,
          }}
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Page not found
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            This page doesn&apos;t exist
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            The page you&apos;re looking for may have been moved,
            deleted, or the link might be incorrect.
          </p>
        </motion.div>

        {/* Actions */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.28,
          }}
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            className="h-11 rounded-xl px-6 shadow-sm"
          >
            <Link href="/dashboard">
              {/* <Home className="mr-2 h-4 w-4" /> */}
              <ArrowLeft className="ml-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-11 rounded-xl px-6"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>

        {/* Bottom hint */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.4,
          }}
          className="mt-10 text-xs text-muted-foreground"
        >
          If you believe this is an error, please check the URL
          and try again.
        </motion.p>
      </div>
    </main>
  );
}
