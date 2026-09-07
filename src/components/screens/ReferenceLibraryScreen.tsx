import React, { useState } from 'react';
import { ReferenceDoc, SlideDeck } from '../../types';
import { DEFAULT_REFERENCE_DOCS, GeneratedQuestion } from '../../data/referenceDecks';
import { DocQuestionGeneratorModal } from '../reference/DocQuestionGeneratorModal';
import { DocPPTGeneratorModal } from '../reference/DocPPTGeneratorModal';
import {
  Upload,
  FileText,
  Trash2,
  Sparkles,
  Presentation,
  Check,
  Eye,
  HelpCircle,
  FolderOpen,
} from 'lucide-react';

interface Props {
  docs?: ReferenceDoc[];
  onUpdateDocs?: (docs: ReferenceDoc[]) => void;
  onTeachDeckOnWhiteboard?: (deck: SlideDeck) => void;
  onSendQuestionsToQuiz?: (questions: GeneratedQuestion[], docName: string) => void;
  onNavigateToPPTMaker?: (doc: ReferenceDoc) => void;
  onToast?: (msg: string) => void;
}

export const ReferenceLibraryScreen: React.FC<Props> = ({
  docs = DEFAULT_REFERENCE_DOCS,
  onUpdateDocs,
  onTeachDeckOnWhiteboard = (_deck: SlideDeck) => {},
  onSendQuestionsToQuiz = (_questions: GeneratedQuestion[], _docName: string) => {},
  onNavigateToPPTMaker,
  onToast = (_msg: string) => {},
}) => {
  const [internalDocs, setInternalDocs] = useState<ReferenceDoc[]>(docs);
  const [selectedDoc, setSelectedDoc] = useState<ReferenceDoc | null>(docs[0] || null);

  // Modals state
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState<boolean>(false);
  const [isPPTModalOpen, setIsPPTModalOpen] = useState<boolean>(false);

  const activeDocs = onUpdateDocs ? docs : internalDocs;

  const updateDocuments = (newDocs: ReferenceDoc[]) => {
    if (onUpdateDocs) {
      onUpdateDocs(newDocs);
    } else {
      setInternalDocs(newDocs);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const addedDocs: ReferenceDoc[] = (Array.from(files) as File[]).map((f) => ({
      id: `ref-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      type: f.name.split('.').pop()?.toUpperCase() || 'FILE',
      category: 'Panel Uploads (USB / Storage)',
      contentSummary: `Uploaded by teacher on ${new Date().toLocaleDateString()}. Ready for question generation, PPT synthesis, and interactive whiteboard teaching.`,
      uploadedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));

    const updated = [...addedDocs, ...activeDocs];
    updateDocuments(updated);
    setSelectedDoc(addedDocs[0]);
    onToast(`Added ${files.length} document${files.length > 1 ? 's' : ''} to reference library!`);
  };

  const removeDoc = (id: string) => {
    const updated = activeDocs.filter((d) => d.id !== id);
    updateDocuments(updated);
    if (selectedDoc?.id === id) {
      setSelectedDoc(updated[0] || null);
    }
    onToast('Document removed from library.');
  };

  return (
    <div id="screen-refs" className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-2">
          <h2 className="text-[24px] font-extrabold text-[#0f172a] tracking-tight flex items-center gap-2">
            <span>📂</span>
            <span>Reference Library & AI Material Studio</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
              Class 11-12 Commerce Repository
            </span>
          </div>
        </div>
        <p className="text-[#64748b] text-[15px] mb-5">
          Select or upload PDF textbooks, syllabus outlines, or question banks from your panel's USB drive. Instantly <strong className="text-slate-800">prepare PowerPoint slides</strong> or <strong className="text-slate-800">generate examination questions</strong> directly from any uploaded material.
        </p>

        {/* Drag and Drop File Upload Area */}
        <label
          htmlFor="refFiles"
          className="border-2 border-dashed border-blue-400 bg-blue-50/40 hover:bg-blue-50 rounded-2xl p-7 flex flex-col items-center justify-center cursor-pointer transition text-center shadow-2xs"
        >
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mb-2">
            <Upload className="w-8 h-8" />
          </div>
          <span className="font-bold text-base text-slate-800">
            Click to Browse or Drag & Drop Course Files Here
          </span>
          <span className="text-xs text-slate-500 mt-1">
            Supports PDF textbooks, DOCX case studies, PPTX slide decks, and TXT revision notes
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
              <span>Course Documents ({activeDocs.length})</span>
              <span className="text-xs text-slate-400 font-normal">
                Click any file to generate PPT or Questions
              </span>
            </h3>

            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {activeDocs.map((doc) => {
                const isSelected = selectedDoc?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`p-4 rounded-xl border transition flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
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

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Quick action buttons on card */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoc(doc);
                          setIsQuestionModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-amber-50 text-amber-800 border border-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        title="Generate questions from this document"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span className="hidden sm:inline">Questions</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoc(doc);
                          setIsPPTModalOpen(true);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-800 border border-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        title="Prepare PPT from this document"
                      >
                        <Presentation className="w-3.5 h-3.5 text-blue-600" />
                        <span className="hidden sm:inline">PPT</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeDoc(doc.id);
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

          {/* Document Preview & Direct Generator Panel (5 cols) */}
          <div className="lg:col-span-5">
            {selectedDoc ? (
              <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-lg h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-400 mb-2">
                    <span>{selectedDoc.category}</span>
                    <span>{selectedDoc.type} • {selectedDoc.size}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3 leading-snug">
                    {selectedDoc.name}
                  </h4>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs leading-relaxed font-sans mb-4">
                    <strong className="block text-white mb-1.5">Document Content & Syllabus Summary:</strong>
                    {selectedDoc.contentSummary}
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-2 mb-4">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 flex items-center justify-between">
                      <span>⚡ Questions Engine:</span>
                      <span className="font-bold text-amber-400">MCQ, Assertion & 6-Mark</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-200 flex items-center justify-between">
                      <span>📊 PPT Presentation:</span>
                      <span className="font-bold text-blue-400">16:9 Panel Deck Ready</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons for Uploaded Material */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  {/* Generate Questions Button */}
                  <button
                    onClick={() => setIsQuestionModalOpen(true)}
                    className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-600/30 active:scale-98 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Questions from this Document</span>
                  </button>

                  {/* Prepare PPT Button */}
                  <button
                    onClick={() => setIsPPTModalOpen(true)}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/30 active:scale-98 transition"
                  >
                    <Presentation className="w-4 h-4" />
                    <span>Prepare PPT from this Document</span>
                  </button>

                  <div className="text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1.5 pt-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Ready for live stylus markup on Whiteboard</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl border border-dashed border-slate-300 text-center text-slate-400 text-sm h-full flex items-center justify-center">
                Select a document from the list to preview details and generate resources.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Question Generator Modal */}
      <DocQuestionGeneratorModal
        isOpen={isQuestionModalOpen}
        doc={selectedDoc}
        onClose={() => setIsQuestionModalOpen(false)}
        onLaunchIntoQuizMaker={(questions, docName) => {
          onSendQuestionsToQuiz(questions, docName);
        }}
        onToast={onToast}
      />

      {/* PPT Generator Modal */}
      <DocPPTGeneratorModal
        isOpen={isPPTModalOpen}
        doc={selectedDoc}
        onClose={() => setIsPPTModalOpen(false)}
        onTeachOnWhiteboard={(deck) => {
          onTeachDeckOnWhiteboard(deck);
        }}
        onNavigateToPPTMaker={onNavigateToPPTMaker}
        onToast={onToast}
      />
    </div>
  );
};
