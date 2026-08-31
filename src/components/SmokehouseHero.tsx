import React from 'react';
import type { PageId } from '../types';
import { ShoppingBag, Calendar, MapPin, Clock, Users } from 'lucide-react';

interface SmokehouseHeroProps {
  onNavigate: (page: PageId) => void;
}

export const SmokehouseHero: React.FC<SmokehouseHeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-[#F5EFEB] text-[#1E1E1E] border-b border-[#E5DFD5] overflow-hidden pt-8 sm:pt-12 lg:pt-14 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTA Buttons (1:1 with Mockup) */}
          <div className="lg:col-span-6 space-y-6 z-10 py-4">
            
            {/* Big 1:1 Headline */}
            <div className="space-y-0">
              <h1 className="font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] font-bold uppercase tracking-tight leading-[0.88] select-none">
                <span className="text-[#5B101D] block">REAL SMOKE.</span>
                <span className="text-[#1E1E1E] block">REAL GOOD.</span>
              </h1>
            </div>

            {/* Red Accent Dash */}
            <div className="w-12 h-1 bg-[#5B101D]" />

            {/* Subtext */}
            <p className="font-body text-base sm:text-lg text-[#1E1E1E] leading-relaxed font-normal max-w-md">
              Smoked to perfection.<br />
              Made for the U-Belt.
            </p>

            {/* 2 CTA Action Buttons (1:1 with Mockup) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              
              {/* Button 1: Order to Table (Solid Maroon) */}
              <button
                onClick={() => onNavigate('order')}
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle hover:scale-[1.01]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ORDER TO TABLE</span>
              </button>

              {/* Button 2: Event Reservation (Outline Maroon) */}
              <button
                onClick={() => onNavigate('reservation')}
                className="px-7 sm:px-8 py-3.5 sm:py-4 bg-transparent hover:bg-[#5B101D]/5 border-2 border-[#5B101D] text-[#5B101D] font-montserrat font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle hover:scale-[1.01]"
              >
                <Calendar className="w-4 h-4 text-[#5B101D]" />
                <span>EVENT RESERVATION</span>
              </button>

            </div>

          </div>

          {/* Right Column: High Fidelity Platter Image (Baked-in Stamp Seal) */}
          <div className="lg:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-xl lg:max-w-none overflow-hidden rounded-2xl shadow-elevated">
              <img
                src="/masung_smoked_meat_hero_hd.png"
                alt="Masung Smokehouse Slow-Smoked Barbecue Meat HD"
                className="w-full h-auto max-h-[540px] object-cover object-center filter contrast-[1.03] hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

        </div>

        {/* Bottom 3-Column Info Strip (1:1 Match) */}
        <div className="mt-10 lg:mt-14 border-t border-[#E5DFD5] py-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
          
          {/* Item 1: Located in U-Belt */}
          <div className="flex items-center gap-3.5 pr-4 md:border-r border-[#E5DFD5]">
            <div className="w-9 h-9 rounded-full bg-[#EAE3D9] flex items-center justify-center shrink-0 text-[#5B101D]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <strong className="font-montserrat font-bold uppercase tracking-wider text-[#1E1E1E] block text-xs sm:text-sm">
                LOCATED IN U-BELT
              </strong>
              <span className="font-body text-[#5C5651] text-xs">
                Near students. For students.
              </span>
            </div>
          </div>

          {/* Item 2: Open Daily */}
          <div className="flex items-center gap-3.5 pr-4 md:border-r border-[#E5DFD5]">
            <div className="w-9 h-9 rounded-full bg-[#EAE3D9] flex items-center justify-center shrink-0 text-[#5B101D]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <strong className="font-montserrat font-bold uppercase tracking-wider text-[#1E1E1E] block text-xs sm:text-sm">
                OPEN DAILY
              </strong>
              <span className="font-body text-[#5C5651] text-xs">
                11:00 AM – 10:00 PM
              </span>
            </div>
          </div>

          {/* Item 3: Good Food, Good People */}
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#EAE3D9] flex items-center justify-center shrink-0 text-[#5B101D]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <strong className="font-montserrat font-bold uppercase tracking-wider text-[#1E1E1E] block text-xs sm:text-sm">
                GOOD FOOD.
              </strong>
              <span className="font-montserrat font-bold uppercase tracking-wider text-[#5C5651] text-xs sm:text-sm block">
                GOOD PEOPLE.
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

