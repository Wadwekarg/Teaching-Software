import React, { useState } from 'react';
import { COMMERCE_SUBJECTS, SubjectData } from '../../data/commerceCurriculum';
import { PageId } from '../../types';
import { BookOpen, Sparkles, HelpCircle, FileText, ChevronRight } from 'lucide-react';

interface Props {
  onNavigate: (page: PageId) => void;
  onSelectSubjectTopic: (subject: string, topic: string) => void;
}

export const SubjectsScreen: React.FC<Props> = ({ onNavigate, onSelectSubjectTopic }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectData>(COMMERCE_SUBJECTS[0]);

  return (
    <div id="screen-subjects" className="space-y-6 animate-in fade-in duration-150">
      {/* Subject Header Card */}
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-2 tracking-tight">
          My Subjects
        </h2>
        <p className="text-[#64748b] text-[15px] leading-relaxed">
          Targeted curriculum alignment for Senior Secondary Commerce (Class 11 & 12). Select a subject to view key syllabus units, board exam traps, and launch instant AI lesson tools.
        </p>
      </div>

      {/* 4 Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMMERCE_SUBJECTS.map((sub) => {
          const isSelected = selectedSubject.id === sub.id;
          return (
            <div
              key={sub.id}
              onClick={() => setSelectedSubject(sub)}
              className={`bg-white border rounded-2xl p-5 shadow-[0_4px_16px_rgba(15,23,42,0.04)] cursor-pointer transition-all ${
                isSelected
                  ? 'border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/20'
                  : 'border-[#cbd5e1] hover:border-slate-400 hover:shadow-md'
              }`}
            >
              <div className="text-3xl mb-2.5">{sub.icon}</div>
              <h3 className="text-[18px] font-bold text-[#0f172a] mb-1">{sub.name}</h3>
              <div className="text-xs font-semibold text-blue-600 mb-2">{sub.classes}</div>
              <p className="text-[#64748b] text-[13px] leading-relaxed line-clamp-3">
                {sub.recommendedBooks}
              </p>
            </div>
          );
        })}
      </div>

      {/* Selected Subject In-Depth Units & Fast Actions */}
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedSubject.icon}</span>
              <h3 className="text-xl font-bold text-slate-900">{selectedSubject.name} Curriculum Units</h3>
            </div>
            <p className="text-sm text-slate-500 mt-1">{selectedSubject.description}</p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300">
            {selectedSubject.recommendedBooks}
          </span>
        </div>

        {/* Topics List */}
        <div className="mt-5 space-y-4">
          {selectedSubject.topics.map((t, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition"
            >
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="max-w-2xl">
                  <h4 className="text-[16px] font-bold text-slate-900 mb-1">{t.name}</h4>
                  <p className="text-sm text-slate-600 mb-3">{t.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {t.keyConcepts.map((c, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-medium"
                      >
                        • {c}
                      </span>
                    ))}
                  </div>

                  {/* Board trap & real-world hook preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900">
                      <strong>⚠️ Board Trap:</strong> {t.boardTrap}
                    </div>
                    <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200/80 text-blue-900">
                      <strong>💡 Real-World Hook:</strong> {t.realWorldHook}
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="flex flex-col sm:flex-row gap-2 shrink-0 self-center">
                  <button
                    onClick={() => {
                      onSelectSubjectTopic(selectedSubject.name, t.name);
                      onNavigate('ai');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Lesson
                  </button>
                  <button
                    onClick={() => {
                      onSelectSubjectTopic(selectedSubject.name, t.name);
                      onNavigate('notes');
                    }}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Notes
                  </button>
                  <button
                    onClick={() => {
                      onSelectSubjectTopic(selectedSubject.name, t.name);
                      onNavigate('quiz');
                    }}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    Quiz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
