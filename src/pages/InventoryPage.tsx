import React, { useState, useEffect } from 'react';
import type { PageId, InventoryCut } from '../types';
import { useToast } from '../context/ToastContext';
import { 
  Flame, 
  AlertTriangle 
} from 'lucide-react';

interface InventoryPageProps {
  onNavigate: (page: PageId) => void;
}

const STORAGE_KEY_INVENTORY = 'masung_predictive_inventory';

const DEFAULT_INVENTORY: InventoryCut[] = [
  {
    id: 'inv-brisket',
    name: 'Texas Smoked Beef Brisket',
    cutType: 'beef_brisket',
    currentStockKg: 5.4,
    portionsRemaining: 18,
    hourlyVelocity: 6.5, // 6.5 portions per hour during peak
    projectedStockoutHours: 2.8, // ~2.8 hours until stockout
    smokerBatchNumber: 'B-14',
    hoursInPit: 10.5,
    targetPitHours: 12,
    status: 'carving_ready',
    nextBatchEta: '7:30 PM (Batch #B-15 resting in cooler)',
    minimumPrepNoticeHours: 14
  },
  {
    id: 'inv-pork-belly',
    name: 'Hickory Smoked Pork Belly',
    cutType: 'pork_belly',
    currentStockKg: 7.2,
    portionsRemaining: 32,
    hourlyVelocity: 8.0,
    projectedStockoutHours: 4.0,
    smokerBatchNumber: 'PB-08',
    hoursInPit: 8,
    targetPitHours: 8,
    status: 'carving_ready',
    nextBatchEta: '8:45 PM (Batch #PB-09 glazed with BBQ rub)',
    minimumPrepNoticeHours: 10
  },
  {
    id: 'inv-pork-ribs',
    name: 'St. Louis Smoked Pork Ribs',
    cutType: 'pork_ribs',
    currentStockKg: 3.8,
    portionsRemaining: 8,
    hourlyVelocity: 4.0,
    projectedStockoutHours: 2.0,
    smokerBatchNumber: 'R-06',
    hoursInPit: 6,
    targetPitHours: 6,
    status: 'low_stock',
    nextBatchEta: 'Tomorrow 4:00 PM (Curing in spice rub)',
    minimumPrepNoticeHours: 8
  },
  {
    id: 'inv-pulled-pork',
    name: 'Smoked Pulled Pork (₱99 Bowls)',
    cutType: 'pulled_pork',
    currentStockKg: 9.5,
    portionsRemaining: 48,
    hourlyVelocity: 12.0,
    projectedStockoutHours: 4.0,
    smokerBatchNumber: 'PP-11',
    hoursInPit: 10,
    targetPitHours: 10,
    status: 'carving_ready',
    nextBatchEta: 'Tomorrow 11:00 AM (Offset smoker loaded)',
    minimumPrepNoticeHours: 12
  },
  {
    id: 'inv-red-rice',
    name: 'Heirloom Red Rice (Cooked & Steaming)',
    cutType: 'red_rice',
    currentStockKg: 16.0,
    portionsRemaining: 65,
    hourlyVelocity: 18.0,
    projectedStockoutHours: 3.6,
    smokerBatchNumber: 'RICE-03',
    hoursInPit: 1,
    targetPitHours: 1,
    status: 'carving_ready',
    nextBatchEta: 'Continuous cooker cycle (every 45 mins)',
    minimumPrepNoticeHours: 1
  },
  {
    id: 'inv-bone-broth',
    name: 'Smoked Beef Bone Broth (Simmering Vat)',
    cutType: 'bone_broth',
    currentStockKg: 24.0,
    portionsRemaining: 75,
    hourlyVelocity: 15.0,
    projectedStockoutHours: 5.0,
    smokerBatchNumber: 'BROTH-02',
    hoursInPit: 16,
    targetPitHours: 16,
    status: 'carving_ready',
    nextBatchEta: 'Simmering continuously on low embers',
    minimumPrepNoticeHours: 16
  }
];

