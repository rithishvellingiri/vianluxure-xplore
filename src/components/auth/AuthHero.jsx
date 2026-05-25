"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function AuthHero({ heading, subheading }) {
  const { theme, mounted } = useTheme();

  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  return (
    <div className="relative h-full w-full flex flex-col justify-between p-12 md:p-16 overflow-hidden">
      {/* Background Image with Theme-Aware Filters */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/premium-linen-bg.jpg"
          alt="Premium Linen Fabric"
          className="w-full h-full object-cover object-center filter scale-105"
        />
        {/* Soft elegant overlays */}
        <div
          className={`absolute inset-0 transition-colors duration-500 z-10 ${
            isLight
              ? "bg-gradient-to-br from-background/70 via-background/40 to-background/85 backdrop-blur-[2px]"
              : "bg-gradient-to-br from-black/80 via-black/55 to-black/85 backdrop-blur-[2px]"
          }`}
        />
        
        {/* Gold Glow Highlights */}
        <div className="absolute top-1/4 -right-1/4 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[100px] z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 -left-1/4 w-[350px] h-[350px] rounded-full bg-primary/10 blur-[100px] z-10 pointer-events-none" />
      </div>

      {/* Brand Logo Header */}
      <div className="relative z-20 flex justify-start">
        <motion.img
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src="/logo/VL_Global.svg"
          alt="VIAN LUXURE"
          className={`h-9 w-auto hover:scale-105 transition-transform duration-300 ${isInvertedClass}`}
        />
      </div>

      {/* Hero Central Titles */}
      <div className="relative z-20 my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 max-w-md"
        >
          <span className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] block">
            Bespoke Linen Apparel
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-light leading-[1.2] text-foreground tracking-wide">
            {heading}
          </h1>
          <p className="text-sm md:text-base font-light text-secondary-text leading-relaxed font-sans">
            {subheading}
          </p>
        </motion.div>
      </div>

      {/* Footer Tagline */}
      <div className="relative z-20 flex justify-between items-center text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-semibold text-secondary-text/80">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Vian Luxure • Est. 2026
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-primary font-bold"
        >
          Premium Pure Linen
        </motion.span>
      </div>
    </div>
  );
}
