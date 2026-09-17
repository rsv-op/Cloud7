
"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  SolutionsEngine,
  LeanBusinessDomain,
  EnterpriseDomain,
  IndividualGrowthDomain,
  ProblemStatement,
  ScoredSolution,
  EntityType,
  calculateOperationalROI,
  matchTemplates,
  serializeToLaunch7,
  LAUNCH7_CATALOG,
  Launch7Template,
} from "../../lib/solutionsEngine";

/**
 * VerticalForge — Universal Problem Solver
 * Describe any business / individual / enterprise problem →
 * get classified, root-caused, ranked solutions with ROI + blueprint export.
 * Deep-link: /verticalforge?q=my%20problem
 */

const engine = new SolutionsEngine()
  .registerDomain(new LeanBusinessDomain())
  .registerDomain(new EnterpriseDomain())
  .registerDomain(new IndividualGrowthDomain());

interface ForgeState {
  ctx: ProblemStatement;
  scored: ScoredSolution[];
  matched: Launch7Template[];
}

function VerticalForgeContent() {
  const params = useSearchParams();
  const initialQ = params.get("q") ?? "";

  const [description, setDescription] = useState(initialQ);
  const [entity, setEntity] = useState<EntityType>("entrepreneur");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState<ForgeState | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const solve = () => {
    if (description.trim().length < 10) {
      setError("Describe the problem in a bit more detail (10+ characters).");
      return;
    }
    setError("");
    const ctx = engine.understand({
      description,
      entity,
      constraints: budget
        ? [{ type: "budget", description: `Budget cap ${budget}`, hardLimit: true }]
        : [],
    });
    const solved = engine.solve(ctx, { maxSolutions: 6, budgetCap: budget ? Number(budget) : undefined });
    const matched = matchTemplates(ctx, LAUNCH7_CATALOG, 3);
    setResult({ ctx, scored: solved.scored, matched });
  };

  const monthlyBenefit = useMemo(() => {
    if (!result) return 0;
    return result.scored.reduce((sum, sc) => sum + sc.solution.impact, 0) * 2000;
  }, [result]);

  const copyBlueprint = async () => {
    if (!result) return;
    const payload = {
      problem: result.ctx.description,
      solutions: result.scored.map((sc) => sc.solution.title),
      matchedTemplates: result.matched.map((t) => t.name),
    };
    await navigator.clipboard.writeText(serializeToLaunch7({
      problem: result.ctx,
      scored: result.scored,
      rootCauseAnalysis: result.ctx.rootCauses ?? [],
      strategicInsight: "",
      learning: [],
      iterationNotes: [],
    }));
    void payload;
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main style={s.page}>
      <header style={s.header}>
        <h1 style={s.h1}>VerticalForge</h1>
        <p style={s.sub}>Describe any problem — get root causes, ranked solutions, and ROI.</p>
      </header>

      <section style={s.panel}>
        <textarea
          style={s.textarea}
          rows={4}
          placeholder="e.g. My agency's pipeline dried up after our biggest client left and I have limited budget…"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={s.controls}>
          <label style={s.label}>
            Who&apos;s solving?
            <select style={s.select} value={entity} onChange={(e) => setEntity(e.target.value as EntityType)}>
              <option value="individual">Individual</option>
              <option value="entrepreneur">Entrepreneur</option>
              <option value="business">Business</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </label>
          <label style={s.label}>
            Budget cap (USD, optional)
            <input
              style={s.input}
              type="number"
              placeholder="e.g. 500"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </label>
          <button style={s.primaryBtn} onClick={solve}>Forge solutions →</button>
        </div>
        {error && <p style={s.error}>{error}</p>}
      </section>

      {result && (
        <>
          <section style={s.panel}>
            <h3 style={s.h3}>Diagnosis</h3>
            <p style={s.fact}>
              Category: <b>{result.ctx.category}</b> · Severity: <b>{result.ctx.severity}</b> · Scope:{" "}
              <b>{result.ctx.scope}</b>
            </p>
            {(result.ctx.rootCauses ?? []).slice(0, 3).map((rc, i) => (
              <p key={i} style={s.rootCause}>
                ↳ {rc.statement} <span style={s.conf}>({Math.round(rc.confidence * 100)}%)</span>
              </p>
            ))}
          </section>

          {result.matched.length > 0 && (
            <section style={s.panel}>
              <h3 style={s.h3}>Matching Launch7 templates</h3>
              {result.matched.map((t) => (
                <div key={t.id} style={s.templateRow}>
                  <b>{t.name}</b>
                  <span style={s.templateMeta}>{t.vertical} · ⏱ {t.estimatedTimeDays}d</span>
                </div>
              ))}
            </section>
          )}

          <section style={s.panel}>
            <h3 style={s.h3}>Ranked solutions</h3>
            {result.scored.map((sc, i) => {
              const roi = calculateOperationalROI(sc.solution.estimatedCost, monthlyBenefit * sc.solution.impact, 90);
              return (
                <div key={sc.solution.id} style={s.solutionCard}>
                  <div style={s.solutionHeader}>
                    <span style={s.rank}>#{i + 1}</span>
                    <b>{sc.solution.title}</b>
                    <span style={s.badge(sc.recommendation)}>{sc.recommendation.replace("_", " ")}</span>
                  </div>
                  <p style={s.cardDesc}>{sc.solution.summary}</p>
                  <div style={s.meta}>
                    <span>Score {sc.totalScore}</span>
                    <span>⏱ {sc.solution.estimatedTimeDays}d</span>
                    <span>
                      💰 {sc.solution.estimatedCost.currency} {sc.solution.estimatedCost.min}–{sc.solution.estimatedCost.max}
                    </span>
                    <span>ROI {roi.roiPct.toFixed(0)}% · payback {roi.paybackDays === Infinity ? "n/a" : `${roi.paybackDays}d`}</span>
                  </div>
                  <ol style={s.ol}>
                    {sc.solution.actionPlan.slice(0, 4).map((st) => (
                      <li key={st.order} style={s.li}>{st.description}</li>
                    ))}
                  </ol>
                </div>
              );
            })}
            <button style={s.primaryBtn} onClick={copyBlueprint}>
              {copied ? "✓ Blueprint copied!" : "Copy full blueprint JSON"}
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default function VerticalForgePage() {
  return (
    <Suspense fallback={<main style={s.page}><p>Loading…</p></main>}>
      <VerticalForgeContent />
    </Suspense>
  );
}

const s: Record<string, any> = {
  page: { minHeight: "100vh", background: "#0a0f1e", color: "#e2e8f0", padding: "2rem", fontFamily: "system-ui, sans-serif", maxWidth: 860, margin: "0 auto" },
  header: { marginBottom: "1.5rem" },
  h1: { fontSize: "2rem", margin: 0 },
  h3: { marginTop: 0, color: "#93c5fd" },
  sub: { color: "#94a3b8" },
  panel: { background: "#111827", border: "1px solid #1f2937", borderRadius: 12, padding: "1.2rem", marginBottom: "1.2rem" },
  textarea: { width: "100%", background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155", borderRadius: 8, padding: "0.8rem", resize: "vertical", boxSizing: "border-box" },
  controls: { display: "flex", gap: "1rem", alignItems: "flex-end", flexWrap: "wrap", marginTop: "0.8rem" },
  label: { display: "flex", flexDirection: "column", gap: "0.3rem", fontSize: "0.85rem", color: "#94a3b8" },
  select: { background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155", borderRadius: 8, padding: "0.5rem" },
  input: { background: "#0f172a", color: "#e2e8f0", border: "1px solid #334155", borderRadius: 8, padding: "0.5rem", width: 140 },
  primaryBtn: { background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.2rem", cursor: "pointer" },
  error: { color: "#f87171" },
  fact: { color: "#cbd5e1" },
  rootCause: { color: "#94a3b8", margin: "0.2rem 0" },
  conf: { color: "#60a5fa" },
  templateRow: { display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #1f2937" },
  templateMeta: { color: "#94a3b8", fontSize: "0.85rem" },
  solutionCard: { background: "#0f172a", border: "1px solid #1f2937", borderRadius: 10, padding: "1rem", marginBottom: "0.8rem" },
  solutionHeader: { display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" },
  rank: { color: "#60a5fa", fontWeight: 700 },
  badge: (rec: string) => ({
    fontSize: "0.72rem", textTransform: "uppercase", padding: "0.15rem 0.5rem", borderRadius: 99,
    background: rec === "execute_now" ? "#064e3b" : rec === "plan_first" ? "#1e3a8a" : "#374151",
    color: rec === "execute_now" ? "#6ee7b7" : rec === "plan_first" ? "#93c5fd" : "#9ca3af",
  }),
  cardDesc: { color: "#94a3b8", fontSize: "0.9rem" },
  meta: { display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.8rem", color: "#cbd5e1", margin: "0.5rem 0" },
  ol: { paddingLeft: "1.2rem", color: "#cbd5e1", fontSize: "0.9rem" },
  li: { marginBottom: "0.25rem" },
};
