import React from 'react';
import { PageId } from '../../types';

interface Props {
  onNavigate: (page: PageId) => void;
  onToast?: (msg: string) => void;
  onOpenInstallGuide?: () => void;
}

export const HomeScreen: React.FC<Props> = ({ onNavigate, onOpenInstallGuide }) => {
  return (
    <div id="screen-home" className="space-y-5 animate-in fade-in duration-150">
      {/* Top Banner Card */}
      <div
        id="home-hub-banner"
        className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)]"
      >
        <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-2 tracking-tight">
          Smart Teaching Studio — Interactive Panel Hub
        </h2>
        <p className="text-[#64748b] text-[15px] leading-relaxed max-w-4xl">
          Optimized for Class 11–12 Commerce teaching on large touch displays. Permanent sidebar, rapid whiteboard switching, instant lesson planning, quiz generator, and PowerPoint export.
        </p>
        <div className="mt-4">
          <span
            id="badge-panel-ready"
            className="inline-block px-3.5 py-1.5 rounded-full bg-[#dbeafe] text-[#1d4ed8] text-[12px] font-bold tracking-wide uppercase"
          >
            TOUCH & STYLUS READY • PERMANENT NAVIGATION
          </span>
        </div>
      </div>

      {/* 6 Quick Action Grid Cards (3 Columns) */}
      <div id="home-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Live Whiteboard */}
        <div
          id="card-live-whiteboard"
          className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[19px] font-bold text-[#0f172a] mb-2.5 flex items-center gap-2">
              <span>🖊️</span>
              <span>Live Whiteboard</span>
            </h3>
            <p className="text-[#64748b] text-[15px] leading-normal mb-5">
              Fast touch & stylus drawing canvas with palm-safe gestures, multi-color markers, highlighter, and instant PNG save.
            </p>
          </div>
          <button
            id="home-btn-whiteboard"
            onClick={() => onNavigate('board')}
            className="w-full sm:w-auto self-start px-5 py-3 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] text-[15px] font-bold shadow-md shadow-[#2563eb]/20 transition active:scale-98 cursor-pointer"
          >
            Open Whiteboard
          </button>
        </div>

        {/* 2. AI Teacher */}
        <div
          id="card-ai-teacher"
          className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[19px] font-bold text-[#0f172a] mb-2.5 flex items-center gap-2">
              <span>🤖</span>
              <span>AI Teacher</span>
            </h3>
            <p className="text-[#64748b] text-[15px] leading-normal mb-5">
              Generate classroom concepts, real-life examples, checking questions, and board problem prompts.
            </p>
          </div>
          <button
            id="home-btn-ai"
            onClick={() => onNavigate('ai')}
            className="w-full sm:w-auto self-start px-5 py-3 rounded-xl border border-[#cbd5e1] bg-white text-[#0f172a] hover:bg-slate-50 text-[15px] font-bold transition active:scale-98 cursor-pointer shadow-xs"
          >
            Open AI Teacher
          </button>
        </div>

        {/* 3. PPT Maker */}
        <div
          id="card-ppt-maker"
          className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[19px] font-bold text-[#0f172a] mb-2.5 flex items-center gap-2">
              <span>📊</span>
              <span>PPT Maker</span>
            </h3>
            <p className="text-[#64748b] text-[15px] leading-normal mb-5">
              Create editable PowerPoint (.pptx) decks directly on the panel via the local bridge.
            </p>
          </div>
          <button
            id="home-btn-ppt"
            onClick={() => onNavigate('ppt')}
            className="w-full sm:w-auto self-start px-5 py-3 rounded-xl border border-[#cbd5e1] bg-white text-[#0f172a] hover:bg-slate-50 text-[15px] font-bold transition active:scale-98 cursor-pointer shadow-xs"
          >
            Create PPT
          </button>
        </div>

        {/* 4. Notes Maker */}
        <div
          id="card-notes-maker"
          className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[19px] font-bold text-[#0f172a] mb-2.5 flex items-center gap-2">
              <span>📝</span>
              <span>Notes Maker</span>
            </h3>
            <p className="text-[#64748b] text-[15px] leading-normal mb-5">
              Generate structured classroom notes, exam revisions, and quick summaries ready for read-aloud.
            </p>
          </div>
          <button
            id="home-btn-notes"
            onClick={() => onNavigate('notes')}
            className="w-full sm:w-auto self-start px-5 py-3 rounded-xl border border-[#cbd5e1] bg-white text-[#0f172a] hover:bg-slate-50 text-[15px] font-bold transition active:scale-98 cursor-pointer shadow-xs"
          >
            Generate Notes
          </button>
        </div>

        {/* 5. Quiz Maker */}
        <div
          id="card-quiz-maker"
          className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[19px] font-bold text-[#0f172a] mb-2.5 flex items-center gap-2">
              <span>❓</span>
              <span>Quiz Maker</span>
            </h3>
            <p className="text-[#64748b] text-[15px] leading-normal mb-5">
              Produce 5 to 20 multiple choice questions on the board for instant student engagement.
            </p>
          </div>
          <button
            id="home-btn-quiz"
            onClick={() => onNavigate('quiz')}
            className="w-full sm:w-auto self-start px-5 py-3 rounded-xl border border-[#cbd5e1] bg-white text-[#0f172a] hover:bg-slate-50 text-[15px] font-bold transition active:scale-98 cursor-pointer shadow-xs"
          >
            Launch Quiz
          </button>
        </div>

        {/* 6. Lesson Planner */}
        <div
          id="card-lesson-planner"
          className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[19px] font-bold text-[#0f172a] mb-2.5 flex items-center gap-2">
              <span>📅</span>
              <span>Lesson Planner</span>
            </h3>
            <p className="text-[#64748b] text-[15px] leading-normal mb-5">
              Set up 40, 60, or 90 minute structured class flows with warm-up, core theory, and recap periods.
            </p>
          </div>
          <button
            id="home-btn-planner"
            onClick={() => onNavigate('planner')}
            className="w-full sm:w-auto self-start px-5 py-3 rounded-xl border border-[#cbd5e1] bg-white text-[#0f172a] hover:bg-slate-50 text-[15px] font-bold transition active:scale-98 cursor-pointer shadow-xs"
          >
            Plan Lesson
          </button>
        </div>
      </div>
    </div>
  );
};
