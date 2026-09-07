import React, { useState } from 'react';
import { Send, Volume2, Copy, Check, Sparkles, MessageSquare, Bot } from 'lucide-react';

interface Props {
  onToast?: (msg: string) => void;
  onSpeak?: (text: string) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SAMPLE_PROMPTS = [
  'Give me an intuitive real-world analogy to explain Debit and Credit without confusing beginners.',
  'How do I illustrate Deflationary Gap and Excess Supply on the whiteboard using aggregate curves?',
  'What is a 5-minute interactive classroom activity to demonstrate Taylor’s Functional Foremanship?',
  'Explain the new pecuniary jurisdiction limits under Consumer Protection Act 2019 clearly for students.',
];

export const TalkToAIScreen: React.FC<Props> = ({ onToast = (_msg: string) => {}, onSpeak = (_text: string) => {} }) => {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am your Senior Secondary Commerce Pedagogical Assistant. Ask me how to introduce a difficult chapter, resolve a student misconception, generate board exam dilemmas, or connect textbook balance sheets to modern corporate events in India.',
    },
  ]);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleAsk = (queryToAsk?: string) => {
    const q = queryToAsk || input;
    if (!q.trim()) return;

    const userMsg: Message = { role: 'user', content: q };
    let aiResponse = '';

    if (q.toLowerCase().includes('debit') || q.toLowerCase().includes('credit')) {
      aiResponse = `TEACHING ANALOGY FOR DEBIT & CREDIT:\n\n1. The "Two Hands" Destination Analogy:\nTell students: "Every rupee in a business moves from an origin (giver/source) to a destination (receiver/destination)."\n• Debit = The Destination (Where did the value go? Did it enter our bank account? Did it purchase machinery? Did it pay an expense?)\n• Credit = The Source (Where did the value come from? Did our bank balance decrease? Did our liability increase? Did we make a sale?)\n\n2. The Golden Equation Anchor:\nWrite Assets + Expenses = Liabilities + Equity + Revenue.\nLeft-hand side increases with DEBIT. Right-hand side increases with CREDIT. This prevents them from memorizing 10 separate rules.`;
    } else if (q.toLowerCase().includes('deflation') || q.toLowerCase().includes('gap') || q.toLowerCase().includes('aggregate')) {
      aiResponse = `VISUAL BOARD TECHNIQUE: DEFLATIONARY GAP\n\n1. Whiteboard Diagram Setup:\n• Draw a 45-degree Aggregate Supply (AS = Y) line starting from the origin.\n• Plot Aggregate Demand curve AD = C + I.\n• Mark Full Employment point E where AD intersects AS at income Yf.\n\n2. The Gap Visual:\n• Draw an actual demand curve AD1 falling strictly BELOW the required full employment demand.\n• Drop a vertical dashed line down from point E on the AS line to AD1.\n• Shade the vertical distance between the two curves in RED and label it "Deflationary Gap (Deficient Demand)".\n\n3. Student Checking Question:\nAsk: "What does this vertical distance represent in the real world?"\nAnswer: It represents unsold goods piling up in factory warehouses, leading directly to production cuts and involuntary unemployment.`;
    } else if (q.toLowerCase().includes('taylor') || q.toLowerCase().includes('foreman')) {
      aiResponse = `5-MINUTE CLASSROOM ACTIVITY: FUNCTIONAL FOREMANSHIP\n\n1. The Setup:\nAppoint 1 student as the "Worker" at the center board trying to assemble a model product (e.g. folding and stamping paper registers).\n\n2. The 8 Specialists:\nAssign 8 students with badge labels:\n• Planning Incharges: Instruction Card Clerk, Route Clerk, Time & Cost Clerk, Disciplinarian.\n• Production Incharges: Speed Boss, Gang Boss, Repair Boss, Inspector.\n\n3. The Demonstration:\nHave each specialist give one precise instruction according to their domain. Students immediately understand why Taylor split the foreman role into 8 experts, and why this directly conflicts with Fayol's Unity of Command (one boss).`;
    } else {
      aiResponse = `PEDAGOGICAL STRATEGY FOR: "${q}"\n\n1. Concept Hook (First 2 Minutes):\nBegin by writing a counter-intuitive corporate dilemma on the board. Solicit 2 hypotheses from students before referencing textbook rules.\n\n2. Whiteboard Framework:\n• Break the concept into 3 concise stages: Statutory Assumption, Formula / Journal Entry, and Final Balance presentation.\n• Always maintain a separate "Working Notes" column on the right 25% of the board.\n\n3. Board Trap Warning:\nRemind the class of standard deduction penalties in CBSE/ISC (e.g., missing narrations, omitted dates, or calculation signs).`;
    }

    setMessages((prev) => [...prev, userMsg, { role: 'assistant', content: aiResponse }]);
    setInput('');
    onToast('AI generated pedagogical recommendation.');
  };

  const copyLatest = () => {
    const lastMsg = messages[messages.length - 1]?.content || '';
    navigator.clipboard.writeText(lastMsg);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    onToast('Copied assistant reply!');
  };

  return (
    <div id="screen-talk" className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white border border-[#cbd5e1] rounded-2xl p-7 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
        <h2 className="text-[24px] font-extrabold text-[#0f172a] mb-2 tracking-tight flex items-center gap-2">
          <span>💬</span>
          <span>Talk to AI Assistant</span>
        </h2>
        <p className="text-[#64748b] text-[15px] mb-4">
          Ask curriculum questions, explore classroom analogies, or discover fresh ways to explain difficult commerce dilemmas.
        </p>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SAMPLE_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleAsk(prompt)}
              className="px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-semibold border border-blue-200 transition cursor-pointer text-left"
            >
              💡 {prompt}
            </button>
          ))}
        </div>

        {/* Chat History Box */}
        <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 max-h-[460px] overflow-y-auto mb-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white ml-8 shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-800 mr-8 shadow-xs font-sans whitespace-pre-wrap select-text'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 text-xs font-bold opacity-75">
                <span>{m.role === 'user' ? 'Teacher Query' : 'AI Pedagogical Assistant'}</span>
                {m.role === 'assistant' && (
                  <button
                    onClick={() => onSpeak(m.content)}
                    className="hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Speak
                  </button>
                )}
              </div>
              <div>{m.content}</div>
            </div>
          ))}
        </div>

        {/* Input & Action */}
        <div className="space-y-3">
          <textarea
            id="chatInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            placeholder="Ask a pedagogical or curriculum question for your classroom..."
            className="w-full border-[1.5px] border-[#cbd5e1] rounded-xl p-4 text-[15px] bg-white focus:outline-blue-600 resize-y"
          />

          <div className="flex justify-between items-center flex-wrap gap-2">
            <button
              onClick={() => handleAsk()}
              className="px-6 py-3 rounded-xl bg-[#2563eb] text-white hover:bg-[#1d4ed8] text-[15px] font-bold shadow-md shadow-[#2563eb]/20 transition cursor-pointer flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Ask Assistant
            </button>

            <button
              onClick={copyLatest}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {isCopied ? 'Copied' : 'Copy Latest Answer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
