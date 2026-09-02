import React from 'react';
import type { PageId } from '../types';
import { MapPin, Clock, Phone, Navigation, Flame, Car, Utensils } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface LocationGridProps {
  onNavigate?: (page: PageId) => void;
}

export const LocationGrid: React.FC<LocationGridProps> = () => {
  return (
    <section id="locations" className="py-16 sm:py-20 lg:py-24 bg-[#F5EFEB] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        
        {/* Section Header: Eyebrow, Headline, Subtitle */}
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
            FIND OUR PITS
          </span>
          <h2 className="font-bebas text-5xl sm:text-6xl font-bold uppercase tracking-tight text-[#1E1E1E]">
            LOCATIONS
          </h2>
          <p className="font-body text-sm sm:text-base text-[#5C5651]">
            Two pits. Same smoke. Different sides of the metro.
          </p>
        </div>

        {/* Dual Location Grid (1:1 Match) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Montalban Smokehouse Pit (Rodriguez, Rizal) */}
          <div className="bg-white rounded-xl border border-[#E5DFD5] shadow-subtle flex flex-col justify-between overflow-hidden group hover:shadow-elevated transition-all">
            <div>
              {/* Photo with Badge */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306]">
                <SafeImage
                  src="/locations/montalban.jpg"
                  alt="Montalban Smokehouse Pit in Rodriguez, Rizal"
                  fallbackSrc="/masung_smoked_meat_hero_hd.png"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                />
                <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#5B101D] text-white text-[10px] font-montserrat font-extrabold uppercase tracking-wider rounded-sm shadow-md z-20">
                  MAIN PIT
                </span>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-7 space-y-5">
                
                {/* Title and City */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#5B101D] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#C67D26]" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-extrabold text-base sm:text-lg uppercase text-[#1E1E1E] leading-tight">
                      MONTALBAN SMOKEHOUSE PIT
                    </h3>
                    <span className="font-montserrat font-bold text-xs uppercase text-[#C67D26]">
                      RODRIGUEZ, RIZAL
                    </span>
                  </div>
                </div>

                {/* 3-Column Info Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E5DFD5] text-center">
                  <div className="space-y-0.5 pr-2 border-r border-[#E5DFD5]">
                    <Clock className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-[11px] text-[#1E1E1E] block leading-tight">
                      4:00 PM – 11:00 PM
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      TUES – SUN
                    </span>
                  </div>

                  <div className="space-y-0.5 px-2 border-r border-[#E5DFD5]">
                    <Phone className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-[11px] text-[#1E1E1E] block leading-tight">
                      0968 237 0329
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      CALL / TEXT
                    </span>
                  </div>

                  <div className="space-y-0.5 pl-2">
                    <Car className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-[11px] text-[#1E1E1E] block leading-tight">
                      PARKING
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      AVAILABLE
                    </span>
                  </div>
                </div>

                {/* Macro Sample Box */}
                <div className="bg-[#FAF7F2] rounded-lg p-3 border border-[#EAE3D9] space-y-1">
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div>
                      <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block">650 CAL</strong>
                      <span className="font-body text-[9px] text-[#8A837C] uppercase">CALORIES</span>
                    </div>
                    <div className="border-x border-[#E5DFD5]">
                      <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block">45g</strong>
                      <span className="font-body text-[9px] text-[#8A837C] uppercase">PROTEIN</span>
                    </div>
                    <div>
                      <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block">48g</strong>
                      <span className="font-body text-[9px] text-[#8A837C] uppercase">CARBS</span>
                    </div>
                  </div>
                  <span className="font-body text-[10px] text-[#8A837C] text-center block pt-1">
                    *Example from Beef Brisket Platter
                  </span>
                </div>

              </div>
            </div>

            {/* View on Maps Button */}
            <div className="p-6 sm:p-7 pt-0">
              <a
                href="https://maps.google.com/?q=Masung+Smokehouse+Rodriguez+Rizal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 shadow-subtle hover:scale-[1.01]"
              >
                <Navigation className="w-4 h-4 text-[#C67D26]" />
                <span>VIEW ON MAPS</span>
              </a>
            </div>

          </div>

          {/* Card 2: U-Belt Smokehouse Branch (Sampaloc, Manila) */}
          <div className="bg-white rounded-xl border border-[#E5DFD5] shadow-subtle flex flex-col justify-between overflow-hidden group hover:shadow-elevated transition-all">
            <div>
              {/* Photo with Badge */}
              <div className="relative h-60 sm:h-64 overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306]">
                <SafeImage
                  src="/locations/ubelt.jpg"
                  alt="U-Belt Smokehouse Branch in Sampaloc, Manila"
                  fallbackSrc="/masung_smoked_meat_hero_hd.png"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                />
                <span className="absolute top-3.5 left-3.5 px-3 py-1 bg-[#1E1E1E] text-white text-[10px] font-montserrat font-extrabold uppercase tracking-wider rounded-sm shadow-md z-20">
                  U-BELT BRANCH
                </span>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-7 space-y-5">
                
                {/* Title and City */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#1E1E1E] text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#C67D26]" />
                  </div>
                  <div>
                    <h3 className="font-montserrat font-extrabold text-base sm:text-lg uppercase text-[#1E1E1E] leading-tight">
                      U-BELT SMOKEHOUSE BRANCH
                    </h3>
                    <span className="font-montserrat font-bold text-xs uppercase text-[#C67D26]">
                      SAMPALOC, MANILA
                    </span>
                  </div>
                </div>

                {/* 3-Column Info Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#E5DFD5] text-center">
                  <div className="space-y-0.5 pr-2 border-r border-[#E5DFD5]">
                    <Clock className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-[11px] text-[#1E1E1E] block leading-tight">
                      10:30 AM – 9:00 PM
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      MON – SAT
                    </span>
                  </div>

                  <div className="space-y-0.5 px-2 border-r border-[#E5DFD5]">
                    <Phone className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-[11px] text-[#1E1E1E] block leading-tight">
                      0968 237 0329
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      CALL / TEXT
                    </span>
                  </div>

                  <div className="space-y-0.5 pl-2">
                    <Utensils className="w-4 h-4 text-[#5B101D] mx-auto mb-1" />
                    <strong className="font-montserrat font-extrabold text-[11px] text-[#1E1E1E] block leading-tight">
                      STUDENT-
                    </strong>
                    <span className="font-body text-[10px] text-[#8A837C] uppercase">
                      FRIENDLY
                    </span>
                  </div>
                </div>

                {/* Macro Sample Box */}
                <div className="bg-[#FAF7F2] rounded-lg p-3 border border-[#EAE3D9] space-y-1">
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div>
                      <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block">560 CAL</strong>
                      <span className="font-body text-[9px] text-[#8A837C] uppercase">CALORIES</span>
                    </div>
                    <div className="border-x border-[#E5DFD5]">
                      <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block">32g</strong>
                      <span className="font-body text-[9px] text-[#8A837C] uppercase">PROTEIN</span>
                    </div>
                    <div>
                      <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block">61g</strong>
                      <span className="font-body text-[9px] text-[#8A837C] uppercase">CARBS</span>
                    </div>
                  </div>
                  <span className="font-body text-[10px] text-[#8A837C] text-center block pt-1">
                    *Example from P99 Bowl
                  </span>
                </div>

              </div>
            </div>

            {/* View on Maps Button */}
            <div className="p-6 sm:p-7 pt-0">
              <a
                href="https://maps.google.com/?q=University+Belt+Sampaloc+Manila"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#1E1E1E] hover:bg-[#32070E] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 shadow-subtle hover:scale-[1.01]"
              >
                <Navigation className="w-4 h-4 text-[#C67D26]" />
                <span>VIEW ON MAPS</span>
              </a>
            </div>

          </div>

        </div>

        {/* 1:1 Full-Width Bottom Banner Strip */}
        <div className="bg-[#5B101D] text-white py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-center shadow-md">
          <Flame className="w-5 h-5 text-[#C67D26] shrink-0" />
          <span className="font-montserrat font-extrabold text-xs sm:text-sm uppercase tracking-widest">
            REAL SMOKE. REAL FLAVOR. REAL FILIPINO HOSPITALITY.
          </span>
        </div>

      </div>
    </section>
  );
};
