"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Quote, Plus, Minus, X, Check, Ruler, Info } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

const fabricProducts = [
  {
    id: "fab-1",
    name: "Pure White Premium Linen",
    price: "₹1,499",
    type: "linen",
    img: "/assets/pure white premium linen.jpg",
    details: "European premium 70 lea pure linen fabric designed for breathable wear and natural texture. Crisp, structured, and luxurious.",
    weight: "135 GSM",
    composition: "100% Pure Flax",
    weave: "Plain Weave",
    feel: "Cool & Crisp"
  },
  {
    id: "fab-2",
    name: "Midnight Navy Cotton",
    price: "₹1,299",
    type: "cotton",
    img: "/assets/Cavallo by Linen Club  Cotton Linen Solids Shirting Fabric (Dark Navy Blue).jpg",
    details: "Balanced cotton and linen fibers created for soft texture and comfortable everyday use. Highly durable and rich in color deepness.",
    weight: "120 GSM",
    composition: "80% Cotton / 20% Linen",
    weave: "Twill",
    feel: "Ultra-Soft & Smooth"
  },
  {
    id: "fab-3",
    name: "Olive Green Rustic Linen",
    price: "₹1,699",
    type: "linen",
    img: "/assets/Buy Absoluto Men's Terry Rayon Solids Unstitched Suiting Fabric (Olive Green) Online _ The Libas Store.jpg",
    details: "Textured linen fibers dyed in an organic earthy olive tone. High breathability with gorgeous rustic drape characteristics.",
    weight: "140 GSM",
    composition: "100% Pure Flax",
    weave: "Plain Weave",
    feel: "Textured & Breathable"
  },
  {
    id: "fab-4",
    name: "Sky Blue Oxford",
    price: "₹1,499",
    type: "cotton",
    img: "/assets/Buy Cadini Men's Bamboo Micro Structured Unstitched Shirting Fabric (Sky Blue) Online _ The Libas Store.jpg",
    details: "A classic oxford weave with sky blue warp and white weft threads. Excellent regular everyday shirting choice.",
    weight: "115 GSM",
    composition: "100% Egyptian Cotton",
    weave: "Oxford",
    feel: "Durable & Comfortable"
  },
  {
    id: "fab-5",
    name: "Charcoal Textured Blend",
    price: "₹1,899",
    type: "blends",
    img: "/assets/Хлопок Костюмный серый производитель Италия артикул 2950 купить оптом и в розницу.jpg",
    details: "Intricately woven dark charcoal fibers offering subtle tone variations. Ideal for relaxed unstructured summer tailoring.",
    weight: "130 GSM",
    composition: "60% Linen / 40% Cotton",
    weave: "Chambray",
    feel: "Balanced Softness"
  },
  {
    id: "fab-6",
    name: "Desert Sand Pure Linen",
    price: "₹1,499",
    type: "linen",
    img: "/assets/Lino Shot Linen in Natural - The Confident Stitch.jpg",
    details: "Soft beige pure linen reflecting desert organic aesthetics. Breathable, lightweight, and perfect for resort wear or casual shirts.",
    weight: "125 GSM",
    composition: "100% Pure Flax",
    weave: "Plain Weave",
    feel: "Lightweight & Aerated"
  }
];

const testimonials = [
  { name: "Arjun", date: "05.02.2026", text: "The fabric feels soft and breathable for everyday wear. The texture and overall quality looked really good.", rating: 4 },
  { name: "Karthik", date: "24.02.2026", text: "I liked the natural linen feel, and the fabric width was perfect for shirt stitching.", rating: 5 },
  { name: "Dinesh", date: "18.04.2026", text: "Good breathable fabric with a soft feel. Suitable for both casual and formal shirt stitching.", rating: 4 },
  { name: "Karthik Raj", date: "19.01.2026", text: "Their ready-to-wear designs are modern, well-structured, and easy to style for both casual and formal occasions.", rating: 5 },
  { name: "Sanjay Menon", date: "04.03.2026", text: "What I liked most was the consistency in quality. The shirts looked elegant, felt comfortable, and were ready to wear straight away.", rating: 5 }
];

