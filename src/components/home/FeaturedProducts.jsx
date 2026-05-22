"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

const products = [
  { id: "rtw-1", name: "Classic White Linen", price: "₹2,499", type: "linen", img: "/assets/rtw-1.jpg", rating: 5, tag: "Best Seller" },
  { id: "rtw-2", name: "Navy Blue Everyday Fit", price: "₹2,199", type: "blend", img: "/assets/rtw-2.jpg", rating: 4, tag: "Essential" },
  { id: "rtw-3", name: "Olive Green Relaxed", price: "₹2,699", type: "linen", img: "/assets/rtw-3.jpg", rating: 5, tag: "Signature" },
  { id: "rtw-4", name: "Sky Blue Cotton Blend", price: "₹2,299", type: "blend", img: "/assets/rtw-4.jpg", rating: 4, tag: "Classic" },
  { id: "rtw-5", name: "Charcoal Evening Shirt", price: "₹2,899", type: "linen", img: "/assets/rtw-5.jpg", rating: 5, tag: "Premium" },
  { id: "rtw-6", name: "Desert Sand Safari", price: "₹2,499", type: "linen", img: "/assets/rtw-6.jpg", rating: 4, tag: "Utility" },
  { id: "rtw-7", name: "Crimson Red Linen", price: "₹2,599", type: "linen", img: "/assets/rtw-7.jpg", rating: 5, tag: "Festive" },
  { id: "rtw-8", name: "Slate Grey Essential", price: "₹2,199", type: "blend", img: "/assets/rtw-8.jpg", rating: 4, tag: "Minimalist" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

export default function FeaturedProducts() {
  const { theme, mounted } = useTheme();
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);

  const isLight = mounted && theme === "light-linen";

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(p => p.type === filter);

  return (
    <section className="py-32 bg-transparent relative border-t border-border/40 transition-colors duration-500" id="featured-products-section">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-semibold">
              The Showroom
            </p>
            <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-foreground">
              Featured Ready-to-Wear
            </h2>
            <p className="text-secondary-text font-light max-w-xl mt-4 leading-relaxed text-sm">
              Discover ready-to-wear shirts designed with clean tailoring and premium organic textiles. Selected styles crafted for everyday elegance.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex border-b border-border/30 pb-1 self-start md:self-end">
            {["all", "linen", "blend"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 text-xs uppercase tracking-widest font-semibold transition-all relative cursor-pointer ${
                  filter === category ? "text-primary font-bold" : "text-secondary-text hover:text-foreground"
                }`}
              >
                {category === "all" ? "All Collections" : category === "linen" ? "Pure Linen" : "Linen Blends"}
                {filter === category && (
                  <motion.div
                    layoutId="activeFeaturedTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                variants={itemVariants}
                className="group relative flex flex-col text-left"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image Panel */}
                <div className="aspect-[3/4] w-full bg-card mb-6 overflow-hidden rounded-sm relative shadow-2xl border border-border/40 group-hover:border-primary/45 transition-colors duration-500">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105 filter contrast-[1.05] brightness-95"
                  />
                  
                  {/* Glass Tag */}
                  {product.tag && (
                    <div className="absolute top-4 left-4 glass py-1 px-3 rounded-full text-[9px] uppercase tracking-widest font-semibold text-primary">
                      {product.tag}
                    </div>
                  )}

                  {/* Gradient Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Action Icons Panel */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                    <button className="w-9 h-9 bg-black/60 border border-white/10 hover:border-primary flex items-center justify-center hover:bg-primary hover:text-black transition-all text-white rounded-full glass cursor-pointer">
                      <Heart size={14} />
                    </button>
                    <Link href={`/ready-to-wear?id=${product.id}`} className="w-9 h-9 bg-black/60 border border-white/10 hover:border-primary flex items-center justify-center hover:bg-primary hover:text-black transition-all text-white rounded-full glass">
                      <Eye size={14} />
                    </Link>
                  </div>

                  {/* Dynamic Slide-up Add to Cart Button */}
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <button className="w-full bg-primary text-background font-semibold uppercase tracking-[0.2em] text-[10px] py-4 hover:bg-primary-hover hover:text-foreground transition-colors duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer font-bold">
                      <ShoppingBag size={12} />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Info block */}
                <h3 className="text-lg font-heading mb-1 text-foreground group-hover:text-primary transition-colors tracking-wide">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-primary font-light font-heading tracking-wider font-semibold">{product.price}</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-xs ${i < product.rating ? "text-primary" : "text-foreground/10"}`}>★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/ready-to-wear"
            className="group relative inline-flex items-center justify-center px-12 py-5 border border-border text-foreground font-semibold uppercase tracking-[0.25em] text-xs hover:border-primary hover:text-primary transition-all duration-300 glass hover:scale-102"
          >
            Explore Ready To Wear
          </Link>
        </div>

      </div>
    </section>
  );
}
