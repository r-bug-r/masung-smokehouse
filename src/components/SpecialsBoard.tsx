import React, { useState } from 'react';
import type { PageId } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Plus, Check, ArrowRight } from 'lucide-react';
import { SafeImage } from './SafeImage';

interface SpecialsBoardProps {
  onNavigate: (page: PageId) => void;
}

export const SpecialsBoard: React.FC<SpecialsBoardProps> = ({ onNavigate }) => {
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const specials = [
    {
      item: MENU_ITEMS.find(i => i.id === 'smoked-pulled-pork-rice') || MENU_ITEMS[0],
      serving1: 'Solo Meal (with Unlimited Red Rice) • ₱99',
      serving2: 'Special Oakwood Glaze',
      tag: 'Sulit ₱99 Meal'
    },
    {
      item: MENU_ITEMS.find(i => i.id === 'smoked-beef-brisket') || MENU_ITEMS[0],
      serving1: 'Small Serving (60g) • ₱139',
      serving2: 'Budget Serving (120g) • ₱239',
      tag: 'Bestseller'
    },
    {
      item: MENU_ITEMS.find(i => i.id === 'smoked-beef-kare-kare') || MENU_ITEMS[0],
      serving1: 'Solo Meal (with Red Rice) • ₱179',
      serving2: 'Sharing Bowl • ₱269',
      tag: 'House Fusion'
    },
    {
      item: MENU_ITEMS.find(i => i.id === 'sizzling-smoked-beef-sisig') || MENU_ITEMS[0],
      serving1: 'Cast Iron Plate with Egg • ₱139',
      serving2: 'Extra Calamansi & Chili',
      tag: 'Pulutan Favorite'
    }
  ];

  const handleQuickAdd = (item: typeof MENU_ITEMS[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
      macros: item.macros
    });

    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FBF8F3] border-b border-[#E5DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold font-heading text-[#C67D26] uppercase tracking-widest block mb-2">
            DAILY SPECIALS & COMBOS
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#5B101D]">
            Popular <span className="text-[#181615]">Dishes</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5C5651] mt-2">
            Served with unlimited heirloom red rice and hot bone soup.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Food Photo Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3">
            <div className="space-y-3">
              <div className="border border-[#E5DFD5] bg-white group shadow-subtle overflow-hidden">
                <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306]">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=600&auto=format&fit=crop&q=80"
                    alt="Texas Beef Brisket"
                    fallbackSrc="/masung_brisket_food_asset_hd.png"
                    category="texas-smoked"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 bg-white">
                  <span className="text-xs font-bold font-heading text-[#5B101D] uppercase block">
                    Texas Beef Brisket
                  </span>
                  <span className="text-[11px] text-[#5C5651]">16h Oakwood Bark</span>
                </div>
              </div>

              <div className="border border-[#E5DFD5] bg-white group shadow-subtle overflow-hidden">
                <div className="w-full h-36 overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306]">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80"
                    alt="Smoked Pork Belly"
                    fallbackSrc="/masung_brisket_food_asset_hd.png"
                    category="sulit-bowls"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 bg-white">
                  <span className="text-xs font-bold font-heading text-[#5B101D] uppercase block">
                    Smoked Pulled Pork
                  </span>
                  <span className="text-[11px] text-[#5C5651]">Only ₱99 with Red Rice</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <div className="border border-[#E5DFD5] bg-white group shadow-subtle overflow-hidden">
                <div className="w-full h-36 overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306]">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80"
                    alt="Smoked Kare-Kare"
                    fallbackSrc="/masung_brisket_food_asset_hd.png"
                    category="pinoy-classics"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 bg-white">
                  <span className="text-xs font-bold font-heading text-[#5B101D] uppercase block">
                    Smoked Kare-Kare
                  </span>
                  <span className="text-[11px] text-[#5C5651]">Roasted Peanut Sauce</span>
                </div>
              </div>

              <div className="border border-[#E5DFD5] bg-white group shadow-subtle overflow-hidden">
                <div className="w-full h-48 overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306]">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80"
                    alt="Smoked Beef Sisig"
                    fallbackSrc="/masung_brisket_food_asset_hd.png"
                    category="pinoy-classics"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 bg-white">
                  <span className="text-xs font-bold font-heading text-[#5B101D] uppercase block">
                    Sizzling Beef Sisig
                  </span>
                  <span className="text-[11px] text-[#5C5651]">Cast Iron Skillet</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Specials Price Board */}
          <div className="lg:col-span-6 space-y-3.5">
            {specials.map((spec, idx) => {
              const isAdded = addedIds[spec.item.id];
              return (
                <div
                  key={idx}
                  className="bg-white p-5 border border-[#E5DFD5] shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#F2ECE1] text-[#5B101D]">
                      {spec.tag}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-[#181615] uppercase tracking-tight">
                      {spec.item.name}
                    </h3>
                    <div className="text-xs text-[#5C5651] space-y-0.5">
                      <p className="font-semibold text-[#181615]">{spec.serving1}</p>
                      <p>{spec.serving2}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleQuickAdd(spec.item)}
                    className={`shrink-0 px-4 py-2.5 font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer ${
                      isAdded
                        ? 'bg-[#181615] text-white'
                        : 'bg-[#5B101D] hover:bg-[#460B15] text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}

            {/* Check Out Full Menu Button */}
            <div className="pt-2">
              <button
                onClick={() => onNavigate('menu')}
                className="w-full py-3.5 bg-white hover:bg-[#FBF8F3] border border-[#5B101D] text-[#5B101D] font-heading font-extrabold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
