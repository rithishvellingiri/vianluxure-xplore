"use client";
import { motion } from "framer-motion";

export default function AuthButton({
  children,
  onClick,
  type = "button",
  variant = "primary", // 'primary' | 'secondary' | 'google'
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const isDisabled = disabled || loading;

  const baseStyles = "w-full py-4 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer outline-none select-none";

  const variants = {
    primary: `bg-primary text-background hover:bg-primary-hover hover:text-foreground hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(201,168,106,0.25)] ${
      isDisabled ? "opacity-70 cursor-not-allowed hover:scale-100 hover:shadow-none" : ""
    }`,
    secondary: `border border-border text-foreground hover:border-primary hover:text-primary hover:scale-[1.02] bg-[var(--input-bg)]/30 backdrop-blur-sm ${
      isDisabled ? "opacity-55 cursor-not-allowed hover:scale-100" : ""
    }`,
    google: `border border-border text-foreground hover:border-primary/50 hover:bg-foreground/[0.02] hover:scale-[1.01] bg-white text-gray-700 hover:shadow-sm font-semibold tracking-normal normal-case font-sans ${
      isDisabled ? "opacity-55 cursor-not-allowed hover:scale-100" : ""
    }`,
  };

  const GoogleLogo = () => (
    <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
      <path
        fill="#EA4335"
        d="M12 5.04c1.62 0 3.08.56 4.22 1.64l3.15-3.15C17.45 1.68 14.93 1 12 1 7.37 1 3.4 3.65 1.48 7.52l3.78 2.93C6.18 7.23 8.84 5.04 12 5.04z"
      />
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.74-2.38 3.58l3.7 2.87c2.16-1.99 3.41-4.92 3.41-8.6z"
      />
      <path
        fill="#FBBC05"
        d="M5.26 14.59c-.25-.75-.39-1.55-.39-2.37s.14-1.62.39-2.37L1.48 6.92C.54 8.78 0 10.83 0 13s.54 4.22 1.48 6.08l3.78-2.93z"
      />
      <path
        fill="#34A853"
        d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.03.69-2.34 1.1-3.96 1.1-3.16 0-5.82-2.19-6.78-5.13L1.48 16.1C3.4 19.97 7.37 23 12 23z"
      />
    </svg>
  );

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileTap={isDisabled ? {} : { scale: 0.985 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </div>
      ) : (
        <>
          {variant === "google" && <GoogleLogo />}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  );
}
