"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function WhyChooseUs() {
  const { theme, mounted } = useTheme();
  
  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  const points = [
    {
      num: "01",
      title: "Pure Linen Fabric",
      desc: "European premium 70 lea pure linen fabric designed for breathable wear and natural texture."
    },
    {
      num: "02",
      title: "Cotton Linen Blend",
      desc: "Balanced linen and cotton fabrics are created for soft texture and comfortable everyday use."
    },
    {
      num: "03",
      title: "Scallop Pattern Fabric",
      desc: "Cotton-linen fabric with scallop-pattern detailing designed for clean and refined fabric styling."
    }
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden border-t border-border/40 transition-colors duration-500" id="why-choose-section">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] rounded-sm overflow-hidden border border-border/40 shadow-2xl relative">
              <img 
                src="/assets/Tissu coloré uni, composition palette de couleurs douces.jpg" 
                className="w-full h-full object-cover filter contrast-110 brightness-[0.85]" 
                alt="Premium Linen Craft" 
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            
            {/* Embedded abstract gold ribbon element */}
            <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-primary/40 pointer-events-none hidden md:block" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-primary/40 pointer-events-none hidden md:block" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 space-y-12"
          >
            <div>
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-semibold">
                Why Vian Luxure
              </p>
              <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-foreground mb-6">
                Premium Fabrics Built for Lifetime Wear
              </h2>
              <p className="text-secondary-text font-light leading-relaxed text-lg">
                Comfort isn&apos;t just crafted, it&apos;s lived. We utilize carefully selected European flax fibers and cotton blends to produce apparel that regulates temperature, behaves naturally, and becomes softer with each wash.
              </p>
            </div>
            
            <div className="space-y-8">
              {points.map((point, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary transition-colors duration-500">
                    <img src="/icons/tic-icon.svg" alt="Tick" className={`w-3.5 h-3.5 group-hover:brightness-0 ${isInvertedClass}`} />
                  </div>
                  <div>
                    <h3 className="text-xl text-foreground font-heading mb-2 tracking-wide group-hover:text-primary transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-secondary-text font-light leading-relaxed text-sm">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
