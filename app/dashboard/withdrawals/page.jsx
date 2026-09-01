// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "motion/react";

// import {
//   ArrowDownToLine,
//   CheckCircle2,
//   Clock3,
//   XCircle,
//   Wallet,
//   Loader2,
//   History,
// } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";

// import {
//   withdrawalsRequest,
//   withdrawalsSuccess,
//   withdrawalsFailure,
//   withdrawalRequestStart,
//   withdrawalRequestSuccess,
//   withdrawalRequestFailure,
//   clearWithdrawalMessage,
// } from "@/redux/slices/withdrawalSlice";

// import {
//   requestWithdrawal,
//   getUserWithdrawals,
// } from "@/lib/withdrawalApi";

// export default function WithdrawalsPage() {
//   const dispatch = useDispatch();

//   const {
//     withdrawals,
//     loading,
//     submitting,
//     error,
//     success,
//   } = useSelector((state) => state.withdrawal);

//   const dashboard = useSelector(
//     (state) => state.dashboard
//   );

//   const [amount, setAmount] = useState("");

//   /*
//    * Fetch withdrawal history
//    */
//   useEffect(() => {
//     const fetchWithdrawals = async () => {
//       try {
//         dispatch(withdrawalsRequest());

//         const response = await getUserWithdrawals();

//         dispatch(
//           withdrawalsSuccess(
//             response?.data?.withdrawals || []
//           )
//         );
//       } catch (error) {
//         /*
//          * Backend 404 ka matlab hai
//          * abhi withdrawal history nahi hai.
//          */
//         if (error.response?.status === 404) {
//           dispatch(withdrawalsSuccess([]));
//           return;
//         }

//         dispatch(
//           withdrawalsFailure(
//             error.response?.data?.message ||
//             error.message ||
//             "Failed to fetch withdrawals"
//           )
//         );
//       }
//     };

//     fetchWithdrawals();
//   }, [dispatch]);

//   /*
//    * Request withdrawal
//    */
//   const handleWithdrawal = async (e) => {
//     e.preventDefault();

//     dispatch(clearWithdrawalMessage());

//     const withdrawalAmount = Number(amount);

//     if (!withdrawalAmount) {
//       dispatch(
//         withdrawalRequestFailure(
//           "Please enter withdrawal amount."
//         )
//       );
//       return;
//     }

//     if (withdrawalAmount < 100) {
//       dispatch(
//         withdrawalRequestFailure(
//           "Minimum withdrawal is Rs. 100."
//         )
//       );
//       return;
//     }

//     try {
//       dispatch(withdrawalRequestStart());

//       const response = await requestWithdrawal(
//         withdrawalAmount
//       );

//       dispatch(
//         withdrawalRequestSuccess(
//           response?.message ||
//           "Withdrawal request submitted successfully"
//         )
//       );

//       setAmount("");

//       /*
//        * New withdrawal ko list ke start mein add karo
//        */
//       if (response?.data?.withdrawal) {
//         dispatch(
//           withdrawalsSuccess([
//             response.data.withdrawal,
//             ...withdrawals,
//           ])
//         );
//       }

//       /*
//        * Dashboard balance bhi update karna ho
//        * to dashboard ko dobara fetch kar sakte ho.
//        */
//     } catch (error) {
//       dispatch(
//         withdrawalRequestFailure(
//           error.response?.data?.message ||
//           error.message ||
//           "Withdrawal request failed"
//         )
//       );
//     }
//   };

//   /*
//    * Balance
//    */
//   const balance = Number(
//     dashboard?.balance || 0
//   );

//   /*
//    * Total withdrawn
//    */
//   const totalWithdrawn = withdrawals
//     .filter(
//       (item) => item.status === "approved"
//     )
//     .reduce(
//       (total, item) =>
//         total + Number(item.amount || 0),
//       0
//     );

//   /*
//    * Pending amount
//    */
//   const pendingAmount = withdrawals
//     .filter(
//       (item) => item.status === "pending"
//     )
//     .reduce(
//       (total, item) =>
//         total + Number(item.amount || 0),
//       0
//     );

//   const formatAmount = (value) => {
//     return `Rs. ${Number(value || 0).toLocaleString()}`;
//   };

//   return (
//     <div className="space-y-6">

//       {/* Header */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: -10,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//       >
//         <h1 className="text-3xl font-bold tracking-tight">
//           Withdrawals
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Manage your earnings and withdrawal requests.
//         </p>
//       </motion.div>

//       {/* Messages */}

