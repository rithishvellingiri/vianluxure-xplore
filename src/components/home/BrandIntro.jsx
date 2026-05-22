"use client";
import { motion } from "framer-motion";

export default function BrandIntro() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 md:px-12">
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
                className="w-full h-full object-cover rounded-sm shadow-2xl"
              />
              <div className="absolute inset-0 border border-white/10 z-20 pointer-events-none rounded-sm" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute -bottom-10 -left-4 lg:-left-12 w-48 aspect-square glass z-20 flex items-center justify-center p-6 text-center"
            >
              <p className="font-heading italic text-lg text-primary leading-tight">Every thread tells a story of intention.</p>
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
              className="text-4xl md:text-5xl font-heading leading-tight text-foreground mb-8"
            >
              Thoughtfully crafted linen designed for <span className="italic text-white/70">everyday living.</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-muted-foreground font-light leading-relaxed mb-8 text-lg"
            >
              At VL Global, we create intelligently tailored garments that balance comfort with absolute refinement. From carefully selected natural fabrics to meticulous tailoring details, every piece is shaped to feel natural, breathable, and timeless.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img src="https://vianluxure.com/VL%20Global.svg" alt="Signature" className="h-8 invert opacity-50" />
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
