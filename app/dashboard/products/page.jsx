// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "motion/react";
// import {
//   Copy,
//   CopyCheck,
//   ExternalLink,
//   Package,
//   ShoppingBag,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";

// import {
//   productsRequest,
//   productsSuccess,
//   productsFailure,
// } from "@/redux/slices/productSlice";

// import { getAllProducts } from "@/lib/productApi";

// export default function ProductsPage() {
//    const [copyLink, setCopyLink] = useState(false)
//   const dispatch = useDispatch();

//   const {
//     products,
//     loading,
//     error,
//   } = useSelector((state) => state.products);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         dispatch(productsRequest());

//         const response = await getAllProducts();

//         dispatch(
//           productsSuccess(response.data.products)
//         );
//       } catch (error) {
//         dispatch(
//           productsFailure(
//             error.response?.data?.message ||
//             "Failed to fetch products"
//           )
//         );
//       }
//     };

//     fetchProducts();
//   }, [dispatch]);

//   const copyAffiliateLink = async (url) => {
//     try {
//       await navigator.clipboard.writeText(url);
//       setCopyLink(true)
//       setTimeout(() => {
//         setCopyLink(false)
//       }, 3000);
//     } catch (error) {
//       console.error("Copy failed:", error);
//     }
//   };

//   return (
//     <div className="space-y-8">

//       {/* Header */}

//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
//             <ShoppingBag className="h-5 w-5 text-primary" />
//           </div>

//           <div>
//             <h1 className="text-3xl font-bold tracking-tight">
//               Products
//             </h1>

//             <p className="mt-1 text-muted-foreground">
//               Browse products and get your affiliate links.
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Error */}

//       {error && (
//         <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
//           {error}
//         </div>
//       )}

//       {/* Loading */}

//       {loading && (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {Array.from({ length: 8 }).map((_, index) => (
//             <Card key={index}>
//               <div className="aspect-square animate-pulse bg-muted" />

//               <CardContent className="space-y-3 p-5">
//                 <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
//                 <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
//                 <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Empty */}

//       {!loading && products.length === 0 && !error && (
//         <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border">
//           <Package className="mb-3 h-10 w-10 text-muted-foreground" />

//           <h2 className="font-semibold">
//             No products found
//           </h2>

//           <p className="mt-1 text-sm text-muted-foreground">
//             There are currently no affiliate products.
//           </p>
//         </div>
//       )}

//       {/* Products */}

//       {!loading && products.length > 0 && (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

//           {products.map((product, index) => (
//             <motion.div
//               key={product._id}
//               initial={{
//                 opacity: 0,
//                 y: 20,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               transition={{
//                 duration: 0.3,
//                 delay: index * 0.05,
//               }}
//               whileHover={{
//                 y: -5,
//               }}
//             >
//               <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">

//                 {/* Image */}

//                 <div className="relative aspect-square overflow-hidden bg-muted">

//                   {product.productImage ? (
//                     <img
//                       src={product.productImage}
//                       alt={product.productTitle}
//                       className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                   ) : (
//                     <div className="flex h-full items-center justify-center">
//                       <Package className="h-12 w-12 text-muted-foreground" />
//                     </div>
//                   )}

//                   {/* Commission */}

//                   <div className="absolute right-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold shadow backdrop-blur">
//                     {product.persent}% commission
//                   </div>

//                 </div>

//                 {/* Content */}

//                 <CardContent className="space-y-3 p-5">

//                   <div>
//                     <h2 className=" min-h-12 font-semibold">
//                       {product.productTitle}
//                     </h2>
//                   </div>

//                   {/* Price */}

//                   <div className="flex items-center gap-2">

//                     {/* {product.salePrice == 0 && (
//                       <span className="text-lg font-bold">
//                         Rs.{" "}
//                         {Number(
//                           product.salePrice
//                         ).toLocaleString()}
//                       </span>
//                     )}

//                     {product.regularPrice &&
//                       product.salePrice !==
//                       product.regularPrice && (
//                         <span className="text-sm text-muted-foreground line-through">
//                           Rs.{" "}
//                           {Number(
//                             product.regularPrice
//                           ).toLocaleString()}
//                         </span>
//                       )} */}

//                     {product.salePrice != 0 ? (
//                       <>
//                         <span className="font-bold">
//                           Rs.{" "}
//                           {Number(
//                             product.salePrice
//                           ).toLocaleString()}
//                         </span>