//       {error && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
//         >
//           {error}
//         </motion.div>
//       )}

//       {success && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600"
//         >
//           {success}
//         </motion.div>
//       )}

//       {/* Stats */}

//       <div className="grid gap-4 sm:grid-cols-3">

//         <StatCard
//           title="Available Balance"
//           value={formatAmount(balance)}
//           icon={Wallet}
//         />

//         <StatCard
//           title="Total Withdrawn"
//           value={formatAmount(totalWithdrawn)}
//           icon={ArrowDownToLine}
//         />

//         <StatCard
//           title="Pending Withdrawals"
//           value={formatAmount(pendingAmount)}
//           icon={Clock3}
//         />

//       </div>

//       {/* Request Withdrawal */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 15,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//       >
//         <Card>

//           <CardHeader>
//             <div className="flex items-center gap-2">

//               <ArrowDownToLine className="h-5 w-5" />

//               <CardTitle>
//                 Request Withdrawal
//               </CardTitle>

//             </div>
//           </CardHeader>

//           <CardContent>

//             <form
//               onSubmit={handleWithdrawal}
//               className="space-y-5"
//             >

//               <div className="rounded-lg bg-muted p-4">

//                 <p className="text-sm text-muted-foreground">
//                   Available Balance
//                 </p>

//                 <p className="mt-1 text-2xl font-bold">
//                   {formatAmount(balance)}
//                 </p>

//               </div>

//               <div className="space-y-2">

//                 <label
//                   htmlFor="amount"
//                   className="text-sm font-medium"
//                 >
//                   Withdrawal Amount
//                 </label>

//                 <div className="relative">

//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
//                     Rs.
//                   </span>

//                   <input
//                     id="amount"
//                     type="number"
//                     min="100"
//                     value={amount}
//                     onChange={(e) =>
//                       setAmount(e.target.value)
//                     }
//                     placeholder="Enter amount"
//                     className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                   />

//                 </div>

//                 <p className="text-xs text-muted-foreground">
//                   Minimum withdrawal amount is Rs. 100.
//                 </p>

//               </div>

//               <Button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full sm:w-auto"
//               >

//                 {submitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <ArrowDownToLine className="mr-2 h-4 w-4" />
//                     Request Withdrawal
//                   </>
//                 )}

//               </Button>

//             </form>

//           </CardContent>

//         </Card>
//       </motion.div>

//       {/* History */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 15,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           delay: 0.1,
//         }}
//       >
//         <Card>

//           <CardHeader>

//             <div className="flex items-center gap-2">

//               <History className="h-5 w-5" />

//               <CardTitle>
//                 Withdrawal History
//               </CardTitle>

//             </div>

//           </CardHeader>

//           <CardContent>

//             {loading ? (
//               <div className="flex min-h-40 items-center justify-center">

//                 <Loader2 className="h-6 w-6 animate-spin" />

//               </div>
//             ) : withdrawals.length === 0 ? (

//               <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-muted-foreground">

//                 <ArrowDownToLine className="h-10 w-10 opacity-40" />

//                 <p className="text-sm">
//                   No withdrawal history found
//                 </p>

//               </div>

//             ) : (

//               <div className="space-y-3">

//                 {withdrawals.map(
//                   (withdrawal, index) => {

//                     const status =
//                       getStatus(
//                         withdrawal.status
//                       );

//                     const StatusIcon =
//                       status.icon;

//                     return (
//                       <motion.div
//                         key={withdrawal._id}
//                         initial={{
//                           opacity: 0,
//                           x: -10,
//                         }}
//                         animate={{
//                           opacity: 1,
//                           x: 0,
//                         }}
//                         transition={{
//                           delay: index * 0.04,
//                         }}
//                         className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
//                       >

//                         <div className="flex items-center gap-3">

//                           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

//                             <ArrowDownToLine className="h-5 w-5" />

//                           </div>

//                           <div>

//                             <p className="font-semibold">
//                               {formatAmount(
//                                 withdrawal.amount
//                               )}
//                             </p>

//                             <p className="text-xs text-muted-foreground">
//                               {formatDate(
//                                 withdrawal.createdAt
//                               )}
//                             </p>

//                           </div>

//                         </div>

//                         <div
//                           className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}
//                         >

//                           <StatusIcon className="h-4 w-4" />

//                           {status.label}

//                         </div>

//                       </motion.div>
//                     );
//                   }
//                 )}

//               </div>

//             )}

//           </CardContent>

//         </Card>
//       </motion.div>

//     </div>
//   );
// }


