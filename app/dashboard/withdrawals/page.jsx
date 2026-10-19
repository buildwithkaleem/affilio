
// v1
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

// import { addNotification } from "@/redux/slices/notificationSlice";

// import {
//   dashboardRequest,
//   dashboardSuccess,
//   dashboardFailure,
// } from "@/redux/slices/dashboardSlice";

// import {
//   requestWithdrawal,
//   getUserWithdrawals,
// } from "@/lib/withdrawalApi";

// import api from "@/lib/api";

// export default function WithdrawalsPage() {
//   const dispatch = useDispatch();

//   // =========================
//   // WITHDRAWAL STATE
//   // =========================

//   const {
//     withdrawals,
//     loading,
//     submitting,
//     error,
//     success,
//   } = useSelector((state) => state.withdrawal);

//   // =========================
//   // DASHBOARD STATE
//   // =========================

//   const dashboard = useSelector(
//     (state) => state.dashboard
//   );

//   const {
//     balance,
//     user,
//   } = dashboard;

//   // =========================
//   // LOCAL STATE
//   // =========================

//   const [amount, setAmount] = useState("");

//   // =========================
//   // FETCH DASHBOARD
//   // IMPORTANT
//   // =========================

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         dispatch(dashboardRequest());

      
//     const response = await api.get(
//       "/user/api/v1/dashboard"
//     );

//     if (!response.data?.success) {
//       throw new Error(
//         response.data?.message ||
//           "Failed to fetch dashboard"
//       );
//     }

//     dispatch(
//       dashboardSuccess(
//         response.data.data
//       )
//     );

//   } catch (error) {
//     console.error(
//       "Failed to fetch dashboard:",
//       error
//     );

//     dispatch(
//       dashboardFailure(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to fetch dashboard"
//       )
//     );
//   }
// };

// fetchDashboard();


//       }, [dispatch]);

//   // =========================
//   // FETCH WITHDRAWAL HISTORY
//   // =========================

//   useEffect(() => {
//     const fetchWithdrawals = async () => {
//       try {
//         dispatch(withdrawalsRequest());

        
//     const response =
//       await getUserWithdrawals();

//     dispatch(
//       withdrawalsSuccess(
//         response?.data?.withdrawals || []
//       )
//     );

//   } catch (error) {
//     // No history = empty array
//     if (error.response?.status === 404) {
//       dispatch(
//         withdrawalsSuccess([])
//       );

//       return;
//     }

//     dispatch(
//       withdrawalsFailure(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to fetch withdrawals"
//       )
//     );
//   }
// };

// fetchWithdrawals();


//       }, [dispatch]);

//   // =========================
//   // REQUEST WITHDRAWAL
//   // =========================

//   const handleWithdrawal = async (e) => {
//     e.preventDefault();


// dispatch(clearWithdrawalMessage());

// const withdrawalAmount =
//   Number(amount);

// // =========================
// // VALIDATION
// // =========================

// if (!withdrawalAmount) {
//   dispatch(
//     withdrawalRequestFailure(
//       "Please enter withdrawal amount."
//     )
//   );

//   return;
// }

// if (withdrawalAmount < 100) {
//   dispatch(
//     withdrawalRequestFailure(
//       "Minimum withdrawal is Rs. 100."
//     )
//   );

//   return;
// }

// if (
//   withdrawalAmount >
//   Number(balance || 0)
// ) {
//   dispatch(
//     withdrawalRequestFailure(
//       "Insufficient balance."
//     )
//   );

//   return;
// }

// try {
//   dispatch(
//     withdrawalRequestStart()
//   );

//   // =========================
//   // API
//   // =========================

//   const response =
//     await requestWithdrawal(
//       withdrawalAmount
//     );

//   const newWithdrawal =
//     response?.data?.withdrawal;

//   const updatedBalance =
//     Number(response?.data?.balance);

//   // =========================
//   // SUCCESS MESSAGE
//   // =========================

//   dispatch(
//     withdrawalRequestSuccess(
//       response?.message ||
//         "Withdrawal request submitted successfully"
//     )
//   );

