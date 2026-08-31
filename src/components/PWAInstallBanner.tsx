import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';


export const PWAInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    const isDismissed = localStorage.getItem('masung_pwa_dismissed');
    if (isDismissed) return;

    // Detect iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;

    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
      setShowBanner(true);
    }

    // Android / Chrome beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setShowIOSGuide(false);
    localStorage.setItem('masung_pwa_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Floating or Top Install Pill */}
      <div className="fixed top-18 sm:top-20 right-4 left-4 sm:left-auto sm:right-6 z-50 max-w-sm bg-[#181615]/95 text-white p-3.5 rounded-xl border border-[#C67D26] shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#5B101D] p-1.5 flex items-center justify-center shrink-0 border border-[#C67D26]/50">
              <img src="/logo.png" alt="Masung App" className="w-full h-full object-contain" />
            </div>
            <div>
              <strong className="font-montserrat font-bold text-xs uppercase block text-white leading-tight">
                Install Masung App
              </strong>
              <span className="font-body text-[11px] text-[#8A837C] block leading-tight">
                Instant 1-tap table ordering & perks
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="px-3 py-1.5 bg-[#C67D26] hover:bg-[#A5641A] text-white font-montserrat font-bold text-[11px] uppercase tracking-wider rounded transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
            <button
              onClick={handleDismiss}
              className="p-1 text-[#8A837C] hover:text-white transition-colors cursor-pointer"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Safari Add to Home Screen Modal Guide */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#181615] border-2 border-[#C67D26] text-white max-w-sm w-full p-6 rounded-2xl space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-5 h-5 text-[#C67D26]" />
                <h3 className="font-bebas text-2xl uppercase tracking-wider">Install on iPhone</h3>
              </div>
              <button onClick={() => setShowIOSGuide(false)} className="text-[#8A837C] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="font-body text-xs text-[#E5DFD5]">
              To add Masung Smokehouse to your iPhone home screen:
            </p>

            <div className="space-y-3 font-body text-xs bg-[#24201D] p-4 rounded-xl border border-[#3A3530]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#5B101D] flex items-center justify-center font-montserrat font-bold text-xs shrink-0">
                  1
                </div>
                <span>Tap the <strong>Share button</strong> in Safari's bottom toolbar.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#5B101D] flex items-center justify-center font-montserrat font-bold text-xs shrink-0">
                  2
                </div>
                <span>Scroll down and select <strong>"Add to Home Screen"</strong>.</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#5B101D] flex items-center justify-center font-montserrat font-bold text-xs shrink-0">
                  3
                </div>
                <span>Tap <strong>"Add"</strong> in the top right corner!</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-3 bg-[#5B101D] hover:bg-[#460B15] text-white font-montserrat font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
