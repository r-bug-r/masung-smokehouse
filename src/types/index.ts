export type MenuCategory = 
  | 'all'
  | 'smoked-meats'
  | 'pinoy-classics'
  | 'rice-meals'
  | 'sides-extras'
  | 'drinks';

export type PageId = 'home' | 'menu' | 'order' | 'loyalty' | 'about' | 'contact' | 'reserve';

export interface MenuVariant {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  tag?: string;
  category: 'smoked-meats' | 'pinoy-classics' | 'rice-meals' | 'sides-extras' | 'drinks';
  price: number;
  description: string;
  variants?: MenuVariant[];
  includesUnlimited?: string[];
  imageUrl: string;
  popular?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
  allergens?: string[];
}

export interface CartItem {
  id: string; // unique cart line ID (item.id + variant)
  item: MenuItem;
  selectedVariant?: MenuVariant;
  quantity: number;
  notes?: string;
  spiceChoice?: string;
}

export type LoyaltyTier = 'Apprentice' | 'Pitmaster' | 'Legend';

export interface LoyaltyProfile {
  name: string;
  phone: string;
  points: number;
  lifetimePoints: number;
  totalSpent: number;
  ordersCount: number;
  tier: LoyaltyTier;
  memberSince: string;
}

export interface RewardVoucher {
  id: string;
  title: string;
  pointsCost: number;
  description: string;
  discountType: 'free_item' | 'fixed_discount' | 'perk';
  discountAmount?: number;
  freeItemName?: string;
  badge: string;
  minTier: LoyaltyTier;
}

export interface SmokehouseOrder {
  id: string;
  tableNumber: string;
  orderType: 'dine-in' | 'takeout';
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discount?: number;
  appliedReward?: RewardVoucher;
  appliedVoucher?: RewardVoucher;
  finalTotal: number;
  pointsEarned: number;
  timestamp: string;
  createdAt?: string;
  status: 'pit_smoking' | 'carving_plating' | 'ready_served' | 'smoking';
  specialInstructions?: string;
  specialNotes?: string;
}
