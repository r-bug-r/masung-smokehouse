import React from 'react';
import type { PageId } from '../types';
import { MapPin, Clock, Phone, Navigation, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#181615] text-[#FBF8F3] pt-14 pb-24 md:pb-10 border-t-2 border-[#5B101D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2B2724]">
          
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/mascot.jpg"
                alt="Masung Smokehouse Pitmaster Monkey"
                className="w-10 h-10 object-contain rounded-full border border-[#5B101D]"
              />
              <div>
                <span className="font-bebas text-2xl tracking-wider text-white block leading-none">
                  MASUNG SMOKEHOUSE
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#C67D26] uppercase">
                  Real Hardwood Smoke
                </span>
              </div>
            </div>

            <p className="text-xs font-body text-[#8A837C] leading-relaxed max-w-sm">
              Real hardwood-smoked meats in Montalban & U-Belt. Slow-cooked over fruitwood for hours, served fresh with authentic glazes and heirloom sides.
            </p>

            <div className="flex items-center gap-4 text-xs font-montserrat font-bold text-[#C67D26] pt-1">
              <span>EST. 2026</span>
              <span>•</span>
              <span>U-BELT & MONTALBAN</span>
              <span>•</span>
              <span>REAL SMOKE</span>
            </div>
          </div>

          {/* Col 2: Useful Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-montserrat font-extrabold text-xs tracking-wider uppercase text-[#C67D26]">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-body text-[#8A837C]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story & Space
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-white transition-colors cursor-pointer"
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
                  Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('feedback')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Reviews & UGC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pos')}
                  className="text-[#C67D26] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 font-bold"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Staff POS Terminal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Visit Info & Directions */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-montserrat font-extrabold text-xs tracking-wider uppercase text-[#C67D26]">
              Visit Our Pits
            </h4>
            <div className="space-y-2.5 text-xs font-body text-[#8A837C] leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C67D26] shrink-0 mt-0.5" />
                <span>Montalban: Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez, Rizal</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C67D26] shrink-0 mt-0.5" />
                <span>U-Belt: Earnshaw St., Sampaloc, Manila (Near UST & FEU)</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C67D26] shrink-0" />
                <span>Tue - Sun: 11:00 AM – 10:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C67D26] shrink-0" />
                <span>0968 237 0329 / 0917 882 1994</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Dela+Costa+V+Burgos+Rodriguez+Rizal"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-xs font-montserrat font-bold text-[#C67D26] hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open Google Maps</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-[#8A837C]">
          <p>© {new Date().getFullYear()} Masung Smokehouse. Real Hardwood Smoke. Filipino Soul.</p>
          <div className="flex items-center gap-3">
            <span>Montalban & U-Belt, Manila, Philippines</span>
            <span>•</span>
            <button
              onClick={() => onNavigate('pos')}
              className="text-[#C67D26] hover:text-white transition-colors cursor-pointer font-mono text-[11px] flex items-center gap-1 underline underline-offset-2"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
