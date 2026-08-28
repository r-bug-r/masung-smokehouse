import React from 'react';
import { Flame, ShieldCheck, HeartPulse, Check } from 'lucide-react';

export const CraftSection: React.FC = () => {
  return (
    <section className="animate-section py-16 bg-[#FBF8F3] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Descriptive Story and Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3 py-1 inline-block mb-3">
                How We Smoke
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#5B101D] uppercase tracking-tight leading-tight">
                This Isn't Grilled Meat. <br />
                <span className="text-[#181615] font-normal text-2xl sm:text-3xl block mt-1">
                  This Takes 8 to 16 Hours.
                </span>
              </h2>
            </div>

            <p className="text-base text-[#5C5651] leading-relaxed">
              No boiling. No liquid smoke shortcuts. We burn local Philippine oak and hickory logs between 190°F and 225°F until the meat is fork-tender.
            </p>

            {/* Value Pillars List */}
            <div className="space-y-3 pt-2">
              
              <div className="flex items-start gap-4 bg-white p-4 border border-[#E5DFD5] shadow-subtle">
                <div className="w-8 h-8 bg-[#5B101D] text-white flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-extrabold text-[#181615] uppercase tracking-wide">
                    8 to 16 Hours in the Smoker
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5651] mt-0.5">
                    Real wood smoke gives our brisket a dark pepper crust and a pink smoke ring.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-4 border border-[#E5DFD5] shadow-subtle">
                <div className="w-8 h-8 bg-[#181615] text-white flex items-center justify-center shrink-0">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-extrabold text-[#181615] uppercase tracking-wide">
                    Unlimited Heirloom Red Rice
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5651] mt-0.5">
                    Heirloom red rice that soaks up every drop of meat juices. Free refills with every meal.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-4 border border-[#E5DFD5] shadow-subtle">
                <div className="w-8 h-8 bg-[#5B101D] text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-extrabold text-[#181615] uppercase tracking-wide">
                    Free Hot Smoked Bone Soup
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5C5651] mt-0.5">
                    Simmered for hours from smoked brisket bones. Hot, comforting, and unlimited.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Food Presentation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border-4 border-white bg-white shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1000&auto=format&fit=crop&q=80"
                alt="Smoked meat on cutting board"
                className="w-full h-80 object-cover"
              />
              <div className="p-5 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-heading font-extrabold text-lg text-[#5B101D] uppercase">
                    Texas Beef Brisket
                  </span>
                  <span className="font-heading font-extrabold text-base text-[#181615]">
                    Starts ₱139
                  </span>
                </div>
                <p className="text-xs text-[#5C5651]">
                  Sliced thick and served with spiced vinegar, house barbecue sauce, and hot red rice.
                </p>
              </div>
            </div>

            {/* Guarantee Tag */}
            <div className="bg-[#F2ECE1] border border-[#E5DFD5] p-4 flex items-center gap-3">
              <div className="w-7 h-7 bg-[#5B101D] text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#181615] font-medium">
                <strong>Our Guarantee:</strong> If your meat isn't tender, let us know and we'll carve you a fresh slice right away.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
