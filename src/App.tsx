import React, { useState, useCallback } from 'react';
import { PageId, LessonPlan } from './types';
import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { InstallGuideModal } from './components/InstallGuideModal';
import { HomeScreen } from './components/screens/HomeScreen';
import { WhiteboardScreen } from './components/screens/WhiteboardScreen';
import { SubjectsScreen } from './components/screens/SubjectsScreen';
import { LessonsScreen } from './components/screens/LessonsScreen';
import { AITeacherScreen } from './components/screens/AITeacherScreen';
import { NotesMakerScreen } from './components/screens/NotesMakerScreen';
import { PPTMakerScreen } from './components/screens/PPTMakerScreen';
import { QuizMakerScreen } from './components/screens/QuizMakerScreen';
import { LessonPlannerScreen } from './components/screens/LessonPlannerScreen';
import { VoiceTeacherScreen } from './components/screens/VoiceTeacherScreen';
import { TalkToAIScreen } from './components/screens/TalkToAIScreen';
import { ReferenceLibraryScreen } from './components/screens/ReferenceLibraryScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

const PAGE_TITLES: Record<PageId, string> = {
  home: 'Smart Teaching Studio',
  board: 'Interactive Whiteboard (Full Drawing Space)',
  subjects: 'My Subjects',
  lessons: 'My Lessons',
  ai: 'AI Classroom Teacher',
  notes: 'Notes Maker',
  ppt: 'PowerPoint Maker (Local Bridge & Native .pptx)',
  quiz: 'Classroom Quiz Maker',
  planner: 'Lesson Planner',
  voice: 'Voice Teacher (Panel Audio)',
  talk: 'Talk to AI Assistant',
  refs: 'Reference Library',
  settings: 'Panel & Display Settings',
};

