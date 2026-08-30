import React, { useState } from 'react';
import type { PageId } from '../types';
import { useStaffAuth } from '../context/StaffAuthContext';
import { ShieldCheck, Lock, ArrowLeft, AlertCircle, KeyRound, UserCheck } from 'lucide-react';

interface StaffLoginGateProps {
  onNavigate: (page: PageId) => void;
  terminalName: 'POS System' | 'Smoker Inventory';
}

export const StaffLoginGate: React.FC<StaffLoginGateProps> = ({ onNavigate, terminalName }) => {
  const { loginStaff } = useStaffAuth();
  const [staffId, setStaffId] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = loginStaff(staffId, pin);
      if (!res.success) {
        setError(res.error || 'Authentication failed');
      }
      setIsLoading(false);
    }, 400);
  };

  const handleQuickDemo = (id: string, code: string) => {
    setStaffId(id);
    setPin(code);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#181615] text-white flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-[#24201D] border-2 border-[#5B101D] shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Brand & Security Header */}
        <div className="text-center space-y-2 pb-4 border-b border-[#3D3733]">
          <div className="w-12 h-12 bg-[#5B101D] rounded-full flex items-center justify-center mx-auto border border-[#C67D26] shadow-md">
            <Lock className="w-5 h-5 text-white" />
          </div>

          <div>
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#C67D26]">
              Restricted Terminal
            </span>
            <h1 className="font-heading font-extrabold text-2xl uppercase tracking-tight text-white mt-1">
              Staff Access Required
            </h1>
            <p className="text-xs text-[#A89F96] mt-0.5">
              {terminalName} is restricted to authorized restaurant personnel.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-[#460B15] border border-[#B71C1C] text-[#FFCDD2] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#FF5252]" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#E5DFD5] font-bold uppercase tracking-wider mb-1.5">
              Staff ID or Role
            </label>
            <div className="relative">
              <input
                type="text"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="e.g. STAFF-01 or CASHIER-01"
                required
                className="w-full px-3.5 py-3 bg-[#181615] border border-[#4A433D] text-white focus:outline-none focus:border-[#C67D26] font-mono uppercase"
              />
              <UserCheck className="w-4 h-4 text-[#8A837C] absolute right-3 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[#E5DFD5] font-bold uppercase tracking-wider mb-1.5">
              Security PIN / Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                required
                className="w-full px-3.5 py-3 bg-[#181615] border border-[#4A433D] text-white focus:outline-none focus:border-[#C67D26] font-mono tracking-widest text-base"
              />
              <KeyRound className="w-4 h-4 text-[#8A837C] absolute right-3 top-3.5 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-subtle border border-[#781728]"
          >
            <ShieldCheck className="w-4 h-4 text-[#C67D26]" />
            <span>{isLoading ? 'Verifying Credentials...' : 'Authorize Terminal'}</span>
          </button>
        </form>

        {/* Quick Staff Credentials Hint for Reviewers & Operations */}
        <div className="p-3 bg-[#181615] border border-[#3D3733] text-[11px] text-[#A89F96] space-y-1.5">
          <span className="block font-bold text-[#E5DFD5] uppercase text-[10px] tracking-wider">
            Staff Credentials Reference:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('STAFF-01', '1925')}
              className="px-2 py-1 bg-[#24201D] hover:bg-[#32070E] border border-[#4A433D] text-[#C67D26] cursor-pointer font-mono"
            >
              Pitmaster (STAFF-01 / PIN: 1925)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('CASHIER-01', '1234')}
              className="px-2 py-1 bg-[#24201D] hover:bg-[#32070E] border border-[#4A433D] text-[#C67D26] cursor-pointer font-mono"
            >
              Cashier (CASHIER-01 / PIN: 1234)
            </button>
          </div>
        </div>

        {/* Back to Customer Storefront */}
        <div className="pt-2 text-center border-t border-[#3D3733]">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A837C] hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Masung Smokehouse Dining</span>
          </button>
        </div>

      </div>
    </div>
  );
};
