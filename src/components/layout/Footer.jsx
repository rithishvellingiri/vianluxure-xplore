"use client";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function Footer() {
  const { theme, mounted } = useTheme();
  
  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  return (
    <footer className="bg-card text-foreground pt-24 pb-12 border-t border-border transition-colors duration-500 relative z-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
        {/* Brand */}
        <div className="space-y-6">
          <img 
            src="/logo/FooterLogo.svg" 
            alt="VIAN LUXURE" 
            className={`h-12 w-auto mb-6 transition-all duration-500 ${isInvertedClass}`}
          />
          <p className="text-secondary-text text-sm leading-relaxed font-light">
            Comfort isn&apos;t just crafted, it&apos;s lived. Every thread tells a story of intention. Experience true luxury with our premium linen fabrics.
          </p>
          <div className="flex gap-3 pt-2">
            {[
              { href: "https://facebook.com", img: "/icons/fb.svg", alt: "Facebook" },
              { href: "https://instagram.com", img: "/icons/insta.svg", alt: "Instagram" },
              { href: "https://twitter.com", img: "/icons/twitter.svg", alt: "Twitter" },
              { href: "https://youtube.com", img: "/icons/youtube.svg", alt: "YouTube" }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href} 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
              >
                <img 
                  src={social.img} 
                  alt={social.alt} 
                  className={`w-4 h-4 group-hover:scale-110 transition-transform ${isInvertedClass}`} 
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-foreground/90 border-b border-border pb-3">Explore</h4>
          <ul className="space-y-4 text-sm text-secondary-text font-light">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/fabrics" className="hover:text-primary transition-colors">Shop Fabrics</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-foreground/90 border-b border-border pb-3">Policies</h4>
          <ul className="space-y-4 text-sm text-secondary-text font-light">
            <li><Link href="#" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Cancellation & Refunds</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-foreground/90 border-b border-border pb-3">Contact</h4>
          <ul className="space-y-5 text-sm text-secondary-text font-light">
            <li className="flex items-start gap-4">
              <Phone size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <a href="https://wa.me/919944944255" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors cursor-pointer font-medium">+91 99449 44255</a>
            </li>
            <li className="flex items-start gap-4">
              <Mail size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <a href="mailto:vlglobalemart@gmail.com" className="hover:text-primary transition-colors cursor-pointer font-medium">vlglobalemart@gmail.com</a>
            </li>
            <li className="flex items-start gap-4">
              <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <a
                href="https://www.google.com/maps/place/V+L+Group/@11.371087,77.8701173,6849m/data=!3m1!1e3!4m6!3m5!1s0x3ba9610d097df4eb:0xc1a13cc7c29e7754!8m2!3d11.371087!4d77.8891717!16s%2Fg%2F11rn1p8_7j?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="leading-relaxed hover:text-primary transition-colors cursor-pointer"
              >
                36/11, CHB Colony Street No-04, Tiruchengode, Namakkal-637211
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-xs text-secondary-text font-light tracking-wide">
        <p>© {new Date().getFullYear()} | All Rights Reserved by VL Global.</p>
        <p className="mt-4 md:mt-0 font-medium">Designed by Xplore Intellects</p>
      </div>
    </footer>
  );
}
