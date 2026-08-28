import React, { useState, useRef, useEffect } from 'react';
import type { PageId } from '../types';
import { Play, Pause, Volume2, VolumeX, ArrowRight, QrCode } from 'lucide-react';
import { animateHeroEntrance } from '../lib/animations';

interface SmokehouseHeroProps {
  onNavigate: (page: PageId) => void;
}

export const SmokehouseHero: React.FC<SmokehouseHeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    animateHeroEntrance(containerRef.current);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section ref={containerRef} className="relative bg-[#5B101D] text-white border-b border-[#460B15]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Slogan & Authentic Proof Points */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Clean Sub-header Tag */}
            <div className="hero-anim-item inline-flex items-center gap-2 px-3 py-1 bg-[#460B15] border border-[#781728] text-[#FBF8F3] text-xs font-bold uppercase tracking-wider">
              <span>Texas Barbecue • Rodriguez, Rizal</span>
            </div>

            {/* Main Headline */}
            <h1 className="hero-anim-item font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.05]">
              Filipino Soul <br />
              <span className="text-[#E5DFD5]">Meets Texas Smoke.</span>
            </h1>

            {/* Value Proposition */}
            <p className="hero-anim-item text-base sm:text-lg text-[#FBF8F3]/90 max-w-xl leading-relaxed">
              Smoked low and slow over Philippine hardwood logs. Meals start at ₱99 with unlimited red rice and hot bone broth.
            </p>

            {/* Proof Points Grid */}
            <div className="hero-anim-item grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-semibold text-[#FBF8F3]">
              <div className="p-3 bg-[#460B15] border border-[#781728]">
                <div className="font-heading text-lg font-extrabold text-[#C67D26]">8–16h</div>
                <div className="text-[11px] text-[#E5DFD5] uppercase tracking-wider">Wood-Smoked</div>
              </div>
              <div className="p-3 bg-[#460B15] border border-[#781728]">
                <div className="font-heading text-lg font-extrabold text-[#C67D26]">₱99</div>
                <div className="text-[11px] text-[#E5DFD5] uppercase tracking-wider">Starting Price</div>
              </div>
              <div className="p-3 bg-[#460B15] border border-[#781728]">
                <div className="font-heading text-lg font-extrabold text-[#C67D26]">Free</div>
                <div className="text-[11px] text-[#E5DFD5] uppercase tracking-wider">Rice & Broth Refills</div>
              </div>
              <div className="p-3 bg-[#460B15] border border-[#781728]">
                <div className="font-heading text-lg font-extrabold text-[#C67D26]">Free</div>
                <div className="text-[11px] text-[#E5DFD5] uppercase tracking-wider">Billiards & Arcade</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-anim-item flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('menu')}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#C67D26] hover:bg-[#A5641A] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-subtle"
              >
                <span>See Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('order')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#460B15] hover:bg-[#32070E] border border-[#781728] text-white font-heading font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <QrCode className="w-4 h-4 text-[#E5DFD5]" />
                <span>Order for Table</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Sizzling Meat Video Showcase */}
          <div className="hero-anim-item lg:col-span-5 relative">
            <div className="relative border-2 border-[#460B15] bg-[#181615] shadow-elevated">
              
              {/* Real Non-AI Sizzling Meat Video */}
              <video
                ref={videoRef}
                src="https://assets.mixkit.co/videos/46668/46668-720.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[280px] sm:h-[360px] object-cover filter brightness-95 contrast-105"
              />

              {/* Solid Minimal Video Header Controls */}
              <div className="absolute top-3 right-3 flex items-center gap-1 p-1 bg-[#181615]/80 border border-white/20">
                <button
                  onClick={togglePlay}
                  className="p-1.5 hover:bg-white/20 transition-colors text-white"
                  title={isPlaying ? 'Pause Feed' : 'Play Feed'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:bg-white/20 transition-colors text-white"
                  title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Solid Footer Label */}
              <div className="p-3.5 bg-[#32070E] text-left border-t border-[#460B15]">
                <div className="text-xs font-heading font-extrabold uppercase tracking-wider text-[#C67D26]">
                  Smoked in Rodriguez, Rizal
                </div>
                <div className="text-xs text-[#E5DFD5] mt-0.5">
                  Fresh out of the smoker every afternoon
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
