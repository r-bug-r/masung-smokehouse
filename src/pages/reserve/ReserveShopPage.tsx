import React, { useState } from 'react';
import type { PageId, SmokehouseOrder } from '../../types';
import { useCart } from '../../context/CartContext';
import { useLoyalty } from '../../context/LoyaltyContext';
import { useToast } from '../../context/ToastContext';
import { MENU_ITEMS } from '../../data/menuData';
import { sanitizeText, sanitizePhone, sanitizePromoCode } from '../../lib/sanitize';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  CheckCircle2, 
  Copy, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SafeImage } from '../../components/SafeImage';

interface ReserveShopPageProps {
  onNavigate: (page: PageId) => void;
}

export const ReserveShopPage: React.FC<ReserveShopPageProps> = ({ onNavigate }) => {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    subtotal, 
    discountAmount, 
    finalTotal,
    appliedReward,
    applyPromoCode,
    addItem
  } = useCart();

  const { recordOrder, profile } = useLoyalty();
  const { showToast } = useToast();

  const [orderType, setOrderType] = useState<'dine-in' | 'takeout'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 01');
  const [customerName, setCustomerName] = useState(profile.name || '');
  const [customerPhone, setCustomerPhone] = useState(profile.phone || '');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [submittedOrder, setSubmittedOrder] = useState<SmokehouseOrder | null>(null);
  const [copiedSlip, setCopiedSlip] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = sanitizePromoCode(promoCodeInput);
    if (!cleanCode) return;

    const result = applyPromoCode(cleanCode);
    if (result.success) {
      showToast('Voucher Applied', result.message, 'reward');
      setPromoCodeInput('');
    } else {
      showToast('Invalid Code', result.message, 'info');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      showToast('Tray Empty', 'Please add cuts to your order tray first.', 'info');
      return;
    }

    const cleanName = sanitizeText(customerName.trim());
    const cleanPhone = sanitizePhone(customerPhone.trim());
    const cleanNotes = sanitizeText(specialInstructions.trim());

    if (!cleanName) {
      showToast('Name Required', 'Please provide a name for this order.', 'info');
      return;
    }

    const pointsEarned = Math.floor(finalTotal / 10);
    const newOrder: SmokehouseOrder = {
      id: `MS-${Date.now().toString().slice(-6)}`,
      tableNumber: orderType === 'dine-in' ? tableNumber : 'Takeout',
      orderType,
      customerName: cleanName,
      customerPhone: cleanPhone,
      items: [...items],
      subtotal,
      discountAmount,
      finalTotal,
      pointsEarned,
      status: 'pit_smoking',
      timestamp: new Date().toISOString(),
      specialInstructions: cleanNotes
    };

    recordOrder(newOrder);
    setSubmittedOrder(newOrder);
    clearCart();
    showToast('Order Confirmed', `Order ${newOrder.id} dispatched to the carving station!`, 'success');
  };

  const handleCopySlip = () => {
    if (!submittedOrder) return;
    const slip = `--- MASUNG STEAKHOUSE ORDER #${submittedOrder.id} ---
Type: ${submittedOrder.orderType === 'dine-in' ? submittedOrder.tableNumber : 'Takeout'}
Guest: ${submittedOrder.customerName} (${submittedOrder.customerPhone})
Items:
${submittedOrder.items.map((i) => `• ${i.quantity}x ${i.item.name} ${i.selectedVariant ? `(${i.selectedVariant.label})` : ''} - ₱${(i.selectedVariant ? i.selectedVariant.price : i.item.price) * i.quantity}`).join('\n')}
Subtotal: ₱${submittedOrder.subtotal}
Discount: ₱${submittedOrder.discountAmount}
TOTAL: ₱${submittedOrder.finalTotal}
Points Earned: +${submittedOrder.pointsEarned} PTS
Notes: ${submittedOrder.specialInstructions || 'None'}
Timestamp: ${new Date(submittedOrder.timestamp).toLocaleString()}`;

    navigator.clipboard.writeText(slip);
    setCopiedSlip(true);
    showToast('Slip Copied', 'Order details copied to clipboard.', 'success');
    setTimeout(() => setCopiedSlip(false), 2500);
  };

  const signatureCuts = MENU_ITEMS.filter((m) => m.popular).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0A0406] text-[#F3ECE6] py-12 sm:py-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4AF37] block">
            Carving Station Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#FFF5F7] tracking-tight">
            Your Carving Board
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7C4] font-light">
            Review your selected smoked cuts, enter your dining table or takeout details, and dispatch directly to the kitchen.
          </p>
        </div>

        {submittedOrder ? (
          /* Confirmation Screen */
          <div className="max-w-2xl mx-auto bg-[#120609] border border-[#3D0C15] p-8 sm:p-12 text-center space-y-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="w-16 h-16 bg-[#1C0A0F] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-semibold">
                Kitchen Order Received
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FFF5F7]">
                Carving in Progress
              </h2>
              <p className="text-xs text-[#D8C7C4] font-light">
                Our pitmaster is slicing your cuts fresh from the wood smoker. Your table server will present your dishes shortly.
              </p>
            </div>

            <div className="bg-[#0A0406] border border-[#3D0C15] p-6 text-left space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-[#3D0C15] pb-2">
                <span className="text-[#A89895]">Order Reference:</span>
                <strong className="text-[#D4AF37]">{submittedOrder.id}</strong>
              </div>
              <div className="flex justify-between border-b border-[#3D0C15] pb-2">
                <span className="text-[#A89895]">Service Mode:</span>
                <span className="text-[#FFF5F7] uppercase">{submittedOrder.tableNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#3D0C15] pb-2">
                <span className="text-[#A89895]">Guest Name:</span>
                <span className="text-[#FFF5F7] font-sans">{submittedOrder.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-[#3D0C15] pb-2">
                <span className="text-[#A89895]">Total Paid:</span>
                <strong className="text-[#D4AF37] text-sm">₱{submittedOrder.finalTotal}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A89895]">Points Earned:</span>
                <span className="text-[#D4AF37]">+{submittedOrder.pointsEarned} BBQ PTS</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <button
                onClick={handleCopySlip}
                className="px-6 py-3.5 bg-[#1C0A0F] hover:bg-[#3D0C15] text-[#FFF5F7] border border-[#3D0C15] text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Copy className="w-4 h-4 text-[#D4AF37]" />
                <span>{copiedSlip ? 'Slip Copied!' : 'Copy Order Slip'}</span>
              </button>
              <button
                onClick={() => setSubmittedOrder(null)}
                className="px-6 py-3.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-widest cursor-pointer transition-all"
              >
                Start New Order
              </button>
            </div>
          </div>
        ) : (
          /* Main 2-Column Carving Board Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Col: Board Items */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-[#120609] border border-[#3D0C15] p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center justify-between border-b border-[#3D0C15] pb-4">
                  <h2 className="font-serif text-2xl text-[#FFF5F7] flex items-center gap-2.5">
                    <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                    <span>Selected Cuts & Plates</span>
                  </h2>
                  <span className="text-xs font-mono text-[#D4AF37]">
                    {items.length} {items.length === 1 ? 'Line Item' : 'Line Items'}
                  </span>
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-12 space-y-4">
                    <p className="text-xs text-[#A89895] uppercase tracking-wider">
                      Your Carving Board is Currently Empty
                    </p>
                    <p className="text-xs text-[#D8C7C4] font-light max-w-sm mx-auto">
                      Select cuts from our reserve collection below to begin your table service.
                    </p>
                    <button
                      onClick={() => onNavigate('reserve-menu')}
                      className="px-6 py-3 bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-widest hover:bg-[#B89327] cursor-pointer"
                    >
                      Browse Reserve Menu
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#3D0C15]/70">
                    {items.map((cartItem) => {
                      const itemPrice = cartItem.selectedVariant
                        ? cartItem.selectedVariant.price
                        : cartItem.item.price;

                      return (
                        <div key={cartItem.id} className="py-4 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 shrink-0 overflow-hidden border border-[#3D0C15] rounded-xs">
                              <SafeImage
                                src={cartItem.item.imageUrl}
                                alt={cartItem.item.name}
                                category={cartItem.item.category}
                                fallbackSrc="/masung_brisket_food_asset_hd.png"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-serif text-base sm:text-lg text-[#FFF5F7]">
                                {cartItem.item.name}
                              </h4>
                              {cartItem.selectedVariant && (
                                <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider block font-mono">
                                  {cartItem.selectedVariant.label}
                                </span>
                              )}
                              <span className="text-xs font-mono text-[#D8C7C4]">
                                ₱{itemPrice} each
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center border border-[#3D0C15] bg-[#0A0406]">
                              <button
                                onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                                className="p-2 text-[#A89895] hover:text-white cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2.5 text-xs font-mono font-bold text-[#FFF5F7]">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                                className="p-2 text-[#A89895] hover:text-white cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-sm font-serif font-bold text-[#D4AF37] w-16 text-right">
                              ₱{itemPrice * cartItem.quantity}
                            </span>

                            <button
                              onClick={() => removeItem(cartItem.id)}
                              className="text-[#A89895] hover:text-[#8E1B2D] p-1 cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

              </div>

              {/* Quick Add Suggestions */}
              <div className="bg-[#120609] border border-[#3D0C15] p-6 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block font-semibold">
                  Chef's Pit Recommendation
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {signatureCuts.map((cut) => (
                    <div key={cut.id} className="p-3 bg-[#0A0406] border border-[#3D0C15] flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-serif font-bold text-[#FFF5F7] block truncate">
                          {cut.name}
                        </span>
                        <span className="text-[11px] font-mono text-[#D4AF37] block">
                          ₱{cut.price}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          addItem(cut);
                          showToast('Added to Board', `${cut.name} • ₱${cut.price}`, 'success');
                        }}
                        className="mt-3 w-full py-1.5 bg-[#1C0A0F] hover:bg-[#3D0C15] text-[10px] uppercase tracking-wider text-[#FFF5F7] border border-[#3D0C15] cursor-pointer"
                      >
                        + Add To Board
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col: Service Info, Promo & Order Submission */}
            <div className="lg:col-span-5 space-y-6">
              
              <form onSubmit={handleCheckout} className="bg-[#120609] border border-[#3D0C15] p-6 sm:p-8 space-y-6">
                
                <h3 className="font-serif text-2xl text-[#FFF5F7] border-b border-[#3D0C15] pb-3">
                  Service & Dining Details
                </h3>

                {/* Service Mode Selector */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`py-2.5 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                      orderType === 'dine-in'
                        ? 'border-[#D4AF37] bg-[#1C0A0F] text-[#FFF5F7]'
                        : 'border-[#3D0C15] bg-[#0A0406] text-[#A89895]'
                    }`}
                  >
                    Dine-In Table
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('takeout')}
                    className={`py-2.5 text-xs uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
                      orderType === 'takeout'
                        ? 'border-[#D4AF37] bg-[#1C0A0F] text-[#FFF5F7]'
                        : 'border-[#3D0C15] bg-[#0A0406] text-[#A89895]'
                    }`}
                  >
                    Takeout Box
                  </button>
                </div>

                {/* Table Number or Takeout Note */}
                {orderType === 'dine-in' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-[#A89895] block font-medium">
                      Table / Station Number
                    </label>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] font-mono cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((t) => (
                        <option key={t} value={`Table ${t < 10 ? '0' + t : t} (1st Floor)`} className="bg-[#0A0406] text-white">
                          Table {t < 10 ? '0' + t : t} (1st Floor)
                        </option>
                      ))}
                      {[12, 13, 14, 15].map((t) => (
                        <option key={t} value={`Table ${t} (2nd Floor)`} className="bg-[#0A0406] text-white">
                          Table {t} (2nd Floor)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Guest Name & Mobile */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#A89895] block">
                      Lead Guest Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sofia Dimayuga"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-[#A89895] block">
                      Mobile Number (For Order Updates)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 0968 237 0329"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] font-mono"
                    />
                  </div>
                </div>

                {/* Carving Notes */}
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-[#A89895] block">
                    Special Carving Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lean cut preferred; extra bone broth on arrival."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Promo Code Entry */}
                <div className="space-y-1.5 border-t border-[#3D0C15] pt-4">
                  <label className="text-[10px] uppercase tracking-wider text-[#A89895] block">
                    Concierge Voucher or Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. MASUNG10 or MASUNGFB50"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="flex-1 bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3 py-2 text-xs uppercase font-mono focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-[#1C0A0F] hover:bg-[#3D0C15] text-[#D4AF37] border border-[#3D0C15] text-xs uppercase tracking-wider font-semibold cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedReward && (
                    <p className="text-[10px] text-[#D4AF37] font-mono flex items-center gap-1 mt-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{appliedReward.title} (-₱{discountAmount})</span>
                    </p>
                  )}
                </div>

                {/* Order Cost Breakdown */}
                <div className="space-y-2 border-t border-[#3D0C15] pt-4 text-xs font-mono">
                  <div className="flex justify-between text-[#D8C7C4]">
                    <span>Board Subtotal:</span>
                    <span>₱{subtotal}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#D4AF37]">
                      <span>Discounts & Vouchers:</span>
                      <span>-₱{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#A89895] text-[11px]">
                    <span>Pit Pass Points Earned:</span>
                    <span>+{Math.floor(finalTotal / 10)} PTS</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-[#FFF5F7] border-t border-[#3D0C15] pt-2">
                    <span>Total Service:</span>
                    <span className="text-[#D4AF37]">₱{finalTotal}</span>
                  </div>
                </div>

                {/* Submit Checkout Button */}
                <button
                  type="submit"
                  disabled={items.length === 0}
                  className="w-full py-4 bg-[#D4AF37] hover:bg-[#B89327] disabled:opacity-50 text-black font-semibold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#D4AF37]/20"
                >
                  <span>Dispatch Table Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#A89895] uppercase tracking-wider text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Free unlimited heirloom red rice & bone broth refills included</span>
                </div>

              </form>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
