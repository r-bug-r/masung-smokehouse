import React from 'react';
import type { PageId } from '../types';
import { ArrowRight, Flame, MapPin, Utensils } from 'lucide-react';

interface AboutPreviewProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F5EFEB] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Story Card with Gold Offset Border & Brisket Asset */}
          <div className="lg:col-span-6 relative">
            
            {/* Offset Gold Border Frame (1:1 with Mockup) */}
            <div className="absolute -inset-2.5 sm:-inset-3 border border-[#C67D26] rounded-3xl pointer-events-none transform -translate-x-1.5 translate-y-1.5" />

            {/* Main Rounded Image Container */}
            <div className="relative rounded-3xl overflow-hidden bg-[#181615] shadow-elevated z-10">
              {/* Sliced Brisket Photo (Baked-in Gold Stamp Seal) */}
              <img
                src="/masung_brisket_food_asset_hd.png"
                alt="Masung Slow-Smoked Brisket and Pork Belly HD"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-700"
              />
            </div>

          </div>

          {/* Right Column: 1:1 Narrative & Feature Callouts */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Eyebrow with Gold Line */}
            <div className="space-y-1.5">
              <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#5B101D] block">
                OUR STORY
              </span>
              <div className="w-10 h-0.5 bg-[#C67D26]" />
            </div>

            {/* Headline (All Maroon 1:1 with Mockup) */}
            <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.92] text-[#5B101D]">
              REAL SMOKE. <br />
              FILIPINO HOSPITALITY.
            </h2>

            {/* Description */}
            <p className="font-body text-base sm:text-lg text-[#1E1E1E] leading-relaxed font-normal">
              Slow-smoked over real hardwood.<br />
              Made for good times in the U-Belt.
            </p>

            {/* 3 Features in a Row with Dividers (1:1 Match) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 border-y border-[#E5DFD5]">
              
              {/* Feature 1: 8-16H Smoked */}
              <div className="space-y-1 pr-2 sm:pr-4 border-r border-[#E5DFD5]">
                <Flame className="w-5 h-5 text-[#5B101D]" />
                <strong className="font-montserrat font-extrabold text-xs sm:text-sm text-[#1E1E1E] uppercase block pt-1">
                  8–16H SMOKED
                </strong>
                <span className="font-body text-[#5C5651] text-[11px] sm:text-xs block">
                  Low & slow. Big flavor.
                </span>
              </div>

              {/* Feature 2: Free Red Rice */}
              <div className="space-y-1 px-2 sm:px-4 border-r border-[#E5DFD5]">
                <Utensils className="w-5 h-5 text-[#5B101D]" />
                <strong className="font-montserrat font-extrabold text-xs sm:text-sm text-[#1E1E1E] uppercase block pt-1">
                  FREE RED RICE
                </strong>
                <span className="font-body text-[#5C5651] text-[11px] sm:text-xs block">
                  Unlimited refills.
                </span>
              </div>

              {/* Feature 3: 2 Locations */}
              <div className="space-y-1 pl-2 sm:pl-4">
                <MapPin className="w-5 h-5 text-[#5B101D]" />
                <strong className="font-montserrat font-extrabold text-xs sm:text-sm text-[#1E1E1E] uppercase block pt-1">
                  2 LOCATIONS
                </strong>
                <span className="font-body text-[#5C5651] text-[11px] sm:text-xs block">
                  Montalban & U-Belt.
                </span>
              </div>

            </div>

            {/* Learn More Link with Maroon Underline (1:1 with Mockup) */}
            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-montserrat font-extrabold uppercase tracking-wider text-[#1E1E1E] hover:text-[#5B101D] pb-1 border-b-2 border-[#5B101D] cursor-pointer transition-all"
              >
                <span>LEARN MORE ABOUT MASUNG</span>
                <ArrowRight className="w-4 h-4 text-[#C67D26] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
