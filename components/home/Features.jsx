"use client";

import { BarChart3, Link2, Wallet, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShoppingBag,
    title: "Find Products",
    description:
      "Browse affiliate products and choose products that match your audience.",
  },
  {
    icon: Link2,
    title: "Share Affiliate Links",
    description:
      "Generate and share your affiliate product links with your audience.",
  },
  {
    icon: BarChart3,
    title: "Track Orders",
    description:
      "Monitor your clicks, orders and commissions from your dashboard.",
  },
  {
    icon: Wallet,
    title: "Withdraw Earnings",
    description:
      "Manage your balance and request withdrawals whenever you are ready.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary">
            FEATURES
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to grow
          </h2>

          <p className="mt-4 text-muted-foreground">
            Manage your affiliate business from one simple dashboard.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="text-primary" size={24} />
                </div>

                <h3 className="text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}