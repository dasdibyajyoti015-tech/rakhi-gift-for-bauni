import React, { useEffect } from 'react';
import { RakhiProvider, useRakhi } from './context/RakhiContext';
import { FloatingPetals } from './components/FloatingPetals';
import { MusicPlayer } from './components/MusicPlayer';
import { EasterEggTracker } from './components/EasterEggTracker';
import { EasterEggNightJar } from './components/EasterEggNightJar';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { UnlockScreen } from './components/UnlockScreen';
import { JourneyRoadmap } from './components/JourneyRoadmap';
import { QuizSection } from './components/QuizSection';
import { AwardsSection } from './components/AwardsSection';
import { MemoriesTimeline } from './components/MemoriesTimeline';
import { PhotoGallery } from './components/PhotoGallery';
import { MysteryBoxesSection } from './components/MysteryBoxesSection';
import { ThingsINeverSaySection } from './components/ThingsINeverSaySection';
import { HandwrittenLetter } from './components/HandwrittenLetter';
import { FinalSurpriseSection } from './components/FinalSurpriseSection';
import { CustomizePage } from './components/CustomizePage';
import { Lock, Sparkles, CheckCircle2, X } from 'lucide-react';

const ToastNotification: React.FC = () => {
  const { toast, clearToast } = useRakhi();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div
      role="alert"
      className="fixed top-16 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-300 w-[90%] max-w-md px-4 py-3 rounded-2xl glass-panel-strong shadow-[0_15px_35px_rgba(255,145,164,0.3)] border-2 border-white/90 flex items-center justify-between gap-3 text-xs sm:text-sm font-heading font-bold"
    >
      <div className="flex items-center gap-2.5">
        {toast.type === 'lock' ? (
          <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
        ) : toast.type === 'success' ? (
          <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-xl bg-pink-100 text-[#FF91A4] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        )}
        <span className="text-[#5D4037] leading-tight font-sans-body font-semibold">
          {toast.message}
        </span>
      </div>

      <button
        onClick={clearToast}
        className="text-[#5D4037]/60 hover:text-[#5D4037] p-1 rounded-lg hover:bg-white/50 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

const MainAppContent: React.FC = () => {
  const { currentStep, activeTab, config } = useRakhi();

  const renderContent = () => {
    if (activeTab === 'customize') {
      return <CustomizePage />;
    }

    switch (currentStep) {
      case 'landing':
        return <LandingPage />;
      case 'unlock':
        return <UnlockScreen />;
      case 'roadmap':
        return <JourneyRoadmap />;
      case 'quiz':
        return <QuizSection />;
      case 'awards':
        return <AwardsSection />;
      case 'memories':
        return <MemoriesTimeline />;
      case 'gallery':
        return <PhotoGallery />;
      case 'mystery':
        return <MysteryBoxesSection />;
      case 'things':
        return <ThingsINeverSaySection />;
      case 'letter':
        return <HandwrittenLetter />;
      case 'gift':
      case 'celebration':
        return <FinalSurpriseSection />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#5D4037] relative flex flex-col justify-between selection:bg-[#FFB6C1]/40 selection:text-[#5D4037] pb-24 overflow-x-hidden">
      {/* Frosted Glass Mesh Gradient Background */}
      <div className="mesh-bg pointer-events-none" aria-hidden="true" />

      {/* Background Floating Petals */}
      <FloatingPetals />

      {/* Secret Starry Wish Jar Easter Egg Screen */}
      <EasterEggNightJar />

      {/* Floating Lock / Toast Notification */}
      <ToastNotification />

      {/* Global Top Header with Frosted Glass styling */}
      <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-3 bg-white/40 backdrop-blur-xl border-b border-white/60 shadow-[0_4px_20px_rgba(255,182,193,0.1)] flex items-center justify-between transition-all">
        <div className="flex items-center gap-2">
          <span className="text-xl animate-bounce">🌸</span>
          <span className="font-serif-display font-bold text-[#5D4037] text-sm sm:text-base tracking-tight">
            Raksha Bandhan <span className="text-[#FF91A4]">2026</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <EasterEggTracker />
          <MusicPlayer />
        </div>
      </header>

      {/* Main Journey Screen */}
      <main className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 relative z-10">
        {renderContent()}
      </main>

      {/* Bottom Floating Navigation Bar */}
      <Navbar />
    </div>
  );
};

export default function App() {
  return (
    <RakhiProvider>
      <MainAppContent />
    </RakhiProvider>
  );
}