//                         {product.regularPrice && (
//                           <span className="text-sm text-muted-foreground line-through">
//                             Rs.{" "}
//                             {Number(
//                               product.regularPrice
//                             ).toLocaleString()}
//                           </span>
//                         )}
//                       </>
//                     ) : (
//                       <span className="font-bold">
//                         Rs.{" "}
//                         {Number(
//                           product.regularPrice ||
//                           0
//                         ).toLocaleString()}
//                       </span>
//                     )}


//                   </div>

//                   {/* Commission amount */}

//                   <div className="rounded-lg bg-muted/60 p-3">

//                     <p className="text-xs text-muted-foreground">
//                       Affiliate Commission
//                     </p>

//                     <p className="mt-1 font-semibold">
//                       Rs.{" "}
//                       {Number(
//                         product.affiliateCommission || 0
//                       ).toLocaleString()}
//                     </p>

//                   </div>

//                 </CardContent>

//                 {/* Footer */}

//                 <CardFooter className="gap-2 p-5 ">

//                   <Button
//                     className="flex-1 cursor-pointer"
//                     onClick={() =>
//                       copyAffiliateLink(
//                         product.affiliateUrl
//                       )
//                     }
//                   >
                    
//                     {copyLink ? (
//                       <>
//                         <CopyCheck className="mr-2 h-4 w-4" />
//                         Copied
//                       </>
//                     ) : (
//                       <>
//                         <Copy className="mr-2 h-4 w-4" />
//                         Copy Link
//                       </>
//                     )}
//                   </Button>

//                   <Button
//                     variant="outline"
//                     size="icon"
//                     asChild
//                   >
//                     <a
//                       href={product.affiliateUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       <ExternalLink className="h-4 w-4" />
//                     </a>
//                   </Button>

//                 </CardFooter>

//               </Card>
//             </motion.div>
//           ))}

//         </div>
//       )}

//     </div>
//   );
// }








// v2
// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "motion/react";
// import {
//   Copy,
//   CopyCheck,
//   ExternalLink,
//   Package,
//   ShoppingBag,
//   Sparkles,
//   TrendingUp,
//   Wallet,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";

// import {
//   productsRequest,
//   productsSuccess,
//   productsFailure,
// } from "@/redux/slices/productSlice";

// import { getAllProducts } from "@/lib/productApi";

// export default function ProductsPage() {
//   const [copiedId, setCopiedId] = useState(null);

//   const dispatch = useDispatch();

//   const {
//     products = [],
//     loading,
//     error,
//   } = useSelector((state) => state.products);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         dispatch(productsRequest());

//         const response = await getAllProducts();

//         dispatch(
//           productsSuccess(response.data.products || [])
//         );
//       } catch (error) {
//         dispatch(
//           productsFailure(
//             error.response?.data?.message ||
//               "Failed to fetch products"
//           )
//         );
//       }
//     };

//     fetchProducts();
//   }, [dispatch]);

//   const copyAffiliateLink = async (url, productId) => {
//     try {
//       await navigator.clipboard.writeText(url);

//       setCopiedId(productId);

//       setTimeout(() => {
//         setCopiedId(null);
//       }, 2500);
//     } catch (error) {
//       console.error("Copy failed:", error);
//     }
//   };

//   const formatPrice = (price) => {
//     return Number(price || 0).toLocaleString();
//   };

//   const getProductPrice = (product) => {
//     if (Number(product.salePrice) !== 0) {
//       return Number(product.salePrice);
//     }

//     return Number(product.regularPrice || 0);
//   };

//   const getDiscount = (product) => {
//     const regular = Number(product.regularPrice || 0);
//     const sale = Number(product.salePrice || 0);

//     if (!regular || !sale || sale >= regular) {
//       return 0;
//     }

//     return Math.round(((regular - sale) / regular) * 100);
//   };

//   return (
//     <div className="min-h-screen space-y-8 pb-10">

//       {/* =====================================================
//           HERO
//       ===================================================== */}

//       <motion.section
//         initial={{ opacity: 0, y: -15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.45 }}
//         className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/[0.08] via-background to-background"
//       >
//         {/* Decorative background */}

//         <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

//         <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

//         <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

//           {/* Left */}

//           <div className="max-w-2xl">

//             <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
//               <Sparkles className="h-3.5 w-3.5 text-primary" />
//               Affiliate Marketplace
//             </div>

//             <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
//               Find products.
//               <span className="text-primary">
//                 {" "}Share & earn.
//               </span>
//             </h1>

//             <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
//               Browse available products, generate your unique
//               affiliate link, and earn commission whenever
//               customers purchase through your link.
//             </p>

