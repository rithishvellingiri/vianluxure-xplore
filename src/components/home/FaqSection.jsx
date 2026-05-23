"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

const faqs = [
  {
    q: "What is pure linen fabric?",
    a: "Pure linen fabric is made from natural flax fibers known for breathable texture, durability, and lightweight everyday wear."
  },
  {
    q: "Is cotton-linen suitable for daily use?",
    a: "Yes, cotton-linen blends are highly durable and hold their shape beautifully. Combining cotton softness with linen breathability, they are perfect for comfortable daily wear and easy shirting maintenance."
  },
  {
    q: "What is GSM in fabrics?",
    a: "GSM (Grams per Square Meter) measures the density and weight of a fabric. Premium shirting linen typically ranges between 110-150 GSM, yielding the ideal balance of light weight and long-term structural durability."
  },
  {
    q: "Are these fabrics suitable for shirting?",
    a: "Absolutely. Sourced from high-grade European flax fibers, our shirting materials are lightweight, weave-ventilated, and structured to hold clean shirt contours, cuffs, and collars beautifully."
  },
  {
    q: "Does linen become softer after washing?",
    a: "Yes. Natural flax fibers contain pectin, which gradually breaks down during laundry cycles. With each wash, the fabric's texture becomes softer, smoother, and increasingly comfortable against your skin."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <section className="py-32 bg-card/25 relative border-t border-border/40" id="faq-section">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-24">
          <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-semibold">
            Common Inquiries
          </p>
          <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-foreground">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-6">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -4 }}
                className={`border rounded-sm overflow-hidden transition-all duration-500 ${
                  isOpen
                    ? "border-primary/40 bg-card/70 shadow-lg shadow-primary/10"
                    : "border-border/40 bg-card/25 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.01]"
                }`}
              >
                {/* Trigger */}
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between gap-6 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-col flex-1">
                    <span className={`text-base md:text-lg font-heading tracking-wide transition-colors ${
                      isOpen ? "text-primary" : "text-foreground"
                    }`}>
                      {faq.q}
                    </span>
                    {/* Gold underline animation */}
                    <div
                      className={`h-[1px] bg-primary mt-2 transition-all duration-500 ${
                        isOpen ? "w-full" : "w-0"
                      }`}
                    />
                  </div>

                  {/* Toggle Icon */}
                  <motion.img
                    src={isOpen ? "/icons/accordion-close.svg" : "/icons/accordion-open.svg"}
                    alt={isOpen ? "Close" : "Open"}
                    animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.15 : 1 }}
                    transition={{ duration: 0.4 }}
                    className={`w-3.5 h-3.5 ${isInvertedClass}`}
                  />
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: -10 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-8 pb-8 pt-2 text-sm text-secondary-text font-light leading-relaxed border-t border-border/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}