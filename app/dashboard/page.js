// "use client";

// import { motion } from "motion/react";
// import {
//   Wallet,
//   TrendingUp,
//   ShoppingBag,
//   ArrowDownToLine,
// } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const stats = [
//   {
//     title: "Available Balance",
//     value: "Rs. 25,400",
//     icon: Wallet,
//     description: "Available for withdrawal",
//   },
//   {
//     title: "Total Commission",
//     value: "Rs. 48,200",
//     icon: TrendingUp,
//     description: "Total earned commission",
//   },
//   {
//     title: "Total Orders",
//     value: "124",
//     icon: ShoppingBag,
//     description: "Orders generated",
//   },
//   {
//     title: "Withdrawals",
//     value: "Rs. 22,800",
//     icon: ArrowDownToLine,
//     description: "Total withdrawn",
//   },
// ];

// export default function DashboardPage() {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-2xl font-bold tracking-tight">
//           Welcome back 👋
//         </h2>

//         <p className="text-muted-foreground">
//           Here's what's happening with your affiliate account.
//         </p>
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;

//           return (
//             <motion.div
//               key={stat.title}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: index * 0.08 }}
//             >
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2">
//                   <CardTitle className="text-sm font-medium">
//                     {stat.title}
//                   </CardTitle>

//                   <Icon className="h-5 w-5 text-muted-foreground" />
//                 </CardHeader>

//                 <CardContent>
//                   <div className="text-2xl font-bold">{stat.value}</div>

//                   <p className="mt-1 text-xs text-muted-foreground">
//                     {stat.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           );
//         })}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Orders</CardTitle>
//         </CardHeader>

//         <CardContent>
//           <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
//             No recent orders
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }





// v2
// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "motion/react";

// import {
//   Wallet,
//   TrendingUp,
//   ShoppingBag,
//   ArrowDownToLine,
// } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import {
//   dashboardRequest,
//   dashboardSuccess,
//   dashboardFailure,
// } from "@/redux/slices/dashboardSlice";

// const stats = [
//   {
//     key: "balance",
//     title: "Available Balance",
//     icon: Wallet,
//     description: "Available for withdrawal",
//   },
//   {
//     key: "totalCommission",
//     title: "Total Commission",
//     icon: TrendingUp,
//     description: "Total earned commission",
//   },
//   {
//     key: "totalOrders",
//     title: "Total Orders",
//     icon: ShoppingBag,
//     description: "Orders generated",
//   },
//   {
//     key: "totalWithdrawals",
//     title: "Withdrawals",
//     icon: ArrowDownToLine,
//     description: "Total withdrawn",
//   },
// ];

// export default function DashboardPage() {
//   const dispatch = useDispatch();

//   const {
//     balance,
//     totalCommission,
//     totalOrders,
//     totalWithdrawals,
//     recentOrders,
//     loading,
//     error,
//   } = useSelector((state) => state.dashboard);

//   useEffect(() => {
//     const getDashboard = async () => {
//       try {
//         dispatch(dashboardRequest());

//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/user/api/v1/dashboard`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );

//         const result = await response.json();

//         if (!response.ok) {
//           throw new Error(result.message || "Failed to fetch dashboard");
//         }

//         dispatch(dashboardSuccess(result.data));
//       } catch (error) {
//         dispatch(dashboardFailure(error.message));
//       }
//     };

//     getDashboard();
//   }, [dispatch]);

//   const values = {
//     balance,
//     totalCommission,
//     totalOrders,
//     totalWithdrawals,
//   };

//   return (
//     <div className="space-y-8">

//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">
//           Welcome back 👋
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Here's what's happening with your affiliate account.
//         </p>
//       </div>

//       {error && (
//         <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
//           {error}
//         </div>
//       )}

//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon;

//           return (
//             <motion.div
//               key={stat.title}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 duration: 0.3,
//                 delay: index * 0.08,
//               }}
//             >
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between pb-2">
//                   <CardTitle className="text-sm font-medium">
//                     {stat.title}
//                   </CardTitle>

//                   <Icon className="h-5 w-5 text-muted-foreground" />
//                 </CardHeader>

//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     {loading
//                       ? "..."
//                       : stat.key === "totalOrders"
//                         ? values[stat.key]
//                         : `Rs. ${Number(values[stat.key]).toLocaleString()}`}
//                   </div>

//                   <p className="mt-1 text-xs text-muted-foreground">
//                     {stat.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           );
//         })}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Orders</CardTitle>
//         </CardHeader>