const bgImages = [
  "/assets/linen-natural-light.jpg",
  "/assets/linen-ivory-cream.jpg",
  "/assets/linen-warm-beige.jpg",
  "/assets/linen-stone-gray.jpg"
];

const faqs = [
  {
    q: "What is pure linen fabric?",
    a: "Pure linen fabric is made from natural flax fibers known for breathable texture, durability, and lightweight everyday wear."
  },
  {
    q: "Is cotton-linen suitable for daily use?",
    a: "Yes, cotton-linen blends are highly durable and hold their shape beautifully. Combining cotton softness with linen breathability, they are perfect for comfortable daily wear."
  },
  {
    q: "What is GSM in fabrics?",
    a: "GSM (Grams per Square Meter) measures the density and weight of a fabric. Shirting linen typically ranges between 110-150 GSM, which yields the ideal balance of light weight and durability."
  },
  {
    q: "Are these fabrics suitable for shirting?",
    a: "Absolutely. Sourced from high-grade flax fibers, our shirting materials are lightweight, weave-ventilated, and structured to hold clean shirt outlines and collars beautifully."
  },
  {
    q: "Does linen become softer after washing?",
    a: "Yes. Natural flax fibers contain pectin, which gradually breaks down during laundry cycles. With each wash, the texture becomes softer, smoother, and more comfortable."
  }
];

