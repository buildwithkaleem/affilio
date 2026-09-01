"use client";

import { useEffect } from "react";
import { motion } from "motion/react";

import {
  ArrowDownToLine,
  CheckCircle2,
  Clock3,
  XCircle,
  Loader2,
  User,
  Mail,
  Wallet,
  CreditCard,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useAdminWithdrawals } from "@/hooks/admin/useAdminWithdrawals";

export default function AdminWithdrawalsPage() {
  // =========================
  // HOOK
  // =========================

  const {
    withdrawals = [],
    loading,
    error,
    processingId,
    fetchWithdrawals,
    processWithdrawal,
  } = useAdminWithdrawals();

  // =========================
  // FETCH WITHDRAWALS
  // =========================

  useEffect(() => {
    fetchWithdrawals().catch(() => { });
  }, [fetchWithdrawals]);

  // =========================
  // APPROVE / REJECT
  // =========================

  const handleStatusChange = async (
    withdrawalId,
    status
  ) => {
    const action =
      status === "approved"
        ? "approve"
        : "reject";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} this withdrawal?`
    );

    if (!confirmed) return;

    try {
      await processWithdrawal(
        withdrawalId,
        status
      );
    } catch (error) {
      console.error(
        "Withdrawal status error:",
        error
      );
    }
  };

  // =========================
  // STATS
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

  const rejectedWithdrawals =
    withdrawals.filter(
      (withdrawal) =>
        withdrawal.status === "rejected"
    ).length;

  // =========================
  // AMOUNT
  // =========================

  const formatAmount = (amount) => {
    return `Rs. ${Number(
      amount || 0
    ).toLocaleString()}`;
  };

  // =========================
  // STATUS
  // =========================

  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return {
          label: "Approved",
          className:
            "bg-green-500/10 text-green-600",
          icon: CheckCircle2,
        };

      case "rejected":
        return {
          label: "Rejected",
          className:
            "bg-destructive/10 text-destructive",
          icon: XCircle,
        };

      default:
        return {
          label: "Pending",
          className:
            "bg-yellow-500/10 text-yellow-600",
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
          Withdrawals
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage and process affiliate withdrawal requests.
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
          title="Total"
          value={totalWithdrawals}
          icon={ArrowDownToLine}
        />

        <StatCard
          title="Pending"
          value={pendingWithdrawals}
          icon={Clock3}
        />

        <StatCard
          title="Approved"
          value={approvedWithdrawals}
          icon={CheckCircle2}
        />

        <StatCard
          title="Rejected"
          value={rejectedWithdrawals}
          icon={XCircle}
        />

      </div>

      {/* =========================
          WITHDRAWALS
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

              <ArrowDownToLine className="h-5 w-5" />

              <CardTitle>
                All Withdrawal Requests
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
            ) : withdrawals.length === 0 ? (

              /* =========================
                 EMPTY
              ========================= */

              <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-muted-foreground">

                <ArrowDownToLine className="h-10 w-10 opacity-40" />

                <p className="text-sm">
                  No withdrawal requests found.
                </p>

              </div>

            ) : (

              /* =========================
                 TABLE
              ========================= */

              <div className="overflow-x-auto">

                <table className="w-full min-w-[1000px]">

                  <thead>
                    <tr className="border-b">

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        User
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Amount
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Payment Method
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Status
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                        Date
                      </th>

                      <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {withdrawals.map(
                      (withdrawal, index) => {

                        const isProcessing =
                          processingId ===
                          withdrawal._id;

                        const status =
                          getStatusConfig(
                            withdrawal.status
                          );

                        const StatusIcon =
                          status.icon;

                        const user =
                          withdrawal.user;

                        const paymentMethod =
                          withdrawal.paymentMethod;

                        return (
                          <motion.tr
                            key={
                              withdrawal._id
                            }
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

                            {/* USER */}

                            <td className="px-4 py-4">

                              <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">

                                  <User className="h-5 w-5" />

                                </div>

                                <div>

                                  <p className="font-medium">
                                    {user?.userName ||
                                      "Unknown User"}
                                  </p>

                                  <p className="flex items-center gap-1 text-xs text-muted-foreground">

                                    <Mail className="h-3 w-3" />

                                    {user?.email ||
                                      "No email"}

                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* AMOUNT */}

                            <td className="px-4 py-4">

                              <div className="flex items-center gap-2">

                                <Wallet className="h-4 w-4 text-muted-foreground" />

                                <span className="font-semibold">
                                  {formatAmount(
                                    withdrawal.amount
                                  )}
                                </span>

                              </div>

                            </td>

                            {/* PAYMENT METHOD */}

                            <td className="px-4 py-4">

                              {paymentMethod ? (
                                <div className="space-y-1">

                                  <div className="flex items-center gap-2">

                                    <CreditCard className="h-4 w-4 text-muted-foreground" />

                                    <span className="text-sm font-medium">
                                      {paymentMethod.method ||
                                        paymentMethod.type ||
                                        "Payment Method"}
                                    </span>

                                  </div>

                                  {paymentMethod.accountNumber && (
                                    <p className="text-xs text-muted-foreground">
                                      {
                                        paymentMethod.accountNumber
                                      }
                                    </p>
                                  )}

                                  {paymentMethod.accountTitle && (
                                    <p className="text-xs text-muted-foreground">
                                      {
                                        paymentMethod.accountTitle
                                      }
                                    </p>
                                  )}

                                </div>
                              ) : (
                                <span className="text-sm text-muted-foreground">
                                  Not available
                                </span>
                              )}

                            </td>

                            {/* STATUS */}

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
                                {withdrawal.createdAt
                                  ? new Date(
                                    withdrawal.createdAt
                                  ).toLocaleDateString()
                                  : "N/A"}
                              </span>

                            </td>

                            {/* ACTION */}

                            <td className="px-4 py-4 text-right">

                              {withdrawal.status ===
                                "pending" ? (

                                <div className="flex justify-end gap-2">

                                  <Button
                                    type="button"
                                    size="sm"
                                    disabled={
                                      isProcessing
                                    }
                                    onClick={() =>
                                      handleStatusChange(
                                        withdrawal._id,
                                        "approved"
                                      )
                                    }
                                  >

                                    {isProcessing ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <>
                                        <CheckCircle2 className="mr-1.5 h-4 w-4" />
                                        Approve
                                      </>
                                    )}

                                  </Button>

                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="destructive"
                                    disabled={
                                      isProcessing
                                    }
                                    onClick={() =>
                                      handleStatusChange(
                                        withdrawal._id,
                                        "rejected"
                                      )
                                    }
                                  >

                                    {isProcessing ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <>
                                        <XCircle className="mr-1.5 h-4 w-4" />
                                        Reject
                                      </>
                                    )}

                                  </Button>

                                </div>

                              ) : (

                                <span className="text-xs text-muted-foreground">
                                  No action
                                </span>

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