import { BoardPdfDoc, ReferenceDoc, PdfPage } from '../types';

export const PRESET_BOARD_PDF_DOCS: BoardPdfDoc[] = [
  {
    id: 'pdf-accountancy-syllabus',
    title: 'CBSE Class 12 Accountancy Official Syllabus & Question Blueprint (2025-26)',
    fileName: 'CBSE_Class12_Accountancy_Syllabus_2025-26.pdf',
    subject: 'Accountancy',
    gradeClass: 'Class 12',
    category: 'Curriculum & Blueprint',
    fileSize: '1.4 MB',
    totalPages: 4,
    sourceDocId: 'ref-1',
    pages: [
      {
        pageNumber: 1,
        title: 'CBSE Board Examination Blueprint & Marks Weightage',
        subtitle: 'Official Senior Secondary Curriculum • Subject Code: 055',
        badge: 'CBSE Official Document',
        contentSections: [
          {
            heading: '1. Part A: Accounting for Partnership Firms and Companies (60 Marks)',
            paragraphs: [
              'Part A constitutes the core component of the senior secondary examination. Candidates are evaluated on conceptual understanding, ledger construction, and journal entries with strict attention to statutory formats.',
            ],
            tableHeaders: ['Unit / Chapter', 'Marks Allocated', 'Recommended Periods', 'Assessment Focus'],
            tableRows: [
              ['Unit 1: Accounting for Partnership Firms', '36 Marks', '105 Periods', 'Fundamentals, Goodwill, Admission, Retirement, Dissolution'],
              ['Unit 2: Accounting for Companies (Shares & Debentures)', '24 Marks', '45 Periods', 'Forfeiture, Reissue, Pro-rata Allotment, Issue of Debentures'],
              ['Part B: Financial Statement Analysis', '20 Marks', '30 Periods', 'Comparative/Common Size, Ratios, Cash Flow Statement'],
              ['Part C: Project Work & Viva Voce', '20 Marks', '20 Periods', 'Comprehensive Project, Ratio/Cash Flow File, External Viva'],
            ],
            calloutNote: {
              title: 'Chief Examiner Directive (2025)',
              text: 'Working notes form an integral part of the answers. Candidates must avoid calculating figures in margins without explicit labels.',
              tone: 'amber',
            },
          },
          {
            heading: '2. Typology of Questions & Question Paper Design',
            bulletPoints: [
              'Remembering & Understanding (44 Marks / 55%): Basic principles, definitions, and standard ledger entries.',
              'Applying & Problem Solving (19 Marks / 23.75%): Computation of Goodwill, Revaluation account, and Pro-rata allocation tables.',
              'Analysing, Evaluating & Creating (17 Marks / 21.25%): Indirect method Cash Flow Statement and Ratio interpretation.',
            ],
          },
        ],
        pageFooter: 'Page 1 of 4 • Central Board of Secondary Education • Class 12 Accountancy Blueprint',
      },
      {
        pageNumber: 2,
        title: 'Accounting for Partnership Firms — Statutory Provisions & Rules',
        subtitle: 'Partnership Act 1932 (Section 4 to 48) • Core Rules in the Absence of Partnership Deed',
        badge: 'Section 48 Rules',
        contentSections: [
          {
            heading: 'Provisions Applicable in Absence of Partnership Deed',
            bulletPoints: [
              'Profit and Loss Sharing: To be shared EQUALLY among partners regardless of capital contributions.',
              'Interest on Capital: NO interest on capital is allowed to any partner.',
              'Interest on Drawings: NO interest on drawings is charged from any partner.',
              'Interest on Partner’s Loan/Advance: Allowed at 6% per annum (treated as a Charge against Profit).',
              'Remuneration / Salary / Commission: NO partner is entitled to any salary or commission for firm work.',
            ],
            calloutNote: {
              title: 'Frequent Board Examination Trap',
              text: 'Interest on Partner’s Loan is debited to Profit & Loss Account, NOT to Profit & Loss Appropriation Account!',
              tone: 'red',
            },
          },
          {
            heading: 'Goodwill Valuation Methods — Reference Table',
            tableHeaders: ['Valuation Method', 'Core Formula', 'Critical Adjustment / Examiner Trap'],
            tableRows: [
              ['Average Profit Method', 'Goodwill = Adjusted Normal Profit × No. of Years of Purchase', 'Deduct abnormal gain (lottery, asset sale); Add back abnormal loss (fire, theft)'],
              ['Super Profit Method', 'Goodwill = Super Profit × No. of Years of Purchase\n(Super Profit = Actual - Normal Profit)', 'Normal Profit = Capital Employed × Normal Rate / 100. Capital Employed must be average.'],
              ['Capitalisation of Average Profit', 'Goodwill = Capitalised Value - Net Assets\n[Cap. Value = (Average Profit / NRR) × 100]', 'Net Assets = Total Assets (excl. fictitious/non-trade) - Outside Liabilities'],
              ['Capitalisation of Super Profit', 'Goodwill = (Super Profit / NRR) × 100', 'Produces the identical mathematical result as Capitalisation of Average Profit.'],
            ],
          },
        ],
        pageFooter: 'Page 2 of 4 • Central Board of Secondary Education • Partnership Accounting Provisions',
      },
      {
        pageNumber: 3,
        title: 'Accounting for Companies — Share Capital & Pro-Rata Forfeiture',
        subtitle: 'Companies Act 2013 • Treatment of Calls-in-Arrears, Forfeiture & Capital Reserve',
        badge: 'Section 52 & 68 Rules',
        contentSections: [
          {
            heading: 'Pro-Rata Allotment Calculation Matrix',
            paragraphs: [
              'When applications exceed issued shares, directors allocate shares proportionately. The surplus application money is adjusted towards allotment and calls per the terms of prospectus.',
            ],
            tableHeaders: ['Step', 'Description of Ledger / Working Note', 'Formula / Accounting Rule'],
            tableRows: [
              ['Step 1', 'Calculate Total Application Money Received', 'No. of Applied Shares × Application Money per Share'],
              ['Step 2', 'Transfer to Share Capital Account', 'No. of Allotted Shares × Application Money per Share (Face Value)'],
              ['Step 3', 'Surplus Available for Allotment', 'Total Money Received − Transfer to Share Capital'],
              ['Step 4', 'Call-in-Arrears on Defaulting Allottee', '[(Applied / Total Applied) × Allotted] to find applied ratio, then subtract advance'],
              ['Step 5', 'Transfer to Capital Reserve upon Reissue', '(Amount Forfeited on Reissued Shares) − (Discount on Reissue)'],
            ],
            calloutNote: {
              title: 'Statutory Rule on Securities Premium (Section 52(2))',
              text: 'If Securities Premium has already been received before forfeiture, it CANNOT be cancelled or debited in the Share Forfeiture journal entry!',
              tone: 'blue',
            },
          },
          {
            heading: 'Journal Entry Template: Forfeiture of Shares Issued at Premium',
            bulletPoints: [
              'Share Capital A/c ... Dr. [No. of shares forfeited × Called-up value per share]',
              'Securities Premium A/c ... Dr. [Premium unpaid by default, if any]',
              'To Share Allotment / Call A/c ... [Amount unpaid by the shareholder]',
              'To Share Forfeiture A/c ... [Actual amount collected towards Face Value]',
            ],
          },
        ],
        pageFooter: 'Page 3 of 4 • Central Board of Secondary Education • Company Accounts & Forfeiture',
      },
      {
        pageNumber: 4,
        title: 'Cash Flow Statement — Accounting Standard 3 (Revised)',
        subtitle: 'Cash Flow from Operating Activities (Indirect Method) • Ind AS 7 Guidelines',
        badge: 'AS-3 Indirect Method',
        contentSections: [
          {
            heading: 'Indirect Method Reconciliation Architecture',
            paragraphs: [
              'Operating cash flow reconciliation begins with Net Profit Before Tax and Extraordinary Items, adjusting for non-cash expenses, non-operating items, and working capital fluctuations.',
            ],
            tableHeaders: ['Item Category', 'Adjustment to Net Profit', 'Reasoning / Justification'],
            tableRows: [
              ['Depreciation & Amortisation', 'ADD BACK (+)', 'Non-cash expense; does not reduce actual liquid cash resources'],
              ['Loss on Sale of Fixed Assets', 'ADD BACK (+)', 'Investing activity loss; improperly reduced operational net profit'],
              ['Profit on Sale of Fixed Assets', 'DEDUCT (-)', 'Investing activity inflow; must not inflate operating cash balance'],
              ['Increase in Current Assets (excl. Cash)', 'DEDUCT (-)', 'Cash tied up in debtors, inventories, or prepaid expenses (Outflow)'],
              ['Decrease in Current Assets (excl. Cash)', 'ADD BACK (+)', 'Realisation of cash from collection of debtors or stock liquidation'],
              ['Increase in Current Liabilities', 'ADD BACK (+)', 'Delayed payment to suppliers allows the firm to retain liquid cash'],
              ['Income Tax Paid', 'DEDUCT (-) from Operating', 'Actual tax remitted to Government during the financial year'],
            ],
            calloutNote: {
              title: 'Critical Distinction for Class 12',
              text: 'Bank Overdraft and Cash Credit are FINANCING activities. They must NEVER be included in the Working Capital adjustments section.',
              tone: 'red',
            },
          },
        ],
        pageFooter: 'Page 4 of 4 • Central Board of Secondary Education • Cash Flow Statement Reference',
      },
    ],
  },
  {
    id: 'pdf-macroeconomics-formulas',
    title: 'Macroeconomics National Income Aggregates & Formula Sheet',
    fileName: 'Macroeconomics_National_Income_Formula_Sheet.pdf',
    subject: 'Economics',
    gradeClass: 'Class 12',
    category: 'Formula Sheet',
    fileSize: '890 KB',
    totalPages: 3,
    sourceDocId: 'ref-2',
    pages: [
      {
        pageNumber: 1,
        title: 'Macroeconomic Aggregates & Conversion Matrix',
        subtitle: 'Class 12 Economics • Unit 1: National Income and Related Aggregates (10 Marks)',
        badge: 'Formula Matrix',
        contentSections: [
          {
            heading: 'Three Master Bridges of National Income Accounting',
            tableHeaders: ['Starting Concept', 'Bridge / Adjustment Factor', 'Resulting Concept'],
            tableRows: [
              ['Gross (G)', 'Minus Depreciation (Consumption of Fixed Capital)', 'Net (N)'],
              ['Domestic (D)', 'Plus Net Factor Income from Abroad (NFIA = FIFA - FITA)', 'National (N)'],
              ['Market Price (MP)', 'Minus Net Indirect Taxes (NIT = Indirect Taxes - Subsidies)', 'Factor Cost (FC)'],
            ],
            calloutNote: {
              title: 'National Income Definition in Aggregates',
              text: 'National Income is strictly defined as NNP at Factor Cost (NNP_FC). Domestic Income is strictly defined as NDP at Factor Cost (NDP_FC).',
              tone: 'blue',
            },
          },
          {
            heading: 'Real GDP, Nominal GDP and GDP Deflator',
            bulletPoints: [
              'Nominal GDP = Output of current year × Current year market prices (inflated by price changes).',
              'Real GDP = Output of current year × Base year constant prices (true measure of physical economic growth).',
              'GDP Deflator = (Nominal GDP / Real GDP) × 100. Measures price level changes across all domestically produced goods.',
            ],
          },
        ],
        pageFooter: 'Page 1 of 3 • Class 12 Macroeconomics • Aggregates & Deflator Reference',
      },
      {
        pageNumber: 2,
        title: 'Three Measurement Methods of National Income',
        subtitle: 'Value Added Method (Product) & Income Method Formulations',
        badge: 'Measurement Methods',
        contentSections: [
          {
            heading: 'Method 1: Value Added Method (Product Method)',
            paragraphs: [
              'Gross Value Added at Market Price (GVA_MP) = Value of Output − Intermediate Consumption.',
              'Value of Output = Sales + Change in Stock (Closing Stock − Opening Stock) + Production for Self-consumption.',
            ],
            calloutNote: {
              title: 'Examiner Pitfall — Double Counting',
              text: 'Purchase of raw materials is already part of Intermediate Consumption. If total purchases are given, DO NOT add raw materials separately!',
              tone: 'amber',
            },
          },
          {
            heading: 'Method 2: Income Method (Factor Incomes)',
            paragraphs: [
              'NDP_FC = Compensation of Employees (COE) + Operating Surplus (OS) + Mixed Income of Self-Employed (MI).',
            ],
            bulletPoints: [
              'Compensation of Employees: Wages & salaries in cash/kind + Employers contribution to social security schemes (NOT employee contribution!).',
              'Operating Surplus: Rent + Royalty + Interest + Profit (Corporate Tax + Dividend + Undistributed Profit/Retained Earnings).',
              'Mixed Income: Income of own-account workers (farmers, barbers, lawyers, small business owners).',
            ],
          },
        ],
        pageFooter: 'Page 2 of 3 • Class 12 Macroeconomics • Value Added & Income Methods',
      },
      {
        pageNumber: 3,
        title: 'Expenditure Method & Critical Adjustments',
        subtitle: 'Components of Final Expenditure • Inclusions vs Exclusions',
        badge: 'Expenditure & Exclusions',
        contentSections: [
          {
            heading: 'Method 3: Expenditure Method Equation',
            paragraphs: [
              'GDP_MP = Private Final Consumption Expenditure (PFCE) + Government Final Consumption Expenditure (GFCE) + Gross Domestic Capital Formation (GDCF) + Net Exports (X − M).',
            ],
            tableHeaders: ['Sub-Component', 'Formula / Details', 'Frequent Oversight'],
            tableRows: [
              ['Gross Domestic Fixed Capital Formation', 'GDFCF = Business Fixed + Residential + Public Investment', 'Must ADD Change in Stock (Inventory Investment) to obtain GDCF!'],
              ['Net Domestic Capital Formation (NDCF)', 'NDCF = GDCF − Depreciation', 'Using NDCF yields NDP_MP directly instead of GDP_MP.'],
              ['Net Exports (X - M)', 'Exports − Imports', 'If Net Imports are given as ₹ 50 Cr, enter as MINUS ₹ 50 Cr in the equation.'],
            ],
            calloutNote: {
              title: 'Items Strictly EXCLUDED from National Income',
              text: '1. Transfer payments (scholarships, old age pensions, gifts).\n2. Sale/Purchase of second-hand goods (only broker commission is included).\n3. Financial assets transactions (sale of shares and bonds).\n4. Illegal incomes and windfalls (gambling, lotteries).',
              tone: 'red',
            },
          },
        ],
        pageFooter: 'Page 3 of 3 • Class 12 Macroeconomics • Expenditure Method & Inclusions',
      },
    ],
  },
  {
    id: 'pdf-bst-case-studies',
    title: 'Business Studies Chapterwise Board Case Studies & Marking Guidelines',
    fileName: 'Business_Studies_Chapterwise_Case_Studies.docx',
    subject: 'Business Studies',
    gradeClass: 'Class 12',
    category: 'Question Bank',
    fileSize: '2.3 MB',
    totalPages: 3,
    sourceDocId: 'ref-3',
    pages: [
      {
        pageNumber: 1,
        title: 'Principles of Management — Henri Fayol vs F.W. Taylor Case Studies',
        subtitle: 'Class 12 Business Studies • Unit 2: Principles of Management (6 Marks)',
        badge: 'Board Case Scenario 1',
        contentSections: [
          {
            heading: 'Case Study Scenario: Delta Logistics Ltd.',
            paragraphs: [
              '"Mr. Rajiv Sharma, the Chief Operations Officer of Delta Logistics Ltd., noticed that delivery drivers were taking varied routes without standardization. Fatigue was high and package deliveries were delayed. He conducted an experiment by recording workers movements using video cameras to eliminate unnecessary motions. Furthermore, he separated the planning of delivery schedules from actual driving, placing eight functional specialists over each team."',
            ],
            calloutNote: {
              title: 'Classroom Discussion Questions',
              text: '1. Identify and explain the scientific management techniques adopted by Mr. Rajiv.\n2. State the principle of Fayol violated when eight bosses give orders to a single worker.',
              tone: 'emerald',
            },
          },
          {
            heading: 'Official CBSE Solution & Rubric',
            bulletPoints: [
              'Technique 1: Motion Study — Systematic study of body movements to eliminate wasted effort and design optimal delivery routes (1.5 marks).',
              'Technique 2: Functional Foremanship — Separation of planning in-charge from execution in-charge with 8 specialized supervisors (1.5 marks).',
              'Fayol Principle Violated: Unity of Command — States that a subordinate should receive orders from and be accountable to only one superior (2 marks).',
            ],
          },
        ],
        pageFooter: 'Page 1 of 3 • Class 12 Business Studies • Principles of Management Case Analysis',
      },
      {
        pageNumber: 2,
        title: 'Financial Management — Trading on Equity & Capital Structure',
        subtitle: 'Class 12 Business Studies • Unit 9: Financial Management (9 Marks)',
        badge: 'Board Case Scenario 2',
        contentSections: [
          {
            heading: 'Numerical Case: Sun Ltd. vs Star Ltd.',
            paragraphs: [
              'A company requires ₹ 30,00,000 for plant modernization. EBIT is expected to be ₹ 4,00,000 p.a. Tax rate is 30%. Option I: Issue 3,00,000 Equity Shares of ₹ 10 each. Option II: Issue 1,50,000 Equity Shares of ₹ 10 each and 10% Debentures of ₹ 15,00,000.',
            ],
            tableHeaders: ['Particulars', 'Option I (All Equity)', 'Option II (Equity + Debt)'],
            tableRows: [
              ['Earnings Before Interest & Tax (EBIT)', '₹ 4,00,000', '₹ 4,00,000'],
              ['Less: Interest on 10% Debentures', 'Nil', '(₹ 1,50,000)'],
              ['Earnings Before Tax (EBT)', '₹ 4,00,000', '₹ 2,50,000'],
              ['Less: Tax @ 30%', '(₹ 1,20,000)', '(₹ 75,000)'],
              ['Earnings After Tax (EAT)', '₹ 2,80,000', '₹ 1,75,000'],
              ['Number of Equity Shares', '3,00,000 shares', '1,50,000 shares'],
              ['Earnings Per Share (EPS)', '₹ 0.93 per share', '₹ 1.17 per share'],
            ],
            calloutNote: {
              title: 'Conclusion on Trading on Equity',
              text: 'Option II increases EPS from ₹ 0.93 to ₹ 1.17 because ROI (13.33%) exceeds Cost of Debt (10%). This is called Favourable Financial Leverage.',
              tone: 'blue',
            },
          },
        ],
        pageFooter: 'Page 2 of 3 • Class 12 Business Studies • Financial Management & Leverage Case',
      },
      {
        pageNumber: 3,
        title: 'Consumer Protection Act 2019 — Three-Tier Redressal Mechanism',
        subtitle: 'Class 12 Business Studies • Unit 12: Consumer Protection (5 Marks)',
        badge: 'Redressal Jurisdictions',
        contentSections: [
          {
            heading: 'Revised Pecuniary Jurisdiction under Consumer Protection Act 2019',
            tableHeaders: ['Redressal Commission', 'Pecuniary Jurisdiction (Value of Goods Paid)', 'Appeal Period & Destination'],
            tableRows: [
              ['District Consumer Commission', 'Up to ₹ 50 Lakh (revised rules Dec 2021)', '45 Days to State Commission'],
              ['State Consumer Commission', 'Exceeding ₹ 50 Lakh up to ₹ 2 Crore', '30 Days to National Commission'],
              ['National Commission (NCDRC)', 'Exceeds ₹ 2 Crore', '30 Days to Supreme Court of India'],
            ],
            calloutNote: {
              title: 'Examiner Warning on Old Act',
              text: 'Old limits of ₹ 20 Lakh / ₹ 1 Crore under 1986 Act are obsolete! Award zero marks if students cite 1986 provisions.',
              tone: 'red',
            },
          },
        ],
        pageFooter: 'Page 3 of 3 • Class 12 Business Studies • Consumer Protection Act 2019',
      },
    ],
  },
  {
    id: 'pdf-dissolution-templates',
    title: 'Partnership Dissolution Comprehensive Ledger Templates',
    fileName: 'Partnership_Dissolution_Ledger_Templates.pptx',
    subject: 'Accountancy',
    gradeClass: 'Class 12',
    category: 'Board Slides',
    fileSize: '3.1 MB',
    totalPages: 3,
    sourceDocId: 'ref-4',
    pages: [
      {
        pageNumber: 1,
        title: 'Realisation Account Comprehensive Layout',
        subtitle: 'Nominal Account prepared upon dissolution to close books of the firm',
        badge: 'Section 48 Order of Settlement',
        contentSections: [
          {
            heading: 'Debit Side vs Credit Side Posting Rules',
            tableHeaders: ['Dr. (Expenses & Closing Balances)', 'Amount (₹)', 'Cr. (Proceeds & Incomes)', 'Amount (₹)'],
            tableRows: [
              ['To Sundry Assets A/c (Book Value excl. Cash)', 'X,XX,XXX', 'By Outside Liabilities A/c (Book Value)', 'X,XX,XXX'],
              ['To Bank A/c (Liabilities Paid Off)', 'XX,XXX', 'By Bank A/c (Assets Realised in Cash)', 'X,XX,XXX'],
              ['To Bank A/c (Unrecorded Liabilities Paid)', 'X,XXX', 'By Partner Capital A/c (Assets Taken Over)', 'XX,XXX'],
              ['To Partner Capital A/c (Dissolution Expense)', 'X,XXX', 'By Partner Capital A/c (Realisation Loss)', 'XX,XXX'],
            ],
            calloutNote: {
              title: 'Golden Realisation Rule',
              text: 'When a creditor accepts an asset in full or part settlement of their claim, NO entry is passed in the books for that amount!',
              tone: 'emerald',
            },
          },
        ],
        pageFooter: 'Page 1 of 3 • Class 12 Accountancy • Realisation Account Master Template',
      },
      {
        pageNumber: 2,
        title: 'Settlement of Partner Loans and Capital Accounts',
        subtitle: 'Priority of Payments under Section 48 of Partnership Act 1932',
        badge: 'Priority Hierarchy',
        contentSections: [
          {
            heading: 'Statutory Order of Settlement of Firm Debts (Section 48)',
            bulletPoints: [
              '1st Priority: Debts to Outside Creditors (Bank overdraft, sundry creditors, bills payable, outstanding expenses).',
              '2nd Priority: Partner’s Loan to Firm (Paid ratably among partners if funds are insufficient).',
              '3rd Priority: Partner’s Capital Balances (Repayment of capital contributions).',
              '4th Priority: Surplus Residual (Distributed as profit according to profit-sharing ratio).',
            ],
          },
        ],
        pageFooter: 'Page 2 of 3 • Class 12 Accountancy • Section 48 Payment Hierarchy',
      },
      {
        pageNumber: 3,
        title: 'Cash and Bank Account Balancing & Final Settlement',
        subtitle: 'Self-Balancing Proof of Partnership Dissolution Accuracy',
        badge: 'Final Ledger Proof',
        contentSections: [
          {
            heading: 'Cash / Bank Ledger Equilibrium',
            paragraphs: [
              'On complete dissolution, the Cash/Bank account automatically balances with zero remaining balance. If a difference occurs, check whether any partner with a debit balance brought in cash or whether realization expenses were omitted.',
            ],
            calloutNote: {
              title: 'Classroom Tip on Smart Board',
              text: 'Use the Whiteboard Split Screen to work through the ledger journal entries on the right while this reference template stays anchored on the left.',
              tone: 'blue',
            },
          },
        ],
        pageFooter: 'Page 3 of 3 • Class 12 Accountancy • Cash/Bank Settlement Reference',
      },
    ],
  },
];

