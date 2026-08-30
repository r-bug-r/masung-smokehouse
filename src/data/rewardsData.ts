import type { RewardVoucher, LoyaltyTier } from '../types';

export interface TierConfig {
  tier: LoyaltyTier;
  minPoints: number;
  badge: string;
  color: string;
  perks: string[];
  multiplier: number;
}

export const TIER_CONFIGS: Record<LoyaltyTier, TierConfig> = {
  Apprentice: {
    tier: 'Apprentice',
    minPoints: 0,
    badge: 'Wood Smoker Apprentice',
    color: 'bg-[#32070E]',
    perks: [
      'Earn 1 BBQ Point for every ₱10 spent',
      'Unlimited Free Red Rice with any meal order',
      'Unlimited Free Hot Bone Broth refills'
    ],
    multiplier: 1.0
  },
  Pitmaster: {
    tier: 'Pitmaster',
    minPoints: 250,
    badge: 'Certified Pitmaster',
    color: 'bg-[#5B101D]',
    perks: [
      '10% BBQ Point Multiplier (1.1x points)',
      'Free Masung House Smoked Iced Tea refill',
      'Priority pit-side table selection'
    ],
    multiplier: 1.1
  },
  Legend: {
    tier: 'Legend',
    minPoints: 700,
    badge: 'Smokehouse Legend',
    color: 'bg-[#C67D26]',
    perks: [
      '20% BBQ Point Multiplier (1.2x points)',
      'Exclusive VIP Table Reservation & Pit Tour',
      'Secret Off-Menu Smoked Specials access'
    ],
    multiplier: 1.2
  }
};

export const REWARD_VOUCHERS: RewardVoucher[] = [
  {
    id: 'reward-bbq-sauce',
    title: 'Free BBQ Sauce Dip & Corn',
    pointsCost: 35,
    description: 'House barbecue dipping sauce and warm sweet buttered corn.',
    discountType: 'free_item',
    discountAmount: 49,
    freeItemName: 'Charred Sweet Corn with Butter',
    badge: 'Quick Nibble',
    minTier: 'Apprentice'
  },
  {
    id: 'reward-iced-tea',
    title: 'Free 1L Barkada Iced Tea Pitcher',
    pointsCost: 65,
    description: 'A cold 1-liter pitcher of house iced tea for your table.',
    discountType: 'free_item',
    discountAmount: 120,
    freeItemName: 'Barkada Iced Tea Pitcher',
    badge: 'Drink Perk',
    minTier: 'Apprentice'
  },
  {
    id: 'reward-pork-pares',
    title: 'Free Smoked Pork Pares Bowl',
    pointsCost: 95,
    description: 'A full sharing bowl of our 8-hour braised smoked pork pares with hot broth.',
    discountType: 'free_item',
    discountAmount: 99,
    freeItemName: 'Smoked Pork Pares Sharing',
    badge: 'Pinoy Classic',
    minTier: 'Apprentice'
  },
  {
    id: 'reward-smoked-sisig',
    title: 'Free Sizzling Smoked Beef Sisig',
    pointsCost: 130,
    description: 'Crisp smoked brisket sisig on a sizzling skillet with egg, calamansi, and chili.',
    discountType: 'free_item',
    discountAmount: 139,
    freeItemName: 'Sizzling Smoked Beef Sisig',
    badge: 'Top Skillet',
    minTier: 'Pitmaster'
  },
  {
    id: 'reward-peso-100',
    title: '₱100 Off Your Bill',
    pointsCost: 180,
    description: '₱100 off your final table order total.',
    discountType: 'fixed_discount',
    discountAmount: 100,
    badge: 'Discount',
    minTier: 'Pitmaster'
  },
  {
    id: 'reward-texas-brisket',
    title: 'Free 120g Smoked Beef Brisket',
    pointsCost: 240,
    description: '120g of 12-hour wood-smoked beef brisket with pepper bark and pink smoke ring.',
    discountType: 'free_item',
    discountAmount: 239,
    freeItemName: 'Texas Smoked Beef Brisket (120g)',
    badge: 'Pit Special',
    minTier: 'Legend'
  }
];
