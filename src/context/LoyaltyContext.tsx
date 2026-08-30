import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LoyaltyProfile, LoyaltyTier, RewardVoucher, SmokehouseOrder } from '../types';
import { TIER_CONFIGS } from '../data/rewardsData';
import { syncOrderToSupabase, syncLoyaltyToSupabase } from '../lib/supabase';
import confetti from 'canvas-confetti';

interface LoyaltyContextType {
  profile: LoyaltyProfile;
  orders: SmokehouseOrder[];
  updateProfile: (name: string, phone: string) => void;
  claimWelcomeBonus: () => void;
  redeemVoucher: (voucher: RewardVoucher) => boolean;
  refundVoucher: (voucher: RewardVoucher) => void;
  recordOrder: (orderData: Omit<SmokehouseOrder, 'id' | 'pointsEarned' | 'timestamp' | 'status'>) => SmokehouseOrder;
  currentTierConfig: typeof TIER_CONFIGS[LoyaltyTier];
  nextTierConfig: typeof TIER_CONFIGS[LoyaltyTier] | null;
  pointsToNextTier: number;
}

const DEFAULT_PROFILE: LoyaltyProfile = {
  name: 'Pit Lover',
  phone: '0917-888-7654',
  points: 160, // Starts with demo points so users can test redemption right away!
  lifetimePoints: 240,
  totalSpent: 2400,
  ordersCount: 3,
  tier: 'Apprentice',
  memberSince: '2026'
};

const DEFAULT_ORDERS: SmokehouseOrder[] = [
  {
    id: 'MS-8421',
    tableNumber: 'Table 7',
    orderType: 'dine-in',
    customerName: 'Pit Lover',
    customerPhone: '0917-888-7654',
    items: [
      {
        id: 'smoked-beef-brisket-default',
        item: {
          id: 'smoked-beef-brisket',
          name: 'Texas Smoked Beef Brisket',
          category: 'smoked-meats',
          price: 239,
          description: '12-hour oakwood smoked beef brisket',
          imageUrl: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800&auto=format&fit=crop&q=80',
          macros: { calories: 520, protein: 42, carbs: 46, fat: 22, servingSize: '150g' }
        },
        quantity: 1,
        selectedVariant: { label: 'Budget Serving (120g)', price: 239 }
      },
      {
        id: 'smoked-pork-sinigang-default',
        item: {
          id: 'smoked-pork-sinigang',
          name: 'Smoked Pork Sinigang',
          category: 'pinoy-classics',
          price: 119,
          description: 'Sour tamarind broth with smoked pork',
          imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
          macros: { calories: 340, protein: 28, carbs: 32, fat: 12, servingSize: 'Bowl (350ml)' }
        },
        quantity: 1
      }
    ],
    subtotal: 358,
    discountAmount: 0,
    finalTotal: 358,
    pointsEarned: 35,
    timestamp: 'Yesterday at 6:45 PM',
    status: 'ready_served'
  }
];

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<LoyaltyProfile>(() => {
    const saved = localStorage.getItem('masung_loyalty_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse loyalty profile', e);
      }
    }
    return DEFAULT_PROFILE;
  });

  const [orders, setOrders] = useState<SmokehouseOrder[]>(() => {
    const saved = localStorage.getItem('masung_orders_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse orders history', e);
      }
    }
    return DEFAULT_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('masung_loyalty_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('masung_orders_history', JSON.stringify(orders));
  }, [orders]);

  // Recalculate tier based on lifetime points
  const calculateTier = (lifetimePoints: number): LoyaltyTier => {
    if (lifetimePoints >= TIER_CONFIGS.Legend.minPoints) return 'Legend';
    if (lifetimePoints >= TIER_CONFIGS.Pitmaster.minPoints) return 'Pitmaster';
    return 'Apprentice';
  };

  const updateProfile = (name: string, phone: string) => {
    setProfile(prev => ({ ...prev, name, phone }));
  };

  const claimWelcomeBonus = () => {
    setProfile(prev => ({
      ...prev,
      points: prev.points + 50,
      lifetimePoints: prev.lifetimePoints + 50
    }));
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const redeemVoucher = (voucher: RewardVoucher): boolean => {
    if (profile.points < voucher.pointsCost) return false;
    setProfile(prev => ({
      ...prev,
      points: prev.points - voucher.pointsCost
    }));
    return true;
  };

  const refundVoucher = (voucher: RewardVoucher) => {
    setProfile(prev => ({
      ...prev,
      points: prev.points + voucher.pointsCost
    }));
  };

  const recordOrder = (
    orderData: Omit<SmokehouseOrder, 'id' | 'pointsEarned' | 'timestamp' | 'status'>
  ): SmokehouseOrder => {
    const tierConfig = TIER_CONFIGS[profile.tier];
    // 1 point per 10 pesos, multiplied by tier multiplier
    const basePoints = Math.floor(orderData.finalTotal / 10);
    const earned = Math.round(basePoints * tierConfig.multiplier);

    const newLifetime = profile.lifetimePoints + earned;
    const newTier = calculateTier(newLifetime);

    const newOrder: SmokehouseOrder = {
      ...orderData,
      id: `MS-${Math.floor(1000 + Math.random() * 9000)}`,
      pointsEarned: earned,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
      status: 'pit_smoking'
    };

    setOrders(prev => [newOrder, ...prev]);

    const updatedProfile: LoyaltyProfile = {
      ...profile,
      points: profile.points + earned,
      lifetimePoints: newLifetime,
      totalSpent: profile.totalSpent + orderData.finalTotal,
      ordersCount: profile.ordersCount + 1,
      tier: newTier
    };

    setProfile(updatedProfile);

    // Asynchronously sync to Supabase without blocking UI
    syncOrderToSupabase(newOrder).catch(console.warn);
    syncLoyaltyToSupabase(updatedProfile).catch(console.warn);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#780a34', '#f2a900', '#ebdcc6', '#ffffff']
    });

    return newOrder;
  };

  const currentTierConfig = TIER_CONFIGS[profile.tier];
  let nextTierConfig: typeof TIER_CONFIGS[LoyaltyTier] | null = null;
  let pointsToNextTier = 0;

  if (profile.tier === 'Apprentice') {
    nextTierConfig = TIER_CONFIGS.Pitmaster;
    pointsToNextTier = Math.max(0, TIER_CONFIGS.Pitmaster.minPoints - profile.lifetimePoints);
  } else if (profile.tier === 'Pitmaster') {
    nextTierConfig = TIER_CONFIGS.Legend;
    pointsToNextTier = Math.max(0, TIER_CONFIGS.Legend.minPoints - profile.lifetimePoints);
  }

  return (
    <LoyaltyContext.Provider
      value={{
        profile,
        orders,
        updateProfile,
        claimWelcomeBonus,
        redeemVoucher,
        refundVoucher,
        recordOrder,
        currentTierConfig,
        nextTierConfig,
        pointsToNextTier
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) throw new Error('useLoyalty must be used within LoyaltyProvider');
  return context;
};
