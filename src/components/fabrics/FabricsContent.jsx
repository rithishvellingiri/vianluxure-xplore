"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Quote, Plus, Minus } from "lucide-react";

const fabricProducts = [
  { name: "Pure White Premium Linen", price: "₹1,499", img: "/assets/fabric-1.jpg" },
  { name: "Midnight Navy Cotton", price: "₹1,299", img: "/assets/fabric-2.jpg" },
  { name: "Olive Green Rustic Linen", price: "₹1,699", img: "/assets/fabric-3.jpg" },
  { name: "Sky Blue Oxford", price: "₹1,499", img: "/assets/fabric-4.jpg" },
  { name: "Charcoal Textured Blend", price: "₹1,899", img: "/assets/fabric-5.jpg" },
  { name: "Desert Sand Pure Linen", price: "₹1,499", img: "/assets/fabric-6.jpg" }
];

const testimonials = [
  { name: "Arjun", date: "05.02.2026", text: "The fabric feels soft and breathable for everyday wear. The texture and overall quality looked really good." },
  { name: "Karthik", date: "24.02.2026", text: "I liked the natural linen feel, and the fabric width was perfect for shirt stitching." },
  { name: "Dinesh", date: "18.04.2026", text: "Good breathable fabric with a soft feel. Suitable for both casual and formal shirt stitching." },
  { name: "Karthik Raj", date: "19.01.2026", text: "Their ready-to-wear designs are modern, well-structured, and easy to style for both casual and formal occasions." },
  { name: "Sanjay Menon", date: "04.03.2026", text: "What I liked most was the consistency in quality. The shirts looked elegant, felt comfortable, and were ready to wear straight away." }
];

const bgImages = [
  "/assets/fabric-1.jpg",
  "/assets/fabric-3.jpg",
  "/assets/fabric-5.jpg",
  "/assets/fabric-6.jpg"
];