/**
 * Creates or retrieves a rich multi-page BoardPdfDoc from any ReferenceDoc.
 * If a preset exists for this doc, returns the high-fidelity preset.
 * Otherwise, synthesizes an authentic multi-page syllabus PDF document.
 */
export function createBoardPdfFromDoc(doc: ReferenceDoc): BoardPdfDoc {
  // Check if we have a direct preset
  const existingPreset = PRESET_BOARD_PDF_DOCS.find(
    (p) => p.sourceDocId === doc.id || p.fileName.toLowerCase() === doc.name.toLowerCase()
  );
  if (existingPreset) {
    return existingPreset;
  }

  const cleanTitle = doc.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' ');
  const isAccountancy =
    doc.name.toLowerCase().includes('account') ||
    doc.contentSummary.toLowerCase().includes('partnership') ||
    doc.contentSummary.toLowerCase().includes('cash flow') ||
    doc.contentSummary.toLowerCase().includes('goodwill');
  const isEconomics =
    doc.name.toLowerCase().includes('econ') ||
    doc.contentSummary.toLowerCase().includes('income') ||
    doc.contentSummary.toLowerCase().includes('macro');
  const subject = isAccountancy ? 'Accountancy' : isEconomics ? 'Economics' : 'Business Studies';

  return {
    id: `pdf-${doc.id}-${Date.now()}`,
    title: cleanTitle,
    fileName: doc.name,
    subject: subject,
    gradeClass: 'Class 12',
    category: doc.category || 'Reference Document',
    fileSize: doc.size || '1.8 MB',
    totalPages: 3,
    sourceDocId: doc.id,
    uploadedAt: doc.uploadedAt || new Date().toLocaleTimeString(),
    pages: [
      {
        pageNumber: 1,
        title: `${cleanTitle} — Core Curriculum Overview`,
        subtitle: `Class 12 ${subject} • Reference Material Document • ${doc.category}`,
        badge: 'Page 1: Overview & Scope',
        contentSections: [
          {
            heading: 'Document Description & Syllabus Relevance',
            paragraphs: [
              doc.contentSummary ||
                'This reference material covers fundamental concepts, board exam problem types, statutory formats, and scoring guidelines for senior secondary students.',
            ],
            calloutNote: {
              title: 'Smart Teaching Studio Panel Notice',
              text: 'You can annotate directly over this document using the smart whiteboard pen and highlighter tools.',
              tone: 'blue',
            },
          },
          {
            heading: 'Key Learning Objectives & Board Standards',
            bulletPoints: [
              'Statutory compliance and standard format presentation per latest CBSE curriculum.',
              'Step-by-step problem dissection and intermediate working note requirements.',
              'Identification of high-frequency examiner traps and common calculation oversights.',
              'Interactive board practice: solving numerical illustrations alongside student queries.',
            ],
          },
        ],
        pageFooter: `Page 1 of 3 • ${doc.name} • Smart Teaching Studio PDF Viewer`,
      },
      {
        pageNumber: 2,
        title: `${cleanTitle} — Analytical Framework & Rules`,
        subtitle: 'Core Formulas, Ledger Structures & Decision Rules',
        badge: 'Page 2: Rules & Methods',
        contentSections: [
          {
            heading: 'Standard Accounting / Economic Analytical Framework',
            tableHeaders: ['Component / Stage', 'Key Principle / Formula', 'Marking Weightage'],
            tableRows: [
              ['Stage 1: Opening Reconciliation', 'Verify opening balances, reserves, and statutory limits', '1 to 2 Marks'],
              ['Stage 2: Core Adjustments', 'Apply proportional allocation, revaluation, or multiplier calculations', '2 to 3 Marks'],
              ['Stage 3: Closing Balance Sheet', 'Ensure double-entry equilibrium and disclosure in notes to accounts', '2 to 3 Marks'],
            ],
            calloutNote: {
              title: 'Examiner Warning from Chief Moderator Reports',
              text: 'Full credit requires showing formulas with clear units (₹, %, or units of output) and formal headings.',
              tone: 'amber',
            },
          },
        ],
        pageFooter: `Page 2 of 3 • ${doc.name} • Smart Teaching Studio PDF Viewer`,
      },
      {
        pageNumber: 3,
        title: `${cleanTitle} — Classroom Practice Illustration`,
        subtitle: 'Classroom Case Problem for Stylus Solving on Smart Panel',
        badge: 'Page 3: Practice Problem',
        contentSections: [
          {
            heading: 'Board Exam Practice Problem',
            paragraphs: [
              `Review the principles detailed in "${cleanTitle}". Prepare a comprehensive ledger or macroeconomic derivation showing: (a) Identification of parameters, (b) Working notes for intermediate adjustments, and (c) Final balanced presentation.`,
            ],
            bulletPoints: [
              'Step 1: Write given values clearly on the whiteboard.',
              'Step 2: Use the highlighter to flag any non-operating or transfer payment items.',
              'Step 3: Execute ledger balancing or equation substitution in the right working column.',
            ],
            calloutNote: {
              title: 'Teaching Recommendation',
              text: 'Switch to "Split Screen" mode to solve this illustration on the whiteboard canvas while keeping these problem facts visible.',
              tone: 'emerald',
            },
          },
        ],
        pageFooter: `Page 3 of 3 • ${doc.name} • Smart Teaching Studio PDF Viewer`,
      },
    ],
  };
}
