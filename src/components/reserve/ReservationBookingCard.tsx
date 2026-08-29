import React, { useState } from 'react';
import type { ReserveBooking } from '../../types';
import { useToast } from '../../context/ToastContext';
import { sanitizeText, sanitizePhone } from '../../lib/sanitize';
import { Calendar, Clock, Users, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface ReservationBookingCardProps {
  onSuccess?: (booking: ReserveBooking) => void;
}

export const ReservationBookingCard: React.FC<ReservationBookingCardProps> = ({ onSuccess }) => {
  const { showToast } = useToast();

  const [date, setDate] = useState<string>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const [timeSlot, setTimeSlot] = useState('06:00 PM');
  const [partySize, setPartySize] = useState(4);
  const [seatingZone, setSeatingZone] = useState<'hearth' | 'smoker_bar' | 'billiards_alcove' | 'garden_terrace'>('hearth');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<ReserveBooking | null>(null);

  const timeSlots = [
    '04:30 PM', '05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:30 PM'
  ];

  const seatingOptions: { id: typeof seatingZone; label: string; desc: string }[] = [
    { id: 'hearth', label: 'Hearth Dining Room', desc: 'Central dining adjacent to the carving station' },
    { id: 'smoker_bar', label: 'Smoker Bar Counter', desc: 'High-top lounge with craft iced drinks' },
    { id: 'billiards_alcove', label: 'Billiards Alcove', desc: 'Corner booth with complimentary pool table access' },
    { id: 'garden_terrace', label: 'Evening Terrace', desc: 'Cool Montalban mountain evening breeze' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = sanitizeText(guestName.trim());
    const cleanPhone = sanitizePhone(guestPhone.trim());
    const cleanRequests = sanitizeText(specialRequests.trim());

    if (!cleanName) {
      showToast('Name Required', 'Please enter a name for the reservation.', 'info');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 10) {
      showToast('Phone Required', 'Please provide a valid 11-digit mobile number.', 'info');
      return;
    }

    const newBooking: ReserveBooking = {
      id: `MS-RES-${Math.floor(100000 + Math.random() * 900000)}`,
      guestName: cleanName,
      guestPhone: cleanPhone,
      date,
      timeSlot,
      partySize,
      seatingZone,
      specialRequests: cleanRequests,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save reservation locally in localStorage for persistent visitor record
    try {
      const stored = localStorage.getItem('masung_reservations');
      const existing: ReserveBooking[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem('masung_reservations', JSON.stringify([newBooking, ...existing]));
    } catch {
      // Local storage fallback
    }

    setConfirmedBooking(newBooking);
    showToast('Reservation Reserved', `Booking confirmed for ${newBooking.guestName}! Reference: ${newBooking.id}`, 'success');

    if (onSuccess) {
      onSuccess(newBooking);
    }
  };

  if (confirmedBooking) {
    return (
      <div className="bg-[#120609] border border-[#3D0C15] p-8 sm:p-12 text-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-in fade-in duration-300">
        <div className="w-16 h-16 bg-[#1C0A0F] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-semibold">
            Confirmed Table Reservation
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#FFF5F7]">
            We Look Forward to Welcoming You
          </h3>
          <p className="text-xs text-[#D8C7C4] font-light max-w-md mx-auto">
            Your table reservation has been logged into the Masung Steakhouse concierge books.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-[#0A0406] border border-[#3D0C15] p-6 text-left space-y-3 font-mono text-xs">
          <div className="flex justify-between border-b border-[#3D0C15] pb-2">
            <span className="text-[#A89895]">Booking Reference:</span>
            <strong className="text-[#D4AF37]">{confirmedBooking.id}</strong>
          </div>
          <div className="flex justify-between border-b border-[#3D0C15] pb-2">
            <span className="text-[#A89895]">Guest Name:</span>
            <span className="text-[#FFF5F7] font-sans">{confirmedBooking.guestName}</span>
          </div>
          <div className="flex justify-between border-b border-[#3D0C15] pb-2">
            <span className="text-[#A89895]">Date & Time:</span>
            <span className="text-[#FFF5F7]">{confirmedBooking.date} • {confirmedBooking.timeSlot}</span>
          </div>
          <div className="flex justify-between border-b border-[#3D0C15] pb-2">
            <span className="text-[#A89895]">Party Size:</span>
            <span className="text-[#FFF5F7]">{confirmedBooking.partySize} Guests</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#A89895]">Dining Area:</span>
            <span className="text-[#D4AF37] uppercase">{confirmedBooking.seatingZone.replace('_', ' ')}</span>
          </div>
        </div>

        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => setConfirmedBooking(null)}
            className="px-6 py-3 border border-[#3D0C15] hover:border-[#D4AF37] text-xs uppercase tracking-widest text-[#D8C7C4] hover:text-white transition-all cursor-pointer"
          >
            Reserve Another Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#120609] border border-[#3D0C15] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#3D0C15] pb-5">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-semibold mb-1">
          Direct Concierge Booking
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF5F7]">
          Reserve a Dining Table
        </h3>
        <p className="text-xs text-[#D8C7C4] font-light mt-1">
          Complimentary table reservations with guaranteed pit cut allocations.
        </p>
      </div>

      {/* Date, Time & Party Size */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Date */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-[#A89895] flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            Dining Date
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D4AF37] font-mono cursor-pointer"
          />
        </div>

        {/* Time Slot */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-[#A89895] flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            Seating Time
          </label>
          <select
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D4AF37] font-mono cursor-pointer"
          >
            {timeSlots.map((ts) => (
              <option key={ts} value={ts} className="bg-[#0A0406] text-white">
                {ts}
              </option>
            ))}
          </select>
        </div>

        {/* Party Size */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-[#A89895] flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
            Party Size
          </label>
          <div className="flex items-center gap-2">
            {[2, 4, 6, 8, 12].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => setPartySize(num)}
                className={`flex-1 py-2 text-xs font-mono font-bold border transition-all cursor-pointer ${
                  partySize === num
                    ? 'border-[#D4AF37] bg-[#1C0A0F] text-[#D4AF37]'
                    : 'border-[#3D0C15] bg-[#0A0406] text-[#A89895] hover:border-[#8E1B2D]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Seating Zone Radio Pills */}
      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-wider text-[#A89895] flex items-center gap-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          Select Seating Ambience
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {seatingOptions.map((opt) => (
            <button
              type="button"
              key={opt.id}
              onClick={() => setSeatingZone(opt.id)}
              className={`p-3.5 text-left border transition-all cursor-pointer ${
                seatingZone === opt.id
                  ? 'border-[#D4AF37] bg-[#1C0A0F] text-white shadow-[0_0_12px_rgba(142,27,45,0.25)]'
                  : 'border-[#3D0C15] bg-[#0A0406]/60 text-[#D8C7C4] hover:border-[#8E1B2D]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#FFF5F7]">
                  {opt.label}
                </span>
                {seatingZone === opt.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                )}
              </div>
              <p className="text-[11px] text-[#A89895] font-light mt-0.5">
                {opt.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Guest Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-[#3D0C15]">
        
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-[#A89895] block font-medium">
            Lead Guest Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Mateo Villanueva"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
            className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-[#A89895] block font-medium">
            Contact Mobile Number (For SMS Confirmation) *
          </label>
          <input
            type="tel"
            placeholder="e.g. 0917 123 4567"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            required
            className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D4AF37] font-mono"
          />
        </div>

      </div>

      {/* Special Requests */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-wider text-[#A89895] block font-medium">
          Special Notes or Dietary Requests (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g. Celebrating wedding anniversary; request well-done pepper bark."
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D4AF37]"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-4 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#D4AF37]/20"
      >
        <span>Confirm Table Reservation</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-center gap-2 text-[10px] text-[#A89895] uppercase tracking-wider">
        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>No reservation fees • Free cancellation up to 1 hour before</span>
      </div>

    </form>
  );
};
