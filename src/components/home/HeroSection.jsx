"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 w-full h-full">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
        <img
          src="/assets/hero-bg.jpg"
          alt="Luxury Tailoring"
          className="w-full h-full object-cover object-center scale-105"
        />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-20 container mx-auto px-6 text-center mt-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-primary tracking-[0.4em] uppercase text-xs md:text-sm mb-6 font-semibold"
        >
          Vian Luxure • Linen Experts
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading mb-8 leading-tight tracking-tight drop-shadow-2xl"
        >
          Comfort isn't just crafted, <br />
          <span className="text-gradient font-light italic">it's lived.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16"
        >
          <Link
            href="/ready-to-wear"
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-primary-foreground font-medium uppercase tracking-[0.2em] text-sm overflow-hidden transition-all hover:bg-white"
          >
            <span className="relative z-10 flex items-center gap-3">
              Ready to Wear
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </Link>
          <Link
            href="/custom-tailoring"
            className="group relative inline-flex items-center justify-center px-10 py-5 border border-white/20 text-white font-medium uppercase tracking-[0.2em] text-sm hover:border-primary hover:text-primary transition-all duration-300 glass"
          >
            Bespoke Tailoring
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
