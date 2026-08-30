import React from 'react';
import { Sparkles, Check, HeartHandshake } from 'lucide-react';

export const CraftSection: React.FC = () => {
  const foodCards = [
    {
      title: 'Texas Beef Brisket',
      price: 'Starts ₱139',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      description: '12-hour oakwood smoke. Thick slices with dark coarse pepper bark and a deep pink smoke ring.',
      tag: 'Signature Cut'
    },
    {
      title: 'Hickory Pork Belly (Liempo)',
      price: 'Starts ₱119',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: 'Golden crisp crackling crust with melting fat layers and house garlic spiced vinegar.',
      tag: 'Crispy & Juicy'
    },
    {
      title: 'St. Louis Smoked Ribs',
      price: 'Starts ₱159',
      image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
      description: 'Slow-smoked pork ribs glazed with rich molasses barbecue sauce. Fork-tender pull.',
      tag: 'Fall-Off-Bone'
    },
    {
      title: 'Unlimited Red Rice & Bone Broth',
      price: 'Free Refills',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
      description: 'Heirloom mountain red rice that absorbs meat drippings, paired with hot brisket bone soup.',
      tag: 'Always Unlimited'
    }
  ];

  return (
    <section className="relative py-20 lg:py-24 text-white overflow-hidden bg-[#181615] border-b-2 border-[#5B101D]">
      
      {/* Full-Width Parallax Background Image with Smoke & Embers */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-25 filter contrast-125"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=80')`
        }}
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#181615] via-[#181615]/85 to-[#181615] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header with U-BELT Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-[#5B101D] border border-[#781728] text-white text-xs font-bold uppercase tracking-widest shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-[#C67D26]" />
            <span>THE FIRST SMOKEHOUSE IN U-BELT</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
            How We Smoke: <span className="text-[#C67D26]">8 to 16 Hours</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#E5DFD5] max-w-2xl mx-auto leading-relaxed">
            No boiling. No liquid smoke shortcuts. We burn local Philippine mountain oak and fruitwood logs between 190°F and 225°F until the collagen melts into fork-tender barbecue.
          </p>
        </div>

        {/* Parallax Floating Cards: Combining Pictures with Individual Foods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodCards.map((food, idx) => (
            <div
              key={idx}
              className="group bg-[#24201D]/90 border border-[#3D3733] hover:border-[#C67D26] p-4 transition-all duration-300 shadow-elevated hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Food Image with Hairline Border */}
                <div className="relative overflow-hidden aspect-4/3 bg-[#181615] border border-[#4A433D]">
                  <img
                    src={food.image}
                    alt={food.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#5B101D] text-white text-[10px] font-bold uppercase tracking-wider">
                    {food.tag}
                  </span>
                  <span className="absolute bottom-2 right-2 px-2.5 py-0.5 bg-[#181615]/90 text-[#C67D26] font-mono text-xs font-extrabold border border-[#C67D26]/40">
                    {food.price}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-heading font-extrabold text-base text-white uppercase tracking-tight group-hover:text-[#C67D26] transition-colors">
                    {food.title}
                  </h3>
                  <p className="text-xs text-[#A89F96] mt-1.5 leading-relaxed">
                    {food.description}
                  </p>
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="mt-4 pt-3 border-t border-[#3D3733] flex items-center gap-1.5 text-[11px] text-[#C67D26] font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>Unlimited Red Rice Refills</span>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Tender Meat Guarantee Banner */}
        <div className="p-4 sm:p-5 bg-[#32070E] border-2 border-[#5B101D] text-center max-w-2xl mx-auto flex items-center justify-center gap-3">
          <HeartHandshake className="w-5 h-5 text-[#C67D26] shrink-0" />
          <p className="text-xs sm:text-sm text-[#FBF8F3]">
            <strong className="text-[#C67D26] uppercase">Our Pit Guarantee:</strong> If your meat isn't fork-tender, let our pitmaster know and we will carve you a fresh slice right away.
          </p>
        </div>

      </div>
    </section>
  );
};
