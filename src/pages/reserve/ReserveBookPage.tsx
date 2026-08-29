import React, { useEffect } from 'react';
import type { PageId } from '../../types';
import { initScrollAnimations } from '../../lib/animations';
import { ReservationBookingCard } from '../../components/reserve/ReservationBookingCard';
import { Phone, Clock } from 'lucide-react';

interface ReserveBookPageProps {
  onNavigate?: (page: PageId) => void;
}

export const ReserveBookPage: React.FC<ReserveBookPageProps> = () => {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  const atmospheres = [
    {
      title: 'Hearth Dining Room',
      subtitle: 'Heart of the Smoker Lounge',
      desc: 'Tables positioned nearest to the carving board. Immerse yourself in the aromas of roasted hardwood and live knife carving.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Smoker Bar Counter',
      subtitle: 'Casual High-Top Lounge',
      desc: 'High-top bar seating ideal for solo diners, couples, and quick tastings paired with refreshing calamansi sodas.',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Billiards Alcove',
      subtitle: 'Dining & Recreation Booth',
      desc: 'Cozy leather seating with complimentary access to our full-size neighborhood billiards table and vintage arcade games.',
      image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Evening Terrace',
      subtitle: 'Montalban Mountain Breeze',
      desc: 'Open-air patio dining beneath string lights. Enjoy the cool evening breeze of Rodriguez, Rizal as twilight settles.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0406] text-[#F3ECE6] py-12 sm:py-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4AF37] block">
            Table & Private Dining
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#FFF5F7] tracking-tight">
            Reserve Your Experience
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7C4] font-light leading-relaxed">
            Reserve a table in advance to guarantee prime cut allocations and enjoy personalized carving board service in Dela Costa V, Rodriguez, Rizal.
          </p>
        </div>

        {/* Interactive Booking Card (Senior Component) */}
        <div className="max-w-4xl mx-auto">
          <ReservationBookingCard />
        </div>

        {/* The 4 Atmospheres Showcase */}
        <div className="space-y-8 animate-section pt-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-semibold">
              Distinct Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF5F7]">
              Four Dining Environments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {atmospheres.map((space) => (
              <div
                key={space.title}
                className="bg-[#120609] border border-[#3D0C15] overflow-hidden group hover:border-[#8E1B2D] transition-all"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={space.image}
                    alt={space.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120609] via-transparent to-transparent" />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] block font-mono">
                    {space.subtitle}
                  </span>
                  <h3 className="font-serif text-lg text-[#FFF5F7]">
                    {space.title}
                  </h3>
                  <p className="text-xs text-[#D8C7C4] font-light leading-relaxed">
                    {space.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Dining & Large Group Feasts */}
        <div className="bg-[#120609] border border-[#3D0C15] p-8 sm:p-12 animate-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block font-semibold">
                Feasts & Private Gatherings
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF5F7]">
                Whole Smoked Brisket & Private Salon Bookings
              </h3>
              <p className="text-xs sm:text-sm text-[#D8C7C4] font-light leading-relaxed">
                Hosting a birthday, milestone dinner, or team retreat? Reserve an entire 5kg–7kg Texas wood-smoked brisket carved hot for up to 20 guests, complete with private access to our billiard lounge.
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs text-[#D8C7C4]">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Direct Inquiries: 0968 237 0329</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>24-Hour Advance Notice Required</span>
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <a
                href="tel:09682370329"
                className="inline-block px-8 py-3.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all cursor-pointer shadow-md"
              >
                Call Concierge Desk
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
