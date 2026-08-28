import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, MenuItem, MenuVariant, RewardVoucher } from '../types';
import { useLoyalty } from './LoyaltyContext';

export interface SocialVoucherStatus {
  facebook: boolean;
  instagram: boolean;
}

interface CartContextType {
  items: CartItem[];
  tableNumber: string;
  orderType: 'dine-in' | 'takeout';
  customerName: string;
  customerPhone: string;
  specialInstructions: string;
  appliedReward?: RewardVoucher;
  appliedPromoCode?: string;
  promoDiscount: number;
  claimedSocialVouchers: SocialVoucherStatus;
  isCartOpen: boolean;
  isQRMode: boolean;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  pointsToEarn: number;
  totalQuantity: number;
  setTableNumber: (table: string) => void;
  setOrderType: (type: 'dine-in' | 'takeout') => void;
  setCustomerName: (name: string) => void;
  setCustomerPhone: (phone: string) => void;
  setSpecialInstructions: (notes: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsQRMode: (qrMode: boolean) => void;
  addItem: (item: MenuItem, variant?: MenuVariant, notes?: string, spice?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  applyReward: (voucher?: RewardVoucher) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  claimSocialVoucher: (platform: 'facebook' | 'instagram') => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, currentTierConfig, redeemVoucher, refundVoucher } = useLoyalty();

  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('masung_cart_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart items', e);
      }
    }
    return [];
  });

  const [tableNumber, setTableNumber] = useState<string>('Table 4');
  const [orderType, setOrderType] = useState<'dine-in' | 'takeout'>('dine-in');
  const [customerName, setCustomerName] = useState<string>(profile.name || 'Pit Enthusiast');
  const [customerPhone, setCustomerPhone] = useState<string>(profile.phone || '0968 237 0329');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [appliedReward, setAppliedReward] = useState<RewardVoucher | undefined>(undefined);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | undefined>(undefined);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isQRMode, setIsQRMode] = useState<boolean>(false);

  const [claimedSocialVouchers, setClaimedSocialVouchers] = useState<SocialVoucherStatus>(() => ({
    facebook: localStorage.getItem('masung_claimed_fb') === 'true',
    instagram: localStorage.getItem('masung_claimed_ig') === 'true'
  }));

  useEffect(() => {
    localStorage.setItem('masung_cart_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (profile.name) setCustomerName(profile.name);
    if (profile.phone) setCustomerPhone(profile.phone);
  }, [profile]);

  const addItem = (item: MenuItem, variant?: MenuVariant, notes?: string, spice?: string) => {
    const variantKey = variant ? variant.label : 'standard';
    const cartItemId = `${item.id}-${variantKey}-${spice || 'normal'}`;

    setItems(prev => {
      const existing = prev.find(i => i.id === cartItemId);
      if (existing) {
        return prev.map(i =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + 1, notes: notes || i.notes } : i
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          item,
          selectedVariant: variant,
          quantity: 1,
          notes,
          spiceChoice: spice
        }
      ];
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems(prev => {
      return prev
        .map(i => {
          if (i.id === cartItemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems(prev => prev.filter(i => i.id !== cartItemId));
  };

  const applyReward = (voucher?: RewardVoucher) => {
    if (!voucher) {
      if (appliedReward) {
        refundVoucher(appliedReward);
      }
      setAppliedReward(undefined);
      return;
    }

    const success = redeemVoucher(voucher);
    if (success) {
      if (appliedReward) {
        refundVoucher(appliedReward);
      }
      setAppliedReward(voucher);
    }
  };

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'MASUNGFB50') {
      setAppliedPromoCode('MASUNGFB50');
      setPromoDiscount(50);
      return { success: true, message: '₱50 Facebook Follower voucher applied!' };
    }
    if (cleanCode === 'MASUNGIG50') {
      setAppliedPromoCode('MASUNGIG50');
      setPromoDiscount(50);
      return { success: true, message: '₱50 Instagram Follower voucher applied!' };
    }
    if (cleanCode === 'MASUNG10') {
      setAppliedPromoCode('MASUNG10');
      const discount = Math.round(subtotal * 0.1);
      setPromoDiscount(discount);
      return { success: true, message: '10% Welcome discount applied!' };
    }
    return { success: false, message: 'Invalid voucher code.' };
  };

  const removePromoCode = () => {
    setAppliedPromoCode(undefined);
    setPromoDiscount(0);
  };

  const claimSocialVoucher = (platform: 'facebook' | 'instagram') => {
    const key = platform === 'facebook' ? 'masung_claimed_fb' : 'masung_claimed_ig';
    localStorage.setItem(key, 'true');
    setClaimedSocialVouchers(prev => ({
      ...prev,
      [platform]: true
    }));
    
    // Automatically apply the voucher discount if not already applied
    const code = platform === 'facebook' ? 'MASUNGFB50' : 'MASUNGIG50';
    applyPromoCode(code);
  };

  const clearCart = () => {
    setItems([]);
    setAppliedReward(undefined);
    setAppliedPromoCode(undefined);
    setPromoDiscount(0);
    setSpecialInstructions('');
  };

  const subtotal = items.reduce((sum, cartItem) => {
    const itemPrice = cartItem.selectedVariant?.price ?? cartItem.item.price;
    return sum + itemPrice * cartItem.quantity;
  }, 0);

  const pointsDiscount = appliedReward
    ? Math.min(subtotal, appliedReward.discountAmount ?? (appliedReward.discountType === 'fixed_discount' ? 100 : 0))
    : 0;

  const totalDiscount = Math.min(subtotal, pointsDiscount + promoDiscount);
  const finalTotal = Math.max(0, subtotal - totalDiscount);

  // 1 BBQ point per ₱10 spent, boosted by tier multiplier
  const basePoints = Math.floor(finalTotal / 10);
  const pointsToEarn = Math.round(basePoints * currentTierConfig.multiplier);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        tableNumber,
        orderType,
        customerName,
        customerPhone,
        specialInstructions,
        appliedReward,
        appliedPromoCode,
        promoDiscount,
        claimedSocialVouchers,
        isCartOpen,
        isQRMode,
        subtotal,
        discountAmount: totalDiscount,
        finalTotal,
        pointsToEarn,
        totalQuantity,
        setTableNumber,
        setOrderType,
        setCustomerName,
        setCustomerPhone,
        setSpecialInstructions,
        setIsCartOpen,
        setIsQRMode,
        addItem,
        updateQuantity,
        removeItem,
        applyReward,
        applyPromoCode,
        removePromoCode,
        claimSocialVoucher,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
