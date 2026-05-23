"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag, X, Star, ShieldCheck, Heart, Info } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

// Crawled ready to wear shirts collection
const shirts = [
  { id: "rtw-1", name: "Classic White Linen", price: "₹2,499", img: "/assets/Relaxed Linen Shirt _ Bradic.jpg", type: "linen", tag: "Pure Flax", composition: "100% European Linen", fit: "Regular Fit" },
  { id: "rtw-2", name: "Navy Blue Everyday Fit", price: "₹2,199", img: "/assets/navy blue shirt.jpg", type: "blend", tag: "Premium Blend", composition: "80% Cotton / 20% Linen", fit: "Slim Fit" },
  { id: "rtw-3", name: "Olive Green Relaxed", price: "₹2,699", img: "/assets/Men's linen button-up shirts, made in Italy _ Velasca.jpg", type: "linen", tag: "Garment Washed", composition: "100% Linen", fit: "Relaxed Fit" },
  { id: "rtw-4", name: "Sky Blue Cotton Blend", price: "₹2,299", img: "/assets/Mens Cotton & Linen Solid Color Thin Casual Long Sleeve Shirts With Pocket-shirt designs for men.jpg", type: "cotton", tag: "Easy Iron", composition: "90% Cotton / 10% Linen", fit: "Regular Fit" },
  { id: "rtw-5", name: "Charcoal Evening Shirt", price: "₹2,899", img: "/assets/Classic Linen Summer Shirt.jpg", type: "linen", tag: "Signature", composition: "100% European Linen", fit: "Slim Fit" },
  { id: "rtw-6", name: "Desert Sand Safari", price: "₹2,499", img: "/assets/Richie Shirt - Desert Sand.jpg", type: "linen", tag: "Utility Classic", composition: "100% Linen", fit: "Regular Fit" },
  { id: "rtw-7", name: "Crimson Red Linen", price: "₹2,599", img: "/assets/crimson red shirt.jpg", type: "linen", tag: "Celebration Special", composition: "100% Pure Linen", fit: "Regular Fit" },
  { id: "rtw-8", name: "Slate Grey Essential", price: "₹2,199", img: "/assets/StudioSuits- European Haze Purple Linen Shirt.jpg", type: "blend", tag: "Minimalist", composition: "70% Cotton / 30% Linen", fit: "Regular Fit" }
];

// Crawled customer reviews for ready-to-wear
const reviews = [
  { name: "Arun Prakash", text: "The fit matches bespoke tailoring perfectly. Breathable linen fabric keeps me cool all day. Absolute recommendation.", rating: 5, date: "12.03.2026" },
  { name: "Vignesh Kumar", text: "Excellent quality and neat stitching detail. Sizing guide is 100% accurate.", rating: 4, date: "29.04.2026" },
  { name: "Rahul Srinivasan", text: "Loved the desert sand safari design. Unique color palette not found in regular brands. Reordered midnight navy too.", rating: 5, date: "02.05.2026" }
];

