"use client";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Select Your Fit",
    desc: "Our process begins not with a tape measure, but with a conversation. We account for every nuance.",
    img: "/assets/rtw-3.jpg"
  },
  {
    num: "02",
    title: "Add Details",
    desc: "Tailoring fixes the mismatch between an 'off-the-rack' garment and your actual physique.",
    img: "/assets/Classical minimalism.jpg"
  },
  {
    num: "03",
    title: "Choose Fabric",
    desc: "Select from our premium range of breathable linen and soft cottons.",
    img: "/assets/TheZanHouse - Etsy.jpg"
  },
  {
    num: "04",
    title: "Craft & Deliver",
    desc: "Your custom garment is meticulously crafted and delivered, ready to wear.",
    img: "/assets/retreat polo linen short sleeve shirt เสื้อโปโลรีทรีทลินินแขนสั้น__฿2,690_S M L XL XXL__one piece collar ปกชิ้นเดียว_takase shell buttons กระดุมเปลือกหอย_triangle gusset สามเหลี่ยมข้าง_double-stitched sea.jpg"
  }
];

export default function TailoringProcess() {
  return (
    <section className="py-32 bg-background border-t border-border/40 transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-semibold"
          >
            The Process
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading mb-6 tracking-wide text-foreground"
          >
            How It Works
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-secondary-text text-lg italic font-heading max-w-2xl mx-auto"
          >
            &ldquo;It Doesn&apos;t Just Fit. It Understands You.&rdquo;
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative group flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square mb-8 overflow-hidden rounded-sm relative">
                <img 
                  src={step.img} 
                  alt={step.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary text-background font-heading text-2xl flex items-center justify-center rounded-sm shadow-xl z-10 transition-transform group-hover:-translate-y-2 group-hover:-translate-x-2 font-bold">
                  {step.num}
                </div>
              </div>
              <h3 className="text-xl font-heading mb-4 tracking-wide text-foreground">{step.title}</h3>
              <p className="text-secondary-text text-sm font-light leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
