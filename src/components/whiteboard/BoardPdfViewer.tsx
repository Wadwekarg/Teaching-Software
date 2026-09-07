import React, { useState } from 'react';
import { PdfPage } from '../../types';
import {
  FileText,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Volume2,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface Props {
  page: PdfPage;
  pageNumber: number;
  totalPages: number;
  documentTitle: string;
  isOverlay?: boolean;
  zoomLevel?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onResetZoom?: () => void;
  onSpeakText?: (text: string) => void;
}

export const BoardPdfViewer: React.FC<Props> = ({
  page,
  pageNumber,
  totalPages,
  documentTitle,
  isOverlay = false,
  zoomLevel = 100,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onSpeakText,
}) => {
  const [isReading, setIsReading] = useState(false);

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    let fullText = `${page.title}. ${page.subtitle || ''}. `;
    page.contentSections.forEach((section) => {
      if (section.heading) fullText += `${section.heading}. `;
      if (section.paragraphs) fullText += `${section.paragraphs.join(' ')}. `;
      if (section.bulletPoints) fullText += `${section.bulletPoints.join('. ')}. `;
      if (section.calloutNote) fullText += `Note: ${section.calloutNote.title}. ${section.calloutNote.text}. `;
    });

    if (onSpeakText) {
      onSpeakText(fullText);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullText.slice(0, 3000));
      utterance.rate = 0.95;
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      setIsReading(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getToneBorder = (tone?: string) => {
    switch (tone) {
      case 'amber':
        return 'border-amber-400 bg-amber-50/80 text-amber-900';
      case 'red':
        return 'border-red-500 bg-red-50/80 text-red-900';
      case 'emerald':
        return 'border-emerald-500 bg-emerald-50/80 text-emerald-900';
      case 'blue':
      default:
        return 'border-blue-500 bg-blue-50/80 text-blue-900';
    }
  };

  const getToneIcon = (tone?: string) => {
    switch (tone) {
      case 'amber':
        return <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />;
      case 'red':
        return <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />;
      case 'emerald':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />;
      case 'blue':
      default:
        return <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />;
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col justify-between overflow-y-auto select-none transition-transform duration-100 ${
        isOverlay ? 'bg-slate-100/95 text-slate-900' : 'bg-slate-200/90 text-slate-900 p-2 md:p-4'
      }`}
    >
      {/* Container simulating a crisp A4/Curriculum Document Sheet */}
      <div
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        className="max-w-4xl mx-auto w-full bg-white border border-slate-300 rounded-xl shadow-md p-6 md:p-8 flex flex-col justify-between transition-all min-h-[600px]"
      >
        {/* Document Official Header Bar */}
        <div>
          <div className="pb-4 border-b-2 border-slate-800 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 shrink-0">
                <FileText className="w-4 h-4" />
                <span>PDF DOC</span>
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block truncate max-w-sm">
                  {documentTitle}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                  {page.badge || `Section Page ${pageNumber}`}
                </span>
              </div>
            </div>

            {/* Quick Tools within page */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleReadAloud}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 cursor-pointer transition ${
                  isReading
                    ? 'bg-emerald-600 text-white border-emerald-600 animate-pulse'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                }`}
                title="Read Page Aloud to Class"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isReading ? 'Reading...' : 'Read Aloud'}</span>
              </button>

              {onZoomIn && onZoomOut && (
                <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5 border border-slate-300">
                  <button
                    onClick={onZoomOut}
                    className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono font-bold text-slate-600 px-1">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={onZoomIn}
                    className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  {onResetZoom && (
                    <button
                      onClick={onResetZoom}
                      className="p-1 rounded text-slate-600 hover:text-slate-900 hover:bg-white transition cursor-pointer ml-0.5"
                      title="Reset Zoom"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-white text-xs font-mono font-bold">
                {pageNumber}/{totalPages}
              </span>
            </div>
          </div>

          {/* Page Main Title and Subtitle */}
          <div className="my-5">
            <h2 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight leading-tight">
              {page.title}
            </h2>
            {page.subtitle && (
              <p className="text-sm text-slate-600 font-medium mt-1">
                {page.subtitle}
              </p>
            )}
          </div>

          {/* Page Content Sections */}
          <div className="space-y-6 text-slate-800">
            {page.contentSections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                {section.heading && (
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-1.5">
                    <Bookmark className="w-4 h-4 text-emerald-600" />
                    <span>{section.heading}</span>
                  </h3>
                )}

                {/* Paragraphs */}
                {section.paragraphs &&
                  section.paragraphs.map((para, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-sm md:text-[15px] leading-relaxed text-slate-800 text-justify"
                    >
                      {para}
                    </p>
                  ))}

                {/* Bullet Points */}
                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2 pl-2">
                    {section.bulletPoints.map((pt, bIdx) => (
                      <li key={bIdx} className="text-sm md:text-[14px] flex items-start gap-2.5 text-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Structured Table */}
                {section.tableHeaders && section.tableRows && (
                  <div className="border border-slate-300 rounded-xl overflow-x-auto shadow-2xs my-3 bg-white">
                    <table className="w-full text-left text-xs md:text-sm border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white font-bold">
                          {section.tableHeaders.map((head, hIdx) => (
                            <th key={hIdx} className="px-3.5 py-2.5 border border-slate-700">
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.tableRows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70 hover:bg-slate-100'}
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="px-3.5 py-2.5 border border-slate-200 text-slate-800 font-medium whitespace-pre-line"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Callout / Examiner Warning Note */}
                {section.calloutNote && (
                  <div
                    className={`p-3.5 rounded-xl border-l-4 shadow-2xs text-xs md:text-sm flex items-start gap-3 my-3 ${getToneBorder(
                      section.calloutNote.tone
                    )}`}
                  >
                    {getToneIcon(section.calloutNote.tone)}
                    <div className="min-w-0">
                      <strong className="block font-bold mb-0.5">
                        {section.calloutNote.title}
                      </strong>
                      <p className="leading-relaxed whitespace-pre-line">
                        {section.calloutNote.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Page Footer */}
        <div className="pt-6 mt-8 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>{page.pageFooter || `Page ${pageNumber} of ${totalPages} • Smart Teaching Studio PDF Viewer`}</span>
          <span className="font-semibold text-emerald-700">CBSE Commerce Curriculum Reference</span>
        </div>
      </div>
    </div>
  );
};
