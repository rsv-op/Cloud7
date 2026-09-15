
// File: lib/promptEngine.ts

import { BottleneckType, LAUNCH7_CATALOG } from './solutionsEngine';

export interface PromptPayload {
  bottleneck: BottleneckType | string;
  hoursWasted: number;
  dealValue: number;
  templateIds: string[];
}

/**
 * Google AI Studio Blueprint Generator
 * Architecture: Zero-Cost Prompt Synthesis | Cloud7 Ecosystem
 * Role: Translates quantitative operational deficits into a deterministic execution prompt.
 */
export function generateBlueprintPrompt(payload: PromptPayload): string {
  const matchedTemplates = LAUNCH7_CATALOG.filter(t => payload.templateIds.includes(t.id));
  const templateNames = matchedTemplates.map(t => `- ${t.name} (Tech Stack: ${t.techStack.join(', ')})`).join('\n');

  return `
SYSTEM ROLE:
Act as a Principal Software Architect for "Cloud7.com", an Automated Venture & Web Infrastructure Foundry.
Your objective is to generate a production-ready Next.js application blueprint to resolve a specific operational bottleneck.

OPERATIONAL DIAGNOSTIC DATA:
- Primary Friction Point: ${payload.bottleneck.toUpperCase().replace(/_/g, ' ')}
- Weekly Administrative Deficit: ${payload.hoursWasted} hours lost to manual tasks
- Average Unit/Deal Value: $${payload.dealValue}
- Annual Pipeline Hemorrhage: $${Math.round((payload.hoursWasted * 52 * 0.75 / 5) * payload.dealValue)} (Projected Unrecovered Revenue)

TARGET ARCHITECTURE (RECOMMENDED TEMPLATES):
${templateNames}

EXECUTION DIRECTIVE:
1. Select the optimal template from the list above based on the diagnostic data.
2. Outline the complete Next.js file structure required to build this solution.
3. Define the zero-cost state management strategy (e.g., LocalStorage, IndexedDB) to avoid paid databases.
4. Draft the conversion copy for the hero section, framing the solution around pipeline velocity and automated triage.
5. Provide the exact, copy-pasteable TypeScript/React code for the primary interactive component.

CONSTRAINTS:
- No paid third-party APIs.
- No SaaS lock-in or recurring database costs.
- Output strictly in production-grade code with institutional authority copy.
`.trim();
}
