import React, { useEffect } from 'react';
import type { PageId } from '../types';
import { SmokehouseHero } from '../components/SmokehouseHero';
import { AboutPreview } from '../components/AboutPreview';
import { CraftSection } from '../components/CraftSection';
import { LoyaltyCardShowcase } from '../components/LoyaltyCardShowcase';
import { SpecialsBoard } from '../components/SpecialsBoard';
import { LocationGrid } from '../components/LocationGrid';
import { initScrollAnimations } from '../lib/animations';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  useEffect(() => {
    // Initialize GSAP scroll trigger animations after mount
    const timer = setTimeout(() => {
      initScrollAnimations();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      {/* 1. Background Video Hero with Centered Branding & 2 CTA Buttons */}
      <SmokehouseHero onNavigate={onNavigate} />

      {/* 2. Authentic About Preview with 'Read More' Button */}
      <AboutPreview onNavigate={onNavigate} />

      {/* 3. Parallax Craftsmanship Section ('THE FIRST SMOKEHOUSE IN U-BELT') */}
      <CraftSection />

      {/* 4. Interactive 3D Pit Pass Loyalty Card Showcase */}
      <LoyaltyCardShowcase onNavigate={onNavigate} />

      {/* 5. Menu Highlights & Specials Board */}
      <SpecialsBoard onNavigate={onNavigate} />

      {/* 6. Dual Location Grid (Montalban & U-Belt) with TikTok, FB, IG */}
      <LocationGrid onNavigate={onNavigate} />
    </div>
  );
};
