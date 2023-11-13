import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import AboutSection from "../components/AboutSection";
import Watch from "../components/Watch";

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Features />
      <AboutSection />
      <Watch />
    </div>
  );
}
