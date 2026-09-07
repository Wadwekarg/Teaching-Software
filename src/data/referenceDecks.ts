import { ReferenceDoc, SlideDeck, SlideItem } from '../types';

export const DEFAULT_REFERENCE_DOCS: ReferenceDoc[] = [
  {
    id: 'ref-1',
    name: 'CBSE_Class12_Accountancy_Syllabus_2025-26.pdf',
    size: '1.4 MB',
    type: 'PDF',
    category: 'Curriculum & Blueprint',
    contentSummary: 'Complete CBSE senior secondary accountancy blueprint: Partnership (36 marks), Company Accounts (24 marks), Financial Statement Analysis (20 marks). Important focus on Goodwill, Forfeiture of Shares, and Cash Flow indirect method.',
    uploadedAt: 'Pre-loaded Panel Library',
  },
  {
    id: 'ref-2',
    name: 'Macroeconomics_National_Income_Formula_Sheet.pdf',
    size: '890 KB',
    type: 'PDF',
    category: 'Formula Sheet',
    contentSummary: 'Value Added Method (GVA = Value of Output - Intermediate Consumption), Income Method (Compensation + Operating Surplus + Mixed Income), Expenditure Method adjustments, NFIA, NIT, and GDP Deflator formulas.',
    uploadedAt: 'Pre-loaded Panel Library',
  },
  {
    id: 'ref-3',
    name: 'Business_Studies_Chapterwise_Case_Studies.docx',
    size: '2.3 MB',
    type: 'DOCX',
    category: 'Question Bank',
    contentSummary: '80 real-world corporate case studies mapped to Henri Fayol principles, Taylor techniques (Functional Foremanship, Motion Study, Differential Piece Wage), Capital Structure leverage problems, and Consumer Protection Act 2019 remedies.',
    uploadedAt: 'Pre-loaded Panel Library',
  },
  {
    id: 'ref-4',
    name: 'Partnership_Dissolution_Ledger_Templates.pptx',
    size: '3.1 MB',
    type: 'PPTX',
    category: 'Board Slides',
    contentSummary: 'Realisation Account format, Treatment of unrecorded assets/liabilities, Partners Loan vs Capital Accounts settlement, and Cash/Bank Account equilibrium templates for classroom projection.',
    uploadedAt: 'Pre-loaded Panel Library',
  },
];