//             {/* Mini benefits */}

//             <div className="mt-6 flex flex-wrap gap-3">

//               <div className="flex items-center gap-2 rounded-xl border bg-background/70 px-3 py-2 text-xs font-medium backdrop-blur">
//                 <Wallet className="h-4 w-4 text-primary" />
//                 Earn commission
//               </div>

//               <div className="flex items-center gap-2 rounded-xl border bg-background/70 px-3 py-2 text-xs font-medium backdrop-blur">
//                 <TrendingUp className="h-4 w-4 text-primary" />
//                 Grow your earnings
//               </div>

//               <div className="flex items-center gap-2 rounded-xl border bg-background/70 px-3 py-2 text-xs font-medium backdrop-blur">
//                 <Copy className="h-4 w-4 text-primary" />
//                 Easy sharing
//               </div>

//             </div>
//           </div>

//           {/* Product count */}

//           {!loading && products.length > 0 && (
//             <div className="shrink-0 rounded-2xl border bg-background/80 p-5 shadow-sm backdrop-blur">

//               <div className="flex items-center gap-3">

//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
//                   <ShoppingBag className="h-5 w-5 text-primary" />
//                 </div>

//                 <div>
//                   <p className="text-xs text-muted-foreground">
//                     Available products
//                   </p>

//                   <p className="text-2xl font-bold">
//                     {products.length}
//                   </p>
//                 </div>

//               </div>
//             </div>
//           )}

//         </div>
//       </motion.section>

//       {/* =====================================================
//           ERROR
//       ===================================================== */}

//       {error && (
//         <motion.div
//           initial={{ opacity: 0, y: -8 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4"
//         >
//           <div className="flex items-start gap-3">

//             <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
//               <Package className="h-4 w-4 text-destructive" />
//             </div>

//             <div>
//               <p className="font-medium text-destructive">
//                 Unable to load products
//               </p>

//               <p className="mt-1 text-sm text-destructive/80">
//                 {error}
//               </p>
//             </div>

//           </div>
//         </motion.div>
//       )}

//       {/* =====================================================
//           LOADING SKELETON
//       ===================================================== */}

//       {loading && (
//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

//           {Array.from({ length: 8 }).map((_, index) => (
//             <Card
//               key={index}
//               className="overflow-hidden rounded-2xl"
//             >
//               {/* Image */}

//               <div className="aspect-[4/3] animate-pulse bg-muted" />

//               {/* Content */}

//               <CardContent className="space-y-4 p-5">

//                 <div className="space-y-2">
//                   <div className="h-5 w-[85%] animate-pulse rounded-md bg-muted" />
//                   <div className="h-5 w-[60%] animate-pulse rounded-md bg-muted" />
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <div className="h-6 w-24 animate-pulse rounded-md bg-muted" />
//                   <div className="h-4 w-16 animate-pulse rounded-md bg-muted" />
//                 </div>

//                 <div className="h-16 animate-pulse rounded-xl bg-muted" />

//               </CardContent>

//               <CardFooter className="gap-2 p-5 pt-0">
//                 <div className="h-10 flex-1 animate-pulse rounded-md bg-muted" />
//                 <div className="h-10 w-10 animate-pulse rounded-md bg-muted" />
//               </CardFooter>
//             </Card>
//           ))}

//         </div>
//       )}

//       {/* =====================================================
//           EMPTY STATE
//       ===================================================== */}

//       {!loading && products.length === 0 && !error && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/20 px-6 text-center"
//         >
//           <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
//             <Package className="h-7 w-7 text-primary" />
//           </div>

//           <h2 className="mt-5 text-lg font-semibold">
//             No products available
//           </h2>

//           <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
//             There are currently no affiliate products available.
//             Please check again later.
//           </p>
//         </motion.div>
//       )}

//       {/* =====================================================
//           PRODUCTS HEADER
//       ===================================================== */}

//       {!loading && products.length > 0 && (
//         <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

//           <div>
//             <p className="text-xs font-semibold uppercase tracking-wider text-primary">
//               Product catalog
//             </p>

//             <h2 className="mt-1 text-xl font-bold tracking-tight">
//               Available products
//             </h2>
//           </div>

//           <p className="text-sm text-muted-foreground">
//             Choose a product and start sharing.
//           </p>

//         </div>
//       )}

//       {/* =====================================================
//           PRODUCTS GRID
//       ===================================================== */}

//       {!loading && products.length > 0 && (
//         <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

