import React from 'react';
import { Monitor, Download, CheckCircle, ExternalLink, X, Shield, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onToast?: (msg: string) => void;
}

export const InstallGuideModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onToast = (_msg: string) => {},
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        onToast('Application installed successfully on this panel!');
        onClose();
      }
    } else {
      onToast('Use browser menu (···) > Apps > "Install this site as an app"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Install on Windows Interactive Panel</h3>
              <p className="text-xs text-slate-400">Classroom Touchscreen • 4K / 1080p Smart Board Deployment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Quick Install Action if browser supports prompt */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/70 to-slate-900 border border-blue-600/40 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                {isInstalled ? 'Already Installed in Standalone Mode' : 'One-Click Direct Installation'}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {isInstalled
                  ? 'Running as a standalone native Windows desktop application.'
                  : 'Installs as a native Windows desktop app with desktop icon and taskbar pinning.'}
              </p>
            </div>
            {!isInstalled && (
              <button
                onClick={handleInstallClick}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center gap-2 shrink-0 transition"
              >
                <Download className="w-4 h-4" />
                Install Now
              </button>
            )}
          </div>

          <div className="text-sm font-semibold text-slate-300">
            Recommended Installation Methods for Windows Panels:
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 flex gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </div>
              <div>
                <div className="font-bold text-sm text-white">Microsoft Edge (Recommended on Windows 10/11)</div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click the <strong>App Available</strong> icon in the address bar (or click <strong>Settings (···) → Apps → Install this site as an app</strong>). Check "Pin to taskbar" and "Create Desktop shortcut".
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 flex gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-600/30 text-blue-400 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </div>
              <div>
                <div className="font-bold text-sm text-white">Google Chrome Panel Setup</div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Click the install icon in the URL bar (computer with down-arrow) or click <strong>Menu (⋮) → Cast, save, and share → Install Smart Teaching Studio</strong>.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/60 flex gap-3">
              <div className="w-7 h-7 rounded-full bg-purple-600/30 text-purple-400 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </div>
              <div>
                <div className="font-bold text-sm text-white">Dedicated Kiosk Mode (Auto-Launch for Teachers)</div>
                <p className="text-xs text-slate-400 mt-0.5">
                  For classroom smart boards that boot directly into the studio, create a desktop shortcut with target:
                  <code className="block mt-1 p-2 rounded-lg bg-black/40 text-blue-300 font-mono text-xs select-all">
                    msedge.exe --kiosk {window.location.href} --edge-kiosk-type=fullscreen
                  </code>
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 flex items-center gap-3 text-xs text-emerald-300">
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>
              <strong>Touch & Stylus Ready:</strong> Works seamlessly with all active/passive styluses (Promethean ActivPen, ViewSonic vPen, SMART Board Pen, Dell, BenQ).
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
