import CustomizationSelector from "@/components/tailoring/CustomizationSelector";

export const metadata = {
  title: "Bespoke Tailoring | VIAN LUXURE",
  description: "Create a fully personalized shirt tailored around your measurements and preferences.",
};

export default function CustomTailoringPage() {
  return (
    <div className="pt-40 pb-24 min-h-screen bg-background relative">
      <div className="container mx-auto px-6 md:px-12 text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-6xl font-heading mb-6 tracking-wide">Fully Yours</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light text-lg">
          Stop compromising with standard sizes. Your body is unique, and your clothing should reflect that individuality. Customize selected elements such as collars, cuffs, and fit while maintaining supreme comfort.
        </p>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <CustomizationSelector />
      </div>
    </div>
  );
}
