// "use client";

// import { useState } from "react";
// import { IoEye, IoEyeOff } from "react-icons/io5";

// export default function PasswordInput({
//   value,
//   onChange,
//   name = "password",
//   placeholder = "Enter Password",
//   label = "Password", // 👈 NEW
// }) {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="w-full">

//       {/* 🔤 LABEL */}
//       <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
//         {label}
//       </label>

//       <div className="relative">
//         <input
//           type={showPassword ? "text" : "password"}
//           name={name}
//           placeholder={placeholder}
//           value={value}
//           onChange={onChange}
//           required
//           className="w-full p-3 pr-10 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
//         />

//         {/* 👁 Toggle */}
//         <button
//           type="button"
//           onClick={() => setShowPassword(!showPassword)}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
//         >
//           {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
//         </button>
//       </div>

//     </div>
//   );
// }





// v2
"use client";

import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function PasswordInput({
  value,
  onChange,
  name = "password",
  placeholder = "Enter your password",
  label = "Password",
  required = true,
  disabled = false,
  autoComplete = "current-password",
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full space-y-2">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>

      {/* Input */}
      <div className="relative">
        <LockKeyhole
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          id={name}
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`
            h-11 w-full rounded-lg border bg-background
            pl-10 pr-12 text-sm text-foreground
            placeholder:text-muted-foreground
            outline-none transition-all
// focus:border-primary focus:ring-4 focus:ring-primary/10
            focus-visible:border-primary-600
            focus-visible:ring-2 focus-visible:ring-primary-600/20
            disabled:cursor-not-allowed disabled:opacity-50
            ${error
              ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
              : "border-input hover:border-b-gray-700/50"}
          `}
        />

        {/* Show / Hide Password */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            rounded-md p-1 text-muted-foreground
            transition-colors hover:text-emerald-600
            focus-visible:outline-none
            focus-visible:ring-2 focus-visible:ring-emerald-600
            disabled:cursor-not-allowed disabled:opacity-50
          "
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>

      {/* Validation Error */}
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
