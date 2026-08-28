import React from 'react';
import { Home, Image as ImageIcon, BookOpen, Mail, Lock } from 'lucide-react';
import { useRakhi, ActiveTab } from '../context/RakhiContext';

export const Navbar: React.FC = () => {
  const { activeTab, setTab, isUnlocked, isStepUnlocked } = useRakhi();

  const isMemoriesUnlocked = isStepUnlocked('memories');
  const isGalleryUnlocked = isStepUnlocked('gallery');
  const isLetterUnlocked = isStepUnlocked('letter');

  return (
    <nav
      id="bottom-navigation-bar"
      aria-label="Main Navigation"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md glass-panel-strong border border-white/80 rounded-full shadow-[0_12px_35px_rgba(255,145,164,0.22)] px-3 py-2 flex items-center justify-around transition-all duration-300"
    >
      {/* Home / Roadmap Tab */}
      <button
        onClick={() => setTab('home')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all duration-200 text-xs font-semibold ${
          activeTab === 'home'
            ? 'text-[#5D4037] bg-white/70 shadow-sm border border-white/80 scale-105'
            : 'text-[#5D4037]/70 hover:text-[#FF91A4] hover:bg-white/40'
        }`}
        title="Roadmap & Home"
      >
        <Home className="w-4 h-4 text-[#FF91A4]" />
        <span className="text-[10px]">Home</span>
      </button>

      {/* Memories Tab */}
      <button
        onClick={() => setTab('memories')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all duration-200 text-xs font-semibold relative ${
          activeTab === 'memories'
            ? 'text-[#5D4037] bg-white/70 shadow-sm border border-white/80 scale-105'
            : isMemoriesUnlocked
            ? 'text-[#5D4037]/70 hover:text-[#FF91A4] hover:bg-white/40'
            : 'text-[#5D4037]/40 cursor-not-allowed opacity-60'
        }`}
        title={isMemoriesUnlocked ? 'Our Memories Scrapbook' : 'Locked (Complete Sister Awards first)'}
      >
        <div className="relative">
          <BookOpen className="w-4 h-4 text-[#FF91A4]" />
          {!isMemoriesUnlocked && (
            <Lock className="w-2.5 h-2.5 text-gray-400 absolute -top-1 -right-1.5" />
          )}
        </div>
        <span className="text-[10px]">Memories</span>
      </button>

      {/* Gallery Tab */}
      <button
        onClick={() => setTab('gallery')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all duration-200 text-xs font-semibold relative ${
          activeTab === 'gallery'
            ? 'text-[#5D4037] bg-white/70 shadow-sm border border-white/80 scale-105'
            : isGalleryUnlocked
            ? 'text-[#5D4037]/70 hover:text-[#FF91A4] hover:bg-white/40'
            : 'text-[#5D4037]/40 cursor-not-allowed opacity-60'
        }`}
        title={isGalleryUnlocked ? 'Photo Album' : 'Locked (Complete Sister Awards first)'}
      >
        <div className="relative">
          <ImageIcon className="w-4 h-4 text-[#FF91A4]" />
          {!isGalleryUnlocked && (
            <Lock className="w-2.5 h-2.5 text-gray-400 absolute -top-1 -right-1.5" />
          )}
        </div>
        <span className="text-[10px]">Gallery</span>
      </button>

      {/* Letter Tab */}
      <button
        onClick={() => setTab('letter')}
        className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all duration-200 text-xs font-semibold relative ${
          activeTab === 'letter'
            ? 'text-[#5D4037] bg-white/70 shadow-sm border border-white/80 scale-105'
            : isLetterUnlocked
            ? 'text-[#5D4037]/70 hover:text-[#FF91A4] hover:bg-white/40'
            : 'text-[#5D4037]/40 cursor-not-allowed opacity-60'
        }`}
        title={isLetterUnlocked ? 'Sibling Letter' : 'Locked (Complete earlier steps first)'}
      >
        <div className="relative">
          <Mail className="w-4 h-4 text-[#FF91A4]" />
          {!isLetterUnlocked && (
            <Lock className="w-2.5 h-2.5 text-gray-400 absolute -top-1 -right-1.5" />
          )}
        </div>
        <span className="text-[10px]">Letter</span>
      </button>
    </nav>
  );
};

