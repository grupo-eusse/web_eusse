import AboutSection from "@/ui/components/about_us";
import HeroCarousel from "@/ui/components/hero_carousel";
import PromotionsSection from "@/ui/components/promotion_section";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="bg-brand-50 text-brand-900">
        <HeroCarousel />
        <AboutSection />
        <PromotionsSection />
      </div>
    </main>
  );
}
