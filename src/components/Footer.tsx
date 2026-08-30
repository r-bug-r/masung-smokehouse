import React from 'react';
import type { PageId } from '../types';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#181615] text-[#FBF8F3] pt-14 pb-10 border-t-2 border-[#5B101D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2B2724]">
          
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/mascot.jpg"
                alt="Masung Mascot"
                className="w-11 h-11 rounded-full object-cover border border-[#C67D26]"
              />
              <div>
                <span className="font-heading font-extrabold text-xl uppercase tracking-tight text-white block">
                  MASUNG
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.22em] text-[#C67D26] block -mt-0.5">
                  SMOKEHOUSE
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8A837C] leading-relaxed max-w-md">
              Montalban's original smokehouse. Real hardwood low & slow smoked barbecue, free red rice refills, and hot bone broth.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com/MasungSmokeHouse/"
                target="_blank"
                rel="noreferrer noopener"
                className="px-3.5 py-2 bg-[#24201D] hover:bg-[#5B101D] text-xs font-bold text-white transition-colors flex items-center gap-2 border border-[#3A3530]"
              >
                <span>Facebook</span>
              </a>

              <a
                href="https://www.instagram.com/masungsmokehouse"
                target="_blank"
                rel="noreferrer noopener"
                className="px-3.5 py-2 bg-[#24201D] hover:bg-[#5B101D] text-xs font-bold text-white transition-colors flex items-center gap-2 border border-[#3A3530]"
              >
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Col 2: Useful Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-extrabold text-xs tracking-wider uppercase text-[#C67D26]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#8A837C]">
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer text-white font-semibold"
                >
                  Menu & Macros
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('order')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Tray
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reservation')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('feedback')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Reviews & Student Poll
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('loyalty')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pit Pass Rewards
                </button>
              </li>
              <li className="pt-2 border-t border-[#2B2724]">
                <button
                  onClick={() => onNavigate('pos')}
                  className="hover:text-white transition-colors cursor-pointer text-[#C67D26] font-semibold"
                >
                  Staff POS Terminal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="hover:text-white transition-colors cursor-pointer text-stone-400"
                >
                  Smoker Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('loyalty')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pit Pass Rewards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Location & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Visit Info & Directions */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading font-extrabold text-xs tracking-wider uppercase text-[#C67D26]">
              Location & Schedule
            </h4>
            <div className="space-y-2.5 text-xs text-[#8A837C] leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C67D26] shrink-0 mt-0.5" />
                <span>Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez (Montalban), Rizal</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C67D26] shrink-0" />
                <span>Tue - Sun: 4:00 PM – 11:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C67D26] shrink-0" />
                <span>0968 237 0329 (Inquiries & Orders)</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Dela+Costa+V+Burgos+Rodriguez+Rizal"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C67D26] hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open Google Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C5651]">
          <p>© {new Date().getFullYear()} Masung Smokehouse. All Rights Reserved.</p>
          <p>Montalban, Rizal, Philippines</p>
        </div>

      </div>
    </footer>
  );
};
