import React, { useState, useMemo, useEffect } from 'react';
import type { PageId, MenuCategory, MenuItem, MenuVariant } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { initScrollAnimations, bounceElement } from '../lib/animations';
import { Search, Plus, Check, Utensils, ArrowRight, Sparkles, Activity, Info, X } from 'lucide-react';

interface MenuPageProps {
  onNavigate: (page: PageId) => void;
}

interface CategoryOption {
  id: MenuCategory;
  label: string;
  count: number;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate }) => {
  const { addItem, totalQuantity, finalTotal } = useCart();
  const { showToast } = useToast();
  
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMacroFilter, setActiveMacroFilter] = useState<'all' | 'high-protein' | 'low-cal' | 'sulit-99' | 'reserve'>('all');
  
  // Selected variant map per item: { [itemId]: selectedVariant }
  const [selectedVariants, setSelectedVariants] = useState<{ [itemId: string]: MenuVariant }>({});
  const [addedItems, setAddedItems] = useState<{ [lineKey: string]: boolean }>({});
  const [inspectingItem, setInspectingItem] = useState<MenuItem | null>(null);

  // Compute category counts dynamically
  const categories: CategoryOption[] = useMemo(() => [
    { id: 'all', label: 'All Dishes', count: MENU_ITEMS.length },
    { id: 'texas-smoked', label: 'Texas Smoked Meats', count: MENU_ITEMS.filter(i => i.category === 'texas-smoked' || i.category === 'smoked-meats').length },
    { id: 'sulit-bowls', label: '₱99 Sulit Bowls', count: MENU_ITEMS.filter(i => i.category === 'sulit-bowls' || i.price === 99).length },
    { id: 'pinoy-classics', label: 'Pinoy Classics', count: MENU_ITEMS.filter(i => i.category === 'pinoy-classics').length },
    { id: 'barkada-platters', label: 'Barkada Sharing', count: MENU_ITEMS.filter(i => i.category === 'barkada-platters').length },
    { id: 'sides-refills', label: 'Sides & Free Refills', count: MENU_ITEMS.filter(i => i.category === 'sides-refills' || i.category === 'sides-extras').length },
    { id: 'drinks-brews', label: 'Cold Drinks & Brews', count: MENU_ITEMS.filter(i => i.category === 'drinks-brews' || i.category === 'drinks').length },
  ], []);

  useEffect(() => {
    initScrollAnimations();
  }, [selectedCategory, activeMacroFilter]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter (support both modern & legacy category slugs)
      if (selectedCategory !== 'all') {
        const matchesMain = item.category === selectedCategory;
        const matchesSulit = selectedCategory === 'sulit-bowls' && (item.category === 'sulit-bowls' || item.price === 99);
        const matchesSmoked = selectedCategory === 'texas-smoked' && (item.category === 'texas-smoked' || item.category === 'smoked-meats');
        const matchesSides = selectedCategory === 'sides-refills' && (item.category === 'sides-refills' || item.category === 'sides-extras');
        const matchesDrinks = selectedCategory === 'drinks-brews' && (item.category === 'drinks-brews' || item.category === 'drinks');

        if (!matchesMain && !matchesSulit && !matchesSmoked && !matchesSides && !matchesDrinks) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTag = item.tag?.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesTag) {
          return false;
        }
      }

      // Macro & Attribute Filters
      if (activeMacroFilter === 'high-protein') {
        if (item.macros.protein < 30) return false;
      } else if (activeMacroFilter === 'low-cal') {
        if (item.macros.calories > 480) return false;
      } else if (activeMacroFilter === 'sulit-99') {
        if (item.price > 99) return false;
      } else if (activeMacroFilter === 'reserve') {
        if (!item.reserveEdition) return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, activeMacroFilter]);

  const handleSelectVariant = (itemId: string, variant: MenuVariant) => {
    setSelectedVariants(prev => ({ ...prev, [itemId]: variant }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const chosenVariant = selectedVariants[item.id] || (item.variants ? item.variants[0] : undefined);
    addItem(item, chosenVariant);

    const lineKey = `${item.id}-${chosenVariant?.label || 'default'}`;
    setAddedItems(prev => ({ ...prev, [lineKey]: true }));
    showToast('Added to Order', `${item.name} (${chosenVariant?.label || 'Regular'}) • ₱${chosenVariant ? chosenVariant.price : item.price}`, 'success');
    bounceElement('.sticky-order-bar');
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [lineKey]: false }));
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] py-10 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header: MASUNG with SMOKEHOUSE Subtext */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3.5 py-1 inline-block mb-3">
            Rodriguez, Rizal • U-Belt Campus Hub
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#5B101D] uppercase tracking-tight leading-none">
            MASUNG
          </h1>
          <div className="text-sm sm:text-base font-heading font-bold uppercase tracking-[0.25em] text-[#C67D26] mt-1">
            SMOKEHOUSE
          </div>
          <p className="text-xs sm:text-sm text-[#5C5651] mt-2 max-w-lg mx-auto">
            Authentic Texas-style hardwood smoking meets Filipino comfort food. All rice meals include unlimited heirloom red rice and hot beef bone broth.
          </p>
        </div>

        {/* Filters and Easy Lookup Section */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          
          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#5C5651] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Quick search brisket, pork belly, sisig, pares, ₱99 bowls..."
              className="w-full pl-11 pr-16 py-3 bg-white border border-[#E5DFD5] text-sm text-[#181615] placeholder-[#8A837C] focus:outline-none focus:border-[#5B101D] shadow-sm transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8A837C] hover:text-[#181615]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Dietary & Macro Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-[#8A837C] uppercase tracking-wider flex items-center gap-1 mr-1">
              <Activity className="w-3.5 h-3.5 text-[#C67D26]" />
              <span>Filter:</span>
            </span>

            {[
              { id: 'all' as const, label: 'All Items' },
              { id: 'high-protein' as const, label: 'High Protein (30g+)' },
              { id: 'low-cal' as const, label: 'Under 480 kcal' },
              { id: 'sulit-99' as const, label: '₱99 Student Sulit' },
              { id: 'reserve' as const, label: 'Reserve Edition Cuts' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setActiveMacroFilter(f.id)}
                className={`px-3 py-1 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                  activeMacroFilter === f.id
                    ? 'bg-[#5B101D] text-white shadow-sm'
                    : 'bg-white text-[#5C5651] border border-[#E5DFD5] hover:border-[#5B101D]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Category Navigation Tabs for Easy Lookup */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 py-2 border-b border-[#E5DFD5]/60 pb-3">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-3.5 py-2 font-heading font-extrabold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#5B101D] text-white shadow-subtle'
                      : 'bg-white text-[#5C5651] border border-[#E5DFD5] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 font-mono font-bold ${
                    isActive ? 'bg-[#C67D26] text-white' : 'bg-[#E5DFD5] text-[#5C5651]'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Dishes Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#E5DFD5] p-8 max-w-lg mx-auto shadow-subtle">
            <Utensils className="w-10 h-10 text-[#8A837C] mx-auto mb-3" />
            <h3 className="font-heading font-extrabold text-lg text-[#5B101D] uppercase">
              No Dishes Found
            </h3>
            <p className="text-xs text-[#5C5651] mt-1">
              Try adjusting your search terms or reset the macro filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveMacroFilter('all'); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 bg-[#5B101D] text-white text-xs font-heading font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-grid">
            {filteredItems.map(item => {
              const currentVariant = selectedVariants[item.id] || (item.variants ? item.variants[0] : undefined);
              const displayPrice = currentVariant ? currentVariant.price : item.price;
              const displayMacros = currentVariant?.macros || item.macros;
              const lineKey = `${item.id}-${currentVariant?.label || 'default'}`;
              const isAdded = addedItems[lineKey];

              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#E5DFD5] shadow-subtle flex flex-col justify-between hover:border-[#5B101D]/40 transition-colors"
                >
                  <div>
                    {/* Item Image with Badges */}
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover filter brightness-[0.96] hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                        {item.popular && (
                          <span className="bg-[#5B101D] text-white text-[10px] font-heading font-extrabold px-2.5 py-1 uppercase tracking-wider shadow-sm">
                            {item.tag || 'Bestseller'}
                          </span>
                        )}
                        
                        {item.reserveEdition && (
                          <span className="bg-[#181615] text-[#D4AF37] border border-[#D4AF37]/50 text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-widest shadow-sm flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Reserve Edition</span>
                          </span>
                        )}
                      </div>

                      {/* Bottom Free Refill Pill */}
                      {item.includesUnlimited && (
                        <span className="absolute bottom-3 left-3 bg-[#181615]/90 text-white text-[9px] font-bold px-2.5 py-1 uppercase tracking-wider backdrop-blur-sm">
                          Free Red Rice & Bone Broth
                        </span>
                      )}

                      {/* Quick Macro Inspector Trigger */}
                      <button
                        onClick={() => setInspectingItem(item)}
                        className="absolute bottom-3 right-3 p-1.5 bg-white/90 hover:bg-white text-[#181615] rounded-none shadow-sm text-[10px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                        title="View Full Nutritional Breakdown"
                      >
                        <Info className="w-3 h-3 text-[#5B101D]" />
                        <span>Macros</span>
                      </button>
                    </div>

                    {/* Item Information */}
                    <div className="p-5">
                      
                      {/* Title & Price Header */}
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <div>
                          <h3 className="font-heading font-extrabold text-lg text-[#181615] uppercase tracking-tight leading-tight">
                            {item.name}
                          </h3>
                          {item.reserveEdition && (
                            <span className="text-[10px] uppercase font-mono tracking-wider text-[#A5641A] font-semibold">
                              Reserve Edition Cut
                            </span>
                          )}
                        </div>
                        <span className="font-heading font-extrabold text-lg text-[#5B101D] shrink-0">
                          ₱{displayPrice}
                        </span>
                      </div>

                      <p className="text-xs text-[#5C5651] leading-relaxed line-clamp-2 mb-3">
                        {item.description}
                      </p>

                      {/* MACROS DISPLAY BAR */}
                      <div className="bg-[#FBF8F3] border border-[#E5DFD5] p-2.5 rounded-none mb-3.5 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold text-[#5B101D] flex items-center gap-1">
                            <span>🔥</span> {displayMacros.calories} kcal
                          </span>
                          <span className="text-[#8A837C]">•</span>
                          <span className="text-[#181615] font-semibold">
                            🥩 {displayMacros.protein}g Protein
                          </span>
                          <span className="text-[#8A837C]">•</span>
                          <span className="text-[#5C5651]">
                            🍞 {displayMacros.carbs}g Carbs
                          </span>
                          <span className="text-[#8A837C]">•</span>
                          <span className="text-[#5C5651]">
                            🧈 {displayMacros.fat}g Fat
                          </span>
                        </div>
                        {displayMacros.servingSize && (
                          <div className="text-[10px] text-[#8A837C] italic truncate">
                            Portion: {displayMacros.servingSize}
                          </div>
                        )}
                      </div>

                      {/* Serving Variant Selector */}
                      {item.variants && item.variants.length > 0 && (
                        <div className="mb-4 pt-3 border-t border-[#E5DFD5]">
                          <label className="text-[11px] font-bold text-[#181615] uppercase tracking-wider block mb-1.5">
                            Portion Size:
                          </label>
                          <div className="grid grid-cols-2 gap-1.5">
                            {item.variants.map((v, vIdx) => {
                              const isSelected = currentVariant?.label === v.label;
                              return (
                                <button
                                  key={vIdx}
                                  type="button"
                                  onClick={() => handleSelectVariant(item.id, v)}
                                  className={`px-2.5 py-1.5 text-left text-xs font-semibold border transition-colors cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#5B101D] text-white border-[#5B101D]'
                                      : 'bg-[#FBF8F3] text-[#5C5651] border-[#E5DFD5] hover:border-[#5B101D]'
                                  }`}
                                >
                                  <div className="truncate text-[11px]">{v.label}</div>
                                  <div className={`font-bold ${isSelected ? 'text-[#E5DFD5]' : 'text-[#5B101D]'}`}>
                                    ₱{v.price}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add to Tray Action Button */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`w-full py-3 font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        isAdded
                          ? 'bg-[#181615] text-white'
                          : 'bg-[#5B101D] hover:bg-[#460B15] text-white shadow-subtle'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-[#C67D26]" />
                          <span>Added to Tray</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Tray • ₱{displayPrice}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Nutritional Breakdown Modal */}
        {inspectingItem && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white border-2 border-[#5B101D] max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C67D26] font-mono font-bold block">
                    Nutritional Panel
                  </span>
                  <h3 className="font-heading font-extrabold text-xl uppercase text-[#181615]">
                    {inspectingItem.name}
                  </h3>
                </div>
                <button
                  onClick={() => setInspectingItem(null)}
                  className="p-1 hover:bg-[#F2ECE1] text-[#5C5651] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-[#5C5651] leading-relaxed">
                {inspectingItem.description}
              </div>

              {/* Nutrition Facts Table */}
              <div className="border border-[#E5DFD5] divide-y divide-[#E5DFD5] text-xs font-mono">
                <div className="p-2.5 bg-[#FBF8F3] font-bold flex justify-between">
                  <span>Serving Portion:</span>
                  <span className="text-[#181615]">{inspectingItem.macros.servingSize || 'Single Serving'}</span>
                </div>
                <div className="p-2.5 flex justify-between font-bold text-[#5B101D]">
                  <span>Calories:</span>
                  <span>{inspectingItem.macros.calories} kcal</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span>Protein:</span>
                  <span className="font-bold text-[#181615]">{inspectingItem.macros.protein}g</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span>Carbohydrates:</span>
                  <span>{inspectingItem.macros.carbs}g</span>
                </div>
                <div className="p-2.5 flex justify-between">
                  <span>Dietary Fat:</span>
                  <span>{inspectingItem.macros.fat}g</span>
                </div>
              </div>

              <div className="text-[11px] text-[#8A837C] leading-snug">
                * Nutritional values estimated based on offset pit-smoked meat trimming and standard heirloom red rice portions.
              </div>

              <button
                onClick={() => {
                  handleAddToCart(inspectingItem);
                  setInspectingItem(null);
                }}
                className="w-full py-2.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Add {inspectingItem.name} to Tray (₱{inspectingItem.price})
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Floating Bottom Order Bar */}
      {totalQuantity > 0 && (
        <div className="sticky-order-bar fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-[#181615] text-white p-3.5 border border-[#C67D26] shadow-2xl flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#C67D26] font-bold">
              {totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'} in Tray
            </div>
            <div className="font-heading font-extrabold text-lg text-white">
              ₱{finalTotal}
            </div>
          </div>

          <button
            onClick={() => onNavigate('pos')}
            className="px-5 py-2.5 bg-[#C67D26] hover:bg-[#A5641A] text-white text-xs font-heading font-extrabold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Proceed to POS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
