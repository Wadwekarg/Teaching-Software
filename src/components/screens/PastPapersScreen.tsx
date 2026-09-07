import React, { useState, useEffect } from 'react';
import {
  PastPaperQuestion,
  PastPaperTopicAnalysis,
  SlideDeck,
  ReferenceDoc,
} from '../../types';
import {
  CURATED_PAST_PAPERS,
  getPastPaperAnalysis,
} from '../../data/pastPapersData';
import { COMMERCE_SUBJECTS } from '../../data/commerceCurriculum';
import {
  Sparkles,
  Award,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  XCircle,
  Volume2,
  Copy,
  Check,
  Presentation,
  TrendingUp,
  Filter,
  Layers,
  HelpCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface Props {
  initialSubject?: string;
  initialTopic?: string;
  availableDocs?: ReferenceDoc[];
  onTeachDeckOnWhiteboard?: (deck: SlideDeck) => void;
  onSendQuestionsToQuiz?: (questions: any[], docName: string) => void;
  onNavigateToPPTMaker?: (doc: ReferenceDoc) => void;
  onNavigate?: (page: any) => void;
  onToast?: (msg: string) => void;
  onSpeak?: (text: string) => void;
}

export const PastPapersScreen: React.FC<Props> = ({
  initialSubject = 'Accountancy',
  initialTopic = 'Cash Flow Statement - Operating Activities',
  availableDocs = [],
  onTeachDeckOnWhiteboard = (_deck: SlideDeck) => {},
  onSendQuestionsToQuiz = (_questions: any[], _docName: string) => {},
  onNavigate = (_page: any) => {},
  onToast = (_msg: string) => {},
  onSpeak = (_text: string) => {},
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('Class 12');
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [topic, setTopic] = useState<string>(initialTopic);
  const [filterType, setFilterType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active analysis data
  const [analysis, setAnalysis] = useState<PastPaperTopicAnalysis>(() =>
    getPastPaperAnalysis(initialTopic, initialSubject, 'Class 12')
  );

  // Selected MCQ answers map: { [questionId]: optionIndex }
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  // Revealed solutions map: { [questionId]: boolean }
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // When initial props change
  useEffect(() => {
    if (initialSubject && initialSubject !== selectedSubject) {
      setSelectedSubject(initialSubject);
    }
    if (initialTopic && initialTopic !== topic) {
      setTopic(initialTopic);
      setAnalysis(getPastPaperAnalysis(initialTopic, initialSubject, selectedClass));
    }
  }, [initialSubject, initialTopic]);

  // Handle AI analysis & question suggestion
  const handleGenerateAIQuestions = async () => {
    if (!topic.trim()) {
      onToast('Please enter a topic to analyze.');
      return;
    }

    setIsLoading(true);
    onToast(`AI is analyzing 2020–2024 CBSE board papers for "${topic}"...`);

    try {
      // Call server-side API endpoint
      const response = await fetch('/api/suggest-past-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic.trim(),
          subject: selectedSubject,
          gradeClass: selectedClass,
          referenceContext: availableDocs[0]?.contentSummary || '',
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          setAnalysis({ ...json.data, isAI: true });
          setUserAnswers({});
          setRevealedSolutions({});
          onToast('Generated past 5-year CBSE questions with Gemini AI!');
          return;
        }
      }
      
      // Offline fallback using curated authentic 2020-2024 archive
      const fallbackData = getPastPaperAnalysis(topic, selectedSubject, selectedClass);
      setAnalysis(fallbackData);
      setUserAnswers({});
      setRevealedSolutions({});
      onToast('Loaded authentic 2020–2024 CBSE board exam questions!');
    } catch (err) {
      console.warn('AI Past Questions fetch error, using local archive:', err);
      const fallbackData = getPastPaperAnalysis(topic, selectedSubject, selectedClass);
      setAnalysis(fallbackData);
      setUserAnswers({});
      setRevealedSolutions({});
      onToast('Loaded authentic 2020–2024 CBSE board exam questions!');
    } finally {
      setIsLoading(false);
    }
  };

  // Convert a single or all past paper questions to Whiteboard SlideDeck
  const handleProjectOnWhiteboard = (specificQuestion?: PastPaperQuestion) => {
    const questionsToProject = specificQuestion ? [specificQuestion] : analysis.questions;
    if (questionsToProject.length === 0) {
      onToast('No questions available to project.');
      return;
    }

    const slides: any[] = [
      {
        id: `slide-cover-${Date.now()}`,
        title: `${analysis.subject} • Past 5-Yr Board Questions`,
        subtitle: `${analysis.topic} (${analysis.gradeClass})`,
        type: 'cover',
        bulletPoints: [
          `CBSE 5-Year Frequency: ${analysis.fiveYearFrequency}`,
          `Average Board Weightage: ${analysis.avgMarksWeightage}`,
          `Key Exam Trend: ${analysis.trendVerdict}`,
        ],
        footer: 'CBSE Board Examination Practice • Smart Teaching Studio',
      },
    ];

    questionsToProject.forEach((q, idx) => {
      if (q.questionType === 'MCQ' && q.options && q.options.length > 0) {
        slides.push({
          id: `slide-q-${idx}-${Date.now()}`,
          title: `Q${idx + 1}: ${q.yearCitation} (${q.marks} Mark)`,
          subtitle: q.questionType,
          type: 'quiz',
          quizQuestion: {
            question: q.question,
            options: q.options,
            answerIndex: q.correctAnswerIndex ?? 0,
            explanation: q.answerText || q.markingSchemeSteps.join(' '),
            marks: q.marks,
            workingNotes: q.workingNotes,
            questionType: 'MCQ',
          },
          footer: `Examiner Tip: ${q.examinerTrap || 'Follow standard CBSE presentation format'}`,
        });
      } else {
        slides.push({
          id: `slide-q-${idx}-${Date.now()}`,
          title: `Q${idx + 1}: ${q.yearCitation} (${q.marks} Marks)`,
          subtitle: `${q.questionType} • ${q.probabilityIndex}`,
          type: 'concept',
          bulletPoints: [
            q.question,
            ...(q.markingSchemeSteps.length > 0
              ? ['--- Marking Scheme & Working Notes ---', ...q.markingSchemeSteps]
              : []),
          ],
          calloutBox: q.examinerTrap
            ? {
                title: '⚠️ Examiner Trap & Board Alert',
                text: q.examinerTrap,
                tone: 'amber',
              }
            : undefined,
          footer: `Step Marking: ${q.markingSchemeSteps.length} evaluated criteria`,
        });
      }
    });

    const deck: SlideDeck = {
      id: `deck-pyq-${Date.now()}`,
      title: `${analysis.topic} - Past 5-Yr Board Questions`,
      subject: analysis.subject,
      gradeClass: analysis.gradeClass,
      slides: slides,
      questionsCount: questionsToProject.length,
    };

    onTeachDeckOnWhiteboard(deck);
  };

  // Push to Quiz Maker
  const handlePushToQuiz = () => {
    const quizFormatted = analysis.questions.map((q, idx) => ({
      id: idx + 1,
      question: `[${q.yearCitation}] ${q.question}`,
      options:
        q.options && q.options.length === 4
          ? q.options
          : [
              'Statutory rule compliant with working note',
              'Non-operating adjustment required per standard',
              'Exempt from board evaluation guidelines',
              'None of the above',
            ],
      correctAnswerIndex: q.correctAnswerIndex ?? 0,
      explanation: `${q.answerText || ''} Marking steps: ${q.markingSchemeSteps.join('; ')}`,
    }));

    onSendQuestionsToQuiz(quizFormatted, `${analysis.topic} (Past 5-Yr Papers)`);
  };

  // Copy to clipboard
  const handleCopyQuestion = (q: PastPaperQuestion) => {
    const text = `[${q.yearCitation} - ${q.marks} Marks]\nTOPIC: ${q.topic} (${q.subject})\nTYPE: ${q.questionType}\n\nQUESTION:\n${q.question}\n\n${
      q.options ? q.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${opt}`).join('\n') + '\n\n' : ''
    }MARKING SCHEME & MODEL ANSWER:\n${q.markingSchemeSteps.join('\n')}\n\nEXAMINER TRAP:\n${q.examinerTrap || 'N/A'}`;

    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
    onToast('Copied question & marking rubric to clipboard!');
  };

  // Filtered questions
  const filteredQuestions = analysis.questions.filter((q) => {
    if (filterType === 'all') return true;
    if (filterType === 'mcq') return q.questionType === 'MCQ' || q.questionType === 'Assertion-Reason';
    if (filterType === 'numerical') return q.questionType === 'Numerical';
    if (filterType === 'case') return q.questionType === 'Case-Study';
    if (filterType === 'high-marks') return q.marks >= 4;
    return true;
  });

  return (
    <div id="screen-past-papers" className="space-y-6 animate-in fade-in duration-150">
      {/* Header Banner */}
      <div
        id="pyq-header-card"
        className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)]"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="text-2xl">🎯</span>
              <h2 className="text-[22px] font-extrabold text-[#0f172a] tracking-tight">
                CBSE Past 5-Year Board Question Predictor & Topic Analyzer
              </h2>
              {analysis.isAI ? (
                <span className="px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-blue-100 text-blue-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Model 3.8-Flash
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[12px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5" /> 2020–2024 Archive
                </span>
              )}
            </div>
            <p className="text-[#64748b] text-[15px] leading-relaxed max-w-4xl">
              Analyzes CBSE Class 11–12 Commerce papers from 2020 to 2024 (Delhi, All India, Term-1/2, Compartment). Suggests high-probability examination questions with official marking rubrics, working notes, and examiner trap warnings.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              id="pyq-project-all-btn"
              onClick={() => handleProjectOnWhiteboard()}
              className="px-4 py-2.5 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] text-[14px] font-bold flex items-center gap-2 shadow-md shadow-blue-500/20 active:scale-98 transition cursor-pointer"
            >
              <Presentation className="w-4 h-4" />
              <span>Project on Whiteboard</span>
            </button>
            <button
              id="pyq-push-quiz-btn"
              onClick={handlePushToQuiz}
              className="px-4 py-2.5 rounded-xl border border-[#cbd5e1] bg-white text-[#0f172a] hover:bg-slate-50 text-[14px] font-bold flex items-center gap-2 transition active:scale-98 cursor-pointer shadow-xs"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Send to Quiz</span>
            </button>
          </div>
        </div>

        {/* Search & Topic Selector Controls */}
        <div className="mt-5 pt-5 border-t border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Class Selector */}
          <div className="md:col-span-2">
            <label className="block text-[13px] font-bold text-[#475569] mb-1">Class</label>
            <select
              id="pyq-class-select"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-3 py-2.5 text-[14px] font-semibold bg-white focus:outline-blue-600 cursor-pointer"
            >
              <option>Class 12</option>
              <option>Class 11</option>
            </select>
          </div>

          {/* Subject Selector */}
          <div className="md:col-span-3">
            <label className="block text-[13px] font-bold text-[#475569] mb-1">Subject</label>
            <select
              id="pyq-subject-select"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                const sub = COMMERCE_SUBJECTS.find((s) => s.name === e.target.value);
                if (sub && sub.topics.length > 0) {
                  setTopic(sub.topics[0].name);
                  setAnalysis(getPastPaperAnalysis(sub.topics[0].name, sub.name, selectedClass));
                }
              }}
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-3 py-2.5 text-[14px] font-semibold bg-white focus:outline-blue-600 cursor-pointer"
            >
              <option>Accountancy</option>
              <option>Economics</option>
              <option>Business Studies</option>
              <option>Applied Mathematics</option>
            </select>
          </div>

          {/* Topic Input */}
          <div className="md:col-span-5">
            <label className="block text-[13px] font-bold text-[#475569] mb-1">
              Topic or Chapter to Analyze
            </label>
            <input
              id="pyq-topic-input"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Cash Flow Statement - Operating Activities, National Income, etc."
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-2.5 text-[14px] font-semibold bg-white focus:outline-blue-600"
            />
          </div>

          {/* AI Suggest Button */}
          <div className="md:col-span-2 flex items-end">
            <button
              id="pyq-suggest-btn"
              onClick={handleGenerateAIQuestions}
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0f172a] text-white hover:bg-slate-800 disabled:opacity-50 text-[14px] font-bold flex items-center justify-center gap-2 transition active:scale-98 cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Suggest (AI)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Suggest Topic Chips */}
        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span className="text-[12px] font-bold text-[#64748b] uppercase tracking-wider mr-1">
            Quick Topics:
          </span>
          {[
            'Cash Flow Statement - Operating Activities',
            'Partnership - Goodwill Valuation by Super Profit',
            'Macroeconomics - National Income Aggregates',
            'Money & Banking - Credit Creation & Monetary Policy',
            'Principles of Management - Fayol vs Taylor',
            'Financial Management - Capital Structure & Trading on Equity',
          ].map((quickTopic) => (
            <button
              key={quickTopic}
              onClick={() => {
                setTopic(quickTopic);
                let matchedSubject = 'Accountancy';
                if (quickTopic.includes('Macro') || quickTopic.includes('Money')) matchedSubject = 'Economics';
                if (quickTopic.includes('Management') || quickTopic.includes('Financial')) matchedSubject = 'Business Studies';
                setSelectedSubject(matchedSubject);
                setAnalysis(getPastPaperAnalysis(quickTopic, matchedSubject, selectedClass));
              }}
              className={`text-[12px] font-medium px-3 py-1 rounded-full border transition cursor-pointer ${
                topic === quickTopic
                  ? 'bg-blue-50 border-blue-300 text-blue-700 font-bold'
                  : 'bg-slate-50 border-slate-200 text-slate-640 hover:bg-slate-100'
              }`}
            >
              {quickTopic.split(' - ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Year Trend & Frequency Overview Card */}
      <div
        id="pyq-trend-card"
        className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-5 border-b border-slate-200">
          {/* Frequency */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[12px] font-bold uppercase text-slate-500 tracking-wider">
                5-Year Board Frequency
              </span>
              <p className="text-[15px] font-extrabold text-[#0f172a] mt-0.5">
                {analysis.fiveYearFrequency}
              </p>
            </div>
          </div>

          {/* Average Weightage */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[12px] font-bold uppercase text-slate-500 tracking-wider">
                Average Exam Weightage
              </span>
              <p className="text-[15px] font-extrabold text-[#0f172a] mt-0.5">
                {analysis.avgMarksWeightage}
              </p>
            </div>
          </div>

          {/* Questions Available */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[12px] font-bold uppercase text-slate-500 tracking-wider">
                Predicted Questions
              </span>
              <p className="text-[15px] font-extrabold text-[#0f172a] mt-0.5">
                {analysis.questions.length} Questions Ready to Solve
              </p>
            </div>
          </div>
        </div>

        {/* Trend Verdict Summary */}
        <div className="mt-5 space-y-3">
          <div>
            <h4 className="text-[14px] font-bold text-[#334155] mb-1 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>5-Year Evolution & Board Trend Verdict</span>
            </h4>
            <p className="text-[14px] text-[#475569] leading-relaxed bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              {analysis.trendVerdict}
            </p>
          </div>

          {/* Examiner Pitfalls */}
          {analysis.examinerPitfalls && analysis.examinerPitfalls.length > 0 && (
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5">
              <h4 className="text-[13px] font-extrabold text-amber-900 mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>CBSE Chief Examiners' Report: Common Student Pitfalls</span>
              </h4>
              <ul className="space-y-1.5 text-[13px] text-amber-900/90 pl-5 list-disc">
                {analysis.examinerPitfalls.map((pitfall, i) => (
                  <li key={i} className="leading-snug">
                    {pitfall}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs and Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-[14px] font-bold text-[#0f172a]">Filter Questions:</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: `All (${analysis.questions.length})` },
              { id: 'mcq', label: '1-Mark MCQ / A-R' },
              { id: 'numerical', label: 'Numerical' },
              { id: 'case', label: 'Case Study' },
              { id: 'high-marks', label: '4 to 6 Marks' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-[#2563eb] text-white shadow-xs'
                    : 'bg-white border border-[#cbd5e1] text-[#475569] hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[13px] text-slate-500 font-medium">
          Showing {filteredQuestions.length} of {analysis.questions.length} predicted questions
        </div>
      </div>

      {/* Questions Cards List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isRevealed = revealedSolutions[q.id];
          const selectedAnswer = userAnswers[q.id];
          const hasSelected = selectedAnswer !== undefined;

          return (
            <div
              key={q.id}
              id={`pyq-card-${q.id}`}
              className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)] space-y-4 transition hover:border-slate-400"
            >
              {/* Question Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-extrabold text-[13px] border border-blue-200">
                    {q.yearCitation}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[12px]">
                    {q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-[12px]">
                    {q.questionType}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 font-bold text-[12px]">
                    {q.probabilityIndex}
                  </span>
                </div>

                {/* Question Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onSpeak(q.question)}
                    title="Read Aloud to Class"
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopyQuestion(q)}
                    title="Copy Question & Scheme"
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
                  >
                    {copiedId === q.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleProjectOnWhiteboard(q)}
                    title="Project on Whiteboard to annotate"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                  >
                    <Presentation className="w-3.5 h-3.5" />
                    <span>Teach on Board</span>
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-2">
                <p className="text-[16px] font-bold text-[#0f172a] leading-relaxed whitespace-pre-line">
                  {q.question}
                </p>
              </div>

              {/* Interactive MCQ Options (if present) */}
              {q.options && q.options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((option, optIdx) => {
                    const isSelected = selectedAnswer === optIdx;
                    const isCorrect = q.correctAnswerIndex === optIdx;

                    let btnStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
                    if (hasSelected) {
                      if (isCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }));
                          setRevealedSolutions((prev) => ({ ...prev, [q.id]: true }));
                        }}
                        className={`text-left p-3.5 rounded-xl border-[1.5px] text-[14px] transition flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center shrink-0 text-[12px] font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1 leading-snug">{option}</span>
                        {hasSelected && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {hasSelected && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Toggle Solution & Marking Scheme */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() =>
                    setRevealedSolutions((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                  }
                  className="text-[13px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isRevealed ? 'Hide' : 'Reveal'} CBSE Marking Scheme & Working Notes</span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform ${isRevealed ? 'rotate-90' : ''}`}
                  />
                </button>

                {hasSelected && (
                  <button
                    onClick={() => {
                      setUserAnswers((prev) => {
                        const copy = { ...prev };
                        delete copy[q.id];
                        return copy;
                      });
                    }}
                    className="text-[12px] font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Choice</span>
                  </button>
                )}
              </div>

              {/* Expandable CBSE Marking Scheme & Examiner Notes */}
              {isRevealed && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 animate-in fade-in duration-150">
                  {q.answerText && (
                    <div>
                      <h5 className="text-[13px] font-bold text-emerald-800 uppercase tracking-wide mb-1">
                        Model Solution / Answer Key
                      </h5>
                      <p className="text-[14px] text-[#0f172a] font-medium leading-relaxed">
                        {q.answerText}
                      </p>
                    </div>
                  )}

                  {q.markingSchemeSteps && q.markingSchemeSteps.length > 0 && (
                    <div>
                      <h5 className="text-[13px] font-bold text-[#334155] uppercase tracking-wide mb-1.5">
                        Step-by-Step Marking Rubric ({q.marks} Marks Total)
                      </h5>
                      <ul className="space-y-1.5 text-[13px] text-[#475569] pl-4 list-decimal">
                        {q.markingSchemeSteps.map((step, sIdx) => (
                          <li key={sIdx} className="leading-relaxed">
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {q.workingNotes && (
                    <div className="bg-white border border-slate-200 rounded-lg p-3">
                      <span className="text-[12px] font-bold uppercase text-slate-500 block mb-1">
                        Teacher Working Notes & Journal Format:
                      </span>
                      <p className="text-[13px] text-slate-700 font-mono whitespace-pre-line leading-relaxed">
                        {q.workingNotes}
                      </p>
                    </div>
                  )}

                  {q.examinerTrap && (
                    <div className="bg-amber-100/60 border border-amber-200 rounded-lg p-2.5 text-[13px] text-amber-900 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-bold">Examiner Trap Alert:</strong> {q.examinerTrap}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
