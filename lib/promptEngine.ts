
// File: lib/promptEngine.ts

/**
 * ═══════════════════════════════════════════════════════════════════
 *  promptEngine.ts — User-Input → Precision Prompt Translator
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Turns raw, messy user information into production-grade prompts:
 *   0. SANITIZE — strict Regex firewall to strip PII before parsing
 *   1. EXTRACT  — parses intent, entity, goals, constraints from free text
 *   2. NORMALIZE— fills missing slots with smart defaults
 *   3. GROUND   — binds the prompt to Launch7 catalog templates + engine output
 *   4. ASSEMBLE — builds a structured prompt with an explicit output contract
 *   5. HARDEN   — red-team / validation prompt variants for quality control
 */

import {
  BottleneckType,
  classifyBottleneck,
  LAUNCH7_CATALOG,
  Launch7Template,
  ProblemStatement,
  SolutionsEngine,
  LeanBusinessDomain,
  EnterpriseDomain,
  IndividualGrowthDomain,
  serializeToLaunch7,
  matchTemplates,
} from "./solutionsEngine";

// ─────────────────────────────────────────────────────────────────
// 0. ZERO-COST PII SANITIZATION FIREWALL (Data Compliance)
// ─────────────────────────────────────────────────────────────────

const PII_PATTERNS = [
  { regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, token: '[REDACTED_EMAIL]' },
  { regex: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, token: '[REDACTED_PHONE]' },
  { regex: /\b(?:\d[ -]*?){13,19}\b/g, token: '[REDACTED_FINANCIAL_ID]' },
  { regex: /\b(?:SSN|Social Security|ID)[\s:-]*\d{3}[-]?\d{2}[-]?\d{4}\b/gi, token: '[REDACTED_GOV_ID]' }
];

export function sanitizeInput(text: string | undefined | null): string {
  if (!text) return '';
  let sanitized = text;
  PII_PATTERNS.forEach(({ regex, token }) => {
    sanitized = sanitized.replace(regex, token);
  });
  return sanitized;
}

// ─────────────────────────────────────────────────────────────────
// PUBLIC TYPES
// ─────────────────────────────────────────────────────────────────

export type EntityKind = "individual" | "entrepreneur" | "business" | "enterprise" | "unknown";

export type PromptFlavor =
  | "blueprint"    // full strategic blueprint (default)
  | "execution"    // step-by-step action plan, highly operational
  | "diagnostic"   // root-cause analysis & question generation
  | "critique"     // red-team the proposed approach
  | "validation";  // how to test/measure the plan

export type OutputFormat = "markdown" | "json" | "checklist" | "table";

export interface PromptPayload {
  rawInput: string;
  bottleneck?: BottleneckType | string;
  problemContext?: ProblemStatement;
  template?: Launch7Template;
  templates?: Launch7Template[];
  context?: Record<string, string | number | boolean>;
  goal?: string;
  entity?: EntityKind;
  tone?: "direct" | "coach" | "consultant" | "socratic";
  format?: OutputFormat;
  maxSections?: number;
}

export interface ExtractedIntent {
  entity: EntityKind;
  bottleneck: BottleneckType | string;
  goals: string[];
  constraints: string[];
  timeframe?: string;
  budget?: string;
  urgency: "low" | "medium" | "high" | "critical";
  topics: string[];
  confidence: number;
}

export interface AssembledPrompt {
  system: string;
  user: string;
  full: string;
  meta: {
    flavor: PromptFlavor;
    format: OutputFormat;
    extracted: ExtractedIntent;
    groundedTemplates: string[];
    missingSlots: string[];
  };
}

// ─────────────────────────────────────────────────────────────────
// SHARED ENGINE INSTANCE (for extraction grounding)
// ─────────────────────────────────────────────────────────────────

const engine = new SolutionsEngine()
  .registerDomain(new LeanBusinessDomain())
  .registerDomain(new EnterpriseDomain())
  .registerDomain(new IndividualGrowthDomain());

// ─────────────────────────────────────────────────────────────────
// 1. INTENT EXTRACTION — rule-based translator from raw user text
// ─────────────────────────────────────────────────────────────────

