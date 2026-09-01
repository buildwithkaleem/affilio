"use client";

import { useEffect } from "react";
import { motion } from "motion/react";

import {
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Wallet,
  Loader2,
  Package,
  User,
  Percent,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useAdminOrders } from "@/hooks/admin/useAdminOrders";

export default function AdminOrdersPage() {
  // =========================
  // HOOK
  // =========================

  const {
    orders = [],
    loading,
    error,
    releasingId,
    fetchOrders,
    releaseAffiliateCommission,
  } = useAdminOrders();

  // =========================
  // FETCH ORDERS
  // =========================

  useEffect(() => {
    fetchOrders().catch(() => { });
  }, [fetchOrders]);

  // =========================
  // RELEASE COMMISSION
  // =========================

  const handleReleaseCommission = async (
    orderId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to release this affiliate commission?"
    );

    if (!confirmed) return;

    try {
      await releaseAffiliateCommission(
        orderId
      );
    } catch (error) {
      console.error(
        "Release commission error:",
        error
      );
    }
  };

  // =========================
  // STATS
  // =========================

  const totalOrders = orders.length;

  const pendingCommissions =
    orders.filter(
      (order) =>
        !order.commissionReleased &&
        Number(order.affiliateCommission || 0) > 0
    ).length;

  const releasedCommissions =
    orders.filter(
      (order) =>
        order.commissionReleased
    ).length;

  const totalCommission =
    orders.reduce(
      (total, order) =>
        total +
        Number(
          order.affiliateCommission || 0
        ),
      0
    );

  // =========================
  // FORMAT AMOUNT
  // =========================

  const formatAmount = (amount) => {
    return `Rs. ${Number(
      amount || 0
    ).toLocaleString()}`;
  };

  // =========================
  // ORDER STATUS
  // =========================

  const getOrderStatusConfig = (
    status
  ) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          label: "Completed",
          className:
            "bg-green-500/10 text-green-600",
          icon: CheckCircle2,
        };

      case "processing":
        return {
          label: "Processing",
          className:
            "bg-blue-500/10 text-blue-600",
          icon: Clock3,
        };

      case "cancelled":
      case "canceled":
        return {
          label: "Cancelled",
          className:
            "bg-destructive/10 text-destructive",
          icon: Clock3,
        };

      case "failed":
        return {
          label: "Failed",
          className:
            "bg-destructive/10 text-destructive",
          icon: Clock3,
        };

      case "pending":
        return {
          label: "Pending",
          className:
            "bg-yellow-500/10 text-yellow-600",
          icon: Clock3,
        };

      default:
        return {
          label:
            status || "Unknown",
          className:
            "bg-muted text-muted-foreground",
          icon: Clock3,
        };
    }
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="space-y-6">

      {/* =========================
          HEADER
      ========================= */}

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
          Orders
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage orders and release affiliate commissions.
        </p>
      </motion.div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {error}
        </motion.div>
      )}

      {/* =========================
          STATS
      ========================= */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
        />

        <StatCard
          title="Pending Commission"
          value={pendingCommissions}
          icon={Clock3}
        />

        <StatCard
          title="Released Commission"
          value={releasedCommissions}
          icon={CheckCircle2}
        />

        <StatCard
          title="Total Commission"
          value={formatAmount(
            totalCommission
          )}
          icon={Wallet}
        />

      </div>

      {/* =========================
          ORDERS
      ========================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
      >
        <Card>

          <CardHeader>
            <div className="flex items-center gap-2">

              <ShoppingBag className="h-5 w-5" />

              <CardTitle>
                All Orders
              </CardTitle>

            </div>
          </CardHeader>

          <CardContent>

            {/* =========================
                LOADING
            ========================= */}

            {loading ? (
              <div className="flex min-h-48 items-center justify-center">

                <Loader2 className="h-6 w-6 animate-spin" />

              </div>

            ) : orders.length === 0 ? (

              /* =========================
                 EMPTY
              ========================= */

              <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-muted-foreground">

                <ShoppingBag className="h-10 w-10 opacity-40" />

                <p className="text-sm">
                  No orders found.
                </p>

              </div>

            ) : (

              /* =========================
                 TABLE
              ========================= */

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1100px]">

                  <thead>

                    <tr className="border-b">

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Order
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Affiliate
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Products
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Total
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Commission
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Status
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Date
                      </th>

                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                        Commission
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {orders.map(
                      (order, index) => {

                        const isReleasing =
                          releasingId ===
                          order._id;

                        const status =
                          getOrderStatusConfig(
                            order.order?.status
                          );

                        const StatusIcon =
                          status.icon;

                        return (
                          <motion.tr
                            key={order._id}
                            initial={{
                              opacity: 0,
                              y: 5,
                            }}
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              delay:
                                index * 0.03,
                            }}
                            className="border-b last:border-0"
                          >

                            {/* ORDER */}

                            <td className="px-4 py-4">

                              <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">

                                  <ShoppingBag className="h-5 w-5" />

                                </div>

                                <div>

                                  <p className="font-semibold">
                                    #
                                    {order.order?.id ||
                                      "N/A"}
                                  </p>

                                  <p className="max-w-[150px] truncate text-xs text-muted-foreground">
                                    ID:{" "}
                                    {order._id}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* AFFILIATE */}

                            <td className="px-4 py-4">

                              <div className="flex items-center gap-2">

                                <User className="h-4 w-4 text-muted-foreground" />

                                <span className="text-sm font-medium">
                                  {order.affiliate_ref ||
                                    "Unknown Affiliate"}
                                </span>

                              </div>

                            </td>

                            {/* PRODUCTS */}

                            <td className="px-4 py-4">

                              <div className="space-y-2">

                                {order.products?.length ? (

                                  order.products.map(
                                    (product) => (

                                      <div
                                        key={`${product.id}-${product.qty}`}
                                        className="flex items-center gap-2"
                                      >

                                        {product.image ? (
                                          <img
                                            src={
                                              product.image
                                            }
                                            alt={
                                              product.name ||
                                              "Product"
                                            }
                                            className="h-9 w-9 rounded-md border object-contain"
                                          />
                                        ) : (
                                          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">

                                            <Package className="h-4 w-4 text-muted-foreground" />

                                          </div>
                                        )}

                                        <div className="min-w-0">

                                          <p className="max-w-[220px] truncate text-sm font-medium">
                                            {product.name}
                                          </p>

                                          <p className="text-xs text-muted-foreground">
                                            Qty:{" "}
                                            {product.qty}
                                          </p>

                                        </div>

                                      </div>

                                    )
                                  )

                                ) : (

                                  <span className="text-sm text-muted-foreground">
                                    No products
                                  </span>

                                )}

                              </div>

                            </td>

                            {/* TOTAL */}

                            <td className="px-4 py-4">

                              <span className="font-semibold">
                                {formatAmount(
                                  order.total
                                )}
                              </span>

                            </td>

                            {/* COMMISSION */}

                            <td className="px-4 py-4">

                              <div className="flex items-center gap-2">

                                <Percent className="h-4 w-4 text-muted-foreground" />

                                <span className="font-semibold">
                                  {formatAmount(
                                    order.affiliateCommission
                                  )}
                                </span>

                              </div>

                            </td>

                            {/* ORDER STATUS */}

                            <td className="px-4 py-4">

                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                              >

                                <StatusIcon className="h-3.5 w-3.5" />

                                {status.label}

                              </span>

                            </td>

                            {/* DATE */}

                            <td className="px-4 py-4">

                              <span className="text-sm text-muted-foreground">

                                {order.order?.created_at
                                  ? new Date(
                                    order.order.created_at
                                  ).toLocaleDateString()
                                  : "N/A"}

                              </span>

                            </td>

                            {/* COMMISSION ACTION */}

                            <td className="px-4 py-4 text-right">

                              {order.commissionReleased ? (

                                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">

                                  <CheckCircle2 className="h-3.5 w-3.5" />

                                  Released

                                </span>

                              ) : (

                                <Button
                                  type="button"
                                  size="sm"
                                  disabled={
                                    isReleasing
                                  }
                                  onClick={() =>
                                    handleReleaseCommission(
                                      order._id
                                    )
                                  }
                                >

                                  {isReleasing ? (
                                    <>
                                      <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />

                                      Releasing...
                                    </>
                                  ) : (
                                    <>
                                      <Wallet className="mr-1.5 h-4 w-4" />

                                      Release
                                    </>
                                  )}

                                </Button>

                              )}

                            </td>

                          </motion.tr>
                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </CardContent>

        </Card>

      </motion.div>

    </div>
  );
}


/* =============================
   STAT CARD
============================= */

function StatCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -3,
      }}
    >

      <Card>

        <CardContent className="flex items-center justify-between p-6">

          <div>

            <p className="text-sm text-muted-foreground">
              {title}
            </p>

            <p className="mt-1 text-2xl font-bold">
              {value}
            </p>

          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

            <Icon className="h-5 w-5" />

          </div>

        </CardContent>

      </Card>

    </motion.div>
  );
}