export const InventoryPage: React.FC<InventoryPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const [inventory, setInventory] = useState<InventoryCut[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_INVENTORY);
      return stored ? JSON.parse(stored) : DEFAULT_INVENTORY;
    } catch {
      return DEFAULT_INVENTORY;
    }
  });

  const [peakTrafficMultiplier, setPeakTrafficMultiplier] = useState<number>(1.2); // 1.2x for evening dinner rush

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(inventory));
    } catch {
      // ignore
    }
  }, [inventory]);

  const handleAdjustStock = (id: string, delta: number) => {
    setInventory(prev => prev.map(cut => {
      if (cut.id === id) {
        const newPortions = Math.max(0, cut.portionsRemaining + delta);
        const projectedHours = Number((newPortions / (cut.hourlyVelocity * peakTrafficMultiplier)).toFixed(1));
        const status = newPortions === 0 
          ? 'sold_out' 
          : newPortions < 10 
          ? 'low_stock' 
          : 'carving_ready';

        return {
          ...cut,
          portionsRemaining: newPortions,
          projectedStockoutHours: projectedHours,
          status
        };
      }
      return cut;
    }));
  };

  const handleToggleSoldOut = (id: string) => {
    setInventory(prev => prev.map(cut => {
      if (cut.id === id) {
        const isSoldOut = cut.status === 'sold_out';
        const newStatus = isSoldOut ? 'carving_ready' : 'sold_out';
        const portions = isSoldOut ? 15 : 0;
        showToast(
          isSoldOut ? 'Item Restocked' : 'Item 86 / Sold Out',
          `${cut.name} is now ${isSoldOut ? 'available' : 'marked 86'} on POS and Menu.`,
          isSoldOut ? 'success' : 'error'
        );
        return {
          ...cut,
          portionsRemaining: portions,
          status: newStatus,
          projectedStockoutHours: isSoldOut ? 2.5 : 0
        };
      }
      return cut;
    }));
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] py-10 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header: MASUNG SMOKEHOUSE PREDICTIVE INVENTORY */}
        <div className="bg-white border-2 border-[#5B101D] p-6 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C67D26] block">
              Pitmaster Operations Engine
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-[#181615] tracking-tight">
              MASUNG <span className="text-[#5B101D]">SMOKER INVENTORY</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#5C5651] mt-0.5">
              Predictive portion burn rates, 8–16 hour smoking batch timelines, and advance smoker loading alarms.
            </p>
          </div>

          {/* Rush Velocity Controller */}
          <div className="flex items-center gap-2 bg-[#FBF8F3] p-2 border border-[#E5DFD5] text-xs">
            <span className="font-bold text-[#181615]">Dining Velocity:</span>
            <select
              value={peakTrafficMultiplier}
              onChange={e => setPeakTrafficMultiplier(Number(e.target.value))}
              className="bg-white border border-[#E5DFD5] px-2 py-1 font-mono font-bold text-xs"
            >
              <option value="1.0">Normal Pace (1.0x)</option>
              <option value="1.2">Evening Rush (1.2x)</option>
              <option value="1.5">Weekend Feast (1.5x)</option>
            </select>
          </div>
        </div>

        {/* CRITICAL PITMASTER ADVANCE PREP ALARM */}
        <div className="bg-[#FFF8E7] border-2 border-[#C67D26] p-5 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-[#C67D26] shrink-0 mt-0.5" />
            <div>
              <h3 className="font-heading font-extrabold text-sm uppercase text-[#8A4F08]">
                Advance Smoker Schedule Alert: Lunch Rush Tomorrow
              </h3>
              <p className="text-xs text-[#5C5651] mt-0.5">
                Authentic low & slow brisket cannot be cooked in 15 minutes. To serve <strong>Tomorrow's 11:30 AM Lunch Rush</strong>, our pitmaster must load <strong className="text-[#181615]">18kg Beef Brisket</strong> into the offset smoker tonight by <strong className="text-[#5B101D]">9:30 PM</strong> (14 hours advance notice).
              </p>
            </div>
          </div>

          <div className="shrink-0 font-mono text-xs font-bold bg-white px-3 py-1.5 border border-[#C67D26] text-[#8A4F08]">
            Target Loading: 9:30 PM Tonight
          </div>
        </div>

        {/* LIVE INVENTORY CUTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory.map(cut => {
            const isLow = cut.status === 'low_stock';
            const isOut = cut.status === 'sold_out';

            return (
              <div
                key={cut.id}
                className={`bg-white border-2 p-6 shadow-subtle flex flex-col justify-between transition-colors ${
                  isOut
                    ? 'border-red-600 bg-red-50/20'
                    : isLow
                    ? 'border-amber-500'
                    : 'border-[#E5DFD5] hover:border-[#5B101D]'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start pb-2 border-b border-[#E5DFD5]">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C67D26] block">
                        Batch #{cut.smokerBatchNumber}
                      </span>
                      <h3 className="font-heading font-extrabold text-lg text-[#181615] leading-snug">
                        {cut.name}
                      </h3>
                    </div>

                    <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isOut 
                        ? 'bg-red-700 text-white' 
                        : isLow 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-green-700 text-white'
                    }`}>
                      {isOut ? '86 / Sold Out' : isLow ? 'Low Stock' : 'Ready'}
                    </span>
                  </div>

                  {/* Quantities & Burn Rate Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 bg-[#FBF8F3] border border-[#E5DFD5]">
                      <div className="text-[10px] text-[#8A837C] uppercase">Portions Left</div>
                      <div className="text-xl font-extrabold text-[#181615]">
                        {cut.portionsRemaining}
                      </div>
                      <div className="text-[10px] text-[#5C5651]">
                        ~{(cut.portionsRemaining * 0.12).toFixed(1)} kg meat
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#FBF8F3] border border-[#E5DFD5]">
                      <div className="text-[10px] text-[#8A837C] uppercase">Estimated Stockout</div>
                      <div className={`text-xl font-extrabold ${isOut ? 'text-red-700' : isLow ? 'text-amber-700' : 'text-[#5B101D]'}`}>
                        {isOut ? '0.0h' : `${cut.projectedStockoutHours}h`}
                      </div>
                      <div className="text-[10px] text-[#5C5651]">
                        At {(cut.hourlyVelocity * peakTrafficMultiplier).toFixed(1)}/hr rate
                      </div>
                    </div>
                  </div>

                  {/* Smoker Batch & Low & Slow Duration Progress */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#5C5651] flex items-center gap-1 font-semibold">
                        <Flame className="w-3.5 h-3.5 text-[#C67D26]" />
                        <span>Offset Smoker Duration:</span>
                      </span>
                      <span className="font-mono font-bold text-[#181615]">
                        {cut.hoursInPit}h / {cut.targetPitHours}h Target
                      </span>
                    </div>

                    <div className="w-full h-2 bg-stone-200 overflow-hidden">
                      <div
                        style={{ width: `${Math.min(100, (cut.hoursInPit / cut.targetPitHours) * 100)}%` }}
                        className="h-full bg-[#5B101D]"
                      />
                    </div>

                    <div className="text-[10px] text-[#8A837C] pt-1">
                      Next Batch: <strong>{cut.nextBatchEta}</strong>
                    </div>
                  </div>

                </div>

                {/* Staff Stock Modifier Controls */}
                <div className="pt-4 mt-4 border-t border-[#E5DFD5] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#181615]">Staff Quick Tweak:</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleAdjustStock(cut.id, -1)}
                        className="w-7 h-7 bg-stone-100 hover:bg-stone-200 border border-[#E5DFD5] font-bold text-xs flex items-center justify-center cursor-pointer"
                        title="Deduct 1 portion"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => handleAdjustStock(cut.id, -5)}
                        className="w-7 h-7 bg-stone-100 hover:bg-stone-200 border border-[#E5DFD5] font-bold text-xs flex items-center justify-center cursor-pointer"
                        title="Deduct 5 portions"
                      >
                        -5
                      </button>
                      <button
                        onClick={() => handleAdjustStock(cut.id, 5)}
                        className="w-7 h-7 bg-stone-100 hover:bg-stone-200 border border-[#E5DFD5] font-bold text-xs flex items-center justify-center cursor-pointer"
                        title="Add 5 portions"
                      >
                        +5
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleSoldOut(cut.id)}
                    className={`w-full py-2 text-[11px] font-heading font-extrabold uppercase tracking-wider transition-colors cursor-pointer border ${
                      isOut
                        ? 'bg-green-700 text-white border-green-700'
                        : 'bg-white hover:bg-red-50 text-red-700 border-red-300'
                    }`}
                  >
                    {isOut ? 'Mark Cut In Stock (Un-86)' : 'Mark Cut 86 / Sold Out'}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Smoker Log / Offset Wood Fire Hygiene */}
        <div className="bg-white border border-[#E5DFD5] p-6 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#5C5651]">
          <div className="space-y-1 text-center md:text-left">
            <strong className="text-[#181615] uppercase tracking-wider block">
              Offset Log-Fire Smoker Hygiene (Rodriguez, Rizal Pit)
            </strong>
            <p>
              Offset firebox uses cured Philippine mountain oakwood & fruitwood logs. Never use liquid smoke or artificial accelerants.
            </p>
          </div>

          <div className="flex gap-3 shrink-0">
            <button
              onClick={() => onNavigate('pos')}
              className="px-4 py-2.5 bg-[#5B101D] hover:bg-[#460B15] text-white text-xs font-heading font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Open POS Terminal →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
