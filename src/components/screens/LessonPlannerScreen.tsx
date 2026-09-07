import React, { useState } from 'react';
import { LessonPlan, PageId } from '../../types';
import { Play, Copy, Check, Calendar, ArrowRight } from 'lucide-react';

interface Props {
  initialSubject?: string;
  initialTopic?: string;
  onNavigate: (page: PageId) => void;
  onStartActiveLesson: (lesson: LessonPlan) => void;
  onToast?: (msg: string) => void;
}

export const LessonPlannerScreen: React.FC<Props> = ({
  initialSubject = 'Business Studies',
  initialTopic = 'Principles of Scientific Management (F.W. Taylor)',
  onNavigate,
  onStartActiveLesson,
  onToast = (_msg: string) => {},
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('Class 12');
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [topic, setTopic] = useState<string>(initialTopic);
  const [duration, setDuration] = useState<string>('60 minutes');
  const [planOutput, setPlanOutput] = useState<string>(
    `PERIOD LESSON PLAN — ${initialTopic}\n${selectedClass} • ${initialSubject} | Duration: ${duration}\n\n• 00-05 min: Attendance & previous lecture warm-up recall\n• 05-20 min: Core concept delivery on whiteboard (Taylor's 4 Principles & Functional Foremanship)\n• 20-35 min: Worked illustration & student participation (Time and Motion Study vs Differential Piece Wage)\n• 35-45 min: Guided problem solving (Identifying Taylor techniques from practical case dilemmas)\n• 45-55 min: Classroom quiz or checkpoint dilemma on interactive panel\n• 55-60 min: Summary, key homework questions (Poonam Gandhi / NCERT references)`
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const generatePlan = () => {
    const mins = parseInt(duration, 10) || 60;
    let breakdown = '';

    if (mins === 40) {
      breakdown = `• 00-05 min: Attendance & warm-up conceptual recall\n• 05-18 min: Core theory & definitions written on whiteboard\n• 18-28 min: Worked illustrative problem & board discussion\n• 28-35 min: Student checkpoint challenge question on board\n• 35-40 min: Quick recap of key formulae and homework assignment`;
    } else if (mins === 90) {
      breakdown = `• 00-10 min: Attendance, review of previous homework & doubt clearing\n• 10-35 min: Comprehensive concept delivery with real-world Indian commerce case study\n• 35-55 min: Live board working note illustrations (T-account/equations)\n• 55-70 min: Interactive student group problem solving on touch screen\n• 70-82 min: Classroom multiple choice checkpoint quiz with live scoring\n• 82-90 min: Summary notes revision, exam trap checklist & homework reference`;
    } else {
      breakdown = `• 00-05 min: Attendance & previous lecture warm-up recall\n• 05-20 min: Core concept delivery on whiteboard\n• 20-35 min: Worked illustration & student participation\n• 35-45 min: Guided problem solving\n• 45-55 min: Classroom quiz or checkpoint dilemma\n• 55-60 min: Summary, key homework questions (textbook references)`;
    }

    const text = `PERIOD LESSON PLAN — ${topic}\n${selectedClass} • ${selectedSubject} | Duration: ${duration}\n\n${breakdown}\n\nCLASSROOM GOALS & OUTCOMES:\n1. Students will state core statutory definitions with zero ambiguity.\n2. Students will demonstrate working notes calculations accurately.\n3. Students will identify and avoid the standard board trap before submission.`;

    setPlanOutput(text);
    onToast('Lesson Plan generated!');
  };

  const handleLaunchToActiveLesson = () => {
    const mins = parseInt(duration, 10) || 60;
    const steps = [
      { timeRange: '00-05m', stageTitle: 'Warm-Up Recall', description: 'Attendance & rapid review of preceding chapter concepts' },
      { timeRange: '05-20m', stageTitle: 'Core Theory', description: `Delivery of ${topic} on whiteboard with definitions & rules` },
      { timeRange: '20-35m', stageTitle: 'Illustration', description: 'Step-by-step problem demonstration & working notes format' },
      { timeRange: '35-45m', stageTitle: 'Guided Practice', description: 'Students solve challenge dilemma in their registers' },
      { timeRange: '45-55m', stageTitle: 'Checkpoint Quiz', description: 'Class multiple-choice dilemma on the interactive panel' },
      { timeRange: '55-60m', stageTitle: 'Recap & Homework', description: 'Summary checklist, homework question numbers & dismissal' },
    ];

    const newLesson: LessonPlan = {
      id: `lesson_${Date.now()}`,
      topic,
      subject: selectedSubject,
      gradeClass: selectedClass,
      durationMinutes: mins,
      createdAt: new Date().toLocaleDateString(),
      steps,
    };

    onStartActiveLesson(newLesson);
    onNavigate('lessons');
    onToast(`Launched "${topic}" into active period controller!`);
  };

  const copyPlan = () => {
    navigator.clipboard.writeText(planOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    onToast('Lesson plan copied to clipboard!');
  };

  return (
    <div id="screen-planner" className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-2 tracking-tight flex items-center gap-2">
          <span>📅</span>
          <span>Lesson Planner</span>
        </h2>
        <p className="text-[#64748b] text-[15px] mb-5">
          Set up 40, 60, or 90 minute structured class flows with warm-up, core theory, board illustrations, and recap periods.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Class</label>
              <select
                id="lClass"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600 cursor-pointer"
              >
                <option>Class 11</option>
                <option>Class 12</option>
              </select>
            </div>
            <div>
              <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Subject</label>
              <select
                id="lSubject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600 cursor-pointer"
              >
                <option>Accountancy</option>
                <option>Economics</option>
                <option>Business Studies</option>
                <option>Applied Mathematics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Topic</label>
            <input
              id="lTopic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Principles of Scientific Management (F.W. Taylor)"
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600"
            />
          </div>

          <div>
            <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Period Duration</label>
            <select
              id="lDuration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600 cursor-pointer"
            >
              <option>40 minutes</option>
              <option>60 minutes</option>
              <option>90 minutes</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={generatePlan}
              className="px-6 py-3 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] text-[15px] font-bold shadow-md shadow-[#2563eb]/20 transition cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Generate Structured Plan
            </button>

            <button
              onClick={handleLaunchToActiveLesson}
              className="px-6 py-3 rounded-xl bg-[#0f172a] hover:bg-slate-800 text-white text-[15px] font-bold transition cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              Launch Active Period in My Lessons
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={copyPlan}
              className="px-5 py-3 rounded-xl border border-[#cbd5e1] bg-white hover:bg-slate-50 text-[#0f172a] text-[15px] font-bold transition cursor-pointer flex items-center gap-2 shadow-xs"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {isCopied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        <div
          id="planOut"
          className="mt-6 p-6 rounded-xl bg-[#f8fafc] border-[1.5px] border-dashed border-[#cbd5e1] text-[#0f172a] font-mono text-[14px] leading-relaxed whitespace-pre-wrap select-text max-h-[450px] overflow-y-auto"
        >
          {planOutput}
        </div>
      </div>
    </div>
  );
};
