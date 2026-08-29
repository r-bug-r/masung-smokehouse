import React, { useState } from 'react';
import type { PageId, MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';
import { 
  ChevronRight, 
  ChevronLeft, 
  Plus, 
  Check, 
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface CruReservePageProps {
  onNavigate: (page: PageId) => void;
}

interface CruFeaturedCut {
  id: string;
  name: string;
  subname: string;
  price: number;
  description: string;
  pairingNotes: string;
  imageUrl: string;
  menuItem?: MenuItem;
}

const FEATURED_CUTS: CruFeaturedCut[] = [
  {
    id: 'brisket',
    name: 'Texas Oak-Smoked Beef Brisket',
    subname: '12-Hour Low & Slow Prime Cut',
    price: 199,
    description: '12-hour oakwood smoked beef brisket with a coarse black pepper bark, distinctive pink smoke ring, and melt-in-the-mouth tenderness. Hand-carved across the grain straight from the carving board.',
    pairingNotes: 'Paired with heirloom red rice, signature house BBQ glaze, and hot bone broth.',
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80',
    menuItem: MENU_ITEMS.find(i => i.id === 'smoked-brisket-meal') || MENU_ITEMS[0]
  },
  {
    id: 'pork-belly',
    name: 'Hardwood Smoked Pork Belly Slab',
    subname: '8-Hour Hickory Cured & Glazed',
    price: 149,
    description: 'Thick-slab pork belly smoked over cured Philippine hardwood until the fat renders completely and caramelizes with our house spice rub.',
    pairingNotes: 'Served with sweet-savory smokehouse dipping sauce and unlimited red rice.',
    imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1200&q=80',
    menuItem: MENU_ITEMS.find(i => i.id === 'smoked-pork-belly-meal') || MENU_ITEMS[1]
  },
  {
    id: 'karekare',
    name: 'Smoked Beef Kare-Kare',
    subname: 'Brisket Drippings & Roasted Peanuts',
    price: 179,
    description: 'Rich roasted peanut sauce simmered with smoked beef brisket drippings, tender smoked beef chunks, native eggplant, pechay, and artisan bagoong alamang.',
    pairingNotes: 'Filipino soul elevated by authentic Texas wood smoke.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    menuItem: MENU_ITEMS.find(i => i.id === 'smoked-beef-karekare') || MENU_ITEMS[2]
  },
  {
    id: 'sisig',
    name: 'Sizzling Smoked Sisig',
    subname: 'Wood-Smoked Pork & Fresh Calamansi',
    price: 149,
    description: 'Chopped wood-smoked pork belly seared with onions, bird-eye chilies, and fresh calamansi for an unforgettable savory crunch.',
    pairingNotes: 'A smokehouse favorite best enjoyed piping hot with unlimited rice.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    menuItem: MENU_ITEMS.find(i => i.id === 'sizzling-smoked-sisig') || MENU_ITEMS[3]
  }
];

const FAQ_ITEMS = [
  {
    q: 'Where is Masung Smokehouse located in Rodriguez (Montalban), Rizal?',
    a: 'You will find us at Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez (Montalban), Rizal. We are open for dine-in, takeout, and delivery from Tuesday to Sunday, 4:00 PM to 11:00 PM (Mondays Closed for pit curing).'
  },
  {
    q: 'What membership perks does the Masung Pit Pass offer?',
    a: 'Guests earn 1 BBQ Point for every ₱10 spent. Points can be redeemed anytime for free signature cuts (such as 120g Smoked Beef Brisket), pitchers of house iced tea, side dishes, or direct ₱100 bill discounts.'
  },
  {
    q: 'Do all rice meals include free unlimited red rice and hot bone soup?',
    a: 'Yes. Every signature smoked meat and Pinoy classic meal is served with unlimited heirloom red rice and piping-hot beef bone broth refills with zero extra charge.'
  },
  {
    q: 'Can dining guests play the in-house billiards and retro arcade for free?',
    a: 'Absolutely. We offer full complimentary access to our felt billiards table, retro arcade cabinet, darts lane, and foosball lounge for all dining customers.'
  },
  {
    q: 'Do you accept advance table reservations and private group dining?',
    a: 'Yes, we accommodate walk-in diners and advance reservations. You can reserve directly online through our order page or contact us at 0968 237 0329.'
  }
];

export const CruReservePage: React.FC<CruReservePageProps> = ({ onNavigate }) => {
  const { addItem } = useCart();

  const [activeCutIndex, setActiveCutIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [addedCut, setAddedCut] = useState(false);

  const activeCut = FEATURED_CUTS[activeCutIndex];

  const handleAddFeaturedCut = () => {
    if (activeCut.menuItem) {
      addItem(activeCut.menuItem);
      setAddedCut(true);
      setTimeout(() => setAddedCut(false), 2500);
    }
  };

  const handleNextCut = () => {
    setActiveCutIndex((prev) => (prev + 1) % FEATURED_CUTS.length);
  };

  const handlePrevCut = () => {
    setActiveCutIndex((prev) => (prev - 1 + FEATURED_CUTS.length) % FEATURED_CUTS.length);
  };

  return (
    <div className="min-h-screen bg-[#0E1217] text-[#E5DFD5] font-sans antialiased selection:bg-[#C5A059] selection:text-black">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. CRU HAIRLINE HEADER: PURE TEXT LOGO & 3 HAIRLINE MENU LINKS */}
      {/* ------------------------------------------------------------- */}
      <header className="sticky top-0 z-50 w-full bg-[#090D12]/95 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
          
          {/* Left: Pure Minimalist Text Logo */}
          <button 
            onClick={() => onNavigate('reserve')}
            className="text-left group cursor-pointer focus:outline-none"
          >
            <span className="font-heading text-lg sm:text-xl font-bold tracking-[0.25em] uppercase text-white group-hover:text-[#D4AF37] transition-colors">
              MASUNG STEAKHOUSE
            </span>
          </button>

          {/* Right: Exactly Three Hairline Menu Options */}
          <nav className="flex items-center gap-8 sm:gap-12 lg:gap-14">
            <button
              onClick={() => onNavigate('order')}
              className="text-xs uppercase tracking-[0.2em] text-[#C5BDB5] hover:text-white font-medium transition-colors cursor-pointer py-1 relative group"
            >
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => onNavigate('menu')}
              className="text-xs uppercase tracking-[0.2em] text-[#C5BDB5] hover:text-white font-medium transition-colors cursor-pointer py-1 relative group"
            >
              Menu
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="text-xs uppercase tracking-[0.2em] text-[#C5BDB5] hover:text-white font-medium transition-colors cursor-pointer py-1 relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
            </button>
          </nav>

        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* 2. CRU HERO SECTION WITH AMBIENT BACKDROP & FLOATING SERIF */}
      {/* ------------------------------------------------------------- */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between overflow-hidden">
        
        {/* Ambient Dark Steakhouse Imagery Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
            alt="Cru Steakhouse Ambience"
            className="w-full h-full object-cover object-center filter brightness-[0.38] scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1217] via-transparent to-[#090D12]/80" />
          <div className="absolute inset-0 bg-[#32070E]/20 mix-blend-multiply" />
        </div>

        {/* Top spacer */}
        <div className="pt-12" />

        {/* Center: Large Floating Editorial Headline */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="inline-block text-[11px] sm:text-xs font-medium uppercase tracking-[0.35em] text-[#D4AF37]">
            Texas Wood Fire • Montalban, Rizal
          </span>
          
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-white tracking-tight drop-shadow-2xl leading-[1.05]">
            Masung Steakhouse
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#D0C8BF] font-light tracking-wide leading-relaxed">
            Hand-carved oakwood smoked meats, prime cuts, and authentic Pinoy comfort food cooked low and slow for 8 to 16 hours.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('menu')}
              className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              Explore Our Menus
            </button>
            <button
              onClick={() => onNavigate('order')}
              className="px-8 py-3.5 border border-white/40 hover:border-white text-white font-medium text-xs uppercase tracking-[0.2em] transition-all cursor-pointer backdrop-blur-sm bg-black/20"
            >
              Order Online
            </button>
          </div>
        </div>

        {/* Bottom Hairline Status Bar (Cru Style) */}
        <div className="relative z-10 w-full border-t border-white/15 bg-black/40 backdrop-blur-sm py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs tracking-[0.15em] uppercase text-[#D0C8BF]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full inline-block" />
              <span>Now Open • 4:00 PM to 11:00 PM (Tue–Sun)</span>
            </div>
            <div className="flex items-center gap-6">
              <span>Reservations & Takeout • 0968 237 0329</span>
              <span className="hidden md:inline text-[#D4AF37]">Dela Costa V, Burgos, Rizal</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. ASYMMETRICAL EDITORIAL OVERLAP SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-28 bg-[#0E1217] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* White Floating Editorial Card (Matches Cru Screenshot) */}
            <div className="lg:col-span-5 bg-white text-[#181615] p-8 sm:p-12 shadow-2xl relative z-20 border border-[#E5DFD5]">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#C67D26] uppercase block mb-3">
                Montalban, Rizal
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#181615] leading-tight mb-5">
                Wood-Smoked Steaks & Craft Barbecue
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5651] leading-relaxed mb-4">
                Savor hand-carved Texas-style smoked beef brisket, tender pork belly, and rich Pinoy classics cooked low and slow over Philippine hardwood logs for 8 to 16 hours.
              </p>
              <p className="text-xs sm:text-sm text-[#5C5651] leading-relaxed mb-6">
                Every meal includes free unlimited heirloom red rice and piping-hot bone broth refills. Dine in our neighborhood lounge with complimentary access to in-house billiards and retro arcade games.
              </p>
              
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#5B101D] hover:text-[#C67D26] transition-colors group cursor-pointer"
              >
                <span>Discover Our Heritage</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Overlapping Gourmet Food Photography */}
            <div className="lg:col-span-7 relative z-10 lg:-ml-12">
              <div className="relative overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                  alt="Plated Smoked Steak"
                  className="w-full h-[350px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 text-right">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] block">
                    Carved Fresh Daily
                  </span>
                  <span className="text-xs font-serif italic text-white/90">
                    Artisan Plating & Wood Smoke
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. LUXURY CUT SHOWCASE ("AN EXQUISITE DINING JOURNEY") */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-28 bg-[#090D12] border-y border-white/10 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium block">
              Curated Pit Selections
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
              An Exquisite Dining Journey Awaits You
            </h2>
            <p className="text-xs sm:text-sm text-[#A09A92] font-light">
              Select your cut below to view the pitmaster carving notes and add directly to your table order.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: High-Contrast Sliced Cut Photography */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden border border-white/15 bg-black/50 shadow-2xl">
                <img
                  src={activeCut.imageUrl}
                  alt={activeCut.name}
                  className="w-full h-[380px] sm:h-[460px] object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Carousel Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={handlePrevCut}
                    className="w-9 h-9 bg-black/60 hover:bg-[#D4AF37] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous Cut"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextCut}
                    className="w-9 h-9 bg-black/60 hover:bg-[#D4AF37] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next Cut"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                    {activeCut.subname}
                  </span>
                  <h3 className="font-serif text-2xl text-white">
                    {activeCut.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Right: Cut Selection & Details Card */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Cut Selector Pills */}
              <div className="grid grid-cols-2 gap-2">
                {FEATURED_CUTS.map((cut, idx) => (
                  <button
                    key={cut.id}
                    onClick={() => setActiveCutIndex(idx)}
                    className={`text-left p-3 border transition-all cursor-pointer ${
                      activeCutIndex === idx
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-white'
                        : 'border-white/10 hover:border-white/30 text-[#A09A92] bg-white/5'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-wider block text-[#D4AF37]">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider truncate block">
                      {cut.name}
                    </span>
                    <span className="text-[11px] text-white/80 font-mono">
                      ₱{cut.price}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Cut Description Card */}
              <div className="p-6 sm:p-8 border border-white/15 bg-white/5 space-y-4">
                <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
                  <div>
                    <h4 className="font-serif text-2xl text-white">
                      {activeCut.name}
                    </h4>
                    <span className="text-xs text-[#D4AF37] tracking-wider uppercase">
                      {activeCut.subname}
                    </span>
                  </div>
                  <span className="font-serif text-2xl text-white font-bold">
                    ₱{activeCut.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#C5BDB5] leading-relaxed font-light">
                  {activeCut.description}
                </p>

                <div className="p-3 bg-black/40 border border-white/10 text-[11px] text-[#A09A92]">
                  <strong className="text-white block uppercase tracking-wider text-[10px] mb-0.5">
                    Pairing Profile:
                  </strong>
                  {activeCut.pairingNotes}
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={handleAddFeaturedCut}
                    className="flex-1 py-3.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {addedCut ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Order</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Order • ₱{activeCut.price}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onNavigate('menu')}
                    className="px-5 py-3.5 border border-white/20 hover:border-white text-white text-xs uppercase tracking-[0.15em] transition-all cursor-pointer"
                  >
                    Full Menu
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. GUEST TESTIMONIAL / CRITIC REVIEW */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 bg-[#0E1217] text-center border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-medium">
            Guest Testimonials
          </span>
          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white font-normal leading-snug">
            "The tenderness, dark pepper bark, and rich wood smoke here rival the finest hotel steakhouses in Metro Manila. True neighborhood perfection on every visit."
          </blockquote>
          <div className="pt-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              Marco R. — Local Food Critic & Dining Guest
            </span>
            <span className="text-[10px] text-[#A09A92] uppercase tracking-wider">
              Verified Dine-In Experience • Rodriguez, Rizal
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. MINIMALIST HAIRLINE FAQ ACCORDION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 sm:py-28 bg-[#090D12]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium block">
              Information & Guidance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              Your Questions, Answered.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="border border-white/15 bg-white/5 transition-colors overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif text-lg sm:text-xl text-white">
                      {item.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#C5BDB5] font-light leading-relaxed border-t border-white/10 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. CLEAN LUXURY WHITE & CHARCOAL FOOTER (MATCHES CRU SCREENSHOT) */}
      {/* ------------------------------------------------------------- */}
      <footer className="bg-white text-[#181615] border-t border-[#E5DFD5]">
        
        {/* Main 3-Column Info Grid */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            
            {/* Address */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C67D26]">
                Address
              </h4>
              <p className="text-xs text-[#5C5651] leading-relaxed">
                Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez (Montalban), Rizal
              </p>
              <span className="text-[11px] text-[#5B101D] font-medium block">
                Free Street & Neighborhood Parking Available
              </span>
            </div>

            {/* Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C67D26]">
                Contact Us
              </h4>
              <p className="text-xs text-[#5C5651]">
                Direct Line: <strong>0968 237 0329</strong>
              </p>
              <p className="text-xs text-[#5C5651]">
                Email: masungsmokehouse@gmail.com
              </p>
              <div className="pt-2 flex items-center justify-center md:justify-start gap-4">
                <a
                  href="https://www.facebook.com/MasungSmokeHouse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#5B101D] hover:underline"
                >
                  Facebook Page
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href="https://www.instagram.com/masungsmokehouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#5B101D] hover:underline"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C67D26]">
                Hours
              </h4>
              <p className="text-xs text-[#5C5651] leading-relaxed">
                Tuesday – Sunday: <strong>4:00 PM – 11:00 PM</strong>
              </p>
              <p className="text-xs text-[#8A837C]">
                Monday: Closed (Hardwood curing & smoker maintenance)
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="mt-3 px-3 py-1 bg-[#181615] text-white text-[10px] uppercase tracking-widest hover:bg-[#5B101D] transition-colors cursor-pointer"
              >
                Switch to Classic Smokehouse View
              </button>
            </div>

          </div>

          {/* Hairline Bottom Copyright & Disclaimer */}
          <div className="mt-12 pt-8 border-t border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8A837C]">
            <p>© {new Date().getFullYear()} Masung Smokehouse & Steakhouse. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => onNavigate('menu')} className="hover:underline">Menu</button>
              <button onClick={() => onNavigate('order')} className="hover:underline">Order</button>
              <button onClick={() => onNavigate('loyalty')} className="hover:underline">Pit Pass</button>
              <button onClick={() => onNavigate('home')} className="text-[#5B101D] font-bold hover:underline">Classic Theme</button>
            </div>
          </div>
        </div>

      </footer>

      {/* Floating Sticky Bottom Reserve / Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#090D12]/95 backdrop-blur-md border-t border-white/10 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] hidden sm:inline">
              — Now Open • 4:00 PM to 11:00 PM
            </span>
            <span className="text-[11px] text-[#E5DFD5] font-mono">
              0968 237 0329
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="text-[10px] uppercase tracking-wider text-[#A09A92] hover:text-white px-2 py-1 border border-white/20 hidden sm:inline"
            >
              Classic Theme
            </button>
            <button
              onClick={() => onNavigate('order')}
              className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-[11px] uppercase tracking-widest transition-all cursor-pointer"
            >
              Reserve / Order
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
