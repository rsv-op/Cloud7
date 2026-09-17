/**
 * ═══════════════════════════════════════════════════════════════════
 *  solutionsEngine.ts — Universal Problem-Solving Engine
 * ═══════════════════════════════════════════════════════════════════
 *
 *  A domain-agnostic engine that:
 *   1. Classifies any problem (business, individual, technical, enterprise)
 *   2. Runs multiple solution-generation strategies in parallel
 *   3. Scores solutions with multi-criteria decision analysis (MCDA)
 *   4. Iterates: predicts failure modes, refines, and learns
 *   5. Is fully extensible via pluggable domains & knowledge sources
 *
 *  Usage:
 *    const engine = new SolutionsEngine();
 *    engine.registerDomain(new LeanBusinessDomain());
 *    engine.registerDomain(new IndividualGrowthDomain());
 *
 *    const ctx = engine.understand({ description: "...", constraints: [...] });
 *    const result = engine.solve(ctx, { strategy: "all" });
 */

// ─────────────────────────────────────────────────────────────────
// CORE TYPES
// ─────────────────────────────────────────────────────────────────

export type EntityType = "business" | "individual" | "entrepreneur" | "enterprise";

export type ProblemCategory =
  | "growth" | "finance" | "operations" | "technology" | "marketing"
  | "people" | "strategy" | "product" | "legal" | "wellness"
  | "logistics" | "customer" | "innovation" | "crisis" | "other";

export type Severity = "critical" | "high" | "medium" | "low" | "opportunity";

export interface ProblemStatement {
  id: string;
  description: string;
  entity: EntityType;
  entitySize?: "solo" | "small" | "mid" | "large";
  category: ProblemCategory;
  subcategory?: string;
  severity: Severity;
  /** What success looks like, in measurable terms */
  successCriteria: string[];
  constraints: Constraint[];
  /** Facts already known about the problem */
  knownFacts: Record<string, unknown>;
  /** What the user has already tried */
  previousAttempts: Attempt[];
  urgency: number;   // 0..1 — higher = more urgent
  scope: "single_issue" | "systemic" | "strategic";
  rootCauses?: RootCause[];
  timestamp: string;
}

export interface Constraint {
  type: "budget" | "time" | "legal" | "skill" | "resource" | "political" | "ethical" | "hard";
  description: string;
  hardLimit?: boolean;
}

export interface Attempt {
  action: string;
  outcome: "failed" | "partial" | "unknown";
  lesson?: string;
}

export interface RootCause {
  statement: string;
  confidence: number; // 0..1
  depth: number;      // 5-Whys depth
}

export interface Solution {
  id: string;
  title: string;
  summary: string;
  category: ProblemCategory;
  type: "quick_fix" | "incremental" | "structural" | "transformative" | "preventive";
  /** Concrete action steps */
  actionPlan: ActionStep[];
  estimatedCost: CostEstimate;
  estimatedTimeDays: number;
  impact: number;          // 0..1 expected effectiveness
  effort: number;          // 0..1
  risk: number;            // 0..1 downside probability
  reversibility: number;   // 0..1 (1 = fully reversible)
  prerequisites: string[];
  /** KPIs to verify the solution works */
  metrics: string[];
  /** Likely failure modes and mitigations */
  failureModes: FailureMode[];
  source: string;          // which strategy generated it
  confidence: number;      // 0..1
}

export interface ActionStep {
  order: number;
  description: string;
  owner?: string;
  deadlineHint?: string;
}

export interface CostEstimate {
  min: number; max: number; currency: string;
  notes?: string;
}

export interface FailureMode {
  cause: string;
  probability: number; // 0..1
  mitigation: string;
}

export interface KnowledgeItem {
  pattern: string;              // searchable text / tags
  category: ProblemCategory;
  provenFor: EntityType[];
  content: string;
  successRate?: number;
  source?: string;
}

export interface ScoringWeights {
  impact: number;
  feasibility: number;
  cost: number;
  time: number;
  risk: number;
  reversibility: number;
  strategicFit: number;
}

export interface SolveOptions {
  strategy?: "all" | "pattern_match" | "constraint_solve" | "inversion" | "first_principles" | "analogy";
  weights?: Partial<ScoringWeights>;
  maxSolutions?: number;
  budgetCap?: number;
  iterate?: boolean;   // run the refinement loop
}

export interface ScoredSolution {
  solution: Solution;
  totalScore: number;
  breakdown: Record<string, number>;
  recommendation: "execute_now" | "plan_first" | "defer" | "reject";
}

export interface SolveResult {
  problem: ProblemStatement;
  scored: ScoredSolution[];
  rootCauseAnalysis: RootCause[];
  strategicInsight: string;
  learning: { hypothesis: string; howToValidate: string }[];
  iterationNotes: string[];
}

// ─────────────────────────────────────────────────────────────────
// DEFAULT CONFIG
// ─────────────────────────────────────────────────────────────────

const DEFAULT_WEIGHTS: ScoringWeights = {
  impact: 0.30, feasibility: 0.20, cost: 0.15, time: 0.10,
  risk: 0.10, reversibility: 0.05, strategicFit: 0.10,
};

