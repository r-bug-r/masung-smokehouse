import React from 'react';
import type { PageId } from '../types';
import { Flame, Gift, Ticket, ShoppingBag, Stamp, Layers, Award, ArrowRight } from 'lucide-react';

interface LoyaltyCardShowcaseProps {
  onNavigate?: (page: PageId) => void;
}

export const LoyaltyCardShowcase: React.FC<LoyaltyCardShowcaseProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F5EFEB] border-b border-[#E5DFD5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: 1:1 3D Leather/Textured Loyalty Stamp Card */}
          <div className="lg:col-span-6 flex justify-center perspective-[1000px]">
            
            <div className="relative w-full max-w-md bg-gradient-to-br from-[#2D060D] via-[#4A0E18] to-[#1E1E1E] rounded-2xl p-6 sm:p-7 text-white shadow-2xl border-2 border-[#C67D26]/60 transform hover:scale-[1.02] transition-all duration-300 select-none">
              
              {/* Card Header: Brand + Stamp Flame Icon */}
              <div className="flex items-start justify-between pb-4 border-b border-white/15">
                <div>
                  <h3 className="font-bebas text-3xl font-bold tracking-wider leading-none text-white">
                    MASUNG
                  </h3>
                  <span className="font-montserrat text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#C67D26] block mt-0.5">
                    LOYALTY CARD
                  </span>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#C67D26] flex items-center justify-center shadow-md">
                  <Flame className="w-5 h-5 text-[#1E1E1E]" />
                </div>
              </div>

              {/* Card Body: 10 Stamp Circle Slots (5 on top, 5 on bottom) */}
              <div className="py-5">
                <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center">
                  
                  {/* Top Row: Stamps 1 to 5 */}
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div
                      key={num}
                      className={`aspect-square rounded-full flex flex-col items-center justify-center border-2 transition-all ${
                        num <= 4 
                          ? 'bg-[#F5EFEB] border-[#C67D26] text-[#5B101D] shadow-sm'
                          : 'bg-[#F5EFEB]/90 border-[#C67D26] text-[#5B101D]'
                      }`}
                    >
                      {num <= 3 ? (
                        <Flame className="w-4 h-4 text-[#5B101D]" />
                      ) : (
                        <span className="font-montserrat font-extrabold text-xs sm:text-sm">
                          {num}
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Bottom Row: Stamps 6 to 9 and 10th (FREE MEAL) */}
                  {[6, 7, 8, 9].map((num) => (
                    <div
                      key={num}
                      className="aspect-square rounded-full flex items-center justify-center bg-white/10 border border-dashed border-white/30 text-white/70"
                    >
                      <span className="font-montserrat font-bold text-xs sm:text-sm">
                        {num}
                      </span>
                    </div>
                  ))}

                  {/* 10th Stamp: FREE Gift */}
                  <div className="aspect-square rounded-full flex flex-col items-center justify-center bg-[#C67D26] border-2 border-[#FFE8A3] text-[#1E1E1E] shadow-md">
                    <Gift className="w-3.5 h-3.5" />
                    <span className="font-montserrat font-extrabold text-[8px] uppercase tracking-wider">
                      FREE
                    </span>
                  </div>

                </div>
              </div>

              {/* Card Footer: 5 Stamps & 10 Stamps Rewards */}
              <div className="pt-3 border-t border-white/15 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="pr-2 border-r border-white/15">
                  <span className="font-montserrat font-bold text-[10px] text-[#C67D26] uppercase block">
                    5 STAMPS
                  </span>
                  <strong className="font-montserrat font-extrabold text-white text-xs sm:text-sm">
                    ₱50 OFF
                  </strong>
                </div>
                <div className="pl-2">
                  <span className="font-montserrat font-bold text-[10px] text-[#C67D26] uppercase block">
                    10 STAMPS
                  </span>
                  <strong className="font-montserrat font-extrabold text-white text-xs sm:text-sm">
                    FREE MEAL
                  </strong>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: 1:1 Loyalty Copy, 4-Step Flowchart & Rewards */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Pill Eyebrow */}
            <div>
              <span className="px-3.5 py-1 bg-[#5B101D] text-white font-montserrat font-extrabold text-[10px] uppercase tracking-widest rounded-full inline-block shadow-xs">
                LOYALTY PROGRAM
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-bebas text-5xl sm:text-6xl font-bold uppercase tracking-tight leading-[0.92] text-[#1E1E1E]">
              EARN STAMPS. <br />
              <span className="text-[#5B101D]">GET REWARDED.</span>
            </h2>

            {/* Subtext */}
            <p className="font-body text-sm sm:text-base text-[#5C5651] leading-relaxed max-w-lg">
              Every purchase gets you closer to big rewards.<br />
              More visits, more flavors, more Masung.
            </p>

            {/* 4-Step Circular Flowchart (1:1 Match) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              
              {/* Step 1: BUY */}
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg border border-[#E5DFD5] shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#5B101D] flex items-center justify-center mb-1.5 border border-[#EAE3D9]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <strong className="font-montserrat font-extrabold text-[11px] uppercase text-[#1E1E1E] block">
                  BUY
                </strong>
                <span className="font-body text-[10px] text-[#5C5651]">
                  Make a purchase
                </span>
              </div>

              {/* Step 2: STAMP */}
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg border border-[#E5DFD5] shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#5B101D] flex items-center justify-center mb-1.5 border border-[#EAE3D9]">
                  <Stamp className="w-4 h-4" />
                </div>
                <strong className="font-montserrat font-extrabold text-[11px] uppercase text-[#1E1E1E] block">
                  STAMP
                </strong>
                <span className="font-body text-[10px] text-[#5C5651]">
                  Get your stamp
                </span>
              </div>

              {/* Step 3: COLLECT */}
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg border border-[#E5DFD5] shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#5B101D] flex items-center justify-center mb-1.5 border border-[#EAE3D9]">
                  <Layers className="w-4 h-4" />
                </div>
                <strong className="font-montserrat font-extrabold text-[11px] uppercase text-[#1E1E1E] block">
                  COLLECT
                </strong>
                <span className="font-body text-[10px] text-[#5C5651]">
                  Keep coming back
                </span>
              </div>

              {/* Step 4: GET REWARD */}
              <div className="flex flex-col items-center text-center p-3 bg-white rounded-lg border border-[#E5DFD5] shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#C67D26] flex items-center justify-center mb-1.5 border border-[#EAE3D9]">
                  <Award className="w-4 h-4" />
                </div>
                <strong className="font-montserrat font-extrabold text-[11px] uppercase text-[#1E1E1E] block">
                  GET REWARD
                </strong>
                <span className="font-body text-[10px] text-[#5C5651]">
                  Enjoy rewards
                </span>
              </div>

            </div>

            {/* Bottom 2 Reward Feature Cards (1:1 Match) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              
              {/* Reward 1 */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-[#E5DFD5] shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] text-[#5B101D] flex items-center justify-center shrink-0 border border-[#EAE3D9]">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-montserrat font-bold text-[10px] uppercase text-[#C67D26]">5 STAMPS</span>
                    <strong className="font-montserrat font-extrabold text-sm text-[#1E1E1E]">₱50 OFF</strong>
                  </div>
                  <span className="font-body text-xs text-[#5C5651]">
                    your next purchase
                  </span>
                </div>
              </div>

              {/* Reward 2 */}
              <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-xl border border-[#E5DFD5] shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-[#FAF7F2] text-[#5B101D] flex items-center justify-center shrink-0 border border-[#EAE3D9]">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-montserrat font-bold text-[10px] uppercase text-[#C67D26]">10 STAMPS</span>
                    <strong className="font-montserrat font-extrabold text-sm text-[#1E1E1E]">FREE MEAL</strong>
                  </div>
                  <span className="font-body text-xs text-[#5C5651]">
                    on your next visit
                  </span>
                </div>
              </div>

            </div>

            {/* Check Pit Pass Portal link */}
            {onNavigate && (
              <div className="pt-1">
                <button
                  onClick={() => onNavigate('loyalty')}
                  className="inline-flex items-center gap-2 font-montserrat font-extrabold text-xs uppercase tracking-wider text-[#5B101D] hover:text-[#32070E] cursor-pointer"
                >
                  <span>Open Pit Pass Member Portal</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C67D26]" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