export default function ReadyToWearPage() {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  const [filter, setFilter] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cartCount, setCartCount] = useState(0);
  const [cartSuccess, setCartSuccess] = useState("");

  const filteredShirts = filter === "all" 
    ? shirts 
    : shirts.filter(s => s.type === filter);

  const handleOpenQuickView = (product, e) => {
    e.stopPropagation();
    setSelectedProduct(product);
    setSelectedSize("M");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setCartSuccess("Added to luxury shopping bag!");
    setCartCount(prev => prev + 1);
    setTimeout(() => {
      setCartSuccess("");
      setSelectedProduct(null);
    }, 1500);
  };

  return (
    <div className="pt-40 pb-24 min-h-screen bg-background relative flex flex-col overflow-hidden">
      
      {/* Background aesthetics */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none mix-blend-overlay">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/20 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full flex-grow">
        
        {/* Editorial Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-semibold">
            The Collection
          </p>
          <h1 className="text-5xl md:text-6xl font-heading mb-6 tracking-wide text-foreground">
            Ready to Wear
          </h1>
          <p className="text-secondary-text font-light leading-relaxed text-base md:text-lg">
            Choose your preferred fabric, size, and fit from shirts designed with clean tailoring and balanced everyday styling.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-16 border-b border-border/40 pb-4">
          <div className="flex flex-wrap gap-2">
            {["all", "linen", "cotton", "blend"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all rounded-full border ${
                  filter === category 
                    ? "border-primary bg-primary text-background" 
                    : "border-border/40 hover:border-border/80 text-secondary-text hover:text-foreground bg-card/20"
                }`}
              >
                {category === "all" ? "All Shirts" : category === "linen" ? "Pure Linen" : category === "cotton" ? "Premium Cotton" : "Linen Blends"}
              </button>
            ))}
          </div>

          <div className="text-xs uppercase tracking-widest text-primary font-sans font-semibold flex items-center gap-2">
            <ShoppingBag size={14} />
            Bag Items: {cartCount}
          </div>
        </div>

        {/* Staggered Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredShirts.map((shirt, i) => (
              <motion.div
                layout
                key={shirt.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group cursor-pointer text-left relative flex flex-col justify-between"
                onMouseEnter={() => setHoveredProduct(shirt.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                onClick={(e) => handleOpenQuickView(shirt, e)}
              >
                <div className="aspect-[3/4] bg-card mb-6 overflow-hidden rounded-sm relative shadow-2xl border border-border/40 group-hover:border-primary/25 transition-colors duration-500">
                  <img 
                    src={shirt.img}
                    alt={shirt.name} 
                    className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-103 filter contrast-[1.05] brightness-95" 
                  />
                  
                  {shirt.tag && (
                    <div className="absolute top-4 left-4 glass py-1 px-3 rounded-full text-[9px] uppercase tracking-widest font-semibold text-primary">
                      {shirt.tag}
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Quick actions overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <button 
                      onClick={(e) => handleOpenQuickView(shirt, e)}
                      className="w-full bg-primary text-background hover:text-foreground font-semibold uppercase tracking-[0.2em] text-[10px] py-4 hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-xl"
                    >
                      <Info size={12} />
                      View Details / Size
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] uppercase tracking-widest text-primary/80 font-sans font-semibold mb-1 block">
                    {shirt.composition} • {shirt.fit}
                  </span>
                  <h3 className="text-lg font-heading mb-1.5 text-foreground group-hover:text-primary transition-colors tracking-wide">
                    {shirt.name}
                  </h3>
                  <p className="text-sm text-primary font-heading tracking-wide">{shirt.price}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state fallback */}
        {filteredShirts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 font-light italic">No materials available at the moment.</p>
          </div>
        )}

        {/* CRAWLED CUSTOMER REVIEWS FOR READY TO WEAR */}
        <section className="mt-32 pt-20 border-t border-border/40">
          <div className="text-left mb-16">
            <p className="text-primary tracking-[0.3em] uppercase text-xs mb-3 font-semibold">Journals</p>
            <h2 className="text-3xl font-heading text-foreground tracking-wide">Ready-to-Wear Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, i) => (
              <div 
                key={i}
                className="bg-card/25 border border-border/40 glass p-8 rounded-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <img src="/images/profile-boy.svg" alt="Profile" className={`w-5 h-5 opacity-80 ${isInvertedClass}`} />
                    </div>
                    <div>
                      <h4 className="text-foreground font-heading text-sm tracking-wide">{r.name}</h4>
                      <span className="text-[9px] text-secondary-text font-sans tracking-widest uppercase">{r.date}</span>
                    </div>
                  </div>
                  <p className="text-secondary-text font-light leading-relaxed text-xs italic">
                    &ldquo;{r.text}&rdquo;
                  </p>
                </div>
                <div className="flex gap-0.5 text-xs text-primary mt-6 pt-4 border-t border-border/40">
                  {[...Array(r.rating)].map((_, idx) => <span key={idx}>★</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* QUICK VIEW DETAILS MODAL & SIZE TRIGGER */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div 
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="w-full max-w-4xl bg-card border border-border/40 rounded-sm overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2 text-left"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-card border border-border/40 flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-colors glass cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Product Image */}
              <div className="relative aspect-[3/4] md:aspect-auto h-full bg-card/50">
                <img 
                  src={selectedProduct.img} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover filter contrast-[1.08] brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs uppercase tracking-widest text-primary font-semibold block mb-1">{selectedProduct.tag}</span>
                  <h3 className="text-2xl font-heading text-white">{selectedProduct.name}</h3>
                </div>
              </div>

              {/* Product Specifications & Selection */}
              <div className="p-8 md:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold font-sans border-b border-primary/20 pb-1 mb-6 inline-block">
                    Garment details
                  </span>
                  
                  <h2 className="text-3xl font-heading text-foreground mb-2 tracking-wide">{selectedProduct.name}</h2>
                  <p className="text-primary font-heading text-2xl mb-6">{selectedProduct.price}</p>
                  
                  <p className="text-secondary-text font-light text-xs leading-relaxed mb-6">
                    Our standard sizes are carefully structured around traditional luxury fit benchmarks. Meticulously finished collars and button-down cuff attachments provide clean architectural posture.
                  </p>

                  <div className="space-y-3.5 border-t border-border/40 pt-6 text-xs font-sans mb-8">
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-secondary-text/80 font-light">Composition</span>
                      <span className="text-foreground font-medium">{selectedProduct.composition}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border/40">
                      <span className="text-secondary-text/80 font-light">Fit Profile</span>
                      <span className="text-foreground font-medium">{selectedProduct.fit}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-secondary-text/80 font-light">Sizing Guide</span>
                      <span className="text-primary font-medium">True to size</span>
                    </div>
                  </div>

                  {/* Size Selector */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-wider text-secondary-text block">Select Sizing Standard</label>
                    <div className="flex gap-2.5">
                      {["S", "M", "L", "XL", "XXL"].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`w-11 h-11 rounded-sm border flex items-center justify-center font-heading text-xs transition-all ${
                            selectedSize === sz 
                              ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]" 
                              : "border-border/40 hover:border-border/80 bg-card/25 text-foreground/70"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4 pt-6 border-t border-border/40">
                  <AnimatePresence>
                    {cartSuccess && (
                      <motion.p 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-center text-primary font-semibold mb-2 bg-primary/10 py-2 border border-primary/20 rounded-sm"
                      >
                        {cartSuccess}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-4">
                    <button 
                      onClick={handleAddToCart}
                      className="flex-grow bg-primary text-background hover:text-foreground font-semibold uppercase tracking-widest text-xs py-4 hover:bg-primary-hover transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={14} />
                      Add to Shopping bag
                    </button>
                    
                    <a
                      href={`https://wa.me/919944944255?text=Hello%20Vian%20Luxure,%20I%20am%20interested%20in%20Ready%20to%20Wear%20shirt%20${encodeURIComponent(selectedProduct.name)}%20in%20size%20${selectedSize}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 border border-border/40 hover:border-primary text-foreground hover:text-primary transition-colors flex items-center justify-center glass text-xs uppercase tracking-widest font-semibold"
                    >
                      WhatsApp
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[9px] text-secondary-text font-sans">
                    <ShieldCheck size={11} className="text-primary" />
                    Express Shipping across India. Easy exchanges.
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
