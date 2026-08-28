import React, { useState } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Image as ImageIcon, Sparkles, Heart } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { getPlaceholderImage } from '../utils/imageFallback';
import { soundManager } from '../utils/sound';

export const PhotoGallery: React.FC = () => {
  const { config, goToStep, setTab } = useRakhi();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = config.gallery;
  const categories = ['All', ...Array.from(new Set(photos.map(p => p.category || 'Memories')))];

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter(p => (p.category || 'Memories') === activeCategory);

  const openLightbox = (index: number) => {
    soundManager.playTone(700, 'sine', 0.15, 0.1);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      soundManager.playTone(600, 'sine', 0.1, 0.1);
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      soundManager.playTone(700, 'sine', 0.1, 0.1);
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => setTab('memories')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5D4037] hover:text-[#FF91A4] bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Memories Timeline
        </button>
        <span className="text-xs font-bold text-[#FF91A4] bg-white/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/80 shadow-2xs">
          🖼️ Full Photo Album
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#5D4037] font-bold">
          Captured Sibling Moments 📸
        </h2>
        <p className="text-[#5D4037]/75 text-xs sm:text-sm font-sans-body max-w-md mx-auto mt-2">
          Click any photo for a full-screen view. Add your own images to <code className="text-[#FF91A4] bg-white/70 px-1.5 py-0.5 rounded font-mono text-xs border border-white/80">/public/images/</code>!
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              soundManager.playTone(500, 'sine', 0.1, 0.08);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat
                ? 'bg-[#FF91A4] text-white shadow-md shadow-[#FF91A4]/30 scale-105'
                : 'bg-white/60 text-[#5D4037] border border-white/80 hover:bg-white/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid with Frosted Glass Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {filteredPhotos.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group glass-panel-card p-3 pb-4 shadow-[0_8px_25px_rgba(255,182,193,0.18)] hover:shadow-[0_15px_35px_rgba(255,182,193,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="w-full h-56 rounded-2xl overflow-hidden bg-[#FFDAB9]/20 relative mb-3">
              <img
                src={item.image || getPlaceholderImage(item.category, idx)}
                alt={item.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getPlaceholderImage(item.category, idx);
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 right-2.5 bg-black/40 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {item.category || 'Memory'}
              </div>
            </div>

            <div className="px-2">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-heading font-bold text-sm sm:text-base text-[#5D4037] group-hover:text-[#FF91A4] transition-colors">
                  {item.title}
                </h4>
                {item.date && (
                  <span className="text-[10px] text-[#5D4037]/50 font-mono">
                    {item.date}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#5D4037]/75 font-sans-body line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Frosted Glass */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            className="glass-panel max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative flex flex-col items-center bg-white/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Box */}
            <div className="w-full h-72 sm:h-[420px] rounded-2xl overflow-hidden bg-white/40 relative mb-4 flex items-center justify-center">
              <img
                src={filteredPhotos[lightboxIndex].image || getPlaceholderImage(filteredPhotos[lightboxIndex].category, lightboxIndex)}
                alt={filteredPhotos[lightboxIndex].title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getPlaceholderImage(filteredPhotos[lightboxIndex].category, lightboxIndex);
                }}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all shadow-md"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center transition-all shadow-md"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption & Info */}
            <div className="w-full text-center px-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#5D4037]">
                  {filteredPhotos[lightboxIndex].title}
                </h3>
                <span className="text-xs bg-[#FFDAB9]/60 text-[#5D4037] px-2.5 py-0.5 rounded-full font-semibold border border-white">
                  {filteredPhotos[lightboxIndex].category || 'Memory'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5D4037]/80 max-w-md mx-auto">
                {filteredPhotos[lightboxIndex].caption}
              </p>
              {filteredPhotos[lightboxIndex].date && (
                <p className="text-[11px] text-[#5D4037]/50 font-mono mt-1">
                  📅 {filteredPhotos[lightboxIndex].date}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
