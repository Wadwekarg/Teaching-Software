import React, { useState } from 'react';
import { Volume2, Copy, Check, Download, FileText } from 'lucide-react';
import { COMMERCE_SUBJECTS } from '../../data/commerceCurriculum';

interface Props {
  initialSubject?: string;
  initialTopic?: string;
  onToast?: (msg: string) => void;
  onSpeak?: (text: string) => void;
}

export const NotesMakerScreen: React.FC<Props> = ({
  initialSubject = 'Accountancy',
  initialTopic = 'Forfeiture & Reissue of Shares',
  onToast = (_msg: string) => {},
  onSpeak = (_text: string) => {},
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('Class 12');
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [topic, setTopic] = useState<string>(initialTopic);
  const [notesDepth, setNotesDepth] = useState<string>('Comprehensive classroom notes');
  const [output, setOutput] = useState<string>(
    `${selectedClass} • ${selectedSubject}\nTOPIC: ${initialTopic}\n\n1. CONCEPT DEFINITION & REGULATORY PROVISIONS\nForfeiture of shares represents the cancellation of membership and shares allotted to a shareholder who defaults on payment of allotment or call money after due statutory notice (minimum 14 days) under Companies Act provisions.\n\n2. ACCOUNTING WORKFLOW & JOURNAL ENTRIES\n• At the time of Forfeiture:\n  Share Capital A/c ... Dr. [No. of shares forfeited × Called-up value]\n  Securities Premium A/c ... Dr. [Only if premium was called and NOT received]\n    To Share Allotment / Calls in Arrears A/c [Amount unpaid]\n    To Share Forfeiture A/c [Amount actually received towards share capital]\n  (Being shares forfeited for non-payment of calls)\n\n• At the time of Reissue:\n  Bank A/c ... Dr. [Amount received on reissue]\n  Share Forfeiture A/c ... Dr. [Discount allowed on reissue]\n    To Share Capital A/c [Face value credited as paid up]\n  (Being forfeited shares reissued)\n\n• Transfer to Capital Reserve:\n  Share Forfeiture A/c ... Dr.\n    To Capital Reserve A/c\n  (Being net gain on reissue of forfeited shares transferred to capital reserve)\n\n3. GOLDEN RULES & BOARD EXAM TRAPS\n• Golden Rule 1: Never cancel Securities Premium if it has already been received prior to forfeiture!\n• Golden Rule 2: Maximum permissible discount on reissue cannot exceed the amount forfeited on the shares reissued!\n• Golden Rule 3: If only a portion of forfeited shares are reissued, calculate proportional forfeiture credit before transferring to Capital Reserve.\n\n4. RAPID SUMMARY FOR READ-ALOUD & REVISION\nShares cancelled for non-payment. Capital is debited with called-up value, not nominal value. Unpaid calls are credited. Forfeiture receives money already collected. Profit on reissue goes to Capital Reserve.`
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const makeNotes = () => {
    const subData = COMMERCE_SUBJECTS.find((s) => s.name === selectedSubject);
    const matched = subData?.topics.find((t) => t.name.toLowerCase().includes(topic.toLowerCase()));

    const trap = matched?.boardTrap || 'Ensure working notes clearly show intermediate calculation steps.';
    const hook = matched?.realWorldHook || 'Connect with Indian corporate financing and market regulation.';
    const concepts = matched?.keyConcepts || ['Basic statutory definitions', 'Calculations and accounting treatment', 'Board evaluation norms'];

    let content = `${selectedClass} • ${selectedSubject}\nTOPIC: ${topic}\nDEPTH: ${notesDepth}\n\n`;

    if (notesDepth === 'Quick board revision notes') {
      content += `1. QUICK BOARD SUMMARY\n• Definition: Core standard treatment under CBSE/ISC syllabus.\n• Key Formulae / Entries:\n${concepts.map((c) => `  - ${c}`).join('\n')}\n\n2. KEYWORDS TO WRITE IN EXAMS\n• Statutory terms, accurate accounting equations, and working note references.\n\n3. EXAM PITFALL TO AVOID\n⚠️ ${trap}`;
    } else if (notesDepth === 'Exam-oriented formula & trap sheet') {
      content += `1. MASTER FORMULAE & RATIOS\n${concepts.map((c, i) => `[Rule ${i + 1}] ${c}`).join('\n')}\n\n2. BOARD EXAM FREQUENT TRAPS (CBSE/ISC)\n• Trap 1: ${trap}\n• Trap 2: Pay attention to dates of transactions (pro-rata monthly calculations vs full year).\n• Trap 3: Omission of narration in journal entries incurs direct penalty under CBSE marking scheme.\n\n3. HIGH-PROBABILITY EXAMINATION QUESTIONS\n• 3-Marker: Conceptual distinction and regulatory rule.\n• 6-Marker: Numerical problem with working notes.`;
    } else {
      content += `1. CONCEPT DEFINITION & REGULATORY PROVISIONS\nAuthoritative explanation in student-friendly terminology covering statutory foundations, economic assumptions, and operational rules for ${selectedClass}.\n\n2. REAL-WORLD COMMERCE LINKAGE\n• ${hook}\n\n3. STEP-BY-STEP BOARD WORK & WORKING NOTES\n${concepts.map((c, i) => `• Step ${i + 1}: ${c}`).join('\n')}\n\n4. COMMON MISTAKES TO AVOID IN BOARDS\n⚠️ ${trap}\n\n5. 3-MINUTE CLASS REVISION PROMPT\nReview working notes, verify debit/credit equilibrium, and check statutory disclosures.`;
    }

    setOutput(content);
    onToast('Generated classroom notes!');
  };

  const copyNotes = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    onToast('Notes copied to clipboard!');
  };

  const downloadText = () => {
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Notes_${selectedSubject}_${topic.replace(/[^a-z0-9]+/gi, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    onToast('Notes file downloaded!');
  };

  return (
    <div id="screen-notes" className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-2 tracking-tight flex items-center gap-2">
          <span>📝</span>
          <span>Notes Maker</span>
        </h2>
        <p className="text-[#64748b] text-[15px] mb-5">
          Generate structured classroom notes, exam revision sheets, and quick summaries ready for display on the interactive panel or read-aloud.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Class</label>
              <select
                id="nClass"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600 cursor-pointer"
              >
                <option>Class 11</option>
                <option>Class 12</option>
              </select>
            </div>
            <div>
              <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Subject</label>
              <select
                id="nSubject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600 cursor-pointer"
              >
                <option>Accountancy</option>
                <option>Economics</option>
                <option>Business Studies</option>
                <option>Applied Mathematics</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Topic</label>
            <input
              id="nTopic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Forfeiture & Reissue of Shares"
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600"
            />
          </div>

          <div>
            <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Notes Depth</label>
            <select
              id="nDepth"
              value={notesDepth}
              onChange={(e) => setNotesDepth(e.target.value)}
              className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600 cursor-pointer"
            >
              <option>Quick board revision notes</option>
              <option>Comprehensive classroom notes</option>
              <option>Exam-oriented formula & trap sheet</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={makeNotes}
              className="px-6 py-3 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] text-[15px] font-bold shadow-md shadow-[#2563eb]/20 transition cursor-pointer flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate Notes
            </button>
            <button
              onClick={() => onSpeak(output)}
              className="px-5 py-3 rounded-xl border border-[#cbd5e1] bg-white hover:bg-slate-50 text-[#0f172a] text-[15px] font-bold transition cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-blue-600" />
              Read Aloud
            </button>
            <button
              onClick={copyNotes}
              className="px-5 py-3 rounded-xl border border-[#cbd5e1] bg-white hover:bg-slate-50 text-[#0f172a] text-[15px] font-bold transition cursor-pointer flex items-center gap-2 shadow-xs"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {isCopied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={downloadText}
              className="px-5 py-3 rounded-xl border border-[#cbd5e1] bg-white hover:bg-slate-50 text-[#0f172a] text-[15px] font-bold transition cursor-pointer flex items-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4" />
              Download .txt
            </button>
          </div>
        </div>

        <div
          id="notesOut"
          className="mt-6 p-6 rounded-xl bg-[#f8fafc] border-[1.5px] border-dashed border-[#cbd5e1] text-[#0f172a] font-mono text-[14px] leading-relaxed whitespace-pre-wrap select-text max-h-[500px] overflow-y-auto"
        >
          {output}
        </div>
      </div>
    </div>
  );
};
