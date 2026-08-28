import React, { useState } from 'react';
import { ArrowLeft, Save, RotateCcw, Copy, Check, Sliders, Eye, Sparkles, Plus, Trash2, Download } from 'lucide-react';
import { useRakhi } from '../context/RakhiContext';
import { RakhiConfig } from '../types/rakhi';
import { soundManager } from '../utils/sound';

export const CustomizePage: React.FC = () => {
  const { config, updateConfig, resetToDefaultConfig, setTab, goToStep } = useRakhi();
  const [formData, setFormData] = useState<RakhiConfig>(config);
  const [activeTab, setActiveTab] = useState<'info' | 'letter' | 'gift' | 'quiz' | 'memories' | 'export'>('info');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleSave = () => {
    updateConfig(formData);
    soundManager.playCorrectSound();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all changes back to the default Rakhi template?')) {
      resetToDefaultConfig();
      soundManager.playFanfare();
      window.location.reload();
    }
  };

  const exportCode = `import { RakhiConfig } from '../types/rakhi';

export const defaultRakhiConfig: RakhiConfig = ${JSON.stringify(formData, null, 2)};
`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(exportCode);
    setIsCopied(true);
    soundManager.playCorrectSound();
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-start p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-6">
        <button
          onClick={() => setTab('home')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#5D4037] hover:text-[#FF91A4] bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Website
        </button>
        <span className="text-xs font-bold text-[#5D4037] bg-white/70 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/80 flex items-center gap-1 shadow-2xs">
          <Sliders className="w-3 h-3 text-[#FF91A4]" /> Visual Customizer (No Coding)
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="font-serif-display text-3xl sm:text-4xl text-[#5D4037] font-bold">
          Personalize Your Rakhi Surprise 🌸
        </h2>
        <p className="text-[#5D4037]/75 text-xs sm:text-sm font-sans-body max-w-lg mx-auto mt-2">
          Change names, memories, secret password, and messages. You can preview changes live or copy the config file directly!
        </p>
      </div>

      {/* Editor Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 w-full">
        {[
          { id: 'info', label: '1. Names & Code' },
          { id: 'letter', label: '2. Letter & Intro' },
          { id: 'gift', label: '3. Final Gift' },
          { id: 'quiz', label: '4. Mini Quiz' },
          { id: 'memories', label: '5. Memories' },
          { id: 'export', label: '6. Export Code 📋' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#FF91A4] text-white shadow-md shadow-[#FF91A4]/30 scale-105'
                : 'bg-white/60 text-[#5D4037] border border-white/80 hover:bg-white/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editor Body with Frosted Glass */}
      <div className="w-full glass-panel p-6 sm:p-8 shadow-lg mb-6 bg-white/90">
        {/* Tab 1: Names & Secret Code */}
        {activeTab === 'info' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-heading font-bold text-[#5D4037] text-lg mb-2">
              Sibling Names & Secret Passcode
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5D4037] mb-1">
                  Sister's Name
                </label>
                <input
                  type="text"
                  value={formData.sisterName}
                  onChange={(e) => setFormData({ ...formData, sisterName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm focus:border-[#FF91A4] focus:ring-2 focus:ring-[#FF91A4]/20 outline-none text-[#5D4037]"
                  placeholder="e.g. Priya"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5D4037] mb-1">
                  Sister's Cute Nickname
                </label>
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm focus:border-[#FF91A4] focus:ring-2 focus:ring-[#FF91A4]/20 outline-none text-[#5D4037]"
                  placeholder="e.g. Piku"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5D4037] mb-1">
                  Your Name (Brother / Sibling)
                </label>
                <input
                  type="text"
                  value={formData.siblingName}
                  onChange={(e) => setFormData({ ...formData, siblingName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm focus:border-[#FF91A4] focus:ring-2 focus:ring-[#FF91A4]/20 outline-none text-[#5D4037]"
                  placeholder="e.g. Rahul"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5D4037] mb-1">
                  Secret Unlock Code
                </label>
                <input
                  type="text"
                  value={formData.secretCode}
                  onChange={(e) => setFormData({ ...formData, secretCode: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm font-mono font-bold focus:border-[#FF91A4] focus:ring-2 focus:ring-[#FF91A4]/20 outline-none text-[#5D4037]"
                  placeholder="e.g. 2007"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5D4037] mb-1">
                Secret Password Clue / Hint
              </label>
              <input
                type="text"
                value={formData.secretHint}
                onChange={(e) => setFormData({ ...formData, secretHint: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm focus:border-[#FF91A4] focus:ring-2 focus:ring-[#FF91A4]/20 outline-none text-[#5D4037]"
                placeholder="e.g. The year of our legendary Maggie heist 👀🍜"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Letter & Intro */}
        {activeTab === 'letter' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-heading font-bold text-[#5D4037] text-lg mb-2">
              Intro Message & Handwritten Sibling Letter
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#5D4037] mb-1">
                Landing Page Subtitle
              </label>
              <input
                type="text"
                value={formData.intro.subtitle}
                onChange={(e) => setFormData({
                  ...formData,
                  intro: { ...formData.intro, subtitle: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm text-[#5D4037]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5D4037] mb-1">
                Letter Salutation
              </label>
              <input
                type="text"
                value={formData.letter.salutation}
                onChange={(e) => setFormData({
                  ...formData,
                  letter: { ...formData.letter, salutation: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm text-[#5D4037]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5D4037] mb-1">
                Letter Paragraphs (one per line)
              </label>
              <textarea
                rows={5}
                value={formData.letter.paragraphs.join('\n\n')}
                onChange={(e) => setFormData({
                  ...formData,
                  letter: { ...formData.letter, paragraphs: e.target.value.split('\n\n').filter(Boolean) }
                })}
                className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm leading-relaxed text-[#5D4037]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5D4037] mb-1">
                P.S. (Postscript) Joke Note
              </label>
              <input
                type="text"
                value={formData.letter.postscript || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  letter: { ...formData.letter, postscript: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm text-[#5D4037]"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Final Gift */}
        {activeTab === 'gift' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-heading font-bold text-[#5D4037] text-lg mb-2">
              Final Surprise Gift & Voucher
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#5D4037] mb-1">
                Gift Title
              </label>
              <input
                type="text"
                value={formData.finalGift.giftTitle}
                onChange={(e) => setFormData({
                  ...formData,
                  finalGift: { ...formData.finalGift, giftTitle: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm text-[#5D4037]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5D4037] mb-1">
                Gift Message & Promise
              </label>
              <textarea
                rows={3}
                value={formData.finalGift.giftMessage}
                onChange={(e) => setFormData({
                  ...formData,
                  finalGift: { ...formData.finalGift, giftMessage: e.target.value }
                })}
                className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm text-[#5D4037]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#5D4037] mb-1">
                  Custom Voucher Code
                </label>
                <input
                  type="text"
                  value={formData.finalGift.voucherCode || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    finalGift: { ...formData.finalGift, voucherCode: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm font-mono text-[#5D4037]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5D4037] mb-1">
                  Gift Claim Note
                </label>
                <input
                  type="text"
                  value={formData.finalGift.giftNote || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    finalGift: { ...formData.finalGift, giftNote: e.target.value }
                  })}
                  className="w-full p-2.5 rounded-xl border border-white/90 bg-white/80 text-sm text-[#5D4037]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Mini Quiz */}
        {activeTab === 'quiz' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-heading font-bold text-[#5D4037] text-lg mb-2">
              Trivia Questions ({formData.quiz.length})
            </h3>

            {formData.quiz.map((q, qIdx) => (
              <div key={q.id} className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FF91A4]">Question #{qIdx + 1}</span>
                  <span className="text-[10px] text-[#5D4037]/60">Correct: Option {q.correctAnswer + 1}</span>
                </div>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => {
                    const newQuiz = [...formData.quiz];
                    newQuiz[qIdx].question = e.target.value;
                    setFormData({ ...formData, quiz: newQuiz });
                  }}
                  className="w-full p-2 rounded-xl bg-white border border-white/90 text-xs font-semibold text-[#5D4037]"
                />
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Memories */}
        {activeTab === 'memories' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-heading font-bold text-[#5D4037] text-lg mb-2">
              Memories Timeline ({formData.memories.length})
            </h3>

            {formData.memories.map((m, mIdx) => (
              <div key={m.id} className="p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FF91A4]">Year: {m.year}</span>
                  <input
                    type="text"
                    value={m.year}
                    onChange={(e) => {
                      const newMem = [...formData.memories];
                      newMem[mIdx].year = e.target.value;
                      setFormData({ ...formData, memories: newMem });
                    }}
                    className="w-20 p-1 text-xs rounded border border-white/90 bg-white font-mono text-[#5D4037]"
                  />
                </div>
                <input
                  type="text"
                  value={m.title}
                  onChange={(e) => {
                    const newMem = [...formData.memories];
                    newMem[mIdx].title = e.target.value;
                    setFormData({ ...formData, memories: newMem });
                  }}
                  className="w-full p-2 rounded-xl bg-white border border-white/90 text-xs font-semibold text-[#5D4037]"
                  placeholder="Memory Title"
                />
                <textarea
                  rows={2}
                  value={m.description}
                  onChange={(e) => {
                    const newMem = [...formData.memories];
                    newMem[mIdx].description = e.target.value;
                    setFormData({ ...formData, memories: newMem });
                  }}
                  className="w-full p-2 rounded-xl bg-white border border-white/90 text-xs text-[#5D4037]"
                  placeholder="Memory Description"
                />
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Export Code */}
        {activeTab === 'export' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="font-heading font-bold text-[#5D4037] text-lg mb-1">
              Generated Configuration File Code
            </h3>
            <p className="text-xs text-[#5D4037]/75">
              You can copy this code and paste it into <code className="text-[#FF91A4] font-mono bg-white/80 px-1 py-0.5 rounded border border-white">src/config/rakhiConfig.ts</code> so your changes stay permanent in GitHub!
            </p>

            <pre className="p-4 bg-[#2C1810] text-[#FFDAB9] rounded-2xl text-xs font-mono max-h-72 overflow-y-auto leading-relaxed border border-white/20">
              {exportCode}
            </pre>

            <button
              onClick={handleCopyCode}
              className="px-6 py-2.5 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Code Snippet
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Save & Reset Actions Bar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={handleReset}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/90 bg-white/60 text-[#5D4037] text-xs font-bold hover:bg-white/90 flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset to Template Default
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setTab('home')}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/90 bg-white/70 text-[#5D4037] text-xs font-bold hover:bg-white flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5 text-[#FF91A4]" /> Live Preview
          </button>

          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#FF91A4] hover:bg-[#ff7b92] text-white text-xs font-heading font-extrabold shadow-[0_10px_25px_rgba(255,145,164,0.35)] flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? 'SAVED TO BROWSER ✓' : 'SAVE CHANGES'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
