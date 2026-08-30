import React, { useState, useEffect } from 'react';
import type { PageId, RewardVoucher } from '../types';
import { useLoyalty } from '../context/LoyaltyContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { initScrollAnimations } from '../lib/animations';
import { REWARD_VOUCHERS } from '../data/rewardsData';
import { 
  Flame, 
  Gift, 
  Check, 
  Clock, 
  ShoppingBag, 
  ExternalLink, 
  Tag, 
  LogOut, 
  User, 
  Lock, 
  Phone, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface LoyaltyPageProps {
  onNavigate: (page: PageId) => void;
}

export const LoyaltyPage: React.FC<LoyaltyPageProps> = ({ onNavigate }) => {
  const { 
    isAuthenticated, 
    currentUser, 
    profile, 
    orders, 
    login, 
    register, 
    logout, 
    updateProfile, 
    redeemVoucher, 
    nextTierConfig, 
    pointsToNextTier 
  } = useLoyalty();

  const { applyReward, addItem, claimedSocialVouchers, claimSocialVoucher } = useCart();
  const { showToast } = useToast();

  // Auth tabs: 'login' | 'register'
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Auth error / loading state
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Profile edit state
  const [editingProfile, setEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [phoneInput, setPhoneInput] = useState(profile.phone);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);

  useEffect(() => {
    initScrollAnimations();
  }, []);

  useEffect(() => {
    setNameInput(profile.name);
    setPhoneInput(profile.phone);
  }, [profile]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(loginIdentifier, loginPassword);
      if (!res.success) {
        setAuthError(res.error || 'Login failed.');
      } else {
        showToast('Welcome Back!', 'Signed into Masung Pit Pass.', 'success');
      }
      setIsSubmitting(false);
    }, 300);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const res = register({
        name: regName,
        phone: regPhone,
        username: regUsername,
        password: regPassword
      });

      if (!res.success) {
        setAuthError(res.error || 'Registration failed.');
      } else {
        showToast('Welcome to Pit Pass!', '25 Welcome Points awarded to your card!', 'reward');
      }
      setIsSubmitting(false);
    }, 350);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim() && phoneInput.trim()) {
      updateProfile(nameInput.trim(), phoneInput.trim());
      setEditingProfile(false);
      showToast('Profile Saved', 'Pit Pass member details updated', 'success');
    }
  };

  const handleRedeemVoucher = (voucher: RewardVoucher) => {
    const success = redeemVoucher(voucher);
    if (success) {
      applyReward(voucher);
      setRedeemSuccess(`Successfully redeemed: ${voucher.title}! Applied to your table order.`);
      showToast('Reward Redeemed', `${voucher.title} applied to your order!`, 'reward');
      setTimeout(() => setRedeemSuccess(null), 4000);
    }
  };

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach(cartItem => {
      addItem(cartItem.item, cartItem.selectedVariant, cartItem.notes, cartItem.spiceChoice);
    });
    showToast('Items Added', 'Dishes from previous visit added to order', 'success');
    onNavigate('order');
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] py-10 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#5B101D] bg-[#E5DFD5]/70 px-3.5 py-1 inline-block mb-3">
            Rewards Program
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#5B101D] uppercase tracking-tight">
            Masung Pit Pass
          </h1>
          <p className="text-sm text-[#5C5651] mt-2">
            1 point for every ₱10 spent. Redeem for free smoked beef brisket, sisig, and drinks.
          </p>
        </div>

        {/* NOT AUTHENTICATED: Modern Pit Pass Portal */}
        {!isAuthenticated ? (
          <div className="max-w-2xl mx-auto">
            
            {/* Quick Benefits Banner */}
            <div className="bg-[#5B101D] text-white p-6 border-2 border-[#460B15] shadow-elevated mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-[#C67D26]" />
                <h3 className="font-heading font-extrabold text-lg uppercase text-white tracking-wide">
                  Join The Pit Pass Community
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-2 border-t border-[#781728]">
                <div className="p-2 bg-[#460B15]/60 border border-[#781728]">
                  <span className="block font-heading font-extrabold text-lg text-[#C67D26]">₱10 = 1 PT</span>
                  <span className="text-[10px] text-[#E5DFD5] uppercase font-bold">Earn on Dine-In</span>
                </div>
                <div className="p-2 bg-[#460B15]/60 border border-[#781728]">
                  <span className="block font-heading font-extrabold text-lg text-[#C67D26]">+25 PTS</span>
                  <span className="text-[10px] text-[#E5DFD5] uppercase font-bold">Instant Sign Up</span>
                </div>
                <div className="p-2 bg-[#460B15]/60 border border-[#781728]">
                  <span className="block font-heading font-extrabold text-lg text-[#C67D26]">FREE</span>
                  <span className="text-[10px] text-[#E5DFD5] uppercase font-bold">Red Rice & Broth</span>
                </div>
                <div className="p-2 bg-[#460B15]/60 border border-[#781728]">
                  <span className="block font-heading font-extrabold text-lg text-[#C67D26]">FREE MEALS</span>
                  <span className="text-[10px] text-[#E5DFD5] uppercase font-bold">Redeem Anytime</span>
                </div>
              </div>
            </div>

            {/* Auth Box */}
            <div className="bg-white border-2 border-[#5B101D] shadow-elevated p-6 sm:p-8">
              
              {/* Tab Selector */}
              <div className="flex border-b-2 border-[#E5DFD5] mb-6">
                <button
                  type="button"
                  onClick={() => { setAuthTab('login'); setAuthError(null); }}
                  className={`flex-1 py-3 font-heading font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center ${
                    authTab === 'login'
                      ? 'border-b-2 border-[#5B101D] text-[#5B101D] -mb-[2px] bg-[#FBF8F3]'
                      : 'text-[#8A837C] hover:text-[#181615]'
                  }`}
                >
                  Sign In to Pit Pass
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthTab('register'); setAuthError(null); }}
                  className={`flex-1 py-3 font-heading font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center ${
                    authTab === 'register'
                      ? 'border-b-2 border-[#5B101D] text-[#5B101D] -mb-[2px] bg-[#FBF8F3]'
                      : 'text-[#8A837C] hover:text-[#181615]'
                  }`}
                >
                  Create Account (+25 Welcome Pts)
                </button>
              </div>

              {/* Error Alert */}
              {authError && (
                <div className="mb-5 p-3.5 bg-[#FFF0F2] border border-[#FFCDD2] text-[#B71C1C] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#D32F2F]" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Tab 1: Login Form */}
              {authTab === 'login' && (
                <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#181615] font-bold uppercase tracking-wider mb-1.5">
                      Username or Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={e => setLoginIdentifier(e.target.value)}
                        placeholder="e.g. marcus or 0917-123-4567"
                        required
                        className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-[#181615] focus:outline-none focus:border-[#5B101D]"
                      />
                      <User className="w-4 h-4 text-[#8A837C] absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#181615] font-bold uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-[#181615] focus:outline-none focus:border-[#5B101D]"
                      />
                      <Lock className="w-4 h-4 text-[#8A837C] absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-subtle mt-2"
                  >
                    {isSubmitting ? 'Verifying Profile...' : 'Sign In & View Card'}
                  </button>

                  <p className="text-[11px] text-center text-[#8A837C] pt-2">
                    Don't have a Pit Pass yet?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthTab('register'); setAuthError(null); }}
                      className="text-[#5B101D] font-bold hover:underline cursor-pointer"
                    >
                      Register here to claim 25 Welcome Points
                    </button>
                  </p>
                </form>
              )}

              {/* Tab 2: Registration Form */}
              {authTab === 'register' && (
                <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#181615] font-bold uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      placeholder="e.g. Juan dela Cruz"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-[#181615] focus:outline-none focus:border-[#5B101D]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#181615] font-bold uppercase tracking-wider mb-1.5">
                        Mobile Number (For Points)
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={e => setRegPhone(e.target.value)}
                          placeholder="0917-123-4567"
                          required
                          className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-[#181615] focus:outline-none focus:border-[#5B101D]"
                        />
                        <Phone className="w-4 h-4 text-[#8A837C] absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#181615] font-bold uppercase tracking-wider mb-1.5">
                        Choose Username
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={regUsername}
                          onChange={e => setRegUsername(e.target.value)}
                          placeholder="e.g. juandelacruz"
                          required
                          className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-[#181615] focus:outline-none focus:border-[#5B101D]"
                        />
                        <User className="w-4 h-4 text-[#8A837C] absolute right-3 top-3 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#181615] font-bold uppercase tracking-wider mb-1.5">
                      Create Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={regPassword}
                        onChange={e => setRegPassword(e.target.value)}
                        placeholder="At least 4 characters"
                        required
                        className="w-full px-3.5 py-2.5 bg-[#FBF8F3] border border-[#E5DFD5] text-[#181615] focus:outline-none focus:border-[#5B101D]"
                      />
                      <Lock className="w-4 h-4 text-[#8A837C] absolute right-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#C67D26] hover:bg-[#A5641A] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-subtle mt-2"
                  >
                    {isSubmitting ? 'Creating Membership...' : 'Join Pit Pass & Get 25 Welcome Points'}
                  </button>

                  <p className="text-[11px] text-center text-[#8A837C] pt-2">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => { setAuthTab('login'); setAuthError(null); }}
                      className="text-[#5B101D] font-bold hover:underline cursor-pointer"
                    >
                      Sign in here
                    </button>
                  </p>
                </form>
              )}

            </div>

          </div>
        ) : (

          /* AUTHENTICATED: Real Member Dashboard & Card */
          <div>
            {/* Notification if redeemed */}
            {redeemSuccess && (
              <div className="mb-6 p-4 bg-[#F2ECE1] border-2 border-[#5B101D] text-[#181615] text-xs font-bold flex items-center justify-between shadow-subtle">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#5B101D]" />
                  {redeemSuccess}
                </span>
                <button
                  onClick={() => onNavigate('order')}
                  className="px-4 py-1.5 bg-[#5B101D] text-white text-xs font-heading font-extrabold uppercase cursor-pointer"
                >
                  View Order
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Member Card & Perks */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Membership Card */}
                <div className="bg-[#5B101D] text-white p-7 sm:p-9 shadow-elevated border-2 border-[#460B15] relative overflow-hidden">
                  
                  {/* Card Header with Sign Out Button */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C67D26] block font-mono">
                        @{currentUser?.username}
                      </span>
                      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl uppercase text-white tracking-wide mt-0.5">
                        {profile.name}
                      </h2>
                      <span className="text-xs text-[#E5DFD5]/80 font-mono">
                        {profile.phone}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        logout();
                        showToast('Signed Out', 'You have been signed out of Pit Pass.', 'info');
                      }}
                      title="Sign Out"
                      className="px-2.5 py-1.5 bg-[#460B15] hover:bg-[#32070E] border border-[#781728] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                  {/* Available Balance Big Display */}
                  <div className="bg-[#460B15] p-5 border border-[#781728] mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E5DFD5]/80 block mb-1">
                      Your Available Balance
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-heading font-extrabold text-4xl sm:text-5xl text-white">
                        {profile.points}
                      </span>
                      <span className="text-xs font-bold text-[#C67D26] uppercase tracking-wider">
                        BBQ Points
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#781728] text-[11px] text-[#FBF8F3]">
                      <div>
                        <span className="text-[#E5DFD5]/70 block text-[10px] uppercase">Orders</span>
                        <strong className="text-white font-bold">{profile.ordersCount}</strong>
                      </div>
                      <div>
                        <span className="text-[#E5DFD5]/70 block text-[10px] uppercase">Total Spent</span>
                        <strong className="text-white font-bold">₱{profile.totalSpent}</strong>
                      </div>
                      <div>
                        <span className="text-[#E5DFD5]/70 block text-[10px] uppercase">Tier</span>
                        <strong className="text-[#C67D26] font-bold">{profile.tier}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Progress to Next Tier */}
                  {nextTierConfig && (
                    <div className="space-y-2 pt-2 border-t border-[#781728]">
                      <div className="flex justify-between text-xs text-[#E5DFD5]">
                        <span>Next Level: <strong>{nextTierConfig.tier}</strong></span>
                        <span>{pointsToNextTier} more points</span>
                      </div>
                      <div className="w-full bg-[#460B15] h-2 overflow-hidden">
                        <div
                          className="bg-[#C67D26] h-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (profile.lifetimePoints / nextTierConfig.minPoints) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  )}

                </div>

                {/* Profile Info Settings */}
                <div className="bg-white p-6 border border-[#E5DFD5] shadow-subtle space-y-4">
                  <div className="flex justify-between items-center border-b border-[#E5DFD5] pb-3">
                    <h3 className="font-heading text-base font-extrabold text-[#181615] uppercase tracking-wide">
                      Account Details
                    </h3>
                    <button
                      onClick={() => setEditingProfile(!editingProfile)}
                      className="text-xs font-bold text-[#5B101D] hover:underline cursor-pointer"
                    >
                      {editingProfile ? 'Cancel' : 'Edit Details'}
                    </button>
                  </div>

                  {!editingProfile ? (
                    <div className="space-y-2 text-xs sm:text-sm text-[#5C5651]">
                      <div>
                        <span className="font-semibold text-[#181615] block">Full Name:</span>
                        <span>{profile.name}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#181615] block">Mobile Number:</span>
                        <span className="font-mono">{profile.phone}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#181615] block">Username:</span>
                        <span className="font-mono">@{currentUser?.username}</span>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveProfile} className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-[#181615] block mb-1">
                          Full Name:
                        </label>
                        <input
                          type="text"
                          value={nameInput}
                          onChange={e => setNameInput(e.target.value)}
                          className="w-full px-3 py-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs text-[#181615]"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#181615] block mb-1">
                          Mobile Number:
                        </label>
                        <input
                          type="tel"
                          value={phoneInput}
                          onChange={e => setPhoneInput(e.target.value)}
                          className="w-full px-3 py-2 bg-[#FBF8F3] border border-[#E5DFD5] text-xs text-[#181615]"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#C67D26] text-white font-heading font-extrabold text-xs uppercase cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </form>
                  )}
                </div>

                {/* How Points Work Card */}
                <div className="bg-white p-6 border border-[#E5DFD5] shadow-subtle space-y-4">
                  <h3 className="font-heading text-base font-extrabold text-[#5B101D] uppercase tracking-wide flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#5B101D]" />
                    <span>How Points Work</span>
                  </h3>

                  <div className="space-y-3 text-xs sm:text-sm text-[#5C5651]">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 bg-[#F2ECE1] text-[#5B101D] flex items-center justify-center shrink-0 font-bold text-xs">
                        1
                      </div>
                      <p>
                        <strong>Earn every visit:</strong> Get 1 BBQ Point for every ₱10 spent on dine-in or takeout.
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 bg-[#F2ECE1] text-[#5B101D] flex items-center justify-center shrink-0 font-bold text-xs">
                        2
                      </div>
                      <p>
                        <strong>Level up:</strong> Higher membership tiers (Pitmaster, Legend) unlock higher multipliers.
                      </p>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 bg-[#F2ECE1] text-[#5B101D] flex items-center justify-center shrink-0 font-bold text-xs">
                        3
                      </div>
                      <p>
                        <strong>Redeem easily:</strong> Turn your points into free sides, drinks, and bill vouchers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Rewards Catalog & Order History */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Social Follower Vouchers */}
                <div className="bg-white p-6 border border-[#E5DFD5] shadow-subtle space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#5B101D]" />
                      <h3 className="font-heading text-base font-extrabold text-[#5B101D] uppercase tracking-wide">
                        Follower Vouchers
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-white bg-[#5B101D] px-2 py-0.5 uppercase">
                      ₱50 Off Each
                    </span>
                  </div>

                  <p className="text-xs text-[#5C5651]">
                    Follow Masung Smokehouse on social channels to claim instant ₱50 discounts for your table order:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 border border-[#E5DFD5] bg-[#FBF8F3] space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-[#181615] block">Facebook Page</span>
                          <span className="text-[10px] text-[#5C5651]">@MasungSmokeHouse</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#5B101D] bg-white px-2 py-0.5 border border-[#E5DFD5]">
                          ₱50 Off
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          window.open('https://www.facebook.com/MasungSmokeHouse/', '_blank', 'noopener,noreferrer');
                          claimSocialVoucher('facebook');
                        }}
                        className="w-full py-2 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {claimedSocialVouchers.facebook ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Applied to Order</span>
                          </>
                        ) : (
                          <>
                            <span>Follow & Claim</span>
                            <ExternalLink className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3.5 border border-[#E5DFD5] bg-[#FBF8F3] space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-bold text-[#181615] block">Instagram Page</span>
                          <span className="text-[10px] text-[#5C5651]">@masungsmokehouse</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#C67D26] bg-white px-2 py-0.5 border border-[#E5DFD5]">
                          ₱50 Off
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          window.open('https://www.instagram.com/masungsmokehouse', '_blank', 'noopener,noreferrer');
                          claimSocialVoucher('instagram');
                        }}
                        className="w-full py-2 bg-[#C67D26] hover:bg-[#A5641A] text-white font-heading font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {claimedSocialVouchers.instagram ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Applied to Order</span>
                          </>
                        ) : (
                          <>
                            <span>Follow & Claim</span>
                            <ExternalLink className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Rewards Catalog */}
                <div className="bg-white p-6 border border-[#E5DFD5] shadow-subtle space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
                    <h3 className="font-heading text-base font-extrabold text-[#5B101D] uppercase tracking-wide flex items-center gap-2">
                      <Gift className="w-4 h-4 text-[#5B101D]" />
                      <span>Redeemable BBQ Rewards</span>
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {REWARD_VOUCHERS.map(voucher => {
                      const canAfford = profile.points >= voucher.pointsCost;

                      return (
                        <div
                          key={voucher.id}
                          className="p-4 border border-[#E5DFD5] bg-[#FBF8F3] flex items-center justify-between gap-4 transition-colors hover:border-[#5B101D]"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-[#5B101D] text-white">
                                {voucher.badge}
                              </span>
                              <span className="text-xs font-bold text-[#5B101D]">
                                {voucher.pointsCost} BBQ Points
                              </span>
                            </div>
                            <h4 className="font-heading font-extrabold text-sm text-[#181615] uppercase">
                              {voucher.title}
                            </h4>
                            <p className="text-xs text-[#5C5651]">
                              {voucher.description}
                            </p>
                          </div>

                          <button
                            onClick={() => handleRedeemVoucher(voucher)}
                            disabled={!canAfford}
                            className={`shrink-0 px-4 py-2 font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                              canAfford
                                ? 'bg-[#5B101D] hover:bg-[#460B15] text-white'
                                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            }`}
                          >
                            {canAfford ? 'Redeem Now' : 'Need Pts'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order History */}
                <div className="bg-white p-6 border border-[#E5DFD5] shadow-subtle space-y-4">
                  <h3 className="font-heading text-base font-extrabold text-[#5B101D] uppercase tracking-wide flex items-center gap-2 border-b border-[#E5DFD5] pb-3">
                    <Clock className="w-4 h-4 text-[#5B101D]" />
                    <span>Your Order History ({orders.length})</span>
                  </h3>

                  {orders.length === 0 ? (
                    <div className="text-center py-6 text-xs text-[#8A837C] space-y-2">
                      <p>No previous orders recorded on this account yet.</p>
                      <button
                        onClick={() => onNavigate('order')}
                        className="text-xs font-bold text-[#5B101D] hover:underline cursor-pointer uppercase tracking-wider"
                      >
                        Start Your First Order →
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-[#E5DFD5]">
                      {orders.map(order => (
                        <div key={order.id} className="py-3.5 space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-heading font-bold text-[#5B101D] text-xs uppercase">
                              Order #{order.id} • {order.tableNumber}
                            </span>
                            <span className="text-[#8A837C]">{order.timestamp}</span>
                          </div>

                          <div className="text-xs text-[#5C5651]">
                            {order.items.map((item, i) => (
                              <span key={i} className="inline-block mr-2">
                                {item.quantity}x {item.item.name}
                              </span>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-1 text-xs">
                            <span className="font-bold text-[#181615]">
                              Total: ₱{order.finalTotal} • <span className="text-[#5B101D]">+{order.pointsEarned} Pts</span>
                            </span>

                            <button
                              onClick={() => handleReorder(order)}
                              className="text-xs font-bold text-[#5B101D] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Re-Order Dishes</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
