import React, { useState, useEffect } from 'react';
import { LessonPlan, PageId } from '../../types';
import { Play, Pause, RotateCcw, PenTool, CheckCircle, Clock, Calendar } from 'lucide-react';

interface Props {
  activeLesson: LessonPlan | null;
  savedLessons: LessonPlan[];
  onNavigate: (page: PageId) => void;
  onSelectLesson: (lesson: LessonPlan) => void;
  onToast?: (msg: string) => void;
}

export const LessonsScreen: React.FC<Props> = ({
  activeLesson,
  savedLessons,
  onNavigate,
  onSelectLesson,
  onToast = (_msg: string) => {},
}) => {
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(60 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  useEffect(() => {
    if (activeLesson) {
      setTimeLeftSeconds(activeLesson.durationMinutes * 60);
      setIsRunning(false);
      setCurrentStepIndex(0);
    }
  }, [activeLesson]);

  useEffect(() => {
    let timer: any;
    if (isRunning && timeLeftSeconds > 0) {
      timer = setInterval(() => {
        setTimeLeftSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0 && isRunning) {
      setIsRunning(false);
      onToast('Period duration complete! Proceed to recap and homework.');
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeftSeconds, onToast]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div id="screen-lessons" className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-1.5 tracking-tight">
            My Lessons
          </h2>
          <p className="text-[#64748b] text-[15px]">
            Saved class plans and live session controller for today's classroom periods.
          </p>
        </div>
        <button
          onClick={() => onNavigate('planner')}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[14px] flex items-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
        >
          <Calendar className="w-4 h-4" />
          Plan New Lesson
        </button>
      </div>

      {/* Active Lesson Timer Dashboard */}
      {activeLesson ? (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-slate-800">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
                Active Classroom Period
              </span>
              <h3 className="text-2xl font-bold text-white mt-2">{activeLesson.topic}</h3>
              <p className="text-slate-400 text-sm mt-0.5">
                {activeLesson.gradeClass} • {activeLesson.subject} • {activeLesson.durationMinutes} Minutes
              </p>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-4 bg-slate-950 px-6 py-3.5 rounded-2xl border border-slate-800">
              <Clock className="w-6 h-6 text-blue-400 animate-pulse" />
              <div className="font-mono text-3xl font-extrabold tracking-wider text-blue-400">
                {formatTime(timeLeftSeconds)}
              </div>
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`p-2.5 rounded-xl font-bold transition cursor-pointer ${
                    isRunning ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
                  } text-white`}
                  title={isRunning ? 'Pause Timer' : 'Resume Timer'}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => {
                    setIsRunning(false);
                    setTimeLeftSeconds(activeLesson.durationMinutes * 60);
                  }}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Period Stages Progress */}
          <div className="mt-6">
            <h4 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
              Lecture Flow Stages
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {activeLesson.steps.map((st, idx) => {
                const isCurrent = currentStepIndex === idx;
                const isPast = currentStepIndex > idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setCurrentStepIndex(idx)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer ${
                      isCurrent
                        ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/40 text-white'
                        : isPast
                        ? 'bg-slate-800/40 border-slate-700/60 text-slate-400'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold mb-1 text-slate-400">
                      <span>{st.timeRange}</span>
                      {isPast && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className="font-bold text-sm text-white">{st.stageTitle}</div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{st.description}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Panel Launch */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-slate-400">
              Current Focus: <strong>{activeLesson.steps[currentStepIndex]?.stageTitle}</strong> — {activeLesson.steps[currentStepIndex]?.description}
            </span>
            <button
              onClick={() => onNavigate('board')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-md shadow-blue-600/30"
            >
              <PenTool className="w-3.5 h-3.5" />
              Switch to Live Whiteboard
            </button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-[#cbd5e1] rounded-2xl p-8 shadow-[0_4px_16px_rgba(15,23,42,0.04)] text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-3xl mb-4">
            📖
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">No Active Lesson Running</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            Click "Start Lesson" in the topbar or choose a saved lesson plan below to track period timing and lecture stages on the panel screen.
          </p>
          <button
            onClick={() => onNavigate('planner')}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/20 cursor-pointer"
          >
            Create Class Lesson Plan
          </button>
        </div>
      )}

      {/* Saved Lessons Archive */}
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Saved Lesson Archive</h3>
        {savedLessons.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-slate-300 text-center text-slate-500 text-sm bg-slate-50">
            No saved lessons yet. Generated lesson plans from the Lesson Planner will automatically be archived here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedLessons.map((les) => (
              <div
                key={les.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-600 mb-1">
                    <span>{les.gradeClass} • {les.subject}</span>
                    <span>{les.durationMinutes}m</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">{les.topic}</h4>
                  <div className="text-xs text-slate-500 space-y-1 mb-4">
                    {les.steps.slice(0, 3).map((s, i) => (
                      <div key={i} className="truncate">
                        • {s.timeRange}: {s.stageTitle}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectLesson(les);
                    onToast(`Loaded lesson: ${les.topic}`);
                  }}
                  className="w-full py-2.5 rounded-lg bg-[#0f172a] hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  Launch on Panel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
