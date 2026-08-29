import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { MENU_ITEMS } from '../../data/menuData';
import { Plus, Check } from 'lucide-react';

interface CutSensoryProfile {
  itemId: string;
  name: string;
  subname: string;
  woodType: string;
  smokeHours: number;
  temperature: string;
  smokeDepth: number; // 0-100
  barkCrunch: number; // 0-100
  marbleTenderness: number; // 0-100
  woodSweetness: number; // 0-100
  paletteNotes: string;
  suggestedPairing: string;
}

const SENSORY_PROFILES: CutSensoryProfile[] = [
  {
    itemId: 'beef-brisket-meal',
    name: 'Texas Smoked Beef Brisket',
    subname: '12-Hour Oakwood Low & Slow',
    woodType: 'Mountain Oak & Fruitwood',
    smokeHours: 12,
    temperature: '225°F Constant',
    smokeDepth: 95,
    barkCrunch: 88,
    marbleTenderness: 96,
    woodSweetness: 72,
    paletteNotes: 'Distinct dark pepper bark with a deep pink smoke ring. Renders down to buttery tenderness straight across the grain.',
    suggestedPairing: 'Heirloom red rice, house spiced vinegar, and rich bone broth.'
  },
  {
    itemId: 'pork-belly-meal',
    name: 'Hickory Smoked Pork Belly',
    subname: '8-Hour Hickory Smoked Slab',
    woodType: 'Philippine Hickory Logs',
    smokeHours: 8,
    temperature: '235°F Slow Roast',
    smokeDepth: 85,
    barkCrunch: 92,
    marbleTenderness: 94,
    woodSweetness: 86,
    paletteNotes: 'Crisp, crackling mahogany edges wrapping layers of tender pork belly with caramelized house barbecue glaze.',
    suggestedPairing: 'Pickled house atchara, steamed red rice, and iced calamansi.'
  },
  {
    itemId: 'st-louis-ribs',
    name: 'St. Louis Smoked Pork Ribs',
    subname: '6-Hour Dry Rub Hardwood Cut',
    woodType: 'Fruitwood & Cured Oak',
    smokeHours: 6,
    temperature: '225°F Low Ember',
    smokeDepth: 90,
    barkCrunch: 80,
    marbleTenderness: 90,
    woodSweetness: 82,
    paletteNotes: 'Dry-rubbed with 11 coarse spices. Clean bite that pulls smoothly off the bone with gentle smoke warmth.',
    suggestedPairing: 'Double bone broth refills, roasted garlic corn, and sweet potato mash.'
  },
  {
    itemId: 'smoked-kare-kare',
    name: 'Smoked Beef Kare-Kare',
    subname: 'Smoker Drippings & Peanut Gravy',
    woodType: 'Hardwood Ember Simmer',
    smokeHours: 10,
    temperature: 'Slow Simmer',
    smokeDepth: 78,
    barkCrunch: 65,
    marbleTenderness: 95,
    woodSweetness: 90,
    paletteNotes: 'Velvety toasted peanut sauce enriched with brisket pit drippings, tender beef cuts, and house-made fermented bagoong.',
    suggestedPairing: 'Heirloom red rice, blanched bok choy, and extra bagoong.'
  }
];

export const FlavorRadar: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [addedCut, setAddedCut] = useState(false);

  const active = SENSORY_PROFILES[selectedIdx];
  const menuItem = MENU_ITEMS.find((m) => m.id === active.itemId);

  const handleAdd = () => {
    if (menuItem) {
      addItem(menuItem);
      setAddedCut(true);
      showToast('Added to Board', `${active.name} • ₱${menuItem.price}`, 'success');
      setTimeout(() => setAddedCut(false), 2000);
    }
  };

  const metrics = [
    { label: 'Smoke Depth', value: active.smokeDepth, desc: 'Hardwood smoke ring penetration' },
    { label: 'Bark Crunch', value: active.barkCrunch, desc: 'Coarse pepper and sea salt crust' },
    { label: 'Marble Tenderness', value: active.marbleTenderness, desc: 'Collagen rendering & juicy bite' },
    { label: 'Wood Sweetness', value: active.woodSweetness, desc: 'Natural fruitwood caramel notes' },
  ];

  return (
    <div className="bg-[#120609] border border-[#3D0C15] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.8)] relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#3D0C15] pb-6 mb-8">
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] block mb-1">
            Sensory Analysis
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FFF5F7]">
            Pitmaster Flavor & Texture Radar
          </h3>
        </div>
        <p className="text-xs text-[#D8C7C4] max-w-md font-light">
          Every cut is cataloged by our pit team to help guests pair smoke depth with their palate.
        </p>
      </div>

      {/* Cut Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {SENSORY_PROFILES.map((cut, idx) => (
          <button
            key={cut.itemId}
            onClick={() => setSelectedIdx(idx)}
            className={`p-3 text-left border transition-all cursor-pointer ${
              selectedIdx === idx
                ? 'border-[#D4AF37] bg-[#1C0A0F] text-white shadow-[0_0_15px_rgba(142,27,45,0.25)]'
                : 'border-[#3D0C15]/70 hover:border-[#8E1B2D] bg-[#0A0406]/50 text-[#D8C7C4]'
            }`}
          >
            <span className="text-[9px] uppercase tracking-wider block text-[#D4AF37] font-mono">
              Profile 0{idx + 1}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider block truncate text-[#FFF5F7]">
              {cut.name}
            </span>
          </button>
        ))}
      </div>

      {/* Detailed Metrics & Notes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Four Tactile Gauges */}
        <div className="lg:col-span-7 space-y-5">
          {metrics.map((m) => (
            <div key={m.label} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#FFF5F7] font-medium tracking-wider uppercase text-[11px]">
                  {m.label}
                </span>
                <span className="font-mono text-[#D4AF37] font-bold">
                  {m.value}%
                </span>
              </div>
              
              {/* Clean Luxury Gauge Bar */}
              <div className="w-full h-2 bg-[#0A0406] border border-[#3D0C15] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#8E1B2D] via-[#D4AF37] to-[#D4AF37] transition-all duration-700 ease-out"
                  style={{ width: `${m.value}%` }}
                />
              </div>
              <p className="text-[10px] text-[#A89895] font-light">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Technical Notes Card */}
        <div className="lg:col-span-5 bg-[#0A0406] border border-[#3D0C15] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#3D0C15] pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block">
                {active.subname}
              </span>
              <h4 className="font-serif text-xl text-[#FFF5F7]">
                {active.name}
              </h4>
            </div>
            {menuItem && (
              <span className="text-lg font-serif text-[#D4AF37] font-bold">
                ₱{menuItem.price}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px] text-[#D8C7C4] pt-1">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A89895] block">Smoker Duration</span>
              <strong className="text-[#FFF5F7]">{active.smokeHours} Hours</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A89895] block">Hardwood Blend</span>
              <strong className="text-[#FFF5F7]">{active.woodType}</strong>
            </div>
          </div>

          <p className="text-xs text-[#D8C7C4] leading-relaxed font-light border-t border-[#3D0C15] pt-3">
            {active.paletteNotes}
          </p>

          <div className="bg-[#1C0A0F] p-3 border border-[#3D0C15] text-[11px] text-[#A89895]">
            <strong className="text-[#D4AF37] block uppercase tracking-wider text-[10px] mb-0.5">
              Tasting Recommendation:
            </strong>
            {active.suggestedPairing}
          </div>

          {menuItem && (
            <button
              onClick={handleAdd}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#B89327] text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-[#D4AF37]/20"
            >
              {addedCut ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Carving Board</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Board • ₱{menuItem.price}</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
