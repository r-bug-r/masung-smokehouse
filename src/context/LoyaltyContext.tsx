import React, { createContext, useContext, useState, useEffect } from 'react';
import type { LoyaltyProfile, LoyaltyTier, RewardVoucher, SmokehouseOrder } from '../types';
import { TIER_CONFIGS } from '../data/rewardsData';
import { syncOrderToSupabase, syncLoyaltyToSupabase } from '../lib/supabase';
import confetti from 'canvas-confetti';

export interface RegisteredUser {
  username: string;
  password: string;
  profile: LoyaltyProfile;
  orders: SmokehouseOrder[];
  createdAt: string;
}

export interface LoyaltyContextType {
  isAuthenticated: boolean;
  currentUser: RegisteredUser | null;
  profile: LoyaltyProfile;
  orders: SmokehouseOrder[];
  login: (username: string, password: string) => { success: boolean; error?: string };
  register: (data: { name: string; phone: string; username: string; password: string }) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (name: string, phone: string) => void;
  claimWelcomeBonus: () => void;
  redeemVoucher: (voucher: RewardVoucher) => boolean;
  refundVoucher: (voucher: RewardVoucher) => void;
  recordOrder: (orderData: Omit<SmokehouseOrder, 'id' | 'pointsEarned' | 'timestamp' | 'status'>) => SmokehouseOrder;
  currentTierConfig: typeof TIER_CONFIGS[LoyaltyTier];
  nextTierConfig: typeof TIER_CONFIGS[LoyaltyTier] | null;
  pointsToNextTier: number;
}

// Clean Guest Profile: strictly 0 placeholder points!
const GUEST_PROFILE: LoyaltyProfile = {
  name: 'Guest Diner',
  phone: '',
  points: 0,
  lifetimePoints: 0,
  totalSpent: 0,
  ordersCount: 0,
  tier: 'Apprentice',
  memberSince: '2026'
};

const STORAGE_KEY_USERS = 'masung_registered_users';
const STORAGE_KEY_SESSION = 'masung_active_pitpass_session';

// Recalculate tier based on lifetime points
const calculateTier = (lifetimePoints: number): LoyaltyTier => {
  if (lifetimePoints >= TIER_CONFIGS.Legend.minPoints) return 'Legend';
  if (lifetimePoints >= TIER_CONFIGS.Pitmaster.minPoints) return 'Pitmaster';
  return 'Apprentice';
};

