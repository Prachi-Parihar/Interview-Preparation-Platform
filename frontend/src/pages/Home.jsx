
import React, { useState } from "react";
import { MotionConfig } from "motion/react";
import LoginModel from "../components/LoginModel";
import HomeNavbar from "../components/home/HomeNavbar";
import HomeHero from "../components/home/HomeHero";
import FeaturesSection from "../components/home/FeaturesSection";
import InterviewTypes from "../components/home/InterviewTypes";
import HowItWorks from "../components/home/HowItWorks";
import HomeCTA from "../components/home/HomeCTA";
import HomeFooter from "../components/home/HomeFooter";

const Home = ({ setUser }) => {
  const [showLogin, setShowLogin] = useState(false);

  const openLogin = () => setShowLogin(true);

  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-hidden bg-white text-[#15171A]">
        <HomeNavbar onLogin={openLogin} />
        <HomeHero onLogin={openLogin} />
        <FeaturesSection />
        <InterviewTypes />
        <HowItWorks />
        <HomeCTA onLogin={openLogin} />
        <HomeFooter />

        {showLogin && (
          <LoginModel
            onClose={() => setShowLogin(false)}
            setUser={setUser}
          />
        )}
      </div>
    </MotionConfig>
  );
};

export default Home;
