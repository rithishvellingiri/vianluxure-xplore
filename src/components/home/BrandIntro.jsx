"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function BrandIntro() {
  const { theme, mounted } = useTheme();
  
  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  return (
    <section className="py-32 relative overflow-hidden bg-background" id="brand-intro-section">
      {/* Background shirt sketch decoration */}
      <div className="absolute right-0 bottom-0 opacity-[0.02] pointer-events-none z-0 select-none hidden lg:block">
        <img src="/images/shirt-sketch.svg" alt="Shirt Sketch" className={`w-[500px] ${isInvertedClass}`} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto z-10"
            >
              <img 
                src="/assets/brand-intro.jpg" 
                alt="Craftsmanship" 
                className="w-full h-full object-cover rounded-sm shadow-2xl filter contrast-105"
              />
              <div className="absolute inset-0 border border-border/40 z-20 pointer-events-none rounded-sm" />
            </motion.div>
            
            {/* Absolute overlay sketch icon */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -bottom-10 -left-4 lg:-left-12 w-48 aspect-square glass z-20 flex flex-col items-center justify-center p-6 text-center rounded-sm"
            >
              <img src="/images/shirt-sketch.svg" alt="Linen Shirting sketch" className={`w-12 h-12 mb-3 opacity-80 ${isInvertedClass}`} />
              <p className="font-heading italic text-[13px] text-primary leading-tight">Every thread tells a story of intention.</p>
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-primary tracking-[0.3em] uppercase text-xs mb-6 font-semibold"
            >
              Who We Are
            </motion.h2>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading leading-[1.2] text-foreground mb-8"
            >
              WHO WE ARE?<br />
              <span className="text-gradient font-light font-heading italic">Weaving Elegance into Everyday</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-secondary-text font-light leading-relaxed mb-8 text-lg"
            >
              At VL Global, we create thoughtfully crafted linen shirts designed for comfort, simplicity, and everyday living. From carefully selected fabrics to refined tailoring details, every piece is made to feel natural, breathable, and timeless.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border-t border-border pt-8 flex items-center justify-between"
            >
              <img src="/logo/VL_Global.svg" alt="Signature Brand Logo" className={`h-8 opacity-50 ${isInvertedClass}`} />
              <span className="text-[10px] uppercase tracking-widest text-secondary-text font-light">Namakkal, India</span>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
