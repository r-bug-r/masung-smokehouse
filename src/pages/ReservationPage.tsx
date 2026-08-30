import React, { useState, useEffect } from 'react';
import type { PageId, ReserveBooking } from '../types';
import { useToast } from '../context/ToastContext';
import { sanitizeText, sanitizePhoneNumber } from '../lib/sanitize';
import { 
  CheckCircle2, 
  CalendarCheck, 
  Check, 
  MapPin 
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

export const ReservationPage: React.FC<ReservationPageProps> = ({ onNavigate }) => {
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
      desc: '11 tables on the ground floor.'
    },
    {
      id: 'second_floor' as const,
      name: '2nd Floor (Tables 12 – 15)',
      desc: '4 tables on the upper floor.'
    },
    {
      id: 'full_venue' as const,
      name: 'Full Floor Buyout',
      desc: 'Reserved floor for private group gatherings.'
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

  const handleUpdateStatus = (id: string, status: 'confirmed' | 'pending' | 'seated') => {
    setReservationsList(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    showToast('Updated', `Status set to ${status}`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] py-8 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-2.5 py-0.5 inline-block">
            Montalban, Rizal
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-[#181615] tracking-tight">
            Reserve a Table
          </h1>
          <p className="text-xs text-[#5C5651]">
            11 tables on the 1st floor • 4 tables on the 2nd floor
          </p>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking && (
          <div className="bg-white border-2 border-green-700 p-6 sm:p-8 max-w-xl mx-auto space-y-5">
            <div className="text-center space-y-1.5 pb-4 border-b border-[#E5DFD5]">
              <CheckCircle2 className="w-10 h-10 text-green-700 mx-auto" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C67D26]">
                Confirmed
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#181615]">
                Ref #{confirmedBooking.bookingRef}
              </h2>
              <p className="text-xs text-[#5C5651]">
                Reserved for <strong>{confirmedBooking.guestName}</strong> ({confirmedBooking.partySize} Guests)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-[#FBF8F3] border border-[#E5DFD5]">
                <div className="text-[10px] text-[#8A837C] uppercase">Date</div>
                <div className="font-bold text-[#181615]">{confirmedBooking.date}</div>
              </div>
              <div className="p-2.5 bg-[#FBF8F3] border border-[#E5DFD5]">
                <div className="text-[10px] text-[#8A837C] uppercase">Time</div>
                <div className="font-bold text-[#181615]">{confirmedBooking.timeSlot}</div>
              </div>
              <div className="p-2.5 bg-[#FBF8F3] border border-[#E5DFD5]">
                <div className="text-[10px] text-[#8A837C] uppercase">Seating</div>
                <div className="font-bold text-[#181615]">
                  {confirmedBooking.seatingZone === 'first_floor' ? '1st Floor (Tables 1-11)' : confirmedBooking.seatingZone === 'second_floor' ? '2nd Floor (Tables 12-15)' : 'Full Floor'}
                </div>
              </div>
              <div className="p-2.5 bg-[#FBF8F3] border border-[#E5DFD5]">
                <div className="text-[10px] text-[#8A837C] uppercase">Contact</div>
                <div className="font-bold text-[#181615]">{confirmedBooking.guestPhone}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setConfirmedBooking(null)}
                className="flex-1 py-2.5 bg-[#5B101D] text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                New Reservation
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="flex-1 py-2.5 bg-[#C67D26] text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                View Menu →
              </button>
            </div>
          </div>
        )}

        {/* Booking Form */}
        {!confirmedBooking && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <form onSubmit={handleSubmit} className="lg:col-span-8 bg-white border border-[#E5DFD5] p-5 sm:p-6 space-y-5">
              
              {/* Floor Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#181615] block">
                  Select Seating Area:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {seatingOptions.map(opt => {
                    const isSelected = seatingZone === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => setSeatingZone(opt.id)}
                        className={`p-3 border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#FBF8F3] border-[#5B101D] ring-1 ring-[#5B101D]'
                            : 'bg-white border-[#E5DFD5] hover:border-[#C67D26]'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-0.5">
                          <span className="font-heading font-extrabold text-xs uppercase text-[#181615]">
                            {opt.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#5B101D]" />}
                        </div>
                        <p className="text-[11px] text-[#5C5651]">
                          {opt.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Schedule and Party */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-bold text-[#181615] uppercase tracking-wider block mb-1">
                    Date:
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full p-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs font-bold focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#181615] uppercase tracking-wider block mb-1">
                    Time:
                  </label>
                  <select
                    value={timeSlot}
                    onChange={e => setTimeSlot(e.target.value)}
                    className="w-full p-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs font-semibold focus:outline-none focus:border-[#5B101D]"
                  >
                    <option value="12:00 PM">12:00 PM (Lunch)</option>
                    <option value="01:30 PM">01:30 PM (Afternoon)</option>
                    <option value="04:00 PM">04:00 PM (Opening)</option>
                    <option value="05:30 PM">05:30 PM (Early Dinner)</option>
                    <option value="06:00 PM">06:00 PM (Dinner)</option>
                    <option value="07:30 PM">07:30 PM (Peak)</option>
                    <option value="08:45 PM">08:45 PM (Late)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#181615] uppercase tracking-wider block mb-1">
                    Guests:
                  </label>
                  <div className="flex items-center border border-[#E5DFD5] bg-[#FBF8F3]">
                    <button
                      type="button"
                      onClick={() => setPartySize(Math.max(1, partySize - 1))}
                      className="px-3 py-1.5 font-bold hover:bg-[#E5DFD5] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-xs">
                      {partySize} {partySize === 1 ? 'Guest' : 'Guests'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPartySize(partySize + 1)}
                      className="px-3 py-1.5 font-bold hover:bg-[#E5DFD5] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1 border-t border-[#E5DFD5]">
                <div>
                  <label className="font-bold text-[#181615] uppercase tracking-wider block mb-1">
                    Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="Full name"
                    className="w-full p-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#181615] uppercase tracking-wider block mb-1">
                    Mobile:
                  </label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                    placeholder="0917-xxx-xxxx"
                    className="w-full p-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-bold text-[#181615] uppercase tracking-wider block mb-1">
                    Special Requests (Optional):
                  </label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={e => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Birthday, high chair, dietary preference"
                    className="w-full p-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <CalendarCheck className="w-4 h-4 text-[#C67D26]" />
                <span>Confirm Reservation</span>
              </button>

            </form>

            {/* Quick Info Card */}
            <div className="lg:col-span-4 bg-white border border-[#E5DFD5] p-5 space-y-4 text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E5DFD5]">
                <MapPin className="w-4 h-4 text-[#5B101D]" />
                <strong className="font-heading uppercase text-[#181615]">Location & Hours</strong>
              </div>

              <div className="space-y-2 text-[#5C5651]">
                <p>
                  <strong>Address:</strong><br />
                  Block 43 Lot 13 Phase 02 Dela Costa V, Burgos, Rodriguez, Rizal
                </p>
                <p>
                  <strong>Hours:</strong><br />
                  Tuesday – Sunday: 4:00 PM – 11:00 PM<br />
                  (Closed Mondays for pit curing)
                </p>
                <p>
                  <strong>Phone:</strong><br />
                  0968 237 0329
                </p>
              </div>

              <div className="pt-2 border-t border-[#E5DFD5]">
                <span className="text-[10px] text-[#8A837C] block uppercase font-mono">
                  Seating Capacity
                </span>
                <span className="text-xs font-bold text-[#181615]">
                  11 Tables (1st Floor) • 4 Tables (2nd Floor)
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Live Reservation Board */}
        <div className="bg-white border border-[#E5DFD5] p-5 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-[#E5DFD5]">
            <h3 className="font-heading font-extrabold text-sm uppercase text-[#181615]">
              Upcoming Reservations ({reservationsList.length})
            </h3>
            <span className="text-[10px] font-mono text-[#8A837C]">
              Host Desk
            </span>
          </div>

          <div className="divide-y divide-[#E5DFD5] text-xs">
            {reservationsList.map(res => (
              <div key={res.id} className="py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#5B101D]">#{res.id}</span>
                    <strong className="text-[#181615]">{res.guestName}</strong>
                    <span className="text-[#8A837C]">({res.partySize}pax)</span>
                  </div>
                  <div className="text-[#5C5651] text-[11px]">
                    {res.date} • {res.timeSlot} • {res.seatingZone === 'first_floor' ? '1st Floor (Tables 1-11)' : res.seatingZone === 'second_floor' ? '2nd Floor (Tables 12-15)' : 'Full Floor'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 font-bold uppercase text-[9px] ${
                    res.status === 'seated'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {res.status}
                  </span>
                  <button
                    onClick={() => handleUpdateStatus(res.id, res.status === 'seated' ? 'confirmed' : 'seated')}
                    className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-[#181615] text-[10px] border border-[#E5DFD5] cursor-pointer"
                  >
                    {res.status === 'seated' ? 'Undo' : 'Mark Seated'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
