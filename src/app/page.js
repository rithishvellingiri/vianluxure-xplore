import HeroSection from "@/components/home/HeroSection";
import BrandIntro from "@/components/home/BrandIntro";
import CategorySection from "@/components/home/CategorySection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TailoringProcess from "@/components/home/TailoringProcess";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ReviewsSection from "@/components/home/ReviewsSection";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <BrandIntro />
      <CategorySection />
      <WhyChooseUs />
      <TailoringProcess />
      <FeaturedProducts />
      <ReviewsSection />
      <FaqSection />
      <CtaBanner />
    </div>
  );
}