//         <CardContent>
//           {loading ? (
//             <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
//               Loading orders...
//             </div>
//           ) : recentOrders.length === 0 ? (
//             <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
//               No recent orders
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {recentOrders.map((order) => (
//                 <div
//                   key={order._id}
//                   className="flex items-center justify-between rounded-lg border p-4"
//                 >
//                   <div>
//                     <p className="font-medium">
//                       Order #{order.order?.id}
//                     </p>

//                     <p className="text-sm text-muted-foreground">
//                       {order.products?.length || 0} product(s)
//                     </p>
//                   </div>

//                   <div className="font-semibold">
//                     Rs. {Number(order.total).toLocaleString()}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// v3
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import {
  Wallet,
  TrendingUp,
  ShoppingBag,
  ArrowDownToLine,
  Package,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  dashboardRequest,
  dashboardSuccess,
  dashboardFailure,
} from "@/redux/slices/dashboardSlice";
import api from "@/lib/api";
import Link from "next/link";

const stats = [
  {
    key: "balance",
    title: "Available Balance",
    icon: Wallet,
    description: "Available for withdrawal",
  },
  {
    key: "totalCommission",
    title: "Total Commission",
    icon: TrendingUp,
    description: "Total earned commission",
  },
  {
    key: "totalOrders",
    title: "Total Orders",
    icon: ShoppingBag,
    description: "Orders generated",
  },
  {
    key: "totalWithdrawals",
    title: "Withdrawals",
    icon: ArrowDownToLine,
    description: "Total withdrawn",
  },
];

export default function DashboardPage() {
  const dispatch = useDispatch();

  const {
    balance,
    totalCommission,
    totalOrders,
    totalWithdrawals,
    recentOrders,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  const user = useSelector((state) => state.dashboard.user);

  useEffect(() => {
    const getDashboard = async () => {
      try {
        dispatch(dashboardRequest());

        const response = await api.get(
          "/user/api/v1/dashboard"
        );

        console.log("DASHBOARD RESPONSE:", response.data);

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Failed to fetch dashboard"
          );
        }

        dispatch(
          dashboardSuccess(response.data.data)
        );

      } catch (error) {
        console.error("Dashboard error:", error);

        dispatch(
          dashboardFailure(
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch dashboard"
          )
        );
      }
    };

    getDashboard();
  }, [dispatch]);

  const formatAmount = (amount) => {
    return `Rs. ${Number(amount || 0).toLocaleString()}`;
  };

  const getStatusIcon = (status) => {
    if (status === "completed" || status === "processing") {
      return <CheckCircle2 className="h-4 w-4" />;
    }

    return <Clock3 className="h-4 w-4" />;
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back
          {user?.userName ? `, ${user.userName}` : ""} 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Here's what's happening with your affiliate account.
        </p>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
        >
          {error}
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          let value = 0;

          if (stat.key === "balance") {
            value = balance;
          }

          if (stat.key === "totalCommission") {
            value = totalCommission;
          }

          if (stat.key === "totalOrders") {
            value = totalOrders;
          }

          if (stat.key === "totalWithdrawals") {
            value = totalWithdrawals;
          }

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{ y: -4 }}
            >
              <Card className="transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>

                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">
                    {loading
                      ? "..."
                      : stat.key === "totalOrders"
                        ? value
                        : formatAmount(value)}
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />

              <CardTitle>
                Recent Orders
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
                Loading orders...
              </div>
            ) : recentOrders?.length === 0 ? (
              <div className="flex min-h-48 flex-col items-center justify-center gap-2 text-muted-foreground">
                <Package className="h-10 w-10 opacity-40" />

                <p className="text-sm">
                  No recent orders
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  
                  <Link
                    href={`/dashboard/orders/${order._id}`}
                    className="block"
                  >
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ y: -2 }}
                      className="flex cursor-pointer flex-col gap-3 rounded-lg border p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                          <ShoppingBag className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="font-medium">
                            Order #{order.order?.id}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {order.products?.length || 0} product(s)
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-6 sm:justify-end">
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatAmount(order.total)}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            Commission:{" "}
                            {formatAmount(order.affiliateCommission)}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                          {getStatusIcon(order.order?.status)}

                          <span>
                            {order.order?.status || "Pending"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>

                  // <motion.div
                  //   key={order._id}
                  //   initial={{ opacity: 0, x: -10 }}
                  //   animate={{ opacity: 1, x: 0 }}
                  //   className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                  // >
                  //   <div className="flex items-center gap-3">
                  //     <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  //       <ShoppingBag className="h-5 w-5" />
                  //     </div>

                  //     <div>
                  //       <p className="font-medium">
                  //         Order #{order.order?.id}
                  //       </p>

                  //       <p className="text-sm text-muted-foreground">
                  //         {order.products?.length || 0} product(s)
                  //       </p>
                  //     </div>
                  //   </div>

                  //   <div className="flex items-center justify-between gap-6 sm:justify-end">
                  //     <div className="text-right">
                  //       <p className="font-semibold">
                  //         {formatAmount(order.total)}
                  //       </p>

                  //       <p className="text-xs text-muted-foreground">
                  //         Commission:{" "}
                  //         {formatAmount(
                  //           order.affiliateCommission
                  //         )}
                  //       </p>
                  //     </div>

                  //     <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs">
                  //       {getStatusIcon(order.order?.status)}

                  //       <span>
                  //         {order.order?.status || "Pending"}
                  //       </span>
                  //     </div>
                  //   </div>
                  // </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}