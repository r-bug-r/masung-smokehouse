import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { PageId, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { 
  Flame, 
  Utensils, 
  Dumbbell, 
  GlassWater, 
  Users, 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  Search,
  ArrowRight,
  X,
  Check
} from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

interface MenuPageProps {
  onNavigate: (page: PageId) => void;
}

type MenuCategoryType = 
  | 'best-sellers' 
  | 'main-meals' 
  | 'rice-meals' 
  | 'high-protein' 
  | 'drinks-addons' 
  | 'sharing-meals' 
  | 'new-limited';

interface CategoryConfig {
  id: MenuCategoryType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate }) => {
  const { addItem, totalQuantity, finalTotal } = useCart();
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<MenuCategoryType>('best-sellers');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAddons, setExpandedAddons] = useState<{ [key: string]: boolean }>({});
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories: CategoryConfig[] = [
    { 
      id: 'best-sellers', 
      label: 'Best Sellers', 
      icon: Flame, 
      description: 'Our most sought-after hardwood-smoked classics and house crowd favorites.' 
    },
    { 
      id: 'main-meals', 
      label: 'Main Meals', 
      icon: Utensils, 
      description: 'Signature pitmaster brisket, pork belly, ribs, and Filipino comfort dishes.' 
    },
    { 
      id: 'rice-meals', 
      label: 'Rice Meals', 
      icon: Utensils, 
      description: 'Everyday sulit bowls and hearty combinations paired with steamed heirloom red rice.' 
    },
    { 
      id: 'high-protein', 
      label: 'High-Protein', 
      icon: Dumbbell, 
      description: 'Macro-conscious, low-and-slow carvings packing 30g+ of pure protein per serving.' 
    },
    { 
      id: 'drinks-addons', 
      label: 'Drinks & Add-ons', 
      icon: GlassWater, 
      description: 'Cold refreshments, craft fruitwood iced teas, and extra pitmaster sauces & sides.' 
    },
    { 
      id: 'sharing-meals', 
      label: 'Sharing / Group Meals', 
      icon: Users, 
      description: 'Platters built for barkadas, family gatherings, and weekend celebrations.' 
    },
    { 
      id: 'new-limited', 
      label: 'New / Limited Items', 
      icon: Sparkles, 
      description: 'Reserve editions, specialty small-batch carvings, and limited pitmaster cuts.' 
    },
  ];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update active category on scroll based on section positions
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const cat of categories) {
        const el = document.getElementById(`section-${cat.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [categories]);

  const toggleAddons = (id: string) => {
    setExpandedAddons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Helper to filter dishes belonging to a given category
  const getDishesForCategory = (catId: MenuCategoryType): MenuItem[] => {
    return MENU_ITEMS.filter(item => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchName && !matchDesc) return false;
      }

      // Category matching logic
      if (catId === 'best-sellers') {
        return Boolean(item.popular || item.id === 'smoked-beef-brisket' || item.id === 'smoked-pulled-pork-rice' || item.id === 'smoked-pork-belly');
      }
      if (catId === 'main-meals') {
        return item.category === 'texas-smoked' || item.category === 'smoked-meats' || item.category === 'pinoy-classics';
      }
      if (catId === 'rice-meals') {
        return item.category === 'sulit-bowls' || item.id === 'solo-pitmaster-combo' || item.id === 'smoked-beef-pares';
      }
      if (catId === 'high-protein') {
        return item.macros.protein >= 30;
      }
      if (catId === 'drinks-addons') {
        return item.category === 'drinks-brews' || item.category === 'sides-refills' || item.category === 'drinks' || item.category === 'sides-extras';
      }
      if (catId === 'sharing-meals') {
        return item.category === 'barkada-platters' || item.price >= 250;
      }
      if (catId === 'new-limited') {
        return Boolean(item.reserveEdition || item.id === 'smoked-pulled-pork-rice');
      }
      return true;
    });
  };

  // Pre-calculate dishes for all sections
  const sectionDishes = useMemo(() => {
    const map = new Map<MenuCategoryType, MenuItem[]>();
    for (const cat of categories) {
      map.set(cat.id, getDishesForCategory(cat.id));
    }
    return map;
  }, [searchQuery]);

  // Check total visible dishes across all sections
  const totalVisibleDishes = useMemo(() => {
    let count = 0;
    sectionDishes.forEach(list => {
      count += list.length;
    });
    return count;
  }, [sectionDishes]);

  const scrollToSection = (catId: MenuCategoryType) => {
    setActiveCategory(catId);
    setIsDropdownOpen(false);

    const el = document.getElementById(`section-${catId}`);
    if (el) {
      const yOffset = -110; // offset for sticky navigation header
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (dish: MenuItem) => {
    addItem(dish);
    showToast('Added to Order', `${dish.name} added to your tray`, 'success');
  };

  const activeCategoryObj = categories.find(c => c.id === activeCategory) || categories[0];
  const ActiveIcon = activeCategoryObj.icon;

  return (
    <div className="min-h-screen bg-[#F5EFEB] py-8 sm:py-12 lg:py-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
        
        {/* Header Title Section */}
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
            OUR MENU
          </span>
          <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#1E1E1E]">
            AUTHENTIC PITMASTER SMOKEHOUSE
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#5C5651] max-w-2xl">
            Hardwood-smoked over Philippine oak for 8 to 16 hours. Scroll through our full smokehouse menu below or use the section dropdown to jump directly to any category.
          </p>
        </div>

        {/* Sticky Filter & Category Dropdown Navigation Bar */}
        <div className="sticky top-16 md:top-20 z-30 bg-[#F5EFEB]/95 backdrop-blur-md py-3 border-y border-[#E5DFD5] -mx-4 px-4 sm:mx-0 sm:px-0 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* Category Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="w-full sm:w-auto inline-flex items-center justify-between gap-3 px-4 py-2.5 bg-white border-2 border-[#5B101D] text-[#1E1E1E] hover:border-[#3D0C15] rounded-lg font-montserrat font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#8A837C]">
                    SECTION:
                  </span>
                  <div className="flex items-center gap-1.5 text-[#5B101D]">
                    <ActiveIcon className="w-4 h-4 text-[#C67D26]" />
                    <span className="font-extrabold">{activeCategoryObj.label}</span>
                  </div>
                </div>

                <ChevronDown 
                  className={`w-4 h-4 text-[#5B101D] transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Dropdown Menu Options */}
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-full sm:w-80 bg-white rounded-xl border border-[#E5DFD5] shadow-xl p-2 space-y-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-montserrat font-extrabold uppercase tracking-wider text-[#8A837C] border-b border-[#EAE3D9] mb-1">
                    JUMP TO SECTION
                  </div>

                  {categories.map(cat => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    const dishCount = sectionDishes.get(cat.id)?.length ?? 0;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => scrollToSection(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-montserrat font-bold uppercase tracking-wider text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#5B101D] text-white shadow-sm'
                            : 'text-[#1E1E1E] hover:bg-[#FAF7F2] hover:text-[#5B101D]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C67D26]' : 'text-[#8A837C]'}`} />
                          <span>{cat.label}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-normal px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-[#FAF7F2] text-[#8A837C]'
                          }`}>
                            {dishCount}
                          </span>
                          {isActive && <Check className="w-3.5 h-3.5 text-[#C67D26]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-[#8A837C] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search dishes or ingredients..."
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#E5DFD5] rounded-md text-xs font-body text-[#1E1E1E] placeholder-[#8A837C] focus:outline-none focus:border-[#5B101D] shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A837C] hover:text-[#1E1E1E]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Global Empty State When Search Yields Nothing */}
        {totalVisibleDishes === 0 && (
          <div className="bg-white rounded-2xl border border-[#E5DFD5] p-12 text-center space-y-4 shadow-subtle max-w-md mx-auto">
            <Utensils className="w-10 h-10 text-[#8A837C] mx-auto" />
            <h2 className="font-bebas text-2xl uppercase text-[#1E1E1E]">
              No Dishes Found
            </h2>
            <p className="font-body text-xs text-[#5C5651]">
              No items match &quot;{searchQuery}&quot;. Try searching for another cut, side, or dish.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-[#5B101D] text-white text-xs font-montserrat font-bold uppercase tracking-wider rounded-md cursor-pointer hover:bg-[#460B15]"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Single Scrollable Menu: Category Sections */}
        <div className="space-y-16">
          {categories.map(cat => {
            const dishes = sectionDishes.get(cat.id) || [];
            if (dishes.length === 0) return null;

            const Icon = cat.icon;

            return (
              <section 
                key={cat.id} 
                id={`section-${cat.id}`}
                className="space-y-6 scroll-mt-36"
              >
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b-2 border-[#5B101D]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[#5B101D]">
                      <Icon className="w-5 h-5 text-[#C67D26]" />
                      <h2 className="font-bebas text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#1E1E1E]">
                        {cat.label}
                      </h2>
                    </div>
                    <p className="font-body text-xs text-[#5C5651]">
                      {cat.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-[11px] font-montserrat font-bold uppercase tracking-wider text-[#8A837C] bg-white px-3 py-1 rounded-full border border-[#E5DFD5]">
                      {dishes.length} {dishes.length === 1 ? 'Dish' : 'Dishes'}
                    </span>
                  </div>
                </div>

                {/* Dishes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {dishes.map(dish => {
                    const isExpanded = expandedAddons[dish.id];
                    const isFav = favorites[dish.id];

                    return (
                      <div
                        key={`${cat.id}-${dish.id}`}
                        className="bg-white rounded-xl border border-[#E5DFD5] shadow-subtle flex flex-col justify-between overflow-hidden group hover:shadow-elevated transition-all"
                      >
                        <div>
                          {/* Food Image with Floating Badge & Heart Icon */}
                          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306]">
                            <SafeImage
                              src={dish.imageUrl}
                              alt={dish.name}
                              category={dish.category}
                              fallbackSrc="/masung_brisket_food_asset_hd.png"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            {/* Badge */}
                            <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#5B101D] text-white text-[9px] font-montserrat font-extrabold uppercase tracking-wider rounded-sm shadow-md z-20">
                              {dish.tag || 'PITMASTER CHOICE'}
                            </span>

                            {/* Heart Favorite Button */}
                            <button
                              onClick={e => toggleFavorite(dish.id, e)}
                              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1E1E1E] hover:text-[#5B101D] transition-colors shadow-sm cursor-pointer z-20"
                              aria-label="Save to favorites"
                            >
                              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-[#5B101D] text-[#5B101D]' : ''}`} />
                            </button>
                          </div>

                          {/* Card Content */}
                          <div className="p-5 space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-montserrat font-extrabold text-sm uppercase text-[#1E1E1E] leading-snug">
                                {dish.name}
                              </h3>
                              <span className="font-montserrat font-extrabold text-base text-[#5B101D] shrink-0">
                                ₱{dish.price}
                              </span>
                            </div>

                            <p className="font-body text-xs text-[#5C5651] leading-relaxed line-clamp-2">
                              {dish.description}
                            </p>

                            {/* Macro Stats Row */}
                            <div className="grid grid-cols-3 gap-1 py-2 px-2.5 bg-[#FAF7F2] rounded-lg border border-[#EAE3D9] text-center">
                              <div>
                                <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-none">
                                  {dish.macros.calories}
                                </strong>
                                <span className="font-body text-[8px] text-[#8A837C] uppercase">CAL</span>
                              </div>
                              <div className="border-x border-[#E5DFD5]">
                                <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-none">
                                  {dish.macros.protein}g
                                </strong>
                                <span className="font-body text-[8px] text-[#8A837C] uppercase">PROTEIN</span>
                              </div>
                              <div>
                                <strong className="font-montserrat font-extrabold text-xs text-[#1E1E1E] block leading-none">
                                  {dish.macros.carbs}g
                                </strong>
                                <span className="font-body text-[8px] text-[#8A837C] uppercase">CARBS</span>
                              </div>
                            </div>

                            {/* Add-ons Expander */}
                            <div className="pt-1">
                              <button
                                onClick={() => toggleAddons(`${cat.id}-${dish.id}`)}
                                className="w-full flex items-center justify-between text-[11px] font-montserrat font-bold uppercase text-[#5C5651] hover:text-[#5B101D] py-1 border-t border-[#EAE3D9] transition-colors cursor-pointer"
                              >
                                <span>ADD-ONS & SIDES</span>
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>

                              {isExpanded && (
                                <div className="pt-2 space-y-1.5 text-xs text-[#5C5651] bg-[#FAF7F2] p-2.5 rounded border border-[#EAE3D9] mt-1 animate-in fade-in duration-200">
                                  <div className="flex justify-between items-center text-[11px]">
                                    <span>Extra BBQ Sauce Dip</span>
                                    <strong className="text-[#5B101D]">+₱20</strong>
                                  </div>
                                  <div className="flex justify-between items-center text-[11px]">
                                    <span>House Spiced Vinegar</span>
                                    <strong className="text-[#5B101D]">+₱15</strong>
                                  </div>
                                  <div className="flex justify-between items-center text-[11px]">
                                    <span>Pickled Coleslaw Cup</span>
                                    <strong className="text-[#5B101D]">+₱35</strong>
                                  </div>
                                </div>
                              )}
                            </div>

                          </div>
                        </div>

                        {/* Add to Order Button */}
                        <div className="p-5 pt-0">
                          <button
                            onClick={() => handleAddToCart(dish)}
                            className="w-full py-3 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle hover:scale-[1.01]"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>ADD TO ORDER</span>
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Full-Width Bottom Banner Strip */}
        <div className="bg-[#5B101D] text-white py-5 px-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C67D26] text-[#1E1E1E] flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <strong className="font-montserrat font-extrabold text-xs sm:text-sm uppercase tracking-wider block">
                LOW & SLOW. REAL WOOD. REAL FLAVOR.
              </strong>
              <span className="font-body text-xs text-[#E5DFD5]">
                8 to 16 hours of pitmaster patience in every cut.
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('order')}
            className="px-6 py-2.5 bg-[#C67D26] hover:bg-[#A5641A] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-xs cursor-pointer"
          >
            Review Tray ({totalQuantity})
          </button>
        </div>

        {/* Mobile Floating Order Tray Bar */}
        {totalQuantity > 0 && (
          <div className="md:hidden fixed bottom-16 left-3 right-3 z-30 bg-[#5B101D] text-white p-3 rounded-xl shadow-2xl border border-[#C67D26] flex items-center justify-between animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C67D26] text-white flex items-center justify-center font-montserrat font-extrabold text-xs">
                {totalQuantity}
              </div>
              <div>
                <span className="font-montserrat font-bold text-[11px] block leading-tight text-[#E5DFD5]">
                  {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'} in Tray
                </span>
                <span className="font-bebas text-lg leading-none text-white">
                  ₱{finalTotal}
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('order')}
              className="px-4 py-2 bg-[#C67D26] hover:bg-[#A5641A] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>View Tray</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