const DEFAULT_SEED_USERS: RegisteredUser[] = [
  {
    username: 'testuser',
    password: 'masung123',
    profile: {
      name: 'Juan Dela Cruz',
      phone: '0917-123-4567',
      points: 85,
      lifetimePoints: 85,
      totalSpent: 850,
      ordersCount: 3,
      tier: 'Apprentice',
      memberSince: '2026'
    },
    orders: [],
    createdAt: '2026-08-20'
  },
  {
    username: 'vip_diner',
    password: 'pitmaster2026',
    profile: {
      name: 'Maria Santos',
      phone: '0922-888-9999',
      points: 420,
      lifetimePoints: 420,
      totalSpent: 4200,
      ordersCount: 12,
      tier: 'Pitmaster',
      memberSince: '2026'
    },
    orders: [],
    createdAt: '2026-08-15'
  }
];

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load registered user registry with seed test accounts
  const [users, setUsers] = useState<RegisteredUser[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_SEED_USERS;
    } catch {
      return DEFAULT_SEED_USERS;
    }
  });

  // Active Authenticated Pit Pass User Session
  const [currentUser, setCurrentUser] = useState<RegisteredUser | null>(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEY_SESSION);
      if (savedSession) {
        return JSON.parse(savedSession);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const isAuthenticated = !!currentUser;
  const profile = currentUser ? currentUser.profile : GUEST_PROFILE;
  const orders = currentUser ? currentUser.orders : [];

  // Persist registered users registry
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch {
      // ignore
    }
  }, [users]);

  // Persist active session
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEY_SESSION);
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  // Authenticate user with Username/Phone and Password
  const login = (usernameInput: string, passwordInput: string): { success: boolean; error?: string } => {
    const cleanId = usernameInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    if (!cleanId || !cleanPass) {
      return { success: false, error: 'Please provide both username and password.' };
    }

    const matched = users.find(u => 
      u.username.toLowerCase() === cleanId || 
      u.profile.phone.replace(/\D/g, '') === cleanId.replace(/\D/g, '')
    );

    if (!matched) {
      return { success: false, error: 'Account not found. Please verify username or register.' };
    }

    if (matched.password !== cleanPass) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    setCurrentUser(matched);
    return { success: true };
  };

  // Register brand new member with authentic 25 Welcome Points
  const register = (data: { 
    name: string; 
    phone: string; 
    username: string; 
    password: string;
  }): { success: boolean; error?: string } => {
    const cleanName = data.name.trim();
    const cleanPhone = data.phone.trim();
    const cleanUsername = data.username.trim().toLowerCase();
    const cleanPass = data.password.trim();

    if (!cleanName || cleanName.length < 2) {
      return { success: false, error: 'Please provide your full name.' };
    }

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 10) {
      return { success: false, error: 'Please enter a valid Philippine mobile number (e.g. 0917-123-4567).' };
    }

    if (!cleanUsername || cleanUsername.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters long.' };
    }

    if (!cleanPass || cleanPass.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    const exists = users.some(u => 
      u.username.toLowerCase() === cleanUsername || 
      u.profile.phone.replace(/\D/g, '') === cleanPhone.replace(/\D/g, '')
    );

    if (exists) {
      return { success: false, error: 'An account with this username or mobile number already exists. Try signing in.' };
    }

    // Genuine welcome bonus for registering!
    const newProfile: LoyaltyProfile = {
      name: cleanName,
      phone: cleanPhone,
      points: 25,
      lifetimePoints: 25,
      totalSpent: 0,
      ordersCount: 0,
      tier: 'Apprentice',
      memberSince: new Date().getFullYear().toString()
    };

    const newUser: RegisteredUser = {
      username: cleanUsername,
      password: cleanPass,
      profile: newProfile,
      orders: [],
      createdAt: new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);

    // Sync to Supabase
    syncLoyaltyToSupabase(newProfile).catch(console.warn);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5B101D', '#C67D26', '#E5DFD5']
    });

    return { success: true };
  };

  // Sign out
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_KEY_SESSION);
  };

  const updateProfile = (name: string, phone: string) => {
    if (!currentUser) return;

    const updatedProfile = { ...currentUser.profile, name, phone };
    const updatedUser = { ...currentUser, profile: updatedProfile };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.username === currentUser.username ? updatedUser : u));
    syncLoyaltyToSupabase(updatedProfile).catch(console.warn);
  };

  const claimWelcomeBonus = () => {
    if (!currentUser) return;
    if (currentUser.profile.points > 25) return; // already claimed

    const updatedProfile = {
      ...currentUser.profile,
      points: currentUser.profile.points + 25,
      lifetimePoints: currentUser.profile.lifetimePoints + 25
    };
    const updatedUser = { ...currentUser, profile: updatedProfile };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.username === currentUser.username ? updatedUser : u));

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const redeemVoucher = (voucher: RewardVoucher): boolean => {
    if (!currentUser) return false;
    if (currentUser.profile.points < voucher.pointsCost) return false;

    const updatedProfile = {
      ...currentUser.profile,
      points: currentUser.profile.points - voucher.pointsCost
    };
    const updatedUser = { ...currentUser, profile: updatedProfile };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.username === currentUser.username ? updatedUser : u));
    syncLoyaltyToSupabase(updatedProfile).catch(console.warn);
    return true;
  };

  const refundVoucher = (voucher: RewardVoucher) => {
    if (!currentUser) return;

    const updatedProfile = {
      ...currentUser.profile,
      points: currentUser.profile.points + voucher.pointsCost
    };
    const updatedUser = { ...currentUser, profile: updatedProfile };

    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.username === currentUser.username ? updatedUser : u));
    syncLoyaltyToSupabase(updatedProfile).catch(console.warn);
  };

  const recordOrder = (
    orderData: Omit<SmokehouseOrder, 'id' | 'pointsEarned' | 'timestamp' | 'status'>
  ): SmokehouseOrder => {
    const currentTier = profile.tier;
    const tierConfig = TIER_CONFIGS[currentTier];

    // 1 point per 10 pesos, multiplied by tier multiplier
    const basePoints = Math.floor(orderData.finalTotal / 10);
    const earned = Math.round(basePoints * tierConfig.multiplier);

    const newOrder: SmokehouseOrder = {
      ...orderData,
      id: `MS-${Math.floor(1000 + Math.random() * 9000)}`,
      pointsEarned: earned,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString([], { month: 'short', day: 'numeric' }),
      status: 'submitted_unpaid'
    };

    // If customer is logged in, attach points to their real profile
    if (currentUser) {
      const newLifetime = currentUser.profile.lifetimePoints + earned;
      const newTier = calculateTier(newLifetime);

      const updatedProfile: LoyaltyProfile = {
        ...currentUser.profile,
        points: currentUser.profile.points + earned,
        lifetimePoints: newLifetime,
        totalSpent: currentUser.profile.totalSpent + orderData.finalTotal,
        ordersCount: currentUser.profile.ordersCount + 1,
        tier: newTier
      };

      const updatedUser: RegisteredUser = {
        ...currentUser,
        profile: updatedProfile,
        orders: [newOrder, ...currentUser.orders]
      };

      setCurrentUser(updatedUser);
      setUsers(prev => prev.map(u => u.username === currentUser.username ? updatedUser : u));
      syncLoyaltyToSupabase(updatedProfile).catch(console.warn);
    }

    // Also push to live orders registry for POS
    try {
      const existingOrdersJson = localStorage.getItem('masung_live_orders');
      const liveOrders = existingOrdersJson ? JSON.parse(existingOrdersJson) : [];
      localStorage.setItem('masung_live_orders', JSON.stringify([newOrder, ...liveOrders]));
    } catch {
      // ignore
    }

    // Sync order to Supabase
    syncOrderToSupabase(newOrder).catch(console.warn);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#5B101D', '#C67D26', '#E5DFD5']
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
        isAuthenticated,
        currentUser,
        profile,
        orders,
        login,
        register,
        logout,
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
