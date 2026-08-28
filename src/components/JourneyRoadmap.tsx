import React from 'react';
import { HelpCircle, Award, Image, Gift, Heart, Sparkles, ArrowRight, CheckCircle2, Play, Lock, Mail } from 'lucide-react';
import { useRakhi, JourneyStep } from '../context/RakhiContext';

interface Milestone {
  step: JourneyStep;
  number: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export const JourneyRoadmap: React.FC = () => {
  const { config, goToStep, isStepUnlocked, isStepCompleted, getNextActiveStep, completedSteps, getPrerequisiteName } = useRakhi();

  const milestones: Milestone[] = [
    {
      step: 'quiz',
      number: 1,
      title: 'Mini Quiz',
      subtitle: 'Sibling Trivia Test',
      icon: <HelpCircle className="w-5 h-5 text-[#FF91A4]" />,
    },
    {
      step: 'awards',
      number: 2,
      title: 'Sister Awards',
      subtitle: 'Official & Funny Honors',
      icon: <Award className="w-5 h-5 text-[#D4AF37]" />,
    },
    {
      step: 'memories',
      number: 3,
      title: 'Our Memories',
      subtitle: 'Childhood & Nostalgia',
      icon: <Image className="w-5 h-5 text-emerald-500" />,
    },
    {
      step: 'mystery',
      number: 4,
      title: 'Mystery Boxes',
      subtitle: '6 Surprise Pick-a-Box',
      icon: <Gift className="w-5 h-5 text-purple-500" />,
    },
    {
      step: 'things',
      number: 5,
      title: 'Things I Never Say',
      subtitle: 'Unspoken Heartfelt Truths',
      icon: <Heart className="w-5 h-5 text-pink-500" />,
    },
    {
      step: 'letter',
      number: 6,
      title: 'Handwritten Letter',
      subtitle: 'Parchment Letter & Wax Seal',
      icon: <Mail className="w-5 h-5 text-rose-500" />,
    },
    {
      step: 'gift',
      number: 7,
      title: 'Final Surprise',
      subtitle: 'Open Your Rakhi Gift!',
      icon: <Sparkles className="w-5 h-5 text-[#FFD700]" />,
    }
  ];

  const totalMilestones = milestones.length;
  const completedCount = milestones.filter(m => isStepCompleted(m.step)).length;
  const progressPercent = Math.round((completedCount / totalMilestones) * 100);
  const nextStep = getNextActiveStep();

  const getNextStepTitle = () => {
    const found = milestones.find(m => m.step === nextStep);
    return found ? `STEP ${found.number}: ${found.title.toUpperCase()}` : 'FINAL SURPRISE 🎁';
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start p-4 sm:p-6 max-w-2xl mx-auto">
      {/* Top Welcome / Unlocked Celebratory Banner with Frosted Glass */}
      <div className="w-full glass-panel p-6 sm:p-8 shadow-[0_15px_40px_rgba(255,182,193,0.22)] text-center mb-8 relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl animate-bounce">🎉</span>
          <h2 className="font-serif-display text-2xl sm:text-3xl text-[#5D4037] font-bold">
            {config.unlockSuccess.title}
          </h2>
          <span className="text-2xl animate-bounce">✨</span>
        </div>

        <p className="text-[#5D4037]/80 text-xs sm:text-sm font-sans-body max-w-md mx-auto mb-5 leading-relaxed">
          {config.unlockSuccess.subtitle}
        </p>

        {/* Dynamic Start / Continue Button */}
        <button
          onClick={() => goToStep(nextStep)}
          id="start-journey-button"
          className="px-8 py-3.5 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-heading font-bold text-sm shadow-[0_10px_25px_rgba(255,145,164,0.35)] hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>
            {completedCount === 0
              ? 'START SIBLING JOURNEY →'
              : completedCount === totalMilestones
              ? 'REPLAY FINAL SURPRISE 🎁'
              : `CONTINUE TO ${getNextStepTitle()} →`}
          </span>
        </button>

        {/* Step by step Progress Bar */}
        <div className="mt-6 pt-5 border-t border-white/60 max-w-md mx-auto">
          <div className="flex items-center justify-between text-xs font-semibold text-[#5D4037]/80 mb-2">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FF91A4]" /> SIBLING JOURNEY PROGRESS
            </span>
            <span className="text-[#FF91A4] font-bold">
              {completedCount}/{totalMilestones} Steps ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-3 bg-white/60 rounded-full overflow-hidden p-0.5 border border-white/80">
            <div
              className="h-full bg-gradient-to-r from-[#FFDAB9] via-[#FF91A4] to-[#FFD700] rounded-full transition-all duration-500"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-[#5D4037]/60 mt-2 italic">
            Complete each step in order to unlock the next milestone! 🔒 ➡️ 🔓
          </p>
        </div>
      </div>

      {/* Sibling Roadmap Header */}
      <div className="text-center mb-6">
        <h3 className="font-serif-display text-2xl font-bold text-[#5D4037] flex items-center justify-center gap-2">
          Step-by-Step Roadmap <Heart className="w-5 h-5 text-[#FF91A4] fill-[#FF91A4] inline" />
        </h3>
        <p className="text-xs text-[#5D4037]/70 mt-1">
          Each chapter must be unlocked sequentially. No jumping ahead! 😉
        </p>
      </div>

      {/* Milestones Grid / Trail with Frosted Glass Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-8">
        {milestones.map((m) => {
          const isDone = isStepCompleted(m.step);
          const isUnlocked = isStepUnlocked(m.step);
          const isCurrentActive = isUnlocked && !isDone;
          const prereq = getPrerequisiteName(m.step);

          let badgeContent: React.ReactNode = `Step ${m.number}`;
          let badgeClass = 'bg-white/70 text-[#5D4037] border-white/80';
          let cardBorder = 'border-white/80';

          if (isDone) {
            badgeContent = (
              <span className="flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Done
              </span>
            );
            badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
          } else if (isCurrentActive) {
            badgeContent = 'Current ✨';
            badgeClass = 'bg-[#FF91A4] text-white border-white animate-pulse';
            cardBorder = 'border-[#FF91A4]/80 ring-2 ring-[#FF91A4]/30';
          } else {
            badgeContent = (
              <span className="flex items-center gap-1 text-gray-500">
                <Lock className="w-2.5 h-2.5" /> Locked
              </span>
            );
            badgeClass = 'bg-gray-100/80 text-gray-500 border-gray-200';
          }

          return (
            <div
              key={m.step}
              onClick={() => goToStep(m.step)}
              className={`p-4 transition-all duration-200 flex items-center justify-between group relative overflow-hidden rounded-3xl ${
                isUnlocked
                  ? 'glass-panel-card cursor-pointer hover:shadow-[0_12px_30px_rgba(255,182,193,0.3)] hover:-translate-y-1'
                  : 'bg-white/40 border border-white/60 opacity-65 cursor-not-allowed'
              } ${cardBorder}`}
              title={isUnlocked ? `Open ${m.title}` : `Locked: Complete ${prereq} first`}
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-xs transition-transform ${
                  isUnlocked
                    ? 'bg-white/80 border-white group-hover:scale-110'
                    : 'bg-gray-100 border-gray-200 opacity-60'
                }`}>
                  {isUnlocked ? m.icon : <Lock className="w-4 h-4 text-gray-400" />}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#5D4037]/50 font-mono">
                      #{m.number}
                    </span>
                    <h4 className={`font-heading font-bold text-sm transition-colors ${
                      isUnlocked
                        ? 'text-[#5D4037] group-hover:text-[#FF91A4]'
                        : 'text-gray-500'
                    }`}>
                      {m.title}
                    </h4>
                  </div>
                  <p className={`text-xs font-sans-body ${
                    isUnlocked ? 'text-[#5D4037]/70' : 'text-gray-400'
                  }`}>
                    {isUnlocked ? m.subtitle : `Finish ${prereq} first`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full border shadow-2xs font-semibold ${badgeClass}`}>
                  {badgeContent}
                </span>
                {isUnlocked ? (
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF91A4] group-hover:translate-x-1 transition-transform" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-gray-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

