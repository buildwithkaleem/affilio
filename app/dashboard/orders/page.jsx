"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";

import {
  ShoppingBag,
  Clock3,
  CheckCircle2,
  XCircle,
  Loader2,
  Search,
  Package,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ordersRequest,
  ordersSuccess,
  ordersFailure,
} from "@/redux/slices/orderSlice";

import { getOrders } from "@/lib/orderApi";
import Link from "next/link";

export default function OrdersPage() {
  const dispatch = useDispatch();

  const {
    orders,
    loading,
    error,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch(ordersRequest());

        const response = await getOrders();

        dispatch(
          ordersSuccess(
            response?.data?.orders ||
            response?.data ||
            []
          )
        );
      } catch (error) {
        dispatch(
          ordersFailure(
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch orders"
          )
        );
      }
    };

    fetchOrders();
  }, [dispatch]);

  const stats = useMemo(() => {
    const total = orders.length;

    const pending = orders.filter((order) => {
      const status = order.order?.status?.toLowerCase();

      return (
        status === "pending" ||
        status === "processing"
      );
    }).length;

    const completed = orders.filter((order) => {
      const status = order.order?.status?.toLowerCase();

      return (
        status === "completed" ||
        status === "complete"
      );
    }).length;

    return {
      total,
      pending,
      completed,
    };
  }, [orders]);

  const formatAmount = (amount) => {
    return `Rs. ${Number(amount || 0).toLocaleString()}`;
  };

  const getStatus = (status) => {
    const value = status?.toLowerCase();

    if (
      value === "completed" ||
      value === "complete"
    ) {
      return {
        label: "Completed",
        icon: CheckCircle2,
        className:
          "bg-green-500/10 text-green-600",
      };
    }

    if (
      value === "cancelled" ||
      value === "canceled" ||
      value === "rejected"
    ) {
      return {
        label: status,
        icon: XCircle,
        className:
          "bg-destructive/10 text-destructive",
      };
    }

    if (
      value === "processing"
    ) {
      return {
        label: "Processing",
        icon: Loader2,
        className:
          "bg-blue-500/10 text-blue-600",
      };
    }

    return {
      label: status || "Pending",
      icon: Clock3,
      className:
        "bg-yellow-500/10 text-yellow-600",
    };
  };

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
          Orders
        </h1>

        <p className="mt-2 text-muted-foreground">
          Track your affiliate orders and commissions.
        </p>
      </motion.div>

      {/* Stats */}

      <div className="grid gap-4 sm:grid-cols-3">

        <StatCard
          title="Total Orders"
          value={stats.total}
          icon={ShoppingBag}
        />

        <StatCard
          title="Pending Orders"
          value={stats.pending}
          icon={Clock3}
        />

        <StatCard
          title="Completed Orders"
          value={stats.completed}
          icon={CheckCircle2}
        />

      </div>

      {/* Error */}

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Orders */}

      <Card>

        <CardHeader>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />

            <CardTitle>
              All Orders
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>

          {loading ? (
            <div className="flex min-h-48 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : orders.length === 0 ? (

            <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-muted-foreground">

              <ShoppingBag className="h-10 w-10 opacity-40" />

              <p>
                No orders found
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {orders.map((order, index) => {

                const status = getStatus(
                  order.order?.status
                );

                const StatusIcon = status.icon;

                return (

                  <Link
                    href={`/dashboard/orders/${order._id}`}
                    className="block"
                  >

                    <motion.div
                      key={order._id}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      className="rounded-xl border p-4 transition-shadow hover:shadow-sm"
                    >

                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        {/* Order info */}

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">

                            <ShoppingBag className="h-5 w-5" />

                          </div>

                          <div>

                            <p className="font-semibold">
                              Order #
                              {order.order?.id || "N/A"}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              {order.products?.length || 0} product(s)
                            </p>

                          </div>

                        </div>

                        {/* Amount */}

                        <div className="lg:text-right">

                          <p className="font-semibold">
                            {formatAmount(order.total)}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Commission:{" "}
                            <span className="font-medium text-foreground">
                              {formatAmount(
                                order.affiliateCommission
                              )}
                            </span>
                          </p>

                        </div>

                        {/* Status */}

                        <div
                          className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}
                        >

                          <StatusIcon className="h-4 w-4" />

                          {status.label}

                        </div>

                      </div>

                    </motion.div>

                  </Link>
                );
              })}

            </div>

          )}

        </CardContent>

      </Card>

    </div>
  );
}


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