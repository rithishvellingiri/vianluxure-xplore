"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";
import AuthHero from "./AuthHero";
import Link from "next/link";

export default function AuthLayout({ children, heading, subheading }) {
  const { theme, mounted } = useTheme();

  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  return (
    <div className="min-h-screen flex items-center justify-center py-28 px-4 md:px-8 relative z-10">
      {/* Decorative Golden Ambient Backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full max-h-[800px] pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-12 -left-12 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-12 -right-12 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md lg:max-w-5xl grid grid-cols-1 lg:grid-cols-12 border border-border bg-[var(--card-bg)] shadow-[0_16px_40px_rgba(201,168,106,0.06)] relative z-10 overflow-hidden"
      >
        {/* Left Column: Visual Hero (Desktop only) */}
        <div className="hidden lg:block lg:col-span-6 h-[680px]">
          <AuthHero heading={heading} subheading={subheading} />
        </div>

        {/* Right Column: Interactive Form (All devices) */}
        <div className="lg:col-span-6 flex flex-col justify-center p-6 sm:p-10 md:p-14 relative bg-[var(--card-bg)]">
          {/* Mobile/Tablet Brand Header (Hidden on Desktop) */}
          <div className="lg:hidden flex flex-col items-center text-center mb-8 mt-2">
            <Link href="/" className="mb-6">
              <img
                src="/logo/VL_Global.svg"
                alt="VIAN LUXURE"
                className={`h-7 w-auto hover:scale-105 transition-transform duration-300 ${isInvertedClass}`}
              />
            </Link>
            <span className="text-primary text-[9px] font-bold uppercase tracking-[0.3em] mb-2 block">
              Bespoke Linen Apparel
            </span>
            <h1 className="text-2xl font-heading font-light text-foreground tracking-wide mb-3">
              {heading}
            </h1>
            <p className="text-xs font-light text-secondary-text leading-relaxed max-w-sm">
              {subheading}
            </p>
          </div>

          {/* Form Content */}
          <div className="w-full h-full flex flex-col justify-center">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
