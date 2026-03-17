import { HeroSection } from "./components/HeroSection";
import { WhatIsSection } from "./components/WhatIsSection";
import { DesignedForSection } from "./components/DesignedForSection";
import { EasyToUseSection } from "./components/EasyToUseSection";
import { AboutUsSection } from "./components/AboutUsSection";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <WhatIsSection />
      <DesignedForSection />
      <EasyToUseSection />
      <AboutUsSection />
    </div>
  );
};