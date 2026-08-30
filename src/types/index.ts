export type MenuCategory = 
  | 'all'
  | 'smoked-meats'
  | 'pinoy-classics'
  | 'rice-meals'
  | 'sides-extras'
  | 'drinks'
  | 'texas-smoked'
  | 'sulit-bowls'
  | 'barkada-platters'
  | 'sides-refills'
  | 'drinks-brews';

export type PageId = 
  | 'home' 
  | 'menu' 
  | 'order' 
  | 'loyalty' 
  | 'about' 
  | 'contact' 
  | 'reserve' 
  | 'reserve-menu' 
  | 'reserve-shop' 
  | 'reserve-about' 
  | 'reserve-book' 
  | 'reserve-vip'
  | 'pos'
  | 'reservation'
  | 'feedback'
  | 'inventory';

export interface MenuVariant {
  label: string;
  price: number;
  macros?: NutritionalMacros;
}

export interface NutritionalMacros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  tag?: string;
  category: 'smoked-meats' | 'pinoy-classics' | 'rice-meals' | 'sides-extras' | 'drinks' | 'texas-smoked' | 'sulit-bowls' | 'barkada-platters' | 'sides-refills' | 'drinks-brews';
  price: number;
  description: string;
  macros: NutritionalMacros;
  reserveEdition?: boolean;
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

export type OrderStatus = 
  | 'submitted_unpaid'    // Step 1: Order created, customer instructed to pay at counter
  | 'paid_counter'        // Step 2: Cashier received payment, ticket sent to kitchen
  | 'kitchen_cooking'     // Step 3: Kitchen is carving / smoking / assembling
  | 'ready_to_serve'      // Step 4: Plated at pass, ready for staff delivery
  | 'served'              // Step 5: Staff served to customer table
  | 'cancelled'
  | 'pit_smoking'         // Legacy compat
  | 'carving_plating'     // Legacy compat
  | 'ready_served'        // Legacy compat
  | 'smoking';            // Legacy compat

export interface SmokehouseOrder {
  id: string;
  orderNumber?: string;
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
  status: OrderStatus;
  paymentMethod?: 'cash' | 'gcash' | 'maya' | 'card' | 'counter';
  paymentReceivedAt?: string;
  followToSaveDiscountApplied?: boolean;
  specialInstructions?: string;
  specialNotes?: string;
}

export interface ReserveBooking {
  id: string;
  bookingRef?: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  date: string;
  timeSlot: string;
  partySize: number;
  seatingZone: 'first_floor' | 'second_floor' | 'full_venue' | string;
  eventType?: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'seated';
  createdAt: string;
}

export interface InventoryCut {
  id: string;
  name: string;
  cutType: 'beef_brisket' | 'pork_belly' | 'pork_ribs' | 'pulled_pork' | 'red_rice' | 'bone_broth';
  currentStockKg: number;
  portionsRemaining: number;
  hourlyVelocity: number; // portions per hour
  projectedStockoutHours: number;
  smokerBatchNumber: string;
  hoursInPit: number;
  targetPitHours: number;
  status: 'in_pit' | 'resting' | 'carving_ready' | 'low_stock' | 'sold_out';
  nextBatchEta: string;
  minimumPrepNoticeHours: number;
}

export interface StudentPoll {
  id: string;
  date: string;
  question: string;
  context: string;
  yesCount: number;
  noCount: number;
  category: 'food_debate' | 'menu_drop' | 'barkada_culture';
  userVoted?: 'yes' | 'no';
}

export interface ReviewFeedback {
  id: string;
  customerName: string;
  rating: number; // 1 to 5
  foodRating: number;
  smokeRating: number;
  valueRating: number;
  comment: string;
  tags: string[];
  tableOrOrder?: string;
  createdAt: string;
  verifiedDiner: boolean;
}
