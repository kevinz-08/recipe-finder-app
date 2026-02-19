import { HeroSection, HowWorkSection, RecipeSection, ContactSection } from "@/components/landing";
import { useScrollToHash } from "@/hooks";

export const LandingPage = () => {
  useScrollToHash();

  return (

    <div className="pt-15">
      <HeroSection />
      <HowWorkSection />
      <RecipeSection />
      <ContactSection />


    </div>
  );
};
