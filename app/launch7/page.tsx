
// File: app/launch7/page.tsx
"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { generateBlueprintPrompt } from '../../lib/promptEngine';
import { LAUNCH7_CATALOG, Launch7Template } from '../../lib/solutionsEngine';

/**
 * Launch7 Studio Execution Platform
 * Architecture: Next.js App Router | Client Component
 * Role: URL state hydration, catalog visualization, and AI Studio dispatch.
 */

function Launch7Content() {
  const searchParams = useSearchParams();
  const [hydrationComplete, setHydrationComplete] = useState(false);
  
  const [activeData, setActiveData] = useState({
    bottleneck: '',
    hours: 0,
    dealValue: 0,
    templates: [] as Launch7Template[],
    prompt: ''
  });

  const [copyStatus, setCopyStatus] = useState('Copy Blueprint & Launch AI Studio');

  useEffect(() => {
    // Read state from VerticalForge zero-dropoff serializer
    const bottleneck = searchParams.get('bottleneck') || 'Unknown';
    const hours = parseInt(searchParams.get('hours') || '0', 10);
    const dealValue = parseInt(searchParams.get('dealValue') || '0', 10);
    
    const templateIdsParam = searchParams.get('templates');
    const templateIds = templateIdsParam ? templateIdsParam.split(',') : [];
    
    const matchedTemplates = LAUNCH7_CATALOG.filter(t => templateIds.includes(t.id));
    
    const generatedPrompt = generateBlueprintPrompt({
      bottleneck,
      hoursWasted: hours,
      dealValue,
      templateIds
    });

    setActiveData({ bottleneck, hours, dealValue, templates: matchedTemplates, prompt: generatedPrompt });
    setHydrationComplete(true);
  }, [searchParams]);

  const handleDispatch = async () => {
    try {
      await navigator.clipboard.writeText(activeData.prompt);
      setCopyStatus('Copied! Redirecting to AI Studio...');
      
      // Execute 1-click dispatch to free-tier Google AI Studio
      setTimeout(() => {
        window.open('https://aistudio.google.com/app/prompts/new_chat', '_blank');
        setCopyStatus('Copy Blueprint & Launch AI Studio');
      }, 1500);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
      setCopyStatus('Clipboard Access Denied');
    }
  };

  if (!hydrationComplete) return null; // Prevent layout shift during client hydration

  return (
    <div className="l7-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        .l7-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 2rem;
          width: 100%;
          animation: fade-in 0.6s ease-out;
        }

        .l7-header {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 2rem;
          margin-bottom: 3.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }

        .l7-title {
          font-size: 2.75rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .l7-sla-badge {
          background: rgba(16, 185, 129, 0.1);
          color: var(--accent-emerald);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.5rem 1.25rem;
          border-radius: var(--border-radius-sm);
          font-weight: 600;
          font-size: 0.875rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 3rem;
        }

        @media (max-width: 900px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .l7-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
        }

        .data-panel {
          background-color: var(--bg-surface);
          border: var(--border-glass);
          border-radius: var(--border-radius-lg);
          padding: 2.5rem;
          height: fit-content;
        }

        .panel-heading {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 2rem;
          font-family: var(--font-space-grotesk);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 1.25rem;
        }

        .data-row {
          margin-bottom: 1.5rem;
        }

        .data-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .data-value {
          font-size: 1.125rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .highlight-value {
          color: var(--accent-sky);
          font-family: var(--font-space-grotesk);
          font-size: 1.35rem;
          font-weight: 700;
        }

        .catalog-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .template-card {
          border: 1px solid rgba(56, 189, 248, 0.3);
          background: rgba(56, 189, 248, 0.02);
          border-radius: var(--border-radius-md);
          padding: 2rem;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, background 0.2s ease;
        }
        
        .template-card:hover {
          transform: translateX(4px);
          background: rgba(56, 189, 248, 0.05);
        }

        .template-card::before {
          content: 'Matched Architecture';
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: var(--accent-sky);
          color: #000;
          padding: 0.35rem 0.75rem;
          border-radius: var(--border-radius-sm);
          font-weight: 700;
        }

        .tpl-title {
          font-size: 1.35rem;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-family: var(--font-space-grotesk);
          padding-right: 140px;
        }

        .tpl-focus {
          color: var(--text-secondary);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .tpl-stack {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .stack-tag {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          font-size: 0.75rem;
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          font-weight: 500;
        }

        .action-panel {
          margin-top: 3rem;
          padding-top: 3rem;
          border-top: var(--border-glass);
        }

        .btn-dispatch {
          width: 100%;
          background: linear-gradient(135deg, var(--accent-sky), #2563eb);
          color: #fff;
          border: none;
          padding: 1.35rem;
          border-radius: var(--border-radius-md);
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 20px rgba(56, 189, 248, 0.3);
        }

        .btn-dispatch:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(56, 189, 248, 0.4);
        }
      `}} />

      <div className="l7-header">
        <div>
          <h1 className="l7-title display-font">Execution Studio</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Automated blueprint synthesis & deployment dispatch.</p>
        </div>
        <div className="l7-sla-badge">7-Day Deployment SLA</div>
      </div>

      <div className="dashboard-grid">
        {/* Triage Data Hydration Panel */}
        <div className="data-panel">
          <h2 className="panel-heading">Ingested Telemetry</h2>
          
          <div className="data-row">
            <span className="data-label">Diagnosed Bottleneck</span>
            <span className="data-value" style={{textTransform: 'capitalize'}}>
              {activeData.bottleneck.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="data-row">
            <span className="data-label">Weekly Administrative Bleed</span>
            <span className="highlight-value">{activeData.hours} Hours</span>
          </div>

          <div className="data-row">
            <span className="data-label">Average Unit Value</span>
            <span className="highlight-value">${activeData.dealValue.toLocaleString()}</span>
          </div>
        </div>

        {/* Recommended Architectures & Dispatcher */}
        <div>
          <h2 className="panel-heading" style={{ border: 'none', padding: 0 }}>Target Architectures</h2>
          <div className="catalog-grid">
            {activeData.templates.map(tpl => (
              <div key={tpl.id} className="template-card">
                <h3 className="tpl-title">{tpl.name}</h3>
                <p className="tpl-focus">{tpl.conversionFocus}</p>
                <div className="tpl-stack">
                  {tpl.techStack.map(tech => (
                    <span key={tech} className="stack-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="action-panel">
            <button className="btn-dispatch" onClick={handleDispatch}>
              {copyStatus}
            </button>
            <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              100% Client Code Ownership. No Database Rent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Launch7Studio() {
  return (
    <Suspense fallback={
      <div style={{ padding: '5rem', color: '#94a3b8', textAlign: 'center', fontFamily: 'system-ui' }}>
        Hydrating Launch7 Telemetry...
      </div>
    }>
      <Launch7Content />
    </Suspense>
  );
}