//   // =========================
//   // CLEAR INPUT
//   // =========================

//   setAmount("");

//   // =========================
//   // UPDATE WITHDRAWAL LIST
//   // =========================

//   if (newWithdrawal) {
//     dispatch(
//       withdrawalsSuccess([
//         newWithdrawal,
//         ...(withdrawals || []),
//       ])
//     );
//   }

//   // =========================
//   // UPDATE BALANCE
//   // =========================

//   if (
//     Number.isFinite(
//       updatedBalance
//     )
//   ) {
//     dispatch(
//       dashboardSuccess({
//         ...dashboard,
//         balance: updatedBalance,
//       })
//     );
//   } else {
//     // Fallback
//     dispatch(
//       dashboardSuccess({
//         ...dashboard,
//         balance:
//           Math.max(
//             Number(balance || 0) -
//               withdrawalAmount,
//             0
//           ),
//       })
//     );
//   }

//   // =========================
//   // ADD INSTANT NOTIFICATION
//   // =========================

//   dispatch(
//     addNotification({
//       _id:
//         newWithdrawal?._id ||
//         `withdrawal - ${ Date.now() } `,

//       user:
//         user?.id ||
//         user?._id,

//       title:
//         "Withdrawal Requested",

//       message:
//         `Your withdrawal request of Rs.${ withdrawalAmount.toLocaleString() } has been submitted successfully.`,

//       amount:
//         withdrawalAmount,

//       status:
//         "pending",

//       isRead:
//         false,

//       createdAt:
//         newWithdrawal?.createdAt ||
//         new Date().toISOString(),

//       orderId:
//         undefined,
//     })
//   );

// } catch (error) {
//   dispatch(
//     withdrawalRequestFailure(
//       error.response?.data?.message ||
//         error.message ||
//         "Withdrawal request failed"
//     )
//   );
// }


//   };

//   // =========================
//   // VALUES
//   // =========================

//   const currentBalance =
//     Number(balance || 0);

//   const totalWithdrawn =
//     (withdrawals || [])
//       .filter(
//         (item) =>
//           item.status === "approved"
//       )
//       .reduce(
//         (total, item) =>
//           total +
//           Number(item.amount || 0),
//         0
//       );

//   const pendingAmount =
//     (withdrawals || [])
//       .filter(
//         (item) =>
//           item.status === "pending"
//       )
//       .reduce(
//         (total, item) =>
//           total +
//           Number(item.amount || 0),
//         0
//       );

//   // =========================
//   // FORMAT AMOUNT
//   // =========================

//   const formatAmount = (value) => {
//     return `Rs. ${Number(
//       value || 0
//     ).toLocaleString()}`;
//   };

//   // =========================
//   // RENDER
//   // =========================

//   return (<div className="space-y-6">

//     {/* HEADER */}

//     <motion.div
//       initial={{
//         opacity: 0,
//         y: -10,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//     >
//       <h1 className="text-3xl font-bold tracking-tight">
//         Withdrawals
//       </h1>

//       <p className="mt-2 text-muted-foreground">
//         Manage your earnings and withdrawal requests.
//       </p>
//     </motion.div>

//     {/* ERROR */}

//     {error && (
//       <motion.div
//         initial={{
//           opacity: 0,
//         }}
//         animate={{
//           opacity: 1,
//         }}
//         className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
//       >
//         {error}
//       </motion.div>
//     )}

//     {/* SUCCESS */}

//     {success && (
//       <motion.div
//         initial={{
//           opacity: 0,
//         }}
//         animate={{
//           opacity: 1,
//         }}
//         className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600"
//       >
//         {success}
//       </motion.div>
//     )}

//     {/* STATS */}

//     <div className="grid gap-4 sm:grid-cols-3">

//       <StatCard
//         title="Available Balance"
//         value={formatAmount(
//           currentBalance
//         )}
//         icon={Wallet}
//       />

//       <StatCard
//         title="Total Withdrawn"
//         value={formatAmount(
//           totalWithdrawn
//         )}
//         icon={ArrowDownToLine}
//       />