// /* ----------------------------- */
// /* Stat Card */
// /* ----------------------------- */

// function StatCard({
//   title,
//   value,
//   icon: Icon,
// }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 15,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//       whileHover={{
//         y: -3,
//       }}
//     >

//       <Card>

//         <CardContent className="flex items-center justify-between p-6">

//           <div>

//             <p className="text-sm text-muted-foreground">
//               {title}
//             </p>

//             <p className="mt-1 text-2xl font-bold">
//               {value}
//             </p>

//           </div>

//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

//             <Icon className="h-5 w-5" />

//           </div>

//         </CardContent>

//       </Card>

//     </motion.div>
//   );
// }


// /* ----------------------------- */
// /* Status */
// /* ----------------------------- */

// function getStatus(status) {
//   switch (status) {
//     case "approved":
//       return {
//         label: "Approved",
//         icon: CheckCircle2,
//         className:
//           "bg-green-500/10 text-green-600",
//       };

//     case "rejected":
//       return {
//         label: "Rejected",
//         icon: XCircle,
//         className:
//           "bg-destructive/10 text-destructive",
//       };

//     default:
//       return {
//         label: "Pending",
//         icon: Clock3,
//         className:
//           "bg-yellow-500/10 text-yellow-600",
//       };
//   }
// }


// /* ----------------------------- */
// /* Date */
// /* ----------------------------- */

// function formatDate(date) {
//   if (!date) return "";

//   return new Date(date).toLocaleDateString(
//     "en-US",
//     {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     }
//   );
// }





// v2

// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "motion/react";

// import {
//   ArrowDownToLine,
//   CheckCircle2,
//   Clock3,
//   XCircle,
//   Wallet,
//   Loader2,
//   History,
// } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";

// import {
//   withdrawalsRequest,
//   withdrawalsSuccess,
//   withdrawalsFailure,
//   withdrawalRequestStart,
//   withdrawalRequestSuccess,
//   withdrawalRequestFailure,
//   clearWithdrawalMessage,
// } from "@/redux/slices/withdrawalSlice";

// import {
//   addNotification,
// } from "@/redux/slices/notificationSlice";

// import {
//   dashboardSuccess,
// } from "@/redux/slices/dashboardSlice";

// import {
//   requestWithdrawal,
//   getUserWithdrawals,
// } from "@/lib/withdrawalApi";

// export default function WithdrawalsPage() {
//   const dispatch = useDispatch();

//   // =========================
//   // WITHDRAWAL REDUX
//   // =========================

//   const {
//     withdrawals,
//     loading,
//     submitting,
//     error,
//     success,
//   } = useSelector((state) => state.withdrawal);

//   // =========================
//   // DASHBOARD REDUX
//   // =========================

//   const dashboard = useSelector(
//     (state) => state.dashboard
//   );

//   // =========================
//   // LOCAL STATE
//   // =========================

//   const [amount, setAmount] = useState("");

//   // =========================
//   // FETCH WITHDRAWAL HISTORY
//   // =========================

//   useEffect(() => {
//     const fetchWithdrawals = async () => {
//       try {
//         dispatch(withdrawalsRequest());

//         const response = await getUserWithdrawals();

//         dispatch(
//           withdrawalsSuccess(
//             response?.data?.withdrawals || []
//           )
//         );
//       } catch (error) {
//         /*
//          * 404 means user has no withdrawal history.
//          */

//         if (error.response?.status === 404) {
//           dispatch(withdrawalsSuccess([]));
//           return;
//         }

//         dispatch(
//           withdrawalsFailure(
//             error.response?.data?.message ||
//               error.message ||
//               "Failed to fetch withdrawals"
//           )
//         );
//       }
//     };

//     fetchWithdrawals();
//   }, [dispatch]);

//   // =========================
//   // REQUEST WITHDRAWAL
//   // =========================

//   const handleWithdrawal = async (e) => {
//     e.preventDefault();

//     dispatch(clearWithdrawalMessage());

//     const withdrawalAmount = Number(amount);

//     // =========================
//     // VALIDATION
//     // =========================

//     if (!withdrawalAmount) {
//       dispatch(
//         withdrawalRequestFailure(
//           "Please enter withdrawal amount."
//         )
//       );

//       return;
//     }

//     if (withdrawalAmount < 100) {
//       dispatch(
//         withdrawalRequestFailure(
//           "Minimum withdrawal is Rs. 100."
//         )
//       );

//       return;
//     }

//     if (withdrawalAmount > Number(dashboard?.balance || 0)) {
//       dispatch(
//         withdrawalRequestFailure(
//           "Insufficient balance."
//         )
//       );

