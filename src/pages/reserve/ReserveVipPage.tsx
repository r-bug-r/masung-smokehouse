import React, { useState, useEffect } from 'react';
import type { PageId, RewardVoucher } from '../../types';
import { useLoyalty } from '../../context/LoyaltyContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { initScrollAnimations } from '../../lib/animations';
import { REWARD_VOUCHERS } from '../../data/rewardsData';

interface ReserveVipPageProps {
  onNavigate: (page: PageId) => void;
}

export const ReserveVipPage: React.FC<ReserveVipPageProps> = ({ onNavigate }) => {
  const { 
    profile, 
    orders, 
    updateProfile, 
    claimWelcomeBonus, 
    redeemVoucher, 
    nextTierConfig, 
    pointsToNextTier 
  } = useLoyalty();

  const { applyReward, addItem } = useCart();
  const { showToast } = useToast();

  const [editingProfile, setEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [phoneInput, setPhoneInput] = useState(profile.phone);

  useEffect(() => {
    initScrollAnimations();
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim() && phoneInput.trim()) {
      updateProfile(nameInput.trim(), phoneInput.trim());
      setEditingProfile(false);
      showToast('Profile Saved', 'Pit Pass VIP membership details updated.', 'success');
    }
  };

  const handleClaimWelcome = () => {
    claimWelcomeBonus();
    showToast('Bonus Awarded', '25 Welcome Points added to your VIP account!', 'reward');
  };

  const handleRedeemVoucher = (voucher: RewardVoucher) => {
    const success = redeemVoucher(voucher);
    if (success) {
      applyReward(voucher);
      showToast('Reward Redeemed', `${voucher.title} applied to your order tray!`, 'reward');
    } else {
      showToast('Insufficient Points', `You need ${voucher.pointsCost} points for this reward.`, 'info');
    }
  };

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((cartItem) => {
      addItem(cartItem.item, cartItem.selectedVariant, cartItem.notes, cartItem.spiceChoice);
    });
    showToast('Items Added', 'Dishes from previous visit added to order tray.', 'success');
    onNavigate('order');
  };

  return (
    <div className="min-h-screen bg-[#0A0406] text-[#F3ECE6] py-12 sm:py-16 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#D4AF37] block">
            Privilege & Loyalty
          </span>
          <div className="space-y-1">
            <span className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white block">
              MASUNG
            </span>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#D4AF37] block">
              SMOKEHOUSE • Pit Pass Rewards
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#D8C7C4] font-light max-w-xl mx-auto leading-relaxed">
            Earn 1 BBQ Point for every ₱10 spent at Masung Smokehouse. Redeem for complimentary smoked cuts, bill discounts, and pitmaster specials.
          </p>
        </div>

        {/* Digital Member Card & Tier Progression */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-section">
          
          {/* Left: Luxury Metallic Digital VIP Pass */}
          <div className="lg:col-span-6 relative">
            <div className="bg-gradient-to-br from-[#1C0A0F] via-[#120609] to-[#0A0406] border-2 border-[#D4AF37]/80 p-8 sm:p-10 shadow-[0_20px_50px_rgba(142,27,45,0.25)] relative overflow-hidden">
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">
                    Masung Smokehouse Reserve
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#FFF5F7] uppercase mt-1">
                    Pit Pass VIP Card
                  </h3>
                </div>
                <div className="px-3 py-1 bg-[#0A0406] border border-[#D4AF37] text-[#D4AF37] text-xs font-mono font-bold uppercase tracking-wider">
                  {profile.tier}
                </div>
              </div>

              {/* Center Balance */}
              <div className="py-8 my-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#A89895] block">
                  Available Rewards Balance
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl sm:text-6xl font-bold text-[#D4AF37]">
                    {profile.points}
                  </span>
                  <span className="text-sm font-mono text-[#FFF5F7] tracking-wider uppercase">
                    BBQ Points
                  </span>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="grid grid-cols-3 gap-2 border-t border-[#3D0C15] pt-4 text-xs font-mono">
                <div>
                  <span className="text-[9px] uppercase text-[#A89895] block">Guest Name</span>
                  <strong className="text-[#FFF5F7] font-sans text-xs truncate block">{profile.name}</strong>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-[#A89895] block">Total Spent</span>
                  <strong className="text-[#D4AF37]">₱{profile.totalSpent}</strong>
                </div>
                <div>
                  <span className="text-[9px] uppercase text-[#A89895] block">Visits</span>
                  <strong className="text-[#FFF5F7]">{profile.ordersCount}</strong>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Tier Progress & Profile Settings */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Progress to Next Tier */}
            <div className="bg-[#120609] border border-[#3D0C15] p-6 space-y-4">
              <div className="flex justify-between items-baseline text-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#A89895]">Current Rank</span>
                <span className="text-[#D4AF37] font-bold uppercase tracking-wider">{profile.tier} Member</span>
              </div>

              {nextTierConfig ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#D8C7C4]">
                    <span>Next Rank: <strong>{nextTierConfig.tier}</strong></span>
                    <span className="font-mono text-[#D4AF37]">{pointsToNextTier} points to unlock</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#0A0406] border border-[#3D0C15] overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#8E1B2D] to-[#D4AF37] transition-all duration-500"
                      style={{ width: `${Math.min(100, (profile.points / nextTierConfig.minPoints) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#D4AF37] font-mono">
                  You have achieved the highest Pitmaster Legend tier!
                </p>
              )}

              {/* Welcome Bonus for New Guests */}
              {profile.ordersCount === 0 && (
                <div className="pt-4 border-t border-[#3D0C15] flex items-center justify-between">
                  <span className="text-xs text-[#D8C7C4]">
                    First time with us? Claim your <strong>25 Welcome Points</strong>:
                  </span>
                  <button
                    onClick={handleClaimWelcome}
                    className="px-4 py-1.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Claim 25 PTS
                  </button>
                </div>
              )}
            </div>

            {/* Profile Info & Edit */}
            <div className="bg-[#120609] border border-[#3D0C15] p-6 space-y-4">
              <div className="flex justify-between items-center border-b border-[#3D0C15] pb-3">
                <h4 className="font-serif text-lg text-[#FFF5F7]">
                  Membership Credentials
                </h4>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="text-[10px] uppercase tracking-wider text-[#D4AF37] hover:underline cursor-pointer"
                >
                  {editingProfile ? 'Cancel' : 'Edit Info'}
                </button>
              </div>

              {editingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-3">
                  <div>
                    <label className="text-[10px] uppercase text-[#A89895] block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      required
                      className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3 py-2 text-xs focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#A89895] block mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      required
                      className="w-full bg-[#0A0406] border border-[#3D0C15] text-[#FFF5F7] px-3 py-2 text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Save Credentials
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase text-[#A89895] block">Member Name</span>
                    <strong className="text-[#FFF5F7]">{profile.name}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[#A89895] block">Registered Mobile</span>
                    <strong className="text-[#FFF5F7] font-mono">{profile.phone}</strong>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Available Vouchers Grid */}
        <div className="space-y-6 animate-section pt-8">
          <div className="border-b border-[#3D0C15] pb-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] block font-semibold">
              Redeem Rewards
            </span>
            <h3 className="font-serif text-3xl text-[#FFF5F7]">
              Available Pit Pass Privileges
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REWARD_VOUCHERS.map((voucher) => {
              const canAfford = profile.points >= voucher.pointsCost;

              return (
                <div
                  key={voucher.id}
                  className="bg-[#120609] border border-[#3D0C15] p-6 flex flex-col justify-between space-y-4 hover:border-[#8E1B2D] transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-mono">
                        {voucher.badge}
                      </span>
                      <span className="font-serif text-xl text-[#D4AF37] font-bold">
                        {voucher.pointsCost} PTS
                      </span>
                    </div>

                    <h4 className="font-serif text-xl text-[#FFF5F7]">
                      {voucher.title}
                    </h4>

                    <p className="text-xs text-[#D8C7C4] font-light leading-relaxed">
                      {voucher.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRedeemVoucher(voucher)}
                    disabled={!canAfford}
                    className={`w-full py-3 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                      canAfford
                        ? 'bg-[#D4AF37] hover:bg-[#B89327] text-black shadow-md'
                        : 'bg-[#1C0A0F] text-[#A89895] border border-[#3D0C15] opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? `Redeem for ${voucher.pointsCost} PTS` : `Requires ${voucher.pointsCost} PTS`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Previous Dining Visits */}
        {orders.length > 0 && (
          <div className="bg-[#120609] border border-[#3D0C15] p-6 sm:p-8 space-y-4 animate-section">
            <h3 className="font-serif text-2xl text-[#FFF5F7] border-b border-[#3D0C15] pb-3">
              Your Previous Dining Experiences
            </h3>

            <div className="divide-y divide-[#3D0C15]/60">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <strong className="font-mono text-xs text-[#D4AF37]">#{order.id}</strong>
                      <span className="text-xs text-[#A89895]">{new Date(order.timestamp).toLocaleDateString()}</span>
                      <span className="text-xs text-[#FFF5F7] font-serif font-bold">₱{order.finalTotal}</span>
                    </div>
                    <p className="text-xs text-[#D8C7C4] font-light mt-1">
                      {order.items.map((i) => `${i.quantity}x ${i.item.name}`).join(', ')}
                    </p>
                  </div>

                  <button
                    onClick={() => handleReorder(order)}
                    className="px-4 py-2 bg-[#1C0A0F] hover:bg-[#3D0C15] text-[#D4AF37] border border-[#3D0C15] text-xs uppercase tracking-wider self-start sm:self-auto cursor-pointer"
                  >
                    Re-Order Cuts →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
