export const metadata = {
  title: "Ready to Wear | VIAN LUXURE",
  description: "Find ready-to-wear shirts designed with clean tailoring and everyday ease.",
};

const shirts = [
  { name: "Classic White Linen", price: "₹2,499", img: "/assets/rtw-1.jpg" },
  { name: "Navy Blue Everyday Fit", price: "₹2,199", img: "/assets/rtw-2.jpg" },
  { name: "Olive Green Relaxed", price: "₹2,699", img: "/assets/rtw-3.jpg" },
  { name: "Sky Blue Cotton Blend", price: "₹2,299", img: "/assets/rtw-4.jpg" },
  { name: "Charcoal Evening Shirt", price: "₹2,899", img: "/assets/rtw-5.jpg" },
  { name: "Desert Sand Safari", price: "₹2,499", img: "/assets/rtw-6.jpg" },
  { name: "Crimson Red Linen", price: "₹2,599", img: "/assets/rtw-7.jpg" },
  { name: "Slate Grey Essential", price: "₹2,199", img: "/assets/rtw-8.jpg" }
];

export default function ReadyToWearPage() {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-background relative">
      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-heading mb-6 tracking-wide">Ready to Wear</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-20 font-light leading-relaxed text-lg">
          Find ready-to-wear shirts designed with clean tailoring and everyday ease. Choose your preferred fabric, select your size, and enjoy shirts made for regular wear.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {shirts.map((shirt, i) => (
            <div key={i} className="group cursor-pointer text-left">
              <div className="aspect-[3/4] bg-secondary mb-6 overflow-hidden rounded-sm relative shadow-lg">
                <img 
                  src={shirt.img}
                  alt={shirt.name} 
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100 filter contrast-125" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <button className="w-full bg-primary text-black font-semibold uppercase tracking-widest text-xs py-3 hover:bg-white transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-heading mb-1 group-hover:text-primary transition-colors tracking-wide">{shirt.name}</h3>
              <p className="text-sm text-muted-foreground font-light">{shirt.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
