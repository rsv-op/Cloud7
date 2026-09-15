// File: lib/solutionsEngine.ts

/**
 * VerticalForge Diagnostic & Logic Engine
 * Architecture: Zero-Cost Client-Side Compute | Cloud7.com
 */

export type BottleneckType = 
  | 'inventory_bookkeeping'
  | 'appointment_scheduling'
  | 'lead_qualification'
  | 'client_onboarding'
  | 'logistics_verification'; // Reserved for high-volume B2B/transport operations

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

// 1. Core Bottleneck Taxonomy & Pre-Engineered Catalog
export const LAUNCH7_CATALOG: Launch7Template[] = [
  // Inventory & Bookkeeping Solutions
  {
    id: 'tpl-inv-001',
    name: 'The Ledger Sync Engine',
    targetBottleneck: 'inventory_bookkeeping',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['Next.js', 'Google Sheets API', 'IndexedDB'],
    conversionFocus: 'Automated Stock Reconciliation & Zero-Touch Bookkeeping'
  },
  {
    id: 'tpl-inv-002',
    name: 'Boutique Operations Hub',
    targetBottleneck: 'inventory_bookkeeping',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['React', 'Vercel Edge', 'Local Storage State'],
    conversionFocus: 'Omnichannel POS Dashboard & Admin Eradication'
  },
  // Appointment & Intake Solutions
  {
    id: 'tpl-appt-001',
    name: 'Zero-Friction Booking Matrix',
    targetBottleneck: 'appointment_scheduling',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['Next.js', 'Google Calendar API', 'Serverless Cron'],
    conversionFocus: '24/7 Self-Serve Triage & Automated Reminders'
  },
  {
    id: 'tpl-appt-002',
    name: 'Clinic Pipeline Velocity',
    targetBottleneck: 'appointment_scheduling',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['Next.js App Router', 'Browser Native Notifications'],
    conversionFocus: 'No-Show Eradication & Patient Intake Automation'
  },
  // Lead Qualification Solutions
  {
    id: 'tpl-lead-001',
    name: 'Autonomous Lead Qualifier',
    targetBottleneck: 'lead_qualification',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['Next.js', 'Google AI Studio', 'Client-Side State'],
    conversionFocus: 'AI-Driven Triage & Pre-Call Objection Handling'
  },
  {
    id: 'tpl-lead-002',
    name: 'High-Ticket Conversion Funnel',
    targetBottleneck: 'lead_qualification',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['React', 'Vercel Analytics', 'Dynamic Routing'],
    conversionFocus: 'Frictionless VSL & Automated Deal Scoring'
  },
  // Universal / Fallback Solutions
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
    name: 'B2B Account Activation Portal',
    targetBottleneck: 'logistics_verification',
    deploymentSLA: '7-Day Guaranteed Turnaround',
    techStack: ['Next.js', 'IndexedDB', 'Vercel Edge Functions'],
    conversionFocus: 'Frictionless Vendor Onboarding & Verification Logistics'
  }
];

// 2. Client-Side Deterministic Math Formulas
export function calculateOperationalROI(metrics: OperationalMetrics): ReturnOnOperations {
  const WEEKS_PER_YEAR = 52;
  
  // Calculate raw time reclaimed
  const annualHoursRecovered = metrics.hoursWastedPerWeek * WEEKS_PER_YEAR;
  
  // Assume 75% of recovered time is successfully redirected to revenue-generating activities
  const revenueGeneratingHours = annualHoursRecovered * 0.75;
  
  // Estimate projected revenue lift based on the value of a deal 
  // (Baseline heuristic: 1 deal closed per 5 hours of focused effort)
  const dealsRecovered = revenueGeneratingHours / 5;
  const projectedAnnualRevenueLift = Math.round(dealsRecovered * metrics.averageDealValue);

  return {
    annualHoursRecovered,
    projectedAnnualRevenueLift,
    weeklyCapacityReclaimed: metrics.hoursWastedPerWeek
  };
}

// 3. Intelligent Solution Matching Algorithm
export function matchTemplates(bottleneck: BottleneckType): Launch7Template[] {
  const primaryMatches = LAUNCH7_CATALOG.filter(t => t.targetBottleneck === bottleneck);
  
  // Fallback to universal templates to ensure we always map exactly 3 solutions
  const universalTemplates = LAUNCH7_CATALOG.filter(
    t => t.id === 'tpl-gen-001' || t.id === 'tpl-gen-002'
  );
  
  const combined = [...primaryMatches, ...universalTemplates];
  
  // Return exactly Top 3 matches to strictly adhere to the Launch7 execution constraint
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
