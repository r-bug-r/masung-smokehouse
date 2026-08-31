import React, { useState, useMemo } from 'react';
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
  Plus, 
  ChevronLeft, 
  ChevronRight,
  Search,
  ArrowRight
} from 'lucide-react';


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

export const MenuPage: React.FC<MenuPageProps> = ({ onNavigate }) => {
  const { addItem, totalQuantity, finalTotal } = useCart();
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<MenuCategoryType>('best-sellers');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedAddons, setExpandedAddons] = useState<{ [key: string]: boolean }>({});
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const categories = [
    { id: 'best-sellers', label: 'Best Sellers', icon: Flame },
    { id: 'main-meals', label: 'Main Meals', icon: Utensils },
    { id: 'rice-meals', label: 'Rice Meals', icon: Utensils },
    { id: 'high-protein', label: 'High-Protein', icon: Dumbbell },
    { id: 'drinks-addons', label: 'Drinks & Add-ons', icon: GlassWater },
    { id: 'sharing-meals', label: 'Sharing / Group Meals', icon: Users },
    { id: 'new-limited', label: 'New / Limited Items', icon: Sparkles },
  ];

  const toggleAddons = (id: string) => {
    setExpandedAddons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter items based on active category and search query
  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        if (!matchName && !matchDesc) return false;
      }

      // Category matching
      if (activeCategory === 'best-sellers') {
        return item.popular || item.id === 'smoked-beef-brisket' || item.id === 'smoked-pulled-pork-rice' || item.id === 'smoked-pork-belly';
      }
      if (activeCategory === 'main-meals') {
        return item.category === 'texas-smoked' || item.category === 'smoked-meats';
      }
      if (activeCategory === 'rice-meals') {
        return item.category === 'sulit-bowls' || item.price <= 139 || item.name.includes('Rice');
      }
      if (activeCategory === 'high-protein') {
        return item.macros.protein >= 35;
      }
      if (activeCategory === 'drinks-addons') {
        return item.category === 'drinks-brews' || item.category === 'sides-refills' || item.category === 'drinks' || item.category === 'sides-extras';
      }
      if (activeCategory === 'sharing-meals') {
        return item.category === 'barkada-platters' || item.price >= 250;
      }
      if (activeCategory === 'new-limited') {
        return item.id === 'smoked-pulled-pork-rice' || item.reserveEdition;
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (dish: MenuItem) => {
    addItem(dish);
    showToast('Added to Order', `${dish.name} added to your tray`, 'success');
  };

  const activeCategoryObj = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <div className="min-h-screen bg-[#F5EFEB] py-8 sm:py-12 lg:py-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
        
        {/* Search & Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
              OUR MENU
            </span>
            <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#1E1E1E]">
              AUTHENTIC PITMASTER SMOKEHOUSE
            </h1>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#8A837C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E5DFD5] rounded-md text-xs font-body text-[#1E1E1E] placeholder-[#8A837C] focus:outline-none focus:border-[#5B101D] shadow-xs"
            />
          </div>
        </div>

        {/* Mobile Horizontal Category Pills (lg:hidden) */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as MenuCategoryType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-montserrat font-bold uppercase tracking-wider whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#5B101D] text-white shadow-md' 
                    : 'bg-white text-[#5C5651] border border-[#E5DFD5] hover:border-[#5B101D]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C67D26]' : 'text-[#8A837C]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Layout: Left Category Sidebar + Right Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Category Sidebar (1:1 Match to Mockup) */}
          <div className="lg:col-span-3 space-y-6">
            
            <div className="bg-white rounded-xl border border-[#E5DFD5] p-3 shadow-subtle space-y-1">
              <div className="px-3 py-2 text-xs font-montserrat font-extrabold uppercase tracking-wider text-[#8A837C] border-b border-[#EAE3D9] mb-1">
                BROWSE MENU
              </div>

              {categories.map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as MenuCategoryType)}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-montserrat font-bold uppercase tracking-wider text-left transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#5B101D] text-white shadow-sm' 
                        : 'text-[#1E1E1E] hover:bg-[#FAF7F2] hover:text-[#5B101D]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C67D26]' : 'text-[#8A837C]'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Promo Card: Unlimited Red Rice */}
            <div className="bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] p-5 space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#5B101D]" />
                <span className="font-montserrat font-extrabold text-xs text-[#5B101D] uppercase tracking-wider">
                  UNLIMITED RED RICE
                </span>
              </div>
              <p className="font-body text-xs text-[#5C5651] leading-relaxed">
                Free heirloom red rice and hot bone soup refills with every smoked meal.
              </p>
            </div>

          </div>

          {/* Right Column: Category Title + Dishes Grid */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Active Category Header Banner */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD5]">
              <div>
                <h2 className="font-bebas text-3xl sm:text-4xl font-bold uppercase text-[#1E1E1E] leading-none">
                  {activeCategoryObj.label}
                </h2>
                <p className="font-body text-xs text-[#5C5651] mt-1">
                  Showing {filteredDishes.length} dishes
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-montserrat font-bold uppercase text-[#8A837C]">
                  ALL MEALS INCLUDE UNLI RED RICE
                </span>
              </div>
            </div>

            {/* Dishes Grid */}
            {filteredDishes.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E5DFD5] p-12 text-center space-y-3">
                <p className="font-body text-sm text-[#5C5651]">
                  No dishes found in this category.
                </p>
                <button
                  onClick={() => { setActiveCategory('best-sellers'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-[#5B101D] text-white text-xs font-montserrat font-bold uppercase tracking-wider rounded-sm"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDishes.map(dish => {
                  const isExpanded = expandedAddons[dish.id];
                  const isFav = favorites[dish.id];

                  return (
                    <div
                      key={dish.id}
                      className="bg-white rounded-xl border border-[#E5DFD5] shadow-subtle flex flex-col justify-between overflow-hidden group hover:shadow-elevated transition-all"
                    >
                      <div>
                        {/* Food Image with Floating Badge & Heart Icon */}
                        <div className="relative h-48 overflow-hidden bg-[#181615]">
                          <img
                            src={dish.imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'}
                            alt={dish.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          
                          {/* Badge */}
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#5B101D] text-white text-[9px] font-montserrat font-extrabold uppercase tracking-wider rounded-sm shadow-md">
                            {dish.tag || 'BESTSELLER'}
                          </span>

                          {/* Heart Button */}
                          <button
                            onClick={e => toggleFavorite(dish.id, e)}
                            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1E1E1E] hover:text-[#5B101D] transition-colors shadow-sm cursor-pointer"
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
                              onClick={() => toggleAddons(dish.id)}
                              className="w-full flex items-center justify-between text-[11px] font-montserrat font-bold uppercase text-[#5C5651] hover:text-[#5B101D] py-1 border-t border-[#EAE3D9] transition-colors"
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
            )}

          </div>

        </div>

        {/* 1:1 Full-Width Bottom Banner Strip */}
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
            className="px-6 py-2.5 bg-[#C67D26] hover:bg-[#A5641A] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-xs"
          >
            Review Tray ({totalQuantity})
          </button>
        </div>

        {/* Mobile Floating Order Tray Bar (Fixed above bottom nav) */}
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

