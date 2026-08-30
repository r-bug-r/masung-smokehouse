import React, { useState, useEffect, useRef } from 'react';
import { LoyaltyProvider } from './context/LoyaltyContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { StaffAuthProvider } from './context/StaffAuthContext';
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
import { ReserveMenuPage } from './pages/reserve/ReserveMenuPage';
import { ReserveShopPage } from './pages/reserve/ReserveShopPage';
import { ReserveAboutPage } from './pages/reserve/ReserveAboutPage';
import { ReserveBookPage } from './pages/reserve/ReserveBookPage';
import { ReserveVipPage } from './pages/reserve/ReserveVipPage';
import { PosSystemPage } from './pages/PosSystemPage';
import { ReservationPage } from './pages/ReservationPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { InventoryPage } from './pages/InventoryPage';
import { ReserveHeader } from './components/reserve/ReserveHeader';
import { ReserveFooter } from './components/reserve/ReserveFooter';
import { transitionPage } from './lib/animations';

function getInitialPage(): PageId {
  const hash = window.location.hash.replace('#/', '').replace('#', '').toLowerCase();
  if (hash === 'menu') return 'menu';
  if (hash === 'order') return 'order';
  if (hash === 'loyalty') return 'loyalty';
  if (hash === 'about') return 'about';
  if (hash === 'contact') return 'contact';

  // Digital Platform Core Routes
  if (hash === 'pos' || hash === 'kds' || hash === 'cashier') return 'pos';
  if (hash === 'reservation' || hash === 'reservations' || hash === 'book') return 'reservation';
  if (hash === 'feedback' || hash === 'reviews' || hash === 'poll') return 'feedback';
  if (hash === 'inventory' || hash === 'smoker') return 'inventory';

  // Reserve suite routes
  if (hash === 'reserve-menu' || hash === 'reserve/menu') return 'reserve-menu';
  if (hash === 'reserve-shop' || hash === 'reserve/shop' || hash === 'reserve/order') return 'reserve-shop';
  if (hash === 'reserve-about' || hash === 'reserve/about') return 'reserve-about';
  if (hash === 'reserve-book' || hash === 'reserve/book' || hash === 'reserve/reservations') return 'reserve-book';
  if (hash === 'reserve-vip' || hash === 'reserve/vip' || hash === 'reserve/pass') return 'reserve-vip';
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

  const isCruReserve = currentPage.startsWith('reserve');

  return (
    <div className={`min-h-screen flex flex-col ${isCruReserve ? 'bg-[#0A0406] text-[#F3ECE6]' : 'bg-[#FBF8F3] text-[#181615]'} selection:bg-[#7D0A1E] selection:text-white`}>
      {/* Full-Width Navigation Bar: Classic vs Reserve Edition */}
      {!isCruReserve && <Navbar currentPage={currentPage} onNavigate={navigateTo} />}
      {isCruReserve && <ReserveHeader currentPage={currentPage} onNavigate={navigateTo} />}

      {/* Main Dedicated Page View with GSAP Transition */}
      <main ref={mainRef} className="flex-1">
        {/* Core Smokehouse Pages */}
        {currentPage === 'home' && <HomePage onNavigate={navigateTo} />}
        {currentPage === 'menu' && <MenuPage onNavigate={navigateTo} />}
        {currentPage === 'order' && <OrderPage onNavigate={navigateTo} />}
        {currentPage === 'pos' && <PosSystemPage onNavigate={navigateTo} />}
        {currentPage === 'reservation' && <ReservationPage onNavigate={navigateTo} />}
        {currentPage === 'feedback' && <FeedbackPage onNavigate={navigateTo} />}
        {currentPage === 'inventory' && <InventoryPage onNavigate={navigateTo} />}
        {currentPage === 'loyalty' && <LoyaltyPage onNavigate={navigateTo} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentPage === 'contact' && <ContactPage onNavigate={navigateTo} />}

        {/* Reserve Edition Pages */}
        {currentPage === 'reserve' && <CruReservePage onNavigate={navigateTo} />}
        {currentPage === 'reserve-menu' && <ReserveMenuPage onNavigate={navigateTo} />}
        {currentPage === 'reserve-shop' && <ReserveShopPage onNavigate={navigateTo} />}
        {currentPage === 'reserve-about' && <ReserveAboutPage onNavigate={navigateTo} />}
        {currentPage === 'reserve-book' && <ReserveBookPage onNavigate={navigateTo} />}
        {currentPage === 'reserve-vip' && <ReserveVipPage onNavigate={navigateTo} />}
      </main>

      {/* Footer: Classic Smokehouse vs Reserve Edition */}
      {!isCruReserve && <Footer onNavigate={navigateTo} />}
      {isCruReserve && <ReserveFooter onNavigate={navigateTo} />}
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <StaffAuthProvider>
        <LoyaltyProvider>
          <CartProvider>
            <MainApp />
          </CartProvider>
        </LoyaltyProvider>
      </StaffAuthProvider>
    </ToastProvider>
  );
}
