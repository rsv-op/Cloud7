
"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  LAUNCH7_CATALOG,
  Launch7Template,
  SolutionsEngine,
  LeanBusinessDomain,
  EnterpriseDomain,
  IndividualGrowthDomain,
  serializeToLaunch7,
} from "../../lib/solutionsEngine";

/**
 * Launch7 Studio — Execution Platform
 * Browse the template catalog, filter by vertical, view blueprints.
 * Deep-link support: /launch7?vertical=SaaS  or  /launch7?q=churn
 */

const engine = new SolutionsEngine()
  .registerDomain(new LeanBusinessDomain())
  .registerDomain(new EnterpriseDomain())
  .registerDomain(new IndividualGrowthDomain());

function Launch7Content() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const vertical = params.get("vertical") ?? "";

  const [selected, setSelected] = useState<Launch7Template | null>(null);
  const [copied, setCopied] = useState(false);

  const templates = useMemo(() => {
    let list = LAUNCH7_CATALOG;
    if (vertical)
      list = list.filter((t) =>
        t.vertical.toLowerCase().includes(vertical.toLowerCase())
      );
    if (q) {
      const tokens = q.toLowerCase().split(/\W+/).filter(Boolean);
      list = list
        .map((t) => {
          const hay = (t.name + t.description + t.tags.join(" ")).toLowerCase();
          const score = tokens.reduce((s, tok) => s + (hay.includes(tok) ? 1 : 0), 0);
          return { t, score };
        })
        .filter((r) => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((r) => r.t);
    }
    return list;
  }, [q, vertical]);

  const copyBlueprint = async (t: Launch7Template) => {
    await navigator.clipboard.writeText(serializeToLaunch7(t));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main style={s.page}>
      <header style={s.header}>
        <h1 style={s.h1}>Launch7 Studio</h1>
        <p style={s.sub}>Execution Platform — proven templates, ranked and ready to run</p>
        {(q || vertical) && (
          <p style={s.filterNote}>
            Filtered: {vertical && `vertical="${vertical}" `}{q && `query="${q}"`} ·{" "}
            <a href="/launch7" style={s.link}>clear</a>
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
              <span>⏱ {t.estimatedTimeDays}d</span>
              <span>
                💰 {t.estimatedCost.currency} {t.estimatedCost.min}–{t.estimatedCost.max}
              </span>
              <span>📈 {Math.round(t.expectedImpact * 100)}% impact</span>
            </div>
          </button>
        ))}
        {templates.length === 0 && <p style={s.empty}>No templates match. Try a different filter.</p>}
      </div>

      {selected && (
        <div style={s.modal} onClick={() => setSelected(null)}>
          <div style={s.modalBox} onClick={(e) => e.stopPropagation()}>
            <h2 style={s.h2}>{selected.name}</h2>
            <p style={s.cardDesc}>{selected.description}</p>

            <h4 style={s.h4}>Action plan</h4>
            <ol style={s.ol}>
              {selected.steps.map((st) => (
                <li key={st.order} style={s.li}>{st.description}</li>
              ))}
            </ol>

            <h4 style={s.h4}>KPIs</h4>
            <ul style={s.ul}>
              {selected.kpis.map((k) => (
                <li key={k} style={s.li}>{k}</li>
              ))}
            </ul>

            <div style={s.modalActions}>
              <button style={s.primaryBtn} onClick={() => copyBlueprint(selected)}>
                {copied ? "✓ Copied!" : "Copy blueprint JSON"}
              </button>
              <button style={s.ghostBtn} onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function Launch7Page() {
  return (
    <Suspense fallback={<main style={s.page}><p>Loading…</p></main>}>
      <Launch7Content />
    </Suspense>
  );
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#0a0f1e", color: "#e2e8f0", padding: "2rem", fontFamily: "system-ui, sans-serif" },
  header: { marginBottom: "2rem" },
  h1: { fontSize: "2rem", margin: 0 },
  h2: { marginTop: 0 },
  h4: { marginBottom: "0.4rem", color: "#93c5fd" },
  sub: { color: "#94a3b8" },
  filterNote: { color: "#60a5fa" },
  link: { color: "#60a5fa" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" },
  card: { textAlign: "left", background: "#111827", border: "1px solid #1f2937", borderRadius: 12, padding: "1.2rem", cursor: "pointer", color: "inherit" },
  vertical: { fontSize: "0.75rem", color: "#60a5fa", textTransform: "uppercase", letterSpacing: 1 },
  cardTitle: { margin: "0.4rem 0" },
  cardDesc: { color: "#94a3b8", fontSize: "0.9rem" },
  meta: { display: "flex", gap: "0.8rem", flexWrap: "wrap", fontSize: "0.8rem", color: "#cbd5e1", marginTop: "0.8rem" },
  empty: { color: "#94a3b8" },
  modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", zIndex: 50 },
  modalBox: { background: "#0f172a", border: "1px solid #1f2937", borderRadius: 16, padding: "1.6rem", maxWidth: 560, width: "100%", maxHeight: "85vh", overflowY: "auto" },
  ol: { paddingLeft: "1.2rem", color: "#cbd5e1" },
  ul: { paddingLeft: "1.2rem", color: "#cbd5e1" },
  li: { marginBottom: "0.3rem" },
  modalActions: { display: "flex", gap: "0.8rem", marginTop: "1.2rem" },
  primaryBtn: { background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "0.6rem 1.2rem", cursor: "pointer" },
  ghostBtn: { background: "transparent", color: "#94a3b8", border: "1px solid #334155", borderRadius: 8, padding: "0.6rem 1.2rem", cursor: "pointer" },
};
