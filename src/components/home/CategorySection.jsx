"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    title: "Pure Materials",
    desc: "Explore pure linen and cotton fabrics designed for breathability and everyday wear.",
    href: "/fabrics",
    img: "/assets/cat-1.jpg"
  },
  {
    title: "Effortless Everyday",
    desc: "Ready-to-wear shirts designed with clean tailoring and everyday ease.",
    href: "/ready-to-wear",
    img: "/assets/cat-2.jpg"
  },
  {
    title: "Your Fit, Your Way",
    desc: "Customize selected elements such as collars, cuffs, and buttons while maintaining a comfortable fit.",
    href: "/custom-tailoring",
    img: "/assets/cat-3.jpg"
  },
  {
    title: "Fully Yours",
    desc: "A fully personalized shirt tailored around your measurements and preferences.",
    href: "/custom-tailoring",
    img: "/assets/cat-4.jpg"
  }
];

export default function CategorySection() {
  return (
    <section className="py-32 bg-secondary/50 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading mb-6 tracking-wide"
          >
            Curated Collections
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-light leading-relaxed"
          >
            From breathable linen textures to refined cotton blends, each fabric is selected for everyday wear, natural comfort, and timeless simplicity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <Link key={idx} href={cat.href}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group cursor-pointer block relative h-[550px] overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex flex-col justify-end h-full">
                  <h3 className="text-2xl font-heading mb-3 text-white tracking-wide group-hover:text-primary transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <div className="overflow-hidden">
                    <p className="text-sm text-gray-300 font-light opacity-0 transform translate-y-8 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  <div className="mt-6 w-12 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
