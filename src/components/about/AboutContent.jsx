"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, Info, Plus, Minus } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function AboutContent() {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    { q: "How do I wash linen?", a: "Linen is easy to maintain and becomes softer over time. Wash in cold or lukewarm water using a gentle cycle and mild detergent. Avoid high heat drying to help preserve the fabric's natural texture." },
    { q: "Is linen suitable for all seasons?", a: "Yes. Linen is naturally breathable for warm weather and can also be layered comfortably during cooler seasons, making it suitable for year-round wear." },
    { q: "Does linen wrinkle easily?", a: "Linen has a natural tendency to wrinkle, which is part of its relaxed charm. To minimize wrinkles, remove from the wash immediately and hang to dry." },
    { q: "Is your linen sustainably made?", a: "Yes, our linen is made from natural flax fibers which require significantly less water and pesticides to grow compared to cotton." },
    { q: "Why is linen preferred for everyday wear?", a: "Linen is highly absorbent, durable, and naturally regulates temperature, making it the perfect fabric for comfortable, everyday clothing." }
  ];

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex flex-col">
      {/* Hero Section with Parallax Background */}
      <section className="relative h-[60vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img src="/assets/hero-bg.jpg" alt="Natural Linen Fabrics" className="w-full h-full object-cover object-center filter contrast-125 opacity-70" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading mb-6 tracking-wide drop-shadow-xl text-white"
          >
            Made Around Natural <br /><span className="italic font-light text-primary">Linen Fabrics</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-lg text-white/80 font-light leading-relaxed max-w-2xl mx-auto"
          >
            From lightweight textures to structured tailoring, our linen shirts are designed for regular wear with breathable fabrics and timeless everyday detailing.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-24 relative z-10 space-y-32">
        
        {/* WHO WE ARE */}
        <section className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-sm tracking-[0.4em] text-primary uppercase font-semibold mb-4">Who We Are</h2>
            <h3 className="text-4xl font-heading mb-6 tracking-wide leading-tight drop-shadow-md">Refined Everyday Wear</h3>
            <p className="text-secondary-text leading-relaxed text-lg font-light mb-6">
              VL Global is a premium clothing brand owned by VIJAYLAKSHMI GLOBAL EMART OPC PRIVATE LIMITED, focused on creating refined everyday wear through carefully selected linen and cotton fabrics.
            </p>
            <p className="text-secondary-text leading-relaxed text-lg font-light">
              With breathable textures, precise tailoring, and sophisticated fits, every piece is designed to deliver comfort, elegance, and timeless style. Thoughtful craftsmanship and premium detailing come together to create shirts that feel versatile, elevated, and effortlessly distinctive.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 relative h-[500px] w-full rounded-sm overflow-hidden shadow-2xl border border-border/40"
          >
            <img src="/assets/brand-intro.jpg" alt="Who we are" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>
        </section>

        {/* VISION & MISSION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card/25 p-10 md:p-14 border border-border/40 glass rounded-sm shadow-xl"
          >
            <h2 className="text-3xl font-heading mb-4 text-primary tracking-wide">Our Vision</h2>
            <p className="text-secondary-text font-light mb-8 leading-relaxed">
              Our vision is to create linen shirts designed for everyday wear, combining breathable fabrics, clean tailoring, and timeless simplicity. We aim to make clothing that feels natural to wear, fits comfortably, and remains relevant beyond changing trends.
            </p>
            <ul className="space-y-4">
              {[
                "Breathable linen fabrics designed for everyday use",
                "Tailored fits that feel balanced and easy to wear",
                "Timeless designs with clean and refined detailing",
                "Shirts made with carefully selected natural fabrics",
                "Thoughtful craftsmanship focused on lasting quality"
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-secondary-text">
                  <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="font-light">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-card/25 p-10 md:p-14 border border-border/40 glass rounded-sm shadow-xl"
          >
            <h2 className="text-3xl font-heading mb-4 text-primary tracking-wide">Our Mission</h2>
            <p className="text-secondary-text font-light mb-8 leading-relaxed">
              Our mission is to create thoughtfully tailored linen wear using carefully selected fabrics and refined construction techniques. Every piece is designed to bring together natural texture, everyday functionality, and a fit suited for regular wear.
            </p>
            <ul className="space-y-4">
              {[
                "Linen shirts designed with breathable natural fabrics",
                "Clean tailoring created for everyday movement",
                "Materials selected for durability and long-term wear",
                "Simple and refined details suited for modern wardrobes",
                "Consistent craftsmanship across every piece"
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-4 text-sm text-secondary-text">
                  <CheckCircle size={18} className="text-primary shrink-0 mt-0.5" />
                  <span className="font-light">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>
        
        {/* WHAT WE DO / BESPOKE */}
        <section className="relative -mx-6 md:-mx-12 px-6 md:px-12 py-24 bg-card/10 overflow-hidden shadow-2xl border-y border-border/40">
          <div className="absolute inset-0 z-0">
             <img src="/assets/fabric-3.jpg" className="w-full h-full object-cover opacity-20 filter grayscale" alt="texture" />
             <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/50 to-background/95" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-sm tracking-[0.4em] text-primary uppercase font-semibold mb-4">What We Do</h2>
              <h3 className="text-4xl md:text-5xl font-heading mb-6 tracking-wide leading-tight drop-shadow-md">Tailored Just For You</h3>
              <p className="text-secondary-text leading-relaxed text-lg font-light">
                We create thoughtfully tailored linen shirts using natural fabrics chosen for their texture, durability, and everyday wearability. You are a one-of-a-kind man, thus your clothes must fit you like a glove. At VL Global we offer Bespoke tailoring to manufacture the greatest shirts that are in harmony with your style and comfortable to wear.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Pick Your Fabric", desc: "Selecting from our soft, durable and high-quality fabrics is up to you.", img: "/assets/process-3.jpg" },
                { title: "Choose Your Fit", desc: "Slim, Classic, Relaxed, or simply provide your measurements for a perfect fit.", img: "/assets/process-1.jpg" },
                { title: "Add Your Touch", desc: "Make your shirt unique by choosing collar style, sleeve length, buttons, or a monogram.", img: "/assets/process-2.jpg" }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-card/45 border border-border/40 glass p-10 text-center rounded-sm hover:-translate-y-2 transition-all duration-300 shadow-xl"
                >
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full overflow-hidden border border-primary/30 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    <img src={step.img} alt={step.title} className="w-full h-full object-cover filter contrast-125" />
                  </div>
                  <h4 className="text-xl font-heading text-foreground mb-4 tracking-wide">{step.title}</h4>
                  <p className="text-sm text-secondary-text font-light leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left side title card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/40 p-12 md:p-16 rounded-sm flex flex-col justify-between h-full shadow-lg"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] text-primary mb-8 uppercase">Frequently Asked Questions</p>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-8 text-foreground">
                  Everything<br />You Need<br />to Know
                </h2>
                <div className="w-12 h-1 bg-primary mb-8" />
              </div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-secondary-text uppercase mt-20">
                Vian Luxure · Linen Experts
              </p>
            </motion.div>

            {/* Right side accordion */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center gap-2"
            >
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-border/40 last:border-0 overflow-hidden">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="text-xl md:text-[22px] text-foreground font-heading group-hover:text-primary transition-colors tracking-wide">{faq.q}</span>
                    <span className="text-secondary-text group-hover:text-primary transition-colors ml-4 shrink-0">
                      {activeFaq === index ? <Minus size={22} strokeWidth={1} /> : <Plus size={22} strokeWidth={1} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <p className="pb-8 text-secondary-text font-light leading-relaxed text-[15px] max-w-[90%]">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Banner Section matching the user's screenshot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto bg-gradient-to-r from-primary/15 to-primary/25 border border-primary/30 rounded-sm p-12 md:p-16 relative overflow-hidden shadow-lg"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/woven-light.png')] mix-blend-multiply pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-2/3">
              <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6 leading-tight tracking-wide drop-shadow-sm">
                Looking for Linen <br />in Your Style?
              </h2>
              <p className="text-secondary-text font-medium leading-relaxed text-lg max-w-2xl">
                From ready-to-wear styles to personalized tailoring options, find linen shirts designed with natural fabrics and clean everyday detailing.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link
                href="/ready-to-wear"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-background font-semibold uppercase tracking-[0.2em] text-xs overflow-hidden transition-all hover:bg-primary-hover hover:text-foreground border border-primary/25 shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get More Details
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
