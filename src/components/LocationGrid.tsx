import React from 'react';
import type { PageId } from '../types';
import { MapPin, Clock, Phone, Navigation, Flame, Car, Utensils, Award, Sparkles } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface LocationGridProps {
  onNavigate?: (page: PageId) => void;
}

export const LocationGrid: React.FC<LocationGridProps> = ({ onNavigate }) => {
  return (
    <section id="locations" className="py-16 sm:py-20 lg:py-24 bg-[#F5EFEB] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        
        {/* Section Header: Eyebrow with Red Accent Line, Bebas Headline, Subtitle */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="space-y-1.5">
            <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#5B101D] block">
              FIND OUR PITS
            </span>
            <div className="w-12 h-1 bg-[#5B101D] mx-auto" />
          </div>
          <h2 className="font-bebas text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-[#1E1E1E] leading-none">
            OUR <span className="text-[#5B101D]">LOCATIONS</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-[#5C5651] max-w-lg mx-auto leading-relaxed">
            Slow-smoked over real hardwood. Two pits serving authentic barbecue across the metro.
          </p>
        </div>

        {/* Dual Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Montalban Smokehouse Pit (Rodriguez, Rizal) */}
          <div className="bg-white rounded-2xl border border-[#E5DFD5] shadow-subtle flex flex-col justify-between overflow-hidden group hover:shadow-elevated transition-all duration-300">
            <div>
              {/* Photo with Overlay and Badges */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306]">
                <SafeImage
                  src="/locations/montalban.jpg"
                  alt="Montalban Smokehouse Pit in Rodriguez, Rizal"
                  fallbackSrc="/masung_smoked_meat_hero_hd.png"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Top-Left: Branch Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="px-3 py-1 bg-[#5B101D] text-white text-[10px] font-montserrat font-extrabold uppercase tracking-wider rounded-xs shadow-md border border-[#781728]">
                    ORIGINAL MAIN PIT
                  </span>
                </div>

                {/* Top-Right: Open Status */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-xs border border-white/20 text-white font-mono text-[10px] rounded-xs flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>OPEN TODAY</span>
                  </span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <span className="text-[10px] font-montserrat font-bold tracking-widest text-[#C67D26] uppercase block">
                    RODRIGUEZ, RIZAL
                  </span>
                  <h3 className="font-bebas text-3xl sm:text-4xl uppercase tracking-tight text-white leading-none drop-shadow-sm">
                    MONTALBAN SMOKEHOUSE PIT
                  </h3>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-7 space-y-5">
                
                {/* Address Box */}
                <div className="flex items-start gap-3 bg-[#FAF7F2] p-3.5 rounded-lg border border-[#EAE3D9]">
                  <div className="w-8 h-8 rounded-full bg-[#5B101D] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-4 h-4 text-[#C67D26]" />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <strong className="font-montserrat font-bold text-[#1E1E1E] uppercase text-[11px] block">
                      Full Address & Landmark
                    </strong>
                    <p className="font-body text-[#5C5651] leading-relaxed">
                      Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez, Rizal
                    </p>
                  </div>
                </div>

                {/* 3-Column Info Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E5DFD5] text-center">
                  <div className="space-y-0.5 pr-2 border-r border-[#E5DFD5]">
                    <Clock className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-tight">
                      4:00 PM – 11:00 PM
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      TUES – SUN
                    </span>
                  </div>

                  <div className="space-y-0.5 px-2 border-r border-[#E5DFD5]">
                    <Phone className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-tight">
                      0968 237 0329
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      CALL / TEXT
                    </span>
                  </div>

                  <div className="space-y-0.5 pl-2">
                    <Car className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-tight">
                      PARKING
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      AVAILABLE
                    </span>
                  </div>
                </div>

                {/* Experience & Amenities Highlights */}
                <div className="space-y-2">
                  <span className="font-montserrat font-extrabold text-[10px] uppercase tracking-wider text-[#8A837C] block">
                    Pit Highlights & Amenities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#EAE3D9] text-[#1E1E1E] font-body text-xs rounded-xs flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-[#5B101D]" />
                      <span>8–16H Hardwood Smoker</span>
                    </span>
                    <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#EAE3D9] text-[#1E1E1E] font-body text-xs rounded-xs flex items-center gap-1.5">
                      <Utensils className="w-3 h-3 text-[#C67D26]" />
                      <span>Free Red Rice & Soup</span>
                    </span>
                    <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#EAE3D9] text-[#1E1E1E] font-body text-xs rounded-xs flex items-center gap-1.5">
                      <Car className="w-3 h-3 text-[#5B101D]" />
                      <span>Free Parking Onsite</span>
                    </span>
                    <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#EAE3D9] text-[#1E1E1E] font-body text-xs rounded-xs flex items-center gap-1.5">
                      <Award className="w-3 h-3 text-[#C67D26]" />
                      <span>Full Smokehouse Menu</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* View on Maps Button */}
            <div className="p-6 sm:p-7 pt-0">
              <a
                href="https://maps.google.com/?q=Masung+Smokehouse+Rodriguez+Rizal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-subtle hover:scale-[1.01] cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#C67D26]" />
                <span>VIEW ON MAPS</span>
              </a>
            </div>

          </div>

          {/* Card 2: U-Belt Smokehouse Branch (Sampaloc, Manila) */}
          <div className="bg-white rounded-2xl border border-[#E5DFD5] shadow-subtle flex flex-col justify-between overflow-hidden group hover:shadow-elevated transition-all duration-300">
            <div>
              {/* Photo with Overlay and Badges */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306]">
                <SafeImage
                  src="/locations/ubelt.jpg"
                  alt="U-Belt Smokehouse Branch in Sampaloc, Manila"
                  fallbackSrc="/masung_smoked_meat_hero_hd.png"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                
                {/* Top-Left: Branch Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                  <span className="px-3 py-1 bg-[#C67D26] text-white text-[10px] font-montserrat font-extrabold uppercase tracking-wider rounded-xs shadow-md border border-[#A5641A]">
                    CAMPUS BRANCH
                  </span>
                </div>

                {/* Top-Right: Open Status */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-2.5 py-1 bg-black/60 backdrop-blur-xs border border-white/20 text-white font-mono text-[10px] rounded-xs flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>OPEN TODAY</span>
                  </span>
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <span className="text-[10px] font-montserrat font-bold tracking-widest text-[#C67D26] uppercase block">
                    SAMPALOC, MANILA
                  </span>
                  <h3 className="font-bebas text-3xl sm:text-4xl uppercase tracking-tight text-white leading-none drop-shadow-sm">
                    U-BELT SMOKEHOUSE BRANCH
                  </h3>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-7 space-y-5">
                
                {/* Address Box */}
                <div className="flex items-start gap-3 bg-[#FAF7F2] p-3.5 rounded-lg border border-[#EAE3D9]">
                  <div className="w-8 h-8 rounded-full bg-[#5B101D] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-4 h-4 text-[#C67D26]" />
                  </div>
                  <div className="text-xs space-y-0.5">
                    <strong className="font-montserrat font-bold text-[#1E1E1E] uppercase text-[11px] block">
                      Full Address & Landmark
                    </strong>
                    <p className="font-body text-[#5C5651] leading-relaxed">
                      Earnshaw St., Sampaloc, Manila (Near UST & FEU / University Belt)
                    </p>
                  </div>
                </div>

                {/* 3-Column Info Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E5DFD5] text-center">
                  <div className="space-y-0.5 pr-2 border-r border-[#E5DFD5]">
                    <Clock className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-tight">
                      10:30 AM – 9:00 PM
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      MON – SAT
                    </span>
                  </div>

                  <div className="space-y-0.5 px-2 border-r border-[#E5DFD5]">
                    <Phone className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-tight">
                      0968 237 0329
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      CALL / TEXT
                    </span>
                  </div>

                  <div className="space-y-0.5 pl-2">
                    <Utensils className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-tight">
                      STUDENT
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      FRIENDLY
                    </span>
                  </div>
                </div>

                {/* Experience & Amenities Highlights */}
                <div className="space-y-2">
                  <span className="font-montserrat font-extrabold text-[10px] uppercase tracking-wider text-[#8A837C] block">
                    Branch Highlights & Amenities
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#EAE3D9] text-[#1E1E1E] font-body text-xs rounded-xs flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#C67D26]" />
                      <span>₱99 Student Rice Meals</span>
                    </span>
                    <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#EAE3D9] text-[#1E1E1E] font-body text-xs rounded-xs flex items-center gap-1.5">
                      <Utensils className="w-3 h-3 text-[#5B101D]" />
                      <span>Free Red Rice Refills</span>
                    </span>
                    <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#EAE3D9] text-[#1E1E1E] font-body text-xs rounded-xs flex items-center gap-1.5">
                      <Award className="w-3 h-3 text-[#C67D26]" />
                      <span>Free Billiards & Arcade</span>
                    </span>
                    <span className="px-2.5 py-1 bg-[#FAF7F2] border border-[#EAE3D9] text-[#1E1E1E] font-body text-xs rounded-xs flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#5B101D]" />
                      <span>Walking Dist. UST/FEU</span>
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* View on Maps Button */}
            <div className="p-6 sm:p-7 pt-0">
              <a
                href="https://maps.google.com/?q=University+Belt+Sampaloc+Manila"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-subtle hover:scale-[1.01] cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#C67D26]" />
                <span>VIEW ON MAPS</span>
              </a>
            </div>

          </div>

        </div>

        {/* Integrated Brand Bottom Banner Strip */}
        <div className="bg-[#5B101D] text-white py-4 sm:py-5 px-6 sm:px-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border border-[#781728] shadow-subtle">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#460B15] border border-[#C67D26]/40 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-[#C67D26]" />
            </div>
            <div>
              <span className="font-montserrat font-extrabold text-xs sm:text-sm uppercase tracking-widest block text-white">
                REAL SMOKE. REAL FLAVOR. REAL FILIPINO HOSPITALITY.
              </span>
              <span className="font-body text-xs text-[#E5DFD5] block mt-0.5">
                Authentic low & slow barbecue served fresh with unlimited rice refills in Montalban & U-Belt.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigate?.('order')}
              className="px-5 py-2.5 bg-[#C67D26] hover:bg-[#A5641A] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer shadow-xs hover:scale-105"
            >
              Order to Table
            </button>
            <button
              onClick={() => onNavigate?.('reservation')}
              className="px-5 py-2.5 bg-transparent hover:bg-white/10 border border-white/40 text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-xs transition-all cursor-pointer"
            >
              Reserve Table
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
