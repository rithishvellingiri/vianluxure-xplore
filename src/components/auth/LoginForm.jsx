"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Hydrate email if rememberMe was saved
  useEffect(() => {
    const savedEmail = localStorage.getItem("vian-luxure-remembered-email");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
    if (apiError) setApiError("");
  };

  const validate = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Handle remember-me preference
        if (rememberMe) {
          localStorage.setItem("vian-luxure-remembered-email", formData.email);
        } else {
          localStorage.removeItem("vian-luxure-remembered-email");
        }
        
        // Dynamic smooth navigation delay for premium experience
        router.push("/");
      } else {
        setApiError(result.message);
      }
    } catch (error) {
      setApiError("A connection error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AnimatePresence>
        {apiError && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="p-4 bg-red-500/10 border border-red-500/25 text-red-500 text-xs font-light leading-relaxed tracking-wide"
          >
            {apiError}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-5">
        <AuthInput
          label="Email Address"
          id="email"
          type="email"
          placeholder="e.g. guest@vianluxure.com"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <AuthInput
          label="Password"
          id="password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
        />
      </div>

      <div className="flex items-center justify-between text-xs tracking-wide">
        <label className="flex items-center space-x-2.5 cursor-pointer select-none text-secondary-text hover:text-foreground transition-colors duration-300">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded-none border-border bg-[var(--input-bg)] text-primary focus:ring-1 focus:ring-primary/40 focus:ring-offset-0 cursor-pointer accent-primary"
          />
          <span className="font-medium text-[11px] md:text-xs">Remember Me</span>
        </label>
        
        <Link
          href="/forgot-password"
          className="font-semibold text-primary hover:text-primary-hover transition-colors duration-300 text-[11px] md:text-xs"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="space-y-4 pt-2">
        <AuthButton type="submit" loading={loading}>
          Login
        </AuthButton>

        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/60"></div>
          </div>
          <span className="relative px-3 bg-[var(--card-bg)] text-[10px] uppercase tracking-[0.2em] text-secondary-text/75 font-semibold">
            Or
          </span>
        </div>

        <AuthButton variant="google" onClick={() => alert("Google Single Sign-On is currently a demonstration feature.")}>
          Continue with Google
        </AuthButton>
      </div>

      <div className="text-center pt-4 border-t border-border/40 text-xs text-secondary-text">
        <span>Don't have an account? </span>
        <Link
          href="/signup"
          className="font-bold text-primary hover:text-primary-hover transition-colors duration-300 tracking-wide"
        >
          Create Account
        </Link>
      </div>
    </form>
  );
}
