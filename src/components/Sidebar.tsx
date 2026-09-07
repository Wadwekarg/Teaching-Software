import React from 'react';
import { PageId } from '../types';

interface Props {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'board', label: 'Live Whiteboard', icon: '🖊️' },
  { id: 'subjects', label: 'My Subjects', icon: '📚' },
  { id: 'lessons', label: 'My Lessons', icon: '📖' },
  { id: 'ai', label: 'AI Teacher', icon: '🤖' },
  { id: 'notes', label: 'Notes Maker', icon: '📝' },
  { id: 'ppt', label: 'PPT Maker', icon: '📊' },
  { id: 'quiz', label: 'Quiz Maker', icon: '❓' },
  { id: 'planner', label: 'Lesson Planner', icon: '📅' },
  { id: 'voice', label: 'Voice Teacher', icon: '🔊' },
  { id: 'talk', label: 'Talk to AI', icon: '💬' },
  { id: 'refs', label: 'Reference Library', icon: '📂' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export const Sidebar: React.FC<Props> = ({ currentPage, onSelectPage }) => {
  return (
    <aside
      id="main-sidebar"
      className="w-[280px] bg-[#0f172a] text-[#f8fafc] flex flex-col p-4 shrink-0 shadow-2xl z-20 select-none border-r border-[#1e293b]"
    >
      {/* Brand Header */}
      <div id="sidebar-brand" className="px-3 pt-2 pb-4 border-b border-[#334155]">
        <h1 className="text-[21px] font-extrabold tracking-tight leading-none text-white">
          Smart Teaching Studio
        </h1>
        <small className="block text-[12px] font-semibold text-[#94a3b8] mt-1.5 tracking-wide">
          Panel Touch Edition • V4.1
        </small>
      </div>

      {/* Navigation List */}
      <nav
        id="sidebar-nav"
        className="flex-1 overflow-y-auto py-2.5 space-y-1 pr-1"
        aria-label="Panel navigation"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onSelectPage(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-[15px] font-semibold flex items-center gap-3 transition-all min-h-[52px] touch-manipulation cursor-pointer ${
                isActive
                  ? 'bg-[#2563eb] text-white font-bold shadow-md shadow-[#2563eb]/30 ring-1 ring-blue-400/40'
                  : 'text-[#cbd5e1] hover:bg-[#1e293b] hover:text-white'
              }`}
            >
              <span className="text-[18px] shrink-0">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Panel Status */}
      <div id="sidebar-bottom" className="border-t border-[#334155] pt-3.5 mt-1">
        <div className="text-[13px] text-[#94a3b8] px-2 py-1.5 flex items-center font-semibold">
          <span className="relative flex h-2.5 w-2.5 mr-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e] shadow-[0_0_8px_#22c55e]"></span>
          </span>
          Panel Ready (Touch & Stylus)
        </div>
      </div>
    </aside>
  );
};
