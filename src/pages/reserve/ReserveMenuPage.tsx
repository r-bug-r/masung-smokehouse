import React, { useState, useEffect } from 'react';
import type { PageId, MenuItem, MenuVariant } from '../../types';
import { MENU_ITEMS } from '../../data/menuData';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { initScrollAnimations } from '../../lib/animations';
import { Search, Plus, Check } from 'lucide-react';

interface ReserveMenuPageProps {
  onNavigate?: (page: PageId) => void;
}

export const ReserveMenuPage: React.FC<ReserveMenuPageProps> = () => {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, MenuVariant>>({});
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    initScrollAnimations();
  }, [activeCategory, searchQuery]);

  const categories = [
    { id: 'all', label: 'Complete Collection' },
    { id: 'smoked-meats', label: 'Prime Smoked Meats' },
    { id: 'pinoy-classics', label: 'Heritage Classics' },
    { id: 'rice-meals', label: 'Rice Meals' },
    { id: 'sides-extras', label: 'Wood-Fired Sides' },
    { id: 'drinks', label: 'Cellar & Drinks' },
  ];

  const handleVariantSelect = (itemId: string, variant: MenuVariant) => {
    setSelectedVariants((prev) => ({ ...prev, [itemId]: variant }));
  };

  const handleAddDish = (item: MenuItem) => {
    const variant = selectedVariants[item.id];
    const price = variant ? variant.price : item.price;
    const label = variant ? `${item.name} (${variant.label})` : item.name;

    addItem(item, variant);
    setJustAddedId(item.id);
    showToast('Added to Board', `${label} • ₱${price}`, 'success');

    setTimeout(() => {
      setJustAddedId(null);
    }, 2000);
  };

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0A0406] text-[#F3ECE6] py-12 sm:py-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        
        {/* Editorial Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4AF37] block">
            A La Carte & Carving Board
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#FFF5F7] tracking-tight">
            Reserve Dining Menu
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7C4] font-light leading-relaxed">
            Every dish is cooked over Philippine mountain oak and hardwood logs for 8 to 16 hours. Complimentary unlimited heirloom red rice and piping-hot bone broth refills are included with all carving meals.
          </p>
        </div>

        {/* Category Hairline Navigation & Search Bar */}
        <div className="border-y border-[#3D0C15] py-4 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-xs uppercase tracking-[0.18em] px-4 py-2 whitespace-nowrap transition-all cursor-pointer border ${
                      isActive
                        ? 'border-[#D4AF37] bg-[#1C0A0F] text-[#FFF5F7] shadow-[0_0_12px_rgba(142,27,45,0.3)]'
                        : 'border-[#3D0C15]/70 hover:border-[#8E1B2D] text-[#D8C7C4] bg-[#120609]/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search cuts & sides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#120609] border border-[#3D0C15] text-[#FFF5F7] pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] placeholder-[#A89895]"
              />
            </div>

          </div>

        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-grid">
          {filteredItems.map((item) => {
            const currentVariant = selectedVariants[item.id];
            const currentPrice = currentVariant ? currentVariant.price : item.price;
            const isAdded = justAddedId === item.id;

            return (
              <div
                key={item.id}
                className="bg-[#120609] border border-[#3D0C15] flex flex-col justify-between hover:border-[#8E1B2D] transition-all duration-300 group shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
              >
                <div>
                  
                  {/* Food Image with High-Contrast Overlay */}
                  <div className="relative h-56 overflow-hidden bg-[#0A0406]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.9]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120609] via-transparent to-transparent" />
                    
                    {/* Bestseller Badge */}
                    {item.popular && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#8E1B2D] text-white font-mono text-[9px] uppercase tracking-widest font-semibold border border-[#D4AF37]/40">
                        Bestseller
                      </span>
                    )}

                    {/* Free Rice & Soup Badge */}
                    {item.includesUnlimited && item.includesUnlimited.length > 0 && (
                      <span className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-[#0A0406]/90 border border-[#3D0C15] text-[#D4AF37] text-[9px] uppercase tracking-wider font-mono">
                        Free Red Rice & Soup
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-baseline gap-2 border-b border-[#3D0C15] pb-3">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#FFF5F7] group-hover:text-[#D4AF37] transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-serif text-xl text-[#D4AF37] font-bold shrink-0">
                        ₱{currentPrice}
                      </span>
                    </div>

                    <p className="text-xs text-[#D8C7C4] font-light leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Variant Portion Selector */}
                    {item.variants && item.variants.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-[#A89895] block">
                          Portion Size:
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {item.variants.map((v) => {
                            const isSelected = currentVariant
                              ? currentVariant.label === v.label
                              : item.variants?.[0].label === v.label;
                            return (
                              <button
                                key={v.label}
                                onClick={() => handleVariantSelect(item.id, v)}
                                className={`text-left px-2.5 py-1.5 border text-[11px] transition-all cursor-pointer ${
                                  isSelected
                                    ? 'border-[#D4AF37] bg-[#1C0A0F] text-[#FFF5F7]'
                                    : 'border-[#3D0C15] bg-[#0A0406] text-[#A89895] hover:border-[#8E1B2D]'
                                }`}
                              >
                                <span className="block truncate font-medium">{v.label}</span>
                                <span className="block text-[10px] font-mono text-[#D4AF37]">₱{v.price}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Bottom Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleAddDish(item)}
                    className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-[#D4AF37]/20"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Board</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Board • ₱{currentPrice}</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
