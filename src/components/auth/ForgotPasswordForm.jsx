"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { motion } from "framer-motion";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Email address is required.");
      return false;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Simulate premium server latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to transmit request. Please verify connection and retry.");
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center py-6 flex flex-col items-center space-y-6"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2 shadow-[0_0_24px_rgba(201,168,106,0.12)]">
          <CheckCircle size={32} className="stroke-[1.25]" />
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-heading font-light tracking-wide text-foreground">
            Instructions Dispatched
          </h2>
          <p className="text-xs md:text-sm font-light leading-relaxed text-secondary-text max-w-sm mx-auto font-sans">
            Password reset instructions have been successfully sent to <span className="font-semibold text-foreground">{email}</span>. Please review your inbox and spam folder.
          </p>
        </div>

        <div className="w-full pt-4">
          <Link href="/login" className="block w-full">
            <AuthButton variant="secondary" className="group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Return to Login</span>
            </AuthButton>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs md:text-sm text-secondary-text font-light font-sans leading-relaxed">
          Provide your registered email address below. We will send a secure link to reset your account password.
        </p>
      </div>

      <div className="space-y-4">
        <AuthInput
          label="Email Address"
          id="email"
          type="email"
          placeholder="e.g. guest@vianluxure.com"
          icon={Mail}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          error={error}
          required
        />
      </div>

      <div className="space-y-4 pt-2">
        <AuthButton type="submit" loading={loading}>
          Send Reset Link
        </AuthButton>
      </div>

      <div className="text-center pt-4 border-t border-border/40 text-xs text-secondary-text">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-bold text-primary hover:text-primary-hover transition-colors duration-300 tracking-wide"
        >
          <ArrowLeft size={14} />
          <span>Back to Login</span>
        </Link>
      </div>
    </form>
  );
}
