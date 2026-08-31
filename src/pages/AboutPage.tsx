import React from 'react';
import type { PageId } from '../types';
import { ArrowRight, Flame, TreePine, Heart, Users, Sparkles, MapPin } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F5EFEB] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-20 lg:space-y-24">
        
        {/* Section 1: Hero Story (From Montalban to U-Belt) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative & Values */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-1.5">
              <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
                FROM MONTALBAN. TO U-BELT.
              </span>
              <div className="w-10 h-0.5 bg-[#C67D26]" />
            </div>

            <h1 className="font-bebas text-6xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-tight leading-[0.88] text-[#1E1E1E]">
              <span className="text-[#5B101D] block">FILIPINO SOUL.</span>
              <span className="text-[#1E1E1E] block">TEXAS SMOKE.</span>
            </h1>

            <p className="font-body text-base sm:text-lg text-[#1E1E1E] leading-relaxed">
              Rooted in Montalban, Rizal. Inspired by Texas.<br />
              We smoke our meats low & slow for <strong className="font-semibold text-[#5B101D]">8 to 16 hours</strong> using real hardwood.<br />
              Every meal comes with <strong className="font-semibold text-[#1E1E1E]">unlimited heirloom red rice</strong> and hot smoked bone broth.
            </p>

            {/* 3 Core Icons */}
            <div className="grid grid-cols-3 gap-3 py-4 border-y border-[#E5DFD5]">
              <div className="space-y-1 pr-2 border-r border-[#E5DFD5]">
                <Flame className="w-5 h-5 text-[#5B101D]" />
                <strong className="font-montserrat font-extrabold text-xs sm:text-sm text-[#1E1E1E] uppercase block pt-1">
                  LOW & SLOW
                </strong>
                <span className="font-body text-[#5C5651] text-[11px] sm:text-xs block">
                  8 to 16 hours
                </span>
              </div>

              <div className="space-y-1 px-2 border-r border-[#E5DFD5]">
                <TreePine className="w-5 h-5 text-[#5B101D]" />
                <strong className="font-montserrat font-extrabold text-xs sm:text-sm text-[#1E1E1E] uppercase block pt-1">
                  REAL WOOD
                </strong>
                <span className="font-body text-[#5C5651] text-[11px] sm:text-xs block">
                  Oak & Hickory
                </span>
              </div>

              <div className="space-y-1 pl-2">
                <Heart className="w-5 h-5 text-[#5B101D]" />
                <strong className="font-montserrat font-extrabold text-xs sm:text-sm text-[#1E1E1E] uppercase block pt-1">
                  FILIPINO SOUL
                </strong>
                <span className="font-body text-[#5C5651] text-[11px] sm:text-xs block">
                  Texas Smoke
                </span>
              </div>
            </div>

            {/* See Our Menu Button */}
            <div className="pt-2">
              <button
                onClick={() => onNavigate('menu')}
                className="px-8 py-4 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-sm transition-all inline-flex items-center gap-2 cursor-pointer shadow-subtle hover:scale-[1.01]"
              >
                <span>SEE OUR MENU</span>
                <ArrowRight className="w-4 h-4 text-[#C67D26]" />
              </button>
            </div>

          </div>

          {/* Right Column: 1:1 Split Card (Brisket Cutting + Journey Route Map Graphic) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="w-full rounded-3xl overflow-hidden shadow-elevated border border-[#E5DFD5] bg-white">
              <img
                src="/masung_origin_to_ubelt_map_asset_hd.png"
                alt="From Montalban to U-Belt - Masung Smokehouse Journey Map"
                className="w-full h-auto object-cover object-center filter contrast-105 hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>

        </div>

        {/* Section 2: OUR SPACE (1:1 Match to Mockup 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-8 border-t border-[#E5DFD5]">
          
          {/* Left Column: Narrative & Action Link */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
                OUR SPACE
              </span>
              <div className="w-10 h-0.5 bg-[#C67D26]" />
            </div>

            <h2 className="font-bebas text-5xl sm:text-6xl font-bold uppercase tracking-tight leading-[0.92] text-[#1E1E1E]">
              GOOD SMOKES. <br />
              <span className="text-[#5B101D]">GREAT COMPANY.</span>
            </h2>

            <p className="font-body text-base text-[#1E1E1E] leading-relaxed">
              Two floors in Rodriguez, Rizal.<br />
              Made for good food, good people, and lasting memories.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('reservation')}
                className="group inline-flex items-center gap-2 text-xs sm:text-sm font-montserrat font-extrabold uppercase tracking-wider text-[#5B101D] hover:text-[#32070E] pb-1 border-b-2 border-[#5B101D] cursor-pointer transition-all"
              >
                <span>VIEW SPACE & EVENT DETAILS</span>
                <ArrowRight className="w-4 h-4 text-[#C67D26] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: 2 Floor Dining Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Floor 1 Card */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E5DFD5] shadow-subtle space-y-4 hover:shadow-elevated transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] text-[#5B101D] flex items-center justify-center border border-[#EAE3D9]">
                <Users className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-montserrat font-bold text-xs uppercase text-[#C67D26] block">
                  GROUND FLOOR
                </span>
                <h3 className="font-montserrat font-extrabold text-xl uppercase text-[#1E1E1E]">
                  11 TABLES
                </h3>
              </div>
              <p className="font-body text-xs text-[#5C5651] leading-relaxed">
                Perfect for barkadas, families, and celebrations near the carving hearth.
              </p>
            </div>

            {/* Floor 2 Card */}
            <div className="bg-white rounded-xl p-6 sm:p-7 border border-[#E5DFD5] shadow-subtle space-y-4 hover:shadow-elevated transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] text-[#5B101D] flex items-center justify-center border border-[#EAE3D9]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-montserrat font-bold text-xs uppercase text-[#C67D26] block">
                  UPPER FLOOR
                </span>
                <h3 className="font-montserrat font-extrabold text-xl uppercase text-[#1E1E1E]">
                  4 TABLES
                </h3>
              </div>
              <p className="font-body text-xs text-[#5C5651] leading-relaxed">
                A quieter space for small gatherings, private events, and meetings.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
