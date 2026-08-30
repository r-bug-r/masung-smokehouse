import React from 'react';
import type { PageId } from '../types';
import { ArrowRight, Flame, MapPin, HeartHandshake } from 'lucide-react';

interface AboutPreviewProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPreview: React.FC<AboutPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="animate-section py-16 sm:py-20 bg-[#FBF8F3] border-b border-[#E5DFD5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Story Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative border-2 border-[#5B101D] bg-[#181615] p-2 shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85"
                alt="Pitmaster carving smoked meat"
                className="w-full h-72 sm:h-84 object-cover filter contrast-105"
              />
              <div className="p-4 bg-[#32070E] text-white space-y-1">
                <div className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#C67D26]">
                  Montalban & U-Belt
                </div>
                <div className="text-xs text-[#E5DFD5]">
                  Authentic Philippine hardwood low & slow smoking.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Read More CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3.5 py-1 inline-block">
                Our Story & Philosophy
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-[#181615] tracking-tight leading-tight">
                Real Hardwood Smoke. <br />
                <span className="text-[#5B101D]">Filipino Hospitality.</span>
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#5C5651] leading-relaxed">
              Masung began with a single offset smoker in Montalban, burning seasoned Philippine mountain oak and fruitwood logs around the clock. We pair genuine Texas low & slow pitmaster technique with the generous warmth of Pinoy dining—pairing fork-tender brisket with free unlimited heirloom red rice and piping-hot bone broth.
            </p>

            {/* Quick Proof Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
              <div className="p-3 bg-white border border-[#E5DFD5] space-y-1 shadow-xs">
                <Flame className="w-4 h-4 text-[#5B101D]" />
                <strong className="text-[#181615] block">8–16h Hardwood</strong>
                <span className="text-[#5C5651] text-[11px]">Zero boiling shortcuts</span>
              </div>
              <div className="p-3 bg-white border border-[#E5DFD5] space-y-1 shadow-xs">
                <HeartHandshake className="w-4 h-4 text-[#C67D26]" />
                <strong className="text-[#181615] block">Free Red Rice</strong>
                <span className="text-[#5C5651] text-[11px]">Unlimited refills</span>
              </div>
              <div className="p-3 bg-white border border-[#E5DFD5] space-y-1 shadow-xs">
                <MapPin className="w-4 h-4 text-[#5B101D]" />
                <strong className="text-[#181615] block">2 Locations</strong>
                <span className="text-[#5C5651] text-[11px]">Montalban & U-Belt</span>
              </div>
            </div>

            {/* Read More Button */}
            <div className="pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-subtle"
              >
                <span>Read More About Masung</span>
                <ArrowRight className="w-4 h-4 text-[#C67D26]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
