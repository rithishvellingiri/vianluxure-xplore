"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Ruler, Info, ShoppingCart, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useAuth } from "@/context/AuthContext";

const options = {
  fabric: [
    { id: "fab-1", name: "Pure White Premium Linen", img: "/assets/pure white premium linen.jpg", price: "₹1,499", composition: "100% Pure Flax" },
    { id: "fab-2", name: "Midnight Navy Cotton", img: "/assets/Cavallo by Linen Club  Cotton Linen Solids Shirting Fabric (Dark Navy Blue).jpg", price: "₹1,299", composition: "80% Cotton / 20% Linen" },
    { id: "fab-3", name: "Olive Green Rustic Linen", img: "/assets/Buy Absoluto Men's Terry Rayon Solids Unstitched Suiting Fabric (Olive Green) Online _ The Libas Store.jpg", price: "₹1,699", composition: "100% Pure Flax" },
    { id: "fab-4", name: "Sky Blue Oxford", img: "/assets/Buy Cadini Men's Bamboo Micro Structured Unstitched Shirting Fabric (Sky Blue) Online _ The Libas Store.jpg", price: "₹1,499", composition: "100% Egyptian Cotton" },
    { id: "fab-5", name: "Charcoal Textured Blend", img: "/assets/Хлопок Костюмный серый производитель Италия артикул 2950 купить оптом и в розницу.jpg", price: "₹1,899", composition: "60% Linen / 40% Cotton" },
    { id: "fab-6", name: "Desert Sand Pure Linen", img: "/assets/Lino Shot Linen in Natural - The Confident Stitch.jpg", price: "₹1,499", composition: "100% Pure Flax" }
  ],
  fit: ["Slim Fit", "Regular Fit", "Relaxed Fit"],
  collar: ["Classic Collar", "Spread Collar", "Button Down Collar", "Mandarin Collar", "Cutaway Collar"],
  cuff: ["Single Button Cuff", "Double Button Cuff", "French French Cuff", "Convertible Sport Cuff"],
  pocket: ["No Pocket", "Single Point Pocket", "Round Bottom Pocket"],
  sleeve: ["Long Sleeve", "Short Sleeve", "3/4 Sleeve"]
};

