"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const options = {
  fabric: [
    { name: "Pure White Linen", img: "/assets/custom-white-linen.jpg" },
    { name: "Midnight Navy Cotton", img: "/assets/custom-navy-cotton.jpg" },
    { name: "Olive Green Linen", img: "/assets/custom-olive-linen.jpg" },
    { name: "Sky Blue Oxford", img: "/assets/custom-sky-oxford.jpg" },
    { name: "Charcoal Textured", img: "/assets/custom-charcoal.jpg" }
  ],
  fit: ["Slim Fit", "Regular Fit", "Relaxed Fit"],
  collar: ["Classic", "Spread", "Button Down", "Mandarin", "Cutaway"],
  cuff: ["Single Button", "Double Button", "French Cuff", "Convertible"],
  pocket: ["No Pocket", "Single Point", "Round Bottom"],
  sleeve: ["Long Sleeve", "Short Sleeve", "3/4 Sleeve"]
};

export default function CustomizationSelector() {
  const [selections, setSelections] = useState({
    fabric: "Pure White Linen",
    fit: "Regular Fit",
    collar: "Classic",
    cuff: "Single Button",
    pocket: "No Pocket",
    sleeve: "Long Sleeve"
  });

  const [activeTab, setActiveTab] = useState("fabric");

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

  return (
    <div className="max-w-7xl mx-auto bg-secondary/20 border border-white/5 overflow-hidden shadow-2xl backdrop-blur-md rounded-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Preview Panel */}
        <div className="col-span-1 lg:col-span-4 bg-black/60 p-10 flex flex-col items-center justify-center border-r border-white/5 relative overflow-hidden">
           <div className="absolute inset-0 z-0">
             <img 
               src={options.fabric.find(f => f.name === selections.fabric)?.img || options.fabric[0].img} 
               alt="Fabric Preview" 
               className="w-full h-full object-cover opacity-20 filter grayscale"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
           </div>

           <div className="relative z-10 w-full text-center">
             <h3 className="font-heading text-3xl text-primary mb-2 tracking-wide">Bespoke Shirt</h3>
             <p className="text-[10px] text-muted-foreground mb-10 tracking-[0.3em] uppercase">Live Specification</p>
             
             <div className="space-y-4 text-left bg-white/5 p-8 border border-white/10 glass rounded-sm backdrop-blur-xl">
               {Object.entries(selections).map(([key, val]) => (
                 <div key={key} className="flex justify-between items-center border-b border-white/5 pb-3 last:border-0 last:pb-0">
                   <span className="text-muted-foreground capitalize text-xs tracking-wider">{key}</span>
                   <span className="text-foreground font-medium text-sm text-right max-w-[60%]">{val}</span>
                 </div>
               ))}
               
               <div className="pt-6 mt-4 border-t border-white/10 flex justify-between items-center">
                 <span className="text-white uppercase tracking-widest text-xs">Total</span>
                 <span className="text-primary font-heading text-2xl">₹4,999</span>
               </div>
             </div>
             
             <button className="mt-10 w-full bg-primary text-black font-semibold uppercase tracking-[0.2em] py-4 hover:bg-white transition-colors text-sm hover:scale-[1.02] active:scale-[0.98]">
               Add to Cart
             </button>
           </div>
        </div>

        {/* Selection Panel */}
        <div className="col-span-1 lg:col-span-8 p-10 bg-black/20">
          <div className="flex flex-wrap gap-2 md:gap-4 mb-10 border-b border-white/5 pb-6">
            {tabs.map(tab => (
               <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`uppercase tracking-widest text-xs font-semibold px-4 py-2 transition-all relative ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute -bottom-[25px] left-0 right-0 h-[2px] bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-6"
              >
                {activeTab === "fabric" ? (
                  options.fabric.map(fabric => {
                    const isSelected = selections.fabric === fabric.name;
                    return (
                      <button
                        key={fabric.name}
                        onClick={() => handleSelect("fabric", fabric.name)}
                        className={`relative group border text-left overflow-hidden h-40 transition-all rounded-sm ${
                          isSelected 
                            ? "border-primary shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
                            : "border-white/10 hover:border-white/30"
                        }`}
                      >
                        <img src={fabric.img} alt={fabric.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                        <div className={`absolute inset-0 bg-black/50 transition-colors ${isSelected ? "bg-black/20" : ""}`} />
                        
                        <div className="relative z-10 p-6 h-full flex flex-col justify-end">
                          <span className={`text-sm font-medium tracking-wide leading-tight ${isSelected ? "text-primary" : "text-white"}`}>
                            {fabric.name}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-4 right-4 text-primary bg-black/50 p-1 rounded-full backdrop-blur-sm z-10">
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                    );
                  })
                ) : (
                  options[activeTab].map(option => {
                    const isSelected = selections[activeTab] === option;
                    return (
                      <button
                        key={option}
                        onClick={() => handleSelect(activeTab, option)}
                        className={`relative group p-6 border text-left flex flex-col justify-between h-32 transition-all rounded-sm ${
                          isSelected 
                            ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]" 
                            : "border-white/5 hover:border-white/20 bg-white/[0.02]"
                        }`}
                      >
                        <span className={`text-sm font-medium tracking-wide ${isSelected ? "text-primary" : "text-white/80 group-hover:text-white"}`}>
                          {option}
                        </span>
                        {isSelected && (
                          <div className="absolute top-4 right-4 text-primary">
                            <Check size={16} />
                          </div>
                        )}
                        <div className={`mt-auto h-[2px] w-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ${isSelected ? "bg-primary scale-x-100" : "bg-white/20"}`} />
                      </button>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
