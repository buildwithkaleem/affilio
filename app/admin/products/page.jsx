"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Package,
  Plus,
  Loader2,
  ExternalLink,
  Percent,
  ShoppingBag,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useAdminProducts } from "@/hooks/admin/useAdminProducts";

export default function AdminProductsPage() {
  const {
    products = [],
    loading,
    adding,
    error,
    addProduct,
  } = useAdminProducts();

  const [productUrl, setProductUrl] = useState("");
  const [persent, setPersent] = useState("");

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productUrl.trim()) {
      return;
    }

    if (
      persent === "" ||
      Number(persent) < 0
    ) {
      return;
    }

    try {
      await addProduct(
        productUrl.trim(),
        Number(persent)
      );

      // Success ke baad form clear
      setProductUrl("");
      setPersent("");

    } catch (error) {
      console.error(
        "Add affiliate product error:",
        error
      );
    }
  };

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
          Affiliate Products
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage products available for affiliate marketing.
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
          ADD PRODUCT
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
              <Plus className="h-5 w-5" />

              <CardTitle>
                Add Affiliate Product
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>

            <form
              onSubmit={handleAddProduct}
              className="space-y-4"
            >

              {/* PRODUCT URL */}

              <div className="space-y-2">

                <label
                  htmlFor="productUrl"
                  className="text-sm font-medium"
                >
                  Product URL
                </label>

                <Input
                  id="productUrl"
                  type="url"
                  placeholder="https://pure.egrif.online/product/..."
                  value={productUrl}
                  onChange={(e) =>
                    setProductUrl(
                      e.target.value
                    )
                  }
                  disabled={adding}
                  required
                />

              </div>

              {/* COMMISSION */}

              <div className="space-y-2">

                <label
                  htmlFor="persent"
                  className="text-sm font-medium"
                >
                  Affiliate Commission (%)
                </label>

                <div className="relative">

                  <Percent className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    id="persent"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="10"
                    value={persent}
                    onChange={(e) =>
                      setPersent(
                        e.target.value
                      )
                    }
                    disabled={adding}
                    className="pl-9"
                    required
                  />

                </div>

              </div>

              {/* BUTTON */}

              <Button
                type="submit"
                disabled={
                  adding ||
                  !productUrl.trim() ||
                  persent === ""
                }
              >
                {adding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                    Adding Product...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />

                    Add Product
                  </>
                )}
              </Button>

            </form>

          </CardContent>
        </Card>
      </motion.div>

      {/* =========================
          PRODUCTS
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

              <Package className="h-5 w-5" />

              <CardTitle>
                All Affiliate Products
              </CardTitle>

            </div>

          </CardHeader>

          <CardContent>

            {/* LOADING */}

            {loading ? (
              <div className="flex min-h-48 items-center justify-center">

                <Loader2 className="h-6 w-6 animate-spin" />

              </div>
            ) : products.length === 0 ? (

              /* EMPTY */

              <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-muted-foreground">

                <Package className="h-10 w-10 opacity-40" />

                <p className="text-sm">
                  No affiliate products found.
                </p>

              </div>
            ) : (

              /* PRODUCTS */

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {products.map(
                  (product, index) => (

                    <motion.div
                      key={
                        product._id ||
                        product.productId
                      }
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.04,
                      }}
                      className="overflow-hidden rounded-xl border bg-card"
                    >

                      {/* IMAGE */}

                      <div className="flex h-52 items-center justify-center bg-muted">

                        {product.productImage ? (
                          <img
                            src={
                              product.productImage
                            }
                            alt={
                              product.productTitle ||
                              "Product"
                            }
                            className="h-full w-full object-contain p-4"
                          />
                        ) : (
                          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="space-y-4 p-4">

                        {/* TITLE */}

                        <div>

                          <h3 className="line-clamp-2 font-semibold">
                            {
                              product.productTitle
                            }
                          </h3>

                        </div>

                        {/* PRICE */}

                        <div className="flex items-center gap-3">

                          {product.salePrice == 0 ? (
                            <>
                              <span className="font-bold">
                                Rs.{" "}
                                {Number(
                                  product.salePrice
                                ).toLocaleString()}
                              </span>

                              {product.regularPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  Rs.{" "}
                                  {Number(
                                    product.regularPrice
                                  ).toLocaleString()}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="font-bold">
                              Rs.{" "}
                              {Number(
                                product.regularPrice ||
                                0
                              ).toLocaleString()}
                            </span>
                          )}

                        </div>

                        {/* COMMISSION INFO */}

                        <div className="rounded-lg bg-muted p-3">

                          <div className="flex items-center justify-between text-sm">

                            <span className="text-muted-foreground">
                              Commission
                            </span>

                            <span className="font-semibold">
                              Rs.{" "}
                              {Number(
                                product.affiliateCommission ||
                                0
                              ).toLocaleString()}
                            </span>

                          </div>

                          <div className="mt-1 flex items-center justify-between text-sm">

                            <span className="text-muted-foreground">
                              Percentage
                            </span>

                            <span className="font-medium">
                              {
                                product.persent
                              }
                              %
                            </span>

                          </div>

                        </div>

                        {/* PRODUCT LINK */}

                        {product.productUrl && (
                          <a
                            href={
                              product.productUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                          >
                            View Product

                            <ExternalLink className="h-4 w-4" />

                          </a>
                        )}

                      </div>

                    </motion.div>

                  )
                )}

              </div>

            )}

          </CardContent>

        </Card>
      </motion.div>

    </div>
  );
}