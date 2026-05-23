"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    num: "01",
    title: "Fabric",
    sub: "Pure Materials",
    desc: "Explore pure linen and cotton fabrics designed for breathability, natural texture, and everyday wear, with lightweight finishes and timeless detailing suited for modern wardrobes.",
    btn: "Explore Fabrics",
    href: "/fabrics",
    img: "/assets/download.jpg"
  },
  {
    num: "02",
    title: "Ready-to-Wear",
    sub: "Effortless Everyday",
    desc: "Find ready-to-wear shirts designed with clean tailoring and everyday ease. Choose your preferred fabric, select your size and fit, and enjoy shirts made for regular wear.",
    btn: "Shop Ready To Wear",
    href: "/ready-to-wear",
    img: "/assets/fabrics_hero_bg.png"
  },
  {
    num: "03",
    title: "Made-to-Wear",
    sub: "Your Fit, Your Way",
    desc: "Create a more personal look with made-to-wear shirts tailored with refined details. Customize selected elements such as collars, cuffs, and buttons while maintaining a comfortable fit.",
    btn: "Start Personalizing",
    href: "/custom-tailoring?type=made-to-wear",
    img: "/assets/fabrics_reviews_bg.png"
  },
  {
    num: "04",
    title: "Custom Bespoke",
    sub: "Fully Yours",
    desc: "Create a fully personalized shirt tailored around your measurements and preferences. From fit to finishing details, every piece is shaped to reflect your individual style.",
    btn: "Begin Bespoke",
    href: "/custom-tailoring?type=bespoke",
    img: "/assets/customized shirt .jpeg"
  }
];

export default function CategorySection() {
  return (
    <section className="py-32 bg-card/25 backdrop-blur-sm relative border-t border-b border-border/40" id="category-section">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-semibold"
          >
            Curated Services
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading mb-6 tracking-wide text-foreground"
          >
            Weaving Elegance into Everyday
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-light leading-relaxed text-lg"
          >
            From raw breathable linen to custom bespoke tailored shirt structures, explore our core collection segments shaped for comfort and luxury.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <Link key={idx} href={cat.href} id={`category-card-${cat.title.toLowerCase().replace(/\s+/g, "-")}`}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group cursor-pointer block relative h-[580px] overflow-hidden rounded-sm border border-border/40 hover:border-primary/60 transition-colors duration-500 shadow-2xl"
              >
                <div className="absolute inset-0">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex flex-col justify-end h-full">
                  <span className="text-primary text-5xl font-heading font-light opacity-30 group-hover:opacity-80 transition-opacity duration-500 mb-6">
                    {cat.num}
                  </span>
                  
                  <h3 className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1 group-hover:text-primary transition-colors">
                    {cat.sub}
                  </h3>
                  
                  <h4 className="text-3xl font-heading mb-4 text-white tracking-wide">
                    {cat.title}
                  </h4>
                  
                  <div className="overflow-hidden">
                    <p className="text-sm text-gray-300 font-light opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-700 ease-out leading-relaxed mb-6">
                      {cat.desc}
                    </p>
                  </div>
                  
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-semibold group-hover:text-white transition-colors duration-300">
                    {cat.btn}
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
