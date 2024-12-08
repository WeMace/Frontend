"use client"

import { useRef, createRef } from "react";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import SuccessStories from "@/components/home/SuccessStories";
import Benefits from "@/components/home/Benefits";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Faqs from "@/components/home/Faqs";
import SupportContact from "@/components/home/SupportContact";
const sections = [
  { component: Features, name: 'features' },
  { component: HowItWorks, name: 'howItWorks' },
  { component: SuccessStories, name: 'successStories' },
  { component: Benefits, name: 'benefits' },
  { component: CTA, name: 'cta' },
  { component: Faqs, name: 'faqs' }
];

export default function Home() {
  const sectionRefs = useRef(
    sections.reduce((acc, section) => {
      acc[section.name] = createRef<HTMLDivElement>();
      return acc;
    }, {} as Record<string, React.RefObject<HTMLDivElement>>)
  ).current;

  const scrollToSection = (sectionName: string) => {
    const ref = sectionRefs[sectionName];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToHowItWorks = () => scrollToSection('howItWorks');

  return (
    <main>
      <Navbar />
      <Hero onLearnMoreClick={scrollToHowItWorks} />
      
      <div ref={sectionRefs.features}>
        <Features />
      </div>
      
      <div ref={sectionRefs.howItWorks}>
        <HowItWorks />
      </div>
      
      <div ref={sectionRefs.successStories}>
        <SuccessStories />
      </div>
      
      <div ref={sectionRefs.benefits}>
        <Benefits />
      </div>
      
      <div ref={sectionRefs.cta}>
        <CTA />
      </div>
      
      <div ref={sectionRefs.faqs}>
        <Faqs />
      </div>

      <div ref={sectionRefs.supportContact}>
        <SupportContact />
      </div>
      
      <Footer />
    </main>
  );
}
