import React, { useState, useEffect } from 'react';
import type { PageId, SmokehouseOrder, OrderStatus } from '../types';
import { useToast } from '../context/ToastContext';
import { MENU_ITEMS } from '../data/menuData';
import { 
  CreditCard, 
  UtensilsCrossed, 
  Flame, 
  Check, 
  Search,
  Plus,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStaffAuth } from '../context/StaffAuthContext';
import { StaffLoginGate } from '../components/StaffLoginGate';

interface PosSystemPageProps {
  onNavigate: (page: PageId) => void;
}

const STORAGE_KEY = 'masung_live_orders';

const TABLES = [
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
  'Takeout / Pickup'
];

const DEFAULT_ORDERS: SmokehouseOrder[] = [
  {
    id: 'MS-101',
    orderNumber: 'MS-101',
    tableNumber: 'Table 03 (1st Floor)',
    orderType: 'dine-in',
    customerName: 'Marcus Dela Cruz',
    customerPhone: '0917-555-0192',
    items: [
      {
        id: 'smoked-beef-brisket-regular',
        item: MENU_ITEMS[0],
        selectedVariant: MENU_ITEMS[0].variants?.[1],
        quantity: 1
      },
      {
        id: 'masung-house-iced-tea-glass',
        item: MENU_ITEMS.find(i => i.id === 'masung-house-iced-tea') || MENU_ITEMS[14],
        selectedVariant: MENU_ITEMS.find(i => i.id === 'masung-house-iced-tea')?.variants?.[0],
        quantity: 1
      }
    ],
    subtotal: 284,
    discountAmount: 0,
    finalTotal: 284,
    pointsEarned: 28,
    timestamp: '5:15 PM',
    status: 'kitchen_cooking',
    paymentMethod: 'gcash',
    paymentReceivedAt: '5:16 PM'
  },
  {
    id: 'MS-102',
    orderNumber: 'MS-102',
    tableNumber: 'Table 04 (1st Floor)',
    orderType: 'dine-in',
    customerName: 'Jolina Santos',
    customerPhone: '0928-333-8877',
    items: [
      {
        id: 'smoked-pulled-pork-rice-solo',
        item: MENU_ITEMS.find(i => i.id === 'smoked-pulled-pork-rice') || MENU_ITEMS[3],
        quantity: 2
      },
      {
        id: 'sizzling-smoked-pork-sisig',
        item: MENU_ITEMS.find(i => i.id === 'sizzling-smoked-pork-sisig') || MENU_ITEMS[7],
        quantity: 1
      }
    ],
    subtotal: 317,
    discountAmount: 20,
    followToSaveDiscountApplied: true,
    finalTotal: 297,
    pointsEarned: 29,
    timestamp: '5:20 PM',
    status: 'ready_to_serve',
    paymentMethod: 'cash',
    paymentReceivedAt: '5:21 PM'
  },
  {
    id: 'MS-103',
    orderNumber: 'MS-103',
    tableNumber: 'Table 12 (2nd Floor)',
    orderType: 'dine-in',
    customerName: 'Ramon Bautista',
    customerPhone: '0919-444-1234',
    items: [
      {
        id: 'smoked-beef-pares-solo',
        item: MENU_ITEMS.find(i => i.id === 'smoked-beef-pares-rice') || MENU_ITEMS[4],
        quantity: 1
      }
    ],
    subtotal: 109,
    discountAmount: 0,
    finalTotal: 109,
    pointsEarned: 10,
    timestamp: '5:28 PM',
    status: 'submitted_unpaid'
  }
];

