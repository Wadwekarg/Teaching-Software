import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { MonitorDown } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface Props {
  currentPage: PageId;
  pageTitle: string;
  onNavigate: (page: PageId) => void;
  onOpenInstallGuide: () => void;
  onToast?: (msg: string) => void;
}

export const Topbar: React.FC<Props> = ({
  pageTitle,
  onNavigate,
  onOpenInstallGuide,
  onToast = (_msg: string) => {},
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isInstallable, isInstalled, install } = usePWAInstall();

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        onToast('Fullscreen request was blocked by browser.');
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleStartLesson = () => {
    onNavigate('planner');
    onToast('Select topic & period duration to start your lesson!');
  };

  const handleInstallClick = async () => {
    if (isInstallable) {
      const res = await install();
      if (res) onToast('Smart Teaching Studio installed on this panel!');
    } else {
      onOpenInstallGuide();
    }
  };

  return (
    <header
      id="main-topbar"
      className="h-[72px] bg-white border-b border-[#cbd5e1] flex items-center justify-between px-7 shrink-0 select-none shadow-xs z-10"
    >
      <div className="flex items-center gap-3">
        <h2 id="topbar-title" className="text-[24px] font-extrabold tracking-tight text-[#0f172a]">
          {pageTitle}
        </h2>
      </div>

      <div id="topbar-actions" className="flex items-center gap-3">
        {/* Install on Windows Panel button */}
        <button
          id="btn-install-panel"
          onClick={handleInstallClick}
          className="h-[48px] px-4 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-[14px] font-bold flex items-center gap-2 transition active:scale-98 cursor-pointer"
          title="Install as native Windows app on this interactive panel"
        >
          <MonitorDown className="w-4 h-4 text-blue-600" />
          <span>{isInstalled ? 'Windows Panel App' : 'Install on Panel'}</span>
        </button>

        {/* Fullscreen Button */}
        <button
          id="btn-fullscreen-toggle"
          onClick={toggleFullscreen}
          className="h-[48px] px-4 rounded-xl bg-[#0f172a] text-white hover:bg-slate-800 text-[15px] font-bold flex items-center gap-2 transition active:scale-98 cursor-pointer shadow-xs"
        >
          <span>⛶</span>
          <span>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
        </button>

        {/* Start Lesson */}
        <button
          id="btn-start-lesson"
          onClick={handleStartLesson}
          className="h-[48px] px-4 rounded-xl border border-[#cbd5e1] bg-white text-[#0f172a] hover:bg-slate-50 text-[15px] font-bold flex items-center gap-2 transition active:scale-98 cursor-pointer shadow-xs"
        >
          <span>▶</span>
          <span>Start Lesson</span>
        </button>

        {/* Open Whiteboard */}
        <button
          id="btn-open-whiteboard"
          onClick={() => onNavigate('board')}
          className="h-[48px] px-5 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] text-[15px] font-bold flex items-center gap-2 transition active:scale-98 cursor-pointer shadow-md shadow-[#2563eb]/20"
        >
          <span>🖊️</span>
          <span>Open Whiteboard</span>
        </button>
      </div>
    </header>
  );
};
