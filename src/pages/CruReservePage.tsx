import React, { useState, useEffect } from 'react';
import type { PageId, MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { MENU_ITEMS } from '../data/menuData';
import { initScrollAnimations } from '../lib/animations';
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
    description: '12-hour oakwood smoked beef brisket with a coarse black pepper bark, distinctive pink smoke ring, and deep tenderness. Hand-carved across the grain straight from the carving board.',
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
    description: 'Rich roasted peanut sauce simmered with smoked beef brisket drippings, tender smoked beef chunks, native eggplant, pechay, and house-made bagoong alamang.',
    pairingNotes: 'Classic Filipino stew simmered with wood-smoked drippings.',
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
    q: 'How many tables are available for dine-in guests?',
    a: 'We have 11 tables on the first floor and 4 tables on the second floor (15 tables total), accommodating solo diners, couples, and gatherings.'
  },
  {
    q: 'Do you accept advance table reservations and private group dining?',
    a: 'Yes, we accommodate walk-in diners and advance reservations. You can reserve directly online through our order page or contact us at 0968 237 0329.'
  }
];

export const CruReservePage: React.FC<CruReservePageProps> = ({ onNavigate }) => {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [activeCutIndex, setActiveCutIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [addedCut, setAddedCut] = useState(false);

  useEffect(() => {
    initScrollAnimations();
  }, []);

  const activeCut = FEATURED_CUTS[activeCutIndex];

  const handleAddFeaturedCut = () => {
    if (activeCut.menuItem) {
      addItem(activeCut.menuItem);
      setAddedCut(true);
      showToast('Added to Order', `${activeCut.name} • ₱${activeCut.price}`, 'success');
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
    <div className="min-h-screen bg-[#0A0406] text-[#F3ECE6] font-sans antialiased selection:bg-[#7D0A1E] selection:text-white">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. CRU HERO SECTION WITH DARK SCARLET AMBIENT BACKDROP */}
      {/* ------------------------------------------------------------- */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-between overflow-hidden bg-[#0A0406]">
        
        {/* Ambient Dark Smokehouse Imagery Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80"
            alt="Smokehouse Ambience"
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.1] scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0406] via-[#1C0A0F]/60 to-[#0A0406]/90" />
          <div className="absolute inset-0 bg-[#3D0C15]/40 mix-blend-multiply" />
        </div>

        {/* Top spacer */}
        <div className="pt-12" />

        {/* Center: Large Floating Editorial Headline */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="inline-block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
            U-Belt, Manila • Montalban, Rizal
          </span>
          
          <div className="space-y-1">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal text-[#FFF5F7] tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-[1.05]">
              MASUNG
            </h1>
            <div className="text-base sm:text-xl uppercase tracking-[0.35em] text-[#D4AF37] font-semibold">
              SMOKEHOUSE
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#A89895] pt-1 font-mono">
              Reserve Edition • 8–16 Hours Low & Slow
            </div>
          </div>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-[#E2D5D2] font-light tracking-wide leading-relaxed">
            Hand-carved oakwood smoked meats, prime cuts, and authentic Pinoy comfort food cooked low and slow for 8 to 16 hours.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('reserve-menu')}
              className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg hover:shadow-[#D4AF37]/20"
            >
              Explore Our Menus
            </button>
            <button
              onClick={() => onNavigate('reserve-shop')}
              className="px-8 py-3.5 border border-[#8E1B2D]/80 hover:border-[#D4AF37] text-[#FFF5F7] font-medium text-xs uppercase tracking-[0.2em] transition-all cursor-pointer backdrop-blur-sm bg-[#1C0A0F]/60 hover:bg-[#3D0C15]/80"
            >
              Order Online
            </button>
          </div>
        </div>

        {/* Bottom Hairline Status Bar (Cru Style) */}
        <div className="relative z-10 w-full border-t border-[#3D0C15]/80 bg-[#0A0406]/90 backdrop-blur-sm py-3 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs tracking-[0.15em] uppercase text-[#D8C7C4]">
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
      <section className="py-20 sm:py-28 bg-[#0A0406] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* White Floating Editorial Card (Matches Cru Screenshot) */}
            <div className="lg:col-span-5 bg-[#FFFFFF] text-[#181615] p-8 sm:p-12 shadow-2xl relative z-20 border border-[#E5DFD5]">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#8E1B2D] uppercase block mb-3">
                Montalban, Rizal
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#181615] leading-tight mb-5">
                Wood-Smoked Steaks & Craft Barbecue
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5651] leading-relaxed mb-4">
                Savor hand-carved Texas-style smoked beef brisket, tender pork belly, and rich Pinoy classics cooked low and slow over Philippine hardwood logs for 8 to 16 hours.
              </p>
              <p className="text-xs sm:text-sm text-[#5C5651] leading-relaxed mb-6">
                Every meal includes free unlimited heirloom red rice and piping-hot bone broth refills. Relax across our 15 dining tables on the first and second floors.
              </p>
              
              <button
                onClick={() => onNavigate('reserve-about')}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#8E1B2D] hover:text-[#5B101D] transition-colors group cursor-pointer"
              >
                <span>Discover Our Heritage</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Overlapping Gourmet Food Photography with Scarlet Hairline Glow */}
            <div className="lg:col-span-7 relative z-10 lg:-ml-12">
              <div className="relative overflow-hidden border border-[#3D0C15] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
                  alt="Plated Smoked Steak"
                  className="w-full h-[350px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0406]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 right-4 text-right">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] block font-semibold">
                    Carved Fresh Daily
                  </span>
                  <span className="text-xs font-serif italic text-[#FFF5F7]">
                    Hardwood Smoke & Daily Carvings
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
      <section className="animate-section py-20 sm:py-28 bg-[#120609] border-y border-[#3D0C15]/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium block">
              Curated Pit Selections
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#FFF5F7] tracking-tight">
              An Exquisite Dining Journey Awaits You
            </h2>
            <p className="text-xs sm:text-sm text-[#D8C7C4] font-light">
              Select your cut below to view the pitmaster carving notes and add directly to your table order.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: High-Contrast Sliced Cut Photography */}
            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden border border-[#3D0C15] bg-[#0A0406] shadow-2xl">
                <img
                  src={activeCut.imageUrl}
                  alt={activeCut.name}
                  className="w-full h-[380px] sm:h-[460px] object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0406]/90 via-transparent to-transparent" />
                
                {/* Carousel Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={handlePrevCut}
                    className="w-9 h-9 bg-[#1C0A0F]/80 hover:bg-[#D4AF37] hover:text-black text-white border border-[#3D0C15] flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous Cut"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextCut}
                    className="w-9 h-9 bg-[#1C0A0F]/80 hover:bg-[#D4AF37] hover:text-black text-white border border-[#3D0C15] flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next Cut"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block mb-1 font-semibold">
                    {activeCut.subname}
                  </span>
                  <h3 className="font-serif text-2xl text-[#FFF5F7]">
                    {activeCut.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* Right: Cut Selection & Details Card */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Cut Selector Pills */}
              <div className="grid grid-cols-2 gap-2 animate-grid">
                {FEATURED_CUTS.map((cut, idx) => (
                  <button
                    key={cut.id}
                    onClick={() => setActiveCutIndex(idx)}
                    className={`text-left p-3 border transition-all cursor-pointer ${
                      activeCutIndex === idx
                        ? 'border-[#D4AF37] bg-[#3D0C15]/50 text-[#FFF5F7] shadow-[0_0_15px_rgba(142,27,45,0.3)]'
                        : 'border-[#3D0C15]/60 hover:border-[#8E1B2D] text-[#D8C7C4] bg-[#1C0A0F]/40'
                    }`}
                  >
                    <span className="text-[10px] uppercase tracking-wider block text-[#D4AF37] font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider truncate block text-[#FFF5F7]">
                      {cut.name}
                    </span>
                    <span className="text-[11px] text-[#E2D5D2] font-mono">
                      ₱{cut.price}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Cut Description Card */}
              <div className="p-6 sm:p-8 border border-[#3D0C15] bg-[#1C0A0F]/70 space-y-4 shadow-xl">
                <div className="flex justify-between items-baseline border-b border-[#3D0C15] pb-4">
                  <div>
                    <h4 className="font-serif text-2xl text-[#FFF5F7]">
                      {activeCut.name}
                    </h4>
                    <span className="text-xs text-[#D4AF37] tracking-wider uppercase font-semibold">
                      {activeCut.subname}
                    </span>
                  </div>
                  <span className="font-serif text-2xl text-[#FFF5F7] font-bold">
                    ₱{activeCut.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#E2D5D2] leading-relaxed font-light">
                  {activeCut.description}
                </p>

                <div className="p-3 bg-[#0A0406]/80 border border-[#3D0C15] text-[11px] text-[#D8C7C4]">
                  <strong className="text-[#FFF5F7] block uppercase tracking-wider text-[10px] mb-0.5">
                    Pairing Profile:
                  </strong>
                  {activeCut.pairingNotes}
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={handleAddFeaturedCut}
                    className="flex-1 py-3.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-[#D4AF37]/20"
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
                    onClick={() => onNavigate('reserve-menu')}
                    className="px-5 py-3.5 border border-[#8E1B2D]/70 hover:border-[#D4AF37] text-[#FFF5F7] text-xs uppercase tracking-[0.15em] transition-all cursor-pointer bg-[#0A0406]/50 hover:bg-[#1C0A0F]"
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
      <section className="animate-section py-20 bg-[#0A0406] text-center border-b border-[#3D0C15]/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-medium">
            Guest Testimonials
          </span>
          <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#FFF5F7] font-normal leading-snug">
            "The tenderness, dark pepper bark, and rich wood smoke here rival the finest hotel steakhouses in Metro Manila. True neighborhood perfection on every visit."
          </blockquote>
          <div className="pt-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
              Marco R. — Local Food Critic & Dining Guest
            </span>
            <span className="text-[10px] text-[#D8C7C4] uppercase tracking-wider">
              Verified Dine-In Experience • Rodriguez, Rizal
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. MINIMALIST HAIRLINE FAQ ACCORDION */}
      {/* ------------------------------------------------------------- */}
      <section className="animate-section py-20 sm:py-28 bg-[#120609]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium block">
              Information & Guidance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#FFF5F7]">
              Your Questions, Answered.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="border border-[#3D0C15] bg-[#1C0A0F]/60 transition-colors overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="font-serif text-lg sm:text-xl text-[#FFF5F7]">
                      {item.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#D4AF37] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#E2D5D2] font-light leading-relaxed border-t border-[#3D0C15] pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
