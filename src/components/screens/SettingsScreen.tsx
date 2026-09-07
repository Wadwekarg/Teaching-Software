import React, { useState, useEffect } from 'react';
import { Monitor, Download, CheckCircle, Volume2, Shield, Trash2 } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface Props {
  onToast?: (msg: string) => void;
  onOpenInstallGuide: () => void;
}

export const SettingsScreen: React.FC<Props> = ({ onToast = (_msg: string) => {}, onOpenInstallGuide }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [sensitivity, setSensitivity] = useState<string>('High (Interactive Flat Panel / Stylus)');

  useEffect(() => {
    const updateVoices = () => {
      if ('speechSynthesis' in window) {
        const vList = window.speechSynthesis.getVoices();
        setVoices(vList);
        if (vList.length > 0 && !selectedVoice) {
          setSelectedVoice(vList[0].name);
        }
      }
    };

    updateVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [selectedVoice]);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) onToast('Installed Smart Teaching Studio on Windows panel!');
    } else {
      onOpenInstallGuide();
    }
  };

  const clearAppCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    onToast('Local panel cache cleared successfully.');
  };

  const screenResolution = `${window.screen.width} × ${window.screen.height} (DPR: ${window.devicePixelRatio || 1})`;
  const maxTouchPoints = typeof navigator !== 'undefined' ? navigator.maxTouchPoints : 0;

  return (
    <div id="screen-settings" className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-2 tracking-tight flex items-center gap-2">
          <span>⚙️</span>
          <span>Panel & Display Settings</span>
        </h2>
        <p className="text-[#64748b] text-[15px] mb-6">
          V4.1 Panel Touch Edition • Calibrated for 4K and 1080p Smart Classroom Interactive Displays (ViewSonic, Promethean, SMART Board, BenQ, Newline, Maxhub).
        </p>

        {/* Windows Panel Installation Box */}
        <div className="mb-6 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-slate-700 text-white shadow-xl">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Monitor className="w-4 h-4" />
                Windows Interactive Flat Panel Deployment
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isInstalled ? 'Installed as Native Windows Panel App' : 'Install Smart Teaching Studio on Windows Panel'}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Install as a dedicated desktop app on your panel running Windows 10/11 or Windows IoT Enterprise. Run fullscreen with zero browser address bar, hardware-accelerated stylus drawing, and desktop shortcut auto-start.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleInstallClick}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <Download className="w-4 h-4" />
                  {isInstalled ? 'App Installed (Ready)' : 'One-Click Install App'}
                </button>

                <button
                  onClick={onOpenInstallGuide}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition cursor-pointer"
                >
                  View Kiosk & Edge Setup Guide
                </button>
              </div>
            </div>

            {/* Hardware Status */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2 shrink-0">
              <div className="text-slate-400 font-bold">Hardware Detection:</div>
              <div>Screen: <span className="text-blue-400 font-mono">{screenResolution}</span></div>
              <div>Touch Points: <span className="text-emerald-400 font-mono">{maxTouchPoints} Points</span></div>
              <div>Stylus Support: <span className="text-emerald-400 font-mono">{maxTouchPoints >= 2 ? 'Active / Passive Stylus Ready' : 'Standard'}</span></div>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-[14px] font-bold text-[#475569] mb-1.5">
              Touch / Stylus Sensitivity
            </label>
            <select
              value={sensitivity}
              onChange={(e) => {
                setSensitivity(e.target.value);
                onToast(`Sensitivity set to: ${e.target.value}`);
              }}
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600 cursor-pointer"
            >
              <option>High (Interactive Flat Panel / Stylus)</option>
              <option>Standard Mouse / Trackpad</option>
              <option>Ultra-High Precision (4K Palm Rejection)</option>
            </select>
          </div>

          <div>
            <label className="block text-[14px] font-bold text-[#475569] mb-1.5">
              Keep Permanent Left Menu Visible
            </label>
            <select className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600 cursor-pointer">
              <option>Always Visible (Locked for Large Panels)</option>
            </select>
          </div>

          <div>
            <label className="block text-[14px] font-bold text-[#475569] mb-1.5">
              Text-to-Speech Engine Voice
            </label>
            <select
              id="voiceSelect"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600 cursor-pointer"
            >
              {voices.length === 0 ? (
                <option>Standard System Voice</option>
              ) : (
                voices.map((v, i) => (
                  <option key={i} value={v.name}>
                    {v.name} ({v.lang})
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Reset button */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
            <p className="text-xs text-slate-500">
              V4.1 Panel Touch Edition • Designed for 4K / 1080p Smart Classroom Displays.
            </p>

            <button
              onClick={clearAppCache}
              className="px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Reset Local Panel Storage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
