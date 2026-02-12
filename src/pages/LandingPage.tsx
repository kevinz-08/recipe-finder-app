// import { Link } from "react-router-dom";
// import { ROUTES } from "../app/routes";
import { HeroSection, CTAsection } from "../components/landing";

export const LandingPage = () => {
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <HeroSection />

      <CTAsection />


    </div>
  );
};
