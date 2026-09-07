import React, { useState, useEffect } from 'react';
import { SlideItem } from '../../types';
import { Check, HelpCircle, Sparkles, Volume2, RotateCcw, Eye, CheckCircle2, XCircle } from 'lucide-react';

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
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Reset answer states when slide transitions
  useEffect(() => {
    setSelectedQuizOption(null);
    setShowExplanation(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [slide.id]);

  const handleSpeakQuestion = () => {
    if (!('speechSynthesis' in window) || !slide.quizQuestion) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = `${slide.title}. Question: ${slide.quizQuestion.question}. Options: ${slide.quizQuestion.options.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const resetQuestionState = () => {
    setSelectedQuizOption(null);
    setShowExplanation(false);
  };

  // Dedicated Full-Screen Question Slide layout
  if (slide.type === 'quiz' && slide.quizQuestion) {
    const q = slide.quizQuestion;
    const isAssertion =
      q.questionType === 'Assertion-Reason' ||
      (q.question.includes('Assertion (A)') && q.question.includes('Reason (R)'));

    // Parse Assertion & Reason if present
    let assertionPart = '';
    let reasonPart = '';
    let mainQuestionText = q.question;

    if (isAssertion) {
      const matchA = q.question.match(/Assertion\s*\(A\)\s*:\s*([^\n\r]+)/i);
      const matchR = q.question.match(/Reason\s*\(R\)\s*:\s*([^\n\r]+)/i);
      if (matchA && matchR) {
        assertionPart = matchA[1].trim();
        reasonPart = matchR[1].trim();
        mainQuestionText = 'Read Assertion (A) and Reason (R) carefully, then select the correct option on the panel:';
      }
    }

    return (
      <div
        className={`w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto select-none ${
          isOverlay ? 'bg-[#0b1120] text-white' : 'bg-[#0b1120] text-white rounded-2xl'
        }`}
      >
        {/* Header Ribbon */}
        <div className="pb-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{q.questionType || 'Curriculum Checkpoint'}</span>
            </span>
            {q.marks && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                {q.marks} Mark{q.marks > 1 ? 's' : ''}
              </span>
            )}
            <h2 className="text-xl md:text-2xl font-black text-white truncate max-w-lg">
              {slide.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeakQuestion}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                isSpeaking
                  ? 'bg-blue-600 border-blue-400 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
              }`}
              title="Read Question Aloud"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isSpeaking ? 'Reading...' : 'Read Aloud'}</span>
            </button>
            <button
              onClick={resetQuestionState}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              title="Reset for Next Student"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <span className="text-xs font-mono text-slate-400 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg">
              Slide {slideNumber} of {totalSlides}
            </span>
          </div>
        </div>

        {/* Question Body */}
        <div className="flex-1 py-4 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md">
            <p className="text-base md:text-lg font-bold text-slate-100 leading-snug">
              {mainQuestionText}
            </p>

            {/* Special Assertion & Reason Split Cards */}
            {isAssertion && assertionPart && reasonPart && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-700/50">
                  <span className="text-xs font-black uppercase tracking-wider text-blue-400 block mb-1">
                    Assertion (A):
                  </span>
                  <p className="text-sm font-medium text-blue-100 leading-relaxed">
                    {assertionPart}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-700/50">
                  <span className="text-xs font-black uppercase tracking-wider text-purple-400 block mb-1">
                    Reason (R):
                  </span>
                  <p className="text-sm font-medium text-purple-100 leading-relaxed">
                    {reasonPart}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Option Cards (Touchscreen Friendly) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((option, optIdx) => {
              const isSelected = selectedQuizOption === optIdx;
              const isCorrect = optIdx === q.answerIndex;
              const letter = String.fromCharCode(65 + optIdx);

              let cardStyle = 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-200';
              if (showExplanation) {
                if (isCorrect) {
                  cardStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-950/40';
                } else if (isSelected) {
                  cardStyle = 'bg-red-950/80 border-red-500 text-red-100 ring-2 ring-red-500/50';
                } else {
                  cardStyle = 'bg-slate-900/50 border-slate-800/80 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                cardStyle = 'bg-blue-600 border-blue-400 text-white ring-2 ring-blue-400/50';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => {
                    setSelectedQuizOption(optIdx);
                    setShowExplanation(true);
                  }}
                  className={`p-4 rounded-2xl border text-left text-sm md:text-[15px] font-medium transition cursor-pointer flex items-start justify-between gap-3 active:scale-99 ${cardStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                        showExplanation && isCorrect
                          ? 'bg-emerald-500 text-slate-950'
                          : showExplanation && isSelected
                          ? 'bg-red-500 text-white'
                          : isSelected
                          ? 'bg-white text-blue-900'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="leading-relaxed pt-0.5">{option}</span>
                  </div>

                  {showExplanation && (
                    <div className="shrink-0 mt-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-red-400" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Working Notes Card */}
          {showExplanation && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs md:text-sm text-slate-200 leading-relaxed space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                  <Check className="w-4 h-4" />
                  <span>CBSE Statutory Marking Rationale & Answer Key</span>
                </span>
                <span className="text-xs text-slate-400">
                  Correct Answer: <strong className="text-emerald-300">Option {String.fromCharCode(65 + q.answerIndex)}</strong>
                </span>
              </div>
              <p className="text-slate-300 font-medium">{q.explanation}</p>

              {q.workingNotes && (
                <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-blue-300">
                  <span className="font-bold text-slate-400 block mb-1 font-sans">
                    Teacher Working Notes:
                  </span>
                  {q.workingNotes}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Teaching Prompt */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>
              ✏️ <strong>Stylus Enabled:</strong> Touch panel ready for students to tap answers or teachers to annotate working notes directly on the board.
            </span>
          </div>
          <button
            onClick={() => setShowExplanation((prev) => !prev)}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold transition flex items-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showExplanation ? 'Hide Marking Rubric' : 'Reveal Solution Key'}</span>
          </button>
        </div>
      </div>
    );
  }

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

  // Non-cover standard slides (roadmap, concept, table, summary)
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

        {/* Embedded Checkpoint Quiz on regular slide if present */}
        {slide.quizQuestion && slide.type !== 'quiz' && (
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
