import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { sanitizeText, sanitizePhone } from '../../lib/sanitize';
import { Star, CheckCircle2, Copy, Sparkles, Send, Gift } from 'lucide-react';

export const GuestFeedbackCard: React.FC = () => {
  const { applyPromoCode } = useCart();
  const { showToast } = useToast();

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedAspects, setSelectedAspects] = useState<string[]>(['Loft Space & Atmosphere']);
  const [comments, setComments] = useState('');
  const [guestContact, setGuestContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const aspects = [
    'Specialty Coffee & Barista Drinks',
    'Wood-Smoked Barbecue',
    'Loft Space & Atmosphere',
    'Host Team (Cel & Gina)',
    'Renovation Suggestions',
    'Private Event Hosting'
  ];

  const toggleAspect = (item: string) => {
    setSelectedAspects(prev => 
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanComments = sanitizeText(comments.trim());
    const cleanContact = sanitizePhone(guestContact.trim());

    const feedbackEntry = {
      id: `FB-${Date.now().toString().slice(-6)}`,
      rating,
      aspects: selectedAspects,
      comments: cleanComments,
      contact: cleanContact,
      timestamp: new Date().toISOString()
    };

    try {
      const stored = localStorage.getItem('masung_guest_feedbacks');
      const existing = stored ? JSON.parse(stored) : [];
      localStorage.setItem('masung_guest_feedbacks', JSON.stringify([feedbackEntry, ...existing]));
    } catch {
      // Fallback
    }

    setIsSubmitted(true);
    showToast('Feedback Received', 'Thank you for helping our upcoming renovation! Here is your ₱50 voucher.', 'success');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FEEDBACK50');
    setCopiedCode(true);
    showToast('Voucher Copied', 'Promo code FEEDBACK50 copied to clipboard!', 'info');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleApplyToCart = () => {
    const result = applyPromoCode('FEEDBACK50');
    if (result.success) {
      showToast('Voucher Applied', result.message, 'success');
    } else {
      showToast('Voucher Code', result.message, 'info');
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#120609] border border-[#D4AF37]/60 p-8 sm:p-10 text-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        <div className="w-14 h-14 bg-[#1C0A0F] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto">
          <Gift className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-semibold">
            Feedback Reward Unlocked
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF5F7]">
            Thank You for Shaping Masung's Next Chapter
          </h3>
          <p className="text-xs text-[#D8C7C4] font-light max-w-md mx-auto leading-relaxed">
            Your review and renovation suggestions have been logged for Cel, Gina, and our management team. As a token of our appreciation, please enjoy ₱50 off your next order.
          </p>
        </div>

        {/* Voucher Display Card */}
        <div className="max-w-md mx-auto bg-[#0A0406] border border-[#3D0C15] p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-[#A89895]">Promo Code:</span>
            <span className="text-sm font-mono font-bold text-[#D4AF37] tracking-widest bg-[#1C0A0F] px-3 py-1 border border-[#3D0C15]">
              FEEDBACK50
            </span>
          </div>
          <p className="text-[11px] text-[#A89895] text-left">
            Valid for ₱50 discount on any dine-in, takeout, or cafe order.
          </p>
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleCopyCode}
              className="flex-1 py-2.5 bg-[#1C0A0F] hover:bg-[#3D0C15] border border-[#8E1B2D] text-xs font-mono text-[#FFF5F7] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleApplyToCart}
              className="flex-1 py-2.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Apply to Order
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsSubmitted(false)}
          className="text-[11px] uppercase tracking-wider text-[#A89895] hover:text-white underline cursor-pointer"
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#120609] border border-[#3D0C15] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6">
      <div className="border-b border-[#3D0C15] pb-4">
        <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Guest Experience & Renovation Ideas</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF5F7]">
          Share Feedback, Earn ₱50 Voucher
        </h3>
        <p className="text-xs text-[#D8C7C4] font-light mt-1 leading-relaxed">
          Visited our cafe & smokehouse recently or attended an event? Tell us what you loved and how we can improve during our upcoming venue renovation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Star Rating */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-[#A89895] block font-medium">
            Overall Experience Rating
          </label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => setRating(star)}
                className="p-1 cursor-pointer transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${
                    (hoverRating !== null ? hoverRating >= star : rating >= star)
                      ? 'text-[#D4AF37] fill-[#D4AF37]'
                      : 'text-[#3D0C15] fill-transparent'
                  } transition-colors`}
                />
              </button>
            ))}
            <span className="text-xs text-[#D4AF37] font-mono ml-2 font-medium">
              {rating === 5 ? 'Exceptional' : rating === 4 ? 'Great' : rating === 3 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
        </div>

        {/* Aspects Pills */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-wider text-[#A89895] block font-medium">
            What Highlighted Your Visit?
          </label>
          <div className="flex flex-wrap gap-2">
            {aspects.map((aspect) => {
              const isSelected = selectedAspects.includes(aspect);
              return (
                <button
                  type="button"
                  key={aspect}
                  onClick={() => toggleAspect(aspect)}
                  className={`text-xs px-3 py-1.5 border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#D4AF37] bg-[#1C0A0F] text-[#D4AF37]'
                      : 'border-[#3D0C15] bg-[#0A0406] text-[#A89895] hover:border-[#8E1B2D]'
                  }`}
                >
                  {aspect}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comments Textarea */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-[#A89895] block font-medium">
            Your Comments & Renovation Suggestions
          </label>
          <textarea
            rows={3}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="e.g. Loved the iced coffee and smoked brisket! For the renovation, more mezzanine power outlets or acoustic baffles would be great."
            className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] p-3 text-xs focus:outline-none focus:border-[#D4AF37] leading-relaxed resize-none"
          />
        </div>

        {/* Optional Contact Number */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-[#A89895] block font-medium">
            Mobile Number (Optional — to connect feedback with your Pit Pass profile)
          </label>
          <input
            type="tel"
            placeholder="e.g. 0917 123 4567"
            value={guestContact}
            onChange={(e) => setGuestContact(e.target.value)}
            className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#D4AF37] font-mono"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-[#D4AF37]/20"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit Review & Claim ₱50 Voucher</span>
        </button>
      </form>
    </div>
  );
};