//       return;
//     }

//     try {
//       // =========================
//       // START
//       // =========================

//       dispatch(withdrawalRequestStart());

//       // =========================
//       // API REQUEST
//       // =========================

//       const response = await requestWithdrawal(
//         withdrawalAmount
//       );

//       /*
//        * Backend response:
//        *
//        * {
//        *   data: {
//        *     withdrawal,
//        *     balance
//        *   }
//        * }
//        */

//       const newWithdrawal =
//         response?.data?.withdrawal;

//       const updatedBalance =
//         Number(response?.data?.balance);

//       // =========================
//       // UPDATE WITHDRAWAL MESSAGE
//       // =========================

//       dispatch(
//         withdrawalRequestSuccess(
//           response?.message ||
//             "Withdrawal request submitted successfully"
//         )
//       );

//       // =========================
//       // CLEAR INPUT
//       // =========================

//       setAmount("");

//       // =========================
//       // UPDATE WITHDRAWAL HISTORY
//       // =========================

//       if (newWithdrawal) {
//         dispatch(
//           withdrawalsSuccess([
//             newWithdrawal,
//             ...(withdrawals || []),
//           ])
//         );
//       }

//       // =========================
//       // UPDATE DASHBOARD BALANCE
//       // =========================

//       if (
//         Number.isFinite(updatedBalance)
//       ) {
//         dispatch(
//           dashboardSuccess({
//             ...dashboard,
//             balance: updatedBalance,
//           })
//         );
//       } else {
//         /*
//          * Fallback:
//          * Agar backend balance return na kare
//          * to locally amount minus kar do.
//          */

//         const newLocalBalance =
//           Number(dashboard?.balance || 0) -
//           withdrawalAmount;

//         dispatch(
//           dashboardSuccess({
//             ...dashboard,
//             balance: Math.max(
//               newLocalBalance,
//               0
//             ),
//           })
//         );
//       }

//       // =========================
//       // INSTANT NOTIFICATION
//       // =========================

//       /*
//        * Backend notification already create
//        * kar raha hai.
//        *
//        * Yahan Redux mein notification instantly
//        * add kar rahe hain taake bell par foran
//        * notification/count show ho.
//        */

//       dispatch(
//         addNotification({
//           _id:
//             newWithdrawal?._id ||
//             `withdrawal - ${ Date.now() } `,

//           user: dashboard?.user?._id,

//           title: "Withdrawal Requested",

//           message: `Your withdrawal request of Rs.${ withdrawalAmount.toLocaleString() } has been submitted successfully.`,

//           amount: withdrawalAmount,

//           status: "pending",

//           isRead: false,

//           createdAt:
//             newWithdrawal?.createdAt ||
//             new Date().toISOString(),

//           orderId: undefined,
//         })
//       );

//     } catch (error) {
//       // =========================
//       // ERROR
//       // =========================

//       dispatch(
//         withdrawalRequestFailure(
//           error.response?.data?.message ||
//             error.message ||
//             "Withdrawal request failed"
//         )
//       );
//     }
//   };

//   // =========================
//   // BALANCE
//   // =========================

//   const balance = Number(
//     dashboard?.balance || 0
//   );

//   // =========================
//   // TOTAL WITHDRAWN
//   // =========================

//   const totalWithdrawn = withdrawals
//     .filter(
//       (item) => item.status === "approved"
//     )
//     .reduce(
//       (total, item) =>
//         total + Number(item.amount || 0),
//       0
//     );

//   // =========================
//   // PENDING AMOUNT
//   // =========================

//   const pendingAmount = withdrawals
//     .filter(
//       (item) => item.status === "pending"
//     )
//     .reduce(
//       (total, item) =>
//         total + Number(item.amount || 0),
//       0
//     );

//   // =========================
//   // FORMAT AMOUNT
//   // =========================

//   const formatAmount = (value) => {
//     return `Rs.${
//   Number(
//     value || 0
//   ).toLocaleString()
// } `;
//   };

//   // =========================
//   // RENDER
//   // =========================

//   return (
//     <div className="space-y-6">

//       {/* =========================
//           HEADER
//       ========================= */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: -10,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//       >
//         <h1 className="text-3xl font-bold tracking-tight">
//           Withdrawals
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Manage your earnings and withdrawal requests.
//         </p>
//       </motion.div>

//       {/* =========================
//           ERROR
//       ========================= */}

//       {error && (
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
//         >
//           {error}
//         </motion.div>
//       )}

