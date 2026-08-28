import React, { useEffect } from 'react';
import type { PageId } from '../types';
import { SmokehouseHero } from '../components/SmokehouseHero';
import { LivePitWidget } from '../components/LivePitWidget';
import { SocialVoucherBanner } from '../components/SocialVoucherBanner';
import { CraftSection } from '../components/CraftSection';
import { SpecialsBoard } from '../components/SpecialsBoard';
import { MeatGuide } from '../components/MeatGuide';
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
      <SmokehouseHero onNavigate={onNavigate} />
      <LivePitWidget />
      <SocialVoucherBanner />
      <CraftSection />
      <SpecialsBoard onNavigate={onNavigate} />
      <MeatGuide />
      <LocationGrid onNavigate={onNavigate} />
    </div>
  );
};
