"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import {
  Copy,
  ExternalLink,
  Package,
  ShoppingBag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  productsRequest,
  productsSuccess,
  productsFailure,
} from "@/redux/slices/productSlice";

import { getAllProducts } from "@/lib/productApi";

export default function ProductsPage() {
  const dispatch = useDispatch();

  const {
    products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(productsRequest());

        const response = await getAllProducts();

        dispatch(
          productsSuccess(response.data.products)
        );
      } catch (error) {
        dispatch(
          productsFailure(
            error.response?.data?.message ||
            "Failed to fetch products"
          )
        );
      }
    };

    fetchProducts();
  }, [dispatch]);

  const copyAffiliateLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Products
            </h1>

            <p className="mt-1 text-muted-foreground">
              Browse products and get your affiliate links.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Error */}

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Loading */}

      {loading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index}>
              <div className="aspect-square animate-pulse bg-muted" />

              <CardContent className="space-y-3 p-5">
                <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty */}

      {!loading && products.length === 0 && !error && (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border">
          <Package className="mb-3 h-10 w-10 text-muted-foreground" />

          <h2 className="font-semibold">
            No products found
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            There are currently no affiliate products.
          </p>
        </div>
      )}

      {/* Products */}

      {!loading && products.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">

                {/* Image */}

                <div className="relative aspect-square overflow-hidden bg-muted">

                  {product.productImage ? (
                    <img
                      src={product.productImage}
                      alt={product.productTitle}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}

                  {/* Commission */}

                  <div className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold shadow backdrop-blur">
                    {product.persent}% commission
                  </div>

                </div>

                {/* Content */}

                <CardContent className="space-y-4 p-5">

                  <div>
                    <h2 className="line-clamp-2 min-h-12 font-semibold">
                      {product.productTitle}
                    </h2>
                  </div>

                  {/* Price */}

                  <div className="flex items-center gap-2">

                    {product.salePrice == 0 && (
                      <span className="text-lg font-bold">
                        Rs.{" "}
                        {Number(
                          product.salePrice
                        ).toLocaleString()}
                      </span>
                    )}

                    {product.regularPrice &&
                      product.salePrice !==
                      product.regularPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          Rs.{" "}
                          {Number(
                            product.regularPrice
                          ).toLocaleString()}
                        </span>
                      )}

                  </div>

                  {/* Commission amount */}

                  <div className="rounded-lg bg-muted/60 p-3">

                    <p className="text-xs text-muted-foreground">
                      Affiliate Commission
                    </p>

                    <p className="mt-1 font-semibold">
                      Rs.{" "}
                      {Number(
                        product.affiliateCommission || 0
                      ).toLocaleString()}
                    </p>

                  </div>

                </CardContent>

                {/* Footer */}

                <CardFooter className="gap-2 p-5 pt-0">

                  <Button
                    className="flex-1"
                    onClick={() =>
                      copyAffiliateLink(
                        product.affiliateUrl
                      )
                    }
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>

                </CardFooter>

              </Card>
            </motion.div>
          ))}

        </div>
      )}

    </div>
  );
}