//       <StatCard
//         title="Pending Withdrawals"
//         value={formatAmount(
//           pendingAmount
//         )}
//         icon={Clock3}
//       />

//     </div>

//     {/* REQUEST WITHDRAWAL */}

//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 15,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//     >
//       <Card>

//         <CardHeader>

//           <div className="flex items-center gap-2">

//             <ArrowDownToLine className="h-5 w-5" />

//             <CardTitle>
//               Request Withdrawal
//             </CardTitle>

//           </div>

//         </CardHeader>

//         <CardContent>

//           <form
//             onSubmit={
//               handleWithdrawal
//             }
//             className="space-y-5"
//           >

//             {/* AVAILABLE BALANCE */}

//             <div className="rounded-lg bg-muted p-4">

//               <p className="text-sm text-muted-foreground">
//                 Available Balance
//               </p>

//               <p className="mt-1 text-2xl font-bold">
//                 {formatAmount(
//                   currentBalance
//                 )}
//               </p>

//             </div>

//             {/* AMOUNT */}

//             <div className="space-y-2">

//               <label
//                 htmlFor="amount"
//                 className="text-sm font-medium"
//               >
//                 Withdrawal Amount
//               </label>

//               <div className="relative">

//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
//                   Rs.
//                 </span>

//                 <input
//                   id="amount"
//                   type="number"
//                   min="100"
//                   max={currentBalance}
//                   step="1"
//                   value={amount}
//                   onChange={(e) =>
//                     setAmount(
//                       e.target.value
//                     )
//                   }
//                   placeholder="Enter amount"
//                   disabled={
//                     submitting
//                   }
//                   className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
//                 />

//               </div>

//               <div className="flex items-center justify-between">

//                 <p className="text-xs text-muted-foreground">
//                   Minimum withdrawal is Rs. 100.
//                 </p>

//                 <p className="text-xs text-muted-foreground">
//                   Available:{" "}
//                   {formatAmount(
//                     currentBalance
//                   )}
//                 </p>

//               </div>

//             </div>

//             {/* BUTTON */}

//             <Button
//               type="submit"
//               disabled={
//                 submitting ||
//                 currentBalance < 100
//               }
//               className="w-full sm:w-auto"
//             >

//               {submitting ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <ArrowDownToLine className="mr-2 h-4 w-4" />
//                   Request Withdrawal
//                 </>
//               )}

//             </Button>

//           </form>

//         </CardContent>

//       </Card>
//     </motion.div>

//     {/* HISTORY */}

//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 15,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//       transition={{
//         delay: 0.1,
//       }}
//     >
//       <Card>

//         <CardHeader>

//           <div className="flex items-center gap-2">

//             <History className="h-5 w-5" />

//             <CardTitle>
//               Withdrawal History
//             </CardTitle>

//           </div>

//         </CardHeader>

//         <CardContent>

//           {loading ? (

//             <div className="flex min-h-40 items-center justify-center">

//               <Loader2 className="h-6 w-6 animate-spin" />

//             </div>

//           ) : withdrawals.length === 0 ? (

//             <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-muted-foreground">

//               <ArrowDownToLine className="h-10 w-10 opacity-40" />

//               <p className="text-sm">
//                 No withdrawal history found
//               </p>

//             </div>

//           ) : (

//             <div className="space-y-3">

//               {withdrawals.map(
//                 (
//                   withdrawal,
//                   index
//                 ) => {

//                   const status =
//                     getStatus(
//                       withdrawal.status
//                     );

//                   const StatusIcon =
//                     status.icon;

//                   return (
//                     <motion.div
//                       key={
//                         withdrawal._id
//                       }
//                       initial={{
//                         opacity: 0,
//                         x: -10,
//                       }}
//                       animate={{
//                         opacity: 1,
//                         x: 0,
//                       }}
//                       transition={{
//                         delay:
//                           index * 0.04,
//                       }}
//                       className="flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between"
//                     >

//                       {/* LEFT */}

//                       <div className="flex items-center gap-3">

//                         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

//                           <ArrowDownToLine className="h-5 w-5" />