export default function FabricsContent() {
  const [bgIndex, setBgIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);

  // Background Crossfade Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black relative flex flex-col overflow-hidden">
      
      {/* Animated Crossfading Background Layer specifically for Fabrics Page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={bgIndex}
            src={bgImages[bgIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover filter grayscale mix-blend-screen"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/95" />
        
        {/* Floating Particles (Threads) */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-8 bg-primary/20 blur-[1px] rounded-full"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
              rotate: Math.random() * 360
            }}
            animate={{ 
              top: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              left: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              rotate: [0, 180]
            }}
            transition={{ 
              duration: Math.random() * 40 + 30, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "mirror"
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className="min-h-[80vh] flex items-center justify-center pt-32 pb-16 px-6 relative border-b border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-6"
            >
              Classic Collection
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading mb-8 tracking-wide drop-shadow-2xl text-white leading-tight"
            >
              Natural Fabrics<br />
              <span className="italic font-light text-white/70">For Everyday Use</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto"
            >
              Explore linen and cotton fabrics selected for breathable texture, soft feel, and regular everyday wear.
            </motion.p>
          </div>
        </section>

        {/* WHAT IS FABRIC COLLECTION */}
        <section className="py-32 px-6 border-b border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-xs tracking-[0.2em] text-gray-500 uppercase font-semibold mb-4">What Is</p>
              <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-white mb-6">Fabric Collection?</h2>
              <p className="text-gray-400 font-light max-w-2xl mx-auto">Explore linen and cotton fabrics designed for breathable wear, soft texture, and everyday shirting use.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { t: "Breathable Fabric Texture", d: "Designed with natural linen and cotton fibers suitable for comfortable everyday wear." },
                { t: "Everyday Fabric Options", d: "Selected fabrics suitable for shirt construction, regular use, and balanced fabric feel." },
                { t: "Simple Fabric Selection", d: "Choose fabrics based on texture, blend, and everyday shirting preference." }
              ].map((f, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-10 glass border border-white/5 rounded-sm hover:border-primary/50 transition-colors"
                >
                  <div className="text-primary text-4xl font-heading mb-6 opacity-30">0{i+1}</div>
                  <h3 className="text-2xl font-heading text-white mb-4">{f.t}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{f.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FABRIC PRODUCTS GRID */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-white mb-6">Our Collection</h2>
              <p className="text-gray-400 font-light max-w-2xl mx-auto">Priced per meter.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {fabricProducts.map((product, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group cursor-pointer text-left"
                >
                  <div className="aspect-[3/4] bg-black mb-8 overflow-hidden rounded-sm relative shadow-2xl border border-white/5">
                    <img 
                      src={product.img}
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <button className="w-full bg-primary/90 backdrop-blur-sm text-black text-xs uppercase tracking-[0.2em] py-5 font-semibold hover:bg-white transition-colors flex justify-center items-center gap-2">
                        View Details
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-2xl font-heading mb-3 text-white group-hover:text-primary transition-colors tracking-wide drop-shadow-sm">{product.name}</h3>
                  <p className="text-sm text-gray-400 font-light tracking-wide">{product.price} <span className="text-[10px] uppercase tracking-widest ml-1 text-white/30">/ meter</span></p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE OUR FABRICS */}
        <section className="py-32 px-6 border-y border-white/5 bg-black/30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="aspect-square rounded-sm overflow-hidden border border-white/5 shadow-2xl relative">
                <img src="/assets/cat-1.jpg" className="w-full h-full object-cover filter contrast-125" alt="Our Fabrics" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2 space-y-12"
            >
              <div>
                <p className="text-xs tracking-[0.2em] text-gray-500 uppercase font-semibold mb-4">Why Choose</p>
                <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-white mb-6">Our Fabrics?</h2>
                <p className="text-gray-400 font-light leading-relaxed">Our linen and cotton fabrics are selected for breathable texture, soft feel, and everyday shirting use.</p>
              </div>
              
              <div className="space-y-8">
                {[
                  { n: "01", t: "Pure Linen Fabric", d: "European premium 70 lea pure linen fabric designed for breathable wear and natural texture." },
                  { n: "02", t: "Cotton Linen Blend", d: "Balanced linen and cotton fabrics are created for soft texture and comfortable everyday use." },
                  { n: "03", t: "Scallop Pattern Fabric", d: "Cotton-linen fabric with scallop-pattern detailing designed for clean and refined fabric styling." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <span className="text-xl font-heading text-primary/50 group-hover:text-primary transition-colors">{item.n}.</span>
                    <div>
                      <h4 className="text-xl text-white font-heading mb-2">{item.t}</h4>
                      <p className="text-gray-400 font-light">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CUSTOMER STORIES */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-xs tracking-[0.2em] text-gray-500 uppercase font-semibold mb-4">Reviews</p>
              <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-white">Customer Stories</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/50 border border-white/5 glass p-8 rounded-sm hover:-translate-y-2 transition-transform duration-300 flex flex-col justify-between"
                >
                  <div>
                    <Quote size={28} className="text-primary/40 mb-6" />
                    <p className="text-gray-300 font-light leading-relaxed mb-8 italic">"{t.text}"</p>
                  </div>
                  <div>
                    <h4 className="text-white font-heading text-lg tracking-wide">{t.name}</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">{t.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#f4f4f4] p-12 md:p-16 rounded-sm text-black flex flex-col justify-between h-full shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/5"
            >
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] text-gray-500 mb-8 uppercase">Frequently Asked Questions</p>
                <h2 className="text-4xl md:text-5xl font-heading font-bold leading-[1.1] mb-8 text-[#111]">
                  Everything<br />You Need<br />to Know
                </h2>
                <div className="w-12 h-1 bg-[#d4af37] mb-8" />
              </div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-gray-400 uppercase mt-12">
                Vian Luxure · Linen Experts
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <div className="border-b border-white/10 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === 0 ? -1 : 0)}
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="text-xl text-white font-heading group-hover:text-primary transition-colors tracking-wide">What is pure linen fabric?</span>
                  <span className="text-gray-400 group-hover:text-primary transition-colors ml-4 shrink-0">
                    {activeFaq === 0 ? <Minus size={22} strokeWidth={1} /> : <Plus size={22} strokeWidth={1} />}
                  </span>
                </button>
                <AnimatePresence>
                  {activeFaq === 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="pb-8 text-gray-300 font-light leading-relaxed text-[15px]">
                        Pure linen fabric is made from natural flax fibers known for breathable texture, durability, and lightweight everyday wear.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BANNER */}
        <section className="py-20 px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto bg-[#e6cc8d] rounded-sm p-12 md:p-16 relative overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.15)]"
          >
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/woven-light.png')] mix-blend-multiply pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-2/3">
                <h2 className="text-4xl md:text-5xl font-heading text-black mb-6 leading-tight tracking-wide drop-shadow-sm">
                  Looking for Linen <br />in Your Style?
                </h2>
                <p className="text-black/80 font-medium leading-relaxed text-lg max-w-2xl">
                  From ready-to-wear styles to personalized tailoring options, find linen shirts designed with natural fabrics and clean everyday detailing.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link
                  href="/ready-to-wear"
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-black text-white font-semibold uppercase tracking-[0.2em] text-xs overflow-hidden transition-all hover:bg-white hover:text-black border border-black shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Get More Details
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
