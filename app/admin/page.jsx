"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import {
  Users,
  Package,
  ShoppingBag,
  ArrowDownToLine,
  Clock3,
  CheckCircle2,
  Wallet,
  Coins,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAdminUsers } from "@/hooks/admin/useAdminUsers";
import { useAdminProducts } from "@/hooks/admin/useAdminProducts";
import { useAdminOrders } from "@/hooks/admin/useAdminOrders";
import { useAdminWithdrawals } from "@/hooks/admin/useAdminWithdrawals";

export default function AdminPage() {
  // =========================
  // USERS
  // =========================

  const {
    users = [],
    loading: usersLoading,
  } = useAdminUsers();

  // =========================
  // PRODUCTS
  // =========================

  const {
    products = [],
    loading: productsLoading,
  } = useAdminProducts();

  // =========================
  // ORDERS
  // =========================

  const {
    orders = [],
    loading: ordersLoading,
    fetchOrders,
  } = useAdminOrders();

  // =========================
  // WITHDRAWALS
  // =========================

  const {
    withdrawals = [],
    loading: withdrawalsLoading,
    fetchWithdrawals,
  } = useAdminWithdrawals();

  // =========================
  // FETCH ORDERS
  // =========================

  useEffect(() => {
    fetchOrders().catch(() => { });
  }, [fetchOrders]);

  // =========================
  // FETCH WITHDRAWALS
  // =========================

  useEffect(() => {
    fetchWithdrawals().catch(() => { });
  }, [fetchWithdrawals]);

  // =========================
  // LOADING
  // =========================

  const loading =
    usersLoading ||
    productsLoading ||
    ordersLoading ||
    withdrawalsLoading;

  // =========================
  // USER STATS
  // =========================

  const totalUsers = users.length;

  const adminUsers = users.filter(
    (user) => user.role === "admin"
  ).length;

  const normalUsers =
    totalUsers - adminUsers;

  // =========================
  // ORDER STATS
  // =========================

  const totalOrders = orders.length;

  const releasedOrders = orders.filter(
    (order) =>
      order.commissionReleased === true
  ).length;

  const pendingCommissionOrders =
    orders.filter(
      (order) =>
        !order.commissionReleased &&
        Number(
          order.affiliateCommission || 0
        ) > 0
    ).length;

  // =========================
  // COMMISSION
  // =========================

  const totalCommission =
    orders.reduce(
      (total, order) =>
        total +
        Number(
          order.affiliateCommission || 0
        ),
      0
    );

  const releasedCommission =
    orders
      .filter(
        (order) =>
          order.commissionReleased === true
      )
      .reduce(
        (total, order) =>
          total +
          Number(
            order.affiliateCommission || 0
          ),
        0
      );

  const pendingCommission =
    totalCommission -
    releasedCommission;

  // =========================
  // WITHDRAWAL STATS
  // =========================

  const totalWithdrawals =
    withdrawals.length;

  const pendingWithdrawals =
    withdrawals.filter(
      (withdrawal) =>
        withdrawal.status === "pending"
    ).length;

  const approvedWithdrawals =
    withdrawals.filter(
      (withdrawal) =>
        withdrawal.status === "approved"
    ).length;

  const totalWithdrawalAmount =
    withdrawals
      .filter(
        (withdrawal) =>
          withdrawal.status === "approved"
      )
      .reduce(
        (total, withdrawal) =>
          total +
          Number(
            withdrawal.amount || 0
          ),
        0
      );

  // =========================
  // RECENT ORDERS
  // =========================

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(
          b.createdAt ||
          b.order?.created_at ||
          0
        ) -
        new Date(
          a.createdAt ||
          a.order?.created_at ||
          0
        )
    )
    .slice(0, 5);

  // =========================
  // RECENT WITHDRAWALS
  // =========================

  const recentWithdrawals = [
    ...withdrawals,
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5);

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
          Dashboard
        </h1>

        <p className="mt-2 text-muted-foreground">
          Overview of your affiliate platform.
        </p>
      </motion.div>

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Updating dashboard...
        </div>
      )}

      {/* =========================
          MAIN STATS
      ========================= */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Users"
          value={totalUsers}
          description={`${normalUsers} normal users`}
          icon={Users}
        />

        <StatCard
          title="Products"
          value={products.length}
          description="Affiliate products"
          icon={Package}
        />

        <StatCard
          title="Orders"
          value={totalOrders}
          description={`${releasedOrders} commissions released`}
          icon={ShoppingBag}
        />

        <StatCard
          title="Pending Withdrawals"
          value={pendingWithdrawals}
          description={`${totalWithdrawals} total requests`}
          icon={ArrowDownToLine}
        />

      </div>

      {/* =========================
          FINANCIAL STATS
      ========================= */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Commission"
          value={`Rs. ${totalCommission.toLocaleString()}`}
          description="All order commissions"
          icon={Coins}
        />

        <StatCard
          title="Released Commission"
          value={`Rs. ${releasedCommission.toLocaleString()}`}
          description="Paid to affiliates"
          icon={CheckCircle2}
        />

        <StatCard
          title="Pending Commission"
          value={`Rs. ${pendingCommission.toLocaleString()}`}
          description={`${pendingCommissionOrders} orders pending`}
          icon={Clock3}
        />

        <StatCard
          title="Approved Withdrawals"
          value={`Rs. ${totalWithdrawalAmount.toLocaleString()}`}
          description={`${approvedWithdrawals} approved requests`}
          icon={Wallet}
        />

      </div>

      {/* =========================
          RECENT DATA
      ========================= */}

      <div className="grid gap-6 xl:grid-cols-2">

        {/* =========================
            RECENT ORDERS
        ========================= */}

        <Card>

          <CardHeader>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <ShoppingBag className="h-5 w-5" />

                <CardTitle>
                  Recent Orders
                </CardTitle>

              </div>

              <span className="text-sm text-muted-foreground">
                {totalOrders} total
              </span>

            </div>

          </CardHeader>

          <CardContent>

            {recentOrders.length === 0 ? (

              <EmptyState
                icon={ShoppingBag}
                text="No orders found."
              />

            ) : (

              <div className="space-y-3">

                {recentOrders.map(
                  (order) => {

                    const date =
                      order.createdAt ||
                      order.order?.created_at;

                    return (
                      <div
                        key={order._id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >

                        <div className="min-w-0">

                          <p className="font-medium">
                            Order #
                            {order.order?.id ||
                              "N/A"}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Ref:{" "}
                            {order.affiliate_ref ||
                              "N/A"}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="font-semibold">
                            Rs.{" "}
                            {Number(
                              order.total || 0
                            ).toLocaleString()}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {date
                              ? new Date(
                                date
                              ).toLocaleDateString()
                              : "N/A"}
                          </p>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </CardContent>

        </Card>

        {/* =========================
            RECENT WITHDRAWALS
        ========================= */}

        <Card>

          <CardHeader>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <ArrowDownToLine className="h-5 w-5" />

                <CardTitle>
                  Recent Withdrawals
                </CardTitle>

              </div>

              <span className="text-sm text-muted-foreground">
                {pendingWithdrawals} pending
              </span>

            </div>

          </CardHeader>

          <CardContent>

            {recentWithdrawals.length ===
              0 ? (

              <EmptyState
                icon={ArrowDownToLine}
                text="No withdrawal requests."
              />

            ) : (

              <div className="space-y-3">

                {recentWithdrawals.map(
                  (withdrawal) => {

                    return (
                      <div
                        key={
                          withdrawal._id
                        }
                        className="flex items-center justify-between rounded-lg border p-3"
                      >

                        <div className="min-w-0">

                          <p className="font-medium">
                            {withdrawal.user
                              ?.userName ||
                              "Unknown User"}
                          </p>

                          <p className="text-xs capitalize text-muted-foreground">
                            {withdrawal.status ||
                              "pending"}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="font-semibold">
                            Rs.{" "}
                            {Number(
                              withdrawal.amount ||
                              0
                            ).toLocaleString()}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {withdrawal.createdAt
                              ? new Date(
                                withdrawal.createdAt
                              ).toLocaleDateString()
                              : "N/A"}
                          </p>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            )}

          </CardContent>

        </Card>

      </div>

    </div>
  );
}

/* =============================
   STAT CARD
============================= */

function StatCard({
  title,
  value,
  description,
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

        <CardContent className="flex items-start justify-between p-6">

          <div className="min-w-0">

            <p className="text-sm text-muted-foreground">
              {title}
            </p>

            <p className="mt-1 truncate text-2xl font-bold">
              {value}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {description}
            </p>

          </div>

          <div className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">

            <Icon className="h-5 w-5" />

          </div>

        </CardContent>

      </Card>
    </motion.div>
  );
}

/* =============================
   EMPTY STATE
============================= */

function EmptyState({
  icon: Icon,
  text,
}) {
  return (
    <div className="flex min-h-32 flex-col items-center justify-center gap-2 text-muted-foreground">

      <Icon className="h-8 w-8 opacity-40" />

      <p className="text-sm">
        {text}
      </p>

    </div>
  );
}