const ENTITY_PATTERNS: [RegExp, EntityKind][] = [
  [/\b(enterprise|fortune|corporate|company-wide|org of|organization with \d{3,})/i, "enterprise"],
  [/\b(my (startup|saas|agency|shop|store|studio|app|side hustle)|i (run|own|founded|started) a)/i, "entrepreneur"],
  [/\b(our (team|company|business|firm|brand)|we (need|want|are|have) .* (employees|customers|departments))/i, "business"],
  [/\b(i('| a)?m|my (life|career|job|resume|routine|schedule))/i, "individual"],
];

const GOAL_PATTERNS: RegExp[] = [
  /\b(want to|need to|trying to|goal is|aim to|looking to|hope to)\s+([^,.;!?]+)/gi,
  /\bso that\s+([^,.;!?]+)/gi,
];

const CONSTRAINT_PATTERNS: RegExp[] = [
  /(?:only|just|under|less than|max(?:imum)? of?)\s+\$?([\d,.]+(?:k|K|m|M)?)\s*(budget|dollars?|usd)?/i,
  /within\s+(\d+\s*(day|week|month|year)s?)/i,
  /(?:no|without|can't afford)\s+([^,.;!?]+)/i,
  /(?:don't|do not) have\s+([^,.;!?]+)/i,
];

const TIMEFRAME_RE = /(?:by|within|in|before|this|next)\s+((?:\d+\s*)?(?:day|week|month|quarter|year|monday|tuesday|wednesday|thursday|friday|january|february|march|april|may|june|july|august|september|october|november|december)[a-z]*)/i;
const BUDGET_RE = /\$?\s?([\d,.]+(?:k|K|m|M)?)\s*(?:usd|dollars?|budget)?/;

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "for", "with", "about", "that", "this",
  "have", "has", "had", "was", "were", "are", "is", "be", "been", "being",
  "i", "we", "you", "they", "he", "she", "it", "my", "our", "your", "their",
  "to", "of", "in", "on", "at", "by", "as", "from", "into", "through",
  "want", "need", "get", "make", "take", "help", "please",
]);

export function extractIntent(rawInput: string): ExtractedIntent {
  // Execute Firewall before ANY parsing occurs
  const text = sanitizeInput(rawInput).trim();
  const lower = text.toLowerCase();

  let entity: EntityKind = "unknown";
  for (const [re, kind] of ENTITY_PATTERNS) {
    if (re.test(text)) { entity = kind; break; }
  }

  let bottleneck: BottleneckType | string = classifyBottleneck(text);
  if (bottleneck === "other") {
    const ctx = engine.understand({ description: text });
    bottleneck = ctx.category;
  }

  const goals: string[] = [];
  for (const re of GOAL_PATTERNS) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const g = (m[2] ?? m[1]).trim();
      if (g.length > 3 && !goals.includes(g)) goals.push(g);
    }
  }
  if (goals.length === 0) {
    const first = text.split(/[.!?]/)[0]?.trim();
    if (first && first.length > 5) goals.push(first);
  }

  const constraints: string[] = [];
  for (const re of CONSTRAINT_PATTERNS) {
    const m = text.match(re);
    if (m) constraints.push(m[0].trim());
  }

  const tf = text.match(TIMEFRAME_RE);
  const bg = text.match(BUDGET_RE);

  const urgency: ExtractedIntent["urgency"] =
    /(asap|urgent|immediately|today|critical|emergency|dying)/i.test(text) ? "critical"
    : /(this week|soon|quickly|fast)/i.test(text) ? "high"
    : /(this month|eventually|someday)/i.test(text) ? "low"
    : "medium";

  const topics = lower
    .split(/\W+/)
    .filter(w => w.length > 3 && !STOPWORDS.has(w))
    .slice(0, 8);

  let filled = 1;
  if (entity !== "unknown") filled++;
  if (goals.length > 0) filled++;
  if (constraints.length > 0) filled++;
  if (tf) filled++;
  if (bg) filled++;
  const confidence = Math.min(1, filled / 5);

  return {
    entity, bottleneck, goals, constraints,
    timeframe: tf?.[1],
    budget: bg ? `$${bg[1]}` : undefined,
    urgency, topics, confidence,
  };
}

// ─────────────────────────────────────────────────────────────────
// 2. TEMPLATE GROUNDING
// ─────────────────────────────────────────────────────────────────

function groundTemplates(
  payload: PromptPayload,
  extracted: ExtractedIntent,
): { templates: Launch7Template[]; missingSlots: string[] } {
  const missingSlots: string[] = [];
  if (payload.templates?.length) return { templates: payload.templates, missingSlots };
  if (payload.template) return { templates: [payload.template], missingSlots };

  const ctx = payload.problemContext ?? engine.understand({ description: sanitizeInput(payload.rawInput) });
  // Pass ctx as an array to match the expected signature from solutionsEngine.ts
  const matched = matchTemplates([ctx], LAUNCH7_CATALOG, 2); 
  
  if (matched.length === 0) missingSlots.push("no matching template — grounding in general frameworks");

  return { templates: matched, missingSlots };
}

// ─────────────────────────────────────────────────────────────────
// 3. SECTION BUILDERS
// ─────────────────────────────────────────────────────────────────

const TONE_GUIDE: Record<NonNullable<PromptPayload["tone"]>, string> = {
  direct:      "Be terse and decisive. No preamble, no hedging. Lead with the answer.",
  coach:       "Be encouraging but honest. Push accountability; end each section with one concrete commitment.",
  consultant:  "Be structured and evidence-driven. State assumptions explicitly. Use frameworks and quantify where possible.",
  socratic:    "Answer through sharp diagnostic questions first, then propose hypotheses. Make the user think.",
};

const FLAVOR_SPEC: Record<PromptFlavor, { role: string; task: string; output: string }> = {
  blueprint: {
    role: "You are Launch7 Chief Strategy Engine — a world-class operator who has solved this exact class of problem across dozens of industries.",
    task: "Produce a complete strategic blueprint: diagnosis, root causes, ranked solutions (with tradeoffs), a 30/60/90-day execution plan, KPIs, and the top failure modes with mitigations.",
    output: "Markdown with these exact sections: ## Diagnosis ## Root Causes ## Ranked Solutions ## 30/60/90-Day Plan ## KPIs ## Failure Modes & Mitigations",
  },
  execution: {
    role: "You are a ruthless execution chief of staff. Your only job is converting strategy into shipped work.",
    task: "Convert the input into a week-by-week execution plan with named tasks, owners, time estimates, and a definition of done for each task. Flag anything blocked.",
    output: "Markdown checklist grouped by week. Every task: `- [ ] TASK (owner, ~hours, done when: …)`",
  },
  diagnostic: {
    role: "You are a diagnostic expert in the style of a world-class consultant and root-cause analyst.",
    task: "Analyze the problem's likely root causes (5-Whys style), list your assumptions, and generate the 5 sharpest questions that would most improve the diagnosis if answered.",
    output: "Markdown: ## Hypotheses (ranked by confidence) ## Assumptions ## The 5 Questions That Matter Most",
  },
  critique: {
    role: "You are a red-team reviewer. Your job is to find why this plan fails before reality does.",
    task: "Attack the proposed approach: identify hidden assumptions, second-order effects, missing stakeholders, cost underestimates, and execution risks. Then give a verdict: PIVOT / PERSEVERE / PAUSE, with conditions.",
    output: "Markdown: ## Fatal Flaws (if any) ## Hidden Assumptions ## Second-Order Effects ## Risks ## Verdict & Conditions",
  },
  validation: {
    role: "You are a measurement and experimentation expert.",
    task: "Design the cheapest set of experiments/tests that validate the core assumptions of this plan within its constraints. Define pass/fail thresholds and kill criteria.",
    output: "Markdown table: | Assumption | Cheapest Test | Cost | Time | Pass Threshold | Kill Criterion |",
  },
};

function buildContextBlock(payload: PromptPayload, extracted: ExtractedIntent): string {
  const lines: string[] = [];
  if (payload.problemContext) {
    lines.push(`Engine diagnosis: category=${payload.problemContext.category}, severity=${payload.problemContext.severity}, scope=${payload.problemContext.scope}`);
    const rc = (payload.problemContext.rootCauses ?? []).slice(0, 3);
    if (rc.length) lines.push(`Root-cause hypotheses: ${rc.map(r => `${r.statement} (${Math.round(r.confidence * 100)}%)`).join("; ")}`);
  }
  if (extracted.entity !== "unknown") lines.push(`Entity: ${extracted.entity}`);
  if (extracted.timeframe) lines.push(`Timeframe: ${extracted.timeframe}`);
  if (extracted.budget) lines.push(`Budget: ${extracted.budget}`);
  if (extracted.constraints.length) lines.push(`Constraints: ${extracted.constraints.join("; ")}`);
  if (payload.context) {
    for (const [k, v] of Object.entries(payload.context)) lines.push(`${k}: ${v}`);
  }
  if (extracted.urgency !== "medium") lines.push(`Urgency: ${extracted.urgency.toUpperCase()}`);
  return sanitizeInput(lines.join("\n"));
}

function buildTemplateBlock(templates: Launch7Template[]): string {
  if (templates.length === 0) return "";
  return templates
    .map(t => {
      const blueprint = JSON.parse(serializeToLaunch7(t));
      return `TEMPLATE [${t.id}] "${t.name}" (${t.vertical})\n${t.description}\nSteps:\n${t.steps.map(st => `  ${st.order}. ${st.description}`).join("\n")}\nKPIs: ${t.kpis.join(", ")}\nReference blueprint: ${JSON.stringify(blueprint.template)}`;
    })
    .join("\n\n");
}

function buildOutputContract(format: OutputFormat, maxSections?: number): string {
  const limit = maxSections ? ` Keep it under ${maxSections} major sections.` : "";
  switch (format) {
    case "json":     return `Respond with VALID JSON only — no prose outside the JSON.${limit}`;
    case "checklist":return `Respond as a flat checklist (markdown checkboxes). Every item must be verifiable.${limit}`;
    case "table":    return `Respond using markdown tables where structure helps.${limit}`;
    default:         return `Respond in markdown. No filler, no restating the prompt.${limit}`;
  }
}

// ─────────────────────────────────────────────────────────────────
// 4. MAIN ASSEMBLER
// ─────────────────────────────────────────────────────────────────

export function assemblePrompt(
  payload: PromptPayload,
  flavor: PromptFlavor = "blueprint",
): AssembledPrompt {
  const extracted = extractIntent(payload.rawInput);
  if (payload.bottleneck) extracted.bottleneck = payload.bottleneck;
  if (payload.entity) extracted.entity = payload.entity;

  const { templates, missingSlots } = groundTemplates(payload, extracted);
  const tone = payload.tone ?? "consultant";
  const format: OutputFormat = payload.format ?? "markdown";
  const spec = FLAVOR_SPEC[flavor];

  const system = [
    spec.role,
    tone && TONE_GUIDE[tone],
  ].filter(Boolean).join("\n");

  const user = [
    `# PROBLEM\n${sanitizeInput(payload.rawInput)}`,
    ``,
    `# TRANSLATED INTENT (extracted — trust but verify)`,
    `- Bottleneck: ${extracted.bottleneck}`,
    `- Goals: ${extracted.goals.join("; ") || "unspecified — infer the most likely goal and state your assumption"}`,
    `- Urgency: ${extracted.urgency}`,
    extracted.topics.length ? `- Topics: ${extracted.topics.join(", ")}` : null,
    ``,
    buildContextBlock(payload, extracted) ? `# CONTEXT\n${buildContextBlock(payload, extracted)}` : null,
    templates.length ? `# GROUNDING TEMPLATES\n${buildTemplateBlock(templates)}\nAnchor recommendations to these templates where they fit; extend beyond them where they don't.` : null,
    ``,
    `# TASK\n${spec.task}`,
    payload.goal ? `\nUser's stated goal: ${sanitizeInput(payload.goal)}` : null,
    ``,
    `# OUTPUT CONTRACT\n${spec.output}\n${buildOutputContract(format, payload.maxSections)}`,
    extracted.confidence < 0.6 ? `\n# NOTE\nThe input was ambiguous (extraction confidence ${(extracted.confidence * 100).toFixed(0)}%). State your key assumptions up front and proceed with the most probable interpretation.` : null,
  ].filter(part => part !== null && part !== "").join("\n");

  return {
    system,
    user,
    full: `${system}\n\n---\n\n${user}`,
    meta: {
      flavor, format, extracted,
      groundedTemplates: templates.map(t => t.id),
      missingSlots,
    },
  };
}

// ─────────────────────────────────────────────────────────────────
// 5. CONVENIENCE API
// ─────────────────────────────────────────────────────────────────

export function generateBlueprintPrompt(payload: PromptPayload): string {
  return assemblePrompt(payload, "blueprint").full;
}

export function promptFromText(rawInput: string, flavor: PromptFlavor = "blueprint"): string {
  return assemblePrompt({ rawInput }, flavor).full;
}

export function generatePromptSuite(payload: PromptPayload): {
  blueprint: AssembledPrompt;
  critique: AssembledPrompt;
  validation: AssembledPrompt;
} {
  return {
    blueprint:  assemblePrompt(payload, "blueprint"),
    critique:   assemblePrompt(payload, "critique"),
    validation: assemblePrompt(payload, "validation"),
  };
}

export type { Launch7Template } from "./solutionsEngine";
