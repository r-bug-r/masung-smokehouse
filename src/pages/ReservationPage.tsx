import React, { useState, useEffect } from 'react';
import type { PageId, ReserveBooking } from '../types';
import { useToast } from '../context/ToastContext';
import { sanitizeText, sanitizePhoneNumber } from '../lib/sanitize';
import { 
  CheckCircle2, 
  CalendarCheck, 
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReservationPageProps {
  onNavigate: (page: PageId) => void;
}

const STORAGE_KEY = 'masung_table_reservations';

const DEFAULT_RESERVATIONS: ReserveBooking[] = [
  {
    id: 'RES-8101',
    bookingRef: 'RES-8101',
    guestName: 'Patricia Mendoza',
    guestPhone: '0917-882-9090',
    date: '2026-09-02',
    timeSlot: '06:00 PM',
    partySize: 6,
    seatingZone: 'first_floor',
    eventType: 'Dinner Gathering',
    specialRequests: 'Near front window if available.',
    status: 'confirmed',
    createdAt: '2026-08-29'
  },
  {
    id: 'RES-8102',
    bookingRef: 'RES-8102',
    guestName: 'Capt. Daniel Cruz',
    guestPhone: '0922-441-1122',
    date: '2026-09-03',
    timeSlot: '07:30 PM',
    partySize: 8,
    seatingZone: 'second_floor',
    eventType: 'Family Dinner',
    status: 'confirmed',
    createdAt: '2026-08-30'
  }
];

export const ReservationPage: React.FC<ReservationPageProps> = ({ onNavigate: _onNavigate }) => {
  const { showToast } = useToast();


  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });

  const [timeSlot, setTimeSlot] = useState('06:00 PM');
  const [partySize, setPartySize] = useState(4);
  const [seatingZone, setSeatingZone] = useState<'first_floor' | 'second_floor' | 'full_venue'>('first_floor');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<ReserveBooking | null>(null);

  const [reservationsList, setReservationsList] = useState<ReserveBooking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_RESERVATIONS;
    } catch {
      return DEFAULT_RESERVATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservationsList));
    } catch {
      // ignore
    }
  }, [reservationsList]);

  const seatingOptions = [
    {
      id: 'first_floor' as const,
      name: '1st Floor (Tables 01 – 11)',
      desc: '11 dining tables on the ground floor.'
    },
    {
      id: 'second_floor' as const,
      name: '2nd Floor (Tables 12 – 15)',
      desc: '4 dining tables on the upper floor.'
    },
    {
      id: 'full_venue' as const,
      name: 'Full Floor Event Buyout',
      desc: 'Reserved floor for large barkada celebrations.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = sanitizeText(guestName.trim()) || 'Guest';
    const cleanPhone = sanitizePhoneNumber(guestPhone.trim()) || '09xx-xxx-xxxx';
    const cleanNotes = specialRequests ? sanitizeText(specialRequests.trim(), 200) : undefined;

    const ref = `RES-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: ReserveBooking = {
      id: ref,
      bookingRef: ref,
      guestName: cleanName,
      guestPhone: cleanPhone,
      date,
      timeSlot,
      partySize,
      seatingZone,
      specialRequests: cleanNotes,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setReservationsList(prev => [newBooking, ...prev]);
    setConfirmedBooking(newBooking);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });

    showToast('Table Reserved', `Booking ${ref} confirmed!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F5EFEB] py-12 sm:py-16 lg:py-20 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
            TABLE & EVENT RESERVATIONS
          </span>
          <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#1E1E1E]">
            BOOK YOUR SMOKEHOUSE SEATS
          </h1>
          <p className="font-body text-xs sm:text-sm text-[#5C5651] max-w-lg mx-auto">
            15 total dining tables across two floors in Rodriguez, Rizal and U-Belt Manila. Reserve in advance with zero booking fees.
          </p>
        </div>

        {/* Confirmed Confirmation Voucher */}
        {confirmedBooking && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border-2 border-emerald-600 p-6 sm:p-8 shadow-elevated text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-emerald-700 block">
                BOOKING CONFIRMED
              </span>
              <h2 className="font-bebas text-3xl uppercase text-[#1E1E1E]">
                Reference #{confirmedBooking.bookingRef}
              </h2>
              <p className="font-body text-xs text-[#5C5651]">
                Salamat, {confirmedBooking.guestName}! Your table has been reserved for {confirmedBooking.date} at {confirmedBooking.timeSlot} ({confirmedBooking.partySize} guests).
              </p>
            </div>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-6 py-2.5 bg-[#5B101D] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md"
            >
              Book Another Table
            </button>
          </div>
        )}

        {/* 2-Column Booking Form & Floor Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Booking Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD5] shadow-subtle space-y-6">
            <div className="pb-4 border-b border-[#EAE3D9]">
              <h2 className="font-bebas text-2xl uppercase text-[#1E1E1E]">
                Reservation Details
              </h2>
              <p className="font-body text-xs text-[#5C5651]">
                Fill out your details to secure table space for your barkada.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-body text-xs">
              
              {/* Floor Seating Zone */}
              <div>
                <label className="font-montserrat font-bold text-[#1E1E1E] uppercase tracking-wider block mb-2">
                  Select Seating Floor:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {seatingOptions.map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSeatingZone(opt.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        seatingZone === opt.id
                          ? 'bg-[#5B101D] text-white border-[#5B101D] shadow-xs'
                          : 'bg-[#FAF7F2] text-[#5C5651] border-[#E5DFD5] hover:border-[#5B101D]'
                      }`}
                    >
                      <strong className="font-montserrat font-bold text-xs uppercase block">
                        {opt.name}
                      </strong>
                      <span className="text-[11px] opacity-80 block mt-1">
                        {opt.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-montserrat font-bold text-[#1E1E1E] uppercase tracking-wider block mb-1">
                    Reservation Date:
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DFD5] rounded text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <div>
                  <label className="font-montserrat font-bold text-[#1E1E1E] uppercase tracking-wider block mb-1">
                    Time Slot:
                  </label>
                  <select
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DFD5] rounded text-xs focus:outline-none focus:border-[#5B101D]"
                  >
                    <option value="12:00 PM">12:00 PM (Lunch)</option>
                    <option value="01:30 PM">01:30 PM (Lunch)</option>
                    <option value="04:00 PM">04:00 PM (Early Dinner)</option>
                    <option value="06:00 PM">06:00 PM (Prime Dinner)</option>
                    <option value="07:30 PM">07:30 PM (Prime Dinner)</option>
                    <option value="09:00 PM">09:00 PM (Late Dinner)</option>
                  </select>
                </div>
              </div>

              {/* Party Size, Name & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-montserrat font-bold text-[#1E1E1E] uppercase tracking-wider block mb-1">
                    Party Size:
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    required
                    value={partySize}
                    onChange={e => setPartySize(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DFD5] rounded text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <div>
                  <label className="font-montserrat font-bold text-[#1E1E1E] uppercase tracking-wider block mb-1">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="e.g. Patricia Mendoza"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DFD5] rounded text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <div>
                  <label className="font-montserrat font-bold text-[#1E1E1E] uppercase tracking-wider block mb-1">
                    Mobile Number:
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
              </div>

              {/* Special Requests */}
              <div>
                <label className="font-montserrat font-bold text-[#1E1E1E] uppercase tracking-wider block mb-1">
                  Special Notes / Occasion (Optional):
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={e => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Birthday celebration, high chair needed..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E5DFD5] rounded text-xs focus:outline-none focus:border-[#5B101D]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#C67D26]" />
                <span>Confirm Reservation</span>
              </button>

            </form>
          </div>

          {/* Right Column: Seating Capacity Guide */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5DFD5] shadow-subtle space-y-5">
              <div className="pb-4 border-b border-[#EAE3D9]">
                <h3 className="font-bebas text-2xl uppercase text-[#1E1E1E]">
                  Dining Space Capacity
                </h3>
                <p className="font-body text-xs text-[#5C5651]">
                  15 curated tables tailored for solo diners, barkadas, and family feasts.
                </p>
              </div>

              <div className="space-y-4 font-body text-xs text-[#5C5651]">
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1">
                  <strong className="font-montserrat font-extrabold text-xs text-[#5B101D] uppercase block">
                    1st Floor: Ground Dining (11 Tables)
                  </strong>
                  <p>
                    Fast-casual communal tables right near the counter and hot soup refill kettle.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1">
                  <strong className="font-montserrat font-extrabold text-xs text-[#5B101D] uppercase block">
                    2nd Floor: Upper Mezzanine (4 Tables)
                  </strong>
                  <p>
                    Cozy mezzanine space with comfortable seating for larger groups and quiet study breaks.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[#5B101D] pt-2">
                  <Users className="w-4 h-4" />
                  <span className="font-montserrat font-bold text-xs">
                    Total Capacity: 60+ Seats across both floors
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
