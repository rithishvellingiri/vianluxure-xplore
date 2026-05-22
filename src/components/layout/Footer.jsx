import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-foreground pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div>
          <img 
            src="https://vianluxure.com/VL%20Global.svg" 
            alt="VIAN LUXURE" 
            className="h-12 w-auto invert mb-8"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-light">
            Comfort isn't just crafted, it's lived. Every thread tells a story of intention. Experience true luxury with our premium linen fabrics.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-6 text-white">Explore</h4>
          <ul className="space-y-4 text-sm text-muted-foreground font-light">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link href="/fabrics" className="hover:text-primary transition-colors">Shop Fabrics</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-6 text-white">Policies</h4>
          <ul className="space-y-4 text-sm text-muted-foreground font-light">
            <li><Link href="#" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Cancellation & Refunds</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] mb-6 text-white">Contact</h4>
          <ul className="space-y-5 text-sm text-muted-foreground font-light">
            <li className="flex items-start gap-4">
              <Phone size={18} className="text-primary mt-0.5" />
              <span className="hover:text-white transition-colors cursor-pointer">+91 99449 44255</span>
            </li>
            <li className="flex items-start gap-4">
              <Mail size={18} className="text-primary mt-0.5" />
              <span className="hover:text-white transition-colors cursor-pointer">vlglobalemart@gmail.com</span>
            </li>
            <li className="flex items-start gap-4">
              <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed">36/11, CHB Colony Street No-04, Tiruchengode, Namakkal-637211</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground font-light tracking-wide">
        <p>© {new Date().getFullYear()} | All Rights Reserved by VL Global.</p>
        <p className="mt-4 md:mt-0">Designed by Xplore Intellects</p>
      </div>
    </footer>
  );
}