//                         </div>

//                         <div>

//                           <p className="font-semibold">
//                             {formatAmount(
//                               withdrawal.amount
//                             )}
//                           </p>

//                           <p className="text-xs text-muted-foreground">
//                             {formatDate(
//                               withdrawal.createdAt
//                             )}
//                           </p>

//                         </div>

//                       </div>

//                       {/* STATUS */}

//                       <div
//                         className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${status.className}`}
//                       >

//                         <StatusIcon className="h-4 w-4" />

//                         {status.label}

//                       </div>

//                     </motion.div>
//                   );
//                 }
//               )}

//             </div>

//           )}

//         </CardContent>

//       </Card>
//     </motion.div>

//   </div>


// );
// }

// /* =============================
// STAT CARD
// ============================= */

// function StatCard({
// title,
// value,
// icon: Icon,
// }) {
// return (
// <motion.div
// initial={{
// opacity: 0,
// y: 15,
// }}
// animate={{
// opacity: 1,
// y: 0,
// }}
// whileHover={{
// y: -3,
// }}
// >

//     < Card >

//     <CardContent className="flex items-center justify-between p-6">

//       <div>

//         <p className="text-sm text-muted-foreground">
//           {title}
//         </p>

//         <p className="mt-1 text-2xl font-bold">
//           {value}
//         </p>

//       </div>

//       <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">

//         <Icon className="h-5 w-5" />

//       </div>

//     </CardContent>

//   </Card >

// </motion.div >
    

// );
// }

// /* =============================
// STATUS
// ============================= */

// function getStatus(status) {
// switch (status) {

// case "approved":
//   return {
//     label: "Approved",
//     icon: CheckCircle2,
//     className:
//       "bg-green-500/10 text-green-600",
//   };

// case "rejected":
//   return {
//     label: "Rejected",
//     icon: XCircle,
//     className:
//       "bg-destructive/10 text-destructive",
//   };

// default:
//   return {
//     label: "Pending",
//     icon: Clock3,
//     className:
//       "bg-yellow-500/10 text-yellow-600",
//   };
  

// }
// }

// /* =============================
// DATE
// ============================= */

// function formatDate(date) {
// if (!date) return "";

// return new Date(
// date
// ).toLocaleDateString(
// "en-US",
// {
// year: "numeric",
// month: "short",
// day: "numeric",
// }
// );
// }






