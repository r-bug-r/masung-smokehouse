import type { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- TEXAS SMOKED MEATS (8–16 Hours Low & Slow) ---
  {
    id: 'smoked-beef-brisket',
    name: 'Texas Smoked Beef Brisket',
    tag: 'Pitmaster Pride',
    category: 'texas-smoked',
    price: 239,
    description: 'Smoked for 12 hours over Philippine oakwood. Sliced against the grain with a coarse black pepper crust, pink smoke ring, and natural rendering.',
    macros: {
      calories: 520,
      protein: 42,
      carbs: 46,
      fat: 22,
      servingSize: '120g Sliced Brisket + 1 Cup Heirloom Red Rice'
    },
    reserveEdition: true,
    variants: [
      { 
        label: 'Solo Carve (60g)', 
        price: 139,
        macros: { calories: 340, protein: 24, carbs: 46, fat: 12, servingSize: '60g Brisket + Rice' }
      },
      { 
        label: 'Regular Plate (120g)', 
        price: 239,
        macros: { calories: 520, protein: 42, carbs: 46, fat: 22, servingSize: '120g Brisket + Rice' }
      },
      { 
        label: 'Big Sharing (200g)', 
        price: 379,
        macros: { calories: 760, protein: 68, carbs: 46, fat: 34, servingSize: '200g Sliced Brisket + Rice' }
      }
    ],
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },
  {
    id: 'smoked-pork-belly',
    name: 'Hickory Smoked Pork Belly',
    tag: 'Crisp & Juicy',
    category: 'texas-smoked',
    price: 179,
    description: 'Pork belly smoked low and slow for 8 hours until the fat layer renders soft like butter, finished with house barbecue glaze.',
    macros: {
      calories: 560,
      protein: 32,
      carbs: 48,
      fat: 28,
      servingSize: '120g Pork Belly + 1 Cup Red Rice'
    },
    variants: [
      { 
        label: 'Solo Cut (70g)', 
        price: 119,
        macros: { calories: 380, protein: 20, carbs: 46, fat: 18, servingSize: '70g Pork Belly + Rice' }
      },
      { 
        label: 'Sharing Plate (120g)', 
        price: 179,
        macros: { calories: 560, protein: 32, carbs: 48, fat: 28, servingSize: '120g Pork Belly + Rice' }
      },
      { 
        label: 'Big Platter (220g)', 
        price: 319,
        macros: { calories: 880, protein: 56, carbs: 48, fat: 48, servingSize: '220g Pork Belly + Rice' }
      }
    ],
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 0
  },
  {
    id: 'texas-smoked-ribs',
    name: 'St. Louis Smoked Pork Ribs',
    tag: 'Signature Slab',
    category: 'texas-smoked',
    price: 329,
    description: 'Dry-rubbed with brown sugar, sea salt, and paprika, then smoked for 6 hours. Meat pulls cleanly off the bone with gentle bite.',
    macros: {
      calories: 640,
      protein: 48,
      carbs: 42,
      fat: 32,
      servingSize: 'Half Rack (approx. 380g bone-in) + Red Rice'
    },
    reserveEdition: true,
    variants: [
      { 
        label: 'Half Rack (3-4 Bones)', 
        price: 329,
        macros: { calories: 640, protein: 48, carbs: 42, fat: 32, servingSize: 'Half Rack + Red Rice' }
      },
      { 
        label: 'Full Rack Feast', 
        price: 599,
        macros: { calories: 1220, protein: 94, carbs: 54, fat: 62, servingSize: 'Full Rack (7-8 Bones)' }
      }
    ],
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },

  // --- ₱99 SULIT SOLO BOWLS (Student & Everyday Favorites) ---
  {
    id: 'smoked-pulled-pork-rice',
    name: 'Smoked Pulled Pork Rice Bowl',
    tag: 'Sulit ₱99',
    category: 'sulit-bowls',
    price: 99,
    description: 'Shredded pork shoulder smoked for 10 hours, tossed in tangy pit sauce and heaped over hot red rice.',
    macros: {
      calories: 470,
      protein: 31,
      carbs: 55,
      fat: 15,
      servingSize: 'Single Bowl with Rice & Broth'
    },
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },
  {
    id: 'chili-con-carne-rice',
    name: 'Smoked Chili Con Carne Bowl',
    tag: 'Sulit ₱99',
    category: 'sulit-bowls',
    price: 99,
    description: 'Ground beef and kidney beans slow-simmered with smoked brisket drippings, cumin, tomatoes, and native chilies over red rice.',
    macros: {
      calories: 450,
      protein: 29,
      carbs: 58,
      fat: 12,
      servingSize: 'Single Bowl with Rice & Broth'
    },
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 2
  },
  {
    id: 'smoked-pork-pares',
    name: 'Smoked Pork Pares Bowl',
    tag: 'Sulit ₱99',
    category: 'sulit-bowls',
    price: 99,
    description: 'Tender smoked pork cuts braised in sweet-savory garlic star anise gravy. Served with unlimited hot red rice and piping bone soup.',
    macros: {
      calories: 440,
      protein: 26,
      carbs: 52,
      fat: 16,
      servingSize: 'Single Bowl with Rice & Broth'
    },
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },

  // --- FILIPINO × TEXAS FUSION (Pinoy Comfort Food with Texas Smoke) ---
  {
    id: 'smoked-beef-kare-kare',
    name: 'Smoked Beef Kare-Kare',
    tag: 'House Fusion',
    category: 'pinoy-classics',
    price: 179,
    description: 'Roasted peanut sauce cooked with brisket pan drippings, thick smoked beef chunks, native eggplant, pechay, and house bagoong.',
    macros: {
      calories: 580,
      protein: 36,
      carbs: 52,
      fat: 26,
      servingSize: 'Solo Meal Bowl with Red Rice & Bagoong'
    },
    variants: [
      { 
        label: 'Solo Meal (with Red Rice)', 
        price: 179,
        macros: { calories: 580, protein: 36, carbs: 52, fat: 26, servingSize: 'Solo Bowl + Red Rice' }
      },
      { 
        label: 'Barkada Bowl (2-3 Pax)', 
        price: 269,
        macros: { calories: 920, protein: 62, carbs: 68, fat: 42, servingSize: 'Sharing Bowl for 2-3' }
      }
    ],
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 0
  },
  {
    id: 'sizzling-smoked-beef-sisig',
    name: 'Sizzling Smoked Beef Sisig',
    tag: 'Pulutan & Rice Meal',
    category: 'pinoy-classics',
    price: 139,
    description: 'Wood-smoked brisket chopped and seared on a cast iron sizzling plate with onions, green chili, calamansi, and a farm egg.',
    macros: {
      calories: 490,
      protein: 34,
      carbs: 44,
      fat: 20,
      servingSize: 'Sizzling Plate with Rice & Egg'
    },
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 2
  },
  {
    id: 'sizzling-smoked-pork-sisig',
    name: 'Sizzling Smoked Pork Sisig',
    tag: 'Crunchy Bark',
    category: 'pinoy-classics',
    price: 119,
    description: 'Crispy smoked pork belly with toasted onions, crushed chicharon, bird-eye chilies, and fresh calamansi squeeze.',
    macros: {
      calories: 530,
      protein: 30,
      carbs: 42,
      fat: 26,
      servingSize: 'Sizzling Plate with Rice & Calamansi'
    },
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 2
  },
  {
    id: 'smoked-beef-pares',
    name: 'Masung Smoked Beef Pares',
    tag: 'Local Favorite',
    category: 'pinoy-classics',
    price: 139,
    description: 'Slow-braised smoked brisket cubes in aromatic sweet star anise gravy, served piping hot with garlic red rice and bone soup.',
    macros: {
      calories: 480,
      protein: 34,
      carbs: 56,
      fat: 14,
      servingSize: 'Solo Pares Bowl + Garlic Red Rice'
    },
    variants: [
      { 
        label: 'Solo Pares with Rice', 
        price: 139,
        macros: { calories: 480, protein: 34, carbs: 56, fat: 14, servingSize: 'Solo Pares + Rice' }
      },
      { 
        label: 'Pares Sharing Platter', 
        price: 219,
        macros: { calories: 840, protein: 58, carbs: 70, fat: 26, servingSize: 'Sharing Platter for 2' }
      }
    ],
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },
  {
    id: 'smoked-pork-sinigang',
    name: 'Smoked Pork Belly Sinigang',
    tag: 'Sour Soup',
    category: 'pinoy-classics',
    price: 119,
    description: 'Tamarind broth simmered with smoked pork belly, water spinach (kangkong), white radish, tomatoes, and long green chili.',
    macros: {
      calories: 380,
      protein: 28,
      carbs: 40,
      fat: 12,
      servingSize: 'Solo Claypot with Rice'
    },
    variants: [
      { 
        label: 'Solo Claypot', 
        price: 119,
        macros: { calories: 380, protein: 28, carbs: 40, fat: 12, servingSize: 'Solo Claypot' }
      },
      { 
        label: 'Family Pot (3-4 Pax)', 
        price: 179,
        macros: { calories: 720, protein: 56, carbs: 52, fat: 24, servingSize: 'Family Pot for 3-4' }
      }
    ],
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    popular: false,
    spicyLevel: 1
  },

  // --- BARKADA PLATTERS & SHARING (For Groups & Feasts) ---
  {
    id: 'barkada-pitmaster-feast',
    name: 'Barkada Pitmaster Smoked Board',
    tag: 'Group Feast (3-4 Pax)',
    category: 'barkada-platters',
    price: 699,
    description: 'The ultimate table share: 200g Texas Smoked Brisket, 200g Hickory Smoked Pork Belly, Sizzling Sisig, sweet corn, atchara, and unlimited red rice refills for the table.',
    macros: {
      calories: 1850,
      protein: 142,
      carbs: 164,
      fat: 82,
      servingSize: 'Platter for 3-4 diners (approx. 460 kcal / 35g protein per pax)'
    },
    reserveEdition: true,
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },
  {
    id: 'solo-pitmaster-combo',
    name: 'Solo Brisket Plate & Fixings',
    tag: 'Complete Meal',
    category: 'barkada-platters',
    price: 332,
    description: '120g sliced oak-smoked beef brisket with house barbecue glaze, pickled papaya atchara, buttered sweet corn, and unlimited red rice.',
    macros: {
      calories: 680,
      protein: 46,
      carbs: 62,
      fat: 28,
      servingSize: 'Complete Plate with Sides & Rice'
    },
    includesUnlimited: ['Unlimited Heirloom Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },

  // --- SIDES & FREE REFILLS ---
  {
    id: 'extra-red-rice',
    name: 'Heirloom Red Rice Cup',
    tag: 'Free Refills on Meals',
    category: 'sides-refills',
    price: 30,
    description: 'Steamed nutrient-dense heirloom red rice. Refills are completely free for all meal orders.',
    macros: {
      calories: 180,
      protein: 4,
      carbs: 38,
      fat: 1,
      servingSize: '1 Heaping Steamed Cup (150g)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&auto=format&fit=crop&q=80',
    popular: false
  },
  {
    id: 'masung-special-bbq-sauce',
    name: 'Extra House BBQ Sauce Cup',
    category: 'sides-refills',
    price: 35,
    description: 'Simmered blend of cane molasses, ripe tomatoes, apple cider vinegar, black pepper, and smoked drippings.',
    macros: {
      calories: 45,
      protein: 0,
      carbs: 11,
      fat: 0,
      servingSize: '2 oz Sauce Cup'
    },
    imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&auto=format&fit=crop&q=80',
    popular: false
  },
  {
    id: 'papaya-atchara',
    name: 'Pickled Papaya Atchara',
    category: 'sides-refills',
    price: 35,
    description: 'Crunchy grated green papaya quick-pickled in native cane vinegar with julienned carrots and sweet bell peppers.',
    macros: {
      calories: 35,
      protein: 0,
      carbs: 8,
      fat: 0,
      servingSize: '80g Portion Cup'
    },
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    popular: false
  },
  {
    id: 'buttered-sweet-corn',
    name: 'Buttered Sweet Corn',
    category: 'sides-refills',
    price: 49,
    description: 'Golden sweet corn kernels tossed in warm salted butter and coarse cracked black pepper.',
    macros: {
      calories: 140,
      protein: 3,
      carbs: 22,
      fat: 6,
      servingSize: '1 Cup (120g)'
    },
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80',
    popular: false
  },

  // --- DRINKS & COLD BREWS ---
  {
    id: 'masung-house-iced-tea',
    name: 'House Calamansi Iced Tea',
    tag: 'Signature Refreshment',
    category: 'drinks-brews',
    price: 45,
    description: 'Slow-brewed black tea steeped with freshly pressed Philippine calamansi and honey.',
    macros: {
      calories: 85,
      protein: 0,
      carbs: 21,
      fat: 0,
      servingSize: '16 oz Chilled Glass'
    },
    variants: [
      { 
        label: 'Glass (16oz)', 
        price: 45,
        macros: { calories: 85, protein: 0, carbs: 21, fat: 0, servingSize: '16 oz Glass' }
      },
      { 
        label: 'Pitcher (1 Liter)', 
        price: 120,
        macros: { calories: 220, protein: 0, carbs: 54, fat: 0, servingSize: '1000ml Pitcher' }
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    popular: true
  },
  {
    id: 'calamansi-honey-sparkler',
    name: 'Calamansi Honey Fizz',
    category: 'drinks-brews',
    price: 55,
    description: 'Fresh calamansi citrus, wild mountain honey, and sparkling soda served over ice with fresh mint.',
    macros: {
      calories: 70,
      protein: 0,
      carbs: 18,
      fat: 0,
      servingSize: '16 oz Glass'
    },
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    popular: false
  },
  {
    id: 'chilled-pale-pilsen',
    name: 'San Miguel Pale Pilsen / Flavored',
    tag: 'Cold Beer',
    category: 'drinks-brews',
    price: 65,
    description: 'Ice-cold bottled beer. The classic Filipino pairing for smoked brisket and sizzling sisig.',
    macros: {
      calories: 135,
      protein: 1,
      carbs: 10,
      fat: 0,
      servingSize: '330ml Bottle'
    },
    variants: [
      { 
        label: 'Pale Pilsen 330ml', 
        price: 65,
        macros: { calories: 135, protein: 1, carbs: 10, fat: 0, servingSize: '330ml Bottle' }
      },
      { 
        label: 'Apple / Lemon Flavored', 
        price: 65,
        macros: { calories: 145, protein: 0, carbs: 14, fat: 0, servingSize: '330ml Bottle' }
      },
      { 
        label: 'San Mig Light 330ml', 
        price: 70,
        macros: { calories: 100, protein: 1, carbs: 4, fat: 0, servingSize: '330ml Bottle' }
      }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1608270119853-294c65330364?w=800&auto=format&fit=crop&q=80',
    popular: true
  },
  {
    id: 'cold-soda-cans',
    name: 'Chilled Soda Cans (Coke / Sprite / Royal)',
    category: 'drinks-brews',
    price: 40,
    description: 'Classic ice-cold soft drink served with a cup of cubed ice.',
    macros: {
      calories: 140,
      protein: 0,
      carbs: 38,
      fat: 0,
      servingSize: '330ml Can'
    },
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop&q=80',
    popular: false
  }
];
