import React, { useState } from 'react';
import { Volume2, VolumeX, Mic, Play, Square, Sparkles } from 'lucide-react';

interface Props {
  onToast?: (msg: string) => void;
}

const PRESET_ANNOUNCEMENTS = [
  'Attention class: Please open your registers to Chapter 3. We are beginning the Goodwill Valuation by Super Profit method on the whiteboard.',
  'Two-minute checkpoint challenge: Calculate the interest on capital at 6% per annum for partner A and write your answer on the board.',
  'Silence please. Remember the golden rule for shares forfeiture: Never reverse Securities Premium if it has already been received prior to cancellation.',
  'Time is up for this working period. Exchange registers with your bench partner for peer verification of working notes.',
  'Homework announcement: Complete Question numbers 12, 14, and 17 from Chapter 5. Due at the start of tomorrow’s first period.',
];

export const VoiceTeacherScreen: React.FC<Props> = ({ onToast = (_msg: string) => {} }) => {
  const [text, setText] = useState<string>(
    'Welcome to Class 12 Commerce. Today we will cover Company Accounts: Forfeiture and Reissue of Shares. Ensure you draw the standard Journal format with Date, Particulars, Ledger Folio, Debit, and Credit columns before we begin the first problem.'
  );
  const [rate, setRate] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const speak = (contentToSpeak?: string) => {
    const speechText = contentToSpeak || text;
    if (!speechText.trim()) {
      onToast('Please enter or select text to speak aloud.');
      return;
    }

    if (!('speechSynthesis' in window)) {
      onToast('Speech synthesis is not supported on this browser/panel.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText.slice(0, 8000));
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    onToast('Reading aloud through panel speakers...');
  };

  const stop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    onToast('Speech stopped.');
  };

  return (
    <div id="screen-voice" className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-2 tracking-tight flex items-center gap-2">
          <span>🔊</span>
          <span>Voice Teacher (Panel Audio)</span>
        </h2>
        <p className="text-[#64748b] text-[15px] mb-5">
          Broadcast teaching explanations, problem instructions, or class management announcements over the interactive panel speakers.
        </p>

        {/* Text Input Area */}
        <div>
          <label className="block text-[14px] font-bold text-[#475569] mb-2">Teaching Text or Instruction</label>
          <textarea
            id="voiceText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Paste or type teaching text here..."
            className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl p-4 text-[15px] bg-white focus:outline-blue-600 resize-y"
          />
        </div>

        {/* Audio Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Speaking Rate: <span className="text-blue-600">{rate}x</span>
            </label>
            <input
              type="range"
              min={0.7}
              max={1.4}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full cursor-pointer accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Voice Pitch: <span className="text-blue-600">{pitch}x</span>
            </label>
            <input
              type="range"
              min={0.8}
              max={1.3}
              step={0.1}
              value={pitch}
              onChange={(e) => setPitch(parseFloat(e.target.value))}
              className="w-full cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={() => speak()}
            className="px-6 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[15px] font-bold shadow-md shadow-[#2563eb]/20 transition cursor-pointer flex items-center gap-2"
          >
            <Volume2 className="w-5 h-5" />
            <span>{isSpeaking ? 'Restart Speech' : 'Speak Now'}</span>
          </button>

          <button
            onClick={stop}
            className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-[15px] font-bold transition cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <Square className="w-4 h-4 text-red-600" />
            Stop
          </button>

          <button
            onClick={() => setText('')}
            className="px-4 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-600 text-[15px] font-bold transition cursor-pointer"
          >
            Clear Text
          </button>
        </div>

        {/* Preset Announcements */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Quick Classroom Announcements (One-Tap Broadcast)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PRESET_ANNOUNCEMENTS.map((ann, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setText(ann);
                  speak(ann);
                }}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-blue-50/60 hover:border-blue-300 cursor-pointer transition text-xs text-slate-700 flex items-start gap-2.5"
              >
                <Play className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{ann}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