//           {products.map((product, index) => {
//             const discount = getDiscount(product);
//             const price = getProductPrice(product);
//             const isCopied = copiedId === product._id;

//             return (
//               <motion.div
//                 key={product._id}
//                 initial={{
//                   opacity: 0,
//                   y: 20,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   duration: 0.35,
//                   delay: Math.min(index * 0.04, 0.4),
//                 }}
//                 className="h-full"
//               >
//                 <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">

//                   {/* =================================================
//                       IMAGE
//                   ================================================= */}

//                   <div className="relative aspect-[4/3] overflow-hidden bg-muted/40">

//                     {product.productImage ? (
//                       <img
//                         src={product.productImage}
//                         alt={product.productTitle}
//                         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                       />
//                     ) : (
//                       <div className="flex h-full items-center justify-center">
//                         <Package className="h-14 w-14 text-muted-foreground/40" />
//                       </div>
//                     )}

//                     {/* Image overlay */}

//                     <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//                     {/* Commission badge */}

//                     <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border bg-background/95 px-3 py-1.5 text-xs font-bold shadow-sm backdrop-blur">
//                       <TrendingUp className="h-3.5 w-3.5 text-primary" />
//                       {product.persent}% commission
//                     </div>

//                     {/* Discount */}

//                     {discount > 0 && (
//                       <div className="absolute right-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-sm">
//                         {discount}% OFF
//                       </div>
//                     )}

//                   </div>

//                   {/* =================================================
//                       CONTENT
//                   ================================================= */}

//                   <CardContent className="flex flex-1 flex-col p-5">

//                     {/* Product title */}

//                     <div className="min-h-[56px]">

//                       <h3 className="line-clamp-2 text-[15px] font-semibold leading-6 tracking-tight transition-colors group-hover:text-primary">
//                         {product.productTitle}
//                       </h3>

//                     </div>

//                     {/* Price */}

//                     <div className="mt-3 flex items-baseline gap-2">

//                       <span className="text-xl font-bold tracking-tight">
//                         Rs. {formatPrice(price)}
//                       </span>

//                       {Number(product.salePrice) !== 0 &&
//                         Number(product.regularPrice) > price && (
//                           <span className="text-xs font-medium text-muted-foreground line-through">
//                             Rs.{" "}
//                             {formatPrice(product.regularPrice)}
//                           </span>
//                         )}

//                     </div>

//                     {/* Commission */}

//                     <div className="mt-4 rounded-xl border bg-muted/30 p-3.5 transition-colors group-hover:border-primary/10 group-hover:bg-primary/[0.03]">

//                       <div className="flex items-center justify-between gap-3">

//                         <div>
//                           <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
//                             Your commission
//                           </p>

//                           <p className="mt-1 text-lg font-bold text-primary">
//                             Rs.{" "}
//                             {formatPrice(
//                               product.affiliateCommission
//                             )}
//                           </p>
//                         </div>

//                         <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
//                           <Wallet className="h-4 w-4 text-primary" />
//                         </div>

//                       </div>

//                     </div>

//                     {/* Spacer */}

//                     <div className="flex-1" />

//                   </CardContent>

//                   {/* =================================================
//                       ACTIONS
//                   ================================================= */}

//                   <CardFooter className="flex gap-2 p-5 pt-0">

//                     {/* Copy */}

//                     <Button
//                       className="h-10 flex-1 rounded-xl font-semibold shadow-sm transition-all"
//                       onClick={() =>
//                         copyAffiliateLink(
//                           product.affiliateUrl,
//                           product._id
//                         )
//                       }
//                     >
//                       {isCopied ? (
//                         <>
//                           <CopyCheck className="mr-2 h-4 w-4" />
//                           Copied
//                         </>
//                       ) : (
//                         <>
//                           <Copy className="mr-2 h-4 w-4" />
//                           Copy Link
//                         </>
//                       )}
//                     </Button>

//                     {/* Open */}

//                     <Button
//                       variant="outline"
//                       size="icon"
//                       asChild
//                       className="h-10 w-10 shrink-0 rounded-xl"
//                     >
//                       <a
//                         href={product.affiliateUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label={`Open ${ product.productTitle } `}
//                       >
//                         <ExternalLink className="h-4 w-4" />
//                       </a>
//                     </Button>

//                   </CardFooter>

//                 </Card>
//               </motion.div>
//             );
//           })}

//         </div>
//       )}

//     </div>
//   );
// }






