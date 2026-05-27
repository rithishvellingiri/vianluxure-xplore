"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Sparkles, Moon, User, Heart, ShoppingBag, LogOut, Phone, Layers, ShieldCheck } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useAuth } from "@/context/AuthContext";
import CartDrawer from "./CartDrawer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, mounted } = useTheme();
  const { user, logout, cartCount, cartOpen, setCartOpen } = useAuth();

  const navRef = useRef(null);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const cartBadgeRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // 1. Scroll triggers for blur, shadow, padding & height adjustments
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      const scrolled = window.scrollY > 30;
      setIsScrolled(scrolled);

      if (scrolled) {
        gsap.to(navRef.current, {
          y: 8,
          paddingTop: "14px",
          paddingBottom: "14px",
          backgroundColor: theme === "light-linen" ? "rgba(255, 255, 255, 0.65)" : "rgba(18, 18, 18, 0.65)",
          backdropFilter: "blur(20px)",
          boxShadow: theme === "light-linen" ? "0 10px 30px rgba(201, 168, 106, 0.1)" : "0 10px 30px rgba(0, 0, 0, 0.5)",
          borderWidth: "1px",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        gsap.to(navRef.current, {
          y: 16,
          paddingTop: "22px",
          paddingBottom: "22px",
          backgroundColor: theme === "light-linen" ? "rgba(255, 255, 255, 0.4)" : "rgba(18, 18, 18, 0.4)",
          backdropFilter: "blur(12px)",
          boxShadow: theme === "light-linen" ? "0 4px 20px rgba(201, 168, 106, 0.03)" : "0 4px 20px rgba(0, 0, 0, 0.2)",
          borderWidth: "1px",
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger scroll function once on mount to handle initial load position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  // 2. Coordinated GSAP page entrance reveal timeline
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Reset starting load states
    gsap.set(".gsap-reveal-logo", { opacity: 0, y: 15 });
    gsap.set(".gsap-reveal-item", { opacity: 0, y: 15 });
    gsap.set(".gsap-reveal-wishlist", { opacity: 0, y: 15 });
    gsap.set(".gsap-reveal-cart", { opacity: 0, y: 15 });
    gsap.set(".gsap-reveal-profile", { opacity: 0, y: 15 });

    const tl = gsap.timeline({ delay: 0.15 });

    tl.to(".gsap-reveal-logo", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .to(".gsap-reveal-item", { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" }, "-=0.45")
      .to(".gsap-reveal-wishlist", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(".gsap-reveal-cart", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3")
      .to(".gsap-reveal-profile", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");

  }, []);

  // 2b. Coordinated GSAP reveal for hydrated theme selector
  useEffect(() => {
    if (mounted) {
      const target = document.querySelector(".gsap-reveal-theme");
      if (target) {
        gsap.fromTo(target,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.15 }
        );
      }
    }
  }, [mounted]);

  // 3. Stagger reveal dropdown menu
  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      gsap.fromTo(dropdownRef.current,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
      );
      gsap.fromTo(".dropdown-item-gsap",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [dropdownOpen]);

  // 4. Stagger reveal mobile overlay menu
  useEffect(() => {
    if (mobileMenuOpen && mobileMenuRef.current) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, clipPath: "circle(0% at 100% 0%)" },
        { opacity: 1, clipPath: "circle(150% at 100% 0%)", duration: 0.8, ease: "power4.inOut" }
      );
      gsap.fromTo(".mobile-nav-item-gsap",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "power3.out", delay: 0.25 }
      );
    }
  }, [mobileMenuOpen]);

  // 5. Cart count pop update feedback
  useEffect(() => {
    if (cartCount > 0 && cartBadgeRef.current) {
      gsap.fromTo(cartBadgeRef.current,
        { scale: 0.6, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2.5)", overwrite: "auto" }
      );
    }
  }, [cartCount]);

  // Gold hover underline triggers
  const handleLinkMouseEnter = (e, isActive) => {
    if (isActive) return;
    const underline = e.currentTarget.querySelector(".gold-underline");
    if (underline) {
      gsap.to(underline, {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  };

  const handleLinkMouseLeave = (e, isActive) => {
    if (isActive) return;
    const underline = e.currentTarget.querySelector(".gold-underline");
    if (underline) {
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right center",
        duration: 0.4,
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
  };

  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  return (
    <>
      <nav
        ref={navRef}
        style={{
          maxWidth: "1400px",
          width: "calc(100% - 2rem)",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999
        }}
        className={`fixed top-0 transition-all border border-border/10 rounded-[20px] md:rounded-[24px] shadow-sm flex flex-col justify-center`}
      >
        {/* Subtle premium linen texture overlay */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none rounded-[20px] md:rounded-[24px] opacity-[0.03] bg-repeat mix-blend-overlay"
          style={{
            backgroundImage: "url('/assets/premium-linen-bg.jpg')",
            backgroundSize: "180px"
          }}
        />

        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between relative z-10 w-full">
          
          {/* Logo element (GSAP Load Animated) */}
          <div className="gsap-reveal-logo">
            <Link href="/" className="flex items-center gap-3 p-1 block hover:scale-102 transition-transform duration-300" id="nav-logo-link">
              <img
                src="/logo/VL_Global.svg"
                alt="VIAN LUXURE"
                className={`h-9 w-auto ${isInvertedClass}`}
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-9">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={(e) => handleLinkMouseEnter(e, isActive)}
                  onMouseLeave={(e) => handleLinkMouseLeave(e, isActive)}
                  className={`relative text-xs uppercase tracking-[0.2em] transition-colors duration-300 font-semibold py-1.5 group gsap-reveal-item ${
                    isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"
                  }`}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.name}
                  {/* Premium gold hover line growing from left to right */}
                  <span
                    className="absolute bottom-[-1px] left-0 right-0 h-[1.5px] bg-primary gold-underline transition-all duration-300"
                    style={{
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left center"
                    }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions Panel */}
          <div className="hidden md:flex items-center space-x-5 border-l border-border/20 pl-6">
            
            {/* Theme selector widget */}
            <div 
              style={!mounted ? { opacity: 0, transform: "translateY(15px)" } : undefined}
              className="flex items-center gap-0.5 bg-foreground/5 p-0.5 rounded-full border border-border/10 shadow-inner mr-1.5 gsap-reveal-theme hover:scale-102 transition-transform duration-300 min-h-[32px] min-w-[96px]"
            >
              {mounted ? (
                <>
                  <button
                    onClick={() => setTheme("light-linen")}
                    className={`p-1.5 rounded-full transition-all duration-300 cursor-pointer ${theme === "light-linen"
                        ? "bg-primary text-background shadow-sm scale-105"
                        : "text-foreground/50 hover:text-foreground hover:scale-105"
                      }`}
                    title="Light Linen Theme"
                  >
                    <Sun size={11} />
                  </button>
                  <button
                    onClick={() => setTheme("premium-gold")}
                    className={`p-1.5 rounded-full transition-all duration-300 cursor-pointer ${theme === "premium-gold"
                        ? "bg-primary text-background shadow-sm scale-105"
                        : "text-foreground/50 hover:text-foreground hover:scale-105"
                      }`}
                    title="Premium Gold Theme"
                  >
                    <Sparkles size={11} />
                  </button>
                  <button
                    onClick={() => setTheme("luxury-dark")}
                    className={`p-1.5 rounded-full transition-all duration-300 cursor-pointer ${theme === "luxury-dark"
                        ? "bg-primary text-background shadow-sm scale-105"
                        : "text-foreground/50 hover:text-foreground hover:scale-105"
                      }`}
                    title="Luxury Dark Theme"
                  >
                    <Moon size={11} />
                  </button>
                </>
              ) : (
                <div className="w-24 h-4" />
              )}
            </div>

            {/* Wishlist Button */}
            <div className="gsap-reveal-wishlist">
              <button
                id="wishlist-trigger"
                onClick={() => alert("Wishlist panel is under development.")}
                className="relative group cursor-pointer p-2 rounded-full hover:bg-primary/10 hover:scale-110 hover:shadow-[0_0_12px_rgba(201,168,106,0.25)] transition-all duration-300 flex items-center justify-center"
              >
                <img
                  src="/icons/wishlist.svg"
                  alt="Wishlist"
                  className={`w-5.5 h-5.5 transition-all duration-300 ${isInvertedClass}`}
                />
              </button>
            </div>

            {/* Cart Button */}
            <div className="gsap-reveal-cart">
              <button
                id="cart-trigger"
                onClick={() => setCartOpen(!cartOpen)}
                className="relative group cursor-pointer p-2 rounded-full hover:bg-primary/10 hover:scale-110 hover:shadow-[0_0_12px_rgba(201,168,106,0.25)] transition-all duration-300 focus:outline-none flex items-center justify-center"
              >
                <img
                  src="/icons/cart.svg"
                  alt="Cart"
                  className={`w-5.5 h-5.5 transition-all duration-300 ${isInvertedClass}`}
                />
                {/* updates pop-up badge */}
                <span
                  ref={cartBadgeRef}
                  className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md shadow-primary/30"
                >
                  {cartCount}
                </span>
              </button>
            </div>

            {/* Profile Dropdown Trigger */}
            <div className="relative flex items-center gsap-reveal-profile">
              {user ? (
                <button
                  id="profile-trigger"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="group cursor-pointer p-2 rounded-full hover:bg-primary/10 hover:scale-110 hover:shadow-[0_0_12px_rgba(201,168,106,0.25)] transition-all duration-300 flex items-center justify-center focus:outline-none"
                >
                  <div className="h-7 w-7 bg-primary text-background font-bold text-[10px] flex items-center justify-center shadow-[0_0_8px_rgba(201,168,106,0.15)] rounded-full group-hover:scale-105 transition-transform duration-300 select-none">
                    {user.avatar}
                  </div>
                </button>
              ) : (
                <Link
                  href="/login"
                  id="profile-trigger"
                  className="group cursor-pointer p-2 rounded-full hover:bg-primary/10 hover:scale-110 hover:shadow-[0_0_12px_rgba(201,168,106,0.25)] transition-all duration-300 block"
                >
                  <img
                    src="/icons/profile.svg"
                    alt="Profile"
                    className={`w-5.5 h-5.5 transition-all duration-300 ${isInvertedClass}`}
                  />
                </Link>
              )}

              {/* Upgraded dropdown menu containing 5 items */}
              {dropdownOpen && user && (
                <>
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 top-full mt-3.5 w-76 bg-[var(--card-bg)] border border-border shadow-lg z-50 p-6 flex flex-col space-y-4 glass rounded-[16px] overflow-hidden"
                  >
                    {/* Subtle inner linen texture */}
                    <div 
                      className="absolute inset-0 z-0 pointer-events-none rounded-[16px] opacity-[0.02] bg-repeat"
                      style={{
                        backgroundImage: "url('/assets/premium-linen-bg.jpg')",
                        backgroundSize: "140px"
                      }}
                    />

                    {/* User profile details header */}
                    <div className="flex items-center gap-3.5 pb-4 border-b border-border/60 relative z-10">
                      <div className="h-9 w-9 bg-primary text-background font-bold text-xs flex items-center justify-center rounded-sm shadow-md select-none">
                        {user.avatar}
                      </div>
                      <div className="flex flex-col text-left">
                        <h4 className="font-heading font-semibold tracking-wide text-foreground text-xs">
                          {user.firstName} {user.lastName}
                        </h4>
                        <p className="text-[9px] text-secondary-text tracking-wide mt-0.5 select-all font-sans">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Menu items (GSAP Staggered) */}
                    <div className="flex flex-col space-y-1 relative z-10">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          alert("My Account dashboard is under development.");
                        }}
                        className="flex items-center gap-3 px-2.5 py-2 text-[10px] text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all text-left uppercase tracking-widest font-semibold group dropdown-item-gsap border-b border-border/10 pb-2"
                      >
                        <User size={12} className="text-secondary-text/80 group-hover:text-primary" />
                        <span>My Account</span>
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          alert("Orders registry is under development.");
                        }}
                        className="flex items-center gap-3 px-2.5 py-2 text-[10px] text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all text-left uppercase tracking-widest font-semibold group dropdown-item-gsap border-b border-border/10 py-2"
                      >
                        <ShoppingBag size={12} className="text-secondary-text/80 group-hover:text-primary" />
                        <span>Orders</span>
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          alert("Wishlist panel is under development.");
                        }}
                        className="flex items-center gap-3 px-2.5 py-2 text-[10px] text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all text-left uppercase tracking-widest font-semibold group dropdown-item-gsap border-b border-border/10 py-2"
                      >
                        <Heart size={12} className="text-secondary-text/80 group-hover:text-primary" />
                        <span>Wishlist</span>
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          router.push("/contact");
                        }}
                        className="flex items-center gap-3 px-2.5 py-2 text-[10px] text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all text-left uppercase tracking-widest font-semibold group dropdown-item-gsap border-b border-border/10 py-2"
                      >
                        <Phone size={12} className="text-secondary-text/80 group-hover:text-primary" />
                        <span>Contact Us</span>
                      </button>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 px-2.5 py-2.5 text-[10px] text-red-500 hover:text-red-600 hover:bg-red-500/5 transition-all text-left uppercase tracking-widest font-bold group dropdown-item-gsap pt-3"
                      >
                        <LogOut size={12} className="text-red-500/80 group-hover:text-red-600" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center space-x-3.5 md:hidden">
            <button 
              id="mobile-cart-trigger" 
              onClick={() => setCartOpen(!cartOpen)}
              className="text-foreground/80 hover:text-primary transition-colors relative mr-1 focus:outline-none"
            >
              <img
                src="/icons/cart.svg"
                alt="Cart"
                className={`w-5.5 h-5.5 ${isInvertedClass}`}
              />
              <span className="absolute -top-1 -right-1 bg-primary text-background text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
            <button
              className="text-foreground hover:text-primary transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu with circular wipe reveal */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="fixed inset-0 w-full bg-background/98 backdrop-blur-3xl z-45 md:hidden flex flex-col items-center justify-center space-y-7 h-screen"
          >
            {/* Subtle linen texture inside mobile overlay */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-repeat"
              style={{
                backgroundImage: "url('/assets/premium-linen-bg.jpg')",
                backgroundSize: "160px"
              }}
            />

            <button
              className="absolute top-8 right-6 text-foreground hover:text-primary transition-colors cursor-pointer z-10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={26} />
            </button>
            
            <img
              src="/logo/VL_Global.svg"
              alt="VIAN LUXURE"
              className={`h-10 w-auto mb-4 z-10 ${isInvertedClass}`}
            />

            {/* Mobile Theme selector */}
            {mounted && (
              <div className="flex items-center gap-1 bg-foreground/5 p-1 rounded-full border border-border/10 shadow-md mb-4 z-10 mobile-nav-item-gsap">
                <button
                  onClick={() => setTheme("light-linen")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-xs flex items-center gap-1.5 cursor-pointer ${theme === "light-linen"
                      ? "bg-primary text-background shadow-md font-semibold"
                      : "text-foreground/60"
                    }`}
                >
                  <Sun size={12} /> Light
                </button>
                <button
                  onClick={() => setTheme("premium-gold")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-xs flex items-center gap-1.5 cursor-pointer ${theme === "premium-gold"
                      ? "bg-primary text-background shadow-md font-semibold"
                      : "text-foreground/60"
                    }`}
                >
                  <Sparkles size={12} /> Gold
                </button>
                <button
                  onClick={() => setTheme("luxury-dark")}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-xs flex items-center gap-1.5 cursor-pointer ${theme === "luxury-dark"
                      ? "bg-primary text-background shadow-md font-semibold"
                      : "text-foreground/60"
                    }`}
                >
                  <Moon size={12} /> Dark
                </button>
              </div>
            )}

            {/* Mobile Links */}
            {navLinks.map((link, idx) => (
              <div key={link.name} className="mobile-nav-item-gsap z-10">
                <Link
                  href={link.href}
                  className={`text-lg uppercase tracking-[0.25em] font-semibold transition-colors ${
                    pathname === link.href ? "text-primary" : "text-foreground/75 hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </div>
            ))}

            {/* Mobile Authentication Info */}
            {user ? (
              <div className="w-full flex flex-col items-center border-t border-border/20 pt-6 mt-4 px-6 mobile-nav-item-gsap z-10">
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="h-9 w-9 bg-primary text-background font-bold flex items-center justify-center border border-primary/20 text-xs select-none rounded-sm">
                    {user.avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-heading font-medium tracking-wide text-foreground">
                      {user.firstName} {user.lastName}
                    </h4>
                    <p className="text-[9px] text-secondary-text font-sans mt-0.5">{user.email}</p>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4.5 w-full text-[10px] uppercase tracking-[0.2em] font-bold">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      alert("My Account dashboard is under development.");
                    }}
                    className="text-foreground/75 hover:text-primary transition-colors cursor-pointer"
                  >
                    My Account
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      alert("Orders registry is under development.");
                    }}
                    className="text-foreground/75 hover:text-primary transition-colors cursor-pointer"
                  >
                    Orders
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      alert("Wishlist panel is under development.");
                    }}
                    className="text-foreground/75 hover:text-primary transition-colors cursor-pointer"
                  >
                    Wishlist
                  </button>
                  
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-red-500 hover:text-red-600 transition-colors font-bold pt-3 mt-1.5 border-t border-border/10 w-2/3 text-center cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-t border-border/20 pt-6 mt-4 w-full flex justify-center px-8 mobile-nav-item-gsap z-10">
                <Link
                  href="/login"
                  className="text-[10px] uppercase tracking-[0.2em] font-bold text-background bg-primary hover:bg-primary-hover py-3 px-8 text-center w-full transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login / Register
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
      <CartDrawer />
    </>
  );
}