//       {/* =========================
//           SUCCESS
//       ========================= */}

//       {success && (
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600"
//         >
//           {success}
//         </motion.div>
//       )}

//       {/* =========================
//           STATS
//       ========================= */}

//       <div className="grid gap-4 sm:grid-cols-3">

//         <StatCard
//           title="Available Balance"
//           value={formatAmount(balance)}
//           icon={Wallet}
//         />

//         <StatCard
//           title="Total Withdrawn"
//           value={formatAmount(totalWithdrawn)}
//           icon={ArrowDownToLine}
//         />

//         <StatCard
//           title="Pending Withdrawals"
//           value={formatAmount(pendingAmount)}
//           icon={Clock3}
//         />

//       </div>

//       {/* =========================
//           REQUEST WITHDRAWAL
//       ========================= */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 15,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//       >
//         <Card>

//           <CardHeader>
//             <div className="flex items-center gap-2">

//               <ArrowDownToLine className="h-5 w-5" />

//               <CardTitle>
//                 Request Withdrawal
//               </CardTitle>

//             </div>
//           </CardHeader>

//           <CardContent>

//             <form
//               onSubmit={handleWithdrawal}
//               className="space-y-5"
//             >

//               {/* BALANCE */}

//               <div className="rounded-lg bg-muted p-4">

//                 <p className="text-sm text-muted-foreground">
//                   Available Balance
//                 </p>

//                 <p className="mt-1 text-2xl font-bold">
//                   {formatAmount(balance)}
//                 </p>

//               </div>

//               {/* AMOUNT */}

//               <div className="space-y-2">

//                 <label
//                   htmlFor="amount"
//                   className="text-sm font-medium"
//                 >
//                   Withdrawal Amount
//                 </label>

//                 <div className="relative">

//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
//                     Rs.
//                   </span>

//                   <input
//                     id="amount"
//                     type="number"
//                     min="100"
//                     max={balance}
//                     step="1"
//                     value={amount}
//                     onChange={(e) =>
//                       setAmount(e.target.value)
//                     }
//                     placeholder="Enter amount"
//                     disabled={submitting}
//                     className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
//                   />

//                 </div>

//                 <div className="flex items-center justify-between">

//                   <p className="text-xs text-muted-foreground">
//                     Minimum withdrawal is Rs. 100.
//                   </p>

//                   <p className="text-xs text-muted-foreground">
//                     Available:{" "}
//                     {formatAmount(balance)}
//                   </p>

//                 </div>

//               </div>

//               {/* SUBMIT */}

//               <Button
//                 type="submit"
//                 disabled={
//                   submitting ||
//                   balance < 100
//                 }
//                 className="w-full sm:w-auto"
//               >

//                 {submitting ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing...
//                   </>
//                 ) : (
//                   <>
//                     <ArrowDownToLine className="mr-2 h-4 w-4" />
//                     Request Withdrawal
//                   </>
//                 )}

//               </Button>

//             </form>

//           </CardContent>

//         </Card>
//       </motion.div>

//       {/* =========================
//           HISTORY
//       ========================= */}

//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 15,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           delay: 0.1,
//         }}
//       >
//         <Card>

//           <CardHeader>

//             <div className="flex items-center gap-2">

//               <History className="h-5 w-5" />

//               <CardTitle>
//                 Withdrawal History
//               </CardTitle>

//             </div>

//           </CardHeader>

//           <CardContent>

//             {loading ? (
//               <div className="flex min-h-40 items-center justify-center">

//                 <Loader2 className="h-6 w-6 animate-spin" />

//               </div>
//             ) : withdrawals.length === 0 ? (

//               <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-muted-foreground">

//                 <ArrowDownToLine className="h-10 w-10 opacity-40" />

//                 <p className="text-sm">
//                   No withdrawal history found
//                 </p>

//               </div>

//             ) : (

//               <div className="space-y-3">

//                 {withdrawals.map(
//                   (withdrawal, index) => {

//                     const status =
//                       getStatus(
//                         withdrawal.status
//                       );

//                     const StatusIcon =
//                       status.icon;

//                     return (
//                       <motion.div
//                         key={withdrawal._id}
//                         initial={{
//                           opacity: 0,
//                           x: -10,
//                         }}
//                         animate={{
//                           opacity: 1,
//                           x: 0,
//                         }}
//                         transition={{
//                           delay: index * 0.04,
//                         }}
//                         className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
//                       >

//                         {/* LEFT */}

//                         <div className="flex items-center gap-3">

