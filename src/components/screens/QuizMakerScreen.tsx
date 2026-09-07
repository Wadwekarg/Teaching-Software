import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PRESET_QUIZZES } from '../../data/commerceCurriculum';
import { CheckCircle2, XCircle, RotateCcw, Award, Sparkles, Copy, Check, Eye } from 'lucide-react';

interface Props {
  initialTopic?: string;
  onToast?: (msg: string) => void;
  onSpeak?: (text: string) => void;
}

interface QuestionItem {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const QuizMakerScreen: React.FC<Props> = ({
  initialTopic = 'Demand Elasticity & Determinants',
  onToast = (_msg: string) => {},
  onSpeak = (_text: string) => {},
}) => {
  const [topic, setTopic] = useState<string>(initialTopic);
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [mode, setMode] = useState<'interactive' | 'text'>('interactive');
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: 1,
      question: 'When the percentage change in quantity demanded is exactly equal to the percentage change in price, what is the elasticity of demand (Ed)?',
      options: ['Ed = 0 (Perfect Inelastic)', 'Ed = 1 (Unitary Elastic)', 'Ed > 1 (Highly Elastic)', 'Ed = ∞ (Perfect Elastic)'],
      answer: 1,
      explanation: 'Unitary elastic demand occurs when proportional change in demand exactly mirrors proportional change in price (Ed = 1). The demand curve forms a rectangular hyperbola.',
    },
    {
      id: 2,
      question: 'Which of the following commodities is likely to have highly INELASTIC demand in the short run?',
      options: ['Luxury sports car', 'Life-saving insulin injection', 'Branded designer footwear', 'Air conditioning unit'],
      answer: 1,
      explanation: 'Necessities with no close substitutes (such as life-saving medicine or salt) exhibit highly inelastic demand because consumers must buy them regardless of price.',
    },
    {
      id: 3,
      question: 'What happens to Total Expenditure when price of a good falls and its price elasticity of demand is GREATER than 1 (Ed > 1)?',
      options: ['Total Expenditure decreases', 'Total Expenditure remains unchanged', 'Total Expenditure increases', 'Total Expenditure drops to zero'],
      answer: 2,
      explanation: 'By Total Outlay method, when demand is elastic (Ed > 1), a price drop causes a more than proportionate rise in quantity demanded, raising total expenditure.',
    },
    {
      id: 4,
      question: 'If two goods X and Y have a positive Cross Price Elasticity of Demand (Exy > 0), what is their relationship?',
      options: ['They are substitute goods (e.g. Tea & Coffee)', 'They are complementary goods (e.g. Car & Petrol)', 'They are completely unrelated goods', 'They are Giffen inferior goods'],
      answer: 0,
      explanation: 'A rise in the price of tea leads to an increase in demand for coffee; hence substitute goods possess positive cross price elasticity.',
    },
    {
      id: 5,
      question: 'What is the shape of a demand curve exhibiting perfectly elastic demand parallel to?',
      options: ['Vertical Y-axis', 'Horizontal X-axis', 'Downsloping straight line at 45 degrees', 'Convex to origin'],
      answer: 1,
      explanation: 'Under perfect competition or perfectly elastic conditions, the demand curve is a horizontal straight line parallel to the X-axis (Ed = ∞).',
    },
  ]);

  const [userSelections, setUserSelections] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleOptionClick = (qIndex: number, optIndex: number) => {
    if (userSelections[qIndex] !== undefined) return; // already answered

    setUserSelections((prev) => ({ ...prev, [qIndex]: optIndex }));
    setShowExplanation((prev) => ({ ...prev, [qIndex]: true }));

    const isCorrect = optIndex === questions[qIndex].answer;
    if (isCorrect) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
      });
      onToast('Correct Answer! 🎉');
    } else {
      onToast('Incorrect. Check the explanation on screen.');
    }
  };

  const generateNewQuiz = () => {
    // Check if topic matches preset economics or commerce
    const matchedCategory = topic.toLowerCase().includes('partner') || topic.toLowerCase().includes('account')
      ? 'accountancy'
      : topic.toLowerCase().includes('business') || topic.toLowerCase().includes('manage')
      ? 'business'
      : 'economics';

    const preset = PRESET_QUIZZES[matchedCategory] || PRESET_QUIZZES.economics;

    const newQs: QuestionItem[] = [];
    for (let i = 0; i < questionCount; i++) {
      if (i < preset.length) {
        newQs.push({
          id: i + 1,
          question: preset[i].question,
          options: [...preset[i].options],
          answer: preset[i].answer,
          explanation: preset[i].explanation,
        });
      } else {
        newQs.push({
          id: i + 1,
          question: `In the context of ${topic}, which regulatory principle must strictly be adhered to in senior secondary commerce?`,
          options: [
            'Strict adherence to statutory recognition and matching principles',
            'Subjective discretion without documented working notes',
            'Omission of comparative period figures from final accounts',
            'Deferral of statutory disclosures beyond annual general meetings',
          ],
          answer: 0,
          explanation: `In standard curriculum problems regarding ${topic}, statutory compliance, matching principles, and clear working notes are strictly required for full credit.`,
        });
      }
    }

    setQuestions(newQs);
    setUserSelections({});
    setShowExplanation({});
    onToast(`Generated ${newQs.length} board checkpoint questions!`);
  };

  const resetQuiz = () => {
    setUserSelections({});
    setShowExplanation({});
    onToast('Quiz reset for new student response!');
  };

  const calculateScore = () => {
    let score = 0;
    Object.entries(userSelections).forEach(([qIdx, ansIdx]) => {
      if (questions[Number(qIdx)] && questions[Number(qIdx)].answer === ansIdx) {
        score++;
      }
    });
    return score;
  };

  const formatTextExport = () => {
    let s = `CLASSROOM CHECKPOINT QUIZ — ${topic.toUpperCase()}\n\n`;
    questions.forEach((q, i) => {
      s += `Q${i + 1}. ${q.question}\n`;
      q.options.forEach((opt, oIdx) => {
        const letter = String.fromCharCode(65 + oIdx);
        s += `   ${letter}) ${opt}\n`;
      });
      s += `   [Correct Answer: Option ${String.fromCharCode(65 + q.answer)}]\n`;
      s += `   Explanation: ${q.explanation}\n\n`;
    });
    return s;
  };

  const copyQuizText = () => {
    navigator.clipboard.writeText(formatTextExport());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    onToast('Copied quiz text with answer key!');
  };

  const answeredCount = Object.keys(userSelections).length;

  return (
    <div id="screen-quiz" className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div>
            <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-1.5 tracking-tight flex items-center gap-2">
              <span>❓</span>
              <span>Classroom Quiz Maker</span>
            </h2>
            <p className="text-[#64748b] text-[15px]">
              Produce 5 to 20 multiple choice questions on the board for instant interactive student engagement.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setMode('interactive')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                mode === 'interactive' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Interactive Board View
            </button>
            <button
              onClick={() => setMode('text')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                mode === 'text' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Print & Export Text
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-8">
            <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Topic</label>
            <input
              id="qTopic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Demand Elasticity & Determinants"
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Questions</label>
            <input
              id="qCount"
              type="number"
              min={3}
              max={25}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600"
            />
          </div>
          <div className="md:col-span-2">
            <button
              onClick={generateNewQuiz}
              className="w-full px-4 py-3.5 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] text-[14px] font-bold shadow-md shadow-[#2563eb]/20 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate
            </button>
          </div>
        </div>

        {/* Interactive Scoreboard & Reset */}
        {mode === 'interactive' && (
          <div className="mt-6 flex items-center justify-between p-4 bg-slate-900 text-white rounded-xl flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                <Award className="w-5 h-5 text-amber-400" />
                Score: <span className="text-xl text-blue-400">{calculateScore()}</span> / {questions.length}
              </div>
              <div className="text-xs text-slate-400">
                Answered: {answeredCount} of {questions.length}
              </div>
            </div>
            <button
              onClick={resetQuiz}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Answers for Class
            </button>
          </div>
        )}

        {/* Mode 1: Interactive Touchscreen Quiz */}
        {mode === 'interactive' ? (
          <div className="mt-6 space-y-5">
            {questions.map((q, qIdx) => {
              const selectedOpt = userSelections[qIdx];
              const isAnswered = selectedOpt !== undefined;

              return (
                <div
                  key={q.id}
                  className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h4 className="text-[17px] font-bold text-slate-900 leading-snug">
                      <span className="text-blue-600 mr-2">Q{qIdx + 1}.</span>
                      {q.question}
                    </h4>
                    <button
                      onClick={() => onSpeak(`Question ${qIdx + 1}: ${q.question}`)}
                      className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 shrink-0 cursor-pointer"
                      title="Read Question Aloud"
                    >
                      <span>🔊</span>
                    </button>
                  </div>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, optIdx) => {
                      const letter = String.fromCharCode(65 + optIdx);
                      let styleClasses = 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300 text-slate-800';

                      if (isAnswered) {
                        if (optIdx === q.answer) {
                          styleClasses = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                        } else if (selectedOpt === optIdx) {
                          styleClasses = 'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/30';
                        } else {
                          styleClasses = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleOptionClick(qIdx, optIdx)}
                          className={`w-full text-left p-4 rounded-xl border-[1.5px] transition-all min-h-[56px] flex items-center gap-3 cursor-pointer ${styleClasses}`}
                        >
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                              isAnswered && optIdx === q.answer
                                ? 'bg-emerald-600 text-white'
                                : isAnswered && selectedOpt === optIdx
                                ? 'bg-red-600 text-white'
                                : 'bg-white border border-slate-300 text-slate-700'
                            }`}
                          >
                            {letter}
                          </div>
                          <span className="text-[14px] leading-snug flex-1">{opt}</span>
                          {isAnswered && optIdx === q.answer && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isAnswered && selectedOpt === optIdx && optIdx !== q.answer && (
                            <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation drawer */}
                  {showExplanation[qIdx] && (
                    <div className="mt-4 p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 text-sm text-slate-800 animate-in fade-in">
                      <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                        <Eye className="w-4 h-4 text-blue-700" />
                        Board Explanation & Statutory Rationale:
                      </div>
                      <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Mode 2: Print & Text Export View */
          <div className="mt-6">
            <div className="flex justify-end gap-2 mb-3">
              <button
                onClick={copyQuizText}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {isCopied ? 'Copied' : 'Copy Quiz with Answer Key'}
              </button>
            </div>
            <div
              id="quizOut"
              className="p-6 rounded-xl bg-[#f8fafc] border-[1.5px] border-dashed border-[#cbd5e1] text-[#0f172a] font-mono text-[14px] leading-relaxed whitespace-pre-wrap select-text max-h-[500px] overflow-y-auto"
            >
              {formatTextExport()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