const CATEGORY_KEYWORDS: Record<ProblemCategory, string[]> = {
  growth:      ["grow", "scale", "expand", "more customers", "revenue up", "market share"],
  finance:     ["cash flow", "profit", "cost", "budget", "funding", "debt", "margin"],
  operations:  ["process", "inefficient", "workflow", "bottleneck", "delivery", "throughput"],
  technology:  ["software", "system", "bug", "data", "automation", "digital", "platform"],
  marketing:   ["brand", "ads", "leads", "conversion", "awareness", "seo", "social"],
  people:      ["hiring", "retention", "culture", "team", "talent", "motivation", "turnover"],
  strategy:    ["direction", "pivot", "competition", "positioning", "long term", "vision"],
  product:     ["feature", "quality", "usability", "churn", "product-market fit", "feedback"],
  legal:       ["contract", "compliance", "regulation", "lawsuit", "ip", "license"],
  wellness:    ["burnout", "stress", "health", "work-life", "energy", "focus"],
  logistics:   ["supply", "inventory", "shipping", "vendor", "procurement"],
  customer:    ["complaint", "support", "satisfaction", "nps", "refund", "onboarding"],
  innovation:  ["idea", "r&d", "new product", "experiment", "differentiation"],
  crisis:      ["urgent", "failing", "losing", "shutdown", "breach", "lawsuit"],
  other:       [],
};

// ─────────────────────────────────────────────────────────────────
// DOMAIN PLUGIN INTERFACE — this is how the engine "masters" any domain
// ─────────────────────────────────────────────────────────────────

export interface DomainPlugin {
  name: string;
  supports(ctx: ProblemStatement): boolean;
  /** Generate candidate solutions for this problem */
  generate(ctx: ProblemStatement, kb: KnowledgeBase): Solution[];
  /** Domain-specific sanity checks & enhancements */
  refine(solution: Solution, ctx: ProblemStatement): Solution;
  /** Score strategic fit 0..1 */
  strategicFit(solution: Solution, ctx: ProblemStatement): number;
}

// ─────────────────────────────────────────────────────────────────
// KNOWLEDGE BASE
// ─────────────────────────────────────────────────────────────────

export class KnowledgeBase {
  private items: KnowledgeItem[] = [];

  add(item: KnowledgeItem): void { this.items.push(item); }
  addMany(items: KnowledgeItem[]): void { this.items.push(...items); }