// v2
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
  CircleAlert,
  ShieldCheck,
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

  const { balance, user } = dashboard;

  // =========================
  // LOCAL STATE
  // =========================

  const [amount, setAmount] = useState("");

  // =========================
  // FETCH DASHBOARD
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
    if (error.response?.status === 404) {
      dispatch(withdrawalsSuccess([]));
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

if (!amount || !withdrawalAmount) {
  dispatch(
    withdrawalRequestFailure(
      "Please enter a withdrawal amount."
    )
  );
  return;
}

if (withdrawalAmount < 100) {
  dispatch(
    withdrawalRequestFailure(
      "Minimum withdrawal amount is Rs. 100."
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

  const response =
    await requestWithdrawal(
      withdrawalAmount
    );

  const newWithdrawal =
    response?.data?.withdrawal;

  const updatedBalance =
    Number(response?.data?.balance);

  // =========================
  // SUCCESS
  // =========================

  dispatch(
    withdrawalRequestSuccess(
      response?.message ||
        "Withdrawal request submitted successfully."
    )
  );

  // =========================
  // CLEAR INPUT
  // =========================

  setAmount("");

  // =========================
  // UPDATE HISTORY
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
    dispatch(
      dashboardSuccess({
        ...dashboard,
        balance: Math.max(
          Number(balance || 0) -
            withdrawalAmount,
          0
        ),
      })
    );
  }

  // =========================
  // INSTANT NOTIFICATION
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
        "Withdrawal request failed."
    )
  );
}


  };

  // =========================
  // VALUES
  // =========================

  const currentBalance =
    Number(balance || 0);

  const safeWithdrawals =
    Array.isArray(withdrawals)
      ? withdrawals
      : [];

  const totalWithdrawn =
    safeWithdrawals
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
    safeWithdrawals
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

  const formatAmount = (value) =>
    `Rs. ${Number(
      value || 0
    ).toLocaleString()}`;

  // =========================
  // RENDER
  // =========================

  return (<div className="mx-auto w-full max-w-6xl space-y-7">

    
    {/* =========================
      HEADER
  ========================= */}

    <motion.div
      initial={{
        opacity: 0,
        y: -12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.35,
      }}
    >
      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/10">
          <ArrowDownToLine className="h-6 w-6 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Withdrawals
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your earnings and withdrawal
            requests.
          </p>
        </div>

      </div>
    </motion.div>

    {/* =========================
      ALERTS
  ========================= */}

    {error && (
      <motion.div
        initial={{
          opacity: 0,
          y: -6,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4"
      >
        <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

        <div>
          <p className="text-sm font-semibold text-destructive">
            Withdrawal error
          </p>

          <p className="mt-0.5 text-xs text-destructive/80">
            {error}
          </p>
        </div>
      </motion.div>
    )}

    {success && (
      <motion.div
        initial={{
          opacity: 0,
          y: -6,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

        <div>
          <p className="text-sm font-semibold text-green-700 dark:text-green-400">
            Withdrawal request submitted
          </p>

          <p className="mt-0.5 text-xs text-green-700/80 dark:text-green-400/80">
            {success}
          </p>
        </div>
      </motion.div>
    )}

    {/* =========================
      STATS
  ========================= */}

    <div className="grid gap-4 sm:grid-cols-3">

      <StatCard
        title="Available Balance"
        value={formatAmount(
          currentBalance
        )}
        icon={Wallet}
        description="Available for withdrawal"
      />

      <StatCard
        title="Total Withdrawn"
        value={formatAmount(
          totalWithdrawn
        )}
        icon={ArrowDownToLine}
        description="Successfully withdrawn"
      />

      <StatCard
        title="Pending Withdrawals"
        value={formatAmount(
          pendingAmount
        )}
        icon={Clock3}
        description="Awaiting approval"
      />

    </div>

    {/* =========================
      MAIN GRID
  ========================= */}

    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">

      {/* =========================
        REQUEST WITHDRAWAL
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
        <Card className="h-full overflow-hidden border-border/60 shadow-sm">

          <CardHeader className="border-b bg-muted/20 px-6 py-5">

            <div className="flex items-center justify-between gap-4">

              <div>
                <CardTitle className="text-base">
                  Request Withdrawal
                </CardTitle>

                <p className="mt-1 text-xs text-muted-foreground">
                  Enter the amount you want to
                  withdraw.
                </p>
              </div>

              <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
                <ArrowDownToLine className="h-4 w-4" />
              </div>

            </div>

          </CardHeader>

          <CardContent className="p-6">

            <form
              onSubmit={handleWithdrawal}
              className="space-y-6"
            >

              {/* BALANCE */}

              <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-primary/[0.04] p-5">

                <div className="relative z-10">

                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Wallet className="h-4 w-4" />
                    Available Balance
                  </div>

                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    {formatAmount(
                      currentBalance
                    )}
                  </p>

                  {currentBalance < 100 && (
                    <p className="mt-2 text-xs text-destructive">
                      Minimum balance of Rs. 100
                      required for withdrawal.
                    </p>
                  )}

                </div>

              </div>

              {/* AMOUNT */}

              <div className="space-y-2">

                <div className="flex items-center justify-between">

                  <label
                    htmlFor="amount"
                    className="text-sm font-semibold"
                  >
                    Withdrawal Amount
                  </label>

                  <span className="text-[11px] text-muted-foreground">
                    Min. Rs. 100
                  </span>

                </div>

                <div className="relative">

                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                    Rs.
                  </span>

                  <input
                    id="amount"
                    type="number"
                    min="100"
                    max={currentBalance}
                    step="1"
                    value={amount}
                    onChange={(e) => {
                      setAmount(
                        e.target.value
                      );

                      if (error) {
                        dispatch(
                          clearWithdrawalMessage()
                        );
                      }
                    }}
                    placeholder="Enter amount"
                    disabled={submitting}
                    className="h-12 w-full rounded-xl border border-border/70 bg-background pl-10 pr-4 text-sm font-medium outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>

                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>
                    Enter the amount in PKR.
                  </span>

                  <span>
                    Available{" "}
                    {formatAmount(
                      currentBalance
                    )}
                  </span>
                </div>

              </div>

              {/* QUICK AMOUNTS */}

              {currentBalance >= 100 && (
                <div className="space-y-2">

                  <p className="text-xs font-medium text-muted-foreground">
                    Quick select
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {[100, 500, 1000].map(
                      (quickAmount) => {

                        if (
                          quickAmount >
                          currentBalance
                        ) {
                          return null;
                        }

                        return (
                          <button
                            key={
                              quickAmount
                            }
                            type="button"
                            disabled={
                              submitting
                            }
                            onClick={() =>
                              setAmount(
                                String(
                                  quickAmount
                                )
                              )
                            }
                            className={`rounded-lg cursor-pointer border px-3 py-1.5 text-xs font-medium transition-all hover:border-primary/40 hover:bg-primary/5 ${Number(
                              amount
                            ) ===
                                quickAmount
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border/70 text-muted-foreground"
                              }`}
                          >
                            Rs.{" "}
                            {quickAmount.toLocaleString()}
                          </button>
                        );
                      }
                    )}

                    {currentBalance >= 100 && (
                      <button
                        type="button"
                        disabled={
                          submitting
                        }
                        onClick={() =>
                          setAmount(
                            String(
                              currentBalance
                            )
                          )
                        }
                        className="rounded-lg border border-border/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/5"
                      >
                        Max
                      </button>
                    )}

                  </div>

                </div>
              )}

              {/* INFO */}

              <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">

                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />

                <p className="text-[11px] leading-4 text-muted-foreground">
                  Your withdrawal request will be
                  reviewed before the payment is
                  processed. Make sure your payment
                  method details are correct.
                </p>

              </div>

              {/* BUTTON */}

              <Button
                type="submit"
                disabled={
                  submitting ||
                  currentBalance < 100
                }
                className="h-12 w-full rounded-xl font-semibold cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Request...
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

      {/* =========================
        WITHDRAWAL SUMMARY
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
        transition={{
          delay: 0.08,
        }}
      >
        <Card className="h-full border-border/60 shadow-sm">

          <CardHeader className="border-b bg-muted/20 px-6 py-5">

            <CardTitle className="text-base">
              Withdrawal Summary
            </CardTitle>

            <p className="text-xs text-muted-foreground">
              Overview of your withdrawal activity.
            </p>

          </CardHeader>

          <CardContent className="space-y-4 p-6">

            <SummaryRow
              label="Available Balance"
              value={formatAmount(
                currentBalance
              )}
            />

            <SummaryRow
              label="Total Withdrawn"
              value={formatAmount(
                totalWithdrawn
              )}
            />

            <SummaryRow
              label="Pending Amount"
              value={formatAmount(
                pendingAmount
              )}
            />

            <SummaryRow
              label="Total Requests"
              value={safeWithdrawals.length}
            />

            <div className="my-2 border-t" />

            <div className="rounded-xl bg-muted/40 p-4">

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-muted-foreground" />

                <p className="text-xs font-semibold">
                  Withdrawal status
                </p>
              </div>

              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Pending requests are reviewed by the
                admin. Once approved, your withdrawal
                will be processed using your saved
                payment method.
              </p>

            </div>

          </CardContent>

        </Card>
      </motion.div>

    </div>

    {/* =========================
      HISTORY
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
      transition={{
        delay: 0.12,
      }}
    >
      <Card className="overflow-hidden border-border/60 shadow-sm">

        <CardHeader className="border-b bg-muted/20 px-6 py-5">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <History className="h-4 w-4" />
              </div>

              <div>
                <CardTitle className="text-base">
                  Withdrawal History
                </CardTitle>

                <p className="mt-1 text-xs text-muted-foreground">
                  Track all your withdrawal requests.
                </p>
              </div>

            </div>

            {safeWithdrawals.length > 0 && (
              <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-muted-foreground">
                {safeWithdrawals.length}{" "}
                {safeWithdrawals.length === 1
                  ? "request"
                  : "requests"}
              </span>
            )}

          </div>

        </CardHeader>

        <CardContent className="p-6">

          {loading ? (

            /* LOADING */

            <div className="space-y-3">

              {[1, 2, 3].map(
                (item) => (
                  <div
                    key={item}
                    className="flex animate-pulse items-center justify-between rounded-xl border p-4"
                  >
                    <div className="flex items-center gap-3">

                      <div className="h-10 w-10 rounded-xl bg-muted" />

                      <div className="space-y-2">
                        <div className="h-4 w-28 rounded bg-muted" />
                        <div className="h-3 w-20 rounded bg-muted" />
                      </div>

                    </div>

                    <div className="h-7 w-20 rounded-full bg-muted" />
                  </div>
                )
              )}

            </div>

          ) : safeWithdrawals.length === 0 ? (

            /* EMPTY */

            <div className="flex min-h-48 flex-col items-center justify-center text-center">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                <ArrowDownToLine className="h-7 w-7 text-muted-foreground/50" />
              </div>

              <p className="text-sm font-semibold">
                No withdrawal history
              </p>

              <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                Your withdrawal requests will appear
                here once you submit one.
              </p>

            </div>

          ) : (

            /* HISTORY LIST */

            <div className="space-y-3">

              {safeWithdrawals.map(
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
                        x: -8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.04,
                      }}
                      className="group flex flex-col gap-4 rounded-xl border border-border/60 p-4 transition-all duration-200 hover:border-primary/20 hover:bg-muted/20 sm:flex-row sm:items-center sm:justify-between"
                    >

                      {/* LEFT */}

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                          <ArrowDownToLine className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">

                          <p className="font-semibold">
                            {formatAmount(
                              withdrawal.amount
                            )}
                          </p>

                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {formatDate(
                              withdrawal.createdAt
                            )}
                          </p>

                        </div>

                      </div>

                      {/* RIGHT */}

                      <div className="flex items-center justify-between gap-4 sm:justify-end">

                        <span className="text-xs text-muted-foreground">
                          Withdrawal
                        </span>

                        <div
                          className={`flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />

                          {status.label}
                        </div>

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
description,
}) {
return (
<motion.div
initial={{
opacity: 0,
y: 12,
}}
animate={{
opacity: 1,
y: 0,
}}
whileHover={{
y: -3,
}}
transition={{
duration: 0.25,
}}
> <Card className="border-border/60 shadow-sm transition-shadow hover:shadow-md">


    < CardContent className = "flex items-center justify-between gap-4 p-5" >

      <div className="min-w-0">

        <p className="text-xs font-medium text-muted-foreground">
          {title}
        </p>

        <p className="mt-1 truncate text-xl font-bold tracking-tight sm:text-2xl">
          {value}
        </p>

        <p className="mt-1 text-[10px] text-muted-foreground">
          {description}
        </p>

      </div>

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted">
        <Icon className="h-5 w-5 text-muted-foreground" />
      </div>

    </CardContent >

  </Card >
</motion.div >
    

);
}

/* =============================
SUMMARY ROW
============================= */

function SummaryRow({
label,
value,
}) {
return ( <div className="flex items-center justify-between gap-4 rounded-lg px-1 py-2"> <span className="text-xs text-muted-foreground">
{label} </span>


    < span className = "text-sm font-semibold" >
    {
      typeof value === "number"
        ? value.toLocaleString()
        : value
    }
  </span >
</div >
    

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
"bg-green-500/10 text-green-600 dark:text-green-400",
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
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  };
  

}
}

/* =============================
DATE
============================= */

function formatDate(date) {
if (!date) return "";

return new Date(date).toLocaleDateString(
"en-US",
{
year: "numeric",
month: "short",
day: "numeric",
}
);
}