export const PRESET_SLIDE_DECKS: SlideDeck[] = [
  {
    id: 'deck-cashflow',
    title: 'Cash Flow Statement: Operating Activities',
    subject: 'Accountancy',
    gradeClass: 'Class 12',
    sourceDocName: 'AS-3 / Ind AS 7 Guidelines',
    slides: [
      {
        id: 's1',
        title: 'Cash Flow Statement: Operating Activities',
        subtitle: 'Class 12 Commerce • Accounting Standard 3 (Revised)',
        type: 'cover',
        footer: 'Smart Teaching Studio • Interactive Whiteboard Edition',
      },
      {
        id: 's2',
        title: 'Class Objectives & Conceptual Roadmap',
        subtitle: 'Key milestones for today’s 60-minute teaching period',
        type: 'roadmap',
        bulletPoints: [
          '1. Distinguish between Operating, Investing, and Financing cash flows in corporate entities',
          '2. Master the Indirect Method starting from Net Profit Before Tax & Extraordinary Items',
          '3. Apply the Golden Working Capital Rule: Current Assets (Invert), Current Liabilities (Follow)',
          '4. Solve 6-mark Board Exam illustration with Provision for Tax & Machinery adjustments',
        ],
        calloutBox: {
          title: 'Board Exam Weightage Alert',
          text: 'Cash Flow Statement carries a guaranteed 6-mark or 8-mark numerical question in CBSE Section B!',
          tone: 'amber',
        },
      },
      {
        id: 's3',
        title: 'Core Rules: Non-Cash & Working Capital Adjustments',
        subtitle: 'Why we add back Depreciation & how working capital changes affect cash',
        type: 'concept',
        bulletPoints: [
          'Add Non-Cash Expenses: Depreciation, Amortisation of Goodwill/Patents, Preliminary Expenses written off.',
          'Add Non-Operating Losses: Loss on sale of fixed assets / long-term investments.',
          'Deduct Non-Operating Incomes: Profit on sale of fixed assets, Dividend received, Rental income.',
          'Current Assets Rule: Decrease in Current Assets (+ Cash Inflow), Increase in Current Assets (- Cash Outflow).',
          'Current Liabilities Rule: Increase in Current Liabilities (+ Cash Inflow), Decrease in Current Liabilities (- Cash Outflow).',
        ],
        calloutBox: {
          title: 'Frequent Student Trap',
          text: 'Bank Overdraft and Cash Credit are FINANCING activities (short-term borrowings), NOT part of Working Capital changes!',
          tone: 'red',
        },
      },
      {
        id: 's4',
        title: 'Classroom Illustration & Board Ledger Table',
        subtitle: 'Step-by-step indirect reconciliation format',
        type: 'table',
        tableHeaders: ['Particulars (Reconciliation Item)', 'Details (₹)', 'Final Amount (₹)'],
        tableRows: [
          ['Net Profit before Tax and Extraordinary items', '', '2,80,000'],
          ['Add: Depreciation on Plant & Machinery', '45,000', ''],
          ['Add: Loss on Sale of Old Furniture', '12,000', ''],
          ['Less: Dividend received on non-trade shares', '(18,000)', '39,000'],
          ['Operating Profit before Working Capital Changes', '', '3,19,000'],
          ['Add: Decrease in Inventories / Stock', '25,000', ''],
          ['Less: Increase in Trade Receivables (Debtors)', '(32,000)', ''],
          ['Add: Increase in Trade Payables (Creditors)', '14,000', '7,000'],
          ['Cash Generated from Operations', '', '3,26,000'],
          ['Less: Income Tax actually paid during the year', '', '(40,000)'],
          ['Net Cash Flow from Operating Activities', '', '₹ 2,86,000'],
        ],
        calloutBox: {
          title: 'Stylus Note for Teachers',
          text: 'Use the Whiteboard Pen tool to circle the tax adjustment and explain the hidden Provision for Tax A/c ledger!',
          tone: 'blue',
        },
      },
      {
        id: 's5',
        title: 'Classroom Checkpoint: 2-Minute Student Dilemma',
        subtitle: 'Test your understanding before we begin individual textbook problems',
        type: 'quiz',
        quizQuestion: {
          question: 'Where will "Proposed Dividend for current financial year" and "Interim Dividend paid during the year" be shown?',
          options: [
            'A) Deducted as Operating Outflow and added to Investing Activities',
            'B) Added to NP before Tax in Operating AND shown as Financing Outflow',
            'C) Ignored completely under modern Indian Accounting Standards',
            'D) Recorded only in the Notes to Accounts without cash impact',
          ],
          answerIndex: 1,
          explanation: 'Dividends are appropriations of profit: they are added back to Net Profit in Operating (to find profit from operations) and subtracted under Financing Activities as cash outflows!',
        },
      },
      {
        id: 's6',
        title: 'Period Summary & Homework Allocation',
        subtitle: 'Key takeaways and practice assignment',
        type: 'summary',
        bulletPoints: [
          'Remember: Operating Cash Flow reflects core business liquidity independent of financial structure.',
          'Always verify if Tax is given as "Provision made" or "Tax paid" before preparing ledger accounts.',
          'Homework: Complete NCERT / T.S. Grewal Problem #14, #16, and #18 from Chapter 5.',
          'Next Period: Investing Activities (Purchase/Sale of Tangible & Intangible Fixed Assets).',
        ],
        calloutBox: {
          title: 'Board Exam Preparation Tip',
          text: 'Draw lines with the Whiteboard Journal Table tool to practice timed 12-minute exam presentations.',
          tone: 'emerald',
        },
      },
    ],
  },
  {
    id: 'deck-taylor',
    title: 'Principles of Scientific Management: F.W. Taylor',
    subject: 'Business Studies',
    gradeClass: 'Class 12',
    sourceDocName: 'NCERT Chapter 2: Principles of Management',
    slides: [
      {
        id: 't1',
        title: 'Principles of Scientific Management: F.W. Taylor',
        subtitle: 'Class 12 Commerce • Business Studies Core Theory',
        type: 'cover',
        footer: 'Smart Teaching Studio • Interactive Whiteboard Edition',
      },
      {
        id: 't2',
        title: 'Learning Objectives & Class Roadmap',
        subtitle: 'Understanding Taylor’s revolutionary factory shop-floor concepts',
        type: 'roadmap',
        bulletPoints: [
          '1. Contrast Rule of Thumb (trial & error) with Scientific Observation & Measurement',
          '2. Examine Taylor’s 4 Core Principles: Science not rule of thumb, Harmony not discord, Cooperation, and Maximum development',
          '3. Analyze 5 Scientific Techniques: Functional Foremanship, Motion Study, Time Study, Fatigue Study, and Differential Piece Wage',
          '4. Solve 4-mark CBSE case study identifying technique applied in modern automotive robotics',
        ],
      },
      {
        id: 't3',
        title: 'Taylor’s 4 Foundational Scientific Principles',
        subtitle: 'Moving from arbitrary supervisor whims to standardized best practices',
        type: 'concept',
        bulletPoints: [
          '1. Science, Not Rule of Thumb: Only one best method to maximize efficiency, discovered through study and investigation.',
          '2. Harmony, Not Discord: Mental Revolution between management and workers. Sharing prosperity instead of strikes and lockouts.',
          '3. Cooperation, Not Individualism: Paternalistic management; workers consulted before standard targets are fixed.',
          '4. Development of Each Person: Systematic selection and training according to scientific worker aptitude.',
        ],
        calloutBox: {
          title: 'Key Concept: Mental Revolution',
          text: 'A total shift in attitude of workers and management towards each other from competition to mutual cooperation!',
          tone: 'blue',
        },
      },
      {
        id: 't4',
        title: 'Functional Foremanship: 8 Specialized Foremen',
        subtitle: 'Separating Planning In-Charge from Execution In-Charge',
        type: 'table',
        tableHeaders: ['Planning In-Charge (Office)', 'Production / Execution In-Charge (Shop-Floor)'],
        tableRows: [
          ['1. Instruction Card Clerk (Drafts worker instructions)', '1. Gang Boss (Keeps machines & tools ready for work)'],
          ['2. Route Clerk (Specifies sequence of operations)', '2. Speed Boss (Ensures timely completion of job)'],
          ['3. Time & Cost Clerk (Prepares time & cost sheets)', '3. Repair Boss (Maintains machines in working condition)'],
          ['4. Disciplinarian (Ensures order and systematic rules)', '4. Inspector (Checks quality of finished goods)'],
        ],
        calloutBox: {
          title: 'Examiner Warning',
          text: 'Functional Foremanship deliberately violates Fayol’s Principle of "Unity of Command" because each worker reports to 8 bosses!',
          tone: 'red',
        },
      },
      {
        id: 't5',
        title: 'Classroom Checkpoint: Case Study Dilemma',
        subtitle: 'Analyze the situation and pick the right management technique',
        type: 'quiz',
        quizQuestion: {
          question: 'A manufacturing firm recorded employee arm movements via CCTV camera to eliminate redundant bending and tool lifting. Which Taylor technique is applied?',
          options: [
            'A) Fatigue Study',
            'B) Method Study',
            'C) Motion Study',
            'D) Differential Piece Wage System',
          ],
          answerIndex: 2,
          explanation: 'Motion study analyzes bodily movements (lifting, putting, sitting) to identify and eliminate unproductive motions, drastically reducing job completion time!',
        },
      },
    ],
  },
  {
    id: 'deck-national-income',
    title: 'Macroeconomics: National Income Aggregates',
    subject: 'Economics',
    gradeClass: 'Class 12',
    sourceDocName: 'Sandeep Garg & NCERT Macroeconomics',
    slides: [
      {
        id: 'n1',
        title: 'National Income & Related Aggregates',
        subtitle: 'Class 12 Economics • Income, Value Added & Expenditure Models',
        type: 'cover',
        footer: 'Smart Teaching Studio • Interactive Whiteboard Edition',
      },
      {
        id: 'n2',
        title: 'The 3 Conversion Bridge Rules',
        subtitle: 'Universal formulas to navigate between all 8 macroeconomic aggregates',
        type: 'concept',
        bulletPoints: [
          'Gross ⇄ Net: Gross Value = Net Value + Depreciation (Consumption of Fixed Capital)',
          'Domestic ⇄ National: National = Domestic + Net Factor Income from Abroad (NFIA)',
          'Market Price ⇄ Factor Cost: Market Price (MP) = Factor Cost (FC) + Net Indirect Taxes (NIT = Indirect Taxes - Subsidies)',
          'National Income = NNP at Factor Cost (NNP_FC)',
          'Domestic Income = NDP at Factor Cost (NDP_FC)',
        ],
        calloutBox: {
          title: 'Crucial Exam Warning',
          text: 'Net Factor Income TO Abroad means NFIA is NEGATIVE! Be careful with the algebraic signs during 6-mark board problems!',
          tone: 'amber',
        },
      },
      {
        id: 'n3',
        title: 'Income Method Breakdown: Factor Payments',
        subtitle: 'Sum of all factor incomes earned by resident production units',
        type: 'table',
        tableHeaders: ['Income Component', 'Sub-Items & Inclusions', 'CBSE Board Examination Traps'],
        tableRows: [
          ['1. Compensation of Employees (COE)', 'Wages & Salaries (Cash + Kind), Employer’s contribution to Social Security', 'Exclude Employee’s contribution! Only Employer’s portion is added.'],
          ['2. Operating Surplus (OS)', 'Rent + Royalty + Interest + Profit (Dividends + Undistributed Profits + Corporate Tax)', 'Government debt interest is non-productive interest: exclude from OS.'],
          ['3. Mixed Income of Self-Employed', 'Incomes of doctors, lawyers, farmers, small retail shop owners', 'Cannot be segregated into wage vs profit; taken as single composite sum.'],
          ['Domestic Income (NDP_FC)', 'COE + Operating Surplus + Mixed Income of Self-Employed', 'Add NFIA to arrive at National Income (NNP_FC).'],
        ],
      },
      {
        id: 'n4',
        title: 'Classroom Checkpoint: National Income Inclusions',
        subtitle: 'Identify whether the following transaction is included in National Income',
        type: 'quiz',
        quizQuestion: {
          question: 'Are "Old Age Pensions" paid by the Government included in National Income calculations?',
          options: [
            'A) Yes, because it is a direct transfer from central budget reserves',
            'B) No, because it is a unilateral transfer payment without any factor service in return',
            'C) Yes, provided the beneficiary resides within domestic economic territory',
            'D) Only if the recipient pays income tax on the pension amount',
          ],
          answerIndex: 1,
          explanation: 'Old age pensions, scholarships, and pocket money are Transfer Incomes (unilateral), so they do not reflect productive contribution and are strictly EXCLUDED from National Income!',
        },
      },
    ],
  },
];

