export interface SubjectData {
  id: string;
  name: string;
  classes: string;
  recommendedBooks: string;
  description: string;
  icon: string;
  topics: {
    name: string;
    description: string;
    keyConcepts: string[];
    boardTrap: string;
    realWorldHook: string;
  }[];
}

export const COMMERCE_SUBJECTS: SubjectData[] = [
  {
    id: 'accountancy',
    name: 'Accountancy',
    classes: 'Class 11 & 12',
    recommendedBooks: 'T.S. Grewal & D.K. Goel alignment',
    description: 'Partnership, Companies, Cash Flow Statements, Ratio Analysis & Accounting Standards.',
    icon: '📊',
    topics: [
      {
        name: 'Partnership - Goodwill Valuation by Super Profit',
        description: 'Calculating value of goodwill using normal rate of return and average profits.',
        keyConcepts: ['Normal Profit = Capital Employed × NRR / 100', 'Super Profit = Actual Average Profit - Normal Profit', 'Goodwill = Super Profit × Number of Years Purchase'],
        boardTrap: 'Students often include non-operating assets (like Idle Investments) in Capital Employed. Always deduct non-trade investments!',
        realWorldHook: 'When Tata acquired Jaguar Land Rover or Zomato acquired Blinkit, how was intangible goodwill valued on the balance sheet?'
      },
      {
        name: 'Company Accounts - Forfeiture & Reissue of Shares',
        description: 'Accounting entries when shareholders default on calls and subsequent discount on reissue.',
        keyConcepts: ['Share Capital A/c Debited with Called-up Amount', 'Share Forfeiture A/c Credited with Amount Received (excluding premium)', 'Capital Reserve Transfer on Reissue'],
        boardTrap: 'Maximum permissible discount on reissue cannot exceed the amount forfeited on those specific shares reissued!',
        realWorldHook: 'Understanding how startup ESOPs or uncalled capital in initial public offerings (IPOs) like LIC or Paytm operate.'
      },
      {
        name: 'Cash Flow Statement - Operating Activities',
        description: 'Indirect method adjustments starting from Net Profit Before Tax and Extraordinary Items.',
        keyConcepts: ['Add Non-cash and Non-operating expenses (Depreciation, Loss on Sale)', 'Working Capital changes: Invert Current Assets, Follow Current Liabilities', 'Deduct Income Tax paid'],
        boardTrap: 'Interim dividend paid during the year is both an addition to NP before tax and a Financing outflow!',
        realWorldHook: 'Why profitable companies like Jet Airways or Go First went bankrupt due to negative operational cash flows.'
      },
      {
        name: 'Accounting Ratios - Return on Investment (ROI)',
        description: 'Assessing profitability relative to capital employed in corporate entities.',
        keyConcepts: ['ROI = (EBIT / Capital Employed) × 100', 'Debt-Equity Ratio & Financial Leverage impact'],
        boardTrap: 'Make sure to use EBIT (Earnings Before Interest and Tax), not Profit After Tax, when computing ROI!',
        realWorldHook: 'How private equity investors evaluate Reliance Retail versus DMart (Avenue Supermarts) using capital efficiency metrics.'
      }
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    classes: 'Class 11 & 12',
    recommendedBooks: 'Sandeep Garg & NCERT alignment',
    description: 'Macroeconomics, Indian Economic Development, National Income, and Money & Banking.',
    icon: '📈',
    topics: [
      {
        name: 'Macroeconomics - National Income Aggregates',
        description: 'GDP, GNP, NNP at Factor Cost and Market Prices using Value Added, Income, and Expenditure methods.',
        keyConcepts: ['Gross to Net: Deduct Depreciation', 'Domestic to National: Add NFIA', 'Market Price to Factor Cost: Deduct NIT (Indirect Taxes - Subsidies)'],
        boardTrap: 'Transfer payments (old age pensions, scholarships) must NEVER be included in National Income because no corresponding production occurs!',
        realWorldHook: 'Analyzing India surpassing the UK to become the 5th largest world economy based on nominal vs real GDP.'
      },
      {
        name: 'Money & Banking - Credit Creation & Monetary Policy',
        description: 'How commercial banks multiply reserves and how the RBI adjusts Repo Rate & CRR.',
        keyConcepts: ['Credit Multiplier = 1 / LRR', 'Total Credit Created = Primary Deposits × Multiplier', 'Quantitative vs Qualitative Tools of RBI'],
        boardTrap: 'Confusing Statutory Liquidity Ratio (SLR, kept with themselves) with Cash Reserve Ratio (CRR, kept with RBI).',
        realWorldHook: 'How the Reserve Bank of India (RBI) Monetary Policy Committee uses repo rates to combat inflation and stabilise the rupee.'
      },
      {
        name: 'Income Determination - Multiplier & Excess Demand',
        description: 'Investment multiplier, deflationary gap, and fiscal policy corrections.',
        keyConcepts: ['Multiplier k = 1 / (1 - MPC) = 1 / MPS', 'Deflationary Gap occurs when Aggregate Demand falls short of Aggregate Supply at full employment'],
        boardTrap: 'The value of multiplier ranges strictly between 1 and infinity; it can never be less than 1 or negative!',
        realWorldHook: 'Post-pandemic government capital expenditure (Capex) stimulus in the Union Budget to trigger private investment.'
      }
    ]
  },
  {
    id: 'business',
    name: 'Business Studies',
    classes: 'Class 11 & 12',
    recommendedBooks: 'Poonam Gandhi & NCERT alignment',
    description: 'Principles & Functions of Management, Financial Markets, Marketing Mix & Consumer Protection.',
    icon: '💼',
    topics: [
      {
        name: 'Principles of Management - Fayol vs Taylor',
        description: 'Administrative theory (Fayol 14 principles) versus Scientific management techniques (Taylor).',
        keyConcepts: ['Unity of Command (one boss) vs Unity of Direction (one plan)', 'Functional Foremanship (Taylor technique violating unity of command)', 'Differential Piece Wage System'],
        boardTrap: 'Never confuse Unity of Command (prevents dual subordination) with Unity of Direction (prevents overlapping activities)!',
        realWorldHook: 'How Amazon fulfillment centres apply Taylor’s Time & Motion study, while Google applies Fayol’s Initiative and Esprit de Corps.'
      },
      {
        name: 'Financial Management - Capital Structure & Trading on Equity',
        description: 'Optimal mix of debt and equity to maximize wealth of equity shareholders.',
        keyConcepts: ['Financial Leverage benefits occur when ROI > Cost of Debt', 'Risk of Insolvency increases with higher fixed financial charges'],
        boardTrap: 'Trading on equity only works when ROI exceeds the rate of interest on debentures, otherwise EPS decreases!',
        realWorldHook: 'Examining debt levels of telecom giants like Airtel and Jio during 5G spectrum auctions.'
      },
      {
        name: 'Marketing Management - 4 Ps & Sales Promotion',
        description: 'Product, Price, Place, and Promotion strategies in competitive markets.',
        keyConcepts: ['Branding, Packaging, Labeling', 'Price skimming vs Penetration pricing', 'Advertising vs Personal Selling'],
        boardTrap: 'Labeling acts as a silent salesman and carries statutory warnings; distinguish between descriptive vs informative labels.',
        realWorldHook: 'How Zepto, Blinkit, and Swiggy Instamart disrupted the Place (physical distribution) element with 10-minute quick commerce.'
      }
    ]
  },
  {
    id: 'applied_math',
    name: 'Applied Mathematics',
    classes: 'Class 11 & 12',
    recommendedBooks: 'M.L. Aggarwal alignment',
    description: 'Financial Mathematics, Calculus, Linear Programming, and Probability Distributions.',
    icon: '📐',
    topics: [
      {
        name: 'Financial Mathematics - Perpetuity & Sinking Funds',
        description: 'Valuation of perpetual cash flows, present value, and amortization tables.',
        keyConcepts: ['Present Value of Perpetuity = Cash Flow / Interest Rate', 'Sinking Fund = Periodic amount set aside to accumulate a required future sum'],
        boardTrap: 'In growing perpetuity, the formula is PV = C / (r - g); ensure rate r is strictly greater than growth rate g!',
        realWorldHook: 'How government perpetual bonds and endowment funds at major universities maintain infinite payouts.'
      },
      {
        name: 'Linear Programming - Corner Point Method',
        description: 'Formulating objective function, constraints, feasible region, and finding optimal solution.',
        keyConcepts: ['Maximize Z = ax + by subject to linear inequalities', 'Fundamental Theorem of LPP: optimal value occurs at corner points'],
        boardTrap: 'When the feasible region is unbounded, you MUST test if open half-plane intersects the region before confirming optimality!',
        realWorldHook: 'Airline crew scheduling and supply chain distribution optimization from central warehouses to retail hubs.'
      }
    ]
  }
];

export const PRESET_QUIZZES: Record<string, { question: string; options: string[]; answer: number; explanation: string }[]> = {
  accountancy: [
    {
      question: 'In the absence of a Partnership Deed, what is the rate of interest allowed on a loan advanced by a partner to the firm?',
      options: ['6% per annum', '12% per annum', 'Interest is not allowed', 'As decided by the majority of partners'],
      answer: 0,
      explanation: 'Under Section 13(d) of the Indian Partnership Act, 1932, in the absence of an agreement, partners are entitled to interest on loans at 6% p.a.'
    },
    {
      question: 'Where is the balance remaining in the Share Forfeiture Account transferred after all forfeited shares have been reissued?',
      options: ['General Reserve', 'Capital Reserve', 'Profit and Loss Account', 'Securities Premium Account'],
      answer: 1,
      explanation: 'The profit realized on the reissue of forfeited shares is a capital profit and must be transferred to the Capital Reserve Account.'
    },
    {
      question: 'Which of the following is treated as an Operating Activity in the Cash Flow Statement of a non-financing company?',
      options: ['Cash proceeds from issuing debentures', 'Dividend received on long-term shares', 'Cash payments to suppliers for goods', 'Purchase of patent rights'],
      answer: 2,
      explanation: 'Cash payments to suppliers arise directly from principal revenue-producing activities, making it an Operating Cash Flow.'
    },
    {
      question: 'When valuing goodwill by Capitalisation of Average Profit method, how is Capital Employed used?',
      options: ['It is added to Capitalised Value', 'It is deducted from Capitalised Value', 'It is multiplied by Number of Years Purchase', 'It is ignored'],
      answer: 1,
      explanation: 'Goodwill = Capitalised Value of Average Profits (Average Profit / NRR × 100) - Actual Capital Employed (Net Assets).'
    }
  ],
  economics: [
    {
      question: 'Which of the following items is EXCLUDED while calculating National Income by the Income Method?',
      options: ['Compensation of Employees', 'Operating Surplus (Rent, Interest, Profit)', 'Transfer Payments (like Old Age Pension)', 'Mixed Income of Self-Employed'],
      answer: 2,
      explanation: 'Transfer payments are unilateral payments without any corresponding production of goods or services, so they are excluded from National Income.'
    },
    {
      question: 'If the Marginal Propensity to Consume (MPC) is 0.8, what is the value of the Investment Multiplier (k)?',
      options: ['1.25', '4', '5', '8'],
      answer: 2,
      explanation: 'k = 1 / (1 - MPC) = 1 / (1 - 0.8) = 1 / 0.2 = 5.'
    },
    {
      question: 'To control an inflationary gap in the economy, which monetary policy measure should the Central Bank adopt?',
      options: ['Decrease the Repo Rate', 'Purchase government securities in open market', 'Increase Cash Reserve Ratio (CRR)', 'Reduce Margin Requirements on loans'],
      answer: 2,
      explanation: 'Increasing the CRR forces commercial banks to keep more reserves with RBI, curtailing money supply and credit creation to curb inflation.'
    },
    {
      question: 'Which economic indicator measures the total monetary value of final goods produced within domestic territory, regardless of ownership?',
      options: ['Gross National Product (GNP)', 'Gross Domestic Product (GDP)', 'Net National Product (NNP)', 'National Disposable Income'],
      answer: 1,
      explanation: 'GDP measures total output produced within the geographic boundaries (domestic territory) of a nation.'
    }
  ],
  business: [
    {
      question: 'Which principle of Henri Fayol is violated if a worker receives direct conflicting instructions from two supervisors simultaneously?',
      options: ['Unity of Direction', 'Unity of Command', 'Scalar Chain', 'Order'],
      answer: 1,
      explanation: 'Unity of Command states that an employee should receive orders from and be accountable to only one superior.'
    },
    {
      question: 'Which component of the capital structure carries the highest financial risk but offers tax deductibility on payments?',
      options: ['Equity Shares', 'Preference Shares', 'Debt / Debentures', 'Retained Earnings'],
      answer: 2,
      explanation: 'Interest on Debt is a tax-deductible expense (shield), but carries fixed payment commitments, raising financial risk.'
    },
    {
      question: 'Under the Consumer Protection Act, 2019, where can a complaint be filed if the value of goods or services paid exceeds ₹10 Crore?',
      options: ['District Commission', 'State Commission', 'National Consumer Disputes Redressal Commission', 'Supreme Court directly'],
      answer: 2,
      explanation: 'The National Commission has pecuniary jurisdiction to entertain complaints where consideration paid exceeds ₹10 Crore.'
    }
  ],
  applied_math: [
    {
      question: 'What is the present value of a perpetuity paying ₹12,000 annually if the effective discount rate is 6% per annum?',
      options: ['₹72,000', '₹1,20,000', '₹2,00,000', '₹2,40,000'],
      answer: 2,
      explanation: 'Present Value of Perpetuity = Annual Payment / Interest Rate = 12,000 / 0.06 = ₹2,00,000.'
    },
    {
      question: 'In a Linear Programming Problem, at which points of the bounded feasible region do optimal maximum or minimum values always occur?',
      options: ['Center of gravity', 'Midpoints of boundary lines', 'Corner (extreme) vertices', 'Any internal coordinate'],
      answer: 2,
      explanation: 'By the Fundamental Theorem of Linear Programming, optimal values of the objective function always lie at one or more corner points.'
    }
  ]
};
