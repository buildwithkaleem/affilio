// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "motion/react";

// import {
//   CreditCard,
//   User,
//   Hash,
//   Save,
//   Loader2,
//   CheckCircle2,
//   WalletCards,
// } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";

// import {
//   paymentMethodRequest,
//   paymentMethodSuccess,
//   paymentMethodFailure,
//   paymentMethodSaveStart,
//   paymentMethodSaveSuccess,
//   paymentMethodSaveFailure,
//   clearPaymentMethodMessage,
// } from "@/redux/slices/paymentMethodSlice";

// import {
//   getPaymentMethod,
//   addEditPaymentMethod,
// } from "@/lib/paymentMethodApi";

// export default function PaymentMethodPage() {
//   const dispatch = useDispatch();

//   const {
//     paymentMethod,
//     loading,
//     saving,
//     error,
//     success,
//   } = useSelector(
//     (state) => state.paymentMethod
//   );

//   const [form, setForm] = useState({
//     methodType: "",
//     accountHolderName: "",
//     accountNumber: "",
//   });

//   /*
//    * Get existing payment method
//    */
//   useEffect(() => {
//     const fetchPaymentMethod = async () => {
//       try {
//         dispatch(paymentMethodRequest());

//         const response =
//           await getPaymentMethod();

//         const method =
//           response?.data?.paymentMethod || null;

//         dispatch(
//           paymentMethodSuccess(method)
//         );

//         if (method) {
//           setForm({
//             methodType:
//               method.methodType || "",
//             accountHolderName:
//               method.accountHolderName || "",
//             accountNumber:
//               method.accountNumber || "",
//           });
//         }
//       } catch (error) {
//         dispatch(
//           paymentMethodFailure(
//             error.response?.data?.message ||
//             error.message ||
//             "Failed to fetch payment method"
//           )
//         );
//       }
//     };

//     fetchPaymentMethod();
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   /*
//    * Save / Update
//    */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     dispatch(clearPaymentMethodMessage());

//     if (
//       !form.methodType ||
//       !form.accountHolderName ||
//       !form.accountNumber
//     ) {
//       dispatch(
//         paymentMethodSaveFailure(
//           "Please fill all payment details."
//         )
//       );

//       return;
//     }

//     try {
//       dispatch(paymentMethodSaveStart());

//       const response =
//         await addEditPaymentMethod(form);

//       dispatch(
//         paymentMethodSaveSuccess(
//           response?.message ||
//           "Payment method saved successfully"
//         )
//       );

//       /*
//        * Update Redux with current data
//        */
//       dispatch(
//         paymentMethodSuccess({
//           ...paymentMethod,
//           ...form,
//         })
//       );
//     } catch (error) {
//       dispatch(
//         paymentMethodSaveFailure(
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to save payment method"
//         )
//       );
//     }
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
//           Payment Method
//         </h1>

//         <p className="mt-2 text-muted-foreground">
//           Add or update the payment account used for withdrawals.
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
//           className="flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600"
//         >
//           <CheckCircle2 className="h-4 w-4" />

//           {success}
//         </motion.div>
//       )}

//       <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

//         {/* Form */}

//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 15,
//           }}
//           animate={{
//             opacity: 1,
//             y: 0,
//           }}
//         >
//           <Card>

//             <CardHeader>

//               <div className="flex items-center gap-2">

//                 <WalletCards className="h-5 w-5" />

//                 <CardTitle>
//                   {paymentMethod
//                     ? "Update Payment Method"
//                     : "Add Payment Method"}
//                 </CardTitle>

//               </div>

//             </CardHeader>

//             <CardContent>

//               {loading ? (
//                 <div className="flex min-h-60 items-center justify-center">
//                   <Loader2 className="h-6 w-6 animate-spin" />
//                 </div>
//               ) : (
//                 <form
//                   onSubmit={handleSubmit}
//                   className="space-y-5"
//                 >

//                   {/* Method Type */}

//                   <div className="space-y-2">

//                     <label
//                       htmlFor="methodType"
//                       className="text-sm font-medium"
//                     >
//                       Payment Method
//                     </label>

//                     <div className="relative">

//                       <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//                       <select
//                         id="methodType"
//                         name="methodType"
//                         value={form.methodType}
//                         onChange={handleChange}
//                         className="h-11 w-full appearance-none rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                       >

//                         <option value="">
//                           Select payment method
//                         </option>

//                         <option value="JazzCash">
//                           JazzCash
//                         </option>

//                         <option value="Easypaisa">
//                           Easypaisa
//                         </option>

//                         <option value="Bank">
//                           Bank Account
//                         </option>

//                       </select>

//                     </div>

//                   </div>

//                   {/* Account Holder */}

//                   <div className="space-y-2">

//                     <label
//                       htmlFor="accountHolderName"
//                       className="text-sm font-medium"
//                     >
//                       Account Holder Name
//                     </label>

//                     <div className="relative">

//                       <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//                       <input
//                         id="accountHolderName"
//                         name="accountHolderName"
//                         value={
//                           form.accountHolderName
//                         }
//                         onChange={handleChange}
//                         placeholder="Enter account holder name"
//                         className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                       />

//                     </div>

//                   </div>

//                   {/* Account Number */}

//                   <div className="space-y-2">

//                     <label
//                       htmlFor="accountNumber"
//                       className="text-sm font-medium"
//                     >
//                       Account Number
//                     </label>

