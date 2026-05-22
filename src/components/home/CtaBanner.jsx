"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="py-24 bg-card relative overflow-hidden border-t border-border/40" id="cta-banner-section">
      {/* Decorative textured canvas background */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url('/assets/linen-natural-light.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Gold aesthetic accent rings */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 border border-primary/20 rounded-full -translate-x-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 border border-primary/20 rounded-full translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary tracking-[0.4em] uppercase text-xs font-semibold"
          >
            Refined Tailoring For You
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading tracking-wide text-foreground leading-tight"
          >
            Looking for Linen in Your Style?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary-text font-light leading-relaxed text-base md:text-lg max-w-2xl mx-auto"
          >
            From ready-to-wear styles to personalized tailoring options, find linen shirts designed with natural fabrics and clean everyday detailing.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/custom-tailoring?type=bespoke"
              id="cta-btn-bespoke"
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-background hover:text-foreground font-semibold uppercase tracking-[0.2em] text-xs transition-all hover:bg-primary-hover hover:scale-102 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Begin Bespoke
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </Link>
            
            <Link
              href="/contact"
              id="cta-btn-contact"
              className="group relative inline-flex items-center justify-center px-10 py-5 border border-border text-foreground font-semibold uppercase tracking-[0.2em] text-xs hover:border-primary hover:text-primary transition-all duration-300 glass hover:scale-102 w-full sm:w-auto"
            >
              Get More Details
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
