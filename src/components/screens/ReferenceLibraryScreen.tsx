import React, { useState } from 'react';
import { Folder, Upload, FileText, Download, Check, Eye, Trash2 } from 'lucide-react';

interface Props {
  onToast?: (msg: string) => void;
}

interface DocFile {
  name: string;
  size: string;
  type: string;
  category: string;
  contentSummary: string;
}

const INITIAL_DOCS: DocFile[] = [
  {
    name: 'CBSE_Class12_Accountancy_Syllabus_2025-26.pdf',
    size: '1.4 MB',
    type: 'PDF',
    category: 'Curriculum & Blueprint',
    contentSummary: 'Complete CBSE senior secondary accountancy blueprint: Partnership (36 marks), Company Accounts (24 marks), Financial Statement Analysis (20 marks).',
  },
  {
    name: 'Macroeconomics_National_Income_Formula_Sheet.pdf',
    size: '890 KB',
    type: 'PDF',
    category: 'Formula Sheet',
    contentSummary: 'Value Added Method, Income Method (Compensation + Operating Surplus + Mixed Income), Expenditure Method adjustments, and GDP Deflator formulas.',
  },
  {
    name: 'Business_Studies_Chapterwise_Case_Studies.docx',
    size: '2.3 MB',
    type: 'DOCX',
    category: 'Question Bank',
    contentSummary: '80 real-world corporate case studies mapped to Henri Fayol principles, Taylor techniques, Capital Structure leverage problems, and Consumer Protection remedies.',
  },
  {
    name: 'Partnership_Dissolution_Ledger_Templates.pptx',
    size: '3.1 MB',
    type: 'PPTX',
    category: 'Board Slides',
    contentSummary: 'Realisation Account format, Partners Capital Accounts, and Cash/Bank Account equilibrium templates for classroom projection.',
  },
];

export const ReferenceLibraryScreen: React.FC<Props> = ({ onToast = (_msg: string) => {} }) => {
  const [docs, setDocs] = useState<DocFile[]>(INITIAL_DOCS);
  const [selectedDoc, setSelectedDoc] = useState<DocFile | null>(INITIAL_DOCS[0]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: DocFile[] = (Array.from(files) as File[]).map((f) => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      type: f.name.split('.').pop()?.toUpperCase() || 'FILE',
      category: 'Panel Uploads (USB / Storage)',
      contentSummary: `Uploaded by teacher on ${new Date().toLocaleDateString()}. Ready for classroom display and reference.`,
    }));

    setDocs((prev) => [...newDocs, ...prev]);
    onToast(`Added ${files.length} documents to panel reference library!`);
  };

  const removeDoc = (name: string) => {
    setDocs((prev) => prev.filter((d) => d.name !== name));
    if (selectedDoc?.name === name) setSelectedDoc(null);
    onToast('Document removed from library.');
  };

  return (
    <div id="screen-refs" className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-2 tracking-tight flex items-center gap-2">
          <span>📂</span>
          <span>Reference Library</span>
        </h2>
        <p className="text-[#64748b] text-[15px] mb-5">
          Select PDF textbooks, question banks, or notes from your panel's USB drive, internal storage, or pre-loaded commerce repository.
        </p>

        {/* Drag and Drop File Upload Area */}
        <label
          htmlFor="refFiles"
          className="border-2 border-dashed border-blue-400/80 bg-blue-50/40 hover:bg-blue-50 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition text-center"
        >
          <Upload className="w-10 h-10 text-blue-600 mb-2" />
          <span className="font-bold text-base text-slate-800">
            Click to Browse or Drag & Drop Classroom Files
          </span>
          <span className="text-xs text-slate-500 mt-1">
            Supports PDF textbooks, DOCX case studies, PPTX slide decks, and TXT notes
          </span>
          <input
            type="file"
            id="refFiles"
            multiple
            accept=".pdf,.docx,.pptx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        {/* Documents Grid and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* List of files (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-bold text-base text-slate-900 mb-3 flex items-center justify-between">
              <span>Available Course Documents ({docs.length})</span>
            </h3>

            <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {docs.map((doc, idx) => {
                const isSelected = selectedDoc?.name === doc.name;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDoc(doc)}
                    className={`p-4 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-blue-600 font-bold text-xs shrink-0">
                        {doc.type}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 truncate">{doc.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span>{doc.category}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDoc(doc.name);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                        title="Remove Document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Document Preview (5 cols) */}
          <div className="lg:col-span-5">
            {selectedDoc ? (
              <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-400 mb-2">
                    <span>{selectedDoc.category}</span>
                    <span>{selectedDoc.type} • {selectedDoc.size}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-4 leading-snug">
                    {selectedDoc.name}
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs leading-relaxed font-sans mb-6">
                    <strong className="block text-white mb-1.5">Document Content & Syllabus Summary:</strong>
                    {selectedDoc.contentSummary}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800">
                  <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    Available offline on interactive panel
                  </div>
                  <button
                    onClick={() => onToast(`Viewing ${selectedDoc.name} on panel screen.`)}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/30"
                  >
                    <Eye className="w-4 h-4" />
                    Present on Smart Panel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400 text-sm h-full flex items-center justify-center">
                Select a document from the list to preview details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
