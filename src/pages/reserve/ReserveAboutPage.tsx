import React, { useEffect } from 'react';
import type { PageId } from '../../types';
import { initScrollAnimations } from '../../lib/animations';
import { SmokeTimeline } from '../../components/reserve/SmokeTimeline';
import { Flame, Award, HeartHandshake } from 'lucide-react';
import { SafeImage } from '../../components/SafeImage';

interface ReserveAboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const ReserveAboutPage: React.FC<ReserveAboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0406] text-[#F3ECE6] py-12 sm:py-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-20">
        
        {/* Editorial Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4AF37] block">
            Craftsmanship & Fire
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#FFF5F7] tracking-tight leading-[1.05]">
            The Heritage of Philippine Hardwood Smoke
          </h1>
          <p className="text-xs sm:text-base text-[#D8C7C4] font-light leading-relaxed">
            In an era of commercial steam combi-ovens and liquid smoke flavorings, Masung Smokehouse honors the slow, patient craft of authentic offset log-fire cooking.
          </p>
        </div>

        {/* Asymmetrical Editorial Story Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-section">
          
          {/* Left: Food & Pit Photo with Scarlet Glow */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden border border-[#3D0C15] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <SafeImage
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
                alt="Pitmaster Slicing Brisket"
                fallbackSrc="/masung_smoked_meat_hero_hd.png"
                category="texas-smoked"
                className="w-full h-[400px] sm:h-[500px] object-cover hover:scale-105 transition-transform duration-700 ease-out brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0406] via-transparent to-transparent pointer-events-none z-15" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block font-mono">
                  Dela Costa V, Montalban
                </span>
                <p className="font-serif text-xl text-[#FFF5F7] italic">
                  "Fire is our only seasoning shortcut."
                </p>
              </div>
            </div>
          </div>

          {/* Right: The 3 Tenets */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-semibold mb-2">
                Our Three Non-Negotiables
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF5F7] leading-snug">
                Why We Wake Up at 4:00 AM Every Morning
              </h2>
            </div>

            <div className="space-y-6">
              
              <div className="p-5 bg-[#120609] border border-[#3D0C15] space-y-2">
                <div className="flex items-center gap-3">
                  <Flame className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-serif text-lg text-[#FFF5F7]">
                    100% Solid Hardwood Fire
                  </h4>
                </div>
                <p className="text-xs text-[#D8C7C4] leading-relaxed font-light pl-7">
                  Zero charcoal briquettes with chemical binders. Zero electric pellets. We burn split logs of cured Philippine mountain oak and seasoned fruitwood, coaxing gentle blue smoke through offset chambers for up to 16 continuous hours.
                </p>
              </div>

              <div className="p-5 bg-[#120609] border border-[#3D0C15] space-y-2">
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-serif text-lg text-[#FFF5F7]">
                    Hand-Carved to Order
                  </h4>
                </div>
                <p className="text-xs text-[#D8C7C4] leading-relaxed font-light pl-7">
                  Smoked brisket and pork belly dry out within minutes of being sliced under a heat lamp. At Masung, cuts rest in insulated cambros until an order is fired—sliced live across the grain straight onto your dining board.
                </p>
              </div>

              <div className="p-5 bg-[#120609] border border-[#3D0C15] space-y-2">
                <div className="flex items-center gap-3">
                  <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                  <h4 className="font-serif text-lg text-[#FFF5F7]">
                    Pinoy Soul & Neighborhood Hospitality
                  </h4>
                </div>
                <p className="text-xs text-[#D8C7C4] leading-relaxed font-light pl-7">
                  Texas barbecue technique married with beloved Filipino traditions: free unlimited heirloom red rice, rich bone broth ladled steaming hot from giant stock pots, and warm smokehouse hospitality in Montalban.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* 16-Hour Smoke Timeline Component */}
        <div className="animate-section">
          <SmokeTimeline />
        </div>

        {/* The Meat & Cut Standards */}
        <div className="bg-[#120609] border border-[#3D0C15] p-8 sm:p-12 space-y-8 animate-section">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-semibold">
              Quality Assurance
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#FFF5F7]">
              The Anatomy of a Masung Cut
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-[#0A0406] border border-[#3D0C15] space-y-2">
              <span className="text-xs font-mono text-[#D4AF37] block font-bold">01. THE CRUST</span>
              <h4 className="font-serif text-xl text-[#FFF5F7]">Coarse Pepper Bark</h4>
              <p className="text-xs text-[#D8C7C4] font-light leading-relaxed">
                Coarse butcher-grind black pepper bonds with natural meat sugars and hardwood soot, creating a savory, crunchy obsidian bark without overpowering the meat.
              </p>
            </div>

            <div className="p-6 bg-[#0A0406] border border-[#3D0C15] space-y-2">
              <span className="text-xs font-mono text-[#D4AF37] block font-bold">02. THE SIGNATURE</span>
              <h4 className="font-serif text-xl text-[#FFF5F7]">The Smoke Ring</h4>
              <p className="text-xs text-[#D8C7C4] font-light leading-relaxed">
                A 6mm deep pink halo beneath the surface, formed naturally as nitric oxide from clean wood fire locks myoglobin in the meat during the first 4 hours of smoking.
              </p>
            </div>

            <div className="p-6 bg-[#0A0406] border border-[#3D0C15] space-y-2">
              <span className="text-xs font-mono text-[#D4AF37] block font-bold">03. THE TEXTURE</span>
              <h4 className="font-serif text-xl text-[#FFF5F7]">Pull-Apart Tenderness</h4>
              <p className="text-xs text-[#D8C7C4] font-light leading-relaxed">
                At 203°F internal temperature, tough collagen completely renders into rich, gelatinous moisture. A warm slice holds together gently, then parts with zero resistance.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('reserve-menu')}
              className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer shadow-md"
            >
              Explore Our Cuts
            </button>
            <button
              onClick={() => onNavigate('reserve-book')}
              className="px-8 py-3.5 border border-[#3D0C15] hover:border-[#D4AF37] bg-[#0A0406] text-[#FFF5F7] text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              Reserve a Table
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