// v3
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import {
  Copy,
  CopyCheck,
  ExternalLink,
  Package,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Wallet,
  Star,
  ChevronRight,
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
  const [copiedId, setCopiedId] = useState(null);

  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(productsRequest());

        const response = await getAllProducts();

        dispatch(
          productsSuccess(response.data.products || [])
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

  const copyAffiliateLink = async (url, productId) => {
    try {
      await navigator.clipboard.writeText(url);

      setCopiedId(productId);

      setTimeout(() => {
        setCopiedId(null);
      }, 2500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const openProduct = (url) => {
    if (!url) return;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString();
  };

  const getProductPrice = (product) => {
    const salePrice = Number(product.salePrice || 0);
    const regularPrice = Number(
      product.regularPrice || 0
    );

    if (salePrice > 0 && salePrice < regularPrice) {
      return salePrice;
    }

    return regularPrice;
  };

  const getDiscount = (product) => {
    const regular = Number(
      product.regularPrice || 0
    );

    const sale = Number(
      product.salePrice || 0
    );

    if (!regular || !sale || sale >= regular) {
      return 0;
    }

    return Math.round(
      ((regular - sale) / regular) * 100
    );
  };

  return (
    <div className="min-h-screen space-y-8 pb-10">

      {/* =====================================================
          HERO
          YOUR EXISTING HERO — KEEP IT AS IT IS
      ===================================================== */}

      <motion.section
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/[0.08] via-background to-background"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="max-w-2xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Affiliate Marketplace
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Find products.
              <span className="text-primary">
                {" "}Share & earn.
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Browse available products, generate your unique
              affiliate link, and earn commission whenever
              customers purchase through your link.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-xl border bg-background/70 px-3 py-2 text-xs font-medium backdrop-blur">
                <Wallet className="h-4 w-4 text-primary" />
                Earn commission
              </div>

              <div className="flex items-center gap-2 rounded-xl border bg-background/70 px-3 py-2 text-xs font-medium backdrop-blur">
                <TrendingUp className="h-4 w-4 text-primary" />
                Grow your earnings
              </div>

              <div className="flex items-center gap-2 rounded-xl border bg-background/70 px-3 py-2 text-xs font-medium backdrop-blur">
                <Copy className="h-4 w-4 text-primary" />
                Easy sharing
              </div>

            </div>
          </div>

          {!loading && products.length > 0 && (
            <div className="shrink-0 rounded-2xl border bg-background/80 p-5 shadow-sm backdrop-blur">

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Available products
                  </p>

                  <p className="text-2xl font-bold">
                    {products.length}
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>
      </motion.section>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-destructive/20 bg-destructive/5 p-4"
        >
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
              <Package className="h-4 w-4 text-destructive" />
            </div>

            <div>
              <p className="text-sm font-semibold text-destructive">
                Unable to load products
              </p>

              <p className="mt-0.5 text-xs text-destructive/80">
                {error}
              </p>
            </div>

          </div>
        </motion.div>
      )}

      {/* =====================================================
          CATALOG HEADER
      ===================================================== */}

      {!loading && products.length > 0 && (
        <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <span>Featured products</span>
              <span className="h-1 w-1 rounded-full bg-primary" />
              <span>{products.length} items</span>
            </div>

            <h2 className="mt-1 text-xl font-bold tracking-tight">
              Explore & start earning
            </h2>
          </div>

          <p className="text-xs text-muted-foreground">
            Click any product to view it
          </p>

        </div>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">

          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border bg-card"
            >
              <div className="aspect-square animate-pulse bg-muted" />

              <div className="space-y-3 p-3">

                <div className="h-4 w-full animate-pulse rounded bg-muted" />

                <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />

                <div className="h-5 w-1/2 animate-pulse rounded bg-muted" />

                <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />

              </div>
            </div>
          ))}

        </div>
      )}

      {/* =====================================================
          EMPTY
      ===================================================== */}

      {!loading &&
        products.length === 0 &&
        !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 px-6 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Package className="h-7 w-7 text-primary" />
            </div>

            <h2 className="mt-5 text-lg font-semibold">
              No products available
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              New affiliate products will appear here when
              they become available.
            </p>
          </motion.div>
        )}

      {/* =====================================================
          ALIEXPRESS STYLE PRODUCT GRID
      ===================================================== */}

      {!loading && products.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-1
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
          "
        >

          {products.map((product, index) => {
            const discount = getDiscount(product);
            const price = getProductPrice(product);
            const isCopied =
              copiedId === product._id;

            return (
              <motion.div
                key={product._id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(
                    index * 0.025,
                    0.3
                  ),
                }}
                className="group m-auto"
              >

                {/* =================================================
                    PRODUCT CARD
                ================================================= */}

                <Card
                  className="
                    relative
                    flex
                    h-full
                    min-w-60
                    cursor-pointer
                    flex-col
                    overflow-hidden
                    rounded-xl
                    border
                    bg-card
                    p-0
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-primary/20
                    hover:shadow-lg
                  "
                  onClick={() =>
                    openProduct(
                      product.affiliateUrl
                    )
                  }
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div className="relative aspect-square overflow-hidden bg-muted/30">

                    {product.productImage ? (
                      <img
                        src={product.productImage}
                        alt={
                          product.productTitle ||
                          "Product"
                        }
                        loading={
                          index < 6
                            ? "eager"
                            : "lazy"
                        }
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Package className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}

                    {/* Image gradient */}

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                    {/* Discount */}

                    {discount > 0 && (
                      <div className="absolute left-2 top-2 rounded-sm bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground shadow-sm">
                        -{discount}%
                      </div>
                    )}

                    {/* Commission */}

                    <div className="absolute right-2 top-2 flex items-center gap-1 rounded-sm bg-background/95 px-2 py-1 text-[10px] font-bold shadow-sm backdrop-blur">
                      <TrendingUp className="h-3 w-3 text-primary" />
                      {product.persent}%
                    </div>

                    {/* Quick view */}

                    <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex translate-y-2 items-center justify-center gap-1.5 rounded-lg bg-background/95 px-3 py-2 text-xs font-semibold opacity-0 shadow-md backdrop-blur transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                      View product
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>

                  </div>

                  {/* =================================================
                      PRODUCT INFO
                  ================================================= */}

                  <CardContent className="flex flex-1 flex-col">

                    {/* Title */}

                    <h2
                      className="
                      
                        line-clamp-2
                        min-h-[38px]
                        text-[13px]
                        font-semibold
                        leading-[19px]
                        transition-colors
                        group-hover:text-primary
                      "
                    >
                      {product.productTitle}
                    </h2>

                    {/* Rating / product info */}

                    <div className="mt-2 flex items-center gap-1.5">

                      <div className="flex items-center gap-0.5 text-amber-500">
                        <Star className="h-3 w-3 fill-current" />
                        {/* <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current opacity-50" /> */}
                        <span className="font-semibold text-black">4.5</span>
                      </div>

                      <span className="text-[14px] text-muted-foreground pl-1">
                        1000+ sold
                      </span>

                    </div>

                    {/* Price */}

                    <div className="mt-2 flex flex-wrap items-baseline gap-1.5">

                      <span className="text-[17px] font-bold leading-none tracking-tight">
                        Rs. {formatPrice(price)}
                      </span>

                      {Number(
                        product.salePrice
                      ) !== 0 &&
                        Number(
                          product.regularPrice
                        ) > price && (
                          <span className="text-[10px] text-muted-foreground line-through">
                            Rs.{" "}
                            {formatPrice(
                              product.regularPrice
                            )}
                          </span>
                        )}

                    </div>

                    {/* Commission */}

                    <div className="mt-3 flex items-center justify-between border-t pt-2.5">

                      <span className="text-[10px] text-muted-foreground">
                        You earn
                      </span>

                      <span className="text-xs font-bold text-primary">
                        Rs.{" "}
                        {formatPrice(
                          product.affiliateCommission
                        )}
                      </span>

                    </div>

                  </CardContent>

                  {/* =================================================
                      ACTIONS
                  ================================================= */}

                  <CardFooter
                    className="flex justify-center p-3 pt-1"
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >

                    {/* COPY */}

                    <Button
                      type="button"
                      size="sm"
                      className="h-9 w-full cursor-pointer rounded-lg text-lg font-semibold"
                      onClick={() =>
                        copyAffiliateLink(
                          product.affiliateUrl,
                          product._id
                        )
                      }
                    >
                      {isCopied ? (
                        <>
                          <CopyCheck className="mr-1.5 h-3.5 w-3.5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-1.5 h-3.5 w-3.5" />
                          Copy Link
                        </>
                      )}
                    </Button>

                    {/* OPEN */}
{/* 
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-[38px] rounded-lg"
                      onClick={() =>
                        openProduct(
                          product.affiliateUrl
                        )
                      }
                      aria-label={`Open ${ product.productTitle } `}
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button> */}

                  </CardFooter>

                </Card>

              </motion.div>
            );
          })}

        </div>
      )}

    </div>
  );
}