
// File: lib/solutionsEngine.ts

/**
 * VerticalForge Diagnostic & Logic Engine
 * Patch: Vercel Production Build - Deduplication Algorithm & Expanded Catalog
 */

export type BottleneckType = 
  | 'inventory_bookkeeping'
  | 'appointment_scheduling'
  | 'lead_qualification'
  | 'client_onboarding';

export interface OperationalMetrics {
  hoursWastedPerWeek: number;
  averageDealValue: number;
  bottleneck: BottleneckType;
}

export interface ReturnOnOperations {
  annualHoursRecovered: number;
  projectedAnnualRevenueLift: number;
  weeklyCapacityReclaimed: number;
}

export interface Launch7Template {
  id: string;
  name: string;
  targetBottleneck: BottleneckType;
  deploymentSLA: string;
  techStack: string[];
  conversionFocus: string;
}

// 1. Core Bottleneck Taxonomy & Expanded Template Catalog
export const LAUNCH7_CATALOG: Launch7Template[] = [
  {
    id: 'tpl-inv-001',
    name: 'The Ledger Sync Engine',
    targetBottleneck: 'inventory_bookkeeping',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['Next.js', 'Google Sheets API', 'IndexedDB'],
    conversionFocus: 'Automated Stock Reconciliation & Zero-Touch Bookkeeping'
  },
  {
    id: 'tpl-b2b-001',
    name: 'B2B Account Activation Portal',
    targetBottleneck: 'client_onboarding',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['Next.js App Router', 'Edge Computing', 'Client-Side State'],
    conversionFocus: 'Frictionless Logistics Verification & Automated Account Provisioning'
  },
  {
    id: 'tpl-appt-001',
    name: 'Zero-Friction Booking Matrix',
    targetBottleneck: 'appointment_scheduling',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['Next.js', 'Google Calendar API', 'Serverless Cron'],
    conversionFocus: '24/7 Self-Serve Triage & Automated Reminders'
  },
  {
    id: 'tpl-lead-001',
    name: 'Autonomous Lead Qualifier',
    targetBottleneck: 'lead_qualification',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['Next.js', 'Google AI Studio (Gemini API)', 'Client-Side State'],
    conversionFocus: 'AI-Driven Triage & Pre-Call Objection Handling'
  },
  {
    id: 'tpl-gen-001',
    name: 'The Universal Foundry',
    targetBottleneck: 'client_onboarding',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    conversionFocus: 'Institutional Authority & Automated Client Portals'
  },
  {
    id: 'tpl-gen-002',
    name: 'Operations Command Center',
    targetBottleneck: 'inventory_bookkeeping',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['React', 'Vercel Analytics', 'Dynamic Routing'],
    conversionFocus: 'Centralized Administrative Dashboarding'
  }
];

// 2. Client-Side Deterministic Math Formulas
export function calculateOperationalROI(metrics: OperationalMetrics): ReturnOnOperations {
  const WEEKS_PER_YEAR = 52;
  
  const annualHoursRecovered = metrics.hoursWastedPerWeek * WEEKS_PER_YEAR;
  const revenueGeneratingHours = annualHoursRecovered * 0.75;
  const dealsRecovered = revenueGeneratingHours / 5;
  const projectedAnnualRevenueLift = Math.round(dealsRecovered * metrics.averageDealValue);

  return {
    annualHoursRecovered,
    projectedAnnualRevenueLift,
    weeklyCapacityReclaimed: metrics.hoursWastedPerWeek
  };
}

// 3. Intelligent Solution Matching Algorithm (Strict Deduplication)
export function matchTemplates(bottleneck: BottleneckType): Launch7Template[] {
  // Pull exact matches first
  const primaryMatches = LAUNCH7_CATALOG.filter(t => t.targetBottleneck === bottleneck);
  
  // Cache IDs to strictly prevent downstream duplication
  const matchedIds = new Set(primaryMatches.map(t => t.id));
  
  // Pad remaining slots from the broader catalog without repeating IDs
  const fallbackMatches = LAUNCH7_CATALOG.filter(t => !matchedIds.has(t.id));
  
  const combined = [...primaryMatches, ...fallbackMatches];
  
  // Return exactly Top 3 distinct architectures
  return combined.slice(0, 3);
}

// 4. Zero-Dropoff URL Serializer
export function serializeToLaunch7(metrics: OperationalMetrics, matchedTemplates: Launch7Template[]): string {
  const params = new URLSearchParams();
  
  params.set('bottleneck', metrics.bottleneck);
  params.set('hours', metrics.hoursWastedPerWeek.toString());
  params.set('dealValue', metrics.averageDealValue.toString());
  
  const templateIds = matchedTemplates.map(t => t.id).join(',');
  params.set('templates', templateIds);
  
  return `/launch7?${params.toString()}`;
}
