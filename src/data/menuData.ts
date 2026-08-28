import type { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // --- SMOKED MEATS (Texas Pitmaster Craft) ---
  {
    id: 'smoked-beef-brisket',
    name: 'Texas Smoked Beef Brisket',
    tag: 'Bestseller',
    category: 'smoked-meats',
    price: 239,
    description: '12-hour oak-smoked beef brisket with a pepper bark, smoke ring, and tender slices.',
    variants: [
      { label: 'Small Serving (60g)', price: 139 },
      { label: 'Regular Serving (120g)', price: 239 },
      { label: 'Big Sharing (200g)', price: 379 }
    ],
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },
  {
    id: 'smoked-pork-belly',
    name: 'Hickory Smoked Pork Belly',
    tag: 'Crowd Favorite',
    category: 'smoked-meats',
    price: 179,
    description: 'Tender pork belly with crisp edges, smoked over hickory and glazed with our barbecue sauce.',
    variants: [
      { label: 'Regular Serving (70g)', price: 119 },
      { label: 'Sharing Serving (120g)', price: 179 },
      { label: 'Big Platter (220g)', price: 319 }
    ],
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 0
  },
  {
    id: 'texas-smoked-ribs',
    name: 'Hickory St. Louis Smoked Ribs',
    tag: 'Signature Cut',
    category: 'smoked-meats',
    price: 329,
    description: 'Tender pork ribs rubbed with spices and smoked over hardwood for 6 hours.',
    variants: [
      { label: 'Half Rack (3-4 bones)', price: 329 },
      { label: 'Full Rack Sharing', price: 599 }
    ],
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },

  // --- FILIPINO CLASSICS WITH SMOKEHOUSE TWIST ---
  {
    id: 'smoked-beef-kare-kare',
    name: 'Smoked Beef Kare-Kare',
    tag: 'House Special',
    category: 'pinoy-classics',
    price: 179,
    description: 'Rich peanut sauce cooked with brisket drippings, smoked beef chunks, eggplant, pechay, and bagoong alamang.',
    variants: [
      { label: 'Solo Meal (with Red Rice)', price: 179 },
      { label: 'Sharing Bowl (2-3 Pax)', price: 269 }
    ],
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 0
  },
  {
    id: 'smoked-pork-sinigang',
    name: 'Smoked Pork Sinigang',
    tag: 'Hot Soup',
    category: 'pinoy-classics',
    price: 119,
    description: 'Sour tamarind soup with smoked pork belly, kangkong, radish, and green chili.',
    variants: [
      { label: 'Solo Bowl', price: 119 },
      { label: 'Family Pot (3-4 Pax)', price: 179 }
    ],
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },
  {
    id: 'sizzling-smoked-beef-sisig',
    name: 'Sizzling Smoked Beef Sisig',
    tag: 'Pulutan & Meal',
    category: 'pinoy-classics',
    price: 139,
    description: 'Smoked beef brisket on a sizzling plate with onions, green chili, calamansi, and egg.',
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 2
  },
  {
    id: 'sizzling-smoked-pork-sisig',
    name: 'Sizzling Smoked Pork Sisig',
    tag: 'Crispy & Smoky',
    category: 'pinoy-classics',
    price: 119,
    description: 'Crispy smoked pork belly with onions, chicharon, and calamansi on a sizzling plate.',
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
    popular: false,
    spicyLevel: 2
  },
  {
    id: 'smoked-beef-pares',
    name: 'Masung Smoked Beef Pares',
    tag: 'Local Favorite',
    category: 'pinoy-classics',
    price: 139,
    description: 'Braised smoked brisket in sweet-savory star anise broth, served with hot soup and red rice.',
    variants: [
      { label: 'Solo Pares with Rice', price: 139 },
      { label: 'Pares Sharing Platter', price: 219 }
    ],
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },
  {
    id: 'smoked-pork-pares',
    name: 'Smoked Pork Pares Sharing',
    tag: 'Only ₱99',
    category: 'pinoy-classics',
    price: 99,
    description: 'Slow-cooked sweet-savory smoked pork in garlic gravy with unlimited hot red rice.',
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
    popular: false,
    spicyLevel: 1
  },

  // --- RICE MEALS & VALUE PLATES ---
  {
    id: 'smoked-pulled-pork-rice',
    name: 'Smoked Pulled Pork Rice Bowl',
    tag: 'Only ₱99',
    category: 'rice-meals',
    price: 99,
    description: 'Tender shredded smoked pork in barbecue sauce over hot heirloom red rice.',
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },
  {
    id: 'chili-con-carne-rice',
    name: 'Chili Con Carne Rice Bowl',
    tag: 'Only ₱99',
    category: 'rice-meals',
    price: 99,
    description: 'Ground beef and kidney beans slow-cooked with tomatoes and chili over red rice.',
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 2
  },
  {
    id: 'solo-pitmaster-combo',
    name: 'Solo Brisket Meal (120g)',
    tag: 'Complete Meal',
    category: 'rice-meals',
    price: 332,
    description: '120g sliced beef brisket with barbecue glaze, pickled atchara, buttered corn, and unlimited red rice.',
    includesUnlimited: ['Unlimited Red Rice', 'Unlimited Smoked Bone Broth'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
    popular: true,
    spicyLevel: 1
  },

  // --- SIDES & EXTRAS ---
  {
    id: 'extra-red-rice',
    name: 'Extra Red Rice',
    tag: 'Free Refills on Meals',
    category: 'sides-extras',
    price: 30,
    description: 'Warm, freshly steamed heirloom red rice. Free refills on all meal orders.',
    imageUrl: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&auto=format&fit=crop&q=80',
    popular: false
  },
  {
    id: 'masung-special-bbq-sauce',
    name: 'Extra BBQ Sauce Cup',
    category: 'sides-extras',
    price: 35,
    description: 'House-made blend of molasses, tomatoes, apple cider vinegar, and spices.',
    imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&auto=format&fit=crop&q=80',
    popular: false
  },
  {
    id: 'papaya-atchara',
    name: 'Pickled Papaya Atchara',
    category: 'sides-extras',
    price: 35,
    description: 'Pickled green papaya in sweet cane vinegar with carrots and peppers.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    popular: false
  },
  {
    id: 'buttered-sweet-corn',
    name: 'Buttered Sweet Corn',
    category: 'sides-extras',
    price: 49,
    description: 'Sweet corn tossed in salted butter and black pepper.',
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800&auto=format&fit=crop&q=80',
    popular: false
  },

  // --- DRINKS & REFRESHMENTS ---
  {
    id: 'masung-house-iced-tea',
    name: 'House Calamansi Iced Tea',
    tag: 'Signature Drink',
    category: 'drinks',
    price: 45,
    description: 'Brewed black tea with fresh calamansi and honey.',
    variants: [
      { label: 'Glass (16oz)', price: 45 },
      { label: 'Pitcher (1 Liter)', price: 120 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    popular: true
  },
  {
    id: 'calamansi-honey-sparkler',
    name: 'Calamansi Honey Fizz',
    category: 'drinks',
    price: 55,
    description: 'Fresh calamansi juice, wild honey, and soda over ice.',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    popular: false
  },
  {
    id: 'chilled-pale-pilsen',
    name: 'San Miguel Pale Pilsen / Flavored',
    tag: 'Cold Beer',
    category: 'drinks',
    price: 65,
    description: 'Ice-cold beer. Great pair for smoked brisket and sisig.',
    variants: [
      { label: 'Pale Pilsen 330ml', price: 65 },
      { label: 'Apple / Lemon Flavored', price: 65 },
      { label: 'San Mig Light 330ml', price: 70 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1608270119853-294c65330364?w=800&auto=format&fit=crop&q=80',
    popular: true
  },
  {
    id: 'cold-soda-cans',
    name: 'Chilled Soda Cans (Coke / Sprite / Royal)',
    category: 'drinks',
    price: 40,
    description: 'Cold sodas served with an iced cup.',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop&q=80',
    popular: false
  }
];
