
// v2
// "use client";

// import { useEffect, useState } from "react";
// import { motion } from "motion/react";
// import { CreditCard, Save } from "lucide-react";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// import api from "@/lib/api";

// export default function PaymentMethodPage() {
//   const [form, setForm] = useState({
//     methodType: "",
//     accountNumber: "",
//     accountHolderName: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // Get existing payment method
//   useEffect(() => {
//     const getPaymentMethod = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await api.get(
//           "/user/api/v1/getPaymentMethod"
//         );

//         console.log("PAYMENT METHOD:", response.data);

//         const paymentMethod =
//           response.data?.data?.paymentMethod;

//         if (paymentMethod) {
//           setForm({
//             methodType: paymentMethod.methodType || "",
//             accountNumber: paymentMethod.accountNumber || "",
//             accountHolderName:
//               paymentMethod.accountHolderName || "",
//           });
//         }
//       } catch (err) {
//         setError(
//           err.response?.data?.message ||
//           "Failed to fetch payment method"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPaymentMethod();
//   }, []);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");
//     setMessage("");

//     if (
//       !form.methodType ||
//       !form.accountNumber ||
//       !form.accountHolderName
//     ) {
//       setError("All payment fields are required.");
//       return;
//     }

//     try {
//       setSaving(true);

//       const response = await api.post(
//         "/user/api/v1/pymentMethodAddEdit",
//         form
//       );

//       console.log("PAYMENT METHOD SAVED:", response.data);

//       setMessage(
//         response.data?.message ||
//         "Payment method saved successfully"
//       );
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         "Failed to save payment method"
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-96 items-center justify-center">
//         <p className="text-sm text-muted-foreground">
//           Loading payment method...
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto w-full max-w-2xl space-y-6">

//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
//             <CreditCard className="h-5 w-5 text-primary" />
//           </div>

//           <div>
//             <h1 className="text-2xl font-bold">
//               Payment Method
//             </h1>

//             <p className="text-sm text-muted-foreground">
//               Add or update your withdrawal payment details.
//             </p>
//           </div>
//         </div>
//       </motion.div>

//       {/* Card */}
//       <motion.div
//         initial={{ opacity: 0, y: 15 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <Card>
//           <CardHeader>
//             <CardTitle>
//               Withdrawal Account
//             </CardTitle>
//           </CardHeader>

//           <CardContent>
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-5"
//             >

//               {/* Success */}
//               {message && (
//                 <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-600">
//                   {message}
//                 </div>
//               )}

//               {/* Error */}
//               {error && (
//                 <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
//                   {error}
//                 </div>
//               )}

//               {/* Method Type */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">
//                   Payment Method
//                 </label>

//                 <select
//                   name="methodType"
//                   value={form.methodType}
//                   onChange={handleChange}
//                   className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 >
//                   <option value="">
//                     Select payment method
//                   </option>

//                   <option value="easypaisa">
//                     Easypaisa
//                   </option>

//                   <option value="jazzcash">
//                     JazzCash
//                   </option>

//                   <option value="bank">
//                     Bank Account
//                   </option>
//                 </select>
//               </div>

//               {/* Account Holder */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">
//                   Account Holder Name
//                 </label>

//                 <input
//                   type="text"
//                   name="accountHolderName"
//                   value={form.accountHolderName}
//                   onChange={handleChange}
//                   placeholder="Enter account holder name"
//                   className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* Account Number */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">
//                   Account Number
//                 </label>

//                 <input
//                   type="text"
//                   name="accountNumber"
//                   value={form.accountNumber}
//                   onChange={handleChange}
//                   placeholder="Enter account number"
//                   className="h-11 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
//                 />
//               </div>

//               {/* Save */}
//               <Button
//                 type="submit"
//                 disabled={saving}
//                 className="h-11 w-full"
//               >
//                 <Save className="mr-2 h-4 w-4" />

//                 {saving
//                   ? "Saving..."
//                   : "Save Payment Method"}
//               </Button>

