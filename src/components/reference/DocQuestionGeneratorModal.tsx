import React, { useState } from 'react';
import { ReferenceDoc } from '../../types';
import { generateQuestionsFromDoc, GeneratedQuestion } from '../../data/referenceDecks';
import confetti from 'canvas-confetti';
import {
  X,
  Sparkles,
  CheckCircle2,
  Copy,
  Download,
  Share2,
  HelpCircle,
  Award,
  ArrowRight,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  doc: ReferenceDoc | null;
  onClose: () => void;
  onLaunchIntoQuizMaker: (questions: GeneratedQuestion[], docName: string) => void;
  onToast?: (msg: string) => void;
}

export const DocQuestionGeneratorModal: React.FC<Props> = ({
  isOpen,
  doc,
  onClose,
  onLaunchIntoQuizMaker,
  onToast = (_msg: string) => {},
}) => {
  const [selectedCount, setSelectedCount] = useState<number>(5);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const [activeTab, setActiveTab] = useState<'interactive' | 'paper'>('interactive');

  if (!isOpen || !doc) return null;

  const questions = generateQuestionsFromDoc(doc, selectedCount);

  const handleSelectOption = (qId: number, optIdx: number, correctIdx: number) => {
    if (userAnswers[qId] !== undefined) return;

    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    setShowExplanations((prev) => ({ ...prev, [qId]: true }));

    if (optIdx === correctIdx) {
      confetti({
        particleCount: 60,
        spread: 55,
        origin: { y: 0.7 },
      });
      onToast('Correct answer! 🎉');
    } else {
      onToast('Incorrect. Review syllabus explanation.');
    }
  };

  const copyQuestionsToClipboard = () => {
    let text = `==============================\nQUESTIONS GENERATED FROM: ${doc.name}\nReference Category: ${doc.category}\nDate: ${new Date().toLocaleDateString()}\n==============================\n\n`;

    questions.forEach((q, idx) => {
      text += `Q${idx + 1} [${q.marks} Mark${q.marks > 1 ? 's' : ''}] (${q.type}):\n${q.question}\n`;
      if (q.options) {
        q.options.forEach((opt) => {
          text += `   ${opt}\n`;
        });
        text += `Correct Answer: Option ${typeof q.answer === 'number' ? String.fromCharCode(65 + q.answer) : q.answer}\n`;
      } else {
        text += `Model Solution: ${q.answer}\n`;
      }
      text += `Explanation: ${q.explanation}\n\n`;
    });

    navigator.clipboard.writeText(text);
    onToast('Complete question paper & answer key copied to clipboard!');
  };

  const downloadQuestionPaper = () => {
    let text = `SMART TEACHING STUDIO • CLASSROOM QUESTION PAPER\nGenerated from: ${doc.name}\nCategory: ${doc.category}\n\n`;
    questions.forEach((q, idx) => {
      text += `Question ${idx + 1} (${q.marks} Mark${q.marks > 1 ? 's' : ''}) - ${q.type}\n`;
      text += `${q.question}\n`;
      if (q.options) {
        q.options.forEach((opt) => (text += `  ${opt}\n`));
      }
      text += `\n`;
    });
    text += `\n--- ANSWER KEY & EXPLANATIONS ---\n`;
    questions.forEach((q, idx) => {
      text += `Q${idx + 1}: Answer = ${typeof q.answer === 'number' ? String.fromCharCode(65 + q.answer) : q.answer}\nExplanation: ${q.explanation}\n\n`;
    });

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Questions_${doc.name.replace(/\.[^/.]+$/, '')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    onToast('Questions worksheet downloaded!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Questions Generated from Material</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                  AI & Syllabus Engine
                </span>
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-md md:max-w-lg">
                Source Document: <strong className="text-slate-700">{doc.name}</strong> ({doc.category})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar Controls */}
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Question Count:</span>
            {[3, 5].map((cnt) => (
              <button
                key={cnt}
                onClick={() => setSelectedCount(cnt)}
                className={`h-8 px-3 rounded-lg text-xs font-bold border transition cursor-pointer ${
                  selectedCount === cnt
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cnt} Questions
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`h-8 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'interactive'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Interactive Practice
            </button>
            <button
              onClick={() => setActiveTab('paper')}
              className={`h-8 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'paper'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Printout View
            </button>
          </div>
        </div>

        {/* Question List Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50/50">
          {activeTab === 'interactive' ? (
            questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const hasExplanation = showExplanations[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold">
                      Q{idx + 1} • {q.type} • {q.marks} Mark{q.marks > 1 ? 's' : ''}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Curriculum Verified
                    </span>
                  </div>

                  <h4 className="text-sm md:text-base font-bold text-slate-900 leading-snug whitespace-pre-line">
                    {q.question}
                  </h4>

                  {/* Options for MCQs / Assertion-Reason */}
                  {q.options && (
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswers[q.id] === optIdx;
                        const isCorrect = typeof q.answer === 'number' && optIdx === q.answer;

                        return (
                          <button
                            key={optIdx}
                            onClick={() =>
                              handleSelectOption(
                                q.id,
                                optIdx,
                                typeof q.answer === 'number' ? q.answer : 0
                              )
                            }
                            className={`p-3 rounded-xl border text-left text-xs md:text-sm font-medium transition cursor-pointer flex items-center justify-between gap-3 ${
                              isAnswered
                                ? isCorrect
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                                  : isSelected
                                  ? 'bg-red-50 border-red-400 text-red-900'
                                  : 'bg-slate-50 border-slate-200 text-slate-400'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span>{opt}</span>
                            {isAnswered && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Non-MCQ Model Solution */}
                  {!q.options && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800">
                      <strong className="block text-slate-900 mb-1">Marking Scheme Solution:</strong>
                      {String(q.answer)}
                    </div>
                  )}

                  {/* Explanation Toggle */}
                  {hasExplanation && (
                    <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 leading-relaxed animate-in fade-in duration-150">
                      <strong className="block text-blue-950 mb-1">CBSE Explanation & Marking Note:</strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            /* Printable Worksheet View */
            <div className="p-6 rounded-2xl bg-white border border-slate-200 font-sans space-y-6">
              <div className="text-center border-b border-slate-200 pb-4">
                <h3 className="text-lg font-extrabold text-slate-900">
                  SMART TEACHING STUDIO • CLASSROOM TEST WORKSHEET
                </h3>
                <p className="text-xs text-slate-500">
                  Topic Reference: {doc.name} • Time Allowed: 25 Minutes
                </p>
              </div>

              {questions.map((q, idx) => (
                <div key={q.id} className="space-y-1.5 text-xs text-slate-800 border-b border-slate-100 pb-3">
                  <div className="font-bold text-slate-900">
                    Q{idx + 1}. ({q.marks} Mark{q.marks > 1 ? 's' : ''}) [{q.type}]
                  </div>
                  <p className="font-medium whitespace-pre-line">{q.question}</p>
                  {q.options && (
                    <div className="pl-4 space-y-0.5 text-slate-600">
                      {q.options.map((opt, oIdx) => (
                        <div key={oIdx}>{opt}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={copyQuestionsToClipboard}
              className="h-10 px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Copy Questions</span>
            </button>
            <button
              onClick={downloadQuestionPaper}
              className="h-10 px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Download .txt</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onLaunchIntoQuizMaker(questions, doc.name);
                onClose();
              }}
              className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Launch into Quiz Maker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