export const PosSystemPage: React.FC<PosSystemPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const { isStaffAuthenticated, staffUser, logoutStaff } = useStaffAuth();

  // Active Station Tab: strictly staff-facing
  const [activeStation, setActiveStation] = useState<'cashier_pos' | 'kitchen_kds' | 'expediter_serve'>('cashier_pos');

  // Live Orders State (Persisted in localStorage)
  const [orders, setOrders] = useState<SmokehouseOrder[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  // Cashier POS State
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState<SmokehouseOrder | null>(null);
  const [cashTendered, setCashTendered] = useState<number>(0);
  const [applyFollowToSave, setApplyFollowToSave] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'gcash' | 'maya' | 'card'>('cash');
  const [searchQuery, setSearchQuery] = useState('');

  // Walk-in counter manual punch state
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [walkinTable, setWalkinTable] = useState(TABLES[0]);
  const [walkinDishId, setWalkinDishId] = useState(MENU_ITEMS[0].id);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Cashier: Process and verify payment
  const handleConfirmPayment = (orderId: string) => {
    const discount = applyFollowToSave ? 20 : 0;

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'paid_counter',
          discountAmount: (o.discountAmount || 0) + discount,
          finalTotal: Math.max(0, o.subtotal - ((o.discountAmount || 0) + discount)),
          paymentMethod,
          followToSaveDiscountApplied: applyFollowToSave,
          paymentReceivedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return o;
    }));

    setSelectedOrderForPayment(null);
    setApplyFollowToSave(false);
    setCashTendered(0);

    showToast('Payment Processed', `Order ${orderId} verified. Sent to Kitchen Display.`, 'success');
  };

  // Kitchen: Update cooking status
  const handleKitchenUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));

    if (newStatus === 'kitchen_cooking') {
      showToast('Cooking', `Order ${orderId} in prep`, 'info');
    } else if (newStatus === 'ready_to_serve') {
      showToast('Plated', `Order ${orderId} ready at pass`, 'reward');
    }
  };

  // Expediter: Mark served to table
  const handleStaffMarkServed = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, status: 'served' };
      }
      return o;
    }));

    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });

    showToast('Served', `Order ${orderId} served to table.`, 'success');
  };

  // Quick Counter Manual Walk-In Order
  const handleCreateWalkinOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const item = MENU_ITEMS.find(m => m.id === walkinDishId) || MENU_ITEMS[0];
    const newId = `MS-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder: SmokehouseOrder = {
      id: newId,
      orderNumber: newId,
      tableNumber: walkinTable,
      orderType: walkinTable.includes('Takeout') ? 'takeout' : 'dine-in',
      customerName: 'Counter Walk-In',
      customerPhone: '09xx-xxx-xxxx',
      items: [
        {
          id: `${item.id}-solo`,
          item,
          quantity: 1
        }
      ],
      subtotal: item.price,
      discountAmount: 0,
      finalTotal: item.price,
      pointsEarned: Math.floor(item.price / 10),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'submitted_unpaid'
    };

    setOrders(prev => [newOrder, ...prev]);
    setShowWalkinModal(false);
    showToast('Walk-in Created', `Order ${newId} queued at cashier counter.`, 'success');
  };

  // Filtered orders for cashier search
  const pendingPaymentOrders = orders.filter(o => 
    o.status === 'submitted_unpaid' &&
    (searchQuery === '' || o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const cookingOrders = orders.filter(o => o.status === 'paid_counter' || o.status === 'kitchen_cooking');
  const readyOrders = orders.filter(o => o.status === 'ready_to_serve');

  if (!isStaffAuthenticated) {
    return <StaffLoginGate onNavigate={onNavigate} terminalName="POS System" />;
  }

  return (
    <div className="min-h-screen bg-[#FBF8F3] py-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header: Staff Terminal */}
        <div className="bg-white border-2 border-[#5B101D] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C67D26] block">
              Staff Operations Only
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-[#181615] tracking-tight">
              MASUNG <span className="text-[#5B101D]">STAFF POS</span>
            </h1>
            <p className="text-xs text-[#5C5651]">
              Cashier Payment • Kitchen Display • Floor Expediter (15 Tables: 11 on 1st Floor, 4 on 2nd Floor)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {staffUser && (
              <div className="px-3 py-2 bg-[#FBF8F3] border border-[#E5DFD5] text-[#181615] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5B101D]" />
                <span className="font-mono font-bold text-[11px] uppercase">{staffUser.name}</span>
              </div>
            )}
            <button
              onClick={() => setShowWalkinModal(true)}
              className="px-3.5 py-2 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Manual Walk-In Order</span>
            </button>
            <button
              onClick={() => onNavigate('inventory')}
              className="px-3.5 py-2 border border-[#E5DFD5] hover:border-[#5B101D] text-[#181615] font-semibold transition-colors cursor-pointer"
            >
              Inventory
            </button>
            <button
              onClick={() => {
                logoutStaff();
                onNavigate('home');
              }}
              title="Lock Staff Terminal"
              className="px-3 py-2 bg-[#460B15] hover:bg-[#5B101D] text-white flex items-center gap-1.5 cursor-pointer text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* Station Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-stone-200/60 p-1 border border-[#E5DFD5]">
          
          <button
            onClick={() => setActiveStation('cashier_pos')}
            className={`py-3 px-3 flex items-center justify-center gap-2 font-heading font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeStation === 'cashier_pos'
                ? 'bg-[#5B101D] text-white shadow-xs'
                : 'bg-white text-[#5C5651] hover:text-[#181615]'
            }`}
          >
            <CreditCard className="w-4 h-4 text-[#C67D26]" />
            <span>1. Cashier POS</span>
            {pendingPaymentOrders.length > 0 && (
              <span className="w-5 h-5 bg-[#C67D26] text-white text-[10px] rounded-full flex items-center justify-center font-mono font-bold">
                {pendingPaymentOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveStation('kitchen_kds')}
            className={`py-3 px-3 flex items-center justify-center gap-2 font-heading font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeStation === 'kitchen_kds'
                ? 'bg-[#5B101D] text-white shadow-xs'
                : 'bg-white text-[#5C5651] hover:text-[#181615]'
            }`}
          >
            <Flame className="w-4 h-4 text-[#C67D26]" />
            <span>2. Kitchen KDS</span>
            {cookingOrders.length > 0 && (
              <span className="w-5 h-5 bg-[#5B101D] text-white text-[10px] rounded-full flex items-center justify-center font-mono font-bold">
                {cookingOrders.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveStation('expediter_serve')}
            className={`py-3 px-3 flex items-center justify-center gap-2 font-heading font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeStation === 'expediter_serve'
                ? 'bg-[#5B101D] text-white shadow-xs'
                : 'bg-white text-[#5C5651] hover:text-[#181615]'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4 text-[#C67D26]" />
            <span>3. Floor Expediter</span>
            {readyOrders.length > 0 && (
              <span className="w-5 h-5 bg-green-700 text-white text-[10px] rounded-full flex items-center justify-center font-mono font-bold">
                {readyOrders.length}
              </span>
            )}
          </button>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* STATION 1: CASHIER COUNTER POS */}
        {/* ------------------------------------------------------------- */}
        {activeStation === 'cashier_pos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Queue of Unpaid Orders Submitted by Customers */}
            <div className="lg:col-span-7 bg-white border border-[#E5DFD5] p-5 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-[#E5DFD5]">
                <div>
                  <h3 className="font-heading font-extrabold text-sm uppercase text-[#181615]">
                    Unpaid Customer Orders ({pendingPaymentOrders.length})
                  </h3>
                  <span className="text-[11px] text-[#5C5651]">
                    Orders submitted via QR Menu awaiting counter payment
                  </span>
                </div>

                <div className="relative w-full sm:w-48">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search #MS-xxx..."
                    className="w-full pl-8 pr-3 py-1.5 bg-[#FBF8F3] border border-[#E5DFD5] text-xs focus:outline-none focus:border-[#5B101D]"
                  />
                </div>
              </div>

              {pendingPaymentOrders.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#8A837C] bg-[#FBF8F3] border border-dashed border-[#E5DFD5]">
                  No unpaid customer orders in queue.
                </div>
              ) : (
                <div className="divide-y divide-[#E5DFD5]">
                  {pendingPaymentOrders.map(order => {
                    const isSelected = selectedOrderForPayment?.id === order.id;
                    return (
                      <div
                        key={order.id}
                        onClick={() => {
                          setSelectedOrderForPayment(order);
                          setCashTendered(order.finalTotal);
                        }}
                        className={`p-3.5 transition-colors cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#FBF8F3] border-l-4 border-[#5B101D]'
                            : 'hover:bg-stone-50'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-[#5B101D]">
                              #{order.id}
                            </span>
                            <span className="font-bold text-xs text-[#181615]">
                              {order.tableNumber}
                            </span>
                            <span className="text-[10px] text-[#8A837C]">
                              ({order.items.length} items)
                            </span>
                          </div>
                          <div className="text-[11px] text-[#5C5651]">
                            {order.customerName} • {order.timestamp}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-extrabold text-sm text-[#181615] block">
                            ₱{order.finalTotal}
                          </span>
                          <span className="text-[9px] font-mono text-amber-800 bg-amber-100 px-1.5 py-0.5 font-bold uppercase">
                            Pay Pending
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Payment Settlement Terminal */}
            <div className="lg:col-span-5 bg-white border border-[#E5DFD5] p-5 space-y-4">
              <div className="pb-2 border-b border-[#E5DFD5] flex justify-between items-center">
                <h3 className="font-heading font-extrabold text-sm uppercase text-[#181615]">
                  Payment Terminal
                </h3>
                {selectedOrderForPayment && (
                  <span className="font-mono font-bold text-xs text-[#5B101D]">
                    Order #{selectedOrderForPayment.id}
                  </span>
                )}
              </div>

              {!selectedOrderForPayment ? (
                <div className="p-8 text-center text-xs text-[#8A837C] bg-[#FBF8F3] border border-dashed border-[#E5DFD5]">
                  Select an order on the left to process payment.
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  
                  {/* Order Summary */}
                  <div className="p-3 bg-[#FBF8F3] border border-[#E5DFD5] space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#5C5651]">Table:</span>
                      <strong>{selectedOrderForPayment.tableNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5C5651]">Guest:</span>
                      <strong>{selectedOrderForPayment.customerName}</strong>
                    </div>
                    <div className="flex justify-between text-xs pt-1 border-t border-[#E5DFD5]">
                      <span className="text-[#5C5651]">Items:</span>
                      <span>{selectedOrderForPayment.items.map(i => `${i.quantity}x ${i.item.name}`).join(', ')}</span>
                    </div>
                  </div>

                  {/* Follow-to-Save Discount Toggle */}
                  <div className="p-3 bg-[#FFF8E7] border border-[#C67D26] flex items-center justify-between">
                    <div>
                      <strong className="text-[#8A4F08] block text-xs">Follow-to-Save (-₱20)</strong>
                      <span className="text-[10px] text-[#5C5651]">Follows Masung on IG/TikTok</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={applyFollowToSave}
                      onChange={e => setApplyFollowToSave(e.target.checked)}
                      className="w-4 h-4 accent-[#5B101D] cursor-pointer"
                    />
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <label className="font-bold text-[#181615] uppercase tracking-wider block mb-1">
                      Payment Method:
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                      {(['cash', 'gcash', 'maya', 'card'] as const).map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setPaymentMethod(m)}
                          className={`py-1.5 font-bold uppercase text-[10px] border cursor-pointer ${
                            paymentMethod === m
                              ? 'bg-[#5B101D] text-white border-[#5B101D]'
                              : 'bg-white text-[#5C5651] border-[#E5DFD5]'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Total & Change Calculator */}
                  <div className="space-y-1.5 pt-2 border-t border-[#E5DFD5]">
                    <div className="flex justify-between text-xs">
                      <span>Subtotal:</span>
                      <span>₱{selectedOrderForPayment.subtotal}</span>
                    </div>
                    {applyFollowToSave && (
                      <div className="flex justify-between text-xs text-[#5B101D] font-bold">
                        <span>Follower Discount:</span>
                        <span>-₱20</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-extrabold text-[#5B101D] pt-1 border-t border-[#E5DFD5]">
                      <span>Amount Due:</span>
                      <span>₱{Math.max(0, selectedOrderForPayment.subtotal - (applyFollowToSave ? 20 : 0))}</span>
                    </div>
                  </div>

                  {/* Cash Change */}
                  {paymentMethod === 'cash' && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8A837C] block">
                          Cash Tendered:
                        </label>
                        <input
                          type="number"
                          value={cashTendered || ''}
                          onChange={e => setCashTendered(Number(e.target.value))}
                          placeholder="Amount"
                          className="w-full p-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs font-mono font-bold focus:outline-none focus:border-[#5B101D]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-[#8A837C] block">
                          Change Due:
                        </label>
                        <div className="p-2 bg-stone-100 border border-[#E5DFD5] text-xs font-mono font-bold text-green-800">
                          ₱{Math.max(0, cashTendered - Math.max(0, selectedOrderForPayment.subtotal - (applyFollowToSave ? 20 : 0)))}
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleConfirmPayment(selectedOrderForPayment.id)}
                    className="w-full py-3 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                  >
                    <Check className="w-4 h-4 text-[#C67D26]" />
                    <span>Confirm Payment & Send to Kitchen</span>
                  </button>

                </div>
              )}

            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STATION 2: KITCHEN DISPLAY SYSTEM (KDS) */}
        {/* ------------------------------------------------------------- */}
        {activeStation === 'kitchen_kds' && (
          <div className="bg-white border border-[#E5DFD5] p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5DFD5]">
              <div>
                <h3 className="font-heading font-extrabold text-sm uppercase text-[#181615]">
                  Active Kitchen Queue ({cookingOrders.length})
                </h3>
                <span className="text-[11px] text-[#5C5651]">
                  Dishes to slice, cook, and plate
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[#5B101D]">
                Pit Carving Line
              </span>
            </div>

            {cookingOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#8A837C] bg-[#FBF8F3] border border-dashed border-[#E5DFD5]">
                No orders currently in prep. All caught up!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cookingOrders.map(order => (
                  <div
                    key={order.id}
                    className="border-2 border-[#5B101D] p-4 bg-[#FBF8F3] flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start pb-2 border-b border-[#E5DFD5]">
                        <div>
                          <span className="font-mono font-bold text-sm text-[#5B101D] block">
                            #{order.id}
                          </span>
                          <strong className="text-xs text-[#181615]">
                            {order.tableNumber}
                          </strong>
                        </div>
                        <span className="text-[10px] font-mono text-[#8A837C]">
                          {order.timestamp}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center bg-white p-2 border border-[#E5DFD5]">
                            <div>
                              <strong className="text-[#181615] block">
                                {it.quantity}x {it.item.name}
                              </strong>
                              <span className="text-[10px] text-[#5C5651]">
                                {it.selectedVariant?.label || 'Regular'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E5DFD5] flex gap-2">
                      {order.status === 'paid_counter' ? (
                        <button
                          onClick={() => handleKitchenUpdateStatus(order.id, 'kitchen_cooking')}
                          className="flex-1 py-2 bg-[#C67D26] text-white text-xs font-heading font-bold uppercase cursor-pointer"
                        >
                          Start Slicing
                        </button>
                      ) : (
                        <button
                          onClick={() => handleKitchenUpdateStatus(order.id, 'ready_to_serve')}
                          className="flex-1 py-2 bg-green-700 text-white text-xs font-heading font-bold uppercase cursor-pointer"
                        >
                          Mark Plated & Ready →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* STATION 3: FLOOR STAFF EXPEDITER */}
        {/* ------------------------------------------------------------- */}
        {activeStation === 'expediter_serve' && (
          <div className="bg-white border border-[#E5DFD5] p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#E5DFD5]">
              <div>
                <h3 className="font-heading font-extrabold text-sm uppercase text-[#181615]">
                  Plated Dishes Ready to Deliver ({readyOrders.length})
                </h3>
                <span className="text-[11px] text-[#5C5651]">
                  Deliver to 1st Floor (Tables 01–11) or 2nd Floor (Tables 12–15)
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-green-800">
                At the Pass
              </span>
            </div>

            {readyOrders.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#8A837C] bg-[#FBF8F3] border border-dashed border-[#E5DFD5]">
                No orders waiting to be served.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {readyOrders.map(order => (
                  <div
                    key={order.id}
                    className="border-2 border-green-700 p-4 bg-white flex flex-col justify-between space-y-3 shadow-xs"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start pb-2 border-b border-[#E5DFD5]">
                        <div>
                          <span className="font-mono font-bold text-sm text-green-800 block">
                            #{order.id}
                          </span>
                          <strong className="text-xs text-[#181615]">
                            {order.tableNumber}
                          </strong>
                        </div>
                        <span className="text-[10px] font-mono text-green-800 bg-green-100 px-1.5 py-0.5 font-bold uppercase">
                          Ready
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-[#5C5651]">
                        {order.items.map((it, idx) => (
                          <div key={idx}>
                            • {it.quantity}x {it.item.name}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleStaffMarkServed(order.id)}
                      className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white font-heading font-extrabold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      ✓ Confirm Served to Table
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Walk-In Manual Order Modal */}
        {showWalkinModal && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white border-2 border-[#5B101D] p-5 max-w-md w-full space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#E5DFD5]">
                <h3 className="font-heading font-extrabold text-sm uppercase text-[#181615]">
                  Create Walk-In Order
                </h3>
                <button
                  onClick={() => setShowWalkinModal(false)}
                  className="text-stone-400 hover:text-[#181615] text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateWalkinOrder} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#181615] uppercase block mb-1">
                    Select Table (15 Tables):
                  </label>
                  <select
                    value={walkinTable}
                    onChange={e => setWalkinTable(e.target.value)}
                    className="w-full p-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs font-semibold"
                  >
                    {TABLES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#181615] uppercase block mb-1">
                    Select Dish:
                  </label>
                  <select
                    value={walkinDishId}
                    onChange={e => setWalkinDishId(e.target.value)}
                    className="w-full p-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs font-semibold"
                  >
                    {MENU_ITEMS.map(m => (
                      <option key={m.id} value={m.id}>{m.name} (₱{m.price})</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowWalkinModal(false)}
                    className="flex-1 py-2 bg-stone-100 text-[#181615] font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#5B101D] text-white font-bold text-xs"
                  >
                    Queue Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
