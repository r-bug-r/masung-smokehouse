import React, { useState, useEffect, useRef } from 'react';
import type { PageId } from '../../types';
import { useCart } from '../../context/CartContext';
import { bounceElement } from '../../lib/animations';
import { ShoppingBag, Menu as MenuIcon, X, ArrowUpRight } from 'lucide-react';

interface ReserveHeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const ReserveHeader: React.FC<ReserveHeaderProps> = ({ currentPage, onNavigate }) => {
  const { totalQuantity } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartBadgeRef = useRef<HTMLButtonElement>(null);
  const prevQuantityRef = useRef(totalQuantity);

  useEffect(() => {
    if (totalQuantity > prevQuantityRef.current && cartBadgeRef.current) {
      bounceElement(cartBadgeRef.current);
    }
    prevQuantityRef.current = totalQuantity;
  }, [totalQuantity]);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'reserve', label: 'Reserve Home' },
    { id: 'menu', label: 'Menu & Macros' },
    { id: 'order', label: 'Order Online' },
    { id: 'reservation', label: 'Reservations' },
    { id: 'feedback', label: 'Reviews & Poll' },
  ];

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0406]/95 backdrop-blur-md border-b border-[#3D0C15]/70 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo with Smokehouse as Subtext */}
        <button 
          onClick={() => handleNav('reserve')}
          className="text-left group cursor-pointer focus:outline-none"
          aria-label="Masung Smokehouse Reserve Home"
        >
          <span className="font-heading text-lg sm:text-xl font-extrabold tracking-[0.2em] uppercase text-[#FFF5F7] group-hover:text-[#D4AF37] transition-colors block leading-tight">
            MASUNG
          </span>
          <span className="block text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans font-bold -mt-0.5">
            SMOKEHOUSE <span className="text-[#A89895] text-[9px] font-normal tracking-wider">• Reserve Edition</span>
          </span>
        </button>

        {/* Desktop Hairline Navigation */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors cursor-pointer py-1 relative group ${
                  isActive ? 'text-[#D4AF37]' : 'text-[#D8C7C4] hover:text-[#FFF5F7]'
                }`}
              >
                {link.label}
                <span 
                  className={`absolute bottom-0 left-0 h-[1px] bg-[#D4AF37] transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} 
                />
              </button>
            );
          })}
        </nav>

        {/* Right Utility: Cart Trigger, Classic Switch, & Mobile Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Switch to Classic Smokehouse View Pill */}
          <button
            onClick={() => onNavigate('home')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase tracking-wider text-[#D8C7C4] hover:text-[#FFF5F7] border border-[#3D0C15] hover:border-[#8E1B2D] bg-[#1C0A0F]/60 transition-all cursor-pointer"
            title="Switch back to casual smokehouse menu"
          >
            <span>Casual View</span>
            <ArrowUpRight className="w-3 h-3 text-[#D4AF37]" />
          </button>

          {/* Order Tray Pill */}
          <button
            ref={cartBadgeRef}
            onClick={() => handleNav('order')}
            className="flex items-center gap-2 px-3.5 py-1.5 bg-[#1C0A0F] border border-[#3D0C15] hover:border-[#D4AF37] text-[#FFF5F7] transition-all cursor-pointer group"
            aria-label={`Order Tray with ${totalQuantity} items`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">
              Tray
            </span>
            <span className="text-[10px] font-mono font-bold text-black bg-[#D4AF37] px-1.5 py-0.5 rounded-none min-w-[18px] text-center">
              {totalQuantity}
            </span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#D8C7C4] hover:text-white border border-[#3D0C15] bg-[#1C0A0F]/60 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0406] border-b border-[#3D0C15] px-4 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-left text-xs uppercase tracking-[0.2em] py-2 border-b border-[#3D0C15]/50 flex items-center justify-between ${
                    isActive ? 'text-[#D4AF37] font-bold' : 'text-[#D8C7C4]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-xs uppercase tracking-wider text-[#D8C7C4] border border-[#3D0C15] bg-[#120609]"
            >
              Switch to Classic Smokehouse View
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
