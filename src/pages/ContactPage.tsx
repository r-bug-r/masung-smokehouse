import React, { useState } from 'react';
import type { PageId } from '../types';
import { MapPin, Clock, Phone, Navigation, MessageCircle, Check, Car, ArrowRight } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [inquirySent, setInquirySent] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestMessage, setGuestMessage] = useState('');

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setGuestName('');
      setGuestPhone('');
      setGuestMessage('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] py-10 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3.5 py-1 inline-block mb-3">
            Rodriguez, Rizal
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#5B101D] uppercase tracking-tight">
            Location & Contact
          </h1>
          <p className="text-sm sm:text-base text-[#5C5651] mt-2">
            Dine-in, takeout, and GrabFood delivery in Montalban.
          </p>
        </div>

        {/* Location & Hours Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Store Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white p-7 sm:p-9 border border-[#E5DFD5] shadow-subtle space-y-6">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-[#5B101D] tracking-wider block">
                    Location
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl text-[#181615] uppercase tracking-tight">
                    Masung Smokehouse
                  </h2>
                </div>
                <span className="px-3 py-1 bg-[#F2ECE1] text-[#5B101D] text-xs font-bold uppercase tracking-wider">
                  Open for Dine-In
                </span>
              </div>

              <div className="space-y-4 text-sm text-[#5C5651]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#5B101D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#181615] block">Address:</strong>
                    Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez (Montalban), Rizal
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#5B101D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#181615] block">Hours:</strong>
                    Tuesday to Sunday: 4:00 PM – 11:00 PM
                    <br />
                    <span className="text-xs text-[#8A837C]">Monday: Closed</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#5B101D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#181615] block">Phone:</strong>
                    0968 237 0329
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-5 h-5 text-[#5B101D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#181615] block">Parking:</strong>
                    Street parking and motorcycle bays right in front.
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=Dela+Costa+V+Burgos+Rodriguez+Rizal"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex-1 py-3 px-5 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 transition-colors shadow-subtle cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>

                <a
                  href="https://www.facebook.com/MasungSmokeHouse/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="py-3 px-5 bg-[#181615] hover:bg-[#2B2724] text-white font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-subtle cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on Messenger</span>
                </a>
              </div>
            </div>

            {/* Driving Directions Guide */}
            <div className="bg-white p-7 border border-[#E5DFD5] shadow-subtle space-y-4">
              <h3 className="font-heading font-extrabold text-lg text-[#181615] uppercase tracking-tight">
                Directions from Nearby Cities
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm text-[#5C5651]">
                <div className="p-3.5 bg-[#FBF8F3] border border-[#E5DFD5]">
                  <strong className="text-[#5B101D] block font-heading uppercase text-xs">
                    From Quezon City / Commonwealth:
                  </strong>
                  <span>Follow Litex or Payatas road to Rodriguez Highway, proceed toward Burgos Dela Costa V Phase 2.</span>
                </div>

                <div className="p-3.5 bg-[#FBF8F3] border border-[#E5DFD5]">
                  <strong className="text-[#5B101D] block font-heading uppercase text-xs">
                    From Marikina / San Mateo:
                  </strong>
                  <span>Take Gen. Luna Ave through San Mateo directly into Rodriguez (Montalban). Pass Burgos town center into Dela Costa V.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Col 2: Reservation & Catering Inquiry Form */}
          <div className="lg:col-span-5 bg-white p-7 sm:p-9 border border-[#E5DFD5] shadow-subtle space-y-6">
            <div>
              <span className="text-xs font-bold uppercase text-[#5B101D] tracking-wider block mb-1">
                Group & Party Bookings
              </span>
              <h2 className="font-heading font-extrabold text-xl text-[#181615] uppercase">
                Send an Inquiry
              </h2>
              <p className="text-xs text-[#5C5651] mt-1">
                Reserve multiple tables for barkada celebrations or pre-order whole cuts for catering.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-6 bg-[#F2ECE1] border-2 border-[#5B101D] text-[#181615] text-center space-y-2">
                <Check className="w-8 h-8 text-[#5B101D] mx-auto" />
                <h4 className="font-heading font-extrabold text-base uppercase">
                  Inquiry Received
                </h4>
                <p className="text-xs text-[#5C5651]">
                  Our smokehouse crew will call or message your number within the day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#181615] block mb-1">Full Name:</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="e.g. Maria Santos"
                    className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-xs text-[#181615] focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#181615] block mb-1">Contact Number:</label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                    placeholder="0917-xxx-xxxx"
                    className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-xs text-[#181615] focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#181615] block mb-1">Inquiry Details or Party Size:</label>
                  <textarea
                    rows={4}
                    required
                    value={guestMessage}
                    onChange={e => setGuestMessage(e.target.value)}
                    placeholder="Tell us what date, party size, or whole cuts you would like to reserve..."
                    className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-xs text-[#181615] focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors shadow-subtle cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-[#E5DFD5] text-center">
              <span className="text-xs text-[#5C5651] block mb-2">Ready to order right now?</span>
              <button
                onClick={() => onNavigate('menu')}
                className="font-heading font-bold text-xs uppercase text-[#5B101D] hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <span>View Full Menu & Order</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
