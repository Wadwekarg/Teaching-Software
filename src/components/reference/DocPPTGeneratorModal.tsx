import React, { useState } from 'react';
import { ReferenceDoc, SlideDeck } from '../../types';
import { createSlideDeckFromDoc } from '../../data/referenceDecks';
import { exportCustomDeckPPTX } from '../../utils/pptxExport';
import { BoardSlideViewer } from '../whiteboard/BoardSlideViewer';
import {
  X,
  Presentation,
  Download,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Edit3,
  Loader2,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  doc: ReferenceDoc | null;
  onClose: () => void;
  onTeachOnWhiteboard: (deck: SlideDeck) => void;
  onNavigateToPPTMaker?: (doc: ReferenceDoc) => void;
  onToast?: (msg: string) => void;
}

export const DocPPTGeneratorModal: React.FC<Props> = ({
  isOpen,
  doc,
  onClose,
  onTeachOnWhiteboard,
  onNavigateToPPTMaker,
  onToast = (_msg: string) => {},
}) => {
  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen || !doc) return null;

  const deck = createSlideDeckFromDoc(doc);
  const activeSlide = deck.slides[currentSlideIdx];

  const handleExportPPTX = async () => {
    setIsExporting(true);
    onToast(`Exporting .pptx presentation for ${doc.name}...`);
    try {
      const message = await exportCustomDeckPPTX(deck);
      onToast(message);
    } catch (err) {
      onToast('Failed to export presentation file.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
              <Presentation className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>PowerPoint Prepared from Material</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                  16:9 Widescreen
                </span>
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-md md:max-w-xl">
                Synthesized from: <strong className="text-slate-700">{doc.name}</strong> • {deck.slides.length} Classroom Slides
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Carousel Preview Stage */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-900/5 flex flex-col items-center justify-center min-h-[380px]">
          <div className="w-full max-w-4xl aspect-[16/9] bg-white rounded-2xl shadow-lg border border-slate-300 overflow-hidden relative">
            <BoardSlideViewer
              slide={activeSlide}
              slideNumber={currentSlideIdx + 1}
              totalSlides={deck.slides.length}
            />
          </div>

          {/* Carousel Slide Switcher */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setCurrentSlideIdx((prev) => Math.max(0, prev - 1))}
              disabled={currentSlideIdx === 0}
              className="p-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 text-slate-700 transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5">
              {deck.slides.map((_, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => setCurrentSlideIdx(sIdx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentSlideIdx === sIdx
                      ? 'w-7 bg-blue-600'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Go to Slide ${sIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlideIdx((prev) => Math.min(deck.slides.length - 1, prev + 1))}
              disabled={currentSlideIdx === deck.slides.length - 1}
              className="p-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-40 text-slate-700 transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono font-bold text-slate-600 pl-2">
              Slide {currentSlideIdx + 1} / {deck.slides.length}
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPPTX}
              disabled={isExporting}
              className="h-10 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin text-blue-600" /> : <Download className="w-4 h-4 text-slate-500" />}
              <span>{isExporting ? 'Creating .pptx...' : 'Download Native .pptx'}</span>
            </button>

            {onNavigateToPPTMaker && (
              <button
                onClick={() => {
                  onNavigateToPPTMaker(doc);
                  onClose();
                }}
                className="h-10 px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-slate-500" />
                <span>Open in PPT Maker</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onTeachOnWhiteboard(deck);
                onClose();
              }}
              className="h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold shadow-md shadow-blue-600/20 transition flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Presentation className="w-4 h-4" />
              <span>Open & Teach on Whiteboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
