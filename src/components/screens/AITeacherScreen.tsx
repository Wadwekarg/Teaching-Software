import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, Sparkles, AlertTriangle, Lightbulb, RotateCcw } from 'lucide-react';
import { COMMERCE_SUBJECTS } from '../../data/commerceCurriculum';

interface Props {
  initialSubject?: string;
  initialTopic?: string;
  onToast?: (msg: string) => void;
  onSpeak?: (text: string) => void;
}

export const AITeacherScreen: React.FC<Props> = ({
  initialSubject = 'Accountancy',
  initialTopic = 'Partnership - Goodwill Valuation by Super Profit',
  onToast = (_msg: string) => {},
  onSpeak = (_text: string) => {},
}) => {
  const [teachingMode, setTeachingMode] = useState<string>('Smart (Proactive Suggestions)');
  const [selectedClass, setSelectedClass] = useState<string>('Class 12');
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [topic, setTopic] = useState<string>(initialTopic);
  const [teacherInstruction, setTeacherInstruction] = useState<string>(
    'Give a practical commerce example and a 2-minute board question'
  );
  const [output, setOutput] = useState<string>(
    `AI TEACHER (Smart Mode)\n\nTopic: ${initialTopic}\nSubject: ${initialSubject} (${selectedClass})\n\nTEACHING PROPOSAL & LESSON HOOK:\n1. 3-Minute Relatable Business Hook:\n   Ask the class: "If Reliance buys out a successful retail competitor for ₹500 Crore, but their physical stores and inventory are only worth ₹380 Crore, what is Reliance paying the remaining ₹120 Crore for?" Guide them directly to Intangible Goodwill.\n\n2. Core Formula on Board:\n   • Normal Profit = Capital Employed × Normal Rate of Return (NRR) / 100\n   • Super Profit = Actual Average Adjusted Profit - Normal Profit\n   • Goodwill = Super Profit × Number of Years' Purchase\n\n3. Board Trap Warning:\n   Remind students: Always exclude Non-Trade Investments from Capital Employed before computing Normal Profit!\n\n4. Rapid 2-Minute Checkpoint Challenge:\n   "A firm earns ₹80,000. Capital employed is ₹5,00,000, NRR is 10%. Calculate Goodwill at 3 years purchase of Super Profit."\n   (Solution: NP = 50,000; SP = 30,000; Goodwill = ₹90,000).`
  );
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const generateAIProposal = (overrideInstruction?: string) => {
    const instruction = overrideInstruction || teacherInstruction;
    const currentSubData = COMMERCE_SUBJECTS.find((s) => s.name === selectedSubject);
    const matchedTopic = currentSubData?.topics.find((t) => t.name.toLowerCase().includes(topic.toLowerCase()));

    const hook = matchedTopic?.realWorldHook || `Relate ${topic} to recent corporate balance sheets and market events in India.`;
    const trap = matchedTopic?.boardTrap || `Ensure working note references and calculation signs are strictly labeled per board evaluation scheme.`;
    const concepts = matchedTopic?.keyConcepts || [`Core principle definitions`, `Step-by-step calculation format`, `Statutory disclosure requirements`];

    const result = `AI TEACHER (${teachingMode.toUpperCase()})\n\n${selectedClass} • ${selectedSubject}\nTOPIC: ${topic}\nINSTRUCTION: ${instruction}\n\n1. CONCEPT DEFINITION & FOUNDATION\n• Definition: Structured academic definition aligned to Senior Secondary Commerce.\n• Key Principles:\n  ${concepts.map((c) => `  - ${c}`).join('\n')}\n\n2. REAL-WORLD COMMERCE HOOK\n• ${hook}\n\n3. STEP-BY-STEP BOARD WORKFLOW\n• Step 1: Write given figures and identify defaults or missing values in working notes.\n• Step 2: Apply the core mathematical or journal entry rule.\n• Step 3: Present final balanced figures with clear narrations.\n\n4. BOARD EXAM TRAP ALERT\n⚠️ ${trap}\n\n5. CLASSROOM CHECKPOINT (2 MINUTES)\n"Given the scenario above, what specific adjustment must be made prior to finalizing the ledger or calculating final profit?"\nCall on 2 students to verbalize the working note before revealing the model solution.`;

    setOutput(result);
    onToast('AI teaching proposal generated!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    onToast('Copied teaching notes to clipboard!');
  };

  return (
    <div id="screen-ai" className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-in fade-in duration-150">
      {/* Left Column: Form & Output (7 cols) */}
      <div className="lg:col-span-7 space-y-4">
        <div className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
          <h2 className="text-[22px] font-extrabold text-[#0f172a] mb-4 flex items-center gap-2">
            <span>🤖</span>
            <span>AI Classroom Teacher</span>
          </h2>

          <div className="space-y-3.5">
            {/* Mode */}
            <div>
              <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Teaching Mode</label>
              <select
                id="aiMode"
                value={teachingMode}
                onChange={(e) => setTeachingMode(e.target.value)}
                className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] font-medium bg-white focus:outline-blue-600 cursor-pointer"
              >
                <option>Assistant (Interactive)</option>
                <option>Smart (Proactive Suggestions)</option>
                <option>Autonomous (Continuous Prompting)</option>
              </select>
            </div>

            {/* Row: Class & Subject */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Class</label>
                <select
                  id="aiClass"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] font-medium bg-white focus:outline-blue-600 cursor-pointer"
                >
                  <option>Class 11</option>
                  <option>Class 12</option>
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Subject</label>
                <select
                  id="aiSubject"
                  value={selectedSubject}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value);
                    const sub = COMMERCE_SUBJECTS.find((s) => s.name === e.target.value);
                    if (sub && sub.topics.length > 0) {
                      setTopic(sub.topics[0].name);
                    }
                  }}
                  className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] font-medium bg-white focus:outline-blue-600 cursor-pointer"
                >
                  <option>Accountancy</option>
                  <option>Economics</option>
                  <option>Business Studies</option>
                  <option>Applied Mathematics</option>
                </select>
              </div>
            </div>

            {/* Topic / Concept */}
            <div>
              <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Topic / Concept</label>
              <input
                id="aiTopic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Partnership - Goodwill Valuation by Super Profit"
                className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600"
              />
            </div>

            {/* Teacher Instruction */}
            <div>
              <label className="block text-[14px] font-bold text-[#475569] mb-1.5">Teacher Instruction</label>
              <input
                id="aiCommand"
                type="text"
                value={teacherInstruction}
                onChange={(e) => setTeacherInstruction(e.target.value)}
                placeholder="e.g. Give a practical commerce example and a 2-minute board question"
                className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl px-4 py-3 text-[15px] bg-white focus:outline-blue-600"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={() => generateAIProposal()}
                className="px-5 py-3 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] text-[15px] font-bold shadow-md shadow-[#2563eb]/20 transition cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Generate Suggestion
              </button>
              <button
                onClick={() => onSpeak(output)}
                className="px-4 py-3 rounded-xl border border-[#cbd5e1] bg-white hover:bg-slate-50 text-[#0f172a] text-[15px] font-bold transition cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
                Speak Aloud
              </button>
              <button
                onClick={copyToClipboard}
                className="px-4 py-3 rounded-xl border border-[#cbd5e1] bg-white hover:bg-slate-50 text-[#0f172a] text-[15px] font-bold transition cursor-pointer flex items-center gap-2 shadow-xs"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* AI Output Area */}
          <div
            id="aiOut"
            className="mt-5 p-5 rounded-xl bg-[#f8fafc] border-[1.5px] border-dashed border-[#cbd5e1] text-[#0f172a] font-mono text-[14px] leading-relaxed whitespace-pre-wrap select-text max-h-[420px] overflow-y-auto"
          >
            {output}
          </div>
        </div>
      </div>

      {/* Right Column: Smart Panel Triggers (5 cols) */}
      <div className="lg:col-span-5 space-y-4">
        <div className="bg-white border border-[#cbd5e1] rounded-2xl p-6 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
          <h2 className="text-[20px] font-extrabold text-[#0f172a] mb-1">
            Smart Panel Triggers
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Tap any trigger to inject immediate pedagogical tactics onto the interactive screen.
          </p>

          <div className="space-y-3">
            {/* 1. Real World Commerce Hook */}
            <div
              onClick={() => {
                setTeacherInstruction('Generate a strong real-world Indian corporate case study and hook for this topic.');
                generateAIProposal('Generate a strong real-world Indian corporate case study and hook for this topic.');
              }}
              className="p-4 rounded-xl bg-blue-50/80 border-l-[5px] border-[#2563eb] text-[14px] text-slate-800 cursor-pointer hover:bg-blue-100/70 transition"
            >
              <div className="flex items-center gap-2 text-[#1e3a8a] font-bold text-[15px] mb-1">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                Real-World Commerce Hook
              </div>
              Connect textbook debit/credit or elasticity directly to modern corporate examples (e.g. Zomato, Reliance, RBI rate hikes).
            </div>

            {/* 2. Board Question Checkpoint */}
            <div
              onClick={() => {
                setTeacherInstruction('Create a 2-minute checkpoint dilemma and multiple choice problem for students.');
                generateAIProposal('Create a 2-minute checkpoint dilemma and multiple choice problem for students.');
              }}
              className="p-4 rounded-xl bg-blue-50/80 border-l-[5px] border-[#2563eb] text-[14px] text-slate-800 cursor-pointer hover:bg-blue-100/70 transition"
            >
              <div className="flex items-center gap-2 text-[#1e3a8a] font-bold text-[15px] mb-1">
                <span>❓</span>
                Board Question Checkpoint
              </div>
              Pause mid-lecture and place a multiple-choice dilemma on the panel screen.
            </div>

            {/* 3. Board Exam Trap Alert */}
            <div
              onClick={() => {
                setTeacherInstruction('Highlight the most common mistakes and traps CBSE/ISC students make in this question.');
                generateAIProposal('Highlight the most common mistakes and traps CBSE/ISC students make in this question.');
              }}
              className="p-4 rounded-xl bg-amber-50/80 border-l-[5px] border-amber-500 text-[14px] text-slate-800 cursor-pointer hover:bg-amber-100/70 transition"
            >
              <div className="flex items-center gap-2 text-amber-900 font-bold text-[15px] mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Board Exam Trap Alert
              </div>
              Flag standard examination pitfalls (e.g., date of partner admission, interest on drawings calculation rules).
            </div>

            {/* 4. 3-Minute Rapid Recap */}
            <div
              onClick={() => {
                setTeacherInstruction('Give a 3-minute rapid formula summary and key journal format recap.');
                generateAIProposal('Give a 3-minute rapid formula summary and key journal format recap.');
              }}
              className="p-4 rounded-xl bg-emerald-50/80 border-l-[5px] border-emerald-500 text-[14px] text-slate-800 cursor-pointer hover:bg-emerald-100/70 transition"
            >
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-[15px] mb-1">
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                3-Minute Rapid Recap
              </div>
              Synthesize formula and journal formats before dismissal.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
