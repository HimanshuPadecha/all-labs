"use client";
import React, { useRef, useState } from "react";
import Footer from "./footer";
import CTA from "./CTA";
import { Categories } from "./categories";
import Benefits from "./benefits";
import HowItWorks from "./how-it-works";
import Features from "./features";
import Hero from "./hero";
import Navbar from "./navbar";

const HomeHolder = () => {
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("python");

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCategory = (id: string) => {
    setSelectedSubjectId(id);
    scrollToTop();
  };
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-white selection:text-black antialiased relative">
      {/* Background Subtle Grid - Stark Black Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c1c1e_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none opacity-45 z-0" />

      {/* Top ambient lighting header */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[400px] bg-linear-to-b from-zinc-900/15 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* FIXED SYSTEM NAVBAR */}
      <Navbar
        onBrowseClick={scrollToTop}
        onExploreClick={() => scrollToRef(categoriesRef)}
      />

      {/* MODULARIZED CORE SECTIONS */}
      <Hero
        onBrowseClick={scrollToTop}
        onExploreClick={() => scrollToRef(categoriesRef)}
        selectedSubjectId={selectedSubjectId}
        setSelectedSubjectId={setSelectedSubjectId}
      />

      <Features />

      <HowItWorks />

      <Benefits />

      <Categories ref={categoriesRef} onSelectCategory={handleSelectCategory} />

      <CTA />

      <Footer />
    </div>
  );
};

export default HomeHolder;
