import React, { useRef } from 'react';
import type { PageId } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface CraftSectionProps {
  onNavigate?: (page: PageId) => void;
}

export const CraftSection: React.FC<CraftSectionProps> = ({ onNavigate }) => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const dishes = [
    {
      id: 'smoked-beef-brisket',
      title: 'TEXAS SMOKED BEEF BRISKET',
      desc: '16-hour oakwood smoked brisket with pepper bark and distinct smoke ring.',
      price: 179,
      image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800&auto=format&fit=crop&q=80',
      badge: '★ BESTSELLER',
      badgeColor: 'bg-[#5B101D] text-white',
      macros: {
        calories: 620,
        protein: 45,
        carbs: 48
      }
    },
    {
      id: 'smoked-pulled-pork-rice',
      title: 'PORK RICE BOWL',
      desc: 'Tender shredded hardwood pork shoulder over hot heirloom red rice with oakwood glaze.',
      price: 99,
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
      badge: 'NEW',
      badgeColor: 'bg-[#C67D26] text-white',
      macros: {
        calories: 490,
        protein: 28,
        carbs: 61
      }
    },
    {
      id: 'smoked-pork-belly',
      title: 'SMOKED PORK BELLY (LIEMPO)',
      desc: 'Crispy skin crackling with succulent rendered fat and spiced garlic glaze.',
      price: 149,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
      badge: 'SIGNATURE',
      badgeColor: 'bg-[#1E1E1E] text-white',
      macros: {
        calories: 560,
        protein: 32,
        carbs: 10
      }
    },
    {
      id: 'smoked-beef-kare-kare',
      title: 'SMOKED BEEF KARE-KARE',
      desc: 'Tender smoked beef chunks slow-simmered in roasted peanut sauce with eggplant.',
      price: 179,
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
      badge: 'FUSION SPECIAL',
      badgeColor: 'bg-[#5B101D] text-white',
      macros: {
        calories: 580,
        protein: 38,
        carbs: 44
      }
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 360;
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
      macros: { calories: dish.macros.calories, protein: dish.macros.protein, carbs: dish.macros.carbs, fat: 22 }
    });
    showToast('Added to Order', `${dish.title} added to your tray`, 'success');
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#F5EFEB] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
        
        {/* Header Row: Eyebrow, Headline, Navigation Arrows & View All */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
          
          <div className="space-y-1.5">
            <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
              OUR MENU
            </span>
            <h2 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-none text-[#1E1E1E]">
              THE FIRST SMOKEHOUSE <span className="text-[#5B101D]">IN U-BELT</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
            {/* View All Menu Link */}
            {onNavigate && (
              <button
                onClick={() => onNavigate('menu')}
                className="group flex items-center gap-1.5 text-xs font-montserrat font-extrabold uppercase tracking-wider text-[#5B101D] hover:text-[#32070E] mr-2 cursor-pointer transition-colors"
              >
                <span>VIEW ALL MENU</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C67D26] group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {/* Prev Button */}
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full border border-[#D5CCC0] hover:border-[#5B101D] bg-white hover:bg-[#FAF7F2] text-[#1E1E1E] flex items-center justify-center transition-all cursor-pointer shadow-subtle"
              aria-label="Previous dishes"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Button */}
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full border border-[#D5CCC0] hover:border-[#5B101D] bg-white hover:bg-[#FAF7F2] text-[#1E1E1E] flex items-center justify-center transition-all cursor-pointer shadow-subtle"
              aria-label="Next dishes"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Horizontal Dishes Carousel / Grid */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
        >
          {dishes.map(dish => (
            <div
              key={dish.id}
              className="w-80 sm:w-[350px] shrink-0 snap-start bg-white rounded-xl border border-[#E5DFD5] shadow-subtle flex flex-col justify-between overflow-hidden group hover:shadow-elevated transition-all"
            >
              <div>
                {/* Food Image with Floating Badge */}
                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306]">
                  <SafeImage
                    src={dish.image}
                    alt={dish.title}
                    fallbackSrc="/masung_brisket_food_asset_hd.png"
                    category="texas-smoked"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3.5 left-3.5 px-3 py-1 text-[10px] font-montserrat font-extrabold uppercase tracking-wider rounded-sm shadow-md z-20 ${dish.badgeColor}`}>
                    {dish.badge}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-montserrat font-extrabold text-sm sm:text-base uppercase text-[#1E1E1E] leading-snug">
                      {dish.title}
                    </h3>
                    <span className="font-montserrat font-extrabold text-base sm:text-lg text-[#5B101D] shrink-0">
                      ₱{dish.price}
                    </span>
                  </div>

                  <p className="font-body text-xs text-[#5C5651] leading-relaxed line-clamp-2">
                    {dish.desc}
                  </p>

                  {/* 1:1 Macro Stats Row */}
                  <div className="grid grid-cols-3 gap-1 py-2.5 px-3 bg-[#FAF7F2] rounded-lg border border-[#EAE3D9] text-center">
                    <div>
                      <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-none">
                        {dish.macros.calories}
                      </strong>
                      <span className="font-body text-[9px] text-[#8A837C] uppercase">CAL</span>
                    </div>
                    <div className="border-x border-[#E5DFD5]">
                      <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-none">
                        {dish.macros.protein}g
                      </strong>
                      <span className="font-body text-[9px] text-[#8A837C] uppercase">PROTEIN</span>
                    </div>
                    <div>
                      <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-none">
                        {dish.macros.carbs}g
                      </strong>
                      <span className="font-body text-[9px] text-[#8A837C] uppercase">CARBS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add to Order Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => handleQuickAdd(dish)}
                  className="w-full py-3 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle hover:scale-[1.01]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>ADD TO ORDER</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-2 text-center sm:text-left">
          <p className="font-body text-[11px] text-[#8A837C] uppercase tracking-wider">
            🌱 MACROS ARE APPROXIMATE VALUES PER SERVING.
          </p>
        </div>

      </div>
    </section>
  );
};
