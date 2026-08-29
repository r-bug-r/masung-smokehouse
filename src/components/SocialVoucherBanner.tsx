import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Check, Copy, ExternalLink, Tag } from 'lucide-react';
import { bounceElement } from '../lib/animations';

export const SocialVoucherBanner: React.FC = () => {
  const { claimedSocialVouchers, claimSocialVoucher, appliedPromoCode } = useCart();
  const { showToast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleClaim = (platform: 'facebook' | 'instagram', url: string) => {
    // Open social page in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Trigger voucher claim & auto apply
    claimSocialVoucher(platform);
    showToast('₱50 Voucher Claimed', `Follower discount applied to your order (-₱50)`, 'reward');

    // Trigger bounce feedback
    bounceElement(`#voucher-${platform}`);
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast('Code Copied', `Promo code ${code} copied to clipboard`, 'info');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="animate-section py-10 bg-[#F2ECE1] border-b border-[#E5DFD5]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="bg-white border-2 border-[#5B101D] p-6 sm:p-8 shadow-subtle">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5DFD5]">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5B101D]">
                <Tag className="w-3.5 h-3.5" />
                <span>Discounts</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase text-[#181615] tracking-tight">
                Follow Us & Get <span className="text-[#5B101D]">₱50 Off</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#5C5651]">
                Follow our Facebook or Instagram page and get ₱50 off your meal today.
              </p>
            </div>

            {appliedPromoCode && (
              <div className="self-start md:self-auto px-3.5 py-2 bg-[#FBF8F3] border border-[#5B101D] text-xs font-bold text-[#5B101D] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Code {appliedPromoCode} applied (-₱50 discount)</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            
            {/* Facebook Card */}
            <div
              id="voucher-facebook"
              className={`p-5 border transition-colors ${
                claimedSocialVouchers.facebook
                  ? 'bg-[#FBF8F3] border-[#5B101D]'
                  : 'bg-white border-[#E5DFD5] hover:border-[#5B101D]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="font-heading font-extrabold text-base uppercase text-[#181615] block">
                    Facebook Voucher
                  </span>
                  <span className="text-xs text-[#5C5651]">
                    @MasungSmokeHouse on Facebook
                  </span>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 bg-[#5B101D] text-white">
                  ₱50 Off
                </span>
              </div>

              <div className="pt-2 flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
                <button
                  onClick={() =>
                    handleClaim(
                      'facebook',
                      'https://www.facebook.com/MasungSmokeHouse/'
                    )
                  }
                  className={`flex-1 py-2.5 px-4 text-xs font-heading font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    claimedSocialVouchers.facebook
                      ? 'bg-[#460B15] text-white'
                      : 'bg-[#5B101D] hover:bg-[#460B15] text-white'
                  }`}
                >
                  {claimedSocialVouchers.facebook ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Followed & Applied</span>
                    </>
                  ) : (
                    <>
                      <span>Follow on Facebook</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleCopy('MASUNGFB50')}
                  className="py-2.5 px-3 border border-[#E5DFD5] hover:bg-[#FBF8F3] text-xs text-[#181615] font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  title="Copy Promo Code"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode === 'MASUNGFB50' ? 'Copied' : 'MASUNGFB50'}</span>
                </button>
              </div>
            </div>

            {/* Instagram Card */}
            <div
              id="voucher-instagram"
              className={`p-5 border transition-colors ${
                claimedSocialVouchers.instagram
                  ? 'bg-[#FBF8F3] border-[#5B101D]'
                  : 'bg-white border-[#E5DFD5] hover:border-[#5B101D]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <span className="font-heading font-extrabold text-base uppercase text-[#181615] block">
                    Instagram Voucher
                  </span>
                  <span className="text-xs text-[#5C5651]">
                    @masungsmokehouse on Instagram
                  </span>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 bg-[#C67D26] text-white">
                  ₱50 Off
                </span>
              </div>

              <div className="pt-2 flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
                <button
                  onClick={() =>
                    handleClaim(
                      'instagram',
                      'https://www.instagram.com/masungsmokehouse'
                    )
                  }
                  className={`flex-1 py-2.5 px-4 text-xs font-heading font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    claimedSocialVouchers.instagram
                      ? 'bg-[#181615] text-white'
                      : 'bg-[#C67D26] hover:bg-[#A5641A] text-white'
                  }`}
                >
                  {claimedSocialVouchers.instagram ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Followed & Applied</span>
                    </>
                  ) : (
                    <>
                      <span>Follow on Instagram</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleCopy('MASUNGIG50')}
                  className="py-2.5 px-3 border border-[#E5DFD5] hover:bg-[#FBF8F3] text-xs text-[#181615] font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  title="Copy Promo Code"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode === 'MASUNGIG50' ? 'Copied' : 'MASUNGIG50'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