/**
 * Creates an interactive SlideDeck from an uploaded ReferenceDoc
 */
export function createSlideDeckFromDoc(doc: ReferenceDoc): SlideDeck {
  const isAccountancy = doc.name.toLowerCase().includes('account') || doc.contentSummary.toLowerCase().includes('partnership') || doc.contentSummary.toLowerCase().includes('cash flow');
  const isEconomics = doc.name.toLowerCase().includes('econ') || doc.contentSummary.toLowerCase().includes('gdp') || doc.contentSummary.toLowerCase().includes('income') || doc.contentSummary.toLowerCase().includes('rbi');
  const subject = isAccountancy ? 'Accountancy' : isEconomics ? 'Economics' : 'Business Studies';

  const cleanTitle = doc.name
    .replace(/\.[^/.]+$/, '')
    .replace(/CBSE_Class12_/i, '')
    .replace(/_/g, ' ');

  return {
    id: `deck-${Date.now()}`,
    title: cleanTitle,
    subject: subject,
    gradeClass: 'Class 12',
    sourceDocName: doc.name,
    slides: [
      {
        id: 'gen-s1',
        title: cleanTitle,
        subtitle: `Class 12 ${subject} • Generated from Uploaded Reference Material`,
        type: 'cover',
        footer: `Source: ${doc.name} • Smart Teaching Whiteboard Deck`,
      },
      {
        id: 'gen-s2',
        title: 'Document Curriculum Blueprint & Objectives',
        subtitle: `Pedagogical breakdown based on uploaded reference: ${doc.category}`,
        type: 'roadmap',
        bulletPoints: [
          `1. Core Content: ${doc.contentSummary.slice(0, 110)}...`,
          `2. Examination Alignment: Senior Secondary CBSE marking scheme and standard answer rubric`,
          '3. Theory to Practical Integration: Formula derivations, ledger entries, and managerial applications',
          '4. Timed Classroom Assessment: Checkpoint diagnostics and common board pitfalls',
        ],
        calloutBox: {
          title: 'Reference Material Scope',
          text: `File: ${doc.name} (${doc.size} • ${doc.type}). Ready for stylus markup and live teaching on smart board.`,
          tone: 'blue',
        },
      },
      {
        id: 'gen-s3',
        title: 'Key Concepts, Definitions & Regulatory Framework',
        subtitle: 'Essential principles extracted directly from reference material',
        type: 'concept',
        bulletPoints: [
          `Regulatory Benchmark: All calculations and principles must adhere strictly to statutory provisions specified in ${cleanTitle}.`,
          'Step-by-step Execution: Document every intermediate step to capture partial marks under the CBSE marking scheme.',
          'Comparative Analysis: Contrast statutory mandate with real-world corporate practice in Indian public enterprises.',
          'Avoid Critical Errors: Scrutinize question assumptions, unrecorded liabilities, or omitted adjustments.',
        ],
        calloutBox: {
          title: 'Board Exam Trap to Highlight',
          text: 'Remind students to always show formal working notes beneath ledger tables or equations to secure full presentation marks!',
          tone: 'amber',
        },
      },
      {
        id: 'gen-s4',
        title: 'Worked Case Analysis & Analytical Ledger Table',
        subtitle: 'Classroom illustration structure for step-by-step whiteboard solving',
        type: 'table',
        tableHeaders: ['Step #', 'Curriculum Transaction / Concept', 'Mathematical / Ledger Rule', 'Board Solution Output'],
        tableRows: [
          ['1', 'Initial Identification', 'Identify called-up / base value from given parameters', 'Debit Base Account / Set Benchmark'],
          ['2', 'Adjustment Application', 'Apply statutory rate or valuation multiple per reference norm', 'Transfer to Revaluation / Working Note'],
          ['3', 'Settlement & Realisation', 'Verify cash, bank, or capital reserves impact', 'Balance Ledger Accounts / Reconcile'],
          ['4', 'Final Presentation', 'Disclose statutory working note in final balance sheet', 'Equilibrium achieved (Dr = Cr)'],
        ],
        calloutBox: {
          title: 'Stylus Teaching Tip',
          text: 'Use the Smart Teaching Studio Pen tool to write real classroom numbers into this template alongside students!',
          tone: 'emerald',
        },
      },
      {
        id: 'gen-s5',
        title: 'Classroom Checkpoint: 2-Minute Diagnostic',
        subtitle: 'Test comprehension of key principles from this reference document',
        type: 'quiz',
        quizQuestion: {
          question: `In standard examination problems concerning ${cleanTitle}, what is the mandatory requirement for full marks?`,
          options: [
            'A) Providing complete formal working notes with standard format headings',
            'B) Omitting comparative figures and narrations to save examination time',
            'C) Guessing final figures without intermediate algebraic or journal steps',
            'D) Using pencil for final ledger figures contrary to CBSE instructions',
          ],
          answerIndex: 0,
          explanation: 'Clear working notes, standard account formats, and precise narrations are strictly required to earn full 6-mark or 8-mark credit in board exams.',
        },
      },
      {
        id: 'gen-s6',
        title: 'Lesson Summary & Student Action Items',
        subtitle: 'Homework and revision tasks mapped to reference content',
        type: 'summary',
        bulletPoints: [
          `Review all key formulas and provisions highlighted from ${doc.name}.`,
          'Practice drawing the standard ledger/analytical formats under timed 8-minute conditions.',
          'Complete the attached checkpoint exercise questions in your classroom registers.',
          'Next session: Advanced numerical problems and past 5-year CBSE board paper questions.',
        ],
      },
    ],
  };
}

