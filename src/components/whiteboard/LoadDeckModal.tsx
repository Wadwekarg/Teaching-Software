import React, { useState } from 'react';
import { SlideDeck, ReferenceDoc } from '../../types';
import { PRESET_SLIDE_DECKS, createSlideDeckFromDoc } from '../../data/referenceDecks';
import { CURATED_PAST_PAPERS, createDeckFromPastPaperTopic } from '../../data/pastPapersData';
import { X, Presentation, Upload, FileText, Check, Sparkles, Award } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectDeck: (deck: SlideDeck) => void;
  availableDocs: ReferenceDoc[];
  onToast?: (msg: string) => void;
}

export const LoadDeckModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectDeck,
  availableDocs,
  onToast = (_msg: string) => {},
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'pyq' | 'refs' | 'upload'>('presets');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fakeDoc: ReferenceDoc = {
      id: `up-${Date.now()}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      category: 'Uploaded for Whiteboard',
      contentSummary: `Slide presentation deck extracted from ${file.name} for interactive panel teaching.`,
      uploadedAt: new Date().toLocaleTimeString(),
    };

    const newDeck = createSlideDeckFromDoc(fakeDoc, { questionCount: 3 });
    onSelectDeck(newDeck);
    onToast(`Loaded presentation with ${newDeck.slides.filter(s => s.type === 'quiz').length} questions from "${file.name}" onto Whiteboard!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white border border-slate-300 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
              <Presentation className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Load Presentation on Whiteboard
              </h3>
              <p className="text-xs text-slate-500">
                Display PowerPoint slides directly on your interactive panel canvas and annotate over them
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
            className={`pb-3 text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'presets'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Standard Chapter Decks ({PRESET_SLIDE_DECKS.length})
          </button>
          <button
            onClick={() => setActiveTab('pyq')}
            className={`pb-3 text-sm font-bold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'pyq'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>🎯 Past 5-Yr Board Decks ({CURATED_PAST_PAPERS.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('refs')}
            className={`pb-3 text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'refs'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            From Reference Library ({availableDocs.length})
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-3 text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'upload'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Upload PPT / File
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {activeTab === 'presets' && (
            <div className="space-y-3">
              {PRESET_SLIDE_DECKS.map((deck) => (
                <div
                  key={deck.id}
                  onClick={() => {
                    onSelectDeck(deck);
                    onToast(`Loaded "${deck.title}" onto whiteboard!`);
                    onClose();
                  }}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
                      <span>{deck.gradeClass}</span>
                      <span>•</span>
                      <span>{deck.subject}</span>
                      <span>•</span>
                      <span>{deck.slides.length} Slides</span>
                      <span>•</span>
                      <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                        {deck.questionsCount || deck.slides.filter((s) => s.type === 'quiz').length} Questions
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900 truncate">
                      {deck.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Source: {deck.sourceDocName}
                    </p>
                  </div>
                  <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shrink-0 hover:bg-blue-700 transition">
                    Load Deck
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pyq' && (
            <div className="space-y-3">
              {CURATED_PAST_PAPERS.map((analysis) => {
                const pyqDeck = createDeckFromPastPaperTopic(analysis);
                return (
                  <div
                    key={pyqDeck.id}
                    onClick={() => {
                      onSelectDeck(pyqDeck);
                      onToast(`Loaded Past 5-Yr Board Questions for "${analysis.topic}" onto whiteboard!`);
                      onClose();
                    }}
                    className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 hover:border-blue-500 hover:bg-blue-50/70 transition cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-1">
                        <span>{analysis.gradeClass}</span>
                        <span>•</span>
                        <span>{analysis.subject}</span>
                        <span>•</span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-100 font-bold">
                          {analysis.questions.length} Past Questions
                        </span>
                        <span>•</span>
                        <span className="text-slate-500">{analysis.avgMarksWeightage}</span>
                      </div>
                      <h4 className="font-bold text-base text-slate-900 truncate">
                        {analysis.topic} (Past 5-Yr CBSE Questions)
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 truncate">
                        {analysis.fiveYearFrequency}
                      </p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shrink-0 hover:bg-blue-700 transition shadow-xs">
                      Load on Board
                    </button>
                  </div>
                );
              })}
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
                      const deck = createSlideDeckFromDoc(doc, { questionCount: 3 });
                      onSelectDeck(deck);
                      onToast(`Created and loaded presentation with 3 questions from "${doc.name}"!`);
                      onClose();
                    }}
                    className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition cursor-pointer flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.category}</span>
                        <span>•</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          Includes 3 Checkpoint Questions
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-slate-900 truncate">
                        {doc.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                        {doc.contentSummary}
                      </p>
                    </div>
                    <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shrink-0 hover:bg-emerald-700 transition flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Prepare & Load</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4 py-2">
              <label
                htmlFor="panelPptUpload"
                className="border-2 border-dashed border-blue-400 bg-blue-50/40 hover:bg-blue-50 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition text-center"
              >
                <Upload className="w-12 h-12 text-blue-600 mb-3" />
                <span className="font-bold text-base text-slate-800">
                  Select PPTX, PDF, or Course Document
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Upload from Panel USB Drive, Download Folder, or Local Disk
                </span>
                <input
                  type="file"
                  id="panelPptUpload"
                  accept=".pptx,.pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                <strong className="block text-slate-800 mb-1">Interactive Board Feature:</strong>
                Slides will be structured into high-contrast classroom cards with learning goals, analytical tables, and checkpoint quizzes. You can annotate directly over every slide with your stylus or finger.
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
