"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.15),transparent_45%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm">
            <Sparkles size={16} />
            Grow your affiliate business
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Turn your audience into
            <span className="block text-primary">
              real earnings.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Affilio helps affiliates discover products, share links,
            track orders and manage their commissions from one simple
            platform.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Earning
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>

            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Login
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users size={18} />
              Affiliate Network
            </div>

            <div className="flex items-center gap-2">
              <BarChart3 size={18} />
              Track Earnings
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="rounded-3xl border bg-card p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Earnings
                </p>
                <h2 className="mt-1 text-3xl font-bold">
                  Rs. 84,250
                </h2>
              </div>

              <div className="rounded-xl bg-primary/10 p-3">
                <BarChart3 className="text-primary" />
              </div>
            </div>

            <div className="flex h-48 items-end gap-3">
              {[35, 50, 42, 65, 55, 75, 90].map((height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="flex-1 rounded-t-lg bg-primary/80"
                />
              ))}
            </div>

            <div className="mt-5 flex justify-between text-xs text-muted-foreground">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}