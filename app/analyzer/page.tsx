"use client";

import React, { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

const SUPPORTED_LANGUAGES = [
  "typescript",
  "javascript",
  "python",
  "kotlin",
  "java",
  "go",
  "rust",
  "csharp",
  "cpp",
  "swift",
  "php",
  "sql",
  "shell",
  "html",
  "css"
] as const;

interface AnalysisResult {
  rating: string;
  score: number;
  language: string;
  issues: string[];
  suggestions: string[];
}

function CodeAnalyzerContent() {
  const searchParams = useSearchParams();
  const initialLang = searchParams.get("lang") || "typescript";

  const [language, setLanguage] = useState<string>(initialLang);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string>("");

  const metrics = useMemo(() => {
    const lines = code.trim() ? code.split("\n").length : 0;
    const characters = code.length;
    return { lines, characters };
  }, [code]);

  const runAnalysis = async () => {
    if (!code.trim()) {
      setError("Please paste code before initiating analysis.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Analysis failed to complete.");
      }
      setResult(data.analysis);
    } catch (err: any) {
      setError(err.message || "Failed to connect to analysis engine.");
    } finally {
      setLoading(false);
    }
  };

  const openInAIStudio = () => {
    const promptText = `Please provide a deep architectural, security, and performance audit for this ${language} code:\n\n\`\`\`${language}\n${code}\n\`\`\``;
    navigator.clipboard.writeText(promptText);
    window.open("https://aistudio.google.com/app/prompts/new_chat", "_blank");
  };

  return (
    <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem 1rem", color: "#f3f4f6", fontFamily: "sans-serif" }}>
      <header style={{ borderBottom: "1px solid #374151", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.875rem", fontWeight: "bold", margin: 0 }}>Cloud7 Code Quality & Architecture Engine</h1>
        <p style={{ color: "#9ca3af", marginTop: "0.5rem" }}>Unified multi-language evaluator with Google AI Studio diagnostics.</p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.875rem", color: "#9ca3af", display: "block", marginBottom: "0.25rem" }}>Select Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ background: "#1f2937", color: "#fff", border: "1px solid #4b5563", borderRadius: "6px", padding: "0.5rem 1rem", fontSize: "0.875rem" }}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
            Lines: <span style={{ color: "#fff", fontWeight: "bold" }}>{metrics.lines}</span> | Chars: <span style={{ color: "#fff", fontWeight: "bold" }}>{metrics.characters}</span>
          </div>
        </div>

        <div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Paste your ${language} source code here...`}
            rows={14}
            style={{ width: "100%", background: "#111827", color: "#e5e7eb", fontFamily: "monospace", fontSize: "0.875rem", border: "1px solid #374151", borderRadius: "8px", padding: "1rem", boxSizing: "border-box" }}
          />
        </div>

        {error && (
          <div style={{ background: "#7f1d1d", color: "#fecaca", padding: "0.75rem", borderRadius: "6px", fontSize: "0.875rem" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            onClick={runAnalysis}
            disabled={loading}
            style={{ background: loading ? "#4b5563" : "#2563eb", color: "#fff", border: "none", borderRadius: "6px", padding: "0.75rem 1.5rem", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Analyzing..." : "Run Analysis"}
          </button>

          <button
            onClick={openInAIStudio}
            disabled={!code.trim()}
            style={{ background: "#374151", color: "#fff", border: "1px solid #4b5563", borderRadius: "6px", padding: "0.75rem 1.5rem", fontWeight: "600", cursor: !code.trim() ? "not-allowed" : "pointer" }}
          >
            Copy Prompt & Open Google AI Studio
          </button>
        </div>

        {result && (
          <section style={{ marginTop: "2rem", border: "1px solid #374151", borderRadius: "8px", padding: "1.5rem", background: "#1f2937" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #374151", paddingBottom: "1rem" }}>
              <h2 style={{ fontSize: "1.25rem", margin: 0 }}>Diagnostic Verdict: {result.rating}</h2>
              <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: result.score >= 70 ? "#34d399" : "#f87171" }}>
                {result.score}/100
              </span>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h3 style={{ fontSize: "1rem", color: "#f87171", margin: "0.5rem 0" }}>Identified Issues</h3>
              <ul style={{ paddingLeft: "1.25rem", margin: 0, color: "#d1d5db" }}>
                {result.issues.map((issue, idx) => (
                  <li key={idx} style={{ marginBottom: "0.25rem" }}>{issue}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <h3 style={{ fontSize: "1rem", color: "#60a5fa", margin: "0.5rem 0" }}>Optimization Suggestions</h3>
              <ul style={{ paddingLeft: "1.25rem", margin: 0, color: "#d1d5db" }}>
                {result.suggestions.map((sug, idx) => (
                  <li key={idx} style={{ marginBottom: "0.25rem" }}>{sug}</li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default function CodeAnalyzerPage() {
  return (
    <Suspense fallback={<div style={{ color: "#9ca3af", padding: "2rem" }}>Loading Cloud7 Engine...</div>}>
      <CodeAnalyzerContent />
    </Suspense>
  );
}

