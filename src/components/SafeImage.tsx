import React, { useState, useEffect } from 'react';
import { Flame, Utensils, Sparkles, Coffee } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  category?: string;
  className?: string;
  containerClassName?: string;
}

// Built-in high-quality local fallback assets
const DEFAULT_LOCAL_FOOD_FALLBACK = '/masung_brisket_food_asset_hd.png';
const DEFAULT_LOCAL_HERO_FALLBACK = '/masung_smoked_meat_hero_hd.png';

/**
 * Category-based fallback icon & theme generator
 */
function getCategoryIcon(category?: string) {
  switch (category) {
    case 'drinks-brews':
      return Coffee;
    case 'sides-refills':
      return Utensils;
    case 'barkada-platters':
      return Sparkles;
    case 'texas-smoked':
    case 'sulit-bowls':
    case 'pinoy-classics':
    default:
      return Flame;
  }
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc,
  category,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc || DEFAULT_LOCAL_FOOD_FALLBACK);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state if src prop changes
  useEffect(() => {
    setImgSrc(src || fallbackSrc || DEFAULT_LOCAL_FOOD_FALLBACK);
    setHasError(false);
    setIsLoaded(false);
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc && fallbackSrc) {
      setImgSrc(fallbackSrc);
    } else if (imgSrc !== DEFAULT_LOCAL_FOOD_FALLBACK && imgSrc !== DEFAULT_LOCAL_HERO_FALLBACK) {
      // Fall back to local HD brisket asset
      setImgSrc(category === 'barkada-platters' ? DEFAULT_LOCAL_HERO_FALLBACK : DEFAULT_LOCAL_FOOD_FALLBACK);
    } else {
      setHasError(true);
    }
  };

  const CategoryIcon = getCategoryIcon(category);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#3D0C15] via-[#2A060C] to-[#180306] ${containerClassName}`}>
      {/* Background Decorative Graphic (Always visible behind or during load) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none pointer-events-none opacity-40">
        <div className="w-12 h-12 rounded-full bg-[#5B101D]/80 border border-[#C67D26]/40 flex items-center justify-center mb-1.5 shadow-inner">
          <CategoryIcon className="w-6 h-6 text-[#E5A93C]" />
        </div>
        <span className="font-bebas text-xs uppercase tracking-wider text-[#F5EFEB]/90 font-bold">
          MASUNG SMOKEHOUSE
        </span>
      </div>

      {/* Actual Food Image */}
      {!hasError && (
        <img
          src={imgSrc}
          alt={alt}
          onError={handleError}
          onLoad={() => setIsLoaded(true)}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 relative z-10`}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}

      {/* Stylized Smokehouse Platter Fallback if image completely unavailable */}
      {hasError && (
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#4A0E1A] via-[#2A060C] to-[#1A0306] flex flex-col items-center justify-center p-4 text-center">
          <div className="w-14 h-14 rounded-full bg-[#5B101D] border-2 border-[#C67D26] flex items-center justify-center mb-2 shadow-lg">
            <CategoryIcon className="w-7 h-7 text-[#E5A93C]" />
          </div>
          <span className="font-bebas text-sm sm:text-base uppercase tracking-wider text-[#FAF7F2] font-bold">
            {alt}
          </span>
          <span className="text-[10px] font-montserrat font-bold text-[#C67D26] uppercase tracking-widest mt-0.5">
            Slow-Smoked Everyday
          </span>
        </div>
      )}
    </div>
  );
};
