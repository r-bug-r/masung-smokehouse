import React, { useState, useEffect } from 'react';
import type { PageId, SmokehouseOrder } from '../types';
import { useCart } from '../context/CartContext';
import { useLoyalty } from '../context/LoyaltyContext';
import { useToast } from '../context/ToastContext';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Check, 
  Flame, 
  Utensils, 
  ArrowLeft, 
  CreditCard,
  ChefHat
} from 'lucide-react';
import { sanitizeText, sanitizePhoneNumber, sanitizePromoCode } from '../lib/sanitize';

interface OrderPageProps {
  onNavigate: (page: PageId) => void;
}

const TABLE_OPTIONS = [
  'Table 01 (1st Floor)',
  'Table 02 (1st Floor)',
  'Table 03 (1st Floor)',
  'Table 04 (1st Floor)',
  'Table 05 (1st Floor)',
  'Table 06 (1st Floor)',
  'Table 07 (1st Floor)',
  'Table 08 (1st Floor)',
  'Table 09 (1st Floor)',
  'Table 10 (1st Floor)',
  'Table 11 (1st Floor)',
  'Table 12 (2nd Floor)',
  'Table 13 (2nd Floor)',
  'Table 14 (2nd Floor)',
  'Table 15 (2nd Floor)',
  'Takeout / Counter Pickup'
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
    promoDiscount,
    finalTotal,
    specialInstructions,
    setTableNumber,
    setCustomerName,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromoCode
  } = useCart();

  const { recordOrder } = useLoyalty();
  const { showToast } = useToast();


  // Active Order State
  const [activeOrder, setActiveOrder] = useState<SmokehouseOrder | null>(null);
  
  // 3-Stage Tracking: 'placed' (waiting payment) | 'preparing' (in kitchen) | 'ready' (claim at counter)
  const [orderStage, setOrderStage] = useState<'placed' | 'preparing' | 'ready'>('placed');
  const [orderNumberDisplay, setOrderNumberDisplay] = useState('027');
  const [promoInput, setPromoInput] = useState('');

  // Sync with localStorage live orders
  useEffect(() => {
    if (!activeOrder) return;
    const interval = setInterval(() => {
      try {
        const stored = localStorage.getItem('masung_live_orders');
        if (stored) {
          const orders = JSON.parse(stored);
          const current = orders.find((o: any) => o.id === activeOrder.id || o.orderNumber === activeOrder.id);
          if (current) {
            if (current.status === 'ready' || current.status === 'completed') {
              setOrderStage('ready');
            } else if (current.status === 'cooking' || current.status === 'preparing' || current.status === 'paid') {
              setOrderStage('preparing');
            } else {
              setOrderStage('placed');
            }
          }
        }
      } catch {}
    }, 1200);
    return () => clearInterval(interval);
  }, [activeOrder]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = sanitizePromoCode(promoInput);
    if (!cleanCode) return;
    const res = applyPromoCode(cleanCode);
    if (res.success) {
      setPromoInput('');
      showToast('Voucher Applied', res.message, 'reward');
    } else {
      showToast('Voucher Error', res.message, 'error');
    }
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    const num = Math.floor(Math.random() * 900 + 100).toString();
    setOrderNumberDisplay(num.slice(-3));

    const cleanCustomerName = sanitizeText(customerName, 80) || 'Smokehouse Guest';
    const cleanCustomerPhone = sanitizePhoneNumber(customerPhone) || '09xx-xxx-xxxx';

    const newOrder = recordOrder({
      tableNumber: tableNumber || 'Table 04 (1st Floor)',
      orderType: orderType || 'dine_in',
      customerName: cleanCustomerName,
      customerPhone: cleanCustomerPhone,
      items: [...items],
      subtotal,
      discountAmount,
      appliedReward,
      finalTotal,
      specialInstructions
    });

    setActiveOrder(newOrder);
    setOrderStage('placed');
    showToast('Order Placed', `Order #${num.slice(-3)} submitted! Proceed to the counter to pay.`, 'success');
    clearCart();

    // Sync to live POS
    try {
      const existing = localStorage.getItem('masung_live_orders');
      const list = existing ? JSON.parse(existing) : [];
      list.push({
        ...newOrder,
        orderNumber: num.slice(-3),
        status: 'submitted_unpaid',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('masung_live_orders', JSON.stringify(list));
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#F5EFEB] py-8 sm:py-12 lg:py-16 pb-36 sm:pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* If Active Order Exists -> Render 3-Stage Live Tracker (1:1 Match to Mockup) */}
        {activeOrder ? (
          <div className="space-y-6">
            
            {/* Navigation back / New Order button */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => { setActiveOrder(null); onNavigate('menu'); }}
                className="flex items-center gap-2 text-xs font-montserrat font-bold text-[#5B101D] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>BACK TO MENU</span>
              </button>

              {/* Simulation buttons to preview stages */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-[#E5DFD5] text-[10px] font-montserrat font-bold">
                <span className="text-[#8A837C] px-1">Demo Stage:</span>
                <button
                  onClick={() => setOrderStage('placed')}
                  className={`px-2 py-0.5 rounded ${orderStage === 'placed' ? 'bg-[#5B101D] text-white' : 'text-[#1E1E1E]'}`}
                >
                  1. Placed
                </button>
                <button
                  onClick={() => setOrderStage('preparing')}
                  className={`px-2 py-0.5 rounded ${orderStage === 'preparing' ? 'bg-[#5B101D] text-white' : 'text-[#1E1E1E]'}`}
                >
                  2. Preparing
                </button>
                <button
                  onClick={() => setOrderStage('ready')}
                  className={`px-2 py-0.5 rounded ${orderStage === 'ready' ? 'bg-[#5B101D] text-white' : 'text-[#1E1E1E]'}`}
                >
                  3. Ready
                </button>
              </div>
            </div>

            {/* STAGE 1: ORDER PLACED (Waiting Payment) */}
            {orderStage === 'placed' && (
              <div className="bg-white rounded-2xl border border-[#E5DFD5] shadow-elevated p-6 sm:p-8 space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DFD5]">
                  <div>
                    <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
                      ORDER PLACED
                    </span>
                    <h1 className="font-bebas text-5xl sm:text-6xl font-bold uppercase tracking-tight text-[#1E1E1E] leading-none mt-1">
                      #{orderNumberDisplay}
                    </h1>
                    <span className="text-xs font-montserrat font-bold text-[#5C5651] uppercase mt-1 block">
                      Dine-In • {activeOrder.tableNumber}
                    </span>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-montserrat font-bold uppercase tracking-wider">
                      WAITING FOR PAYMENT
                    </span>
                    <div className="text-xs font-body text-[#8A837C]">
                      Est. Wait Time: <strong className="text-[#1E1E1E]">12–15 MINS</strong>
                    </div>
                  </div>
                </div>

                {/* Items Breakdown */}
                <div className="space-y-3">
                  <div className="text-xs font-montserrat font-extrabold uppercase tracking-wider text-[#8A837C]">
                    ORDER SUMMARY
                  </div>
                  <div className="divide-y divide-[#FAF7F2]">
                    {activeOrder.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex justify-between items-center text-xs font-body">
                        <span className="font-medium text-[#1E1E1E]">
                          {item.quantity}x {item.item.name}
                        </span>
                        <strong className="font-montserrat font-bold text-[#5B101D]">
                          ₱{item.item.price * item.quantity}
                        </strong>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost Row */}
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1.5 text-xs font-body">
                  <div className="flex justify-between text-[#5C5651]">
                    <span>Subtotal</span>
                    <span>₱{activeOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between font-montserrat font-extrabold text-base text-[#1E1E1E] pt-2 border-t border-[#E5DFD5]">
                    <span>Total Amount</span>
                    <span className="text-[#5B101D]">₱{activeOrder.finalTotal}</span>
                  </div>
                </div>

                {/* Counter Instruction Alert (From Mockup) */}
                <div className="p-4 bg-[#5B101D]/5 border-2 border-[#5B101D] rounded-xl flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-[#5B101D] shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <strong className="font-montserrat font-extrabold text-[#5B101D] uppercase block">
                      PROCEED TO THE CASHIER COUNTER
                    </strong>
                    <p className="font-body text-[#5C5651] leading-relaxed">
                      Please show your Order Number <strong>#{orderNumberDisplay}</strong> at the counter to pay and start the smoking & plating process.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* STAGE 2: ORDER IN PROGRESS (Preparing) */}
            {orderStage === 'preparing' && (
              <div className="bg-white rounded-2xl border border-[#E5DFD5] shadow-elevated p-6 sm:p-8 space-y-6">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DFD5]">
                  <div>
                    <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
                      ORDER IN PROGRESS
                    </span>
                    <h1 className="font-bebas text-5xl sm:text-6xl font-bold uppercase tracking-tight text-[#1E1E1E] leading-none mt-1">
                      #{orderNumberDisplay}
                    </h1>
                    <span className="text-xs font-montserrat font-bold text-[#5C5651] uppercase mt-1 block">
                      Dine-In • {activeOrder.tableNumber}
                    </span>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full text-xs font-montserrat font-bold uppercase tracking-wider">
                      PAID • PREPARING
                    </span>
                    <div className="text-xs font-body text-[#8A837C]">
                      Remaining: <strong className="text-[#5B101D]">5–8 MINS</strong>
                    </div>
                  </div>
                </div>

                {/* 4-Step Timeline (From Mockup) */}
                <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="font-montserrat font-bold text-xs text-[#1E1E1E] block">
                        Order Received
                      </strong>
                      <span className="font-body text-[10px] text-[#8A837C]">10:32 AM • Payment Confirmed</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#5B101D] text-white flex items-center justify-center shrink-0 animate-pulse">
                      <Flame className="w-4 h-4 text-[#C67D26]" />
                    </div>
                    <div>
                      <strong className="font-montserrat font-bold text-xs text-[#5B101D] block">
                        Preparing & Carving
                      </strong>
                      <span className="font-body text-[10px] text-[#5C5651]">Pitmaster slicing fresh brisket & packing hot broth</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-[#E5DFD5] text-[#8A837C] flex items-center justify-center shrink-0">
                      <ChefHat className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="font-montserrat font-bold text-xs text-[#1E1E1E] block">
                        Plating & Garnish
                      </strong>
                      <span className="font-body text-[10px] text-[#8A837C]">Adding fresh pickled sides</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 opacity-40">
                    <div className="w-8 h-8 rounded-full bg-[#E5DFD5] text-[#8A837C] flex items-center justify-center shrink-0">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="font-montserrat font-bold text-xs text-[#1E1E1E] block">
                        Ready for Pickup
                      </strong>
                      <span className="font-body text-[10px] text-[#8A837C]">Counter notification</span>
                    </div>
                  </div>
                </div>

                {/* Mascot Patience Card */}
                <div className="p-4 bg-white border border-[#E5DFD5] rounded-xl flex items-center gap-4 text-xs font-body text-[#5C5651]">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C67D26]/40 flex items-center justify-center text-xl shrink-0">
                    🥩
                  </div>
                  <div>
                    <strong className="font-montserrat font-bold text-xs text-[#1E1E1E] block">
                      Slow smoke takes time, but your tray is almost ready!
                    </strong>
                    <span>All meals include unlimited red rice and hot bone soup refills at the counter station.</span>
                  </div>
                </div>

              </div>
            )}

            {/* STAGE 3: ORDER READY FOR PICKUP */}
            {orderStage === 'ready' && (
              <div className="bg-white rounded-2xl border-2 border-emerald-600 shadow-elevated p-6 sm:p-8 space-y-6 text-center">
                
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-500 shadow-md">
                  <Flame className="w-8 h-8 text-emerald-600 animate-bounce" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-emerald-700 block">
                    NOW SERVING
                  </span>
                  <h1 className="font-bebas text-5xl sm:text-6xl font-bold uppercase tracking-tight text-[#1E1E1E]">
                    ORDER #{orderNumberDisplay} IS READY!
                  </h1>
                  <p className="font-body text-sm text-[#5C5651] max-w-md mx-auto">
                    Please claim your tray at the pickup counter. Don't forget your unlimited red rice and hot beef bone broth!
                  </p>
                </div>

                {/* Platter Details Box */}
                <div className="p-5 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] text-left max-w-md mx-auto space-y-2 text-xs font-body">
                  <div className="font-montserrat font-bold text-xs text-[#1E1E1E] pb-2 border-b border-[#E5DFD5]">
                    Dine-In • {activeOrder.tableNumber}
                  </div>
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{item.quantity}x {item.item.name}</span>
                      <strong className="font-montserrat text-[#5B101D]">₱{item.item.price * item.quantity}</strong>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        ) : (
          /* When No Active Order -> Cart Checkout Tray */
          <div className="space-y-8">
            
            {/* Header */}
            <div className="space-y-1">
              <span className="text-xs font-montserrat font-extrabold uppercase tracking-widest text-[#C67D26] block">
                YOUR ORDER TRAY
              </span>
              <h1 className="font-bebas text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-[#1E1E1E]">
                REVIEW & CONFIRM SELECTIONS
              </h1>
            </div>

            {items.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E5DFD5] p-12 text-center space-y-4 shadow-subtle">
                <ShoppingBag className="w-12 h-12 text-[#8A837C] mx-auto" />
                <h2 className="font-bebas text-2xl uppercase text-[#1E1E1E]">
                  Your Tray is Empty
                </h2>
                <p className="font-body text-xs text-[#5C5651] max-w-sm mx-auto">
                  Add 16-hour smoked beef brisket, ₱99 sulit bowls, or sharing platters from our menu.
                </p>
                <button
                  onClick={() => onNavigate('menu')}
                  className="px-6 py-3 bg-[#5B101D] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md transition-colors shadow-xs"
                >
                  Browse Smokehouse Menu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Items List */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5DFD5] p-6 shadow-subtle space-y-4">
                  <div className="text-xs font-montserrat font-extrabold uppercase tracking-wider text-[#8A837C] pb-3 border-b border-[#EAE3D9]">
                    SELECTED DISHES ({items.length})
                  </div>

                  <div className="divide-y divide-[#FAF7F2]">
                    {items.map(item => (
                      <div key={item.item.id} className="py-4 flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-montserrat font-bold text-xs uppercase text-[#1E1E1E]">
                            {item.item.name}
                          </h3>
                          <span className="font-body text-[11px] text-[#5C5651]">
                            ₱{item.item.price} each
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-[#E5DFD5] rounded-md overflow-hidden">
                            <button
                              onClick={() => updateQuantity(item.item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-[#FAF7F2] text-[#5C5651] cursor-pointer"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 text-xs font-montserrat font-bold text-[#1E1E1E]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-[#FAF7F2] text-[#5C5651] cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-montserrat font-extrabold text-xs text-[#5B101D] w-14 text-right">
                            ₱{item.item.price * item.quantity}
                          </span>

                          <button
                            onClick={() => removeItem(item.item.id)}
                            className="p-1.5 text-[#8A837C] hover:text-[#5B101D] cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Voucher Input */}
                  <form onSubmit={handleApplyPromo} className="pt-4 border-t border-[#EAE3D9] flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={e => setPromoInput(e.target.value)}
                      placeholder="Promo Code (e.g. FEEDBACK50)"
                      className="flex-1 px-3.5 py-2 text-xs bg-[#FAF7F2] border border-[#E5DFD5] rounded focus:outline-none focus:border-[#5B101D]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#5B101D] text-white font-montserrat font-bold text-xs uppercase tracking-wider rounded"
                    >
                      Apply
                    </button>
                  </form>
                </div>

                {/* Right Column: Dining Details & Checkout */}
                <div className="lg:col-span-5 space-y-6">
                  
                  <div className="bg-white rounded-2xl border border-[#E5DFD5] p-6 shadow-subtle space-y-4">
                    <div className="text-xs font-montserrat font-extrabold uppercase tracking-wider text-[#8A837C] pb-3 border-b border-[#EAE3D9]">
                      DINING DETAILS
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-montserrat font-bold text-[#1E1E1E] block mb-1">
                          Select Table / Counter:
                        </label>
                        <select
                          value={tableNumber}
                          onChange={e => setTableNumber(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DFD5] rounded focus:outline-none focus:border-[#5B101D]"
                        >
                          {TABLE_OPTIONS.map((t, idx) => (
                            <option key={idx} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-montserrat font-bold text-[#1E1E1E] block mb-1">
                          Your Name (Optional):
                        </label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={e => setCustomerName(e.target.value)}
                          placeholder="e.g. Kenzo R."
                          className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#E5DFD5] rounded focus:outline-none focus:border-[#5B101D]"
                        />
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="pt-4 border-t border-[#EAE3D9] space-y-2 text-xs font-body">
                      <div className="flex justify-between text-[#5C5651]">
                        <span>Subtotal</span>
                        <span>₱{subtotal}</span>
                      </div>
                      {promoDiscount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-bold">
                          <span>Promo Discount</span>
                          <span>-₱{promoDiscount}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-montserrat font-extrabold text-base text-[#1E1E1E] pt-2 border-t border-[#E5DFD5]">
                        <span>Total to Pay</span>
                        <span className="text-[#5B101D]">₱{finalTotal}</span>
                      </div>
                    </div>

                    {/* Confirm Order Button */}
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full py-3.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider rounded-md transition-all shadow-md cursor-pointer hover:scale-[1.01]"
                    >
                      CONFIRM & SEND TO COUNTER
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
