import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      timestamp: new Date().toISOString(),
    });
  });

  // AI Past 5-Year Questions Suggester & Topic Analyzer
  app.post('/api/suggest-past-questions', async (req, res) => {
    try {
      const { topic, subject, gradeClass, referenceContext } = req.body;

      if (!topic) {
        res.status(400).json({ success: false, error: 'Topic is required' });
        return;
      }

      const ai = getAI();
      if (!ai) {
        res.status(503).json({
          success: false,
          fallback: true,
          error: 'GEMINI_API_KEY is not configured on server',
        });
        return;
      }

      const prompt = `You are a Senior Chief Examiner and Question Paper Moderator for the Central Board of Secondary Education (CBSE), New Delhi, specializing in Senior Secondary Commerce (Classes 11 & 12).
Analyze the official past 5 years of CBSE board examination papers (2020, 2021 assessment, 2022 Term-I/II, 2023, and 2024 - including Delhi, All India, and Compartment series) for:
Subject: ${subject || 'Accountancy'}
Class: ${gradeClass || 'Class 12'}
Topic: ${topic}
${referenceContext ? `Classroom Reference Text Excerpt:\n"${referenceContext.slice(0, 1500)}"\n` : ''}

Generate a comprehensive Past 5-Year Topic Analysis and 3 to 5 realistic, high-probability predicted exam questions closely modelled after recent board trends.
Follow CBSE's latest competency-based pattern: include 1-mark objective/MCQ or Assertion-Reason, 3-4 mark short numerical or analytical cases, and 6-mark comprehensive balance sheet or policy problems.

Return strictly valid JSON with this exact schema:
{
  "topic": "${topic}",
  "subject": "${subject || 'Accountancy'}",
  "gradeClass": "${gradeClass || 'Class 12'}",
  "fiveYearFrequency": "e.g. Appeared in 4 of last 5 years (2020, 2021, 2023, 2024)",
  "avgMarksWeightage": "e.g. 6 to 8 Marks (Part A Mandatory)",
  "trendVerdict": "Clear 2-3 sentence summary of how CBSE questions on this topic evolved over 2020-2024",
  "examinerPitfalls": [
    "Common student mistake or trap highlighted in official CBSE evaluation reports",
    "Another frequent calculation or presentation blunder"
  ],
  "questions": [
    {
      "id": "pyq-ai-1",
      "topic": "${topic}",
      "subject": "${subject || 'Accountancy'}",
      "gradeClass": "${gradeClass || 'Class 12'}",
      "yearCitation": "e.g. Modelled after CBSE 2024 Delhi Set-1 (Q.24) / CBSE 2023 All India",
      "marks": 6,
      "questionType": "Numerical",
      "question": "Full CBSE-style problem with realistic values and clear requirements",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswerIndex": 0,
      "answerText": "Detailed step-by-step model solution",
      "markingSchemeSteps": [
        "Step 1 (1.5 Marks): ...",
        "Step 2 (1.5 Marks): ...",
        "Step 3 (2.0 Marks): ...",
        "Step 4 (1.0 Mark): ..."
      ],
      "examinerTrap": "Specific trap students must avoid in this question",
      "probabilityIndex": "High Probability",
      "workingNotes": "Key formulas and working note guidelines"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const responseText = response.text || '';
      const parsedData = JSON.parse(responseText);

      res.json({
        success: true,
        isAI: true,
        data: parsedData,
      });
    } catch (err: any) {
      console.error('Gemini Past Questions Error:', err);
      res.status(500).json({
        success: false,
        fallback: true,
        error: err.message || 'Error generating AI past questions',
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart Teaching Studio server running on port ${PORT}`);
  });
}

startServer();
