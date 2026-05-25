"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingCart, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function CartDrawer() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
  } = useAuth();
  
  const { theme, mounted } = useTheme();

  const isLight = mounted && theme === "light-linen";

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const numericPrice = parseInt(item.price.toString().replace(/[^\d]/g, ""), 10);
      return total + numericPrice * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    alert("Checkout portal integration is a demonstration feature. Thank you for shopping with Vian Luxure!");
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Transparent click-outside backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 cursor-default"
          />

          {/* Cart Panel Drawer container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-[var(--card-bg)] border-l border-border shadow-2xl z-50 flex flex-col justify-between overflow-hidden text-left"
          >
            {/* Header section */}
            <div className="p-6 md:p-8 border-b border-border/60 flex items-center justify-between">
              <div>
                <h3 className="font-heading text-2xl text-foreground tracking-wide">
                  Your Cart
                </h3>
                <p className="text-[10px] text-secondary-text uppercase tracking-widest mt-1">
                  {cartItems.length === 0 ? "No items" : `${cartItems.length} Selection${cartItems.length > 1 ? "s" : ""}`} reserved for you
                </p>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full border border-border/40 flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all glass cursor-pointer focus:outline-none"
                aria-label="Close cart drawer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Items Container */}
            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-none">
              {cartItems.length === 0 ? (
                /* Empty Cart State */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center text-primary shadow-[0_0_24px_rgba(201,168,106,0.08)]">
                    <ShoppingCart size={24} className="stroke-[1.25]" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-heading text-lg text-foreground tracking-wide">
                      Your Cart is Empty
                    </h4>
                    <p className="text-xs text-secondary-text font-light leading-relaxed max-w-xs mx-auto font-sans">
                      Explore Vian Luxure's premium collection of pure linen fabrics and customized everyday shirts.
                    </p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="px-8 py-3.5 bg-primary text-background hover:bg-primary-hover hover:text-foreground font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                /* Cart Items List */
                cartItems.map((item, idx) => {
                  const numericSinglePrice = parseInt(item.price.toString().replace(/[^\d]/g, ""), 10);
                  const totalPriceStr = `₹${(numericSinglePrice * item.quantity).toLocaleString()}`;
                  
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={item.key}
                      className="flex gap-4 pb-6 border-b border-border/40 last:border-b-0"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-24 bg-card border border-border/40 overflow-hidden flex-shrink-0 relative">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover filter contrast-[1.03]"
                        />
                      </div>

                      {/* Product info details */}
                      <div className="flex-grow flex flex-col justify-between py-0.5 text-left">
                        <div className="space-y-1">
                          <h4 className="font-heading text-[15px] leading-snug tracking-wide text-foreground hover:text-primary transition-colors">
                            {item.name}
                          </h4>
                          
                          {/* Sizing & Customizations */}
                          <div className="text-[10px] font-sans text-secondary-text tracking-wide space-y-0.5 font-light">
                            <p>Size: <span className="font-semibold text-foreground uppercase">{item.size}</span></p>
                            
                            {item.customization && (
                              <p className="italic text-primary/80">
                                {item.customization.fit} • {item.customization.collar}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Adjusters and modifiers row */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Sizer adjust */}
                          <div className="flex items-center border border-border/50 bg-[var(--input-bg)]/40 rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.key, -1)}
                              className="w-7 h-7 flex items-center justify-center text-secondary-text hover:text-foreground cursor-pointer focus:outline-none"
                            >
                              <Minus size={10} />
                            </button>
                            <span className="w-6 text-center text-xs font-semibold text-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.key, 1)}
                              className="w-7 h-7 flex items-center justify-center text-secondary-text hover:text-foreground cursor-pointer focus:outline-none"
                            >
                              <Plus size={10} />
                            </button>
                          </div>

                          {/* Trash & Price block */}
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => removeFromCart(item.key)}
                              className="text-secondary-text/60 hover:text-red-500 transition-colors cursor-pointer p-1 rounded-full hover:bg-primary/5 focus:outline-none"
                              aria-label="Remove item"
                            >
                              <Trash2 size={13} />
                            </button>
                            <span className="text-xs font-heading font-medium tracking-wide text-primary">
                              {totalPriceStr}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Bottom Checkout Controls Panel */}
            {cartItems.length > 0 && (
              <div className="p-6 md:p-8 border-t border-border bg-[var(--card-bg)]/80 backdrop-blur-md space-y-6">
                {/* Price Subtotal block */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs uppercase tracking-widest font-semibold text-secondary-text">
                    <span>Subtotal</span>
                    <span className="text-sm font-heading font-bold text-foreground">
                      ₹{getSubtotal().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-primary/80 font-bold">
                    <span>Shipping & Taxes</span>
                    <span>Complimentary</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <div className="space-y-3.5">
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-primary text-background hover:bg-primary-hover hover:text-foreground font-bold uppercase tracking-[0.25em] text-xs transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:shadow-[0_8px_24px_rgba(201,168,106,0.2)] focus:outline-none"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[9px] text-secondary-text font-sans uppercase tracking-wider">
                    <ShieldCheck size={11} className="text-primary animate-pulse" />
                    Express Secure Tailoring Checkout
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
