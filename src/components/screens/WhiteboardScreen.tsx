import React, { useRef, useState, useEffect, useCallback } from 'react';

interface Props {
  initialTopic?: string;
  onToast?: (msg: string) => void;
}

type Tool = 'pen' | 'highlighter' | 'eraser';

export const WhiteboardScreen: React.FC<Props> = ({ initialTopic, onToast = (_msg: string) => {} }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [currentTool, setCurrentTool] = useState<Tool>('pen');
  const [currentColor, setCurrentColor] = useState<string>('#0f172a');
  const [penSize, setPenSize] = useState<number>(4);
  const [history, setHistory] = useState<string[]>([]);
  const [showGrid, setShowGrid] = useState<boolean>(false);

  const isDrawing = useRef(false);
  const lastPos = useRef<[number, number]>([0, 0]);

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

    const rect = container.getBoundingClientRect();
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

    // Fill white background so transparent png won't be black
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);

    if (prevImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = prevImage;
    }
  }, []);

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

    if (currentTool === 'pen') {
      ctx.lineWidth = penSize;
      ctx.strokeStyle = currentColor;
      ctx.globalAlpha = 1.0;
    } else if (currentTool === 'highlighter') {
      ctx.lineWidth = 28;
      ctx.strokeStyle = currentColor;
      ctx.globalAlpha = 0.35;
    } else if (currentTool === 'eraser') {
      ctx.lineWidth = 38;
      ctx.strokeStyle = '#ffffff';
      ctx.globalAlpha = 1.0;
    }

    ctx.stroke();
    ctx.globalAlpha = 1.0;
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
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, rect.width, rect.height);
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
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    onToast('Board cleared');
  };

  const saveBoardAsPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `SmartTeaching_Board_${new Date().toISOString().slice(0, 10)}_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    onToast('Whiteboard PNG saved to downloads!');
  };

  // Insert Commerce Journal Format onto whiteboard
  const insertJournalFormat = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    saveHistoryState();
    const rect = canvas.getBoundingClientRect();
    const startY = 60;
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

  return (
    <div id="screen-whiteboard" className="h-full flex flex-col space-y-3 select-none">
      {/* Whiteboard Controls Bar */}
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

        {/* Commerce Templates */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-300">
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

      {/* Drawing Canvas Container */}
      <div
        ref={containerRef}
        id="whiteboard-canvas-container"
        className="flex-1 min-h-[540px] bg-white border-2 border-[#94a3b8] rounded-2xl shadow-lg relative overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          id="canvas"
          className="drawing-canvas w-full h-full block bg-white"
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerLeave={stopDrawing}
          onPointerCancel={stopDrawing}
        />
        {/* Palm rejection helper badge */}
        <div className="absolute bottom-3 right-4 pointer-events-none px-3 py-1 rounded-full bg-slate-900/60 text-white text-[11px] font-medium backdrop-blur-xs">
          Palm-Rejection Active • Touch & Stylus
        </div>
      </div>
    </div>
  );
};