const INITIAL_SAVED_LESSONS: LessonPlan[] = [
  {
    id: 'lesson_1',
    topic: 'Partnership: Goodwill Valuation by Super Profit Method',
    subject: 'Accountancy',
    gradeClass: 'Class 12',
    durationMinutes: 60,
    createdAt: 'Today, Period 1',
    steps: [
      { timeRange: '00-05m', stageTitle: 'Warm-Up Recall', description: 'Average profit adjustments & past abnormal loss reversal' },
      { timeRange: '05-20m', stageTitle: 'Core Formula', description: 'Capital Employed, NRR, and Super Profit derivation on board' },
      { timeRange: '20-35m', stageTitle: 'Worked Illustration', description: 'TS Grewal comprehensive problem solving with working notes' },
      { timeRange: '35-45m', stageTitle: 'Guided Practice', description: 'Students solve challenge question in registers' },
      { timeRange: '45-55m', stageTitle: 'Board Checkpoint', description: 'Interactive MCQ dilemma on touchscreen panel' },
      { timeRange: '55-60m', stageTitle: 'Summary & HW', description: 'Board trap recap and textbook problem assignments' },
    ],
  },
  {
    id: 'lesson_2',
    topic: 'Demand Elasticity & Total Outlay Method',
    subject: 'Economics',
    gradeClass: 'Class 11',
    durationMinutes: 40,
    createdAt: 'Yesterday, Period 3',
    steps: [
      { timeRange: '00-05m', stageTitle: 'Warm-Up', description: 'Recall of Law of Demand and price movement' },
      { timeRange: '05-18m', stageTitle: 'Core Theory', description: 'Price elasticity cases: Ed > 1, Ed = 1, Ed < 1' },
      { timeRange: '18-28m', stageTitle: 'Expenditure Table', description: 'Total outlay behavior when price rises/falls' },
      { timeRange: '28-35m', stageTitle: 'Checkpoint Quiz', description: 'Interactive student quiz on the smart board' },
      { timeRange: '35-40m', stageTitle: 'Recap', description: 'Summary table copy and question assignment' },
    ],
  },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [activeLesson, setActiveLesson] = useState<LessonPlan | null>(INITIAL_SAVED_LESSONS[0]);
  const [savedLessons, setSavedLessons] = useState<LessonPlan[]>(INITIAL_SAVED_LESSONS);
  const [currentSubject, setCurrentSubject] = useState<string>('Accountancy');
  const [currentTopic, setCurrentTopic] = useState<string>('Partnership - Goodwill Valuation by Super Profit');
  const [installGuideOpen, setInstallGuideOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  }, []);

  const handleSpeak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 4000));
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleSelectSubjectTopic = (subject: string, topic: string) => {
    setCurrentSubject(subject);
    setCurrentTopic(topic);
  };

  const handleStartActiveLesson = (lesson: LessonPlan) => {
    setActiveLesson(lesson);
    setSavedLessons((prev) => [lesson, ...prev.filter((l) => l.id !== lesson.id)]);
  };

  return (
    <div
      id="app-root"
      className="flex h-screen w-screen overflow-hidden bg-[#f1f5f9] text-[#0f172a] font-sans antialiased"
    >
      {/* Permanent Left Sidebar (Designed for Large Panel Displays) */}
      <Sidebar currentPage={currentPage} onSelectPage={(p) => setCurrentPage(p)} />

      {/* Main Content Area */}
      <div id="main-area" className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Topbar Header */}
        <Topbar
          currentPage={currentPage}
          pageTitle={PAGE_TITLES[currentPage]}
          onNavigate={(p) => setCurrentPage(p)}
          onOpenInstallGuide={() => setInstallGuideOpen(true)}
          onToast={showToast}
        />

        {/* Scrollable View Container (or edge-to-edge for whiteboard) */}
        <main
          id="main-container"
          className={`flex-1 min-h-0 ${
            currentPage === 'board' ? 'p-0 overflow-hidden' : 'p-7 overflow-y-auto'
          }`}
        >
          {currentPage === 'home' && (
            <HomeScreen
              onNavigate={(p) => setCurrentPage(p)}
              onToast={showToast}
              onOpenInstallGuide={() => setInstallGuideOpen(true)}
            />
          )}

          {currentPage === 'board' && (
            <WhiteboardScreen
              initialTopic={currentTopic}
              onToast={showToast}
            />
          )}

          {currentPage === 'subjects' && (
            <SubjectsScreen
              onNavigate={(p) => setCurrentPage(p)}
              onSelectSubjectTopic={handleSelectSubjectTopic}
            />
          )}

          {currentPage === 'lessons' && (
            <LessonsScreen
              activeLesson={activeLesson}
              savedLessons={savedLessons}
              onNavigate={(p) => setCurrentPage(p)}
              onSelectLesson={(les) => setActiveLesson(les)}
              onToast={showToast}
            />
          )}

          {currentPage === 'ai' && (
            <AITeacherScreen
              initialSubject={currentSubject}
              initialTopic={currentTopic}
              onToast={showToast}
              onSpeak={handleSpeak}
            />
          )}

          {currentPage === 'notes' && (
            <NotesMakerScreen
              initialSubject={currentSubject}
              initialTopic={currentTopic}
              onToast={showToast}
              onSpeak={handleSpeak}
            />
          )}

          {currentPage === 'ppt' && (
            <PPTMakerScreen
              initialSubject={currentSubject}
              initialTopic={currentTopic}
              onToast={showToast}
            />
          )}

          {currentPage === 'quiz' && (
            <QuizMakerScreen
              initialTopic={currentTopic}
              onToast={showToast}
              onSpeak={handleSpeak}
            />
          )}

          {currentPage === 'planner' && (
            <LessonPlannerScreen
              initialSubject={currentSubject}
              initialTopic={currentTopic}
              onNavigate={(p) => setCurrentPage(p)}
              onStartActiveLesson={handleStartActiveLesson}
              onToast={showToast}
            />
          )}

          {currentPage === 'voice' && (
            <VoiceTeacherScreen onToast={showToast} />
          )}

          {currentPage === 'talk' && (
            <TalkToAIScreen
              onToast={showToast}
              onSpeak={handleSpeak}
            />
          )}

          {currentPage === 'refs' && (
            <ReferenceLibraryScreen onToast={showToast} />
          )}

          {currentPage === 'settings' && (
            <SettingsScreen
              onToast={showToast}
              onOpenInstallGuide={() => setInstallGuideOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Windows Interactive Panel Installation Modal */}
      <InstallGuideModal
        isOpen={installGuideOpen}
        onClose={() => setInstallGuideOpen(false)}
        onToast={showToast}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          id="toast-notification"
          className="fixed bottom-6 right-6 z-50 bg-[#0f172a] text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-[14px] font-semibold animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
