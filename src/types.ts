export type PageId =
  | 'home'
  | 'board'
  | 'subjects'
  | 'lessons'
  | 'ai'
  | 'notes'
  | 'ppt'
  | 'quiz'
  | 'planner'
  | 'voice'
  | 'talk'
  | 'refs'
  | 'settings';

export interface SubjectItem {
  id: string;
  name: string;
  classes: string;
  coreUnits: string[];
  recommendedBooks: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface LessonPlan {
  id: string;
  topic: string;
  subject: string;
  gradeClass: string;
  durationMinutes: number;
  createdAt: string;
  steps: {
    timeRange: string;
    stageTitle: string;
    description: string;
  }[];
}

export interface ReferenceDoc {
  id: string;
  name: string;
  size: string;
  type: string;
  category: string;
  contentSummary: string;
  uploadedAt: string;
  rawContent?: string;
}

export interface SlideItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'cover' | 'roadmap' | 'concept' | 'table' | 'quiz' | 'summary';
  bulletPoints?: string[];
  tableHeaders?: string[];
  tableRows?: string[][];
  calloutBox?: {
    title: string;
    text: string;
    tone?: 'blue' | 'amber' | 'emerald' | 'red';
  };
  quizQuestion?: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
  footer?: string;
}

export interface SlideDeck {
  id: string;
  title: string;
  subject: string;
  gradeClass: string;
  sourceDocName?: string;
  slides: SlideItem[];
}

export interface WhiteboardTool {
  type: 'pen' | 'highlighter' | 'eraser' | 'line' | 'rect';
  color: string;
  size: number;
}

