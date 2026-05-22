"use client";
import { Mail, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactContent() {
  return (
    <div className="pt-40 min-h-screen bg-transparent relative overflow-hidden flex flex-col">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-grow pb-24">
        <div className="max-w-4xl mx-auto text-center mb-16 pt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.4em] text-primary uppercase font-semibold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading mb-6 tracking-wide drop-shadow-lg"
          >
            Get In <span className="italic font-light">Touch</span> With Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto font-light"
          >
            We love hearing from you! Whether you have questions about our products, need assistance with your order, or simply want to share your thoughts, our team is here to help.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32">
          {/* Card 1: WhatsApp */}
          <motion.a 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            href="https://wa.me/919944944255" target="_blank" rel="noreferrer" 
            className="group p-10 bg-black/40 border border-white/5 glass rounded-sm hover:border-primary transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-2 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
              <MessageCircle size={28} className="text-primary group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-xl font-heading mb-3 tracking-wide">Let's Connect</h3>
            <p className="text-sm text-muted-foreground mb-4 font-light">Chat with us instantly on WhatsApp</p>
            <p className="text-white font-medium tracking-wide">+91 99449 44255</p>
          </motion.a>

          {/* Card 2: Email */}
          <motion.a 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            href="mailto:vlglobalemart@gmail.com" 
            className="group p-10 bg-black/40 border border-white/5 glass rounded-sm hover:border-primary transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-2 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
              <Mail size={28} className="text-primary group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-xl font-heading mb-3 tracking-wide">Email ID</h3>
            <p className="text-sm text-muted-foreground mb-4 font-light">Send us an email anytime</p>
            <p className="text-white font-medium tracking-wide">vlglobalemart@gmail.com</p>
          </motion.a>

          {/* Card 3: Address */}
          <motion.a 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            href="https://www.google.com/maps/place/V+L+Group/@11.371087,77.8701173,6849m/data=!3m1!1e3!4m6!3m5!1s0x3ba9610d097df4eb:0xc1a13cc7c29e7754!8m2!3d11.371087!4d77.8891717!16s%2Fg%2F11rn1p8_7j?entry=ttu&g_ep=EgoyMDI2MDUxNy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" 
            className="group p-10 bg-black/40 border border-white/5 glass rounded-sm hover:border-primary transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-2 shadow-2xl"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-500">
              <MapPin size={28} className="text-primary group-hover:text-black transition-colors" />
            </div>
            <h3 className="text-xl font-heading mb-3 tracking-wide">Address</h3>
            <p className="text-sm text-muted-foreground mb-4 font-light">Visit our headquarters</p>
            <p className="text-white font-medium leading-relaxed tracking-wide">
              36/11, CHB Colony Street No-04<br />
              Tiruchengode, Namakkal-637211
            </p>
          </motion.a>
        </div>
        
        {/* Banner Section matching the user's screenshot */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto bg-[#e6cc8d] rounded-sm p-12 md:p-16 relative overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.15)]"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/woven-light.png')] mix-blend-multiply pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-2/3">
              <h2 className="text-4xl md:text-5xl font-heading text-black mb-6 leading-tight tracking-wide">
                Looking for Linen <br />in Your Style?
              </h2>
              <p className="text-black/80 font-medium leading-relaxed text-lg max-w-2xl">
                From ready-to-wear styles to personalized tailoring options, find linen shirts designed with natural fabrics and clean everyday detailing.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link
                href="/ready-to-wear"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-black text-white font-semibold uppercase tracking-[0.2em] text-xs overflow-hidden transition-all hover:bg-white hover:text-black border border-black shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Get More Details
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