//                           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

//                             <ArrowDownToLine className="h-5 w-5" />

//                           </div>

//                           <div>

//                             <p className="font-semibold">
//                               {formatAmount(
//                                 withdrawal.amount
//                               )}
//                             </p>

//                             <p className="text-xs text-muted-foreground">
//                               {formatDate(
//                                 withdrawal.createdAt
//                               )}
//                             </p>

//                           </div>

//                         </div>

//                         {/* STATUS */}

//                         <div
//                           className={`flex w - fit items - center gap - 1.5 rounded - full px - 3 py - 1.5 text - xs font - medium ${ status.className } `}
//                         >

//                           <StatusIcon className="h-4 w-4" />

//                           {status.label}

//                         </div>

//                       </motion.div>
//                     );
//                   }
//                 )}

//               </div>

//             )}

//           </CardContent>

//         </Card>
//       </motion.div>

//     </div>
//   );
// }


// /* =============================
//    STAT CARD
// ============================= */

// function StatCard({
//   title,
//   value,
//   icon: Icon,
// }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 15,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//       whileHover={{
//         y: -3,
//       }}
//     >

//       <Card>

//         <CardContent className="flex items-center justify-between p-6">

//           <div>

//             <p className="text-sm text-muted-foreground">
//               {title}
//             </p>

//             <p className="mt-1 text-2xl font-bold">
//               {value}
//             </p>

//           </div>

//           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

//             <Icon className="h-5 w-5" />

//           </div>

//         </CardContent>

//       </Card>

//     </motion.div>
//   );
// }


// /* =============================
//    STATUS
// ============================= */

// function getStatus(status) {
//   switch (status) {
//     case "approved":
//       return {
//         label: "Approved",
//         icon: CheckCircle2,
//         className:
//           "bg-green-500/10 text-green-600",
//       };

//     case "rejected":
//       return {
//         label: "Rejected",
//         icon: XCircle,
//         className:
//           "bg-destructive/10 text-destructive",
//       };

//     default:
//       return {
//         label: "Pending",
//         icon: Clock3,
//         className:
//           "bg-yellow-500/10 text-yellow-600",
//       };
//   }
// }


// /* =============================
//    DATE
// ============================= */

// function formatDate(date) {
//   if (!date) return "";

//   return new Date(date).toLocaleDateString(
//     "en-US",
//     {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     }
//   );
// }







// v3
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";

import {
  ArrowDownToLine,
  CheckCircle2,
  Clock3,
  XCircle,
  Wallet,
  Loader2,
  History,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  withdrawalsRequest,
  withdrawalsSuccess,
  withdrawalsFailure,
  withdrawalRequestStart,
  withdrawalRequestSuccess,
  withdrawalRequestFailure,
  clearWithdrawalMessage,
} from "@/redux/slices/withdrawalSlice";

import { addNotification } from "@/redux/slices/notificationSlice";

import {
  dashboardRequest,
  dashboardSuccess,
  dashboardFailure,
} from "@/redux/slices/dashboardSlice";

import {
  requestWithdrawal,
  getUserWithdrawals,
} from "@/lib/withdrawalApi";

import api from "@/lib/api";

export default function WithdrawalsPage() {
  const dispatch = useDispatch();

  // =========================
  // WITHDRAWAL STATE
  // =========================

  const {
    withdrawals,
    loading,
    submitting,
    error,
    success,
  } = useSelector((state) => state.withdrawal);

  // =========================
  // DASHBOARD STATE
  // =========================

  const dashboard = useSelector(
    (state) => state.dashboard
  );

  const {
    balance,
    user,
  } = dashboard;

  // =========================
  // LOCAL STATE
  // =========================

  const [amount, setAmount] = useState("");

  // =========================
  // FETCH DASHBOARD
  // IMPORTANT
  // =========================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        dispatch(dashboardRequest());

      
    const response = await api.get(
      "/user/api/v1/dashboard"
    );

    if (!response.data?.success) {
      throw new Error(
        response.data?.message ||
          "Failed to fetch dashboard"
      );
    }

    dispatch(
      dashboardSuccess(
        response.data.data
      )
    );

  } catch (error) {
    console.error(
      "Failed to fetch dashboard:",
      error
    );

    dispatch(
      dashboardFailure(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch dashboard"
      )
    );
  }
};

