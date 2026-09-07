import React, { useRef, useState, useEffect, useCallback } from 'react';
import { SlideDeck, ReferenceDoc } from '../../types';
import { BoardSlideViewer } from '../whiteboard/BoardSlideViewer';
import { LoadDeckModal } from '../whiteboard/LoadDeckModal';
import { PRESET_SLIDE_DECKS } from '../../data/referenceDecks';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Columns,
  Layers,
  X,
  Sparkles,
  Download,
} from 'lucide-react';

interface Props {
  initialTopic?: string;
  activeDeck?: SlideDeck | null;
  availableDocs?: ReferenceDoc[];
  onSelectDeck?: (deck: SlideDeck | null) => void;
  onToast?: (msg: string) => void;
}

type Tool = 'pen' | 'highlighter' | 'eraser';
type ViewMode = 'overlay' | 'split' | 'off';

export const WhiteboardScreen: React.FC<Props> = ({
  initialTopic,
  activeDeck = null,
  availableDocs = [],
  onSelectDeck,
  onToast = (_msg: string) => {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Drawing Tools State
  const [currentTool, setCurrentTool] = useState<Tool>('pen');
  const [currentColor, setCurrentColor] = useState<string>('#0f172a');
  const [penSize, setPenSize] = useState<number>(4);
  const [history, setHistory] = useState<string[]>([]);

  // Slide Deck State
  const [deck, setDeck] = useState<SlideDeck | null>(activeDeck);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<ViewMode>(activeDeck ? 'overlay' : 'off');
  const [isLoadModalOpen, setIsLoadModalOpen] = useState<boolean>(false);
  const [slideAnnotations, setSlideAnnotations] = useState<Record<number, string>>({});

  const isDrawing = useRef(false);
  const lastPos = useRef<[number, number]>([0, 0]);

  // Sync when activeDeck prop changes
  useEffect(() => {
    if (activeDeck) {
      setDeck(activeDeck);
      setCurrentSlideIndex(0);
      setViewMode('overlay');
    }
  }, [activeDeck]);

  // Color palette items matching user design
  const colors = [
    { label: 'Slate', value: '#0f172a' },
    { label: 'Blue', value: '#2563eb' },
    { label: 'Red', value: '#dc2626' },
    { label: 'Green', value: '#16a34a' },
    { label: 'Amber', value: '#d97706' },
    { label: 'Purple', value: '#9333ea' },
  ];

  // Canvas resize with devicePixelRatio to keep lines razor sharp on 4K/1080p smart panels
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save previous drawing content
    const prevImage = canvas.width > 0 ? canvas.toDataURL() : null;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // In overlay mode, keep transparent so slide shows through underneath
    const isOverlayMode = deck !== null && viewMode === 'overlay';
    if (!isOverlayMode) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
    } else {
      ctx.clearRect(0, 0, rect.width, rect.height);
    }

    if (prevImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = prevImage;
    }
  }, [deck, viewMode]);

  useEffect(() => {
    resizeCanvas();
    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resizeCanvas]);

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHistory((prev) => {
      const next = [...prev, canvas.toDataURL()];
      return next.slice(-25); // retain last 25 states
    });
  };

  const getPointerPos = (e: React.PointerEvent<HTMLCanvasElement>): [number, number] => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    const rect = canvas.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top];
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);

    saveHistoryState();
    isDrawing.current = true;
    lastPos.current = getPointerPos(e);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const [x, y] = getPointerPos(e);
    const [lx, ly] = lastPos.current;

    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(x, y);

    const isOverlay = deck !== null && viewMode === 'overlay';

    if (currentTool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = penSize;
      ctx.strokeStyle = currentColor;
      ctx.globalAlpha = 1.0;
    } else if (currentTool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = 28;
      ctx.strokeStyle = currentColor;
      ctx.globalAlpha = 0.38;
    } else if (currentTool === 'eraser') {
      if (isOverlay) {
        // Clear strokes transparently in overlay mode so slide is visible
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = 38;
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.globalAlpha = 1.0;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 38;
        ctx.strokeStyle = '#ffffff';
        ctx.globalAlpha = 1.0;
      }
    }

    ctx.stroke();
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    lastPos.current = [x, y];
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDrawing.current) {
      isDrawing.current = false;
      const canvas = canvasRef.current;
      if (canvas && canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
    }
  };

  const undo = () => {
    if (history.length === 0) {
      clearBoard();
      return;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const lastState = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));

    const img = new Image();
    img.onload = () => {
      const rect = canvas.getBoundingClientRect();
      const isOverlay = deck !== null && viewMode === 'overlay';
      ctx.clearRect(0, 0, rect.width, rect.height);
      if (!isOverlay) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, rect.width, rect.height);
      }
      ctx.drawImage(img, 0, 0, rect.width, rect.height);
    };
    img.src = lastState;
    onToast('Undid previous stroke');
  };

  const clearBoard = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    saveHistoryState();
    const rect = canvas.getBoundingClientRect();
    const isOverlay = deck !== null && viewMode === 'overlay';
    ctx.clearRect(0, 0, rect.width, rect.height);
    if (!isOverlay) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
    }
    onToast('Board cleared');
  };

  const saveBoardAsPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `SmartTeaching_Board_${deck ? deck.title.replace(/\s+/g, '_') : 'Canvas'}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onToast('Whiteboard PNG saved to downloads!');
  };

  // Switch slides while preserving teacher's handwritten annotations per slide
  const changeSlide = (newIndex: number) => {
    if (!deck || newIndex < 0 || newIndex >= deck.slides.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      // Save current slide annotation
      const currentURL = canvas.toDataURL();
      setSlideAnnotations((prev) => ({ ...prev, [currentSlideIndex]: currentURL }));

      // Prepare canvas for new slide
      const rect = canvas.getBoundingClientRect();
      const isOverlay = viewMode === 'overlay';
      ctx.clearRect(0, 0, rect.width, rect.height);
      if (!isOverlay) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      // Restore target slide annotation if it exists
      const targetURL = slideAnnotations[newIndex];
      if (targetURL) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, rect.width, rect.height);
        };
        img.src = targetURL;
      }
    }

    setCurrentSlideIndex(newIndex);
  };

  const handleSelectDeckFromModal = (selected: SlideDeck) => {
    setDeck(selected);
    setCurrentSlideIndex(0);
    setViewMode('overlay');
    setSlideAnnotations({});
    setHistory([]);
    if (onSelectDeck) onSelectDeck(selected);
  };

  const closePresentation = () => {
    setDeck(null);
    setViewMode('off');
    if (onSelectDeck) onSelectDeck(null);
    onToast('Closed presentation. Full whiteboard active.');
    setTimeout(() => resizeCanvas(), 50);
  };

  // Insert Commerce Journal Format onto whiteboard
  const insertJournalFormat = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    saveHistoryState();
    const rect = canvas.getBoundingClientRect();
    const startY = 40;
    const tableW = Math.min(rect.width - 40, 1100);
    const startX = (rect.width - tableW) / 2;

    ctx.save();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 2;
    ctx.fillStyle = '#f8fafc';

    // Header box
    ctx.fillRect(startX, startY, tableW, 45);
    ctx.strokeRect(startX, startY, tableW, 45);

    // Columns: Date (12%), Particulars (56%), L.F. (8%), Debit ₹ (12%), Credit ₹ (12%)
    const c1 = startX + tableW * 0.12;
    const c2 = startX + tableW * 0.68;
    const c3 = startX + tableW * 0.76;
    const c4 = startX + tableW * 0.88;

    // Vertical lines
    [c1, c2, c3, c4].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, startY + 450);
      ctx.stroke();
    });

    // Outer table border
    ctx.strokeRect(startX, startY, tableW, 450);

    // Header labels
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('Date', startX + (c1 - startX) / 2, startY + 22);
    ctx.fillText('Particulars (with Narration)', c1 + (c2 - c1) / 2, startY + 22);
    ctx.fillText('L.F.', c2 + (c3 - c2) / 2, startY + 22);
    ctx.fillText('Debit (₹)', c3 + (c4 - c3) / 2, startY + 22);
    ctx.fillText('Credit (₹)', c4 + (startX + tableW - c4) / 2, startY + 22);

    ctx.restore();
    onToast('Journal Ledger Table placed on board!');
  };

  // Insert T-Account Ledger onto whiteboard
  const insertTAccount = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    saveHistoryState();
    const rect = canvas.getBoundingClientRect();
    const midX = rect.width / 2;
    const startY = 70;
    const width = Math.min(rect.width - 60, 900);
    const leftX = midX - width / 2;
    const rightX = midX + width / 2;

    ctx.save();
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;

    // Top horizontal T bar
    ctx.beginPath();
    ctx.moveTo(leftX, startY);
    ctx.lineTo(rightX, startY);
    ctx.stroke();

    // Center vertical T bar
    ctx.beginPath();
    ctx.moveTo(midX, startY);
    ctx.lineTo(midX, startY + 400);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('Dr.', leftX + 15, startY - 12);
    ctx.fillText('Cr.', rightX - 45, startY - 12);

    ctx.textAlign = 'center';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('___________________ Account', midX, startY - 15);

    ctx.restore();
    onToast('T-Account Ledger placed on board!');
  };

  const activeSlide = deck ? deck.slides[currentSlideIndex] : null;

  return (
    <div id="screen-whiteboard" className="h-full flex flex-col space-y-3 select-none">
      {/* PPT Slide Presentation Control Ribbon (Visible when a deck is loaded) */}
      {deck && activeSlide && (
        <div className="bg-[#0f172a] text-white border border-slate-700 rounded-2xl px-4 py-2.5 shadow-md flex items-center justify-between flex-wrap gap-3 animate-in fade-in duration-150">
          {/* Deck Details */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-blue-600 text-white font-bold text-xs shrink-0 flex items-center gap-1.5">
              <Presentation className="w-4 h-4" />
              <span>PPT On Board</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-white truncate max-w-xs md:max-w-md">
                {deck.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{deck.gradeClass}</span>
                <span>•</span>
                <span>{deck.subject}</span>
                {deck.sourceDocName && (
                  <>
                    <span>•</span>
                    <span className="truncate max-w-[150px] text-blue-300">
                      Ref: {deck.sourceDocName}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Slide Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => changeSlide(currentSlideIndex - 1)}
              disabled={currentSlideIndex === 0}
              className="h-9 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono font-bold">
              Slide {currentSlideIndex + 1} of {deck.slides.length}
            </span>

            <button
              onClick={() => changeSlide(currentSlideIndex + 1)}
              disabled={currentSlideIndex === deck.slides.length - 1}
              className="h-9 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1"
              title="Next Slide"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* View Modes & Close */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => {
                  setViewMode('overlay');
                  setTimeout(() => resizeCanvas(), 50);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'overlay'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Slide Overlay: Annotate & highlight directly over the slide"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Annotate Over Slide</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('split');
                  setTimeout(() => resizeCanvas(), 50);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'split'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Split Screen: Slide on left, whiteboard working space on right"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Split Screen</span>
              </button>
            </div>

            <button
              onClick={closePresentation}
              className="p-2 rounded-xl text-slate-400 hover:text-red-400 hover:bg-slate-800 transition cursor-pointer"
              title="Exit Presentation"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Whiteboard Tools Bar */}
      <div
        id="whiteboard-tools-bar"
        className="bg-white border border-[#cbd5e1] rounded-2xl p-3 shadow-[0_4px_16px_rgba(15,23,42,0.04)] flex items-center justify-between flex-wrap gap-2.5"
      >
        {/* Drawing Tools */}
        <div className="flex items-center gap-2">
          <button
            id="tool-pen"
            onClick={() => setCurrentTool('pen')}
            className={`min-h-[46px] px-4 rounded-xl text-[14px] font-bold border transition flex items-center gap-2 cursor-pointer ${
              currentTool === 'pen'
                ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>✏️</span>
            <span>Pen</span>
          </button>

          <button
            id="tool-highlighter"
            onClick={() => setCurrentTool('highlighter')}
            className={`min-h-[46px] px-4 rounded-xl text-[14px] font-bold border transition flex items-center gap-2 cursor-pointer ${
              currentTool === 'highlighter'
                ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>🖍️</span>
            <span>Highlighter</span>
          </button>

          <button
            id="tool-eraser"
            onClick={() => setCurrentTool('eraser')}
            className={`min-h-[46px] px-4 rounded-xl text-[14px] font-bold border transition flex items-center gap-2 cursor-pointer ${
              currentTool === 'eraser'
                ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <span>🧹</span>
            <span>Eraser</span>
          </button>
        </div>

        {/* Color Dots */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-300">
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                setCurrentColor(c.value);
                if (currentTool === 'eraser') setCurrentTool('pen');
              }}
              title={c.label}
              className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                currentColor === c.value && currentTool !== 'eraser'
                  ? 'border-[#0f172a] scale-120 shadow-md'
                  : 'border-transparent hover:scale-110'
              }`}
              style={{ backgroundColor: c.value }}
            />
          ))}
        </div>

        {/* Thickness */}
        <div className="flex items-center gap-1.5 pl-3 border-l border-slate-300">
          {[2, 4, 8, 14].map((size) => (
            <button
              key={size}
              onClick={() => setPenSize(size)}
              className={`h-9 px-2.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                penSize === size
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
            >
              {size === 2 ? 'Fine' : size === 4 ? 'Med' : size === 8 ? 'Bold' : 'Marker'}
            </button>
          ))}
        </div>

        {/* Commerce Templates & PPT on Whiteboard */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-300">
          <button
            onClick={() => setIsLoadModalOpen(true)}
            className="min-h-[44px] px-3.5 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-900 text-[13px] font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs transition"
            title="Load PowerPoint slides directly on whiteboard"
          >
            <Presentation className="w-4 h-4 text-blue-600" />
            <span>Load PPT on Board</span>
          </button>

          <button
            onClick={insertJournalFormat}
            className="h-[44px] px-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-[13px] font-bold flex items-center gap-1.5 cursor-pointer"
            title="Place Journal Entry Ledger Table on Canvas"
          >
            <span>📑</span>
            <span>Journal Table</span>
          </button>
          <button
            onClick={insertTAccount}
            className="h-[44px] px-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 text-[13px] font-bold flex items-center gap-1.5 cursor-pointer"
            title="Place T-Account Ledger on Canvas"
          >
            <span>T</span>
            <span>T-Account</span>
          </button>
        </div>

        {/* Actions: Undo, Clear, Save PNG */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            id="tool-undo"
            onClick={undo}
            className="min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-[14px] font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>↶</span>
            <span>Undo</span>
          </button>
          <button
            id="tool-clear"
            onClick={clearBoard}
            className="min-h-[44px] px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-red-50 hover:text-red-700 text-slate-800 text-[14px] font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <span>🗑️</span>
            <span>Clear</span>
          </button>
          <button
            id="tool-save"
            onClick={saveBoardAsPNG}
            className="min-h-[44px] px-4 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] text-[14px] font-bold shadow-md shadow-[#2563eb]/20 flex items-center gap-1.5 cursor-pointer"
          >
            <span>💾</span>
            <span>Save PNG</span>
          </button>
        </div>
      </div>

      {/* Main Drawing Canvas / PPT Presentation Stage */}
      <div
        ref={containerRef}
        id="whiteboard-canvas-container"
        className="flex-1 min-h-[540px] bg-white border-2 border-[#94a3b8] rounded-2xl shadow-lg relative overflow-hidden flex flex-col md:flex-row"
      >
        {/* Split Screen Mode: Left half shows slide, right half shows whiteboard */}
        {deck && activeSlide && viewMode === 'split' ? (
          <>
            <div className="w-full md:w-1/2 h-full border-b md:border-b-0 md:border-r border-slate-300 overflow-hidden bg-slate-50">
              <BoardSlideViewer
                slide={activeSlide}
                slideNumber={currentSlideIndex + 1}
                totalSlides={deck.slides.length}
              />
            </div>
            <div className="w-full md:w-1/2 h-full relative bg-white">
              <canvas
                ref={canvasRef}
                id="canvas"
                className="drawing-canvas w-full h-full block bg-white cursor-crosshair"
                onPointerDown={startDrawing}
                onPointerMove={draw}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
                onPointerCancel={stopDrawing}
              />
              <div className="absolute top-3 left-3 pointer-events-none px-3 py-1 rounded-full bg-slate-900/70 text-white text-[11px] font-medium backdrop-blur-xs">
                Whiteboard Working Space
              </div>
            </div>
          </>
        ) : (
          /* Overlay Mode or Standard Board Mode */
          <div className="w-full h-full relative">
            {/* Slide Backdrop in Overlay Mode */}
            {deck && activeSlide && viewMode === 'overlay' && (
              <div className="absolute inset-0 z-0 overflow-hidden">
                <BoardSlideViewer
                  slide={activeSlide}
                  slideNumber={currentSlideIndex + 1}
                  totalSlides={deck.slides.length}
                  isOverlay
                />
              </div>
            )}

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              id="canvas"
              className={`drawing-canvas w-full h-full block cursor-crosshair ${
                deck && viewMode === 'overlay'
                  ? 'absolute inset-0 z-10 bg-transparent'
                  : 'bg-white'
              }`}
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
              onPointerCancel={stopDrawing}
            />

            {/* In overlay mode, visual badge that stylus can write directly over slide */}
            {deck && viewMode === 'overlay' && (
              <div className="absolute top-3 right-4 pointer-events-none z-20 px-3.5 py-1.5 rounded-full bg-blue-600/90 text-white text-[12px] font-bold shadow-md backdrop-blur-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Active Stylus Markup Over Slide</span>
              </div>
            )}
          </div>
        )}

        {/* Palm rejection helper badge */}
        <div className="absolute bottom-3 right-4 pointer-events-none z-20 px-3 py-1 rounded-full bg-slate-900/60 text-white text-[11px] font-medium backdrop-blur-xs">
          Palm-Rejection Active • Touch & Stylus
        </div>
      </div>

      {/* Modal to Load PPT onto Board */}
      <LoadDeckModal
        isOpen={isLoadModalOpen}
        onClose={() => setIsLoadModalOpen(false)}
        onSelectDeck={handleSelectDeckFromModal}
        availableDocs={availableDocs}
        onToast={onToast}
      />
    </div>
  );
};
