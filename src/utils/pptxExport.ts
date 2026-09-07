import pptxgen from 'pptxgenjs';

export interface PPTXOptions {
  title: string;
  gradeClass: string;
  subject: string;
  slidesCount: number;
}

export async function generateNativePPTX(options: PPTXOptions): Promise<string> {
  const { title, gradeClass, subject, slidesCount } = options;

  // Attempt local bridge first if requested or active
  try {
    const bridgeResp = await fetch('http://127.0.0.1:8765/ppt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: title,
        class: gradeClass,
        subject: subject,
        slides: slidesCount,
      }),
      signal: AbortSignal.timeout(1200),
    });

    if (bridgeResp.ok) {
      const blob = await bridgeResp.blob();
      const filename = `SmartTeaching_${title.replace(/[^a-z0-9]+/gi, '_')}.pptx`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      return `Successfully downloaded native presentation "${filename}" via local bridge!`;
    }
  } catch {
    // Local bridge not running; fallback to native in-browser pptxgenjs generation
  }

  // Generate high quality 16:9 presentation natively with pptxgenjs
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Smart Teaching Studio';
  pptx.company = 'Interactive Panel Edition V4.1';
  pptx.title = `${subject}: ${title}`;

  // Slide 1: Cover Slide (Dark Panel Slate theme)
  const slide1 = pptx.addSlide();
  slide1.background = { color: '0F172A' }; // Dark slate

  slide1.addText('SMART TEACHING STUDIO • PANEL TOUCH EDITION', {
    x: 0.8,
    y: 0.8,
    w: 8.5,
    h: 0.4,
    fontSize: 13,
    color: '60A5FA',
    bold: true,
    fontFace: 'Segoe UI',
  });

  slide1.addText(title, {
    x: 0.8,
    y: 1.5,
    w: 11.5,
    h: 1.8,
    fontSize: 36,
    color: 'FFFFFF',
    bold: true,
    fontFace: 'Segoe UI',
  });

  slide1.addText(`${gradeClass} • ${subject} Curriculum Alignment`, {
    x: 0.8,
    y: 3.5,
    w: 9.0,
    h: 0.6,
    fontSize: 18,
    color: '94A3B8',
    fontFace: 'Segoe UI',
  });

  slide1.addShape(pptx.ShapeType.rect, {
    x: 0.8,
    y: 4.5,
    w: 3.5,
    h: 0.6,
    fill: { color: '2563EB' },
  });
  slide1.addText('Interactive Classroom Deck', {
    x: 0.8,
    y: 4.5,
    w: 3.5,
    h: 0.6,
    fontSize: 13,
    color: 'FFFFFF',
    bold: true,
    align: 'center',
  });

  // Slide 2: Learning Objectives & Roadmap
  const slide2 = pptx.addSlide();
  slide2.background = { color: 'F8FAFC' };

  slide2.addText('Learning Objectives & Class Roadmap', {
    x: 0.8,
    y: 0.6,
    w: 10,
    h: 0.8,
    fontSize: 24,
    bold: true,
    color: '0F172A',
    fontFace: 'Segoe UI',
  });

  slide2.addShape(pptx.ShapeType.line, {
    x: 0.8,
    y: 1.3,
    w: 11.7,
    h: 0,
    line: { color: '2563EB', width: 3 },
  });

  const roadmapItems = [
    { num: '01', title: 'Statutory / Conceptual Foundations', desc: 'Understanding regulatory framework, standard accounting principles, and economic theories.' },
    { num: '02', title: 'Practical Working Framework', desc: 'Step-by-step calculation formulas, journal formats, and ledger presentation.' },
    { num: '03', title: 'Live Board Illustration', desc: 'Worked examination problem demonstrating typical balance adjustments and working notes.' },
    { num: '04', title: 'Board Exam Traps & Rapid Quiz', desc: 'Pinpointing critical errors students make under timed exam conditions.' },
  ];

  roadmapItems.forEach((item, idx) => {
    const x = 0.8 + idx * 2.95;
    slide2.addShape(pptx.ShapeType.roundRect, {
      x,
      y: 1.8,
      w: 2.7,
      h: 4.2,
      fill: { color: 'FFFFFF' },
      line: { color: 'CBD5E1', width: 1.5 },
    });

    slide2.addText(item.num, {
      x: x + 0.2,
      y: 2.0,
      w: 1.5,
      h: 0.5,
      fontSize: 22,
      bold: true,
      color: '2563EB',
    });

    slide2.addText(item.title, {
      x: x + 0.2,
      y: 2.7,
      w: 2.3,
      h: 0.8,
      fontSize: 14,
      bold: true,
      color: '0F172A',
    });

    slide2.addText(item.desc, {
      x: x + 0.2,
      y: 3.6,
      w: 2.3,
      h: 2.0,
      fontSize: 12,
      color: '64748B',
    });
  });

  // Slide 3: Core Concept Definitions & Principles
  const slide3 = pptx.addSlide();
  slide3.background = { color: 'F8FAFC' };

  slide3.addText(`Core Theory: ${title}`, {
    x: 0.8,
    y: 0.6,
    w: 10,
    h: 0.8,
    fontSize: 24,
    bold: true,
    color: '0F172A',
  });

  slide3.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    h: 2.2,
    fill: { color: 'EFF6FF' },
    line: { color: '3B82F6', width: 2 },
  });

  slide3.addText('ESSENTIAL DEFINITION & STATUTORY RULES', {
    x: 1.1,
    y: 1.8,
    w: 10,
    h: 0.4,
    fontSize: 12,
    bold: true,
    color: '1E40AF',
  });

  slide3.addText(
    `In modern commerce pedagogy for ${gradeClass}, ${title} governs how financial events or managerial decisions are recognized, measured, and reported. Strict compliance with board guidelines ensures complete credit in examination answers.`,
    {
      x: 1.1,
      y: 2.3,
      w: 11.0,
      h: 1.3,
      fontSize: 14,
      color: '1E293B',
      lineSpacing: 22,
    }
  );

  slide3.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 4.1,
    w: 5.7,
    h: 2.4,
    fill: { color: 'FFFFFF' },
    line: { color: 'CBD5E1', width: 1.5 },
  });
  slide3.addText('Real-World Commerce Hook', {
    x: 1.1,
    y: 4.3,
    w: 5.0,
    h: 0.4,
    fontSize: 15,
    bold: true,
    color: '0F172A',
  });
  slide3.addText('How Indian conglomerates (Reliance, Tata) and fast-growing tech ventures handle this transaction in public quarterly earnings disclosures.', {
    x: 1.1,
    y: 4.8,
    w: 5.0,
    h: 1.5,
    fontSize: 13,
    color: '64748B',
  });

  slide3.addShape(pptx.ShapeType.roundRect, {
    x: 6.8,
    y: 4.1,
    w: 5.7,
    h: 2.4,
    fill: { color: 'FEF2F2' },
    line: { color: 'EF4444', width: 1.5 },
  });
  slide3.addText('Board Exam Pitfall Alert', {
    x: 7.1,
    y: 4.3,
    w: 5.0,
    h: 0.4,
    fontSize: 15,
    bold: true,
    color: '991B1B',
  });
  slide3.addText('Watch for misleading questions that introduce uncalled capital, non-operating revenues, or omitted dates. Check working notes thoroughly!', {
    x: 7.1,
    y: 4.8,
    w: 5.0,
    h: 1.5,
    fontSize: 13,
    color: '7F1D1D',
  });

  // Slide 4: Interactive Board Illustration & Problem
  const slide4 = pptx.addSlide();
  slide4.background = { color: 'F8FAFC' };

  slide4.addText('Classroom Illustration & Board Solution', {
    x: 0.8,
    y: 0.6,
    w: 10,
    h: 0.8,
    fontSize: 24,
    bold: true,
    color: '0F172A',
  });

  slide4.addTable([
    [
      { text: 'Step #', options: { bold: true, fill: { color: '0F172A' }, color: 'FFFFFF' } },
      { text: 'Accounting / Managerial Procedure', options: { bold: true, fill: { color: '0F172A' }, color: 'FFFFFF' } },
      { text: 'Calculation Working Note', options: { bold: true, fill: { color: '0F172A' }, color: 'FFFFFF' } },
      { text: 'Final Board Presentation', options: { bold: true, fill: { color: '0F172A' }, color: 'FFFFFF' } },
    ],
    [
      { text: '1' },
      { text: 'Identify initial balances & defaults' },
      { text: 'Total units × Called-up value' },
      { text: 'Debit Share Capital / Asset A/c' },
    ],
    [
      { text: '2' },
      { text: 'Segregate received vs unpaid amounts' },
      { text: 'Verify premium received status' },
      { text: 'Credit Forfeited / Calls in Arrears' },
    ],
    [
      { text: '3' },
      { text: 'Reissue / Final Allocation adjustment' },
      { text: 'Permissible discount check' },
      { text: 'Transfer gain to Capital Reserve' },
    ],
  ], {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    h: 3.5,
    fontSize: 13,
    border: { color: 'CBD5E1', pt: 1 },
    fill: { color: 'FFFFFF' },
    autoPage: false,
  });

  // Slide 5: Classroom Checkpoint Quiz
  const slide5 = pptx.addSlide();
  slide5.background = { color: '0F172A' };

  slide5.addText('CLASSROOM CHECKPOINT • 2-MINUTE DILEMMA', {
    x: 0.8,
    y: 0.8,
    w: 10,
    h: 0.4,
    fontSize: 13,
    color: '60A5FA',
    bold: true,
  });

  slide5.addText(`Check your understanding of ${title}:`, {
    x: 0.8,
    y: 1.4,
    w: 11.5,
    h: 1.2,
    fontSize: 26,
    bold: true,
    color: 'FFFFFF',
  });

  const optionsText = [
    'A) Follow historical acquisition cost without adjustment',
    'B) Adjust through Capital Reserve or Revaluation strictly per statutory norms',
    'C) Write off directly as administrative expense without note',
    'D) Defer recognition indefinitely across consecutive accounting periods',
  ];

  optionsText.forEach((opt, idx) => {
    slide5.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 2.8 + idx * 0.9,
      w: 11.7,
      h: 0.7,
      fill: { color: '1E293B' },
      line: { color: '334155', width: 1.5 },
    });
    slide5.addText(opt, {
      x: 1.1,
      y: 2.8 + idx * 0.9,
      w: 11.0,
      h: 0.7,
      fontSize: 15,
      color: 'F1F5F9',
      bold: idx === 1,
    });
  });

  const filename = `SmartTeaching_${title.replace(/[^a-z0-9]+/gi, '_')}.pptx`;
  await pptx.writeFile({ fileName: filename });
  return `Successfully created and downloaded "${filename}" in 16:9 widescreen format!`;
}
