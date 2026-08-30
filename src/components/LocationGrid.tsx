import React from 'react';
import type { PageId } from '../types';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface LocationGridProps {
  onNavigate?: (page: PageId) => void;
}

export const LocationGrid: React.FC<LocationGridProps> = () => {
  return (
    <section id="locations" className="animate-section py-16 sm:py-20 bg-[#FBF8F3] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Simple Clean Header: Location */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3.5 py-1 inline-block">
            Find Our Pits
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#181615]">
            Location
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5651]">
            Quick addresses and maps for Montalban (Rizal) and U-Belt (Manila).
          </p>
        </div>

        {/* Dual Location Grid: Montalban & U-Belt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Montalban, Rizal (Original Pit) */}
          <div className="bg-white border-2 border-[#5B101D] p-6 sm:p-8 shadow-subtle flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#5B101D] text-white flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#C67D26]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg uppercase text-[#181615]">
                      Montalban Smokehouse Pit
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-[#8A837C]">
                      Rodriguez, Rizal
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-[#FFF8E7] text-[#8A4F08] border border-[#C67D26]/40 text-[10px] font-mono font-bold uppercase">
                  Main Pit
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#5C5651] leading-relaxed">
                <div>
                  <strong className="text-[#181615] block uppercase font-bold text-[11px] mb-0.5">
                    Address:
                  </strong>
                  <p>Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez (Montalban), Rizal</p>
                </div>

                <div>
                  <strong className="text-[#181615] block uppercase font-bold text-[11px] mb-0.5">
                    Schedule:
                  </strong>
                  <p>Tuesday – Sunday: 4:00 PM to 11:00 PM</p>
                  <p className="text-[11px] text-[#8A837C]">(Closed Mondays for smoker curing)</p>
                </div>

                <div>
                  <strong className="text-[#181615] block uppercase font-bold text-[11px] mb-0.5">
                    Contact & Orders:
                  </strong>
                  <p className="font-mono font-bold text-[#181615]">0968 237 0329</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Masung+Smokehouse+Rodriguez+Rizal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C67D26]" />
              <span>Open Montalban Google Maps</span>
            </a>
          </div>

          {/* Card 2: U-Belt, Manila (University Belt Pit) */}
          <div className="bg-white border-2 border-[#181615] p-6 sm:p-8 shadow-subtle flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#181615] text-white flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[#C67D26]" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-lg uppercase text-[#181615]">
                      U-Belt Smokehouse Branch
                    </h3>
                    <span className="text-[10px] uppercase font-bold text-[#8A837C]">
                      Sampaloc, Manila
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-[#F2ECE1] text-[#181615] border border-[#E5DFD5] text-[10px] font-mono font-bold uppercase">
                  U-Belt Branch
                </span>
              </div>

              <div className="space-y-3 text-xs text-[#5C5651] leading-relaxed">
                <div>
                  <strong className="text-[#181615] block uppercase font-bold text-[11px] mb-0.5">
                    Address:
                  </strong>
                  <p>Near FEU / Morayta, Sampaloc, Manila (University Belt)</p>
                </div>

                <div>
                  <strong className="text-[#181615] block uppercase font-bold text-[11px] mb-0.5">
                    Schedule:
                  </strong>
                  <p>Monday – Saturday: 10:30 AM to 9:00 PM</p>
                  <p className="text-[11px] text-[#8A837C]">(Student ₱99 Bowls & Unli Rice all day)</p>
                </div>

                <div>
                  <strong className="text-[#181615] block uppercase font-bold text-[11px] mb-0.5">
                    Dining Features:
                  </strong>
                  <p>Fast student counter service, takeout trays, delivery dispatch</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Morayta+Sampaloc+Manila"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#181615] hover:bg-[#2B2724] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C67D26]" />
              <span>Open U-Belt Google Maps</span>
            </a>
          </div>

        </div>

        {/* Social Follow Strip: Facebook, Instagram, and TikTok */}
        <div className="bg-[#181615] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#5B101D] shadow-subtle">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-heading font-extrabold text-base uppercase text-white tracking-wider">
              Follow Masung Smokehouse
            </h4>
            <p className="text-xs text-[#A89F96]">
              Catch live pit slicing alerts, secret menus, and daily student specials on our socials.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Facebook Button */}
            <a
              href="https://www.facebook.com/MasungSmokeHouse/"
              target="_blank"
              rel="noreferrer noopener"
              className="px-4 py-2.5 bg-[#24201D] hover:bg-[#5B101D] text-xs font-heading font-extrabold uppercase tracking-wider text-white transition-colors flex items-center gap-2 border border-[#3D3733]"
            >
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3 text-[#C67D26]" />
            </a>

            {/* Instagram Button */}
            <a
              href="https://www.instagram.com/masungsmokehouse"
              target="_blank"
              rel="noreferrer noopener"
              className="px-4 py-2.5 bg-[#24201D] hover:bg-[#5B101D] text-xs font-heading font-extrabold uppercase tracking-wider text-white transition-colors flex items-center gap-2 border border-[#3D3733]"
            >
              <span>Instagram</span>
              <ExternalLink className="w-3 h-3 text-[#C67D26]" />
            </a>

            {/* TikTok Button */}
            <a
              href="https://www.tiktok.com/@masungsmokehouse"
              target="_blank"
              rel="noreferrer noopener"
              className="px-4 py-2.5 bg-[#24201D] hover:bg-[#5B101D] text-xs font-heading font-extrabold uppercase tracking-wider text-white transition-colors flex items-center gap-2 border border-[#3D3733]"
            >
              <span>TikTok</span>
              <ExternalLink className="w-3 h-3 text-[#C67D26]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
