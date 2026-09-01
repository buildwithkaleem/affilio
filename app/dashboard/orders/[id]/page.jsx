"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Package,
  ShoppingBag,
  Wallet,
  Clock3,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

import api from "@/lib/api";

export default function OrderDetailPage() {
  const params = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/user/api/v1/getOrder/${params.id}`
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Failed to fetch order"
        );
      }

      setOrder(response.data.data.order);

    } catch (error) {
      console.error("Order detail error:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch order"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getOrder();
    }
  }, [params?.id]);

  const formatAmount = (amount) => {
    return `Rs. ${Number(amount || 0).toLocaleString()}`;
  };

  const getStatusIcon = (status) => {
    const normalizedStatus = status?.toLowerCase();

    if (
      normalizedStatus === "completed" ||
      normalizedStatus === "processing"
    ) {
      return <CheckCircle2 className="h-4 w-4" />;
    }

    return <Clock3 className="h-4 w-4" />;
  };

  const getStatusClass = (status) => {
    const normalizedStatus = status?.toLowerCase();

    if (normalizedStatus === "completed") {
      return "bg-green-100 text-green-700";
    }

    if (normalizedStatus === "processing") {
      return "bg-blue-100 text-blue-700";
    }

    if (
      normalizedStatus === "cancelled" ||
      normalizedStatus === "failed"
    ) {
      return "bg-red-100 text-red-700";
    }

    return "bg-muted text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-5 text-sm text-destructive">
          {error}
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">
          Order not found
        </p>
      </div>
    );
  }

  const status = order.order?.status || "Pending";

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/orders"
            className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div>
            <h1 className="text-2xl font-bold">
              Order #{order.order?.id || order._id}
            </h1>

            <p className="text-sm text-muted-foreground">
              Order details
            </p>
          </div>
        </div>

        <div
          className={`flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm ${getStatusClass(
            status
          )}`}
        >
          {getStatusIcon(status)}

          <span className="capitalize">
            {status}
          </span>
        </div>

      </div>

      {/* Summary */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Order Total
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {formatAmount(order.total)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Affiliate Commission
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {formatAmount(
                order.affiliateCommission
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Products
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-2xl font-bold">
              {order.products?.length || 0}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Order Information */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />

            <CardTitle>
              Order Information
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <div>
              <p className="text-sm text-muted-foreground">
                Order ID
              </p>

              <p className="mt-1 font-medium">
                {order.order?.id || order._id}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Status
              </p>

              <p className="mt-1 font-medium capitalize">
                {status}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Total
              </p>

              <p className="mt-1 font-medium">
                {formatAmount(order.total)}
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Products */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5" />

            <CardTitle>
              Products
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>

          {!order.products?.length ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              No products found
            </div>
          ) : (
            <div className="space-y-3">

              {order.products.map(
                (product, index) => (
                  <div
                    key={
                      product._id ||
                      product.id ||
                      index
                    }
                    className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Package className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-medium">
                          {product.name ||
                            product.productName ||
                            "Product"}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Quantity:{" "}
                          {product.quantity || 1}
                        </p>
                      </div>

                    </div>

                    <div className="text-left sm:text-right">

                      <p className="font-semibold">
                        {formatAmount(
                          product.price
                        )}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </CardContent>
      </Card>

      {/* Commission */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />

            <CardTitle>
              Commission
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>

          <div className="flex items-center justify-between">

            <span className="text-muted-foreground">
              Affiliate Commission
            </span>

            <span className="text-lg font-bold">
              {formatAmount(
                order.affiliateCommission
              )}
            </span>

          </div>

        </CardContent>
      </Card>

    </div>
  );
}