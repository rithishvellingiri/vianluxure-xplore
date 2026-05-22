"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

const slides = [
  {
    img: "/assets/hero-bg.jpg",
    sub: "VL Global • Linen & Cotton",
    title: "Linen And Cotton Fabrics For Everyday Use",
    desc: "Explore breathable linen and cotton fabrics designed for soft texture and regular shirting use."
  },
  {
    img: "/assets/fabric-1.jpg",
    sub: "Bespoke Excellence",
    title: "Thoughtfully Crafted Everyday Shirting",
    desc: "From carefully selected fabrics to refined tailoring details, every piece is made to feel natural and breathable."
  },
  {
    img: "/assets/premium-linen-bg.jpg",
    sub: "Bespoke Tailoring",
    title: "Built Around Your Measurements",
    desc: "Create bespoke shirts with personalized measurements, fabric selections, and styling details designed for you."
  }
];

export default function HeroSection() {
    const { theme, mounted } = useTheme();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const isLight = mounted && theme === "light-linen";

  return (
    <section 
      className="relative h-[100svh] flex items-center justify-center overflow-hidden bg-background transition-colors duration-500" 
      id="hero-section"
    >
      {/* Background Slideshow Layer */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ 
              opacity: isLight ? 0.35 : 0.65, 
              scale: 1.02 
            }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[current].img}
              alt="Linen Showroom"
              className={`w-full h-full object-cover object-center filter contrast-110 ${
                isLight ? "brightness-[0.95] sepia-[15%]" : "brightness-[0.7]"
              }`}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dynamic Theme Gradient Overlay */}
        <div className={`absolute inset-0 z-10 transition-colors duration-500 ${
          isLight 
            ? "bg-gradient-to-b from-background/30 via-transparent to-background bg-background/10" 
            : "bg-gradient-to-b from-black/60 via-transparent to-black bg-black/40"
        }`} />
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center mt-16 max-w-5xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-primary tracking-[0.4em] uppercase text-xs md:text-sm mb-6 font-semibold">
              {slides[current].sub}
            </p>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading mb-8 leading-[1.1] tracking-wide text-foreground">
              {slides[current].title.split("For").map((part, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span className="text-gradient italic font-light font-heading">For{part}</span>
                  ) : (
                    part
                  )}
                </span>
              ))}
            </h1>

            <p className="text-secondary-text font-light leading-relaxed max-w-2xl mx-auto text-base md:text-lg mb-12">
              {slides[current].desc}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link
            href="/fabrics"
            id="hero-cta-fabrics"
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-background hover:text-foreground font-semibold uppercase tracking-[0.2em] text-xs transition-all hover:bg-primary-hover hover:scale-102"
          >
            <span className="relative z-10 flex items-center gap-3 font-bold">
              View Fabrics
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </Link>
          <Link
            href="/custom-tailoring"
            id="hero-cta-bespoke"
            className="group relative inline-flex items-center justify-center px-10 py-5 border border-border text-foreground font-semibold uppercase tracking-[0.2em] text-xs hover:border-primary hover:text-primary transition-all duration-300 glass hover:scale-102"
          >
            Bespoke Tailoring
          </Link>
        </motion.div>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-12 flex gap-3 z-30 justify-center w-full">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-[3px] transition-all duration-500 rounded-full cursor-pointer ${
              current === idx 
                ? "w-8 bg-primary" 
                : isLight 
                  ? "w-2 bg-foreground/20 hover:bg-foreground/40" 
                  : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
