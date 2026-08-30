import React, { useState, useEffect, useRef } from 'react';
import type { PageId } from '../types';
import { useCart } from '../context/CartContext';
import { useLoyalty } from '../context/LoyaltyContext';
import { Award, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { bounceElement } from '../lib/animations';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { totalQuantity, finalTotal } = useCart();
  const { profile } = useLoyalty();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const trayBadgeRef = useRef<HTMLSpanElement>(null);
  const prevQuantityRef = useRef(totalQuantity);

  // Bounce tray badge on item addition using anime.js
  useEffect(() => {
    if (totalQuantity > prevQuantityRef.current && trayBadgeRef.current) {
      bounceElement(trayBadgeRef.current);
    }
    prevQuantityRef.current = totalQuantity;
  }, [totalQuantity]);

  const navLinks: { id: PageId; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'order', label: 'Order' },
    { id: 'reservation', label: 'Reservations' },
    { id: 'feedback', label: 'Reviews & Poll' },
    { id: 'loyalty', label: 'Rewards', icon: <Award className="w-3.5 h-3.5 text-[#C67D26]" /> },
  ];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#5B101D] text-white border-b border-[#460B15]">
      
      {/* Main Full-Width Header */}
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Left: Brand Identity with SMOKEHOUSE Subtext */}
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none shrink-0 group cursor-pointer"
          >
            <img
              src="/mascot.jpg"
              alt="Masung Mascot"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#C67D26] group-hover:opacity-90 transition-opacity shrink-0"
            />
            <div>
              <span className="block font-heading text-lg sm:text-xl font-extrabold uppercase tracking-tight text-white leading-none">
                MASUNG
              </span>
              <span className="block text-[10px] sm:text-[11px] uppercase font-extrabold tracking-[0.25em] text-[#C67D26] -mt-0.5">
                SMOKEHOUSE
              </span>
            </div>
          </button>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`text-xs font-heading font-extrabold uppercase tracking-wider py-1 transition-all flex items-center gap-1.5 relative cursor-pointer ${
                    isActive 
                      ? 'text-white' 
                      : 'text-[#E5DFD5] hover:text-white'
                  }`}
                >
                  {link.icon}
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#C67D26]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions (Theme Switcher, Points & Order) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Reserve Edition Subtext Pill */}
            <button
              onClick={() => handleNav('reserve')}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#C67D26]/70 hover:border-[#C67D26] bg-[#460B15] hover:bg-[#32070E] text-[10px] font-heading font-bold uppercase tracking-wider text-[#E5DFD5] hover:text-white transition-all cursor-pointer shadow-subtle"
              title="Explore Prime Cuts (Reserve Edition)"
            >
              <Sparkles className="w-3 h-3 text-[#C67D26]" />
              <span>Reserve Edition</span>
            </button>

            {/* Direct Points Display (Desktop) */}
            <button
              onClick={() => handleNav('loyalty')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#460B15] hover:bg-[#32070E] border border-[#781728] text-xs font-bold transition-colors cursor-pointer"
              title="View Pit Pass points & benefits"
            >
              <Award className="w-3.5 h-3.5 text-[#C67D26]" />
              <span className="text-white">{profile.points} pts</span>
            </button>

            {/* Direct Table Order Button */}
            <button
              onClick={() => handleNav('order')}
              className="relative px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#C67D26] hover:bg-[#A5641A] text-white text-xs font-heading font-extrabold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-subtle cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Order</span>
              {totalQuantity > 0 && (
                <span
                  ref={trayBadgeRef}
                  className="px-1.5 py-0.2 text-[10px] font-bold bg-[#181615] text-white inline-block"
                >
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#C67D26] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#460B15] border-t border-[#32070E] px-4 py-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-left text-xs font-heading font-extrabold uppercase tracking-wider py-2.5 px-3 transition-colors flex items-center justify-between ${
                  currentPage === link.id
                    ? 'bg-[#5B101D] text-[#C67D26]'
                    : 'text-white/90 hover:bg-[#32070E]'
                }`}
              >
                <span>{link.label}</span>
                {link.icon}
              </button>
            ))}

            <button
              onClick={() => handleNav('reserve')}
              className="text-left text-xs font-heading font-extrabold uppercase tracking-wider py-2.5 px-3 border border-[#C67D26]/60 bg-[#32070E] text-[#C67D26] hover:text-white flex items-center justify-between mt-2"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Reserve Edition Cuts
              </span>
              <span>→</span>
            </button>
          </nav>

          <div className="pt-3 border-t border-[#32070E] flex items-center justify-between">
            <button
              onClick={() => handleNav('loyalty')}
              className="text-xs font-bold text-[#E5DFD5] flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-[#C67D26]" />
              <span>Rewards: {profile.points} pts</span>
            </button>

            <button
              onClick={() => handleNav('order')}
              className="px-3.5 py-1.5 bg-[#C67D26] text-white font-heading font-extrabold text-[11px] uppercase tracking-wider"
            >
              Order: {totalQuantity} Items (₱{finalTotal})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