export default function FabricsContent() {
  const [bgIndex, setBgIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedFabric, setSelectedFabric] = useState(null);
  const { theme, mounted } = useTheme();

  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  // Background Crossfade Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredFabrics = filter === "all"
    ? fabricProducts
    : fabricProducts.filter(f => f.type === filter);

  return (
    <div className="min-h-screen bg-background relative flex flex-col overflow-hidden">

      {/* Animated Crossfading Background Layer specifically for Fabrics Page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={bgIndex}
            src={bgImages[bgIndex]}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: isLight ? 0.28 : 0.42, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.5, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full object-cover filter grayscale mix-blend-overlay ${isLight ? "brightness-100" : "brightness-50"}`}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/65 to-background" />
      </div>

      <div className="relative z-10 w-full">
        {/* HERO SECTION */}
        <section className="min-h-[70vh] flex items-center justify-center pt-40 pb-20 px-6 relative border-b border-border/40 overflow-hidden">
          {/* Premium Linen Clothing Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/assets/fabrics_hero_bg.png"
              alt="Premium tailored linen background"
              className={`w-full h-full object-cover transition-all duration-700 ${isLight ? "opacity-[0.35] brightness-105" : "opacity-[0.48] brightness-50"
                }`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/40 to-background" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold tracking-[0.3em] text-primary uppercase mb-6"
            >
              Classic Collection
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading mb-8 tracking-wide text-foreground leading-tight"
            >
              Natural Fabrics<br />
              <span className="italic font-light text-primary font-heading">For Everyday Use</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg md:text-xl text-secondary-text font-light leading-relaxed max-w-2xl mx-auto"
            >
              Explore premium linen and organic cotton fabrics selected for breathable texture, soft feel, and regular everyday shirting wear.
            </motion.p>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-24 px-6 border-b border-border/40 bg-card/25 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { t: "Breathable Fabric Texture", d: "Designed with natural linen and cotton fibers suitable for comfortable everyday wear.", icon: "/icons/shirt-logo.svg" },
                { t: "Everyday Fabric Options", d: "Selected fabrics suitable for shirt construction, regular use, and balanced fabric feel.", icon: "/icons/user-logo.svg" },
                { t: "Simple Fabric Selection", d: "Choose fabrics based on texture, blend, and everyday shirting preference.", icon: "/icons/search-logo.svg" }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-10 glass border border-border/40 rounded-sm hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="mb-6 w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5">
                    <img src={f.icon} alt={f.t} className={`w-5 h-5 ${isInvertedClass}`} />
                  </div>
                  <h3 className="text-xl font-heading text-foreground mb-4 tracking-wide">{f.t}</h3>
                  <p className="text-secondary-text font-light leading-relaxed text-sm">{f.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FABRIC PRODUCTS GRID WITH INTERACTIVE FILTER */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">

            {/* Header + Tabs Filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="text-left">
                <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-foreground mb-4">Classic Collection</h2>
                <p className="text-secondary-text font-light">Explore fabrics priced per meter. Select a fabric to inspect swatches details.</p>
              </div>

              {/* Tag filters */}
              <div className="flex flex-wrap gap-2 border-b border-border/40 pb-1 self-start md:self-end">
                {["all", "linen", "cotton", "blends"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-5 py-2 text-xs uppercase tracking-widest font-semibold transition-all relative ${filter === category ? "text-primary" : "text-secondary-text hover:text-foreground"
                      }`}
                  >
                    {category === "all" ? "All Fabrics" : category === "linen" ? "Pure Linen" : category === "cotton" ? "Cotton" : "Textured Blends"}
                    {filter === category && (
                      <motion.div
                        layoutId="activeFabTab"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
            >
              <AnimatePresence mode="popLayout">
                {filteredFabrics.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="group cursor-pointer text-left"
                    onClick={() => setSelectedFabric(product)}
                  >
                    <div className="aspect-[3/4] bg-card mb-8 overflow-hidden rounded-sm relative shadow-2xl border border-border/40 group-hover:border-primary/40 transition-all duration-500">
                      <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-[2.2s] ease-out group-hover:scale-105 filter contrast-[1.08] brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                      {/* Swatch Stats Preview */}
                      <div className="absolute top-4 left-4 glass py-1 px-3 rounded-full text-[9px] uppercase tracking-widest font-semibold text-primary">
                        {product.weight}
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <button className="w-full bg-primary text-background text-xs uppercase tracking-[0.2em] py-5 font-semibold hover:bg-primary-hover hover:text-foreground transition-colors flex justify-center items-center gap-2 shadow-xl">
                          Inspect Swatch
                          <Info size={14} />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-2xl font-heading mb-2 text-foreground group-hover:text-primary transition-colors tracking-wide drop-shadow-sm">{product.name}</h3>
                    <p className="text-sm text-primary font-heading tracking-wide">
                      {product.price}
                      <span className="text-[10px] uppercase tracking-widest ml-1 text-secondary-text/40">/ meter</span>
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

          </div>
        </section>

        {/* IMAGE DETAILS REVEAL MODAL */}
        <AnimatePresence>
          {selectedFabric && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
              onClick={() => setSelectedFabric(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="w-full max-w-5xl bg-card border border-border/40 rounded-sm overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedFabric(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-card/60 border border-border/40 flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors glass cursor-pointer"
                >
                  <X size={16} />
                </button>

                {/* Left Side: Zoomed High-Resolution Image */}
                <div className="relative aspect-[4/5] md:aspect-auto h-full bg-black">
                  <img
                    src={selectedFabric.img}
                    alt={selectedFabric.name}
                    className="w-full h-full object-cover filter contrast-[1.1] brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  <div className="absolute bottom-8 left-8">
                    <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-2 block">{selectedFabric.composition}</span>
                    <h2 className="text-3xl font-heading text-white">{selectedFabric.name}</h2>
                  </div>
                </div>

                {/* Right Side: High-Contrast Swatches Specs Table */}
                <div className="p-8 md:p-12 flex flex-col justify-between space-y-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold font-sans border-b border-primary/20 pb-1 mb-6 inline-block">
                      Technical Specifications
                    </span>

                    <h3 className="text-3xl font-heading text-foreground mb-4 tracking-wide">{selectedFabric.name}</h3>
                    <p className="text-secondary-text font-light leading-relaxed text-sm mb-8">
                      {selectedFabric.details}
                    </p>

                    {/* Spec List */}
                    <div className="space-y-4 border-t border-border/40 pt-6 font-sans">
                      <div className="flex justify-between text-sm py-1 border-b border-border/40">
                        <span className="text-secondary-text font-light">Composition</span>
                        <span className="text-foreground font-medium">{selectedFabric.composition}</span>
                      </div>
                      <div className="flex justify-between text-sm py-1 border-b border-border/40">
                        <span className="text-secondary-text font-light">Weight Density</span>
                        <span className="text-foreground font-medium">{selectedFabric.weight}</span>
                      </div>
                      <div className="flex justify-between text-sm py-1 border-b border-border/40">
                        <span className="text-secondary-text font-light">Weave Architecture</span>
                        <span className="text-foreground font-medium">{selectedFabric.weave}</span>
                      </div>
                      <div className="flex justify-between text-sm py-1 border-b border-border/40">
                        <span className="text-secondary-text font-light">Fabric Hand / Feel</span>
                        <span className="text-foreground font-medium text-primary">{selectedFabric.feel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4 pt-6 border-t border-border/40">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-secondary-text font-light">Estimated Price</span>
                      <span className="text-3xl font-heading text-primary">{selectedFabric.price} <span className="text-xs text-secondary-text font-sans font-light">/ meter</span></span>
                    </div>

                    <div className="flex gap-4 pt-2">
                      <Link
                        href={`/custom-tailoring?fabric=${selectedFabric.id}`}
                        onClick={() => setSelectedFabric(null)}
                        className="flex-grow bg-primary text-background hover:text-foreground hover:bg-primary-hover font-semibold text-center uppercase tracking-widest text-xs py-4 transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        Design Custom Shirt
                        <Ruler size={13} />
                      </Link>

                      <a
                        href={`https://wa.me/919944944255?text=Hello%20Vian%20Luxure,%20I%20am%20interested%20in%20fabric%20swatch%20${encodeURIComponent(selectedFabric.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 border border-border/40 hover:border-primary text-foreground hover:text-primary transition-colors flex items-center justify-center glass text-xs uppercase tracking-widest font-semibold"
                      >
                        Inquire
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WHY CHOOSE OUR FABRICS */}
        <section className="py-32 px-6 border-y border-border/40 bg-card/25 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="aspect-[4/5] max-w-md mx-auto rounded-sm overflow-hidden border border-border/40 shadow-2xl relative">
                <img src="/assets/download.jpg" className="w-full h-full object-cover filter contrast-[1.1] brightness-90" alt="Our Fabrics" />
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
                <p className="text-xs tracking-[0.3em] text-primary uppercase font-semibold mb-4">Why Choose</p>
                <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-foreground mb-6">Our Fabrics?</h2>
                <p className="text-secondary-text font-light leading-relaxed text-sm">
                  VL Global works strictly with organic, premium European flax fibers and Egyptian long-staple cottons. Every thread represents comfort, simplicity, and natural living.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { n: "01", t: "Pure Linen Fabric", d: "European premium 70 lea pure linen fabric designed for breathable wear and natural texture." },
                  { n: "02", t: "Cotton Linen Blend", d: "Balanced linen and cotton fabrics are created for soft texture and comfortable everyday use." },
                  { n: "03", t: "Scallop Pattern Fabric", d: "Cotton-linen fabric with scallop-pattern detailing designed for clean and refined fabric styling." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <span className="w-8 h-8 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary text-xs font-semibold shrink-0 group-hover:bg-primary group-hover:text-background transition-colors duration-500">
                      {item.n}
                    </span>
                    <div>
                      <h4 className="text-xl text-foreground font-heading mb-2 tracking-wide group-hover:text-primary transition-colors">{item.t}</h4>
                      <p className="text-secondary-text font-light text-sm leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CUSTOMER STORIES */}
        <section className="py-32 px-6 relative overflow-hidden">
          {/* Atelier Tailoring Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/assets/fabrics_reviews_bg.png"
              alt="Bespoke linen atelier background"
              className={`w-full h-full object-cover transition-all duration-700 ${isLight ? "opacity-[0.28] brightness-105" : "opacity-[0.42] brightness-[0.4]"
                }`}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/35 to-background" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-semibold">Reviews</p>
              <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-foreground">Customer Stories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card/25 border border-border/40 glass p-8 rounded-sm hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <Quote size={28} className="text-primary/20 mb-6" />
                    <p className="text-secondary-text font-light leading-relaxed mb-8 italic text-sm">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border/40 pt-4">
                    <div>
                      <h4 className="text-foreground font-heading text-base tracking-wide">{t.name}</h4>
                      <p className="text-[10px] text-secondary-text uppercase tracking-widest">{t.date}</p>
                    </div>
                    <div className="flex gap-0.5 text-xs text-primary">
                      {[...Array(t.rating)].map((_, idx) => <span key={idx}>★</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 px-6 max-w-6xl mx-auto border-t border-border/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card p-12 md:p-16 rounded-sm text-foreground flex flex-col justify-between h-full border border-border/40 shadow-2xl relative overflow-hidden"
            >
              {/* Editorial Linen Background Texture */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src="/assets/fabrics_hero_bg.png"
                  alt="Editorial linen background"
                  className={`w-full h-full object-cover transition-all duration-700 ${isLight ? "opacity-[0.16] brightness-105" : "opacity-[0.25] brightness-50"
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-card/40 via-card/80 to-card/55" />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] text-secondary-text mb-8 uppercase">FAQ Journal</p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold leading-[1.15] mb-8 text-foreground tracking-wide">
                    Fabric<br />Essentials &<br />Knowledge
                  </h2>
                  <div className="w-12 h-1 bg-primary mb-8" />
                </div>
                <p className="text-[9px] font-semibold tracking-[0.3em] text-secondary-text uppercase mt-12">
                  Vian Luxure • Linen Experts
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-border/40 overflow-hidden">
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                  >
                    <span className={`text-lg font-heading group-hover:text-primary transition-colors tracking-wide ${activeFaq === i ? "text-primary" : "text-foreground"
                      }`}>{faq.q}</span>
                    <span className="text-secondary-text group-hover:text-primary transition-colors ml-4 shrink-0">
                      {activeFaq === i ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="pb-8 text-secondary-text font-light leading-relaxed text-sm">
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

        {/* BOTTOM CALL TO ACTION */}
        <section className="py-24 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto bg-[#A3864E] rounded-sm p-12 md:p-16 relative overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.2)]"
          >
            {/* Premium Linen Clothing Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/assets/fabrics_cta_bg.png"
                alt="Premium linen clothing background"
                className="w-full h-full object-cover opacity-[0.45] filter brightness-90 contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#8E7037]/85 via-[#A3864E]/75 to-[#B5985E]/65 mix-blend-multiply" />
            </div>

            {/* Woven pattern decoration overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/woven-light.png')] mix-blend-multiply pointer-events-none z-0" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-2/3">
                <h2 className="text-4xl md:text-5xl font-heading text-background mb-6 leading-tight tracking-wide">
                  Looking for Linen <br />in Your Style?
                </h2>
                <p className="text-background/90 font-medium leading-relaxed text-base md:text-lg max-w-2xl">
                  From ready-to-wear styles to personalized tailoring options, find linen shirts designed with natural fabrics and clean everyday detailing.
                </p>
              </div>
              <div className="md:w-1/3 flex justify-center md:justify-end">
                <Link
                  href="/ready-to-wear"
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-background text-foreground font-semibold uppercase tracking-[0.2em] text-xs overflow-hidden transition-all hover:bg-foreground hover:text-background border border-background shadow-2xl"
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