  search(query: string, category?: ProblemCategory, entity?: EntityType): KnowledgeItem[] {
    const q = query.toLowerCase();
    const tokens = q.split(/\W+/).filter(t => t.length > 2);
    return this.items
      .map(item => {
        let score = 0;
        const hay = (item.pattern + " " + item.content).toLowerCase();
        for (const t of tokens) if (hay.includes(t)) score += 1;
        if (category && item.category === category) score += 2;
        if (entity && item.provenFor.includes(entity)) score += 1;
        return { item, score };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(r => r.item);
  }
}

// ─────────────────────────────────────────────────────────────────
// PROBLEM UNDERSTANDING — classification & root cause (5 Whys engine)
// ─────────────────────────────────────────────────────────────────

export class ProblemUnderstanding {
  understand(input: {
    description: string;
    entity?: EntityType;
    entitySize?: ProblemStatement["entitySize"];
    constraints?: Constraint[];
    successCriteria?: string[];
    previousAttempts?: Attempt[];
    knownFacts?: Record<string, unknown>;
  }): ProblemStatement {
    const category = this.classify(input.description);
    return {
      id: `pb_${Date.now().toString(36)}`,
      description: input.description,
      entity: input.entity ?? "individual",
      entitySize: input.entitySize ?? "small",
      category,
      severity: this.estimateSeverity(input.description),
      successCriteria: input.successCriteria ?? [],
      constraints: input.constraints ?? [],
      knownFacts: input.knownFacts ?? {},
      previousAttempts: input.previousAttempts ?? [],
      urgency: this.estimateUrgency(input.description),
      scope: this.estimateScope(input.description),
      rootCauses: [],
      timestamp: new Date().toISOString(),
    };
  }

  classify(description: string): ProblemCategory {
    const d = description.toLowerCase();
    let best: ProblemCategory = "other";
    let bestScore = 0;
    for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS) as [ProblemCategory, string[]][]) {
      const score = keywords.reduce((s, k) => s + (d.includes(k) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; best = cat; }
    }
    // Multi-category problems: pick top, but flag via subcategory later if needed
    return best;
  }

  /** Generate root-cause hypotheses using a structured 5-Whys + systematic probing */
  rootCauseAnalysis(ctx: ProblemStatement): RootCause[] {
    const d = ctx.description.toLowerCase();
    const causes: RootCause[] = [];

    // Framework 1: symptom-vs-cause probing
    const genericProbes: [RegExp, string, number][] = [
      [/not enough|too few|declin|drop/, "Demand or conversion leakage upstream of the visible symptom", 0.6],
      [/slow|late|delay/, "A bottleneck resource or handoff in the process chain", 0.55],
      [/expensive|cost/, "Misallocated resources or missing economies of scale/process automation", 0.5],
      [/conflict|leave|quit/, "Unmet expectations — incentives, growth path, or role clarity mismatch", 0.55],
      [/doesn't work|broken|bug|fail/, "Undetected defect introduced upstream; missing validation gates", 0.6],
      [/competitor|losing|behind/, "Capability or positioning gap relative to market evolution", 0.5],
    ];
    for (const [re, statement, conf] of genericProbes)
      if (re.test(d)) causes.push({ statement, confidence: conf, depth: 1 });

    // Framework 2: 5-Whys chain (template driven by entity type)
    const chains: Record<EntityType, string[][]> = {
      business: [
        ["Revenue is down", "Traffic/conversion/retention one of three is the leak",
         "The leak traces to a single broken funnel stage",
         "That stage broke when a key input changed (price, channel, product, message)",
         "No monitoring caught it early — feedback loop missing"],
        ["Customers complain", "Expectation set at sale ≠ experience delivered",
         "Onboarding/QA gap", "Process undocumented or skipped under load",
         "No owner accountable for that step"],
      ],
      individual: [
        ["Stuck / not progressing", "Effort is going to low-leverage activities",
         "No prioritization system", "Goals unclear or fear of choosing",
         "Identity/energy mismatch with stated goals"],
      ],
      entrepreneur: [
        ["Can't scale", "Founder is the bottleneck in every decision",
         "Nothing is documented/repeatable", "No delegation system or hired owners",
         "Business model depends on heroics, not process"],
      ],
      enterprise: [
        ["Initiatives stall", "Cross-team dependencies unmanaged",
         "Incentives misaligned between units", "No single accountable owner",
         "Governance reviews outcomes too late to correct"],
      ],
    };
    for (const entity of [ctx.entity] as EntityType[]) {
      for (const chain of chains[entity] ?? [])
        chain.forEach((statement, i) =>
          causes.push({ statement, confidence: 0.9 - i * 0.15, depth: i + 1 }));
    }

    return causes.sort((a, b) => b.confidence - a.confidence).slice(0, 8);
  }

  private estimateSeverity(desc: string): Severity {
    const d = desc.toLowerCase();
    if (/(shut ?down|bankrupt|failing|breach|lawsuit|crisis|urgent|fire)/.test(d)) return "critical";
    if (/(losing|dropping|severe|major|laid off)/.test(d)) return "high";
    if (/(improve|increase|optimize|want more)/.test(d)) return "opportunity";
    return "medium";
  }

  private estimateUrgency(desc: string): number {
    const d = desc.toLowerCase();
    if (/(today|now|urgent|asap|immediately|deadline)/.test(d)) return 0.9;
    if (/(this (week|month)|soon)/.test(d)) return 0.6;
    if (/(this quarter|next quarter)/.test(d)) return 0.4;
    return 0.3;
  }

  private estimateScope(desc: string): ProblemStatement["scope"] {
    const d = desc.toLowerCase();
    if (/(whole|entire|company-wide|culture|system|every)/.test(d)) return "systemic";
    if (/(future|next year|roadmap|vision|strategy)/.test(d)) return "strategic";
    return "single_issue";
  }
}

// ─────────────────────────────────────────────────────────────────
// SOLUTION GENERATION STRATEGIES
// ─────────────────────────────────────────────────────────────────

interface GenerationStrategy {
  name: string;
  generate(ctx: ProblemStatement, kb: KnowledgeBase, domains: DomainPlugin[]): Solution[];
}

const uid = () => `sol_${Math.random().toString(36).slice(2, 9)}`;

function baseSolution(partial: Partial<Solution> & { title: string; summary: string; category: ProblemCategory }): Solution {
  return {
    id: uid(),
    type: "incremental",
    actionPlan: [],
    estimatedCost: { min: 0, max: 0, currency: "USD" },
    estimatedTimeDays: 30,
    impact: 0.5, effort: 0.5, risk: 0.2, reversibility: 0.8,
    prerequisites: [], metrics: [], failureModes: [],
    source: "", confidence: 0.5,
    ...partial,
  };
}

/** Strategy 1: pattern-match against the knowledge base */
class PatternMatchStrategy implements GenerationStrategy {
  name = "pattern_match";
  generate(ctx, kb, _domains): Solution[] {
    const hits = kb.search(ctx.description, ctx.category, ctx.entity).slice(0, 3);
    return hits.map((h, i) => baseSolution({
      title: `Proven pattern: ${h.pattern.slice(0, 60)}`,
      summary: h.content,
      category: h.category,
      type: i === 0 ? "incremental" : "quick_fix",
      confidence: (h.successRate ?? 0.6),
      impact: (h.successRate ?? 0.6),
      source: this.name,
    }));
  }
}

/** Strategy 2: constraint-guided elimination & best-fit */
class ConstraintSolveStrategy implements GenerationStrategy {
  name = "constraint_solve";
  generate(ctx, _kb, domains): Solution[] {
    const hard = ctx.constraints.filter(c => c.hardLimit);
    const budgetCap = ctx.constraints.find(c => c.type === "budget");
    const out: Solution[] = [];

    // Rule: when hard constraints dominate → focus on reversible, low-cost moves first
    out.push(baseSolution({
      title: "Constraint-satisfaction: minimal viable intervention",
      summary: `Satisfy ${hard.length} hard constraint(s) with the smallest change that removes the binding constraint, then re-solve.`,
      category: ctx.category,
      type: "quick_fix",
      actionPlan: [
        { order: 1, description: "Rank constraints by binding-ness (which one blocks all progress)" },
        { order: 2, description: "Remove or relax the top constraint with the cheapest reversible action" },
        { order: 3, description: "Re-run this engine on the relaxed problem (constraints shift)" },
      ],
      estimatedTimeDays: 7,
      impact: 0.55, effort: 0.25, risk: 0.1, reversibility: 0.95,
      confidence: 0.7, source: this.name,
      metrics: ["Constraint removed?", "Problem severity re-scored"],
    }));

    // Rule: budget-capped → bootstrap / trade-time-for-money option
    if (budgetCap) {
      out.push(baseSolution({
        title: "Bootstrap: trade time/money asymmetry",
        summary: "Replace capital-intensive moves with labor-intensive ones (manual first, automate later — do things that don't scale, deliberately).",
        category: ctx.category,
        type: "incremental",
        estimatedTimeDays: 21,
        impact: 0.5, effort: 0.8, risk: 0.15, reversibility: 0.9,
        confidence: 0.65, source: this.name,
        metrics: ["Cost per outcome vs. baseline"],
      }));
    }

    for (const d of domains) if (d.supports(ctx)) out.push(...d.generate(ctx, new KnowledgeBase()).slice(0, 2));
    return out;
  }
}

/** Strategy 3: inversion — solve the opposite, then negate */
class InversionStrategy implements GenerationStrategy {
  name = "inversion";
  generate(ctx): Solution[] {
    const inverted = ctx.description
      .replace(/not enough/gi, "too many of")
      .replace(/can't|cannot/gi, "can always")
      .replace(/want to increase/gi, "want to decrease");
    return [baseSolution({
      title: "Inverted framing: guarantee failure, then reverse it",
      summary: `Instead of "${ctx.description}", ask: "What would guarantee the worst outcome?" — then systematically do the opposite. Inverted: "${inverted}"`,
      category: ctx.category,
      type: "structural",
      actionPlan: [
        { order: 1, description: "List 10 actions that would guarantee the problem gets worse" },
        { order: 2, description: "Invert each into a preventive or corrective action" },
        { order: 3, description: "Execute the top 3 inverted actions" },
      ],
      estimatedTimeDays: 14,
      impact: 0.6, effort: 0.4, risk: 0.1, reversibility: 0.9,
      confidence: 0.6, source: this.name,
      metrics: ["Failure behaviors eliminated"],
    })];
  }
}

/** Strategy 4: first-principles decomposition */
class FirstPrinciplesStrategy implements GenerationStrategy {
  name = "first_principles";
  generate(ctx): Solution[] {
    return [baseSolution({
      title: "First-principles rebuild: decompose to fundamentals",
      summary: "Break the problem into atomic facts that are certainly true, ignore assumptions & analogies, and rebuild a solution from those atoms. Solutions built this way escape 'how it's always been done'.",
      category: ctx.category,
      type: "transformative",
      actionPlan: [
        { order: 1, description: "List every assumption in the current approach; mark which are merely convention" },
        { order: 2, description: "State the fundamental constraints (physics/budget/legal) that remain" },
        { order: 3, description: "Design 3 solutions from atoms-up; pick by constraint fit" },
      ],
      estimatedTimeDays: 30,
      impact: 0.75, effort: 0.7, risk: 0.3, reversibility: 0.5,
      confidence: 0.55, source: this.name,
      metrics: ["Assumptions invalidated", "Cost/time vs. conventional approach"],
    })];
  }
}

/** Strategy 5: cross-domain analogy transfer */
class AnalogyStrategy implements GenerationStrategy {
  name = "analogy";
  private analogyMap: Record<ProblemCategory, { domain: string; insight: string }[]> = {
    operations:   [{ domain: "manufacturing (Toyota)", insight: "Kaizen: small continuous improvements by the people doing the work beat top-down overhauls" }],
    marketing:    [{ domain: "evolution/biology", insight: "Run many small variants, let market selection (data) kill weak ones — A/B like natural selection" }],
    people:       [{ domain: "sports teams", insight: "Draft for culture-fit + coachability over raw pedigree; clear roles beat star collections" }],
    finance:      [{ domain: "household budgeting", insight: "Pay yourself first: allocate profit/capital before expenses, not from what's left" }],
    technology:   [{ domain: "aviation safety", insight: "Blameless post-mortems + checklists; every failure becomes a system fix, not a person fix" }],
    customer:     [{ domain: "hospitality", insight: "The last 10% of the experience (recovery, follow-up) drives loyalty more than the first 90%" }],
    growth:       [{ domain: "compound interest", insight: "Optimize the loop that compounds (retention/referral) before pouring fuel on acquisition" }],
    product:      [{ domain: "cooking", insight: "Mise en place: fix inputs (feedback intake, quality data) before blaming the recipe (features)" }],
    strategy:     [{ domain: "chess", insight: "Win the tempo: force the opponent/market to react to you; don't mirror — change the game's key dimension" }],
    innovation:   [{ domain: "venture capital", insight: "Portfolio thinking: many cheap shots, double down on whatever hits; kill fast what doesn't" }],
    logistics:    [{ domain: "river systems", insight: "Fix the narrowest point of flow first; widening elsewhere is waste" }],
    legal:        [{ domain: "insurance", insight: "Shift risk contractually before it materializes; document everything contemporaneously" }],
    wellness:     [{ domain: "endurance training", insight: "Periodization: stress + deliberate recovery beats constant max effort" }],
    crisis:       [{ domain: "ER medicine", insight: "Triage: stabilize vitals first (cash/runway), then diagnose deeply, then treat permanently" }],
    other:        [{ domain: "ecosystems", insight: "Find the keystone species — the one element whose removal collapses everything; protect/replace it first" }],
  };

  generate(ctx): Solution[] {
    const analogies = this.analogyMap[ctx.category] ?? this.analogyMap.other;
    return analogies.map(a => baseSolution({
      title: `Cross-domain analogy: ${a.domain}`,
      summary: a.insight,
      category: ctx.category,
      type: "structural",
      estimatedTimeDays: 10,
      impact: 0.6, effort: 0.35, risk: 0.15, reversibility: 0.85,
      confidence: 0.5, source: this.name,
      metrics: ["Principle adopted", "Effect measured"],
    }));
  }
}

// ─────────────────────────────────────────────────────────────────
// SCORING ENGINE — MCDA (multi-criteria decision analysis)
// ─────────────────────────────────────────────────────────────────

export class ScoringEngine {
  score(
    solutions: Solution[],
    ctx: ProblemStatement,
    weights: ScoringWeights,
    domains: DomainPlugin[],
    budgetCap?: number,
  ): ScoredSolution[] {
    return solutions.map(s => {
      const fit = domains.reduce((acc, d) => Math.max(acc, d.strategicFit(s, ctx)), 0.5);
      const overBudget = budgetCap !== undefined && s.estimatedCost.min > budgetCap;

      const breakdown = {
        impact: s.impact,
        feasibility: 1 - s.effort,
        cost: budgetCap ? Math.min(1, budgetCap / Math.max(s.estimatedCost.min, 1)) : (s.estimatedCost.max < 1000 ? 1 : 0.5),
        time: Math.max(0, 1 - s.estimatedTimeDays / 90),
        risk: 1 - s.risk,
        reversibility: s.reversibility,
        strategicFit: fit,
      };

      const total =
        weights.impact * breakdown.impact +
        weights.feasibility * breakdown.feasibility +
        weights.cost * breakdown.cost +
        weights.time * breakdown.time +
        weights.risk * breakdown.risk +
        weights.reversibility * breakdown.reversibility +
        weights.strategicFit * breakdown.strategicFit;

      // Penalize previous failed attempts that look identical
      const repeatPenalty = ctx.previousAttempts.some(a => s.summary.toLowerCase().includes(a.action.toLowerCase().slice(0, 20))) ? 0.15 : 0;

      const finalScore = Math.max(0, total - repeatPenalty - (overBudget ? 0.3 : 0));

      let recommendation: ScoredSolution["recommendation"];
      if (overBudget) recommendation = "reject";
      else if (finalScore >= 0.65 && s.type === "quick_fix") recommendation = "execute_now";
      else if (finalScore >= 0.55) recommendation = "plan_first";
      else recommendation = "defer";

      return { solution: s, totalScore: Math.round(finalScore * 100) / 100, breakdown, recommendation };
    }).sort((a, b) => b.totalScore - a.totalScore);
  }
}

// ─────────────────────────────────────────────────────────────────
// REFINEMENT LOOP — failure-mode anticipation & iteration
// ─────────────────────────────────────────────────────────────────

export class RefinementLoop {
  run(scored: ScoredSolution[], ctx: ProblemStatement, domains: DomainPlugin[]): { refined: ScoredSolution[]; notes: string[] } {
    const notes: string[] = [];
    const refined = scored.map(sc => {
      let s = { ...sc.solution };

      // Anticipate failure modes
      const genericFM: FailureMode[] = [
        { cause: "Stakeholder resistance / change fatigue", probability: 0.4, mitigation: "Pilot on small scope; recruit one visible champion first" },
        { cause: "Under-estimated complexity", probability: 0.45, mitigation: "Timebox discovery; define a kill-criterion in advance" },
        { cause: "Solution addresses symptom, not root cause", probability: 0.35, mitigation: "Verify against root-cause chain before scaling" },
        { cause: "Resource pulled away mid-execution", probability: 0.3, mitigation: "Assign a named owner; weekly metric review" },
      ];
      s.failureModes = [...(s.failureModes ?? []), ...genericFM].slice(0, 6);

      // Domain refinements
      for (const d of domains) if (d.supports(ctx)) s = d.refine(s, ctx);

      // Ensure measurability
      if (s.metrics.length === 0) {
        s.metrics = ["Baseline metric defined", "Target set", "Weekly review cadence"];
        notes.push(`Added default metrics to "${s.title}"`);
      }
      return { ...sc, solution: s };
    });
    return { refined, notes };
  }
}

// ─────────────────────────────────────────────────────────────────
// EXAMPLE DOMAIN PLUGINS
// ─────────────────────────────────────────────────────────────────

export class LeanBusinessDomain implements DomainPlugin {
  name = "lean_business";
  supports(ctx) { return ctx.entity === "business" || ctx.entity === "entrepreneur"; }

  generate(ctx): Solution[] {
    return [
      baseSolution({
        title: "Lean loop: measure → learn → pivot/persevere",
        summary: "Frame the problem as an assumption to test. Build the smallest experiment that produces a decision-quality signal within 2 weeks.",
        category: ctx.category, type: "incremental",
        actionPlan: [
          { order: 1, description: "Write the riskiest assumption about the problem as a falsifiable hypothesis" },
          { order: 2, description: "Design the cheapest experiment that could falsify it" },
          { order: 3, description: "Run it; decide pivot vs. persevere with data" },
        ],
        estimatedTimeDays: 14, impact: 0.6, effort: 0.4, risk: 0.1, reversibility: 0.95,
        confidence: 0.7, source: this.name,
        metrics: ["Experiment result", "Decision made"],
      }),
    ];
  }

  refine(s) {
    if (s.type === "transformative")
      return { ...s, failureModes: [...s.failureModes, { cause: "Big-bang rollout", probability: 0.5, mitigation: "Ship to 5-10% cohort first" }] };
    return s;
  }

  strategicFit(s) { return s.type === "incremental" ? 0.85 : 0.6; }
}

export class EnterpriseDomain implements DomainPlugin {
  name = "enterprise";
  supports(ctx) { return ctx.entity === "enterprise"; }

  generate(ctx): Solution[] {
    return [
      baseSolution({
        title: "Operating-model fix: RACI + governance cadence",
        summary: "Most enterprise problems are coordination problems. Assign a single accountable owner, define the decision rights, and install a weekly review cadence.",
        category: ctx.category, type: "structural",
        estimatedTimeDays: 45, impact: 0.65, effort: 0.55, risk: 0.2, reversibility: 0.7,
        confidence: 0.65, source: this.name,
        metrics: ["Decision latency", "Cross-team blockers cleared per week"],
      }),
    ];
  }

  refine(s) {
    return { ...s, prerequisites: [...s.prerequisites, "Executive sponsor identified"] };
  }

  strategicFit(s) { return s.type === "structural" ? 0.8 : 0.6; }
}

export class IndividualGrowthDomain implements DomainPlugin {
  name = "individual_growth";
  supports(ctx) { return ctx.entity === "individual"; }

  generate(ctx): Solution[] {
    return [
      baseSolution({
        title: "Energy & leverage audit (80/20 at personal level)",
        summary: "Track one week of time & energy. Cut the bottom 20% of activities (delegated, deleted, or batched); double the top 20% that produces most outcomes.",
        category: ctx.category, type: "quick_fix",
        estimatedTimeDays: 7, impact: 0.55, effort: 0.2, risk: 0.05, reversibility: 1,
        confidence: 0.75, source: this.name,
        metrics: ["Hours reclaimed/week", "Output on top-20% activities"],
      }),
      baseSolution({
        title: "Accountability system: commitment device + weekly review",
        summary: "Implementation beats insight. Add an external commitment (partner, coach, public deadline) and a fixed weekly self-review against the success criteria.",
        category: ctx.category, type: "preventive",
        estimatedTimeDays: 3, impact: 0.5, effort: 0.15, risk: 0.05, reversibility: 1,
        confidence: 0.7, source: this.name,
        metrics: ["Weekly review adherence", "Commitments kept %"],
      }),
    ];
  }

  refine(s) { return s; }
  strategicFit(s) { return s.estimatedTimeDays <= 14 ? 0.85 : 0.6; }
}

// ─────────────────────────────────────────────────────────────────
// THE ENGINE — orchestrates everything
// ─────────────────────────────────────────────────────────────────

export class SolutionsEngine {
  private understanding = new ProblemUnderstanding();
  private scorer = new ScoringEngine();
  private loop = new RefinementLoop();
  private kb = new KnowledgeBase();
  private domains: DomainPlugin[] = [];
  private strategies: GenerationStrategy[] = [
    new PatternMatchStrategy(),
    new ConstraintSolveStrategy(),
    new InversionStrategy(),
    new FirstPrinciplesStrategy(),
    new AnalogyStrategy(),
  ];

  constructor(private defaultWeights: ScoringWeights = DEFAULT_WEIGHTS) {}

  registerDomain(d: DomainPlugin): this { this.domains.push(d); return this; }
  teach(items: KnowledgeItem[]): this { this.kb.addMany(items); return this; }
  registerStrategy(s: GenerationStrategy): this { this.strategies.push(s); return this; }

  /** Step 1 — turn raw input into a structured problem */
  understand(input: Parameters<ProblemUnderstanding["understand"]>[0]): ProblemStatement {
    const ctx = this.understanding.understand(input);
    ctx.rootCauses = this.understanding.rootCauseAnalysis(ctx);
    return ctx;
  }

  /** Step 2 — generate, score, refine, and rank solutions */
  solve(ctx: ProblemStatement, options: SolveOptions = {}): SolveResult {
    const weights = { ...this.defaultWeights, ...options.weights };
    const strategyFilter = options.strategy && options.strategy !== "all"
      ? this.strategies.filter(s => s.name === options.strategy)
      : this.strategies;

    // 1. Generate candidates from every strategy
    let candidates: Solution[] = [];
    for (const s of strategyFilter) candidates.push(...s.generate(ctx, this.kb, this.domains));

    // 2. Dedup by normalized summary
    const seen = new Set<string>();
    candidates = candidates.filter(c => {
      const key = c.summary.toLowerCase().replace(/\W+/g, " ").slice(0, 80);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // 3. Score (MCDA)
    let scored = this.scorer.score(candidates, ctx, weights, this.domains, options.budgetCap);

    // 4. Refine: anticipate failures, apply domain knowledge
    const notes: string[] = [];
    if (options.iterate !== false) {
      const r = this.loop.run(scored, ctx, this.domains);
      scored = r.refined;
      notes.push(...r.notes);
    }

    // 5. Trim
    scored = scored.slice(0, options.maxSolutions ?? 8);

    // 6. Meta-learning hypotheses
    const learning = [
      { hypothesis: "The top root-cause chain is correct", howToValidate: "Test the deepest cause with one reversible intervention; watch the symptom" },
      { hypothesis: `The #1 ranked solution outperforms status quo`, howToValidate: `Run for ${Math.min(scored[0]?.solution.estimatedTimeDays ?? 14, 14)} days, compare against success criteria` },
    ];

    const strategicInsight = this.synthesizeInsight(ctx, scored);

    return {
      problem: ctx, scored,
      rootCauseAnalysis: ctx.rootCauses ?? [],
      strategicInsight, learning, iterationNotes: notes,
    };
  }

  /** One-call convenience: raw text → full result */
  solveRaw(description: string, extra: Partial<Parameters<ProblemUnderstanding["understand"]>[0]> = {}, options: SolveOptions = {}): SolveResult {
    return this.solve(this.understand({ description, ...extra }), options);
  }

  private synthesizeInsight(ctx: ProblemStatement, scored: ScoredSolution[]): string {
    if (scored.length === 0) return "No viable candidates generated — expand the knowledge base or relax constraints.";
    const top = scored[0];
    const quickWins = scored.filter(s => s.solution.type === "quick_fix" && s.totalScore > 0.5).length;
    return [
      `Problem classified as ${ctx.category} (${ctx.severity}) for a ${ctx.entitySize ?? "small"} ${ctx.entity}.`,
      `Top recommendation: "${top.solution.title}" (score ${top.totalScore}) — ${top.recommendation}.`,
      quickWins > 0 ? `${quickWins} quick win(s) available; execute them in parallel with the main plan to build momentum.` : "No quick wins — invest in the structural fix directly.",
      ctx.scope === "systemic" ? "Systemic scope: expect 2–3 iterations of this engine; solutions that fix one node will surface the next bottleneck." : "Single-issue scope: one well-executed cycle should suffice.",
    ].join(" ");
  }
}

// ─────────────────────────────────────────────────────────────────
// DEMO
// ─────────────────────────────────────────────────────────────────

if (require.main === module) {
  const engine = new SolutionsEngine()
    .registerDomain(new LeanBusinessDomain())
    .registerDomain(new EnterpriseDomain())
    .registerDomain(new IndividualGrowthDomain())
    .teach([
      { pattern: "SaaS churn reduction onboarding checklist", category: "product", provenFor: ["business", "entrepreneur"],
        content: "Add a checklist-based onboarding with an 'aha' milestone in the first session; churn typically drops 10–20%.", successRate: 0.7 },
      { pattern: "cash flow small business invoice faster", category: "finance", provenFor: ["business"],
        content: "Invoice immediately on delivery, shorten terms to 14 days, offer 2% early-pay discount.", successRate: 0.65 },
    ]);

  const result = engine.solveRaw(
    "My SaaS startup's revenue is dropping because customers churn after the first month, and we have budget constraints",
    {
      entity: "entrepreneur", entitySize: "small",
      constraints: [
        { type: "budget", description: "No budget for paid tools", hardLimit: true },
        { type: "time", description: "Founder has ~5 hrs/week" },
      ],
      successCriteria: ["Churn < 5% monthly", "Revenue recovering within 90 days"],
      previousAttempts: [{ action: "Sent a feedback survey", outcome: "partial", lesson: "Low response rate" }],
    },
    { maxSolutions: 6, iterate: true },
  );

  console.log("STRATEGIC INSIGHT:", result.strategicInsight, "\n");
  result.scored.forEach((s, i) =>
    console.log(`${i + 1}. [${s.totalScore}] ${s.solution.title} → ${s.recommendation}`));
}


// ═══════════════════════════════════════════════════════════════════
//  LAUNCH7 CATALOG LAYER — exported API consumed by app pages
// ═══════════════════════════════════════════════════════════════════

/** A Launch7 execution template: a proven, packaged solution plan for a vertical */
export interface Launch7Template {
  id: string;
  name: string;
  vertical: string;                 // e.g. "SaaS", "E-commerce", "Agency"
  category: ProblemCategory;
  description: string;
  tags: string[];
  steps: ActionStep[];
  estimatedCost: CostEstimate;
  estimatedTimeDays: number;
  expectedImpact: number;           // 0..1
  provenFor: EntityType[];
  kpis: string[];
}

/** The master catalog powering the Launch7 Studio Execution Platform */
export const LAUNCH7_CATALOG: Launch7Template[] = [
  {
    id: "l7_saas_onboarding_revival",
    name: "SaaS Onboarding Revival",
    vertical: "SaaS",
    category: "product",
    description: "Checklist-driven first-session onboarding with an aha-milestone; targets first-month churn.",
    tags: ["saas", "churn", "onboarding", "activation", "retention"],
    steps: [
      { order: 1, description: "Instrument activation funnel (signup → aha moment)" },
      { order: 2, description: "Design checklist onboarding with 3–5 milestones" },
      { order: 3, description: "Trigger in-app nudges for stalled users at 24h / 72h" },
      { order: 4, description: "Review activation lift weekly; iterate copy/flow" },
    ],
    estimatedCost: { min: 0, max: 500, currency: "USD", notes: "Founder time only" },
    estimatedTimeDays: 14,
    expectedImpact: 0.7,
    provenFor: ["business", "entrepreneur"],
    kpis: ["Activation rate", "Month-1 churn"],
  },
  {
    id: "l7_cro_checkout_recovery",
    name: "Checkout & Cart Recovery Sprint",
    vertical: "E-commerce",
    category: "marketing",
    description: "Plug the three biggest revenue leaks: checkout friction, cart abandonment, and post-purchase follow-up.",
    tags: ["ecommerce", "cro", "checkout", "abandoned cart", "email"],
    steps: [
      { order: 1, description: "Audit checkout steps; remove fields & add express pay" },
      { order: 2, description: "Launch 3-email abandoned-cart sequence (1h/24h/72h)" },
      { order: 3, description: "Add post-purchase cross-sell + review request flow" },
    ],
    estimatedCost: { min: 100, max: 800, currency: "USD" },
    estimatedTimeDays: 10,
    expectedImpact: 0.65,
    provenFor: ["business"],
    kpis: ["Checkout conversion", "Cart recovery rate", "AOV"],
  },
  {
    id: "l7_cashflow_rescue",
    name: "Small-Business Cash Flow Rescue",
    vertical: "General Business",
    category: "finance",
    description: "Invoice on delivery, shorten terms, add early-pay incentives; triage payables by criticality.",
    tags: ["cash flow", "invoices", "finance", "small business"],
    steps: [
      { order: 1, description: "Switch to invoicing at delivery with 14-day terms" },
      { order: 2, description: "Offer 2% early-pay discount on largest receivables" },
      { order: 3, description: "Rank payables; negotiate top 3 vendors to net-30" },
    ],
    estimatedCost: { min: 0, max: 200, currency: "USD" },
    estimatedTimeDays: 7,
    expectedImpact: 0.6,
    provenFor: ["business", "entrepreneur", "individual"],
    kpis: ["Days sales outstanding (DSO)", "Cash runway"],
  },
  {
    id: "l7_agency_pipeline_engine",
    name: "Agency Pipeline Engine",
    vertical: "Agency / Services",
    category: "growth",
    description: "Systematize outbound + referral loops so client acquisition stops depending on founder luck.",
    tags: ["agency", "lead generation", "outbound", "referral", "pipeline"],
    steps: [
      { order: 1, description: "Define one ICP and one signature offer" },
      { order: 2, description: "Stand up 20-contact/day personalized outreach cadence" },
      { order: 3, description: "Add referral ask + incentive to every project close" },
      { order: 4, description: "Weekly pipeline review (lead → call → proposal → close)" },
    ],
    estimatedCost: { min: 50, max: 400, currency: "USD" },
    estimatedTimeDays: 21,
    expectedImpact: 0.62,
    provenFor: ["business", "entrepreneur"],
    kpis: ["Qualified calls/week", "Close rate", "Referral share"],
  },
  {
    id: "l7_ops_bottleneck_blitz",
    name: "Operations Bottleneck Blitz",
    vertical: "Operations",
    category: "operations",
    description: "Map the workflow, find the single narrowest point of flow, fix it, repeat.",
    tags: ["operations", "process", "bottleneck", "workflow", "kaizen"],
    steps: [
      { order: 1, description: "Map the end-to-end process with volume/time per step" },
      { order: 2, description: "Identify the constraint (queue builds only there)" },
      { order: 3, description: "Fix the constraint; add a weekly throughput metric" },
    ],
    estimatedCost: { min: 0, max: 300, currency: "USD" },
    estimatedTimeDays: 14,
    expectedImpact: 0.58,
    provenFor: ["business", "enterprise", "entrepreneur"],
    kpis: ["Cycle time", "Throughput", "WIP"],
  },
  {
    id: "l7_personal_leverage_reset",
    name: "Personal Leverage Reset",
    vertical: "Individual",
    category: "wellness",
    description: "Energy + time audit, cut the bottom 20% of activities, install weekly review & accountability.",
    tags: ["productivity", "focus", "burnout", "time management"],
    steps: [
      { order: 1, description: "Log one week of time and energy levels" },
      { order: 2, description: "Delete/delegate/batch bottom-20% activities" },
      { order: 3, description: "Block top-20% deep work on calendar; weekly self-review" },
    ],
    estimatedCost: { min: 0, max: 0, currency: "USD" },
    estimatedTimeDays: 7,
    expectedImpact: 0.55,
    provenFor: ["individual", "entrepreneur"],
    kpis: ["Hours reclaimed/week", "Deep-work hours"],
  },
];

/**
 * Rank catalog templates against a problem context.
 * Scores tag/category overlap, vertical match, and entity fit.
 */
export function matchTemplates(
  ctx: ProblemStatement,
  catalog: Launch7Template[] = LAUNCH7_CATALOG,
  limit = 5,
): Launch7Template[] {
  const tokens = ctx.description.toLowerCase().split(/\W+/).filter(t => t.length > 2);
  return catalog
    .map(t => {
      let score = 0;
      for (const tok of tokens) {
        if (t.tags.some(tag => tag.includes(tok) || tok.includes(tag))) score += 2;
        if (t.description.toLowerCase().includes(tok)) score += 1;
        if (t.name.toLowerCase().includes(tok)) score += 1;
      }
      if (t.category === ctx.category) score += 3;
      if (t.provenFor.includes(ctx.entity)) score += 1;
      if (ctx.constraints.some(c => c.hardLimit) && t.estimatedCost.max <= 500) score += 1;
      return { t, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(r => r.t);
}

export interface ROIResult {
  totalCost: number;
  totalBenefit: number;
  netGain: number;
  roiPct: number;          // (netGain / totalCost) * 100
  paybackDays: number;     // cost / (benefit / horizonDays)
  verdict: "excellent" | "good" | "marginal" | "poor";
}

/** Simple operational ROI over a horizon (days), assuming linear benefit accrual. */
export function calculateOperationalROI(
  costs: CostEstimate,
  expectedBenefitPerMonth: number,
  horizonDays = 90,
): ROIResult {
  const totalCost = costs.max;
  const totalBenefit = (expectedBenefitPerMonth / 30) * horizonDays;
  const netGain = totalBenefit - totalCost;
  const roiPct = totalCost === 0 ? (netGain > 0 ? 999 : 0) : (netGain / totalCost) * 100;
  const dailyBenefit = totalBenefit / horizonDays;
  const paybackDays = dailyBenefit > 0 ? Math.ceil(totalCost / dailyBenefit) : Infinity;
  const verdict: ROIResult["verdict"] =
    roiPct >= 200 ? "excellent" : roiPct >= 75 ? "good" : roiPct >= 0 ? "marginal" : "poor";
  return { totalCost, totalBenefit, netGain, roiPct, paybackDays, verdict };
}

/**
 * Serialize a solution or ranked SolveResult into a compact Launch7 blueprint
 * JSON string — consumed by promptEngine.ts for LLM prompt assembly.
 */
export function serializeToLaunch7(input: SolveResult | Launch7Template | Solution): string {
  if ("scored" in input) {
    // SolveResult → ranked blueprint
    return JSON.stringify({
      platform: "Launch7",
      version: 1,
      problem: {
        id: input.problem.id,
        description: input.problem.description,
        category: input.problem.category,
        severity: input.problem.severity,
        entity: input.problem.entity,
      },
      rootCauses: input.rootCauseAnalysis.map(rc => ({
        statement: rc.statement, confidence: rc.confidence,
      })),
      rankedSolutions: input.scored.map(s => ({
        title: s.solution.title,
        score: s.totalScore,
        recommendation: s.recommendation,
        type: s.solution.type,
        actionPlan: s.solution.actionPlan,
        estimatedCost: s.solution.estimatedCost,
        estimatedTimeDays: s.solution.estimatedTimeDays,
        metrics: s.solution.metrics,
        failureModes: s.solution.failureModes,
      })),
      strategicInsight: input.strategicInsight,
      learningHypotheses: input.learning,
    });
  }
  if ("vertical" in input) {
    // Launch7Template → single blueprint
    return JSON.stringify({
      platform: "Launch7",
      version: 1,
      template: {
        id: input.id, name: input.name, vertical: input.vertical,
        description: input.description, steps: input.steps,
        estimatedCost: input.estimatedCost, estimatedTimeDays: input.estimatedTimeDays,
        kpis: input.kpis,
      },
    });
  }
  // Solution → single blueprint
  return JSON.stringify({
    platform: "Launch7",
    version: 1,
    solution: {
      id: input.id, title: input.title, summary: input.summary,
      type: input.type, actionPlan: input.actionPlan,
      estimatedCost: input.estimatedCost, estimatedTimeDays: input.estimatedTimeDays,
      metrics: input.metrics,
    },
  });
}
