import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Gift, Heart, Send, RotateCcw, Copy, Check, Share2 } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { soundManager } from '../utils/sound';

export const FinalSurpriseSection: React.FC = () => {
  const { config, hugSent, sendDigitalHug, restartJourney, goToStep } = useRakhi();
  const [isGiftOpened, setIsGiftOpened] = useState<boolean>(false);
  const [copiedVoucher, setCopiedVoucher] = useState<boolean>(false);

  const gift = config.finalGift;

  const triggerCelebration = () => {
    soundManager.playFanfare();
    setIsGiftOpened(true);

    // Launch multi-burst confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F43F5E', '#EC4899', '#F59E0B', '#10B981', '#6366F1']
      });

      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#F43F5E', '#FB7185', '#FDE047']
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#F43F5E', '#FB7185', '#FDE047']
        });
      }, 300);
    } catch {
      // ignore
    }
  };

  const handleCopyVoucher = () => {
    if (gift.voucherCode) {
      navigator.clipboard.writeText(gift.voucherCode);
      setCopiedVoucher(true);
      soundManager.playCorrectSound();
      setTimeout(() => setCopiedVoucher(false), 2000);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start p-4 sm:p-6 max-w-2xl mx-auto text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/90 text-[#5D4037] text-xs font-bold mb-4 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#FF91A4]" />
        <span>{gift.badge}</span>
      </div>

      {/* Main Headline */}
      <h2 className="font-serif-display text-4xl sm:text-5xl text-[#5D4037] font-bold tracking-tight mb-2">
        {gift.title}
      </h2>

      <p className="text-[#5D4037]/80 text-sm sm:text-base font-sans-body max-w-md mx-auto mb-8 leading-relaxed">
        {gift.subtitle}
      </p>

      {!isGiftOpened ? (
        /* Unopened Grand Gift Box Card with Frosted Glass */
        <div className="w-full glass-panel p-8 sm:p-12 shadow-[0_20px_50px_rgba(255,182,193,0.25)] flex flex-col items-center relative overflow-hidden">
          {/* Glowing Animated Gift Vector */}
          <div className="relative my-4 group cursor-pointer" onClick={triggerCelebration}>
            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-[#FF91A4] via-[#FFB6C1] to-[#FFD700] shadow-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform border-2 border-white">
              <div className="absolute w-6 h-full bg-white/40 left-1/2 -translate-x-1/2"></div>
              <div className="absolute h-6 w-full bg-white/40 top-1/2 -translate-y-1/2"></div>
              <span className="text-6xl sm:text-7xl animate-bounce">🎁</span>
            </div>
          </div>

          <p className="text-xs text-[#5D4037]/70 font-sans-body mb-6">
            You've completed the journey! One final surprise remains...
          </p>

          <button
            onClick={triggerCelebration}
            id="open-gift-grand-button"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-heading font-extrabold text-base shadow-[0_10px_30px_rgba(255,145,164,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Gift className="w-5 h-5" />
            <span>{gift.boxCta}</span>
          </button>
        </div>
      ) : (
        /* Revealed Gift Voucher & Celebration Card */
        <div className="w-full space-y-6 animate-fade-in">
          {/* Official Gift Certificate Card */}
          <div className="w-full glass-panel-strong rounded-3xl p-6 sm:p-10 border-2 border-white/90 shadow-2xl text-center relative overflow-hidden bg-white/95">
            {/* Gold Ribbon Corner Tag */}
            <div className="absolute top-4 right-4 text-2xl">✨</div>
            <div className="absolute top-4 left-4 text-2xl">🌸</div>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF91A4] to-[#FFD700] text-white mx-auto flex items-center justify-center text-3xl shadow-md mb-3">
              🎁
            </div>

            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#5D4037] font-bold mb-2">
              {gift.giftTitle}
            </h3>

            <p className="text-[#5D4037]/90 text-sm sm:text-base font-sans-body max-w-md mx-auto mb-6 leading-relaxed">
              "{gift.giftMessage}"
            </p>

            {/* Voucher Code Box */}
            {gift.voucherCode && (
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white/90 shadow-sm max-w-sm mx-auto mb-4 flex items-center justify-between gap-3">
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF91A4] font-mono block">
                    Voucher Code
                  </span>
                  <span className="font-mono font-extrabold text-base text-[#5D4037]">
                    {gift.voucherCode}
                  </span>
                </div>
                <button
                  onClick={handleCopyVoucher}
                  className="px-3.5 py-1.5 rounded-xl bg-[#FFDAB9]/40 hover:bg-[#FFDAB9]/60 text-[#5D4037] text-xs font-bold flex items-center gap-1 transition-colors border border-white"
                >
                  {copiedVoucher ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            )}

            {gift.giftNote && (
              <p className="text-xs text-[#FF91A4] font-sans-body mb-6 font-semibold italic">
                📱 {gift.giftNote}
              </p>
            )}

            <div className="pt-4 border-t border-white/80 font-handwriting text-2xl text-[#FF91A4] font-bold">
              {gift.signature}
            </div>
          </div>

          {/* Send Hug Back Action */}
          <div className="glass-panel p-6 border border-white/90 shadow-md">
            {!hugSent ? (
              <div>
                <h4 className="font-heading font-bold text-[#5D4037] text-lg mb-1">
                  You've Reached the End! 💖
                </h4>
                <p className="text-xs text-[#5D4037]/70 mb-4">
                  Send a reciprocal digital hug back to {config.siblingName}!
                </p>
                <button
                  onClick={sendDigitalHug}
                  id="send-hug-back-button"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-heading font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{gift.hugButtonText}</span>
                </button>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50/90 border border-emerald-300 rounded-2xl text-emerald-950 animate-bounce">
                <span className="text-3xl mb-1 block">🤗❤️✨</span>
                <p className="text-sm font-bold">{gift.hugResponseText}</p>
              </div>
            )}
          </div>

          {/* Replay / Restart Journey */}
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={restartJourney}
              className="px-6 py-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-white/90 text-[#5D4037] text-xs font-bold hover:bg-white shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Sibling Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
