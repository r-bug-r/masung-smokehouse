import React, { useState } from 'react';
import type { PageId } from '../types';
import { ArrowRight, Sparkles, Flame } from 'lucide-react';

interface LoyaltyCardShowcaseProps {
  onNavigate: (page: PageId) => void;
}

export const LoyaltyCardShowcase: React.FC<LoyaltyCardShowcaseProps> = ({ onNavigate }) => {
  // 3D Card Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section className="animate-section py-16 sm:py-20 bg-[#F2ECE1] border-b border-[#E5DFD5] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive 3D Metallic/Leather Pit Pass Card */}
          <div className="lg:col-span-6 flex justify-center perspective-[1000px]">
            <div
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: isHovered
                  ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)`
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                transformStyle: 'preserve-3d'
              }}
              className="relative w-full max-w-md h-60 sm:h-64 rounded-2xl bg-gradient-to-br from-[#2D060D] via-[#460B15] to-[#181615] border-2 border-[#C67D26]/70 shadow-2xl p-6 flex flex-col justify-between cursor-pointer select-none overflow-hidden group"
            >
              {/* Metallic Sheen Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity"
                style={{
                  transform: `translateX(${tilt.y * 3}px) translateY(${tilt.x * 3}px)`
                }}
              />

              {/* Card Top Row */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C67D26] flex items-center justify-center shadow-md">
                    <Flame className="w-4 h-4 text-[#181615]" />
                  </div>
                  <div>
                    <span className="font-heading font-extrabold text-sm text-white tracking-wider block leading-none">
                      MASUNG
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#C67D26] block">
                      PIT PASS
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-9 h-6 rounded-sm bg-gradient-to-tr from-[#D4AF37] via-[#FFF3B0] to-[#AA7C11] border border-[#781728] opacity-90 shadow-inner" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5DFD5] font-bold">
                    VIP
                  </span>
                </div>
              </div>

              {/* Card Middle */}
              <div className="relative z-10 space-y-0.5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C67D26]">
                  Member Perks
                </span>
                <h4 className="font-heading font-extrabold text-lg text-white tracking-wide">
                  Certified Pitmaster
                </h4>
                <p className="text-[11px] text-[#E5DFD5]/90">
                  1 Point per ₱10 • Unlimited Rice & Broth
                </p>
              </div>

              {/* Card Bottom */}
              <div className="relative z-10 pt-2.5 border-t border-white/15 flex items-center justify-between text-xs font-mono text-[#E5DFD5]">
                <strong className="text-white tracking-widest">MS-VIP-2026</strong>
                <div className="flex items-center gap-1 text-[10px] text-[#C67D26] font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>Verified Diner</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simplified Ultra-Clean Copy */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5] px-3 py-1 inline-block">
              PIT PASS REWARDS
            </span>

            <h2 className="font-heading text-4xl sm:text-5xl font-extrabold uppercase text-[#181615] tracking-tight leading-none">
              1 POINT <br />
              <span className="text-[#5B101D]">PER ₱10 SPENT.</span>
            </h2>

            <p className="text-sm text-[#5C5651] max-w-md leading-relaxed">
              Earn rewards on every meal. Redeem points for free smoked beef brisket platters, iced tea pitchers, and dining discounts.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('loyalty')}
                className="px-7 py-3.5 bg-[#C67D26] hover:bg-[#A5641A] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer shadow-subtle"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
