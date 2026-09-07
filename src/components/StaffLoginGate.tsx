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
    <div className="min-h-[calc(100vh-140px)] bg-[#F5EFEB] text-[#1E1E1E] flex flex-col justify-center items-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-md bg-white border-2 border-[#5B101D] shadow-elevated p-6 sm:p-8 space-y-6 rounded-xs">
        
        {/* Brand & Security Header */}
        <div className="text-center space-y-2 pb-5 border-b border-[#E5DFD5]">
          <div className="w-14 h-14 bg-[#5B101D] rounded-full flex items-center justify-center mx-auto border-2 border-[#C67D26] shadow-subtle">
            <Lock className="w-6 h-6 text-white" />
          </div>

          <div>
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#C67D26] block">
              Staff Operations Only
            </span>
            <h1 className="font-bebas font-bold text-3xl sm:text-4xl uppercase tracking-tight text-[#1E1E1E] mt-1">
              STAFF ACCESS <span className="text-[#5B101D]">REQUIRED</span>
            </h1>
            <p className="font-body text-xs text-[#5C5651] mt-0.5">
              {terminalName} is restricted to authorized smokehouse personnel.
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 bg-[#460B15]/10 border border-[#5B101D] text-[#5B101D] text-xs flex items-center gap-2 rounded-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#5B101D]" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#1E1E1E] font-montserrat font-extrabold text-xs uppercase tracking-wider mb-1.5">
              Staff ID or Role
            </label>
            <div className="relative">
              <input
                type="text"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="e.g. STAFF-01 or CASHIER-01"
                required
                className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#E5DFD5] text-[#1E1E1E] placeholder:text-[#8A837C] focus:outline-none focus:border-[#5B101D] focus:bg-white font-mono uppercase text-xs"
              />
              <UserCheck className="w-4 h-4 text-[#8A837C] absolute right-3 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-[#1E1E1E] font-montserrat font-extrabold text-xs uppercase tracking-wider mb-1.5">
              Security PIN / Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                required
                className="w-full px-3.5 py-3 bg-[#FAF7F2] border border-[#E5DFD5] text-[#1E1E1E] placeholder:text-[#8A837C] focus:outline-none focus:border-[#5B101D] focus:bg-white font-mono tracking-widest text-base"
              />
              <KeyRound className="w-4 h-4 text-[#8A837C] absolute right-3 top-3.5 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle hover:scale-[1.01] rounded-xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#C67D26]" />
            <span>{isLoading ? 'Verifying Credentials...' : 'Authorize Terminal'}</span>
          </button>
        </form>

        {/* Quick Staff Credentials Hint for Reviewers & Operations */}
        <div className="p-3.5 bg-[#FAF7F2] border border-[#E5DFD5] text-xs space-y-2 rounded-xs">
          <span className="block font-montserrat font-extrabold text-[#5B101D] uppercase text-[10px] tracking-wider">
            Staff Credentials Reference:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('STAFF-01', '1925')}
              className="px-2.5 py-1.5 bg-white hover:bg-[#5B101D] hover:text-white border border-[#E5DFD5] text-[#1E1E1E] cursor-pointer font-mono text-[11px] font-semibold transition-colors shadow-2xs"
            >
              Pitmaster (STAFF-01 / PIN: 1925)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('CASHIER-01', '1234')}
              className="px-2.5 py-1.5 bg-white hover:bg-[#5B101D] hover:text-white border border-[#E5DFD5] text-[#1E1E1E] cursor-pointer font-mono text-[11px] font-semibold transition-colors shadow-2xs"
            >
              Cashier (CASHIER-01 / PIN: 1234)
            </button>
          </div>
        </div>

        {/* Back to Customer Storefront */}
        <div className="pt-2 text-center border-t border-[#E5DFD5]">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-montserrat font-bold text-[#5C5651] hover:text-[#5B101D] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Masung Smokehouse Dining</span>
          </button>
        </div>

      </div>
    </div>
  );
};
