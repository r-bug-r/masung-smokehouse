import React from 'react';
import type { PageId } from '../types';
import { MapPin, Clock, Phone, Navigation, UtensilsCrossed, ArrowRight } from 'lucide-react';

interface LocationGridProps {
  onNavigate: (page: PageId) => void;
}

export const LocationGrid: React.FC<LocationGridProps> = ({ onNavigate }) => {
  return (
    <section className="animate-section py-16 bg-[#FBF8F3] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3 py-1 inline-block mb-3">
            Dine-In • Takeout • Delivery
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-[#5B101D] uppercase tracking-tight">
            Visit Masung <span className="text-[#181615]">in Rodriguez, Rizal</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C5651] mt-2">
            Montalban's original smokehouse. Dine-in, takeout, and GrabFood delivery.
          </p>
        </div>

        {/* Location Card & Amenities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Flagship Smokehouse Location Box */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-9 border border-[#E5DFD5] shadow-subtle space-y-6">
            
            <div className="flex items-start justify-between gap-4 border-b border-[#E5DFD5] pb-5">
              <div>
                <span className="text-xs font-bold text-[#5B101D] uppercase tracking-wider block">
                  Original Smokehouse Pit
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-[#181615] uppercase tracking-tight">
                  Masung Smokehouse Rizal
                </h3>
              </div>
              <span className="bg-[#5B101D] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                Dine-In & Takeout
              </span>
            </div>

            <div className="space-y-4 text-sm text-[#5C5651]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5B101D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#181615] block">Location Address:</strong>
                  Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez (Montalban), Rizal
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#5B101D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#181615] block">Operating Schedule:</strong>
                  Tuesday – Sunday: 4:00 PM to 11:00 PM
                  <br />
                  <span className="text-xs text-[#8A837C]">Available on GrabFood and direct Messenger dispatch</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#5B101D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#181615] block">Contact & Inquiries:</strong>
                  0968 237 0329 / FB: MasungSmokeHouse
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="https://maps.google.com/?q=Dela+Costa+V+Burgos+Rodriguez+Rizal"
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 py-3 px-5 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors shadow-subtle cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Open Google Maps</span>
              </a>

              <button
                onClick={() => onNavigate('contact')}
                className="py-3 px-5 bg-[#F2ECE1] hover:bg-[#E5DFD5] text-[#181615] font-heading font-bold text-xs uppercase tracking-wider transition-colors border border-[#E5DFD5] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Directions & Hours</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Hangout & Free Games Lounge */}
          <div className="lg:col-span-5 bg-[#5B101D] text-white p-7 sm:p-9 shadow-subtle flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[#E5DFD5] mb-2">
                <UtensilsCrossed className="w-5 h-5" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C67D26] block">
                  Two Floors • 15 Tables
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white leading-tight">
                Dine-In <br />
                <span className="text-[#C67D26]">Experience</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#FBF8F3]/85 mt-3 leading-relaxed">
                Enjoy authentic hardwood-smoked barbecue in our two-level Montalban restaurant:
              </p>

              <div className="mt-5 space-y-2.5">
                {[
                  '11 Tables on the 1st Floor (Ground Level)',
                  '4 Tables on the 2nd Floor (Upper Level)',
                  'Free Unlimited Heirloom Red Rice Refills',
                  'Free Piping-Hot Bone Broth Refills'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#FBF8F3]">
                    <span className="w-1.5 h-1.5 bg-[#C67D26]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#781728]">
              <button
                onClick={() => onNavigate('menu')}
                className="w-full py-3.5 bg-[#C67D26] hover:bg-[#A5641A] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-subtle"
              >
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