//             </form>
//           </CardContent>
//         </Card>
//       </motion.div>
//     </div>
//   );
// }





// v3
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  CreditCard,
  Save,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Building2,
  WalletCards,
  ShieldCheck,
  Loader2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  // ==============================
  // GET PAYMENT METHOD
  // ==============================

  useEffect(() => {
    const getPaymentMethod = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          "/user/api/v1/getPaymentMethod"
        );

        const paymentMethod =
          response.data?.data?.paymentMethod;

        if (paymentMethod) {
          setForm({
            methodType:
              paymentMethod.methodType || "",
            accountNumber:
              paymentMethod.accountNumber || "",
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

  // ==============================
  // HANDLE CHANGE
  // ==============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear messages when user edits form
    if (error) setError("");
    if (message) setMessage("");
  };

  // ==============================
  // SUBMIT
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (
      !form.methodType ||
      !form.accountNumber.trim() ||
      !form.accountHolderName.trim()
    ) {
      setError(
        "Please complete all payment details."
      );
      return;
    }

    try {
      setSaving(true);

      const response = await api.post(
        "/user/api/v1/pymentMethodAddEdit",
        {
          methodType: form.methodType,
          accountNumber:
            form.accountNumber.trim(),
          accountHolderName:
            form.accountHolderName.trim(),
        }
      );

      setMessage(
        response.data?.message ||
        "Payment method saved successfully."
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

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-6">

        <div className="animate-pulse space-y-3">
          <div className="h-7 w-48 rounded-lg bg-muted" />
          <div className="h-4 w-80 rounded bg-muted" />
        </div>

        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="h-11 w-full rounded-lg bg-muted animate-pulse" />
            <div className="h-11 w-full rounded-lg bg-muted animate-pulse" />
            <div className="h-11 w-full rounded-lg bg-muted animate-pulse" />
            <div className="h-11 w-full rounded-lg bg-muted animate-pulse" />
          </CardContent>
        </Card>

      </div>
    );
  }

  // ==============================
  // METHOD CONFIG
  // ==============================

  const paymentMethods = [
    {
      value: "easypaisa",
      label: "Easypaisa",
      description: "Receive withdrawals through Easypaisa",
      icon: Smartphone,
    },
    {
      value: "jazzcash",
      label: "JazzCash",
      description: "Receive withdrawals through JazzCash",
      icon: WalletCards,
    },
    {
      value: "bank",
      label: "Bank Account",
      description: "Receive withdrawals directly into your bank",
      icon: Building2,
    },
  ];

  const selectedMethod = paymentMethods.find(
    (method) =>
      method.value === form.methodType
  );

  const SelectedIcon =
    selectedMethod?.icon || CreditCard;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">

      {/* ==============================
          PAGE HEADER
      ============================== */}

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
            <CreditCard className="h-6 w-6 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Payment Method
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Add or update your payment details for
              receiving affiliate withdrawals.
            </p>
          </div>

        </div>
      </motion.div>

      {/* ==============================
          MAIN CARD
      ============================== */}

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
          duration: 0.4,
          delay: 0.05,
        }}
      >
        <Card className="overflow-hidden border-border/60 shadow-sm">

          {/* CARD HEADER */}

          <CardHeader className="border-b bg-muted/20 px-6 py-5">

            <div className="flex items-center justify-between gap-4">

              <div>
                <CardTitle className="text-base">
                  Withdrawal Account
                </CardTitle>

                <p className="mt-1 text-xs text-muted-foreground">
                  This account will be used to send your
                  approved affiliate earnings.
                </p>
              </div>

              <div className="hidden rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-600 sm:flex sm:items-center sm:gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Secure
              </div>

            </div>

          </CardHeader>

          <CardContent className="p-6">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* ==============================
                  SUCCESS MESSAGE
              ============================== */}

              {message && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
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
                      Payment method saved
                    </p>

                    <p className="mt-0.5 text-xs text-green-700/80 dark:text-green-400/80">
                      {message}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ==============================
                  ERROR MESSAGE
              ============================== */}

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/10 p-4"
                >
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

                  <div>
                    <p className="text-sm font-semibold text-destructive">
                      Unable to save
                    </p>

                    <p className="mt-0.5 text-xs text-destructive/80">
                      {error}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ==============================
                  PAYMENT METHOD
              ============================== */}

              <div className="space-y-3">

                <div>
                  <label className="text-sm font-semibold">
                    Payment Method
                  </label>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Select where you want to receive your
                    affiliate earnings.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">

                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    const selected =
                      form.methodType ===
                      method.value;

                    return (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            methodType:
                              method.value,
                          }))
                        }
                        className={`group relative flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-200 ${selected
                            ? "border-primary bg-primary/[0.06] shadow-sm ring-1 ring-primary/20"
                            : "border-border/70 bg-background hover:border-primary/40 hover:bg-muted/40"
                          }`}
                      >

                        {/* CHECK */}

                        {selected && (
                          <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </span>
                        )}

                        <div
                          className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${selected
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground group-hover:text-foreground"
                            }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <p className="text-sm font-semibold">
                          {method.label}
                        </p>

                        <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                          {method.description}
                        </p>

                      </button>
                    );
                  })}

                </div>

              </div>

              {/* ==============================
                  ACCOUNT HOLDER
              ============================== */}

              <div className="space-y-2">

                <label
                  htmlFor="accountHolderName"
                  className="text-sm font-semibold"
                >
                  Account Holder Name
                </label>

                <input
                  id="accountHolderName"
                  type="text"
                  name="accountHolderName"
                  value={form.accountHolderName}
                  onChange={handleChange}
                  placeholder="Enter account holder name"
                  autoComplete="name"
                  disabled={saving}
                  className="h-11 w-full rounded-xl border border-border/70 bg-background px-3.5 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <p className="text-[11px] text-muted-foreground">
                  Enter the name exactly as registered on
                  your payment account.
                </p>

              </div>

              {/* ==============================
                  ACCOUNT NUMBER
              ============================== */}

              <div className="space-y-2">

                <label
                  htmlFor="accountNumber"
                  className="text-sm font-semibold"
                >
                  {form.methodType === "bank"
                    ? "Account Number / IBAN"
                    : "Mobile Account Number"}
                </label>

                <div className="relative">

                  <SelectedIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <input
                    id="accountNumber"
                    type="text"
                    name="accountNumber"
                    value={form.accountNumber}
                    onChange={handleChange}
                    placeholder={
                      form.methodType === "bank"
                        ? "Enter account number or IBAN"
                        : "03XX XXXXXXX"
                    }
                    autoComplete="off"
                    disabled={saving}
                    className="h-11 w-full rounded-xl border border-border/70 bg-background pl-10 pr-3.5 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                </div>

                <p className="text-[11px] text-muted-foreground">
                  Make sure these details are correct before
                  saving.
                </p>

              </div>

              {/* ==============================
                  SECURITY NOTE
              ============================== */}

              <div className="flex gap-3 rounded-xl border border-border/60 bg-muted/30 p-4">

                <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-muted-foreground" />

                <div>
                  <p className="text-xs font-semibold">
                    Keep your payment details accurate
                  </p>

                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                    Withdrawals are processed using the
                    payment information saved here. Incorrect
                    details may delay your payment.
                  </p>
                </div>

              </div>

              {/* ==============================
                  SAVE BUTTON
              ============================== */}

              <div className="flex flex-col-reverse gap-3 border-t border-border/60 pt-5 sm:flex-row sm:justify-end">

                <Button
                  type="submit"
                  disabled={saving}
                  className="h-11 w-full rounded-xl px-6 sm:w-auto"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Payment Method
                    </>
                  )}
                </Button>

              </div>

            </form>

          </CardContent>

        </Card>
      </motion.div>

    </div>
  );
}