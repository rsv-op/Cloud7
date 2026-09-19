```typescript
// File: app/verticalforge/page.tsx

"use client";

import React, { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  SolutionsEngine,
  LeanBusinessDomain,
  EnterpriseDomain,
  IndividualGrowthDomain,
  ProblemStatement,
  ScoredSolution,
  EntityType,
  Launch7Template,
  calculateOperationalROI,
  matchTemplates,
} from "@/lib/solutionsEngine";
import {
  generateBlueprintPrompt,
  PromptPayload,
  sanitizeInput,
  EntityKind,
} from "@/lib/promptEngine";

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
    if (!description.trim()) {
      setError("Please describe the operational bottleneck or business challenge.");
      return;
    }
    setError("");

    const cleanInput = sanitizeInput(description);
    const parsedBudget = budget ? parseFloat(budget) : undefined;

    const ctx = engine.understand({
      description: cleanInput,
      entity,
    });

    const solveResult = engine.solve(ctx, {
      budgetCap: parsedBudget,
    });

    const matched = matchTemplates([ctx]);

    setResult({
      ctx,
      scored: solveResult.scored,
      matched,
    });
  };

  const monthlyBenefit = useMemo(() => {
    if (!result) return 0;
    return result.scored.reduce((sum, sc) => sum + sc.solution.impact, 0) * 2000;
  }, [result]);

  const copyBlueprint = async () => {
    if (!result) return;

    const payload: PromptPayload = {
      rawInput: description,
      problemContext: result.ctx,
      templates: result.matched,
      entity: entity as EntityKind,
      context: {
        "Budget Constraint": budget ? `$${budget}` : "Unconstrained",
        "Primary AI Recommendation": result.scored?.solution.title || "AI Discretion",
        "Strategic Solution Summary": result.scored?.solution.summary || "Pending Analysis",
        "Target SLA": `${result.scored?.solution.estimatedTimeDays || 7} Days`,
      },
      format: "markdown",
    };

    const securePrompt = generateBlueprintPrompt(payload);
    await navigator.clipboard.writeText(securePrompt);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
      window.open("https://aistudio.google.com/app/prompts/new_chat", "_blank");
    }, 1500);
  };

  return (
    <main style={s.page}>
      <header style={s.header}>
        <div style={s.badge}>Interactive Diagnostic Engine</div>
        <h1 style={s.h1}>VerticalForge</h1>
        <p style={s.sub}>
          Diagnose physical business friction, analyze root causes, and calculate 90-day operational ROI.
        </p>
      </header>

      <section style={s.panel}>
        <textarea
          style={s.textarea}
          rows={4}
          placeholder="e.g. My physical retail store pipeline dried up, customer acquisition costs are high, and administrative hours are unmonitored..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div style={s.controls}>
          <label style={s.label}>
            Entity Type
            <select
              style={s.select}
              value={entity}
              onChange={(e) => setEntity(e.target.value as EntityType)}
            >
              <option value="individual">Individual</option>
              <option value="entrepreneur">Entrepreneur</option>
              <option value="business">Business</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </label>

          <label style={s.label}>
            Budget Cap (USD, Optional)
            <input
              style={s.input}
              type="number"
              placeholder="e.g. 1000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </label>

          <button style={s.primaryBtn} onClick={solve}>
            Forge Solution Matrix →
          </button>
        </div>
        {error && <p style={s.error}>{error}</p>}
      </section>

      {result && (
        <>
          {/* Root Cause Diagnosis */}
          <section style={s.panel}>
            <h3 style={s.h3}>Root Cause Triage</h3>
            <p style={s.fact}>
              Category: <b>{result.ctx.category}</b> · Severity: <b>{result.ctx.severity}</b> · Scope: <b>{result.ctx.scope}</b>
            </p>
            {(result.ctx.rootCauses ?? []).slice(0, 4).map((rc, i) => (
              <p key={i} style={s.rootCause}>
                ↳ {rc.statement} <span style={s.conf}>({Math.round(rc.confidence * 100)}% confidence)</span>
              </p>
            ))}
          </section>

          {/* Matched Templates */}
          {result.matched.length > 0 && (
            <section style={s.panel}>
              <h3 style={s.h3}>Matched Cloud7 OS Templates</h3>
              {result.matched.map((t) => (
                <div key={t.id} style={s.templateRow}>
                  <b>{t.name}</b>
                  <span style={s.templateMeta}>{t.vertical} · ⏱ {t.estimatedTimeDays} Days Deployment</span>
                </div>
              ))}
            </section>
          )}

          {/* Ranked Solutions & ROI */}
          <section style={s.panel}>
            <h3 style={s.h3}>Ranked Strategic Solutions</h3>
            {result.scored.map((sc, i) => {
              const roi = calculateOperationalROI(
                sc.solution.estimatedCost,
                monthlyBenefit * sc.solution.impact,
                90
              );
              return (
                <div key={sc.solution.id} style={s.solutionCard}>
                  <div style={s.solutionHeader}>
                    <span style={s.rank}>#{i + 1}</span>
                    <b>{sc.solution.title}</b>
                    <span style={s.badgeStyle(sc.recommendation)}>
                      {sc.recommendation.replace("_", " ")}
                    </span>
                  </div>
                  <p style={s.cardDesc}>{sc.solution.summary}</p>

                  <div style={s.meta}>
                    <span>Impact Score: {sc.totalScore}</span>
                    <span>⏱ {sc.solution.estimatedTimeDays}d</span>
                    <span>
                      💰 {sc.solution.estimatedCost.currency} \\({sc.solution.estimatedCost.min}–\\){sc.solution.estimatedCost.max}
                    </span>
                    <span>
                      ROI: {roi.roiPct.toFixed(0)}% · Payback: {roi.paybackDays === Infinity ? "n/a" : `${roi.paybackDays}d`}
                    </span>
                  </div>

                  <ol style={s.ol}>
                    {sc.solution.actionPlan.slice(0, 4).map((st) => (
                      <li key={st.order} style={s.li}>
                        {st.description}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}

            <div style={{ marginTop: "1.5rem" }}>
              <button style={s.dispatchBtn} onClick={copyBlueprint}>
                {copied
                  ? "✓ PII Scrubbed AI Prompt Copied! Launching AI Studio..."
                  : "Copy Secure AI Blueprint Prompt (PII Scrubbed)"}
              </button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default function VerticalForgePage() {
  return (
    <Suspense
      fallback={
        <main style={s.page}>
          <p style={{ color: "#94a3b8" }}>Initializing VerticalForge Matrix…</p>
        </main>
      }
    >
      <VerticalForgeContent />
    </Suspense>
  );
}

// ─────────────────────────────────────────────────────────────────
// INSTITUTIONAL DESIGN SYSTEM INLINE MODULE
// ─────────────────────────────────────────────────────────────────
const s: Record<string, any> = {
  page: {
    minHeight: "100vh",
    background: "#0b132b",
    color: "#f8fafc",
    padding: "3rem 1.5rem",
    fontFamily: "var(--font-inter), system-ui, sans-serif",
    maxWidth: 880,
    margin: "0 auto",
  },
  header: { marginBottom: "2rem" },
  badge: {
    display: "inline-block",
    background: "rgba(56, 189, 248, 0.1)",
    color: "#38bdf8",
    border: "1px solid rgba(56, 189, 248, 0.2)",
    padding: "0.25rem 0.75rem",
    borderRadius: "50px",
    fontSize: "0.75rem",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "0.75rem",
  },
  h1: {
    fontSize: "2.5rem",
    margin: 0,
    fontFamily: "var(--font-space-grotesk), sans-serif",
    letterSpacing: "-0.02em",
  },
  h3: {
    marginTop: 0,
    color: "#38bdf8",
    fontFamily: "var(--font-space-grotesk), sans-serif",
  },
  sub: { color: "#94a3b8", fontSize: "1.05rem", marginTop: "0.5rem" },
  panel: {
    background: "#1e293b",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  textarea: {
    width: "100%",
    background: "#0b132b",
    color: "#f8fafc",
    border: "1px solid rgba(56, 189, 248, 0.3)",
    borderRadius: 8,
    padding: "1rem",
    resize: "vertical",
    boxSizing: "border-box",
    fontSize: "0.95rem",
    lineHeight: "1.5",
    outline: "none",
  },
  controls: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-end",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    fontSize: "0.85rem",
    color: "#94a3b8",
  },
  select: {
    background: "#0b132b",
    color: "#f8fafc",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    padding: "0.6rem 0.8rem",
    fontSize: "0.9rem",
  },
  input: {
    background: "#0b132b",
    color: "#f8fafc",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    padding: "0.6rem 0.8rem",
    width: 160,
    fontSize: "0.9rem",
  },
  primaryBtn: {
    background: "#38bdf8",
    color: "#000",
    border: "none",
    borderRadius: 8,
    padding: "0.7rem 1.4rem",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginLeft: "auto",
  },
  dispatchBtn: {
    background: "#10b981",
    color: "#000",
    border: "none",
    borderRadius: 8,
    padding: "1.1rem 1.5rem",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  error: { color: "#ef4444", marginTop: "0.75rem", fontSize: "0.875rem" },
  fact: { color: "#cbd5e1", marginBottom: "1rem", fontSize: "0.9rem" },
  rootCause: { color: "#94a3b8", margin: "0.3rem 0", fontSize: "0.9rem" },
  conf: { color: "#38bdf8" },
  templateRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0.6rem 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  templateMeta: { color: "#94a3b8", fontSize: "0.85rem" },
  solutionCard: {
    background: "#0b132b",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: 10,
    padding: "1.2rem",
    marginBottom: "1rem",
  },
  solutionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexWrap: "wrap",
  },
  rank: { color: "#38bdf8", fontWeight: 700 },
  badgeStyle: (rec: string) => ({
    fontSize: "0.7rem",
    textTransform: "uppercase" as const,
    padding: "0.2rem 0.6rem",
    borderRadius: 99,
    fontWeight: "bold" as const,
    background:
      rec === "execute_now"
        ? "rgba(16, 185, 129, 0.15)"
        : rec === "plan_first"
        ? "rgba(56, 189, 248, 0.15)"
        : "rgba(255,255,255,0.05)",
    color:
      rec === "execute_now"
        ? "#10b981"
        : rec === "plan_first"
        ? "#38bdf8"
        : "#94a3b8",
  }),
  cardDesc: { color: "#94a3b8", fontSize: "0.9rem", margin: "0.5rem 0" },
  meta: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    fontSize: "0.8rem",
    color: "#cbd5e1",
    margin: "0.75rem 0",
  },
  ol: { paddingLeft: "1.2rem", color: "#cbd5e1", fontSize: "0.875rem" },
  li: { marginBottom: "0.3rem" },
};
```
