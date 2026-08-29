import React from 'react';
import type { PageId } from '../../types';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ArrowRight, Coffee } from 'lucide-react';

interface ReserveFooterProps {
  onNavigate: (page: PageId) => void;
}

export const ReserveFooter: React.FC<ReserveFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0A0406] text-[#F3ECE6] border-t border-[#3D0C15] relative z-10">
      
      {/* Top Hairline Quote Banner */}
      <div className="border-b border-[#3D0C15]/70 py-6 px-4 bg-[#120609]/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D8C7C4] font-light">
            <span className="text-[#D4AF37] font-semibold">Masung Cafe & Smokehouse:</span> Loft Venue • Dela Costa V, Montalban • Events & Group Gatherings
          </p>
          <button
            onClick={() => onNavigate('reserve-book')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors group cursor-pointer"
          >
            <span>Book Event Venue</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Main 4-Column Editorial Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 text-left">
          
          {/* Col 1: Brand & Location */}
          <div className="space-y-4">
            <div>
              <span className="font-heading text-lg font-bold tracking-[0.25em] uppercase text-[#FFF5F7] block">
                MASUNG STEAKHOUSE
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
                Cafe & Smokehouse Loft • Montalban
              </span>
            </div>

            <p className="text-xs text-[#D8C7C4] leading-relaxed font-light">
              Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez (Montalban), Rizal.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#D4AF37] font-medium">
              <Coffee className="w-3.5 h-3.5 shrink-0" />
              <span>Specialty Coffee & Sourced Smoked Meats</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#A89895] font-light">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#8E1B2D]" />
              <span>Capacity ~50 Guests (Ground Floor + Loft)</span>
            </div>
          </div>

          {/* Col 2: Service Hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Service Hours
            </h4>
            <div className="space-y-2 text-xs text-[#D8C7C4]">
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Tue – Sun: <strong>4:00 PM – 11:00 PM</strong></span>
              </p>
              <p className="text-[11px] text-[#A89895] pl-5.5">
                Kitchen & specialty barista service.
              </p>
              <p className="text-[11px] text-[#8E1B2D] pt-1 pl-5.5">
                Monday: Closed (Restocking & Maintenance)
              </p>
            </div>
          </div>

          {/* Col 3: Concierge Desk & Host Team */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Concierge Desk
            </h4>
            <div className="space-y-2 text-xs text-[#D8C7C4]">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Direct Line: <strong className="text-white font-mono">0968 237 0329</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>masungsmokehouse@gmail.com</span>
              </p>
              <p className="text-[11px] text-[#A89895]">
                Event Inquiries: Hosted by Cel & Gina
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs">
                <a
                  href="https://www.facebook.com/MasungSmokeHouse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D8C7C4] hover:text-[#D4AF37] transition-colors"
                >
                  Facebook
                </a>
                <span className="text-[#3D0C15]">•</span>
                <a
                  href="https://www.instagram.com/masungsmokehouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D8C7C4] hover:text-[#D4AF37] transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Reserve Navigation & Theme Switcher */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Reserve Index
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C7C4]">
              <li>
                <button onClick={() => onNavigate('reserve-menu')} className="hover:text-[#D4AF37] transition-colors">
                  Reserve Menu & Cuts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reserve-shop')} className="hover:text-[#D4AF37] transition-colors">
                  Carving Board Order
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reserve-about')} className="hover:text-[#D4AF37] transition-colors">
                  Sourcing & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reserve-book')} className="hover:text-[#D4AF37] transition-colors">
                  Event & Venue Reservation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reserve-vip')} className="hover:text-[#D4AF37] transition-colors">
                  Pit Pass VIP Lounge
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('home')}
                className="w-full py-2 bg-[#1C0A0F] hover:bg-[#3D0C15] text-[#D8C7C4] hover:text-white border border-[#3D0C15] text-[10px] uppercase tracking-widest transition-all cursor-pointer text-center"
              >
                Switch to Classic Smokehouse View →
              </button>
            </div>
          </div>

        </div>

        {/* Hairline Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#3D0C15]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A89895]">
          <p>© {new Date().getFullYear()} Masung Smokehouse & Steakhouse Reserve Edition. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sourced from Montalban, Rizal</span>
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
};
