"use client";
import { useState } from "react";
import { Mail, MapPin, MessageCircle, ArrowRight, CheckCircle, Send } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function ContactContent() {
  const { theme, mounted } = useTheme();
  const isLight = mounted && theme === "light-linen";
  const isInvertedClass = isLight ? "" : "invert";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const handleInput = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="pt-40 min-h-screen bg-transparent relative overflow-hidden flex flex-col">
      
      {/* Organic fluid vector decorations */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-grow pb-24 w-full">
        
        {/* Editorial Heading */}
        <div className="max-w-4xl mx-auto text-center mb-20 pt-10">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs tracking-[0.4em] text-primary uppercase font-semibold mb-4"
          >
            Connect With Us
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading mb-6 tracking-wide text-foreground leading-tight"
          >
            Get In <span className="italic font-light text-primary font-heading">Touch</span> With Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary-text leading-relaxed text-base md:text-lg max-w-2xl mx-auto font-light"
          >
            We love hearing from you! Whether you have questions about custom tailoring, fabric swatches, or styling consults, our experts are at your disposal.
          </motion.p>
        </div>
        
        {/* High-End Support Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          
          {/* Card 1: WhatsApp Support */}
          <motion.a 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            href="https://wa.me/919944944255" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group p-10 bg-card border border-border/40 glass rounded-sm hover:border-primary/40 transition-all duration-500 flex flex-col items-center text-center hover:-translate-y-1 shadow-2xl relative"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-primary group-hover:text-background transition-all duration-500 text-primary">
              <MessageCircle size={24} className="group-hover:scale-95 transition-transform" />
            </div>
            <h3 className="text-lg font-heading mb-2 tracking-wide text-foreground group-hover:text-primary transition-colors">Let&apos;s Connect</h3>
            <p className="text-xs text-secondary-text mb-4 font-light">Chat instantly on WhatsApp with styling experts</p>
            <p className="text-primary font-semibold tracking-wider text-sm">+91 99449 44255</p>
            
            <img src="/icons/arrow.svg" alt="Arrow" className={`absolute bottom-6 right-6 w-3 h-3 opacity-20 group-hover:opacity-80 transition-opacity ${isInvertedClass}`} />
          </motion.a>

          {/* Card 2: Email support */}
          <motion.a 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            href="mailto:vlglobalemart@gmail.com" 
            className="group p-10 bg-card border border-border/40 glass rounded-sm hover:border-primary/40 transition-all duration-500 flex flex-col items-center text-center hover:-translate-y-1 shadow-2xl relative"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-primary group-hover:text-background transition-all duration-500 text-primary">
              <Mail size={24} className="group-hover:scale-95 transition-transform" />
            </div>
            <h3 className="text-lg font-heading mb-2 tracking-wide text-foreground group-hover:text-primary transition-colors">Email Directory</h3>
            <p className="text-xs text-secondary-text mb-4 font-light">Send us wholesale or general support inquiries</p>
            <p className="text-primary font-semibold tracking-wider text-sm">vlglobalemart@gmail.com</p>

            <img src="/icons/arrow.svg" alt="Arrow" className={`absolute bottom-6 right-6 w-3 h-3 opacity-20 group-hover:opacity-80 transition-opacity ${isInvertedClass}`} />
          </motion.a>

          {/* Card 3: Physical Address */}
          <motion.a 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            href="https://www.google.com/maps/place/V+L+Group/@11.371087,77.8701173,6849m/data=!3m1!1e3!4m6!3m5!1s0x3ba9610d097df4eb:0xc1a13cc7c29e7754!8m2!3d11.371087!4d77.8891717!16s%2Fg%2F11rn1p8_7j?entry=ttu" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group p-10 bg-card border border-border/40 glass rounded-sm hover:border-primary/40 transition-all duration-500 flex flex-col items-center text-center hover:-translate-y-1 shadow-2xl relative"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-primary group-hover:text-background transition-all duration-500 text-primary">
              <MapPin size={24} className="group-hover:scale-95 transition-transform" />
            </div>
            <h3 className="text-lg font-heading mb-2 tracking-wide text-foreground group-hover:text-primary transition-colors">Headquarters</h3>
            <p className="text-xs text-secondary-text mb-4 font-light">Visit our physical fabrics design center</p>
            <p className="text-foreground font-medium leading-relaxed tracking-wide text-xs">
              36/11, CHB Colony Street No-04,<br />
              Tiruchengode, Namakkal - 637211
            </p>

            <img src="/icons/arrow.svg" alt="Arrow" className={`absolute bottom-6 right-6 w-3 h-3 opacity-20 group-hover:opacity-80 transition-opacity ${isInvertedClass}`} />
          </motion.a>
        </div>

        {/* 2-Column Split: Google Map & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto mb-24 items-stretch">
          
          {/* Left: Google Maps Frame */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-card border border-border/40 rounded-sm p-4 flex flex-col shadow-2xl relative h-[450px] lg:h-auto"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.845187766157!2d77.88200632551408!3d11.37108696236968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9610d097df4eb%3A0xc1a13cc7c29e7754!2sV%20L%20Group!5e0!3m2!1sen!2sin!4v1716370000000!5m2!1sen!2sin" 
              className="w-full h-full rounded-sm grayscale contrast-115 filter opacity-75 hover:opacity-90 transition-opacity"
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Vian Luxure Namakkal Office location"
            />
          </motion.div>

          {/* Right: Premium Glass Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 p-8 md:p-10 bg-card border border-border/40 glass rounded-sm shadow-2xl relative overflow-hidden flex flex-col justify-between"
          >
            {/* Background overlay illustration */}
            <div 
              className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: `url('/icons/form-bg.svg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-primary/80 font-sans font-semibold border-b border-primary/20 pb-1 mb-6 inline-block">
                Direct Dispatch Form
              </span>
              <h3 className="text-2xl font-heading text-foreground mb-6 tracking-wide">Write Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-secondary-text font-sans">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInput("name", e.target.value)}
                      style={{ backgroundColor: "var(--input-bg)" }}
                      className="w-full border border-border/40 rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 font-sans font-light"
                      placeholder="e.g. Sanjay Menon"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] uppercase tracking-wider text-secondary-text font-sans">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInput("phone", e.target.value)}
                      style={{ backgroundColor: "var(--input-bg)" }}
                      className="w-full border border-border/40 rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 font-sans font-light"
                      placeholder="e.g. +91 99449 44255"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-secondary-text font-sans">Email ID</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInput("email", e.target.value)}
                    style={{ backgroundColor: "var(--input-bg)" }}
                    className="w-full border border-border/40 rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 font-sans font-light"
                    placeholder="e.g. client@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-wider text-secondary-text font-sans">Your Message</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => handleInput("message", e.target.value)}
                    style={{ backgroundColor: "var(--input-bg)" }}
                    className="w-full border border-border/40 rounded-sm px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 font-sans font-light resize-none"
                    placeholder="Specify bespoke parameters or shirting styles requested..."
                  />
                </div>

                <AnimatePresence>
                  {success && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-primary font-semibold bg-primary/10 border border-primary/20 py-3 rounded-sm flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={14} />
                      Your message has been dispatched successfully! We&apos;ll reply within 24 hours.
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-background hover:text-foreground font-semibold uppercase tracking-[0.2em] py-4 hover:bg-primary-hover transition-all duration-300 text-xs flex items-center justify-center gap-2 shadow-xl rounded-sm disabled:opacity-50 cursor-pointer"
                >
                  <Send size={12} />
                  {submitting ? "Dispatching..." : "Send Message"}
                </button>

              </form>
            </div>
          </motion.div>

        </div>
        
        {/* Call to Action Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto bg-gradient-to-r from-primary/15 to-primary/25 border border-primary/30 rounded-sm p-12 md:p-16 relative overflow-hidden shadow-lg"
        >
          <div className="absolute inset-0 opacity-15 bg-[url('https://www.transparenttextures.com/patterns/woven-light.png')] mix-blend-multiply pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-2/3">
              <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6 leading-tight tracking-wide">
                Looking for Linen <br />in Your Style?
              </h2>
              <p className="text-secondary-text font-medium leading-relaxed text-base md:text-lg max-w-2xl">
                From ready-to-wear styles to personalized tailoring options, find linen shirts designed with natural fabrics and clean everyday detailing.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link
                href="/ready-to-wear"
                className="group relative inline-flex items-center justify-center px-10 py-5 bg-primary text-background font-semibold uppercase tracking-[0.2em] text-xs overflow-hidden transition-all hover:bg-primary-hover hover:text-foreground border border-primary/25 shadow-2xl"
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
