"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Sparkles, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Fabric", href: "/fabrics" },
  { name: "Ready to Wear", href: "/ready-to-wear" },
  { name: "Made to Wear", href: "/custom-tailoring" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Compute theme-specific styling classes
  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
          ? "glass border-b border-border/10 py-4 shadow-md"
          : "bg-transparent py-8"
        }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" id="nav-logo-link">
          <img
            src="/logo/VL_Global.svg"
            alt="VIAN LUXURE"
            className={`h-10 w-auto hover:scale-105 transition-all duration-300 ${isInvertedClass}`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-xs uppercase tracking-[0.2em] transition-colors duration-300 font-semibold ${isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
                  }`}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Luxury Header Actions & Theme Toggle & Cart Trigger */}
        <div className="hidden md:flex items-center space-x-6 border-l border-border/20 pl-8">
          {/* Dynamic Theme Switcher Widget */}
          {mounted && (
            <div className="flex items-center gap-1 bg-foreground/5 p-1 rounded-full border border-border/10 shadow-inner mr-2">
              <button
                onClick={() => setTheme("light-linen")}
                className={`p-1.5 rounded-full transition-all duration-300 cursor-pointer ${theme === "light-linen"
                    ? "bg-primary text-background shadow-sm scale-105"
                    : "text-foreground/50 hover:text-foreground hover:scale-105"
                  }`}
                title="Light Linen Theme"
              >
                <Sun size={12} />
              </button>
              <button
                onClick={() => setTheme("premium-gold")}
                className={`p-1.5 rounded-full transition-all duration-300 cursor-pointer ${theme === "premium-gold"
                    ? "bg-primary text-background shadow-sm scale-105"
                    : "text-foreground/50 hover:text-foreground hover:scale-105"
                  }`}
                title="Premium Gold Theme"
              >
                <Sparkles size={12} />
              </button>
              <button
                onClick={() => setTheme("luxury-dark")}
                className={`p-1.5 rounded-full transition-all duration-300 cursor-pointer ${theme === "luxury-dark"
                    ? "bg-primary text-background shadow-sm scale-105"
                    : "text-foreground/50 hover:text-foreground hover:scale-105"
                  }`}
                title="Luxury Dark Theme"
              >
                <Moon size={12} />
              </button>
            </div>
          )}

          <button
            id="wishlist-trigger"
            className="relative group cursor-pointer p-2 rounded-full hover:bg-primary/10 transition-all duration-300"
          >
            <img
              src="/icons/wishlist.svg"
              alt="Wishlist"
              className={`
      w-6 h-6
      opacity-100
      brightness-125
      contrast-125
      group-hover:scale-125
      transition-all duration-300
      ${isInvertedClass}
    `}
            />
          </button>

          <button
            id="cart-trigger"
            className="relative group cursor-pointer p-2 rounded-full hover:bg-primary/10 transition-all duration-300"
          >
            <img
              src="/icons/cart.svg"
              alt="Cart"
              className={`
      w-6 h-6
      opacity-100
      brightness-125
      contrast-125
      group-hover:scale-125
      transition-all duration-300
      ${isInvertedClass}
    `}
            />

            <span
              className="
      absolute -top-1 -right-1
      bg-primary
      text-white
      text-[10px]
      font-bold
      w-5 h-5
      rounded-full
      flex items-center justify-center
      shadow-lg
      shadow-primary/30
    "
            >
              0
            </span>
          </button>

          <Link
            href="/contact"
            id="profile-trigger"
            className="group cursor-pointer p-2 rounded-full hover:bg-primary/10 transition-all duration-300"
          >
            <img
              src="/icons/profile.svg"
              alt="Profile"
              className={`
      w-6 h-6
      opacity-100
      brightness-125
      contrast-125
      group-hover:scale-125
      transition-all duration-300
      ${isInvertedClass}
    `}
            />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button id="mobile-cart-trigger" className="text-foreground/80 hover:text-primary transition-colors relative mr-2">
            <img
              src="/icons/cart.svg"
              alt="Cart"
              className={`w-6 h-6 ${isInvertedClass}`}
            />
            <span className="absolute -top-1 -right-1.5 bg-primary text-background text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              0
            </span>
          </button>
          <button
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 w-full bg-background/98 backdrop-blur-3xl z-45 md:hidden flex flex-col items-center justify-center space-y-8"
          >
            <button
              className="absolute top-8 right-6 text-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <img
              src="/logo/VL_Global.svg"
              alt="VIAN LUXURE"
              className={`h-12 w-auto mb-4 ${isInvertedClass}`}
            />

            {/* Mobile Theme Switcher */}
            {mounted && (
              <div className="flex items-center gap-2 bg-foreground/5 p-1 rounded-full border border-border/10 shadow-md mb-4">
                <button
                  onClick={() => setTheme("light-linen")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-xs flex items-center gap-1.5 cursor-pointer ${theme === "light-linen"
                      ? "bg-primary text-background shadow-md font-semibold"
                      : "text-foreground/60"
                    }`}
                >
                  <Sun size={14} /> Light
                </button>
                <button
                  onClick={() => setTheme("premium-gold")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-xs flex items-center gap-1.5 cursor-pointer ${theme === "premium-gold"
                      ? "bg-primary text-background shadow-md font-semibold"
                      : "text-foreground/60"
                    }`}
                >
                  <Sparkles size={14} /> Gold
                </button>
                <button
                  onClick={() => setTheme("luxury-dark")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-xs flex items-center gap-1.5 cursor-pointer ${theme === "luxury-dark"
                      ? "bg-primary text-background shadow-md font-semibold"
                      : "text-foreground/60"
                    }`}
                >
                  <Moon size={14} /> Dark
                </button>
              </div>
            )}

            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
              >
                <Link
                  href={link.href}
                  className={`text-xl uppercase tracking-[0.3em] font-semibold transition-colors ${pathname === link.href ? "text-primary" : "text-foreground/70 hover:text-foreground"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
