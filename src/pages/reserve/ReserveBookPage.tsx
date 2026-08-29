import React, { useEffect } from 'react';
import type { PageId } from '../../types';
import { initScrollAnimations } from '../../lib/animations';
import { ReservationBookingCard } from '../../components/reserve/ReservationBookingCard';
import { GuestFeedbackCard } from '../../components/reserve/GuestFeedbackCard';
import { Phone, Clock, Users, Coffee, MapPin, Building2 } from 'lucide-react';

interface ReserveBookPageProps {
  onNavigate?: (page: PageId) => void;
}

export const ReserveBookPage: React.FC<ReserveBookPageProps> = () => {
  useEffect(() => {
    initScrollAnimations();
  }, []);

  const venueHighlights = [
    {
      icon: <Building2 className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Loft-Style Layout (~50 Capacity)',
      tag: 'Ground + Mezzanine',
      desc: 'Versatile two-level space featuring 12 ground floor cafe seats and 4 upper floor lounge seating clusters, tailored for private celebrations and team retreats.'
    },
    {
      icon: <Coffee className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Cafe & Smokehouse Concept',
      tag: 'Specialty Beverages',
      desc: 'Artisanal espresso drinks and specialty coffee paired with Texas-style slow-smoked meats, rich bone broth, and Filipino comfort staples.'
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Sourced in Montalban, Rizal',
      tag: 'Fresh Commissary Supply',
      desc: 'All barbecue cuts and meats are freshly prepared and supplied directly from Montalban, Rizal, maintaining exacting tenderness and flavor.'
    },
    {
      icon: <Users className="w-5 h-5 text-[#D4AF37]" />,
      title: 'Hospitality & Renovation',
      tag: 'Cel, Gina & Barista Team',
      desc: 'Venue is scheduled for interior renovation to expand comfort. Hosted on-site with genuine neighborhood warmth by Cel, Gina, and our 3 specialty baristas.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0406] text-[#F3ECE6] py-12 sm:py-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-16">
        
        {/* Header: Focused on Event & Venue Preservation */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4AF37] block">
            Montalban, Rizal • Loft-Style Venue
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#FFF5F7] tracking-tight">
            Private Events & Venue Reservation
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7C4] font-light leading-relaxed">
            Reserve our two-level loft space for birthdays, milestone celebrations, team dinners, or private gatherings (capacity up to ~50 guests). Enjoy specialty coffee and authentic wood-smoked meats.
          </p>
        </div>

        {/* Interactive Event Booking Card */}
        <div className="max-w-4xl mx-auto">
          <ReservationBookingCard />
        </div>

        {/* Generic Venue & Space Overview (Reflecting Real Site Notes) */}
        <div className="space-y-8 animate-section pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-semibold">
              Venue Overview
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF5F7]">
              The Masung Loft Experience
            </h2>
            <p className="text-xs text-[#A89895] font-light">
              An intimate cafe and smokehouse space in Dela Costa V, Rodriguez (Montalban), Rizal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {venueHighlights.map((item) => (
              <div
                key={item.title}
                className="bg-[#120609] border border-[#3D0C15] p-6 space-y-3 hover:border-[#8E1B2D] transition-colors"
              >
                <div className="w-10 h-10 bg-[#1C0A0F] border border-[#3D0C15] flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-mono block">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-lg text-[#FFF5F7] mt-1">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-[#D8C7C4] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Private Dining & Large Group Feasts */}
        <div className="bg-[#120609] border border-[#3D0C15] p-8 sm:p-12 animate-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block font-semibold">
                Event Catering & Group Packages
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF5F7]">
                Customized Feasts & Full Loft Buyouts
              </h3>
              <p className="text-xs sm:text-sm text-[#D8C7C4] font-light leading-relaxed">
                Hosting a birthday, milestone dinner, or corporate retreat? We provide pre-sliced smoked brisket platters, complimentary red rice, and barista coffee service tailored for your party.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[#D8C7C4]">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Direct Inquiries: 0968 237 0329</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Advance Notice Appreciated</span>
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

        {/* Guest Feedback & Renovation Reward System */}
        <div className="max-w-4xl mx-auto animate-section pt-4">
          <GuestFeedbackCard />
        </div>

      </div>
    </div>
  );
};
