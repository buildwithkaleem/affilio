// "use client";

// export default function InputField({
//   label,
//   type = "text",
//   name,
//   value,
//   placeholder,
//   onChange,
// }) {
//   return (
//     <div className="w-full">

//       {/* Label */}
//       {label && (
//         <label className="block mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
//           {label}
//         </label>
//       )}

//       {/* Input */}
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         required
//         className="w-full p-3 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-900 dark:text-white"
//       />
//     </div>
//   );
// }





// v2

"use client";

import { Mail, UserRound, Hash, Link as LinkIcon } from "lucide-react";

const iconMap = {
  email: Mail,
  username: UserRound,
  name: UserRound,
  number: Hash,
  url: LinkIcon,
};

export default function InputField({
  label,
  type = "text",
  name,
  value,
  placeholder = "",
  onChange,
  required = true,
  disabled = false,
  autoComplete,
  error,
  icon,
  id,
}) {
  const inputId = id || name;
  const Icon = icon || iconMap[name?.toLowerCase()];

  return (
    <div className="w-full space-y-2">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground"
        >
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            // className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary"
          />
        )}

        <input
          id={inputId}
          type={type}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          // className={`
          //   h-11 w-full rounded-lg border bg-background
          //   // ${Icon ? "pl-10" : "pl-3.5"}
          //    pr-3.5
          //   text-sm text-foreground
          //   placeholder:text-muted-foreground
          //   outline-none transition-all
          //   disabled:cursor-not-allowed disabled:opacity-50
          //   ${error
          //     ? "border-destructive focus-visible:ring-2 focus-visible:ring-destructive/20"
          //     : "border-input hover:border-emerald-600/50 focus-visible:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-600/20"
          //   }
          // `}
          className={`h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-primary focus:ring-4 focus:ring-primary/10 
            ${error ? "border-destructive focus-visible:ring-2 focus-visible:ring-destructive/20"
            : "border-input hover:border-b-gray-700/50"
            }
            `}
        />
      </div>

      {/* Validation Error */}
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-xs font-medium text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
