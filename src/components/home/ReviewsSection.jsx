"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const reviews = [
  {
    name: "Karthik Raj",
    rating: 5,
    quote: "Their ready-to-wear designs are modern, well-structured, and easy to style for both casual and formal occasions. The fit matches bespoke quality.",
    role: "Verified Client",
    img: "/images/customer-review-4.webp"
  },
  {
    name: "Sanjay Menon",
    rating: 4,
    quote: "What I liked most was the consistency in quality. The shirts looked elegant, felt comfortable, and were ready to wear straight away. Outstanding texture.",
    role: "Verified Client",
    img: "/images/customer-review-3.webp"
  },
  {
    name: "Karthik",
    rating: 4,
    quote: "I liked the natural linen feel, and the fabric width was perfect for shirt stitching. Ideal for tropical climates as it breathes incredibly well.",
    role: "Bespoke Patron",
    img: "/images/customer-review-2.webp"
  },
  {
    name: "Dinesh",
    rating: 3,
    quote: "Good breathable fabric with a soft feel. Suitable for both casual and formal shirt stitching. The shipping was prompt and packaging was exceptionally premium.",
    role: "Bespoke Patron",
    img: "/images/customer-review-section.webp"
  },
  {
    name: "Arjun",
    rating: 3,
    quote: "The fabric feels soft and breathable for everyday wear. The texture and overall quality looked really good. Fits my routine perfectly.",
    role: "Everyday Wearer",
    img: "/images/customer-review-4.webp"
  }
];

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setActive((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-play testimonial carousel
  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
    exit: (dir) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] }
    })
  };

  return (
    <section className="py-32 bg-background relative overflow-hidden border-t border-border/40" id="reviews-section">
      {/* Editorial Watermark background */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none text-[15vw] font-heading font-light text-foreground tracking-[0.2em] z-0 hidden lg:block">
        STORIES
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <p className="text-primary tracking-[0.3em] uppercase text-xs mb-4 font-semibold">
            Client Journals
          </p>
          <h2 className="text-4xl md:text-5xl font-heading tracking-wide text-foreground">
            Customer Stories
          </h2>
        </div>

        {/* Carousel Frame */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Portrait Left */}
          <div className="w-full lg:w-2/5 aspect-[4/5] max-w-sm rounded-sm overflow-hidden border border-border/40 relative shadow-2xl shrink-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={reviews[active].img}
                alt={reviews[active].name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.8, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover filter grayscale contrast-110 brightness-[0.8]"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                {reviews[active].role}
              </p>
              <h4 className="text-xl text-white font-heading tracking-wide">
                {reviews[active].name}
              </h4>
            </div>
          </div>

          {/* Review Details Right */}
          <div className="w-full lg:w-3/5 flex flex-col justify-center min-h-[350px]">
            <Quote className="text-primary/20 w-16 h-16 mb-6 self-start shrink-0" />
            
            <div className="relative overflow-hidden flex-grow">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={active}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <p className="text-xl sm:text-2xl font-heading font-light text-foreground leading-relaxed tracking-wide italic">
                    &ldquo;{reviews[active].quote}&rdquo;
                  </p>
                  
                  {/* Stars Rating */}
                  <div className="flex items-center gap-1.5 pt-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < reviews[active].rating ? "text-primary" : "text-foreground/10"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border/40 self-start">
              <button 
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all duration-300 glass"
                aria-label="Previous story"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs uppercase tracking-widest text-secondary-text font-semibold font-sans">
                {String(active + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
              </span>
              <button 
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all duration-300 glass"
                aria-label="Next story"
              >
                <ChevronRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
