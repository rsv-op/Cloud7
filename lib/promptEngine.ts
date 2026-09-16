
// File: lib/promptEngine.ts

import { BottleneckType, LAUNCH7_CATALOG } from './solutionsEngine';

export interface PromptPayload {
  bottleneck: BottleneckType | string;
  hoursWasted: number;
  dealValue: number;
  templateIds: string[];
  rawNotes?: string; // Extensibility layer for future free-text client input
}

/**
 * Zero-Cost Client De-Identification Protocol (Local Firewall)
 * Role: Deterministic Regex engine to scrub PII before AI Studio dispatch.
 * Execution: Runs entirely in-browser. Zero API costs. Zero latency.
 */
const PII_PATTERNS = [
  { regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, token: '[REDACTED_EMAIL]' },
  { regex: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, token: '[REDACTED_PHONE]' },
  { regex: /\b(?:\d[ -]*?){13,16}\b/g, token: '[REDACTED_FINANCIAL_ID]' },
  { regex: /\b(?:SSN|Social Security)[\s:-]*\d{3}[-]?\d{2}[-]?\d{4}\b/gi, token: '[REDACTED_GOV_ID]' }
];

export function sanitizeInput(text: string): string {
  if (!text) return text;
  let sanitized = text;
  PII_PATTERNS.forEach(({ regex, token }) => {
    sanitized = sanitized.replace(regex, token);
  });
  return sanitized;
}

/**
 * Google AI Studio Blueprint Generator
 * Role: Synthesizes quantitative operational deficits into a deterministic execution prompt.
 */
export function generateBlueprintPrompt(payload: PromptPayload): string {
  const matchedTemplates = LAUNCH7_CATALOG.filter(t => payload.templateIds.includes(t.id));
  const templateNames = matchedTemplates.map(t => `- ${t.name} (Tech Stack: ${t.techStack.join(', ')})`).join('\n');
  
  // Execute Client-Side Sanitization Firewall
  const safeBottleneck = sanitizeInput(payload.bottleneck);
  const safeNotes = payload.rawNotes ? sanitizeInput(payload.rawNotes) : 'No additional diagnostic notes provided.';

  return `
SYSTEM ROLE:
Act as a Principal Software Architect for "Cloud7.com", an Automated Venture & Web Infrastructure Foundry.
Your objective is to generate a production-ready Next.js application blueprint to resolve a specific operational bottleneck.

OPERATIONAL DIAGNOSTIC DATA:
- Primary Friction Point: ${safeBottleneck.toUpperCase().replace('_', ' ')}
- Weekly Administrative Deficit: ${payload.hoursWasted} hours lost to manual tasks
- Average Unit/Deal Value: $${payload.dealValue}
- Annual Pipeline Hemorrhage: ${(payload.hoursWasted * 52 * 0.75 / 5) * payload.dealValue} (Projected Unrecovered Revenue)
- Additional Context (Sanitized): ${safeNotes}

TARGET ARCHITECTURE (RECOMMENDED TEMPLATES):
${templateNames}

EXECUTION DIRECTIVE:
1. Select the optimal template from the list above based on the diagnostic data.
2. Outline the complete Next.js file structure required to build this solution.
3. Define the zero-cost state management strategy (e.g., LocalStorage, IndexedDB) to avoid paid databases.
4. Draft the conversion copy for the hero section, framing the solution around pipeline velocity and automated triage.
5. Provide the exact, copy-pasteable TypeScript/React code for the primary interactive component (e.g., automated inventory sync, self-serve booking calendar, or client ledger).

CONSTRAINTS:
- No paid third-party APIs.
- No SaaS lock-in or recurring database costs.
- Output strictly in production-grade code with institutional authority copy.
`.trim();
}
