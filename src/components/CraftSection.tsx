import React, { useRef } from 'react';
import type { PageId } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';

interface CraftSectionProps {
  onNavigate?: (page: PageId) => void;
}

export const CraftSection: React.FC<CraftSectionProps> = ({ onNavigate }) => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dishes = [
    {
      id: 'brisket-platter',
      title: 'Texas Smoked Beef Brisket',
      subtitle: 'Pitmaster Signature • 16h Oakwood Bark',
      price: 139,
      priceLabel: 'Starts ₱139',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      badge: 'Signature Cut',
      desc: 'Sliced thick with a deep pink smoke ring and dark coarse pepper bark. Served with unli red rice & hot bone broth.',
      category: 'Beef'
    },
    {
      id: 'pulled-pork-rice-bowl',
      title: 'Smoked Pulled Pork Rice Bowl',
      subtitle: 'Sulit ₱99 Meal • Special Oakwood Glaze',
      price: 99,
      priceLabel: 'Only ₱99',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
      badge: 'Sulit ₱99',
      desc: 'Tender shredded hardwood pork shoulder over hot heirloom red rice with barbecue gravy.',
      category: 'Pork'
    },
    {
      id: 'pork-belly-liempo',
      title: 'Smoked Pork Belly (Liempo)',
      subtitle: 'Crisp Crackling Top • Spiced Garlic Glaze',
      price: 119,
      priceLabel: 'Starts ₱119',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      badge: 'Crispy & Juicy',
      desc: 'Crisp wood-smoked pork belly with melted fat layers, paired with house garlic spiced vinegar.',
      category: 'Pork'
    },
    {
      id: 'smoked-beef-karekare',
      title: 'Smoked Beef Kare-Kare',
      subtitle: 'Filipino Smokehouse Fusion • Roasted Peanut Sauce',
      price: 179,
      priceLabel: 'Starts ₱179',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      badge: 'House Special',
      desc: 'Tender smoked beef chunks slow-simmered in rich roasted peanut stew with eggplant and bagoong.',
      category: 'Fusion'
    },
    {
      id: 'sizzling-beef-sisig',
      title: 'Sizzling Smoked Beef Sisig',
      subtitle: 'Cast Iron Skillet • With Egg & Red Rice',
      price: 139,
      priceLabel: 'Only ₱139',
      image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=800&q=80',
      badge: 'Best Pulutan',
      desc: 'Crisped chopped smoked beef on a sizzling skillet, topped with fresh chili and calamansi.',
      category: 'Sizzling'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 380;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleQuickAdd = (dish: typeof dishes[0]) => {
    addItem({
      id: dish.id,
      name: dish.title,
      price: dish.price,
      description: dish.desc,
      imageUrl: dish.image,
      category: 'texas-smoked',
      macros: { calories: 520, protein: 36, carbs: 42, fat: 22 }
    });
    showToast('Added to Order', `${dish.title} added to your tray`, 'success');
  };

  return (
    <section className="relative py-20 bg-[#181615] text-white border-b-2 border-[#5B101D] overflow-hidden">
      
      {/* Parallax Embers Background Texture */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20 pointer-events-none filter contrast-125"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#181615] via-[#181615]/85 to-[#181615] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header: Replaced with ONLY THIS: THE FIRST SMOKEHOUSE IN U-BELT */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-[#3D3733]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#5B101D] border border-[#781728] text-white text-xs font-bold uppercase tracking-widest mb-2 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C67D26]" />
              <span>AUTHENTIC WOOD SMOKEHOUSE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
              THE FIRST SMOKEHOUSE IN U-BELT
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="p-3 bg-[#24201D] hover:bg-[#5B101D] border border-[#3D3733] text-white transition-colors cursor-pointer shadow-subtle"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 bg-[#24201D] hover:bg-[#5B101D] border border-[#3D3733] text-white transition-colors cursor-pointer shadow-subtle"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Parallax Carousel Track */}
        <div 
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dishes.map((dish) => (
            <div
              key={dish.id}
              className="w-[300px] sm:w-[360px] shrink-0 snap-start bg-[#24201D]/90 border-2 border-[#3D3733] hover:border-[#C67D26] p-5 flex flex-col justify-between transition-all duration-300 shadow-elevated group"
            >
              <div className="space-y-4">
                {/* Food Image with Parallax Depth Zoom */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#181615] border border-[#4A433D]">
                  <img
                    src={dish.image}
                    alt={dish.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter contrast-105"
                    loading="lazy"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-[#5B101D] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
                    {dish.badge}
                  </span>
                  <span className="absolute bottom-2.5 right-2.5 px-3 py-1 bg-[#181615]/95 text-[#C67D26] font-mono text-xs font-extrabold border border-[#C67D26]/40 shadow-xs">
                    {dish.priceLabel}
                  </span>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-[#C67D26] uppercase font-bold tracking-wider block">
                    {dish.subtitle}
                  </span>
                  <h3 className="font-heading font-extrabold text-lg text-white uppercase tracking-tight group-hover:text-[#C67D26] transition-colors leading-tight">
                    {dish.title}
                  </h3>
                  <p className="text-xs text-[#A89F96] leading-relaxed line-clamp-2">
                    {dish.desc}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-[#3D3733] flex items-center justify-between gap-3">
                <span className="text-[11px] text-[#E5DFD5] font-semibold">
                  Free Unli Red Rice
                </span>

                <button
                  onClick={() => handleQuickAdd(dish)}
                  className="px-4 py-2 bg-[#C67D26] hover:bg-[#A5641A] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-subtle"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Menu Link */}
        {onNavigate && (
          <div className="text-center pt-2">
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 text-xs font-heading font-extrabold uppercase tracking-widest text-[#C67D26] hover:text-white transition-colors cursor-pointer"
            >
              <span>View Complete Menu & Macros</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
