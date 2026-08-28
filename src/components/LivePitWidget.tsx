import React from 'react';
import { Flame, Clock, Thermometer, Check } from 'lucide-react';

export const LivePitWidget: React.FC = () => {
  return (
    <div className="bg-[#F2ECE1] border-b border-[#E5DFD5] py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left: Active Batch Indicator */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 bg-[#5B101D] text-white flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-sm tracking-tight text-[#5B101D] uppercase">
                  Today's Meat is Ready
                </span>
                <span className="text-[11px] px-2 py-0.5 bg-[#E5DFD5] text-[#181615] font-bold uppercase tracking-wider">
                  Slicing Now
                </span>
              </div>
              <p className="text-xs text-[#5C5651]">
                Smoked over wood logs and rested for carving.
              </p>
            </div>
          </div>

          {/* Right: Kitchen Specs */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6 text-xs text-[#181615]">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#5B101D]" />
              <span>Carved fresh per order</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Thermometer className="w-3.5 h-3.5 text-[#5B101D]" />
              <span>Smoker Temp: <strong>225°F</strong></span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-[#5B101D]">
              <Check className="w-3.5 h-3.5 text-[#5B101D]" />
              <span>Red Rice & Hot Soup: <strong>Ready</strong></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
