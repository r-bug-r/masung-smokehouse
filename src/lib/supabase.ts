import { createClient } from '@supabase/supabase-js';
import type { SmokehouseOrder, LoyaltyProfile } from '../types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://wjwtgzwhzrzusacntmra.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqd3RnendoenJ6dXNhY250bXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYxNzk4NjYsImV4cCI6MjEwMTc1NTg2Nn0.vZoMOZm4a-S4QNUCUY-9cBCzQM3ySR44kpp-VaVhTeg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Sync an order to Supabase masung_orders table
 */
export async function syncOrderToSupabase(order: SmokehouseOrder): Promise<boolean> {
  try {
    const { error } = await supabase.from('masung_orders').upsert({
      id: order.id,
      table_number: order.tableNumber,
      order_type: order.orderType,
      customer_name: order.customerName || 'Guest Diner',
      customer_phone: order.customerPhone || '',
      items: order.items,
      subtotal: order.subtotal,
      discount: order.discount,
      final_total: order.finalTotal,
      points_earned: order.pointsEarned,
      applied_voucher: order.appliedVoucher ? order.appliedVoucher.title : null,
      special_notes: order.specialNotes || '',
      status: order.status || 'smoking',
      created_at: order.createdAt
    });

    if (error) {
      console.warn('Supabase sync warning (will fallback locally):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Network error syncing order to Supabase:', err);
    return false;
  }
}

/**
 * Sync loyalty profile to Supabase masung_loyalty_members table
 */
export async function syncLoyaltyToSupabase(profile: LoyaltyProfile): Promise<boolean> {
  try {
    const { error } = await supabase.from('masung_loyalty_members').upsert({
      phone: profile.phone,
      name: profile.name,
      points: profile.points,
      lifetime_points: profile.lifetimePoints,
      tier: profile.tier,
      total_spent: profile.totalSpent,
      orders_count: profile.ordersCount,
      updated_at: new Date().toISOString()
    });

    if (error) {
      console.warn('Supabase loyalty sync warning:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Network error syncing loyalty to Supabase:', err);
    return false;
  }
}