//                     <div className="relative">

//                       <Hash className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

//                       <input
//                         id="accountNumber"
//                         name="accountNumber"
//                         value={form.accountNumber}
//                         onChange={handleChange}
//                         placeholder="Enter account number"
//                         className="h-11 w-full rounded-lg border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                       />

//                     </div>

//                   </div>

//                   <Button
//                     type="submit"
//                     disabled={saving}
//                     className="w-full sm:w-auto"
//                   >

//                     {saving ? (
//                       <>
//                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       <>
//                         <Save className="mr-2 h-4 w-4" />
//                         {paymentMethod
//                           ? "Update Payment Method"
//                           : "Save Payment Method"}
//                       </>
//                     )}

//                   </Button>

//                 </form>
//               )}

//             </CardContent>

//           </Card>
//         </motion.div>

//         {/* Information */}

//         <motion.div
//           initial={{
//             opacity: 0,
//             x: 15,
//           }}
//           animate={{
//             opacity: 1,
//             x: 0,
//           }}
//           transition={{
//             delay: 0.1,
//           }}
//         >
//           <Card>

//             <CardHeader>

//               <CardTitle>
//                 Withdrawal Account
//               </CardTitle>

//             </CardHeader>

//             <CardContent>

//               <div className="space-y-4 text-sm">

//                 <div className="rounded-lg bg-muted p-4">

//                   <p className="font-medium">
//                     Important
//                   </p>

//                   <p className="mt-1 text-muted-foreground">
//                     Your withdrawals will be sent to
//                     the payment account saved here.
//                   </p>

//                 </div>

//                 <div className="space-y-3">

//                   <InfoRow
//                     icon={CreditCard}
//                     label="Method"
//                     value={
//                       paymentMethod?.methodType ||
//                       "Not added"
//                     }
//                   />

//                   <InfoRow
//                     icon={User}
//                     label="Account Holder"
//                     value={
//                       paymentMethod?.accountHolderName ||
//                       "Not added"
//                     }
//                   />

//                   <InfoRow
//                     icon={Hash}
//                     label="Account Number"
//                     value={
//                       paymentMethod?.accountNumber ||
//                       "Not added"
//                     }
//                   />

//                 </div>

//               </div>

//             </CardContent>

//           </Card>
//         </motion.div>

//       </div>

//     </div>
//   );
// }


// /* ----------------------------- */
// /* Info Row */
// /* ----------------------------- */

// function InfoRow({
//   icon: Icon,
//   label,
//   value,
// }) {
//   return (
//     <div className="flex items-start gap-3">

//       <Icon className="mt-0.5 h-4 w-4 text-muted-foreground" />

//       <div className="min-w-0">

//         <p className="text-xs text-muted-foreground">
//           {label}
//         </p>

//         <p className="break-all font-medium">
//           {value}
//         </p>

//       </div>

//     </div>
//   );
// }






// v2
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { CreditCard, Save } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import api from "@/lib/api";

export default function PaymentMethodPage() {
  const [form, setForm] = useState({
    methodType: "",
    accountNumber: "",
    accountHolderName: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Get existing payment method
  useEffect(() => {
    const getPaymentMethod = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/user/api/v1/getPaymentMethod"
        );

        console.log("PAYMENT METHOD:", response.data);

        const paymentMethod =
          response.data?.data?.paymentMethod;

        if (paymentMethod) {
          setForm({
            methodType: paymentMethod.methodType || "",
            accountNumber: paymentMethod.accountNumber || "",
            accountHolderName:
              paymentMethod.accountHolderName || "",
          });
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Failed to fetch payment method"
        );
      } finally {
        setLoading(false);
      }
    };

    getPaymentMethod();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !form.methodType ||
      !form.accountNumber ||
      !form.accountHolderName
    ) {
      setError("All payment fields are required.");
      return;
    }

    try {
      setSaving(true);

      const response = await api.post(
        "/user/api/v1/pymentMethodAddEdit",
        form
      );

      console.log("PAYMENT METHOD SAVED:", response.data);

      setMessage(
        response.data?.message ||
        "Payment method saved successfully"
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to save payment method"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading payment method...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Payment Method
            </h1>

            <p className="text-sm text-muted-foreground">
              Add or update your withdrawal payment details.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Withdrawal Account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Success */}
              {message && (
                <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-600">
                  {message}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* Method Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Payment Method
                </label>

                <select
                  name="methodType"
                  value={form.methodType}
                  onChange={handleChange}
                  className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">
                    Select payment method
                  </option>

                  <option value="easypaisa">
                    Easypaisa
                  </option>

                  <option value="jazzcash">
                    JazzCash
                  </option>

                  <option value="bank">
                    Bank Account
                  </option>
                </select>
              </div>

              {/* Account Holder */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Account Holder Name
                </label>

                <input
                  type="text"
                  name="accountHolderName"
                  value={form.accountHolderName}
                  onChange={handleChange}
                  placeholder="Enter account holder name"
                  className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Account Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Account Number
                </label>

                <input
                  type="text"
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter account number"
                  className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Save */}
              <Button
                type="submit"
                disabled={saving}
                className="h-11 w-full"
              >
                <Save className="mr-2 h-4 w-4" />

                {saving
                  ? "Saving..."
                  : "Save Payment Method"}
              </Button>

            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}