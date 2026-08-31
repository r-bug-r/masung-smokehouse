import React from 'react';
import type { PageId } from '../types';
import { useCart } from '../context/CartContext';
import { 
  Home, 
  Utensils, 
  ShoppingBag, 
  Star, 
  CalendarCheck,
  Flame
} from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentPage, onNavigate }) => {
  const { totalQuantity, finalTotal } = useCart();

  const navItems = [
    { id: 'home' as PageId, label: 'Home', icon: Home },
    { id: 'menu' as PageId, label: 'Menu', icon: Utensils },
    { 
      id: 'order' as PageId, 
      label: 'My Tray', 
      icon: ShoppingBag,
      badge: totalQuantity > 0 ? totalQuantity : null,
      highlight: totalQuantity > 0
    },
    { id: 'feedback' as PageId, label: 'Reviews', icon: Star },
    { id: 'reservation' as PageId, label: 'Reserve', icon: CalendarCheck }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#181615]/95 backdrop-blur-md border-t border-[#3A3530] text-white px-2 py-2 shadow-2xl safe-area-pb">
      <div className="grid grid-cols-5 gap-1 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 rounded-lg transition-all cursor-pointer ${
                isActive 
                  ? 'text-[#C67D26] font-extrabold' 
                  : 'text-[#8A837C] hover:text-[#F5EFEB]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#C67D26]' : ''}`} />
                
                {/* Badge if cart has items */}
                {item.badge !== null && item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#5B101D] text-white text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#C67D26] animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] font-montserrat font-bold uppercase tracking-wider mt-1 leading-none">
                {item.label}
              </span>

              {/* Active Dot Indicator */}
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#C67D26] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
