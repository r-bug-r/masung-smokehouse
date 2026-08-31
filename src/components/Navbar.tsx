import React, { useState, useEffect, useRef } from 'react';
import type { PageId } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Calendar, Menu, X } from 'lucide-react';
import { bounceElement } from '../lib/animations';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { totalQuantity } = useCart();
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

  // Header main navigation links as requested:
  // Home, About, Our Menu, Reviews, Contact
  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Our Menu' },
    { id: 'feedback', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isDarkNav = currentPage === 'about';

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
      isDarkNav 
        ? 'bg-[#5B101D] text-white border-b border-[#460B15]' 
        : 'bg-[#F5EFEB] text-[#1E1E1E] border-b border-[#E5DFD5]'
    }`}>
      
      {/* Main Full-Width Header */}
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Left: Brand Logo Mark + Wordmark */}
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left focus:outline-none shrink-0 group cursor-pointer py-1"
            aria-label="Masung Smokehouse Home"
          >
            <img
              src="/logo.png"
              alt="Masung Smokehouse"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col">
              <span className={`font-bebas text-xl sm:text-2xl font-bold tracking-wider leading-none ${
                isDarkNav ? 'text-white' : 'text-[#5B101D]'
              }`}>
                MASUNG
              </span>
              <span className={`font-montserrat text-[9px] font-bold tracking-[0.25em] uppercase leading-tight ${
                isDarkNav ? 'text-[#E5DFD5]' : 'text-[#1E1E1E]'
              }`}>
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
                  className={`text-xs font-montserrat font-bold uppercase tracking-wider py-1 transition-all relative cursor-pointer ${
                    isDarkNav
                      ? (isActive ? 'text-white font-extrabold' : 'text-[#E5DFD5] hover:text-white')
                      : (isActive ? 'text-[#5B101D] font-extrabold' : 'text-[#1E1E1E] hover:text-[#5B101D]')
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className={`absolute -bottom-1.5 left-0 w-full h-[2.5px] ${
                      isDarkNav ? 'bg-[#C67D26]' : 'bg-[#5B101D]'
                    }`} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Specialized Header Buttons (Order & Reservations) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Specialized Header Button 1: Order */}
            <button
              onClick={() => handleNav('order')}
              className={`relative px-3.5 sm:px-4 py-2 text-xs font-montserrat font-extrabold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-subtle cursor-pointer ${
                isDarkNav 
                  ? 'bg-[#C67D26] hover:bg-[#A5641A] text-white' 
                  : 'bg-[#5B101D] hover:bg-[#460B15] text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order</span>
              {totalQuantity > 0 && (
                <span
                  ref={trayBadgeRef}
                  className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full inline-block ${
                    isDarkNav ? 'bg-[#141312] text-white' : 'bg-[#C67D26] text-white'
                  }`}
                >
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Specialized Header Button 2: Reservations */}
            <button
              onClick={() => handleNav('reservation')}
              className={`px-3.5 sm:px-4 py-2 text-xs font-montserrat font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-subtle ${
                isDarkNav
                  ? 'bg-transparent hover:bg-white/10 border border-[#C67D26]/70 hover:border-[#C67D26] text-white'
                  : 'bg-transparent hover:bg-[#5B101D]/5 border border-[#5B101D] text-[#5B101D]'
              }`}
            >
              <Calendar className={`w-3.5 h-3.5 ${isDarkNav ? 'text-[#C67D26]' : 'text-[#5B101D]'}`} />
              <span>Reservations</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors focus:outline-none ${
                isDarkNav ? 'text-white hover:text-[#C67D26]' : 'text-[#1E1E1E] hover:text-[#5B101D]'
              }`}
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
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-[#32070E] grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNav('order')}
              className="py-2.5 bg-[#C67D26] text-white font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Order ({totalQuantity})</span>
            </button>

            <button
              onClick={() => handleNav('reservation')}
              className="py-2.5 bg-[#5B101D] border border-[#781728] text-white font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C67D26]" />
              <span>Reservations</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
