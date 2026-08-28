import React, { useState, useMemo } from 'react';
import type { PageId, MenuCategory, MenuItem, MenuVariant } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Search, Plus, Check, Utensils, ArrowRight } from 'lucide-react';

interface MenuPageProps {
  onNavigate: (page: PageId) => void;
}

const CATEGORIES: { id: MenuCategory; label: string; count: number }[] = [
  { id: 'all', label: 'All Dishes', count: MENU_ITEMS.length },
  { id: 'smoked-meats', label: 'Texas Smoked Meats', count: MENU_ITEMS.filter(i => i.category === 'smoked-meats').length },
  { id: 'pinoy-classics', label: 'Smoked Pinoy Classics', count: MENU_ITEMS.filter(i => i.category === 'pinoy-classics').length },
  { id: 'rice-meals', label: 'Rice Meals (From ₱99)', count: MENU_ITEMS.filter(i => i.category === 'rice-meals').length },
  { id: 'sides-extras', label: 'Sides & Extras', count: MENU_ITEMS.filter(i => i.category === 'sides-extras').length },
  { id: 'drinks', label: 'Drinks & Beer', count: MENU_ITEMS.filter(i => i.category === 'drinks').length },
];

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate }) => {
  const { addItem, totalQuantity, finalTotal } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  
  // Selected variant map per item: { [itemId]: selectedVariant }
  const [selectedVariants, setSelectedVariants] = useState<{ [itemId: string]: MenuVariant }>({});
  const [addedItems, setAddedItems] = useState<{ [lineKey: string]: boolean }>({});

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
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

      // Tag filter
      if (filterTag === 'bestseller' && !item.popular) return false;
      if (filterTag === 'unlimited-rice' && !item.includesUnlimited) return false;
      if (filterTag === 'budget' && item.price > 150) return false;
      if (filterTag === 'spicy' && !item.spicyLevel) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, filterTag]);

  const handleSelectVariant = (itemId: string, variant: MenuVariant) => {
    setSelectedVariants(prev => ({ ...prev, [itemId]: variant }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const chosenVariant = selectedVariants[item.id] || (item.variants ? item.variants[0] : undefined);
    addItem(item, chosenVariant);

    const lineKey = `${item.id}-${chosenVariant?.label || 'default'}`;
    setAddedItems(prev => ({ ...prev, [lineKey]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [lineKey]: false }));
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] py-10 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3 py-1 inline-block mb-3">
            Rodriguez, Rizal
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#5B101D] uppercase tracking-tight">
            Our Menu
          </h1>
          <p className="text-sm sm:text-base text-[#5C5651] mt-2">
            Every rice meal includes free unlimited red rice and hot bone soup.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          
          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#5C5651] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search brisket, pork belly, sisig, rice meals..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#E5DFD5] text-sm text-[#181615] placeholder-[#8A837C] focus:outline-none focus:border-[#5B101D] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8A837C] hover:text-[#181615]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Tag Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {[
              { id: 'bestseller', label: 'Bestsellers' },
              { id: 'unlimited-rice', label: 'Unlimited Rice Meals' },
              { id: 'budget', label: 'Under ₱150' },
              { id: 'spicy', label: 'Sizzling & Spicy' },
            ].map(tag => (
              <button
                key={tag.id}
                onClick={() => setFilterTag(filterTag === tag.id ? null : tag.id)}
                className={`px-3 py-1 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                  filterTag === tag.id
                    ? 'bg-[#5B101D] text-white'
                    : 'bg-white text-[#5C5651] border border-[#E5DFD5] hover:border-[#5B101D]'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Category Tabs - Zero Emojis */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 py-2">
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-4 py-2 font-heading font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#5B101D] text-white'
                      : 'bg-white text-[#5C5651] border border-[#E5DFD5] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 font-sans font-bold ${
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
              Try adjusting your search query or reset the category filters.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setFilterTag(null); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 bg-[#5B101D] text-white text-xs font-heading font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => {
              const currentVariant = selectedVariants[item.id] || (item.variants ? item.variants[0] : undefined);
              const displayPrice = currentVariant ? currentVariant.price : item.price;
              const lineKey = `${item.id}-${currentVariant?.label || 'default'}`;
              const isAdded = addedItems[lineKey];

              return (
                <div
                  key={item.id}
                  className="bg-white border border-[#E5DFD5] shadow-subtle flex flex-col justify-between"
                >
                  <div>
                    {/* Item Image with Badges */}
                    <div className="relative h-52 overflow-hidden bg-stone-100">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {item.popular && (
                        <span className="absolute top-3 left-3 bg-[#5B101D] text-white text-[10px] font-heading font-extrabold px-2.5 py-1 uppercase tracking-wider">
                          Bestseller
                        </span>
                      )}

                      {item.includesUnlimited && (
                        <span className="absolute bottom-3 left-3 bg-[#181615] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                          Free Rice & Soup
                        </span>
                      )}
                    </div>

                    {/* Item Info */}
                    <div className="p-5">
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <h3 className="font-heading font-extrabold text-lg text-[#181615] uppercase tracking-tight leading-tight">
                          {item.name}
                        </h3>
                        <span className="font-heading font-extrabold text-base text-[#5B101D] shrink-0">
                          ₱{displayPrice}
                        </span>
                      </div>

                      <p className="text-xs text-[#5C5651] leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>

                      {/* Serving Variant Selector */}
                      {item.variants && item.variants.length > 0 && (
                        <div className="mb-4 pt-3 border-t border-[#E5DFD5]">
                          <label className="text-[11px] font-bold text-[#181615] uppercase tracking-wider block mb-1.5">
                            Portion:
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
                          : 'bg-[#5B101D] hover:bg-[#460B15] text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Order</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-[#C67D26]" />
                          <span>Add to Order • ₱{displayPrice}</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Sticky Floating Bottom Bar if Cart Has Items */}
        {totalQuantity > 0 && (
          <div className="fixed bottom-4 left-4 right-4 max-w-xl mx-auto z-40">
            <div className="bg-[#181615] text-white p-3.5 sm:p-4 border-2 border-[#5B101D] flex items-center justify-between gap-4 shadow-elevated">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#5B101D] text-white flex items-center justify-center font-heading font-extrabold text-sm">
                  {totalQuantity}
                </div>
                <div>
                  <span className="font-heading font-extrabold text-sm uppercase text-white block">
                    Your Order
                  </span>
                  <span className="text-xs text-[#E5DFD5]">
                    Total: <strong className="text-white text-sm">₱{finalTotal}</strong>
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('order')}
                className="px-5 py-2.5 bg-[#C67D26] hover:bg-[#A5641A] text-white font-heading font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <span>Review Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
