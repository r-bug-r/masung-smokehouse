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
    <div className="min-h-screen bg-[#F5EFEB] py-12 sm:py-16 lg:py-20 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
            VISIT OUR SMOKEHOUSE
          </span>
          <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#1E1E1E]">
            LOCATIONS & CONTACT
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#5C5651] max-w-lg mx-auto">
            Find us in Montalban, Rizal and the University Belt in Manila. Dine-in, takeout, and GrabFood delivery available.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 2 Branches Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Montalban Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5DFD5] shadow-subtle space-y-5">
              <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-4">
                <div>
                  <span className="text-[10px] font-montserrat font-extrabold uppercase text-[#C67D26] tracking-wider block">
                    ORIGINAL SMOKE PIT
                  </span>
                  <h2 className="font-montserrat font-extrabold text-xl text-[#1E1E1E] uppercase">
                    Montalban Smokehouse Pit
                  </h2>
                </div>
                <span className="px-3 py-1 bg-[#5B101D] text-white text-[10px] font-montserrat font-extrabold uppercase tracking-wider rounded-sm">
                  11 AM – 10 PM
                </span>
              </div>

              <div className="space-y-3 font-body text-xs text-[#5C5651]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#5B101D] shrink-0 mt-0.5" />
                  <span>Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez, Rizal</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#5B101D] shrink-0" />
                  <span>Tue – Sun: 11:00 AM – 10:00 PM (Fresh batch daily at 4 PM)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#5B101D] shrink-0" />
                  <span>0968 237 0329</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-[#5B101D] shrink-0" />
                  <span>Street parking & motorcycle bays directly in front</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://maps.google.com/?q=Dela+Costa+V+Burgos+Rodriguez+Rizal"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex-1 py-3 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>VIEW ON MAPS</span>
                </a>
                <a
                  href="https://www.facebook.com/MasungSmokeHouse/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="py-3 px-5 bg-[#181615] hover:bg-stone-800 text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>MESSENGER</span>
                </a>
              </div>
            </div>

            {/* U-Belt Branch Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E5DFD5] shadow-subtle space-y-5">
              <div className="flex items-center justify-between border-b border-[#EAE3D9] pb-4">
                <div>
                  <span className="text-[10px] font-montserrat font-extrabold uppercase text-[#C67D26] tracking-wider block">
                    CAMPUS HUB
                  </span>
                  <h2 className="font-montserrat font-extrabold text-xl text-[#1E1E1E] uppercase">
                    U-Belt Branch (Sampaloc)
                  </h2>
                </div>
                <span className="px-3 py-1 bg-[#5B101D] text-white text-[10px] font-montserrat font-extrabold uppercase tracking-wider rounded-sm">
                  11 AM – 10 PM
                </span>
              </div>

              <div className="space-y-3 font-body text-xs text-[#5C5651]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#5B101D] shrink-0 mt-0.5" />
                  <span>Earnshaw St., Sampaloc, Manila (Short walk from UST & FEU)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#5B101D] shrink-0" />
                  <span>Tue – Sun: 11:00 AM – 10:00 PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#5B101D] shrink-0" />
                  <span>0917 882 1994</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=Sampaloc+Manila"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full py-3 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md text-center flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>VIEW ON MAPS</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Group & Event Reservation Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-[#E5DFD5] shadow-subtle space-y-6">
            <div>
              <span className="text-[10px] font-montserrat font-extrabold uppercase text-[#C67D26] tracking-wider block mb-1">
                PARTY & CATERING
              </span>
              <h2 className="font-bebas text-3xl uppercase text-[#1E1E1E] leading-tight">
                Send an Inquiry
              </h2>
              <p className="font-body text-xs text-[#5C5651]">
                Reserve full dining floors for barkada celebrations or pre-order whole smoked cuts.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-6 bg-[#FAF7F2] border-2 border-[#5B101D] text-center space-y-2 rounded-xl">
                <Check className="w-8 h-8 text-[#5B101D] mx-auto" />
                <h4 className="font-montserrat font-extrabold text-sm uppercase text-[#1E1E1E]">
                  Inquiry Received
                </h4>
                <p className="font-body text-xs text-[#5C5651]">
                  Our pitmaster crew will call or message your number within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4 font-body text-xs">
                <div>
                  <label className="font-montserrat font-bold text-[#1E1E1E] block mb-1">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="e.g. Maria Santos"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DFD5] rounded text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <div>
                  <label className="font-montserrat font-bold text-[#1E1E1E] block mb-1">
                    Contact Number:
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                    placeholder="0917-xxx-xxxx"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DFD5] rounded text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <div>
                  <label className="font-montserrat font-bold text-[#1E1E1E] block mb-1">
                    Inquiry Details or Event Date:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={guestMessage}
                    onChange={e => setGuestMessage(e.target.value)}
                    placeholder="Tell us your desired date, estimated guest count, or catering requests..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DFD5] rounded text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md transition-colors shadow-xs cursor-pointer"
                >
                  Submit Inquiry
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-[#EAE3D9] text-center">
              <span className="font-body text-xs text-[#5C5651] block mb-2">Ready to order right now?</span>
              <button
                onClick={() => onNavigate('menu')}
                className="font-montserrat font-extrabold text-xs uppercase text-[#5B101D] hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
              >
                <span>View Full Menu & Order</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C67D26]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
