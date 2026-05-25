"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthInput({
  label,
  id,
  type = "text",
  error,
  icon: Icon,
  value,
  onChange,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-secondary-text transition-colors duration-300"
        >
          {label}
        </label>
      )}
      
      <div className="relative w-full group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary-text/60 group-focus-within:text-primary transition-colors duration-300 pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          className={`w-full text-sm font-sans tracking-wide bg-[var(--input-bg)] border border-border text-foreground transition-all duration-300 outline-none
            ${Icon ? "pl-11" : "px-4"}
            ${isPassword ? "pr-11" : "pr-4"}
            py-3.5 md:py-4
            focus:border-primary focus:shadow-[0_0_12px_rgba(201,168,106,0.18)]
            ${error ? "border-red-500/60 focus:border-red-500 focus:shadow-[0_0_12px_rgba(239,68,68,0.15)]" : "hover:border-primary/50"}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-text/60 hover:text-primary transition-colors duration-300 cursor-pointer p-1 rounded-full hover:bg-primary/5"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-[11px] text-red-500 font-medium tracking-wide mt-1 self-start"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
