import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Sparkles, Image as ImageIcon, Heart } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { getPlaceholderImage } from '../utils/imageFallback';
import { soundManager } from '../utils/sound';

export const MemoriesTimeline: React.FC = () => {
  const { config, goToStep, setTab, completeStep } = useRakhi();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Non-interaction page: automatically mark completed on visit
  useEffect(() => {
    completeStep('memories');
  }, [completeStep]);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start p-4 sm:p-6 max-w-2xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => goToStep('roadmap')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5D4037] hover:text-[#FF91A4] bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Roadmap
        </button>
        <span className="text-xs font-bold text-[#FF91A4] bg-white/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/80 shadow-2xs">
          📸 Sibling Scrapbook
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#5D4037] text-xs font-bold mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FF91A4]" />
          <span>Through The Years</span>
        </div>
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#5D4037] font-bold">
          Our Story 💕
        </h2>
        <p className="text-[#5D4037]/75 text-xs sm:text-sm font-sans-body max-w-md mx-auto mt-2">
          From tiny chaotic toddlers to grown-up mischief partners.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative w-full mb-10">
        {/* Central connecting line */}
        <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#FFDAB9] via-[#FF91A4] to-[#FFD700]"></div>

        <div className="space-y-8">
          {config.memories.map((mem, index) => (
            <div key={mem.id} className="relative flex items-start gap-4 sm:gap-6 pl-1 group">
              {/* Year Bubble / Timeline Node */}
              <div className="relative z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#FF91A4] to-[#FFB6C1] text-white flex flex-col items-center justify-center shadow-md border-2 border-white shrink-0 group-hover:scale-110 transition-transform">
                <span className="text-[10px] sm:text-xs font-extrabold font-heading">
                  {mem.year}
                </span>
                <span className="text-[10px] sm:text-xs">{mem.emoji || '✨'}</span>
              </div>

              {/* Memory Card with Frosted Glass */}
              <div className="flex-1 glass-panel-card p-5 sm:p-6 shadow-[0_8px_25px_rgba(255,182,193,0.18)] hover:shadow-[0_15px_35px_rgba(255,182,193,0.28)] transition-all">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#5D4037]">
                    {mem.title}
                  </h3>
                  {mem.location && (
                    <span className="text-[10px] text-[#5D4037]/70 flex items-center gap-1 bg-white/70 px-2 py-0.5 rounded-md border border-white/80">
                      <MapPin className="w-2.5 h-2.5 text-[#FF91A4]" />
                      {mem.location}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#5D4037]/80 font-sans-body leading-relaxed mb-4">
                  {mem.description}
                </p>

                {/* Polaroid Photo Frame with Subtle Glass */}
                <div
                  onClick={() => {
                    setSelectedPhoto(mem.image || getPlaceholderImage('memory', index));
                    soundManager.playTone(650, 'sine', 0.2, 0.1);
                  }}
                  className="bg-white/80 backdrop-blur-sm p-3 pb-4 rounded-2xl border border-white/90 shadow-sm hover:shadow-md cursor-pointer group/photo transition-all"
                >
                  <div className="w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-[#FFDAB9]/20 relative">
                    <img
                      src={mem.image || getPlaceholderImage('memory', index)}
                      alt={mem.title}
                      onError={(e) => {
                        // Fallback to cute SVG
                        (e.target as HTMLImageElement).src = getPlaceholderImage('memory', index);
                      }}
                      className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black/40 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> Click to zoom
                    </div>
                  </div>

                  {mem.caption && (
                    <p className="font-handwriting text-base sm:text-lg text-[#5D4037] text-center mt-2.5">
                      "{mem.caption}"
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        <button
          onClick={() => setTab('gallery')}
          className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/90 bg-white/70 text-[#5D4037] font-semibold text-xs hover:bg-white/90 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <ImageIcon className="w-4 h-4 text-[#FF91A4]" /> Open Full Photo Gallery
        </button>

        <button
          onClick={() => {
            completeStep('memories');
            goToStep('mystery');
          }}
          id="memories-next-step-button"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-heading font-bold text-sm shadow-[0_10px_25px_rgba(255,145,164,0.35)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>OPEN MYSTERY BOXES 🎁</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="glass-panel max-w-lg w-full p-4 pb-6 shadow-2xl border border-white/90 text-center bg-white/90"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-white/50 mb-3">
              <img
                src={selectedPhoto}
                alt="Enlarged Memory"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={() => setSelectedPhoto(null)}
              className="px-6 py-2 bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-bold text-xs rounded-full transition-colors"
            >
              Close Photo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
