import React from 'react';
import type { PageId } from '../types';
import { Gamepad2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#FBF8F3] py-10 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: The Masung Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3.5 py-1 inline-block">
              Rodriguez, Rizal Flagship
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#5B101D] uppercase tracking-tight leading-tight">
              Filipino Soul <br />
              <span className="text-[#181615] font-normal text-3xl sm:text-4xl block mt-1">
                Meets Texas Smoke.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#5C5651] leading-relaxed">
              We smoke brisket, ribs, and pork belly for <strong>8 to 16 hours</strong> over seasoned Philippine oakwood and hickory in Dela Costa V, Burgos, Rodriguez (Montalban), Rizal.
            </p>

            <p className="text-sm sm:text-base text-[#5C5651] leading-relaxed">
              Every signature meal is paired with <strong>unlimited heirloom red rice</strong> and hot <strong>smoked bone broth</strong>, with rice bowls starting at <strong>₱99</strong>.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('menu')}
                className="px-6 py-3 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-subtle"
              >
                <span>See Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="border-4 border-white bg-white shadow-elevated">
              <img
                src="/mascot.jpg"
                alt="Masung Mascot"
                className="w-full h-80 object-cover"
              />
              <div className="p-5 bg-white text-center">
                <span className="font-heading font-extrabold text-lg text-[#5B101D] uppercase block">
                  Our Mascot
                </span>
                <p className="text-xs text-[#5C5651] mt-1">
                  Rodriguez, Rizal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Dine & Play Games Lounge */}
        <div className="bg-[#5B101D] text-white p-8 sm:p-12 shadow-elevated border-2 border-[#460B15] space-y-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[#E5DFD5] text-xs font-bold uppercase tracking-widest mb-2">
              <Gamepad2 className="w-4 h-4" />
              <span>Free for Guests</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
              Eat Barbecue. <span className="text-[#C67D26]">Play for Free.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#FBF8F3]/85 mt-2 leading-relaxed">
              We built Masung as a neighborhood hangout in Montalban. All dining customers can play our games for free while waiting for food or after eating:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Billiards Table',
                desc: 'Standard pool table with cues and chalk.'
              },
              {
                title: 'Retro Arcade Machine',
                desc: 'Classic 80s and 90s arcade favorites.'
              },
              {
                title: 'Darts Lane',
                desc: 'Official dartboard with scoring board.'
              },
              {
                title: 'Board Games & Foosball',
                desc: 'Fun games for families and barkadas.'
              }
            ].map((amenity, idx) => (
              <div key={idx} className="bg-[#460B15] p-5 border border-[#781728] space-y-2">
                <h3 className="font-heading font-extrabold text-sm uppercase text-[#C67D26] tracking-wide">
                  {amenity.title}
                </h3>
                <p className="text-xs text-[#E5DFD5] leading-relaxed">
                  {amenity.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#781728] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E5DFD5]">
            <span>No tokens or rental fees. Free while you dine.</span>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-[#C67D26] hover:bg-[#A5641A] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Directions & Hours
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
