import React, { useState, useEffect, useRef } from 'react';
import { LoyaltyProvider } from './context/LoyaltyContext';
import { CartProvider } from './context/CartContext';
import type { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { OrderPage } from './pages/OrderPage';
import { LoyaltyPage } from './pages/LoyaltyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CruReservePage } from './pages/CruReservePage';
import { transitionPage } from './lib/animations';

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
  if (hash === 'menu') return 'menu';
  if (hash === 'order') return 'order';
  if (hash === 'loyalty') return 'loyalty';
  if (hash === 'about') return 'about';
  if (hash === 'contact') return 'contact';
  if (hash === 'reserve' || hash === 'cru' || hash === 'steakhouse') return 'reserve';
  return 'home';
}

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const mainRef = useRef<HTMLElement>(null);

  // Sync state with URL hash for clean bookmarking & browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getInitialPage();
      setCurrentPage(newPage);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Animate page transitions with GSAP
  useEffect(() => {
    transitionPage(mainRef.current);
  }, [currentPage]);

  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = `/${page === 'home' ? '' : page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCruReserve = currentPage === 'reserve';

  return (
    <div className={`min-h-screen flex flex-col ${isCruReserve ? 'bg-[#0E1217] text-[#E5DFD5]' : 'bg-[#FBF8F3] text-[#181615]'} selection:bg-[#5B101D] selection:text-white`}>
      {/* Full-Width Navigation Bar (shown on classic pages) */}
      {!isCruReserve && <Navbar currentPage={currentPage} onNavigate={navigateTo} />}

      {/* Main Dedicated Page View with GSAP Transition */}
      <main ref={mainRef} className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'menu' && <MenuPage onNavigate={navigateTo} />}
        {currentPage === 'order' && <OrderPage onNavigate={navigateTo} />}
        {currentPage === 'loyalty' && <LoyaltyPage onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'contact' && <ContactPage onNavigate={navigateTo} />}
        {currentPage === 'reserve' && <CruReservePage onNavigate={navigateTo} />}
      </main>

      {/* Wooden Smokehouse Footer (shown on classic pages) */}
      {!isCruReserve && <Footer onNavigate={navigateTo} />}
    </div>
  );
};

export default function App() {
  return (
    <LoyaltyProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </LoyaltyProvider>
  );
}
