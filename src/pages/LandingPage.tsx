// import { Link } from "react-router-dom";
// import { ROUTES } from "../app/routes";
import { HeroSection, HowWorkSection, RecipeSection, ContactSection } from "@/components/landing";
import { useScrollToHash } from "@/hooks";

export const LandingPage = () => {
  useScrollToHash();

  return (

    <div className="">
      <HeroSection />
      <HowWorkSection />
      <RecipeSection />
      <ContactSection />


    </div>
  );
};