fetchDashboard();


      }, [dispatch]);

  // =========================
  // FETCH WITHDRAWAL HISTORY
  // =========================

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        dispatch(withdrawalsRequest());

        
    const response =
      await getUserWithdrawals();

    dispatch(
      withdrawalsSuccess(
        response?.data?.withdrawals || []
      )
    );

  } catch (error) {
    // No history = empty array
    if (error.response?.status === 404) {
      dispatch(
        withdrawalsSuccess([])
      );

      return;
    }

    dispatch(
      withdrawalsFailure(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch withdrawals"
      )
    );
  }
};

fetchWithdrawals();


      }, [dispatch]);

  // =========================
  // REQUEST WITHDRAWAL
  // =========================

  const handleWithdrawal = async (e) => {
    e.preventDefault();


dispatch(clearWithdrawalMessage());

const withdrawalAmount =
  Number(amount);

// =========================
// VALIDATION
// =========================

if (!withdrawalAmount) {
  dispatch(
    withdrawalRequestFailure(
      "Please enter withdrawal amount."
    )
  );

  return;
}

if (withdrawalAmount < 100) {
  dispatch(
    withdrawalRequestFailure(
      "Minimum withdrawal is Rs. 100."
    )
  );

  return;
}

if (
  withdrawalAmount >
  Number(balance || 0)
) {
  dispatch(
    withdrawalRequestFailure(
      "Insufficient balance."
    )
  );

  return;
}

try {
  dispatch(
    withdrawalRequestStart()
  );

  // =========================
  // API
  // =========================

  const response =
    await requestWithdrawal(
      withdrawalAmount
    );

  const newWithdrawal =
    response?.data?.withdrawal;

  const updatedBalance =
    Number(response?.data?.balance);

  // =========================
  // SUCCESS MESSAGE
  // =========================

  dispatch(
    withdrawalRequestSuccess(
      response?.message ||
        "Withdrawal request submitted successfully"
    )
  );

  // =========================
  // CLEAR INPUT
  // =========================

  setAmount("");

  // =========================
  // UPDATE WITHDRAWAL LIST
  // =========================

  if (newWithdrawal) {
    dispatch(
      withdrawalsSuccess([
        newWithdrawal,
        ...(withdrawals || []),
      ])
    );
  }

  // =========================
  // UPDATE BALANCE
  // =========================

  if (
    Number.isFinite(
      updatedBalance
    )
  ) {
    dispatch(
      dashboardSuccess({
        ...dashboard,
        balance: updatedBalance,
      })
    );
  } else {
    // Fallback
    dispatch(
      dashboardSuccess({
        ...dashboard,
        balance:
          Math.max(
            Number(balance || 0) -
              withdrawalAmount,
            0
          ),
      })
    );
  }

  // =========================
  // ADD INSTANT NOTIFICATION
  // =========================

  dispatch(
    addNotification({
      _id:
        newWithdrawal?._id ||
        `withdrawal - ${ Date.now() } `,

      user:
        user?.id ||
        user?._id,

      title:
        "Withdrawal Requested",

      message:
        `Your withdrawal request of Rs.${ withdrawalAmount.toLocaleString() } has been submitted successfully.`,

      amount:
        withdrawalAmount,

      status:
        "pending",

      isRead:
        false,

      createdAt:
        newWithdrawal?.createdAt ||
        new Date().toISOString(),

      orderId:
        undefined,
    })
  );

} catch (error) {
  dispatch(
    withdrawalRequestFailure(
      error.response?.data?.message ||
        error.message ||
        "Withdrawal request failed"
    )
  );
}


  };

  // =========================
  // VALUES
  // =========================

  const currentBalance =
    Number(balance || 0);

  const totalWithdrawn =
    (withdrawals || [])
      .filter(
        (item) =>
          item.status === "approved"
      )
      .reduce(
        (total, item) =>
          total +
          Number(item.amount || 0),
        0
      );

  const pendingAmount =
    (withdrawals || [])
      .filter(
        (item) =>
          item.status === "pending"
      )
      .reduce(
        (total, item) =>
          total +
          Number(item.amount || 0),
        0
      );

  // =========================
  // FORMAT AMOUNT
  // =========================

  const formatAmount = (value) => {
    return `Rs. ${Number(
      value || 0
    ).toLocaleString()}`;
  };

  // =========================
  // RENDER
  // =========================

  return (<div className="space-y-6">

    {/* HEADER */}

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
        Manage your earnings and withdrawal requests.
      </p>
    </motion.div>

    {/* ERROR */}

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

    {/* SUCCESS */}

    {success && (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600"
      >
        {success}
      </motion.div>
    )}

    {/* STATS */}

    <div className="grid gap-4 sm:grid-cols-3">

      <StatCard
        title="Available Balance"
        value={formatAmount(
          currentBalance
        )}
        icon={Wallet}
      />

      <StatCard
        title="Total Withdrawn"
        value={formatAmount(
          totalWithdrawn
        )}
        icon={ArrowDownToLine}
      />

      <StatCard
        title="Pending Withdrawals"
        value={formatAmount(
          pendingAmount
        )}
        icon={Clock3}
      />

    </div>

    {/* REQUEST WITHDRAWAL */}

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
              Request Withdrawal
            </CardTitle>

          </div>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={
              handleWithdrawal
            }
            className="space-y-5"
          >

            {/* AVAILABLE BALANCE */}

            <div className="rounded-lg bg-muted p-4">

              <p className="text-sm text-muted-foreground">
                Available Balance
              </p>

              <p className="mt-1 text-2xl font-bold">
                {formatAmount(
                  currentBalance
                )}
              </p>

            </div>

            {/* AMOUNT */}

            <div className="space-y-2">

              <label
                htmlFor="amount"
                className="text-sm font-medium"
              >
                Withdrawal Amount
              </label>

              <div className="relative">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  Rs.
                </span>

                <input
                  id="amount"
                  type="number"
                  min="100"
                  max={currentBalance}
                  step="1"
                  value={amount}
                  onChange={(e) =>
                    setAmount(
                      e.target.value
                    )
                  }
                  placeholder="Enter amount"
                  disabled={
                    submitting
                  }
                  className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

              </div>

              <div className="flex items-center justify-between">

                <p className="text-xs text-muted-foreground">
                  Minimum withdrawal is Rs. 100.
                </p>

                <p className="text-xs text-muted-foreground">
                  Available:{" "}
                  {formatAmount(
                    currentBalance
                  )}
                </p>

              </div>

            </div>

            {/* BUTTON */}

            <Button
              type="submit"
              disabled={
                submitting ||
                currentBalance < 100
              }
              className="w-full sm:w-auto"
            >

              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowDownToLine className="mr-2 h-4 w-4" />
                  Request Withdrawal
                </>
              )}

            </Button>

          </form>

        </CardContent>

      </Card>
    </motion.div>

    {/* HISTORY */}

    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.1,
      }}
    >
      <Card>

        <CardHeader>

          <div className="flex items-center gap-2">

            <History className="h-5 w-5" />

            <CardTitle>
              Withdrawal History
            </CardTitle>

          </div>

        </CardHeader>

        <CardContent>

          {loading ? (

            <div className="flex min-h-40 items-center justify-center">

              <Loader2 className="h-6 w-6 animate-spin" />

            </div>

          ) : withdrawals.length === 0 ? (

            <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-muted-foreground">

              <ArrowDownToLine className="h-10 w-10 opacity-40" />

              <p className="text-sm">
                No withdrawal history found
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {withdrawals.map(
                (
                  withdrawal,
                  index
                ) => {

                  const status =
                    getStatus(
                      withdrawal.status
                    );

                  const StatusIcon =
                    status.icon;

                  return (
                    <motion.div
                      key={
                        withdrawal._id
                      }
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.04,
                      }}
                      className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >

                      {/* LEFT */}

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

                          <ArrowDownToLine className="h-5 w-5" />

                        </div>

                        <div>

                          <p className="font-semibold">
                            {formatAmount(
                              withdrawal.amount
                            )}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {formatDate(
                              withdrawal.createdAt
                            )}
                          </p>

                        </div>

                      </div>

                      {/* STATUS */}

                      <div
                        className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}
                      >

                        <StatusIcon className="h-4 w-4" />

                        {status.label}

                      </div>

                    </motion.div>
                  );
                }
              )}

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

    < Card >

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

  </Card >

</motion.div >
    

);
}

/* =============================
STATUS
============================= */

function getStatus(status) {
switch (status) {

case "approved":
  return {
    label: "Approved",
    icon: CheckCircle2,
    className:
      "bg-green-500/10 text-green-600",
  };

case "rejected":
  return {
    label: "Rejected",
    icon: XCircle,
    className:
      "bg-destructive/10 text-destructive",
  };

default:
  return {
    label: "Pending",
    icon: Clock3,
    className:
      "bg-yellow-500/10 text-yellow-600",
  };
  

}
}

/* =============================
DATE
============================= */

function formatDate(date) {
if (!date) return "";

return new Date(
date
).toLocaleDateString(
"en-US",
{
year: "numeric",
month: "short",
day: "numeric",
}
);
}
