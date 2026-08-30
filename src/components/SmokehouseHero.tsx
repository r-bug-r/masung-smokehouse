import React, { useState, useRef, useEffect } from 'react';
import type { PageId } from '../types';
import { Play, Pause, Volume2, VolumeX, ShoppingBag, Calendar } from 'lucide-react';
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
    <section 
      ref={containerRef} 
      className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#181615] text-white border-b-2 border-[#5B101D]"
    >
      {/* Background Video Layer */}
      <video
        ref={videoRef}
        src="https://assets.mixkit.co/videos/46668/46668-720.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
      />

      {/* Dark Smokehouse Vignette & Tint Overlay */}
      <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-[#181615] via-black/40 to-black/65 pointer-events-none" />

      {/* Video Audio/Playback Controls (Discrete Corner Controls) */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1 bg-[#181615]/80 backdrop-blur-xs border border-white/20">
        <button
          onClick={togglePlay}
          className="p-1.5 hover:bg-white/20 transition-colors text-white cursor-pointer"
          title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          aria-label="Toggle Video Playback"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-1.5 hover:bg-white/20 transition-colors text-white cursor-pointer"
          title={isMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
          aria-label="Toggle Video Audio"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Centered Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center justify-center space-y-5">
        
        {/* Top Tagline / Header Text */}
        <div className="hero-anim-item inline-flex items-center gap-2 px-4 py-1.5 bg-[#460B15]/90 border border-[#781728] text-[#FBF8F3] text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-xs shadow-subtle">
          <span>Smoked in Rodriguez, Rizal • Fresh out of the smoker every afternoon</span>
        </div>

        {/* Brand Name: Large MASUNG + Small smokehouse */}
        <div className="hero-anim-item space-y-1">
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] leading-none">
            MASUNG
          </h1>
          <span className="block text-sm sm:text-lg md:text-xl font-extrabold tracking-[0.35em] text-[#C67D26] uppercase drop-shadow-md">
            smokehouse
          </span>
        </div>

        {/* Two Centered Action Buttons */}
        <div className="hero-anim-item flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 w-full max-w-xl">
          
          {/* Button 1: Order to Table */}
          <button
            onClick={() => onNavigate('order')}
            className="w-full sm:w-auto px-8 py-4 bg-[#C67D26] hover:bg-[#A5641A] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-elevated hover:scale-[1.02]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order to Table</span>
          </button>

          {/* Button 2: Event Reservation (tables can't be individually reserved) */}
          <button
            onClick={() => onNavigate('reservation')}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#5B101D]/90 hover:bg-[#460B15] border border-[#781728] hover:border-[#C67D26] text-white font-heading font-extrabold text-xs uppercase tracking-wider transition-all flex flex-col items-center justify-center cursor-pointer shadow-elevated hover:scale-[1.02] text-center"
          >
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C67D26]" />
              <span>Event Reservation</span>
            </div>
            <span className="text-[10px] text-[#E5DFD5] font-normal normal-case mt-0.5 opacity-90">
              (tables can't be individually reserved)
            </span>
          </button>

        </div>

      </div>
    </section>
  );
};
