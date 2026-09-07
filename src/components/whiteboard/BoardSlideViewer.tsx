import React, { useState } from 'react';
import { SlideItem } from '../../types';
import { Check, HelpCircle, Sparkles } from 'lucide-react';

interface Props {
  slide: SlideItem;
  slideNumber: number;
  totalSlides: number;
  isOverlay?: boolean;
}

export const BoardSlideViewer: React.FC<Props> = ({
  slide,
  slideNumber,
  totalSlides,
  isOverlay = false,
}) => {
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  if (slide.type === 'cover') {
    return (
      <div
        className={`w-full h-full p-8 md:p-12 flex flex-col justify-between select-none ${
          isOverlay ? 'bg-[#0f172a] text-white' : 'bg-[#0f172a] text-white rounded-2xl'
        }`}
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
            <span>📊</span>
            <span>Interactive Panel Presentation Deck</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl">
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="text-slate-300 text-lg md:text-xl font-medium max-w-3xl">
              {slide.subtitle}
            </p>
          )}
        </div>

        <div className="pt-8 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{slide.footer || 'Smart Teaching Studio • Interactive Whiteboard'}</span>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Slide {slideNumber} of {totalSlides}
          </div>
        </div>
      </div>
    );
  }

  // Non-cover slides (roadmap, concept, table, quiz, summary)
  return (
    <div
      className={`w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto select-none ${
        isOverlay ? 'bg-slate-50 text-slate-900' : 'bg-slate-50 text-slate-900 rounded-2xl'
      }`}
    >
      {/* Slide Header */}
      <div className="mb-4 pb-3 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <span className="w-2 h-7 bg-blue-600 rounded-full inline-block" />
            <span>{slide.title}</span>
          </h2>
          <span className="text-xs font-bold text-slate-500 px-3 py-1 bg-white border border-slate-200 rounded-lg">
            Slide {slideNumber} / {totalSlides}
          </span>
        </div>
        {slide.subtitle && (
          <p className="text-slate-600 text-sm md:text-base font-medium mt-1">
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 space-y-4">
        {/* Bullet Points */}
        {slide.bulletPoints && slide.bulletPoints.length > 0 && (
          <div className="grid grid-cols-1 gap-2.5">
            {slide.bulletPoints.map((pt, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs text-slate-800 text-sm md:text-[15px] font-medium leading-relaxed flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        )}

        {/* Structured Table */}
        {slide.tableHeaders && slide.tableRows && (
          <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  {slide.tableHeaders.map((header, hIdx) => (
                    <th key={hIdx} className="p-3 border-b border-slate-800">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.tableRows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`border-b border-slate-200 ${
                      rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`p-3 text-slate-800 font-medium ${
                          cIdx === row.length - 1 && cell.includes('₹')
                            ? 'font-bold text-blue-700'
                            : ''
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Interactive Checkpoint Quiz */}
        {slide.quizQuestion && (
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Sparkles className="w-4 h-4" />
              <span>Classroom Checkpoint • Student Dilemma</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">
              {slide.quizQuestion.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {slide.quizQuestion.options.map((option, optIdx) => {
                const isSelected = selectedQuizOption === optIdx;
                const isCorrect = optIdx === slide.quizQuestion?.answerIndex;
                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      setSelectedQuizOption(optIdx);
                      setShowExplanation(true);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs md:text-sm font-medium transition cursor-pointer flex items-center justify-between gap-2 ${
                      showExplanation
                        ? isCorrect
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30'
                          : isSelected
                          ? 'bg-red-900/60 border-red-500 text-red-100'
                          : 'bg-slate-800/80 border-slate-700 text-slate-400'
                        : isSelected
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{option}</span>
                    {showExplanation && isCorrect && (
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="mt-3 p-3.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300 leading-relaxed animate-in fade-in duration-150">
                <span className="font-bold text-emerald-400 block mb-1">
                  Explanation & Syllabus Context:
                </span>
                {slide.quizQuestion.explanation}
              </div>
            )}
          </div>
        )}

        {/* Highlight Callout Box */}
        {slide.calloutBox && (
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              slide.calloutBox.tone === 'red'
                ? 'bg-red-50 border-red-200 text-red-950'
                : slide.calloutBox.tone === 'amber'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : slide.calloutBox.tone === 'emerald'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-blue-50 border-blue-200 text-blue-950'
            }`}
          >
            <HelpCircle
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                slide.calloutBox.tone === 'red'
                  ? 'text-red-600'
                  : slide.calloutBox.tone === 'amber'
                  ? 'text-amber-600'
                  : slide.calloutBox.tone === 'emerald'
                  ? 'text-emerald-600'
                  : 'text-blue-600'
              }`}
            />
            <div>
              <strong className="block text-sm font-bold mb-0.5">
                {slide.calloutBox.title}
              </strong>
              <p className="text-xs md:text-sm font-medium leading-relaxed opacity-90">
                {slide.calloutBox.text}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Slide Footer */}
      <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Smart Teaching Studio • Classroom Slide Presentation</span>
        <span>Use touch pen to circle key terms and write working notes</span>
      </div>
    </div>
  );
};
