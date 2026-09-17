
// File: app/launch7/page.tsx
"use client";

import React, { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  LAUNCH7_CATALOG,
  Launch7Template,
} from "../../lib/solutionsEngine";
import { generateBlueprintPrompt, PromptPayload } from "../../lib/promptEngine";

/**
 * Launch7 Studio — Execution Platform & Blueprint Dispatcher
 * Architecture: Next.js App Router | Client Component
 * Patch: Elevated Modal Z-Index (2000) to clear sticky mobile header collision.
 * Role: Browse the pre-engineered catalog, filter by vertical, and dispatch 
 *       sanitized architectural prompts directly to Google AI Studio.
 */

function Launch7Content() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const vertical = params.get("vertical") ?? "";

  const [selected, setSelected] = useState<Launch7Template | null>(null);
  const [copied, setCopied] = useState(false);

  // Client-Side Deterministic Filtering
  const templates = useMemo(() => {
    let list = LAUNCH7_CATALOG;
    if (vertical) {
      list = list.filter((t) =>
        t.vertical.toLowerCase().includes(vertical.toLowerCase())
      );
    }
    if (q) {
      const tokens = q.toLowerCase().split(/\W+/).filter(Boolean);
      list = list
        .map((t) => {
          const hay = (t.name + t.description + (t.tags || []).join(" ")).toLowerCase();
          const score = tokens.reduce((s, tok) => s + (hay.includes(tok) ? 1 : 0), 0);
          return { t, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.t);
    }
    return list;
  }, [q, vertical]);

  // Zero-Cost Dispatch Sequence via PII Firewall
  const copyBlueprint = async (t: Launch7Template) => {
    // Strictly aligned with PromptPayload interface in lib/promptEngine.ts
    const payload: PromptPayload = {
      rawInput: `Deploy ${t.name} architecture for the ${t.vertical} vertical to accelerate pipeline velocity.`,
      template: t,
      format: "markdown"
    };

    const securePrompt = generateBlueprintPrompt(payload);
    
    await navigator.clipboard.writeText(securePrompt);
    setCopied(true);
    
    // Auto-redirect to AI Studio for frictionless execution
    setTimeout(() => {
      setCopied(false);
      window.open('https://aistudio.google.com/app/prompts/new_chat', '_blank');
    }, 1500);
  };

  return (
    <main style={s.page}>
      <header style={s.header}>
        <div style={s.slaBadge}>7-Day Guaranteed Deployment SLA</div>
        <h1 style={s.h1}>Execution Studio</h1>
        <p style={s.sub}>
          Dispatch custom, edge-optimized web architectures built from our pre-engineered catalog. 
          100% Client Code Ownership. Zero Monthly Lock-in.
        </p>
        {(q || vertical) && (
          <p style={s.filterNote}>
            Active Triage Filters: {vertical && <span style={s.tag}>Vertical: {vertical}</span>} {q && <span style={s.tag}>Query: {q}</span>}
            <a href="/launch7" style={s.link}>Clear Filters ✕</a>
          </p>
        )}
      </header>

      <div style={s.grid}>
        {templates.map((t) => (
          <button key={t.id} style={s.card} onClick={() => setSelected(t)}>
            <div style={s.vertical}>{t.vertical}</div>
            <h3 style={s.cardTitle}>{t.name}</h3>
            <p style={s.cardDesc}>{t.description}</p>
            <div style={s.meta}>
              <span>⏱ {t.estimatedTimeDays}d SLA</span>
              <span>
                💰 {t.estimatedCost?.currency || 'USD'} {t.estimatedCost?.min || 0}–{t.estimatedCost?.max || 0}
              </span>
              <span>📈 {Math.round((t.expectedImpact || 0) * 100)}% Lift</span>
            </div>
          </button>
        ))}
        {templates.length === 0 && (
          <div style={s.emptyState}>
            <p style={s.empty}>No architectures match your current operational parameters.</p>
            <a href="/launch7" style={s.link}>Reset Catalog Matrix</a>
          </div>
        )}
      </div>

      {selected && (
        <div style={s.modal} onClick={() => setSelected(null)}>
          <div style={s.modalBox} onClick={(e) => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <div style={s.vertical}>{selected.vertical}</div>
              <button style={s.closeIcon} onClick={() => setSelected(null)}>✕</button>
            </div>
            <h2 style={s.h2}>{selected.name}</h2>
            <p style={s.cardDesc}>{selected.description}</p>

            <div style={s.metricsRow}>
              <div style={s.metricBox}>
                <div style={s.metricLabel}>Deployment SLA</div>
                <div style={s.metricValue}>{selected.estimatedTimeDays} Days</div>
              </div>
              <div style={s.metricBox}>
                <div style={s.metricLabel}>Projected Impact</div>
                <div style={s.metricValue}>{Math.round((selected.expectedImpact || 0) * 100)}%</div>
              </div>
            </div>

            <h4 style={s.h4}>Architectural Execution Plan</h4>
            <ol style={s.ol}>
              {(selected.steps || []).map((st: any, i: number) => (
                <li key={i} style={s.li}>{st.description}</li>
              ))}
            </ol>

            <h4 style={s.h4}>Success KPIs</h4>
            <ul style={s.ul}>
              {(selected.kpis || []).map((k: string, i: number) => (
                <li key={i} style={s.li}>{k}</li>
              ))}
            </ul>

            <div style={s.modalActions}>
              <button style={s.primaryBtn} onClick={() => copyBlueprint(selected)}>
                {copied ? "✓ Secure Prompt Copied! Launching AI..." : "Initialize Blueprint Dispatch →"}
              </button>
              <button style={s.ghostBtn} onClick={() => setSelected(null)}>Abort</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function Launch7Page() {
  return (
    <Suspense fallback={<main style={s.page}><p style={s.loading}>Initializing Launch7 Execution Matrix…</p></main>}>
      <Launch7Content />
    </Suspense>
  );
}

// ─────────────────────────────────────────────────────────────────
// INSTITUTIONAL DESIGN SYSTEM (Inline Module)
// ─────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#0b132b", color: "#f8fafc", padding: "4rem 2rem", fontFamily: "var(--font-inter), system-ui, sans-serif", maxWidth: 1200, margin: "0 auto", animation: "fade-in 0.6s ease-out" },
  header: { marginBottom: "3rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "2rem" },
  slaBadge: { display: "inline-block", background: "rgba(16, 185, 129, 0.1)", color: "#10b981", border: "1px solid rgba(16, 185, 129, 0.3)", padding: "0.5rem 1rem", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" },
  h1: { fontSize: "2.5rem", margin: "0 0 0.5rem 0", fontFamily: "var(--font-space-grotesk), system-ui, sans-serif", letterSpacing: "-0.02em" },
  h2: { marginTop: 0, fontFamily: "var(--font-space-grotesk), system-ui, sans-serif", fontSize: "1.75rem" },
  h4: { marginBottom: "0.5rem", color: "#38bdf8", textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em" },
  sub: { color: "#94a3b8", fontSize: "1.125rem", maxWidth: "800px", lineHeight: "1.6" },
  filterNote: { color: "#94a3b8", marginTop: "1.5rem", fontSize: "0.875rem", display: "flex", gap: "1rem", alignItems: "center" },
  tag: { background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", padding: "0.25rem 0.75rem", borderRadius: "50px", border: "1px solid rgba(56, 189, 248, 0.2)" },
  link: { color: "#ef4444", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem", marginLeft: "auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" },
  card: { textAlign: "left", background: "#1e293b", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "1.5rem", cursor: "pointer", color: "inherit", transition: "transform 0.2s ease, border-color 0.2s ease" },
  vertical: { fontSize: "0.75rem", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "bold", marginBottom: "0.5rem" },
  cardTitle: { margin: "0 0 0.5rem 0", fontSize: "1.25rem", fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" },
  cardDesc: { color: "#94a3b8", fontSize: "0.875rem", lineHeight: "1.5", margin: 0 },
  meta: { display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.75rem", color: "#64748b", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)" },
  emptyState: { gridColumn: "1 / -1", textAlign: "center", padding: "4rem", background: "#1e293b", borderRadius: "12px", border: "1px dashed rgba(255, 255, 255, 0.1)" },
  empty: { color: "#94a3b8", fontSize: "1.125rem", marginBottom: "1rem" },
  modal: { position: "fixed", inset: 0, background: "rgba(11, 19, 43, 0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 2000 },
  modalBox: { background: "#1e293b", border: "1px solid rgba(56, 189, 248, 0.2)", borderRadius: "16px", padding: "1.5rem", maxWidth: 600, width: "100%", maxHeight: "85vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
  closeIcon: { background: "transparent", border: "none", color: "#94a3b8", fontSize: "1.25rem", cursor: "pointer" },
  metricsRow: { display: "flex", gap: "1rem", margin: "1.25rem 0", padding: "1rem", background: "#0b132b", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" },
  metricBox: { flex: 1 },
  metricLabel: { fontSize: "0.65rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" },
  metricValue: { fontSize: "1.25rem", color: "#10b981", fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: "bold" },
  ol: { paddingLeft: "1.2rem", color: "#e2e8f0", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "1.5rem" },
  ul: { paddingLeft: "1.2rem", color: "#e2e8f0", fontSize: "0.875rem", lineHeight: "1.6", marginBottom: "2rem" },
  li: { marginBottom: "0.5rem" },
  modalActions: { display: "flex", gap: "0.75rem", marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)", flexDirection: "row", flexWrap: "wrap" },
  primaryBtn: { flex: "1 1 200px", background: "linear-gradient(135deg, #38bdf8, #2563eb)", color: "#fff", border: "none", borderRadius: "8px", padding: "1rem", cursor: "pointer", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.05em", boxShadow: "0 4px 15px rgba(56, 189, 248, 0.3)" },
  ghostBtn: { flex: "1 1 100px", background: "transparent", color: "#94a3b8", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "8px", padding: "1rem", cursor: "pointer", textTransform: "uppercase", fontSize: "0.875rem", fontWeight: "bold" },
  loading: { color: "#38bdf8", textAlign: "center", padding: "4rem", fontFamily: "var(--font-space-grotesk)" }
};
