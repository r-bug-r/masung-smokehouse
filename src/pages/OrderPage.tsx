import React, { useState } from 'react';
import type { PageId, SmokehouseOrder } from '../types';
import { useCart } from '../context/CartContext';
import { useLoyalty } from '../context/LoyaltyContext';
import { REWARD_VOUCHERS } from '../data/rewardsData';
import { ShoppingBag, Trash2, Plus, Minus, Check, MessageCircle, Copy, Award, Utensils, Flame, ArrowLeft, Send, Tag } from 'lucide-react';
import { sanitizeText, sanitizePhoneNumber, sanitizePromoCode } from '../lib/sanitize';

interface OrderPageProps {
  onNavigate: (page: PageId) => void;
}

const TABLE_OPTIONS = [
  'Table 1 (Front Pit View)',
  'Table 2 (Front Pit View)',
  'Table 3 (Billiards Side)',
  'Table 4 (Billiards Side)',
  'Table 5 (Arcade Lounge)',
  'Table 6 (Arcade Lounge)',
  'Takeout / Pickup Counter'
];

export const OrderPage: React.FC<OrderPageProps> = ({ onNavigate }) => {
  const {
    items,
    tableNumber,
    orderType,
    customerName,
    customerPhone,
    subtotal,
    discountAmount,
    appliedReward,
    appliedPromoCode,
    promoDiscount,
    claimedSocialVouchers,
    finalTotal,
    specialInstructions,
    setTableNumber,
    setOrderType,
    setCustomerName,
    setCustomerPhone,
    setSpecialInstructions,
    updateQuantity,
    removeItem,
    clearCart,
    applyReward,
    applyPromoCode,
    removePromoCode,
    claimSocialVoucher
  } = useCart();

  const { profile, recordOrder } = useLoyalty();

  // Local state for the generated receipt slip on-page (Zero modal popup)
  const [activeOrder, setActiveOrder] = useState<SmokehouseOrder | null>(null);
  const [livePitStep, setLivePitStep] = useState<'slicing' | 'plating' | 'served'>('slicing');
  const [copiedSlip, setCopiedSlip] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = sanitizePromoCode(promoInput);
    if (!cleanCode) return;
    const res = applyPromoCode(cleanCode);
    setPromoMsg(res.message);
    if (res.success) {
      setPromoInput('');
    }
    setTimeout(() => setPromoMsg(''), 3500);
  };

  const pointsToEarn = Math.floor(finalTotal / 10);

  const handleConfirmOrder = () => {
    if (items.length === 0) return;

    const cleanCustomerName = sanitizeText(customerName, 80) || 'Smokehouse Guest';
    const cleanCustomerPhone = sanitizePhoneNumber(customerPhone) || '09xx-xxx-xxxx';
    const cleanInstructions = specialInstructions ? sanitizeText(specialInstructions, 300) : undefined;

    const newOrder = recordOrder({
      tableNumber,
      orderType,
      customerName: cleanCustomerName,
      customerPhone: cleanCustomerPhone,
      items: [...items],
      subtotal,
      discountAmount,
      appliedReward,
      finalTotal,
      specialInstructions: cleanInstructions
    });

    setActiveOrder(newOrder);
    setLivePitStep('slicing');
    clearCart();

    // Auto-advance the live pit simulator
    setTimeout(() => setLivePitStep('plating'), 2500);
    setTimeout(() => setLivePitStep('served'), 5500);
  };

  const handleSendToMessenger = () => {
    const orderToDispatch = activeOrder || {
      id: `MS-${Date.now().toString().slice(-4)}`,
      tableNumber,
      orderType,
      customerName: customerName || 'Smokehouse Guest',
      customerPhone: customerPhone || '09xx-xxx-xxxx',
      items,
      finalTotal,
      specialInstructions
    };

    const itemsSummary = orderToDispatch.items
      .map(i => `• ${i.quantity}x ${i.item.name} (${i.selectedVariant?.label || 'Regular'}) - ₱${(i.selectedVariant?.price ?? i.item.price) * i.quantity}`)
      .join('\n');

    const message = 
`MASUNG SMOKEHOUSE ORDER [${orderToDispatch.id}]
Location: ${orderToDispatch.tableNumber} (${orderToDispatch.orderType.toUpperCase()})
Customer: ${orderToDispatch.customerName} (${orderToDispatch.customerPhone})

ITEMS:
${itemsSummary}

Total: ₱${orderToDispatch.finalTotal}
Inclusions: Unlimited Heirloom Red Rice & Smoked Bone Broth
Notes: ${orderToDispatch.specialInstructions || 'None'}

Please confirm receipt and start carving!`;

    navigator.clipboard.writeText(message);
    const fbUrl = `https://m.me/MasungSmokeHouse?text=${encodeURIComponent(message)}`;
    window.open(fbUrl, '_blank');
  };

  const handleCopySlip = () => {
    if (!activeOrder) return;
    const slipText = `MASUNG SMOKEHOUSE KITCHEN SLIP\nOrder ID: ${activeOrder.id}\nTable: ${activeOrder.tableNumber}\nGuest: ${activeOrder.customerName}\nTotal: ₱${activeOrder.finalTotal}\nTimestamp: ${activeOrder.timestamp}`;
    navigator.clipboard.writeText(slipText);
    setCopiedSlip(true);
    setTimeout(() => setCopiedSlip(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] py-10 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back to Menu */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate('menu')}
            className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#5B101D] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Full Menu</span>
          </button>
          
          <div className="text-xs text-[#5C5651]">
            Table: <strong>{tableNumber}</strong>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3.5 py-1 inline-block mb-2">
            Dine-In & Takeout
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-[#5B101D] tracking-tight">
            Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#5C5651] mt-1">
            Review your dishes, choose your table, and send your order directly to our team.
          </p>
        </div>

        {/* If Order is Placed: Render the Realistic Kitchen Slip on Page */}
        {activeOrder && (
          <div className="mb-10 bg-white border-2 border-[#5B101D] p-6 sm:p-8 shadow-elevated">
            <div className="max-w-2xl mx-auto space-y-6">
              
              {/* Slip Header */}
              <div className="text-center pb-5 border-b-2 border-dashed border-[#E5DFD5] space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#5B101D]">
                  Official Masung Kitchen Ticket
                </span>
                <h2 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-[#181615]">
                  Order Confirmed #{activeOrder.id}
                </h2>
                <p className="text-xs text-[#5C5651]">
                  {activeOrder.timestamp} • {activeOrder.orderType.toUpperCase()} • {activeOrder.tableNumber}
                </p>
              </div>

              {/* Guest & Reward Info */}
              <div className="flex justify-between items-center text-xs text-[#181615] bg-[#FBF8F3] p-3 border border-[#E5DFD5]">
                <div>
                  <span className="text-[#5C5651] block text-[10px] uppercase font-bold">Guest:</span>
                  <strong className="font-heading uppercase">{activeOrder.customerName}</strong> ({activeOrder.customerPhone})
                </div>
                <div className="text-right">
                  <span className="text-[#5C5651] block text-[10px] uppercase font-bold">Points Earned:</span>
                  <strong className="text-[#5B101D]">+{activeOrder.pointsEarned} BBQ PTS</strong>
                </div>
              </div>

              {/* Itemized Receipt Table */}
              <div className="divide-y divide-[#E5DFD5] text-xs">
                {activeOrder.items.map((it, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center">
                    <div>
                      <strong className="font-bold text-[#181615] block">
                        {it.quantity}x {it.item.name}
                      </strong>
                      <span className="text-[11px] text-[#5C5651]">
                        {it.selectedVariant?.label || 'Regular Serving'}
                      </span>
                    </div>
                    <span className="font-bold text-[#181615]">
                      ₱{(it.selectedVariant?.price ?? it.item.price) * it.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="pt-4 border-t-2 border-dashed border-[#E5DFD5] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5C5651]">
                  <span>Subtotal:</span>
                  <span>₱{activeOrder.subtotal}</span>
                </div>
                {activeOrder.discountAmount > 0 && (
                  <div className="flex justify-between text-[#5B101D] font-bold">
                    <span>Reward Voucher Discount:</span>
                    <span>-₱{activeOrder.discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-[#5C5651]">
                  <span>Unlimited Red Rice & Bone Broth:</span>
                  <span className="font-bold text-[#5B101D] uppercase">Included Free</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#E5DFD5]">
                  <span className="font-heading font-extrabold text-sm uppercase text-[#181615]">
                    Total Bill:
                  </span>
                  <span className="font-heading font-extrabold text-2xl text-[#5B101D]">
                    ₱{activeOrder.finalTotal}
                  </span>
                </div>
              </div>

              {/* Live Pit Preparation Progress Simulator */}
              <div className="bg-[#F2ECE1] p-4 border border-[#E5DFD5] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-heading font-extrabold uppercase tracking-wider text-[#5B101D] flex items-center gap-1.5">
                    <Flame className="w-4 h-4" />
                    <span>Live Kitchen Status</span>
                  </span>
                  <span className="text-[11px] font-bold uppercase text-[#181615]">
                    {livePitStep === 'slicing' ? 'Carving from Pit' : livePitStep === 'plating' ? 'Plating & Rice Scoop' : 'Served to Table'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <button
                    onClick={() => setLivePitStep('slicing')}
                    className={`py-2 px-1 border transition-colors cursor-pointer ${
                      livePitStep === 'slicing'
                        ? 'bg-[#5B101D] text-white border-[#5B101D]'
                        : 'bg-white text-[#5C5651] border-[#E5DFD5]'
                    }`}
                  >
                    <span className="text-[11px] font-bold block">1. Slicing</span>
                    <span className="text-[9px] opacity-80">Carving Meat</span>
                  </button>

                  <button
                    onClick={() => setLivePitStep('plating')}
                    className={`py-2 px-1 border transition-colors cursor-pointer ${
                      livePitStep === 'plating'
                        ? 'bg-[#5B101D] text-white border-[#5B101D]'
                        : 'bg-white text-[#5C5651] border-[#E5DFD5]'
                    }`}
                  >
                    <span className="text-[11px] font-bold block">2. Plating</span>
                    <span className="text-[9px] opacity-80">Steaming Rice</span>
                  </button>

                  <button
                    onClick={() => setLivePitStep('served')}
                    className={`py-2 px-1 border transition-colors cursor-pointer ${
                      livePitStep === 'served'
                        ? 'bg-[#181615] text-white border-[#181615]'
                        : 'bg-white text-[#5C5651] border-[#E5DFD5]'
                    }`}
                  >
                    <span className="text-[11px] font-bold block">3. Served</span>
                    <span className="text-[9px] opacity-80">Hot to Table</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons: Messenger Dispatch & Copy Slip */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={handleSendToMessenger}
                  className="w-full sm:flex-1 py-3.5 px-5 bg-[#181615] hover:bg-[#2B2724] text-white font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-subtle"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send to Masung Messenger</span>
                </button>

                <button
                  onClick={handleCopySlip}
                  className="w-full sm:w-auto py-3.5 px-5 bg-white hover:bg-[#F2ECE1] text-[#181615] font-heading font-bold text-xs uppercase tracking-wider border border-[#E5DFD5] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSlip ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSlip ? 'Copied Slip' : 'Copy Text Slip'}</span>
                </button>

                <button
                  onClick={() => { setActiveOrder(null); onNavigate('menu'); }}
                  className="w-full sm:w-auto py-3.5 px-5 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Order More Dishes</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Normal Order Tray Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Table Selector & Line Items */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Table & Dining Mode Card */}
            <div className="bg-white p-6 border border-[#E5DFD5] shadow-subtle space-y-4">
              <h2 className="font-heading text-base font-extrabold text-[#5B101D] uppercase tracking-wide flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                <span>1. Dining Option & Table Selector</span>
              </h2>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`py-2.5 font-heading font-bold text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                    orderType === 'dine-in'
                      ? 'bg-[#5B101D] text-white border-[#5B101D]'
                      : 'bg-[#FBF8F3] text-[#5C5651] border-[#E5DFD5]'
                  }`}
                >
                  Dine-In (Table Service)
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('takeout')}
                  className={`py-2.5 font-heading font-bold text-xs uppercase tracking-wider border transition-colors cursor-pointer ${
                    orderType === 'takeout'
                      ? 'bg-[#5B101D] text-white border-[#5B101D]'
                      : 'bg-[#FBF8F3] text-[#5C5651] border-[#E5DFD5]'
                  }`}
                >
                  Takeout (Pickup Counter)
                </button>
              </div>

              {orderType === 'dine-in' && (
                <div>
                  <label className="text-xs font-bold text-[#181615] uppercase tracking-wider block mb-1.5">
                    Your Table Number:
                  </label>
                  <select
                    value={tableNumber}
                    onChange={e => setTableNumber(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-xs font-semibold text-[#181615] focus:outline-none focus:border-[#5B101D]"
                  >
                    {TABLE_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Guest Profile for BBQ Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E5DFD5]">
                <div>
                  <label className="text-xs font-bold text-[#181615] block mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="Guest Name"
                    className="w-full px-3.5 py-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs text-[#181615] focus:outline-none focus:border-[#5B101D]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#181615] block mb-1">
                    Mobile Number (For BBQ Points):
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="0917-xxx-xxxx"
                    className="w-full px-3.5 py-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs text-[#181615] focus:outline-none focus:border-[#5B101D]"
                  />
                </div>
              </div>
            </div>

            {/* Line Items Card */}
            <div className="bg-white p-6 border border-[#E5DFD5] shadow-subtle space-y-4">
              <div className="flex justify-between items-center border-b border-[#E5DFD5] pb-3">
                <h2 className="font-heading text-base font-extrabold text-[#5B101D] uppercase tracking-wide flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>2. Your Dishes ({items.length})</span>
                </h2>
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-[#5B101D] hover:underline font-bold"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <ShoppingBag className="w-10 h-10 text-[#8A837C] mx-auto" />
                  <p className="text-sm text-[#5C5651] font-medium">
                    You haven't added any items yet.
                  </p>
                  <button
                    onClick={() => onNavigate('menu')}
                    className="px-6 py-2.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#E5DFD5]">
                  {items.map(cartItem => {
                    const price = cartItem.selectedVariant?.price ?? cartItem.item.price;
                    return (
                      <div key={cartItem.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={cartItem.item.imageUrl}
                            alt={cartItem.item.name}
                            className="w-13 h-13 object-cover border border-[#E5DFD5]"
                          />
                          <div>
                            <h3 className="font-heading font-bold text-sm text-[#181615] uppercase">
                              {cartItem.item.name}
                            </h3>
                            <span className="text-xs text-[#5C5651] block">
                              {cartItem.selectedVariant?.label || 'Regular Serving'} • ₱{price}
                            </span>
                          </div>
                        </div>

                        {/* Counter Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-[#E5DFD5] bg-[#FBF8F3]">
                            <button
                              onClick={() => updateQuantity(cartItem.id, -1)}
                              className="p-1.5 hover:bg-[#E5DFD5] text-[#181615] transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2.5 text-xs font-bold text-[#181615]">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(cartItem.id, 1)}
                              className="p-1.5 hover:bg-[#E5DFD5] text-[#181615] transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-heading font-extrabold text-sm text-[#181615] w-14 text-right">
                            ₱{price * cartItem.quantity}
                          </span>

                          <button
                            onClick={() => removeItem(cartItem.id)}
                            className="text-[#8A837C] hover:text-[#5B101D] p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Special Instructions Field */}
              {items.length > 0 && (
                <div className="pt-3 border-t border-[#E5DFD5]">
                  <label className="text-xs font-bold text-[#181615] uppercase block mb-1">
                    Special Kitchen Request (Optional):
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={e => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Extra calamansi, slice extra lean, serve soup first..."
                    className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-xs text-[#181615] focus:outline-none focus:border-[#5B101D]"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Loyalty Vouchers & Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Pit Pass Loyalty Voucher Selector */}
            <div className="bg-white p-6 border border-[#E5DFD5] shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#5B101D]" />
                  <span className="font-heading font-extrabold text-xs text-[#5B101D] uppercase">
                    Pit Pass Rewards
                  </span>
                </div>
                <span className="text-xs font-bold text-white bg-[#5B101D] px-2.5 py-0.5">
                  {profile.points} PTS
                </span>
              </div>

              <p className="text-xs text-[#5C5651]">
                Redeem your BBQ points for instant meal discounts or complimentary signature appetizers:
              </p>

              <div className="space-y-2">
                {REWARD_VOUCHERS.slice(0, 3).map(voucher => {
                  const isApplied = appliedReward?.id === voucher.id;
                  const canAfford = profile.points >= voucher.pointsCost;

                  return (
                    <button
                      key={voucher.id}
                      type="button"
                      disabled={!canAfford && !isApplied}
                      onClick={() => applyReward(isApplied ? undefined : voucher)}
                      className={`w-full p-3 text-left border transition-colors flex items-center justify-between text-xs cursor-pointer ${
                        isApplied
                          ? 'bg-[#5B101D] text-white border-[#5B101D]'
                          : canAfford
                          ? 'bg-[#FBF8F3] border-[#E5DFD5] hover:border-[#5B101D]'
                          : 'bg-stone-50 border-stone-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div>
                        <span className="font-bold block">{voucher.title}</span>
                        <span className={`text-[10px] ${isApplied ? 'text-[#E5DFD5]' : 'text-[#5C5651]'}`}>
                          {voucher.pointsCost} BBQ Points Cost
                        </span>
                      </div>
                      <span className={`px-2 py-1 text-[10px] font-extrabold uppercase ${
                        isApplied ? 'bg-white text-[#5B101D]' : 'bg-white border border-[#E5DFD5] text-[#5B101D]'
                      }`}>
                        {isApplied ? 'Applied' : 'Redeem'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {appliedReward && (
                <div className="p-2.5 bg-[#F2ECE1] border border-[#E5DFD5] text-xs text-[#181615] flex items-center justify-between">
                  <span>Applied: <strong>{appliedReward.title}</strong></span>
                  <button
                    type="button"
                    onClick={() => applyReward(undefined)}
                    className="text-[#5B101D] font-bold hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Social Follower Vouchers & Promo Code */}
            <div className="bg-white p-6 border border-[#E5DFD5] shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#5B101D]" />
                  <span className="font-heading font-extrabold text-xs text-[#5B101D] uppercase">
                    Discounts & Promo Codes
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#5B101D] uppercase bg-[#F2ECE1] px-2 py-0.5">
                  ₱50 Off
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-[#181615] block">
                  Follow us for an instant ₱50 discount:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      window.open('https://www.facebook.com/MasungSmokeHouse/', '_blank', 'noopener,noreferrer');
                      claimSocialVoucher('facebook');
                    }}
                    className={`p-2.5 text-left border text-xs flex flex-col justify-between transition-colors cursor-pointer ${
                      claimedSocialVouchers.facebook
                        ? 'bg-[#FBF8F3] border-[#5B101D]'
                        : 'bg-white border-[#E5DFD5] hover:border-[#5B101D]'
                    }`}
                  >
                    <span className="font-bold text-[11px] text-[#181615]">Facebook Follow</span>
                    <span className="text-[10px] text-[#5B101D] font-bold mt-1">
                      {claimedSocialVouchers.facebook ? 'Claimed (-₱50)' : 'Follow & Claim'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      window.open('https://www.instagram.com/masungsmokehouse', '_blank', 'noopener,noreferrer');
                      claimSocialVoucher('instagram');
                    }}
                    className={`p-2.5 text-left border text-xs flex flex-col justify-between transition-colors cursor-pointer ${
                      claimedSocialVouchers.instagram
                        ? 'bg-[#FBF8F3] border-[#5B101D]'
                        : 'bg-white border-[#E5DFD5] hover:border-[#5B101D]'
                    }`}
                  >
                    <span className="font-bold text-[11px] text-[#181615]">Instagram Follow</span>
                    <span className="text-[10px] text-[#C67D26] font-bold mt-1">
                      {claimedSocialVouchers.instagram ? 'Claimed (-₱50)' : 'Follow & Claim'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-2 border-t border-[#E5DFD5]">
                {appliedPromoCode ? (
                  <div className="p-2.5 bg-[#F2ECE1] border border-[#5B101D] flex items-center justify-between text-xs">
                    <span className="font-bold text-[#5B101D]">
                      Active: {appliedPromoCode} (-₱{promoDiscount})
                    </span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-xs text-[#8A837C] hover:text-[#5B101D] font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      placeholder="Code (e.g. MASUNGFB50)"
                      className="flex-1 px-3 py-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs uppercase text-[#181615] focus:outline-none focus:border-[#5B101D]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase cursor-pointer transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoMsg && <p className="text-[11px] text-[#5B101D] mt-1 font-semibold">{promoMsg}</p>}
              </div>
            </div>

            {/* Order Calculation Card */}
            <div className="bg-[#5B101D] text-white p-6 sm:p-7 shadow-elevated space-y-4">
              <h2 className="font-heading font-extrabold text-lg uppercase tracking-tight border-b border-[#781728] pb-3 text-white">
                Order Total & Points
              </h2>

              <div className="space-y-2 text-xs text-[#FBF8F3]">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items):</span>
                  <span className="font-bold font-mono">₱{subtotal}</span>
                </div>

                {appliedReward && (
                  <div className="flex justify-between text-[#E5DFD5] font-bold">
                    <span>Reward Voucher ({appliedReward.title}):</span>
                    <span className="font-mono">-₱{appliedReward.discountAmount || 100}</span>
                  </div>
                )}

                {promoDiscount > 0 && (
                  <div className="flex justify-between text-[#C67D26] font-bold">
                    <span>Follower Voucher ({appliedPromoCode}):</span>
                    <span className="font-mono">-₱{promoDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs text-[#E5DFD5]/80">
                  <span>Unlimited Red Rice & Soup:</span>
                  <span className="font-bold uppercase text-white">Included Free</span>
                </div>

                <div className="pt-3 border-t border-[#781728] flex justify-between items-baseline">
                  <span className="font-heading font-extrabold text-base uppercase text-white">
                    Final Table Total:
                  </span>
                  <span className="font-heading font-extrabold text-3xl text-white">
                    ₱{finalTotal}
                  </span>
                </div>

                <div className="bg-[#460B15] p-3 border border-[#781728] flex items-center justify-between text-xs text-[#FBF8F3]">
                  <span>Points to Earn on this order:</span>
                  <strong className="text-[#C67D26] font-bold">+{pointsToEarn} BBQ PTS</strong>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2 space-y-2.5">
                <button
                  disabled={items.length === 0}
                  onClick={handleConfirmOrder}
                  className={`w-full py-4 font-heading font-extrabold text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-subtle cursor-pointer ${
                    items.length === 0
                      ? 'bg-[#460B15] text-[#8A837C] cursor-not-allowed opacity-60'
                      : 'bg-[#C67D26] hover:bg-[#A5641A] text-white'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Place Order • ₱{finalTotal}</span>
                </button>

                <p className="text-[11px] text-center text-[#E5DFD5]/70">
                  Your order is prepared fresh by our kitchen crew.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
