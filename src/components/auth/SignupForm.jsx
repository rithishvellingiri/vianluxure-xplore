"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { motion, AnimatePresence } from "framer-motion";

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);

  // Evaluate password strength
  useEffect(() => {
    const pwd = formData.password;
    if (!pwd) {
      setPasswordScore(0);
      return;
    }

    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[a-z]/.test(pwd)) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    setPasswordScore(score);
  }, [formData.password]);

  const getStrengthLabel = (score) => {
    switch (score) {
      case 0: return { text: "None", color: "bg-border", textColor: "text-secondary-text" };
      case 1: return { text: "Weak", color: "bg-amber-700/60", textColor: "text-amber-700" };
      case 2: return { text: "Fair", color: "bg-amber-500/60", textColor: "text-amber-500" };
      case 3: return { text: "Good", color: "bg-primary/60", textColor: "text-primary" };
      case 4: return { text: "Strong", color: "bg-primary", textColor: "text-primary" };
      case 5: return { text: "Excellent", color: "bg-primary shadow-[0_0_8px_rgba(201,168,106,0.5)]", textColor: "text-primary font-bold" };
      default: return { text: "", color: "bg-border", textColor: "text-secondary-text" };
    }
  };

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
    const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

    if (!formData.firstName.trim()) {
      tempErrors.firstName = "First name is required.";
    }
    if (!formData.lastName.trim()) {
      tempErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
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
      const result = await signup(formData);
      if (result.success) {
        router.push("/");
      } else {
        setApiError(result.message);
      }
    } catch (error) {
      setApiError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrengthLabel(passwordScore);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      {/* Name Grid Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AuthInput
          label="First Name"
          id="firstName"
          placeholder="Charles"
          icon={User}
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          required
        />
        <AuthInput
          label="Last Name"
          id="lastName"
          placeholder="Vian"
          icon={User}
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
          required
        />
      </div>

      <AuthInput
        label="Email Address"
        id="email"
        type="email"
        placeholder="charles@vianluxure.com"
        icon={Mail}
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <AuthInput
        label="Phone Number"
        id="phone"
        type="tel"
        placeholder="+1 (555) 019-2834"
        icon={Phone}
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        required
      />

      <AuthInput
        label="Password"
        id="password"
        type="password"
        placeholder="Min. 8 characters"
        icon={Lock}
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
      />

      {/* Reactive Password Strength Bar */}
      {formData.password && (
        <div className="space-y-2 mt-1">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-semibold">
            <span className="text-secondary-text">Security Strength</span>
            <span className={strength.textColor}>{strength.text}</span>
          </div>
          <div className="h-1 bg-border/40 w-full relative overflow-hidden">
            <motion.div
              layout
              className={`h-full ${strength.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${passwordScore * 20}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          </div>
          <p className="text-[9px] text-secondary-text/75 font-light leading-normal tracking-wide">
            Ensure your password contains uppercase, lowercase, numbers, and symbols for high security.
          </p>
        </div>
      )}

      <AuthInput
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        placeholder="Re-enter password"
        icon={Lock}
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        required
      />

      <div className="pt-2">
        <AuthButton type="submit" loading={loading}>
          Create Account
        </AuthButton>
      </div>

      <div className="text-center pt-4 border-t border-border/40 text-xs text-secondary-text">
        <span>Already have an account? </span>
        <Link
          href="/login"
          className="font-bold text-primary hover:text-primary-hover transition-colors duration-300 tracking-wide"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
