import React, { useState } from 'react';
import { BoardPdfDoc, ReferenceDoc } from '../../types';
import { PRESET_BOARD_PDF_DOCS, createBoardPdfFromDoc } from '../../data/referencePdfDocs';
import { X, FileText, Upload, Sparkles, Check, BookOpen, Layers } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPdf: (pdf: BoardPdfDoc) => void;
  availableDocs: ReferenceDoc[];
  onToast?: (msg: string) => void;
}

export const LoadPdfModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectPdf,
  availableDocs,
  onToast = (_msg: string) => {},
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'refs' | 'upload'>('presets');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fakeDoc: ReferenceDoc = {
      id: `up-pdf-${Date.now()}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.name.split('.').pop()?.toUpperCase() || 'PDF',
      category: 'Uploaded for Whiteboard',
      contentSummary: `Uploaded PDF document ready for multi-page whiteboard projection and stylus annotation.`,
      uploadedAt: new Date().toLocaleTimeString(),
    };

    const newPdf = createBoardPdfFromDoc(fakeDoc);
    onSelectPdf(newPdf);
    onToast(`Loaded "${file.name}" PDF (${newPdf.totalPages} pages) onto Whiteboard!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Bring Reference PDF on Whiteboard</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Stylus Annotation Ready
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Display official syllabus documents, textbooks, and formula sheets directly on your panel canvas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-5 gap-3 pt-3 bg-white">
          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-3 text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'presets'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Standard Course PDFs ({PRESET_BOARD_PDF_DOCS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('refs')}
            className={`pb-3 text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'refs'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>From Reference Library ({availableDocs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload PDF from Panel / USB</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {activeTab === 'presets' && (
            <div className="space-y-3">
              {PRESET_BOARD_PDF_DOCS.map((pdf) => (
                <div
                  key={pdf.id}
                  onClick={() => {
                    onSelectPdf(pdf);
                    onToast(`Loaded "${pdf.title}" onto Whiteboard!`);
                    onClose();
                  }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
                      <span>{pdf.gradeClass}</span>
                      <span>•</span>
                      <span>{pdf.subject}</span>
                      <span>•</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                        {pdf.totalPages} Pages
                      </span>
                      <span>•</span>
                      <span className="text-slate-500">{pdf.fileSize}</span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900 truncate">
                      {pdf.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      File: {pdf.fileName} • {pdf.category}
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shrink-0 hover:bg-emerald-700 transition shadow-xs flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    <span>Bring to Board</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'refs' && (
            <div className="space-y-3">
              {availableDocs.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-8">
                  No documents in Reference Library yet. Upload files from the Reference Library screen!
                </p>
              ) : (
                availableDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      const pdf = createBoardPdfFromDoc(doc);
                      onSelectPdf(pdf);
                      onToast(`Loaded PDF "${doc.name}" onto Whiteboard!`);
                      onClose();
                    }}
                    className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                          {doc.type}
                        </span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.category}</span>
                      </div>
                      <h4 className="font-bold text-base text-slate-900 truncate">
                        {doc.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {doc.contentSummary}
                      </p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shrink-0 hover:bg-emerald-700 transition flex items-center gap-1.5 shadow-xs">
                      <FileText className="w-4 h-4" />
                      <span>Bring PDF to Board</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4 py-2">
              <label
                htmlFor="panelPdfUpload"
                className="border-2 border-dashed border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition text-center"
              >
                <Upload className="w-12 h-12 text-emerald-600 mb-3" />
                <span className="font-bold text-base text-slate-800">
                  Select PDF Document from Panel / USB
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Supports PDF textbooks, NCERT chapters, mock test question papers & guidelines
                </span>
                <input
                  type="file"
                  id="panelPdfUpload"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong className="block text-slate-800 mb-1">Interactive Board Features for PDF:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>Annotate Over PDF:</strong> Circle text, underline definitions, and write notes directly on top of the document page.</li>
                  <li><strong>Split Screen Mode:</strong> Keep the PDF question/text visible on the left half while using the right half as a free whiteboard ledger space.</li>
                  <li><strong>Page Navigation:</strong> Seamlessly flip through pages while retaining your handwritten marks per page.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-sm font-bold transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
