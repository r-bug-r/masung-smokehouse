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

  // 3D Fire Text Tilt State
  const [fireTilt, setFireTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    animateHeroEntrance(containerRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D tilt
    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;
    setFireTilt({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setFireTilt({ x: 0, y: 0 });
  };

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#181615] text-white border-b-2 border-[#5B101D] perspective-[1200px]"
    >
      {/* Background Video Layer */}
      <video
        ref={videoRef}
        src="https://assets.mixkit.co/videos/46668/46668-720.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter brightness-[0.70] contrast-[1.1]"
      />

      {/* Dark Smokehouse Vignette & Tint Overlay */}
      <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-[#181615] via-black/45 to-black/70 pointer-events-none" />

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

      {/* Centered Hero Content with 3D Fire Effect */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex flex-col items-center justify-center space-y-6">
        
        {/* 3D Fire Brand Name: MASUNG with dynamic fire ember depth and 3D tilt */}
        <div 
          style={{
            transform: `perspective(1000px) rotateX(${fireTilt.x}deg) rotateY(${fireTilt.y}deg)`,
            transition: 'transform 0.15s ease-out',
            transformStyle: 'preserve-3d'
          }}
          className="hero-anim-item space-y-2 select-none"
        >
          {/* 3D Fire Text */}
          <div className="relative inline-block">
            {/* Ambient Flame Glow Background Layer */}
            <div 
              className="absolute -inset-4 bg-radial from-[#FF5722]/30 via-[#C67D26]/15 to-transparent blur-xl pointer-events-none -z-10" 
              aria-hidden="true"
            />

            <h1 className="fire-text-3d font-heading text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-extrabold uppercase tracking-tight text-white leading-none">
              MASUNG
            </h1>
          </div>

          <span className="block text-sm sm:text-lg md:text-2xl font-extrabold tracking-[0.4em] text-[#E5DFD5] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            smokehouse
          </span>
        </div>

        {/* Two Centered Action Buttons */}
        <div className="hero-anim-item flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 w-full max-w-xl">
          
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
