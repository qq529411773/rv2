import { HeroSection } from "@/components/home/HeroSection";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FAQSection } from "@/components/home/FAQSection";

export default function PicFlowHomePage() {
  return (
    <div className="pf-container">
      <HeroSection />
      <ShowcaseSection />
      <FeaturesSection />
      <ReviewsSection />
      <FAQSection />
    </div>
  );
}
