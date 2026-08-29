import React, { useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface SmokeStep {
  time: string;
  phase: string;
  temperature: string;
  title: string;
  summary: string;
  woodAction: string;
  proTip: string;
}

const SMOKE_STEPS: SmokeStep[] = [
  {
    time: '04:00 AM',
    phase: 'Phase 01',
    temperature: '225°F Chamber Lock',
    title: 'Firebox Ignition & Draft Calibration',
    summary: 'Our pitmasters ignite splits of Philippine mountain oak and seasoned fruitwood in the offset firebox. Air dampers are calibrated to produce thin, clean blue smoke rather than heavy soot.',
    woodAction: 'Cured Mountain Oak Logs',
    proTip: 'Blue smoke guarantees a sweet, clean hardwood kiss without bitterness.'
  },
  {
    time: '06:00 AM',
    phase: 'Phase 02',
    temperature: '225°F – 235°F',
    title: 'Coarse Pepper Crust & Smoker Placement',
    summary: 'The beef briskets and pork belly slabs are seasoned strictly with coarse black pepper, sea salt, and brown sugar before entering the smoker. Placed fat-side up toward the radiant heat flow.',
    woodAction: 'Fruitwood Split Additions',
    proTip: 'A dry, cold surface bonds with the wood smoke to create the signature pink smoke ring.'
  },
  {
    time: '11:00 AM',
    phase: 'Phase 03',
    temperature: '165°F Internal Meat Temp',
    title: 'Bark Crystallization & Smoke Ring Formation',
    summary: 'Hours of convective smoke exposure cause proteins and pepper to form a dark, crystalline mahogany bark. The nitric oxide from burning logs creates the striking 6mm crimson smoke ring.',
    woodAction: 'Low Fire Ember Management',
    proTip: 'The fat cap begins to render, basting the muscle fibers below automatically.'
  },
  {
    time: '02:00 PM',
    phase: 'Phase 04',
    temperature: '190°F Internal Meat Temp',
    title: 'The Stall & Peach Butcher Paper Wrap',
    summary: 'As moisture evaporation stalls internal temperatures, each cut is individually wrapped in un-waxed peach butcher paper infused with rendered smoked beef tallow to preserve bark texture.',
    woodAction: 'Mild Smolder & Consistent Draft',
    proTip: 'Peach paper breathes unlike foil, keeping the bark crisp while braising inside.'
  },
  {
    time: '04:00 PM',
    phase: 'Phase 05',
    temperature: '203°F Finished Probe Pull',
    title: 'Cambro Rest & Hot Board Carving Service',
    summary: 'The cuts reach internal probe tenderness (like sliding a knife through warm butter). Rested in insulated cambros for 2 full hours to reabsorb juices before opening the carving station.',
    woodAction: 'Holding Embers',
    proTip: 'Every portion is sliced across the grain straight onto the carving board.'
  }
];

export const SmokeTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const current = SMOKE_STEPS[activeStep];

  return (
    <div className="bg-[#0A0406] border border-[#3D0C15] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] block">
          Craft & Methodology
        </span>
        <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#FFF5F7]">
          The 16-Hour Wood Smoke Cycle
        </h3>
        <p className="text-xs text-[#D8C7C4] font-light">
          Low and slow is not a marketing phrase—it is our daily 4:00 AM fire ritual in Rodriguez, Rizal.
        </p>
      </div>

      {/* Horizontal Step Selector */}
      <div className="grid grid-cols-5 gap-2 border-b border-[#3D0C15] pb-6 mb-8">
        {SMOKE_STEPS.map((step, idx) => (
          <button
            key={step.time}
            onClick={() => setActiveStep(idx)}
            className={`text-center p-3 border transition-all cursor-pointer ${
              activeStep === idx
                ? 'border-[#D4AF37] bg-[#1C0A0F] text-[#FFF5F7] shadow-[0_0_15px_rgba(142,27,45,0.3)]'
                : 'border-[#3D0C15]/60 hover:border-[#8E1B2D] text-[#A89895] bg-[#120609]/40'
            }`}
          >
            <span className="text-[9px] uppercase tracking-wider block text-[#D4AF37] font-semibold">
              {step.phase}
            </span>
            <span className="text-xs sm:text-sm font-serif font-bold text-white block">
              {step.time}
            </span>
            <span className="text-[9px] text-[#A89895] hidden md:block truncate mt-0.5">
              {step.temperature}
            </span>
          </button>
        ))}
      </div>

      {/* Active Phase Deep Dive Card */}
      <div className="bg-[#120609] border border-[#3D0C15] p-6 sm:p-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#3D0C15] pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block font-mono">
              {current.phase} • {current.time}
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#FFF5F7]">
              {current.title}
            </h4>
          </div>
          <span className="px-3 py-1 bg-[#1C0A0F] border border-[#3D0C15] text-[#D4AF37] text-xs font-mono font-semibold self-start sm:self-auto">
            {current.temperature}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#D8C7C4] leading-relaxed font-light">
          {current.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          
          <div className="p-4 bg-[#0A0406] border border-[#3D0C15] space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#A89895] block flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
              Wood Fire Management
            </span>
            <p className="text-xs text-[#FFF5F7] font-medium">
              {current.woodAction}
            </p>
          </div>

          <div className="p-4 bg-[#0A0406] border border-[#3D0C15] space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#A89895] block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Pitmaster Secret
            </span>
            <p className="text-xs text-[#FFF5F7] font-light">
              {current.proTip}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
