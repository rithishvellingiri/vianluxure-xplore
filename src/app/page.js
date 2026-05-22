import HeroSection from "@/components/home/HeroSection";
import BrandIntro from "@/components/home/BrandIntro";
import CategorySection from "@/components/home/CategorySection";
import TailoringProcess from "@/components/home/TailoringProcess";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <BrandIntro />
      <CategorySection />
      <TailoringProcess />
    </div>
  );
}
