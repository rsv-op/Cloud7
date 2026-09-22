import { NextRequest, NextResponse } from "next/server";

interface AnalysisPayload {
  language: string;
  code: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AnalysisPayload;
    const { language, code } = body;

    if (!code || !language) {
      return NextResponse.json(
        { error: "Language and code must be provided." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_KEY;

    if (!apiKey) {
      // Fallback local heuristic analysis if environment secret is unpopulated
      const lines = code.split("\n").length;
      const complexityScore = Math.min(100, Math.max(10, Math.round(100 - lines * 0.4)));
      return NextResponse.json({
        analysis: {
          rating: complexityScore >= 75 ? "Optimal" : "Needs Refactoring",
          score: complexityScore,
          language,
          issues: [
            "Local Heuristic: Set GEMINI_API_KEY to enable Google AI Studio deep semantic auditing."
          ],
          suggestions: [
            "Ensure defensive null-checks and type assertions across boundary calls.",
            "Verify time and space complexity against scale thresholds."
          ]
        }
      });
    }

    const prompt = `Analyze this ${language} code for architectural quality, security vulnerabilities, edge cases, and performance:

\`\`\`${language}${code}
\`\`\`

Return a valid JSON object matching this schema exactly:
{
  "rating": "Optimal" | "Suboptimal" | "Critical Issues",
  "score": number,
  "language": "${language}",
  "issues": string[],
  "suggestions": string[]
}`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `Google AI Studio rejected request: ${errText}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const parsedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const analysis = JSON.parse(parsedText);

    return NextResponse.json({ analysis });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Internal Analysis Error" },
      { status: 500 }
    );
  }
}

