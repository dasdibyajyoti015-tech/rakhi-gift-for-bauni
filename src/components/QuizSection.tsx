import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { soundManager } from '../utils/sound';

export const QuizSection: React.FC = () => {
  const { config, answerQuizQuestion, quizAnswers, quizScore, quizCompleted, resetQuiz, goToStep, completeStep } = useRakhi();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmittedAnswer, setHasSubmittedAnswer] = useState<boolean>(false);

  const questions = config.quiz;
  const currentQ = questions[currentIndex];
  const total = questions.length;
  const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleSelectOption = (idx: number) => {
    if (hasSubmittedAnswer) return;
    setSelectedOption(idx);
    setHasSubmittedAnswer(true);
    answerQuizQuestion(currentQ.id, idx);

    if (idx === currentQ.correctAnswer) {
      soundManager.playCorrectSound();
    } else {
      soundManager.playWrongSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setHasSubmittedAnswer(false);
      soundManager.playChime();
    }
  };

  const handleRestart = () => {
    resetQuiz();
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasSubmittedAnswer(false);
    soundManager.playChime();
  };

  // Find matching score tier
  const resultTier = config.quizResults.find(
    (tier) => quizScore >= tier.minScore && quizScore <= tier.maxScore
  ) || config.quizResults[0];

  const isCurrentFinished = hasSubmittedAnswer && currentIndex === total - 1;

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start p-4 sm:p-6 max-w-xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={() => goToStep('roadmap')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5D4037] hover:text-[#FF91A4] bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Roadmap
        </button>
        <span className="text-xs font-bold text-[#FF91A4] bg-white/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/80 shadow-2xs">
          🎮 Sibling Trivia
        </span>
      </div>

      {/* Quiz Card with Frosted Glass */}
      {!quizCompleted && currentQ ? (
        <div className="w-full glass-panel p-6 sm:p-8 shadow-[0_15px_40px_rgba(255,182,193,0.22)] relative overflow-hidden transition-all">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-bold text-[#5D4037]/70 mb-3">
            <span>Question {currentIndex + 1} of {total}</span>
            <span className="text-[#FF91A4]">{Math.round(((currentIndex + 1) / total) * 100)}%</span>
          </div>
          <div className="w-full h-2.5 bg-white/60 rounded-full overflow-hidden p-0.5 border border-white/80 mb-6">
            <div
              className="h-full bg-gradient-to-r from-[#FFDAB9] via-[#FF91A4] to-[#FFD700] rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            ></div>
          </div>

          {/* Question Text */}
          <h3 className="font-serif-display text-xl sm:text-2xl text-[#5D4037] font-bold mb-6 text-center leading-snug">
            {currentQ.question}
          </h3>

          {/* Options List */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = currentQ.correctAnswer === idx;

              let optionStyle = 'bg-white/70 backdrop-blur-sm border-white/80 text-[#5D4037] hover:border-[#FF91A4] hover:bg-white/90';

              if (hasSubmittedAnswer) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-50/90 border-emerald-400 text-emerald-950 font-semibold shadow-sm ring-1 ring-emerald-400';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-50/80 border-rose-400 text-rose-950 line-through opacity-80';
                } else {
                  optionStyle = 'bg-white/30 border-white/40 text-gray-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasSubmittedAnswer}
                  className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-sans-body transition-all duration-200 flex items-center justify-between group ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                      hasSubmittedAnswer && isCorrect
                        ? 'bg-emerald-500 text-white'
                        : hasSubmittedAnswer && isSelected && !isCorrect
                        ? 'bg-rose-500 text-white'
                        : 'bg-[#FFDAB9]/60 text-[#5D4037] group-hover:bg-[#FFB6C1]/50'
                    }`}>
                      {optionLetters[idx]}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasSubmittedAnswer && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 animate-bounce" />
                  )}
                  {hasSubmittedAnswer && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {hasSubmittedAnswer && (
            <div className="mb-6 p-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/90 text-xs sm:text-sm text-[#5D4037] animate-fade-in shadow-2xs">
              <p className="font-bold text-[#FF91A4] mb-1 flex items-center gap-1.5">
                {selectedOption === currentQ.correctAnswer ? (
                  <>🎉 {currentQ.reactionCorrect || "Correct! You know me well!"}</>
                ) : (
                  <>😂 {currentQ.reactionWrong || "Oops! Nice try though!"}</>
                )}
              </p>
              {currentQ.explanation && (
                <p className="text-[#5D4037]/80 text-xs">{currentQ.explanation}</p>
              )}
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex justify-end">
            {currentIndex < total - 1 ? (
              <button
                onClick={handleNext}
                disabled={!hasSubmittedAnswer}
                className={`px-8 py-3.5 rounded-full font-heading font-bold text-sm flex items-center gap-2 transition-all shadow-md ${
                  hasSubmittedAnswer
                    ? 'bg-[#FF91A4] hover:bg-[#ff7b92] text-white hover:scale-105 active:scale-95 shadow-[0_10px_25px_rgba(255,145,164,0.35)]'
                    : 'bg-gray-200/70 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span>NEXT QUESTION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : isCurrentFinished ? (
              <button
                onClick={() => {
                  completeStep('quiz');
                  goToStep('awards');
                }}
                className="px-8 py-3.5 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-heading font-bold text-sm shadow-[0_10px_25px_rgba(255,145,164,0.35)] hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>VIEW SCORE & AWARDS 🏆</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        /* Quiz Complete Results Card */
        <div className="w-full glass-panel p-6 sm:p-10 shadow-[0_20px_50px_rgba(255,182,193,0.25)] text-center relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#FFD700] to-[#FF91A4] mx-auto flex items-center justify-center text-4xl shadow-lg mb-4 text-white">
            {resultTier.emoji || '🏆'}
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-[#FF91A4] bg-white/80 px-3.5 py-1 rounded-full border border-white">
            {resultTier.badge}
          </span>

          <h3 className="font-serif-display text-2xl sm:text-3xl text-[#5D4037] font-bold mt-3 mb-1">
            {resultTier.title}
          </h3>

          <div className="text-3xl font-heading font-extrabold text-[#FF91A4] my-3">
            You scored {quizScore} / {total} ❤️
          </div>

          <p className="text-[#5D4037]/80 text-sm sm:text-base font-sans-body max-w-md mx-auto mb-8 leading-relaxed">
            {resultTier.message}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/80 bg-white/60 text-[#5D4037] text-xs font-bold hover:bg-white/80 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Retake Quiz
            </button>

            <button
              onClick={() => {
                completeStep('quiz');
                goToStep('awards');
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white font-heading font-bold text-sm shadow-[0_10px_25px_rgba(255,145,164,0.35)] hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>PROCEED TO SISTER AWARDS 🏆</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