export interface GeneratedQuestion {
  id: number;
  question: string;
  type: 'MCQ' | 'Assertion-Reason' | '3-Mark Short' | '6-Mark Case Study';
  options?: string[];
  answer: string | number;
  explanation: string;
  marks: number;
}

/**
 * Generates custom examination and checkpoint questions directly from an uploaded reference document
 */
export function generateQuestionsFromDoc(doc: ReferenceDoc, count: number = 5): GeneratedQuestion[] {
  const isAccountancy = doc.name.toLowerCase().includes('account') || doc.contentSummary.toLowerCase().includes('partnership') || doc.contentSummary.toLowerCase().includes('cash flow');
  const isEconomics = doc.name.toLowerCase().includes('econ') || doc.contentSummary.toLowerCase().includes('income') || doc.contentSummary.toLowerCase().includes('national');

  const cleanName = doc.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');

  const questions: GeneratedQuestion[] = [
    {
      id: 1,
      type: 'MCQ',
      marks: 1,
      question: `According to the principles outlined in "${cleanName}", which of the following statements is strictly CORRECT for senior secondary board examinations?`,
      options: [
        'A) All statutory adjustments must be fully supported by clear working notes and recognized standard accounting/economic treatment',
        'B) Unrecorded assets and liabilities can be ignored if values are below ₹10,000',
        'C) Transfer payments must always be included in Domestic Income aggregates',
        'D) Capital Reserve transfers can be made prior to actual reissue of forfeited shares',
      ],
      answer: 0,
      explanation: `In standard syllabus examinations based on ${doc.category}, statutory compliance, matching principles, and explicit working notes are non-negotiable for obtaining full credit.`,
    },
    {
      id: 2,
      type: 'Assertion-Reason',
      marks: 1,
      question: `Assertion (A): Content in "${cleanName}" requires precise sequential execution of adjustments.\nReason (R): Omission of intermediate steps leads to cascade errors in final balance equilibrium.`,
      options: [
        'A) Both Assertion (A) and Reason (R) are true and (R) is the correct explanation of (A)',
        'B) Both Assertion (A) and Reason (R) are true, but (R) is NOT the correct explanation of (A)',
        'C) Assertion (A) is true, but Reason (R) is false',
        'D) Assertion (A) is false, but Reason (R) is true',
      ],
      answer: 0,
      explanation: 'Both statements are true. Sequential execution ensures that working capital, revaluation, or multiplier effects propagate accurately to final accounts.',
    },
    {
      id: 3,
      type: 'MCQ',
      marks: 1,
      question: `What is the key board examination pitfall that students must guard against when solving problems from "${cleanName}"?`,
      options: [
        'A) Confusing operational/domestic items with external financing or transfer payments',
        'B) Writing answers with blue or black ink contrary to CBSE rules',
        'C) Drawing double lines beneath balanced ledger accounts',
        'D) Calculating simple interest instead of compounding in capital accounts',
      ],
      answer: 0,
      explanation: 'The most common board examiner report mentions students confusing financing transactions with operating changes or treating transfer payments as productive output.',
    },
    {
      id: 4,
      type: '3-Mark Short',
      marks: 3,
      question: `Explain the fundamental three-step methodology required when tackling numerical questions based on: "${cleanName}". State the importance of disclosure in financial/economic statements.`,
      answer: 'Working Note Method: 1) Identify given opening balances and default/adjustment conditions; 2) Apply statutory formula or journal rule; 3) Reconcile final accounts with proper disclosure.',
      explanation: 'Step 1 earns 1 mark for parameter extraction, Step 2 earns 1 mark for correct computation, and Step 3 earns 1 mark for final disclosure with correct units (₹ or units).',
    },
    {
      id: 5,
      type: '6-Mark Case Study',
      marks: 6,
      question: `Comprehensive Case Study: A Class 12 Commerce enterprise encounters an unforeseen transaction covered in "${cleanName}". As the consulting CFO or economic analyst, prepare the complete analytical presentation with formal working notes.`,
      answer: 'Draft complete journal ledger table or macroeconomic aggregate reconciliation showing: a) Baseline parameters, b) Intermediate adjustments, c) Final balanced presentation.',
      explanation: 'CBSE marking scheme allocates: 2 marks for working notes, 3 marks for main ledger/calculation table, and 1 mark for precision in headings and narrations.',
    },
  ];

  return questions.slice(0, count);
}
