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

export interface WhiteboardTool {
  type: 'pen' | 'highlighter' | 'eraser' | 'line' | 'rect';
  color: string;
  size: number;
}