function CustomizerInner() {
  const { theme, mounted } = useTheme();
  const { addToCart } = useAuth();
  const isLight = mounted && theme === "light-linen";

  const searchParams = useSearchParams();
  const fabricParam = searchParams.get("fabric");
  const typeParam = searchParams.get("type"); // bespoke or made-to-wear

  // Find initial fabric name
  const getInitialFabric = () => {
    if (fabricParam) {
      const foundFabric = options.fabric.find(f => f.id === fabricParam);
      if (foundFabric) return foundFabric.name;
    }
    return "Pure White Premium Linen";
  };

  const [selections, setSelections] = useState(() => ({
    fabric: getInitialFabric(),
    fit: "Regular Fit",
    collar: "Classic Collar",
    cuff: "Single Button Cuff",
    pocket: "No Pocket",
    sleeve: "Long Sleeve",
    sizeMode: "standard", // standard or custom
    standardSize: "M",
    customCollar: "15.5",
    customChest: "40",
    customWaist: "36",
    customSleeve: "34",
    customLength: "29"
  }));

  const [activeTab, setActiveTab] = useState("fabric");
  const [successMsg, setSuccessMsg] = useState("");

  const tabs = [
    { id: "fabric", label: "1. Fabric" },
    { id: "fit", label: "2. Fit" },
    { id: "collar", label: "3. Collar" },
    { id: "cuff", label: "4. Cuff" },
    { id: "sleeve", label: "5. Sleeve" },
    { id: "pocket", label: "6. Pocket" }
  ];

  const handleSelect = (category, value) => {
    setSelections(prev => ({ ...prev, [category]: value }));
  };

  const currentTabIdx = tabs.findIndex(t => t.id === activeTab);

  const handleNext = () => {
    if (currentTabIdx < tabs.length - 1) {
      setActiveTab(tabs[currentTabIdx + 1].id);
    }
  };

  const handlePrev = () => {
    if (currentTabIdx > 0) {
      setActiveTab(tabs[currentTabIdx - 1].id);
    }
  };

  const getFabricPrice = () => {
    const fab = options.fabric.find(f => f.name === selections.fabric) || options.fabric[0];
    const basePrice = 3200; // base tailoring labor cost
    const fabricValue = parseInt(fab.price.replace("₹", "").replace(",", ""));
    return basePrice + fabricValue;
  };

  const handleAddToCart = () => {
    setSuccessMsg("Adding your tailored shirt to luxury wardrobe...");
    
    // Construct bespoke virtual product object
    const bespokeProduct = {
      id: `bespoke-${Date.now()}`,
      name: selections.sizeMode === "custom" 
        ? `Bespoke Masterpiece (${selections.fabric})`
        : `Custom Shirt (${selections.fabric})`,
      price: `₹${getFabricPrice().toLocaleString()}`,
      img: options.fabric.find(f => f.name === selections.fabric)?.img || options.fabric[0].img,
    };
    
    const sizeSelection = selections.sizeMode === "custom" ? "Custom Fit" : selections.standardSize;
    const customizationDetails = {
      fit: selections.fit,
      collar: selections.collar,
      cuff: selections.cuff,
      sleeve: selections.sleeve,
      pocket: selections.pocket,
    };
    
    addToCart(bespokeProduct, sizeSelection, customizationDetails);

    setTimeout(() => {
      setSuccessMsg("Successfully Added! Customize another piece or view checkout.");
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="bg-card border border-border/40 overflow-hidden shadow-2xl backdrop-blur-md rounded-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Side: Preview Panel */}
          <div className="col-span-1 lg:col-span-4 bg-card/45 p-8 md:p-10 flex flex-col items-center justify-between border-r border-border/40 relative overflow-hidden min-h-[600px]">
            <div className="absolute inset-0 z-0">
              <img 
                src={options.fabric.find(f => f.name === selections.fabric)?.img || options.fabric[0].img} 
                alt="Fabric Preview" 
                className="w-full h-full object-cover opacity-20 filter grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-transparent" />
            </div>

            <div className="relative z-10 w-full text-center">
              <h3 className="font-heading text-3xl text-primary mb-1 tracking-wide">
                {typeParam === "made-to-wear" ? "Personalized Shirt" : "Bespoke Masterpiece"}
              </h3>
              <p className="text-[9px] text-secondary-text mb-8 tracking-[0.3em] uppercase">Live Technical Specification</p>
              
              <div className="space-y-3.5 text-left p-6 glass rounded-sm">
                <div className="flex justify-between items-center border-b border-border/20 pb-2.5">
                  <span className="text-secondary-text text-xs tracking-wider">Fabric Swatch</span>
                  <span className="text-foreground font-medium text-xs text-right max-w-[65%]">{selections.fabric}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/20 pb-2.5">
                  <span className="text-secondary-text text-xs tracking-wider">Fit Profile</span>
                  <span className="text-foreground font-medium text-xs text-right">{selections.fit}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/20 pb-2.5">
                  <span className="text-secondary-text text-xs tracking-wider">Collar Styling</span>
                  <span className="text-foreground font-medium text-xs text-right">{selections.collar}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/20 pb-2.5">
                  <span className="text-secondary-text text-xs tracking-wider">Cuff Styling</span>
                  <span className="text-foreground font-medium text-xs text-right">{selections.cuff}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/20 pb-2.5">
                  <span className="text-secondary-text text-xs tracking-wider">Sleeve Option</span>
                  <span className="text-foreground font-medium text-xs text-right">{selections.sleeve}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/20 pb-2.5">
                  <span className="text-secondary-text text-xs tracking-wider">Pocket styling</span>
                  <span className="text-foreground font-medium text-xs text-right">{selections.pocket}</span>
                </div>
                
                {/* Size block */}
                <div className="flex justify-between items-center pb-1">
                  <span className="text-secondary-text text-xs tracking-wider">Size Selection</span>
                  <span className="text-primary font-semibold text-xs uppercase">
                    {selections.sizeMode === "standard" ? `Standard Size ${selections.standardSize}` : "Custom Bespoke Fit"}
                  </span>
                </div>

                <div className="pt-5 mt-4 border-t border-border/40 flex justify-between items-center">
                  <span className="text-foreground uppercase tracking-widest text-xs font-semibold">Total Price</span>
                  <span className="text-primary font-heading text-2xl">₹{getFabricPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Complete Add to Cart checkout actions */}
            <div className="relative z-10 w-full mt-8">
              <AnimatePresence>
                {successMsg && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-center text-primary font-semibold mb-4 leading-normal bg-primary/10 border border-primary/20 py-2 rounded-sm"
                  >
                    {successMsg}
                  </motion.p>
                )}
              </AnimatePresence>
              
              <button 
                onClick={handleAddToCart}
                className="w-full bg-primary text-background hover:text-foreground font-semibold uppercase tracking-[0.2em] py-4 hover:bg-primary-hover transition-all text-xs flex items-center justify-center gap-2 rounded-sm shadow-xl"
              >
                <ShoppingCart size={13} />
                Order Custom Shirting
              </button>
              <div className="flex items-center justify-center gap-2 text-[10px] text-secondary-text mt-3 font-sans">
                <ShieldCheck size={12} className="text-primary" />
                Guaranteed Fit Guarantee. Free alterations for 30 days.
              </div>
            </div>

          </div>

          {/* Right Side: Selection Stepper */}
          <div className="col-span-1 lg:col-span-8 p-8 md:p-10 flex flex-col justify-between min-h-[600px]">
            <div>
              {/* Tabs list */}
              <div className="flex overflow-x-auto gap-2 md:gap-4 mb-10 border-b border-border/40 pb-4 scrollbar-none">
                {tabs.map((tab, idx) => {
                  const isCompleted = idx < currentTabIdx;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`uppercase tracking-widest text-[10px] md:text-xs font-semibold px-4 py-2 transition-all shrink-0 relative flex items-center gap-1.5 ${
                        activeTab === tab.id
                          ? "text-primary"
                          : isCompleted 
                          ? "text-foreground/80"
                          : "text-secondary-text hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                      {isCompleted && <Check size={10} className="text-primary" />}
                      {activeTab === tab.id && (
                        <motion.div 
                          layoutId="activeTabUnderline" 
                          className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-primary" 
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Steps panels */}
              <div className="min-h-[350px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                  >
                    
                    {/* STEP 1: FABRICS */}
                    {activeTab === "fabric" && (
                      <div className="space-y-6">
                        <h4 className="text-xl font-heading text-foreground mb-6">Choose Premium Linen or Cotton Fabric</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                          {options.fabric.map(fabric => {
                            const isSelected = selections.fabric === fabric.name;
                            return (
                              <button
                                key={fabric.name}
                                onClick={() => handleSelect("fabric", fabric.name)}
                                className={`relative group border text-left overflow-hidden h-40 transition-all rounded-sm flex flex-col justify-between p-4 ${
                                  isSelected 
                                    ? "border-primary shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
                                    : "border-border/40 hover:border-border/80 bg-card/25"
                                }`}
                              >
                                <img src={fabric.img} alt={fabric.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity" />
                                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent`} />
                                
                                {isSelected ? (
                                  <div className="absolute top-3 right-3 text-primary bg-black/60 p-1 rounded-full backdrop-blur-sm z-10 border border-primary/20">
                                    <Check size={12} />
                                  </div>
                                ) : null}

                                <div className="absolute bottom-4 left-4 z-10">
                                  <span className="text-[9px] uppercase tracking-widest text-primary font-semibold mb-1 block">
                                    {fabric.composition}
                                  </span>
                                  <span className="text-sm font-medium tracking-wide leading-tight text-white group-hover:text-primary transition-colors">
                                    {fabric.name}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: FIT SELECTOR */}
                    {activeTab === "fit" && (
                      <div className="space-y-6">
                        <div className="mb-6">
                          <h4 className="text-xl font-heading text-foreground mb-2">Select Fit Profile</h4>
                          <p className="text-secondary-text font-light text-sm leading-relaxed">Choose a standard contour structure best suited for your body dynamics.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {options.fit.map(fitOption => {
                            const isSelected = selections.fit === fitOption;
                            return (
                              <button
                                key={fitOption}
                                onClick={() => handleSelect("fit", fitOption)}
                                className={`p-6 border text-left flex flex-col justify-between h-44 transition-all rounded-sm relative ${
                                  isSelected 
                                    ? "border-primary bg-primary/[0.04] shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
                                    : "border-border/40 hover:border-border/80 bg-card/25"
                                }`}
                              >
                                {isSelected && <Check size={16} className="text-primary absolute top-4 right-4" />}
                                <div className="space-y-2">
                                  <h5 className="text-lg font-heading text-foreground tracking-wide">{fitOption}</h5>
                                  <p className="text-xs text-secondary-text font-sans font-light leading-relaxed">
                                    {fitOption === "Slim Fit" 
                                      ? "Tapered torso, closer armholes, neat profile outlining chest and waist." 
                                      : fitOption === "Regular Fit" 
                                      ? "Traditional proportioning. Comfortable breathing space across shoulders." 
                                      : "Generous fit offering continuous ventilation, loose drape, perfect for casual resort look."}
                                  </p>
                                </div>
                                <div className={`mt-auto h-[2px] w-full scale-x-0 origin-left transition-transform duration-500 ${isSelected ? "bg-primary scale-x-100" : "bg-border/40"}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEPS 3-6: COLLARS, CUFFS, SLEEVES, POCKETS */}
                    {["collar", "cuff", "sleeve", "pocket"].includes(activeTab) && (
                      <div className="space-y-6">
                        <h4 className="text-xl font-heading text-foreground mb-6 uppercase tracking-wider text-sm text-primary">
                          Select {activeTab} style
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {options[activeTab].map(option => {
                            const isSelected = selections[activeTab] === option;
                            return (
                              <button
                                key={option}
                                onClick={() => handleSelect(activeTab, option)}
                                className={`p-6 border text-left flex flex-col justify-between h-36 transition-all rounded-sm relative ${
                                  isSelected 
                                    ? "border-primary bg-primary/[0.03] shadow-[0_0_20px_rgba(212,175,55,0.1)]" 
                                    : "border-border/40 hover:border-border/80 bg-card/25"
                                }`}
                              >
                                {isSelected && <Check size={14} className="text-primary absolute top-4 right-4" />}
                                <span className={`text-sm font-medium tracking-wide ${isSelected ? "text-primary" : "text-foreground/80"}`}>
                                  {option}
                                </span>
                                <div className={`h-[1px] w-full scale-x-0 origin-left transition-transform duration-500 ${isSelected ? "bg-primary scale-x-100" : "bg-border/40"}`} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Sizing & Custom Measurements fields */}
              <div className="mt-8 border-t border-border/40 pt-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-heading text-foreground flex items-center gap-2">
                      <Ruler size={16} className="text-primary animate-pulse" />
                      Measurements & Sizes
                    </h4>
                    <p className="text-xs text-secondary-text font-sans font-light mt-1">Select your standard fit or fill custom bespoke parameters.</p>
                  </div>
                  
                  {/* Selector toggle */}
                  <div className="flex bg-card p-1 rounded-sm border border-border/40 self-start">
                    <button
                      onClick={() => handleSelect("sizeMode", "standard")}
                      className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-semibold transition-colors ${
                        selections.sizeMode === "standard" ? "bg-primary text-background" : "text-secondary-text hover:text-foreground"
                      }`}
                    >
                      Standard Sizing
                    </button>
                    <button
                      onClick={() => handleSelect("sizeMode", "custom")}
                      className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-semibold transition-colors ${
                        selections.sizeMode === "custom" ? "bg-primary text-background" : "text-secondary-text hover:text-foreground"
                      }`}
                    >
                      Custom Tailored
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {selections.sizeMode === "standard" ? (
                    <motion.div 
                      key="standard"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex flex-wrap gap-4"
                    >
                      {["S", "M", "L", "XL", "XXL"].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSelect("standardSize", sz)}
                          className={`w-12 h-12 rounded-sm border flex items-center justify-center font-heading text-sm transition-all ${
                            selections.standardSize === sz 
                              ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]" 
                              : "border-border/40 hover:border-border/80 bg-card/25 text-foreground/70"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="custom"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-2 sm:grid-cols-5 gap-4"
                    >
                      {[
                        { label: "Collar (in)", field: "customCollar", val: selections.customCollar },
                        { label: "Chest (in)", field: "customChest", val: selections.customChest },
                        { label: "Waist (in)", field: "customWaist", val: selections.customWaist },
                        { label: "Sleeve (in)", field: "customSleeve", val: selections.customSleeve },
                        { label: "Length (in)", field: "customLength", val: selections.customLength }
                      ].map((item) => (
                        <div key={item.field} className="space-y-1.5">
                          <label className="text-[10px] uppercase tracking-wider text-secondary-text font-sans">{item.label}</label>
                          <input
                            type="number"
                            step="0.5"
                            value={item.val}
                            onChange={(e) => handleSelect(item.field, e.target.value)}
                            style={{ backgroundColor: "var(--input-bg)" }}
                            className="w-full border border-border/40 rounded-sm px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 text-center font-heading"
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Navigators buttons */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-border/40">
              <button
                onClick={handlePrev}
                disabled={currentTabIdx === 0}
                className="group px-6 py-3 border border-border/40 hover:border-primary text-foreground hover:text-primary transition-all duration-300 disabled:opacity-30 disabled:hover:border-border/40 disabled:hover:text-foreground glass text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
                Previous Step
              </button>
              
              <button
                onClick={handleNext}
                disabled={currentTabIdx === tabs.length - 1}
                className="group px-6 py-3 bg-primary text-background hover:bg-primary-hover hover:text-foreground font-semibold transition-all duration-300 disabled:opacity-30 disabled:hover:bg-primary disabled:hover:text-background text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer"
              >
                Next Customization
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
      
      {/* Editorial Tailoring Steps Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { t: "Refined Everyday Fit", d: "Designed with balanced sizing and clean tailoring details suited for comfortable everyday movement.", icon: "01" },
          { t: "Personalized Details", d: "Select collars, cuffs, buttons, and pocket elements tailored around your styling specifications.", icon: "02" },
          { t: "Thoughtful Craftsmanship", d: "Every piece is carefully finished using premium organic linen flax and refined construction techniques.", icon: "03" }
        ].map((step, idx) => (
          <div key={idx} className="p-8 border border-border/40 bg-card rounded-sm relative">
            <span className="absolute right-6 top-6 text-primary/10 text-5xl font-heading font-bold">{step.icon}</span>
            <h4 className="text-lg font-heading text-foreground mb-2 tracking-wide">{step.t}</h4>
            <p className="text-xs text-secondary-text font-light leading-relaxed">{step.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CustomizationSelector() {
  return (
    <Suspense fallback={
      <div className="py-24 text-center">
        <p className="text-primary tracking-widest uppercase text-xs animate-pulse">Loading customization panel...</p>
      </div>
    }>
      <CustomizerInner />
    </Suspense>
  );
}
