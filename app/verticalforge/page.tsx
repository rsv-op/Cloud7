// File: app/verticalforge/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  calculateOperationalROI, 
  matchTemplates, 
  serializeToLaunch7, 
  BottleneckType,
  OperationalMetrics,
  ReturnOnOperations,
  Launch7Template
} from '../lib/solutionsEngine';

/**
 * VerticalForge Diagnostic Engine
 * Architecture: Next.js App Router | Client Component
 * Role: Real-time operational triage, ROI calculation, and state handoff.
 */

export default function VerticalForge() {
  const router = useRouter();
  
  // State Matrix
  const [metrics, setMetrics] = useState<OperationalMetrics>({
    hoursWastedPerWeek: 15,
    averageDealValue: 1500,
    bottleneck: 'appointment_scheduling',
  });

  const [roi, setRoi] = useState<ReturnOnOperations>({
    annualHoursRecovered: 0,
    projectedAnnualRevenueLift: 0,
    weeklyCapacityReclaimed: 0,
  });

  const [matchedSolutions, setMatchedSolutions] = useState<Launch7Template[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Real-Time Compute Engine
  useEffect(() => {
    const calculatedRoi = calculateOperationalROI(metrics);
    const solutions = matchTemplates(metrics.bottleneck);
    
    setRoi(calculatedRoi);
    setMatchedSolutions(solutions);
  }, [metrics]);

  const handleTransfer = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate slight processing delay for institutional authority feel
    setTimeout(() => {
      const destinationUrl = serializeToLaunch7(metrics, matchedSolutions);
      router.push(destinationUrl);
    }, 600);
  };

  return (
    <div className="vf-wrapper">
      <style dangerouslySetInnerHTML={{ __html: `
        .vf-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          width: 100%;
          animation: fade-in 0.6s ease-out;
        }
        
        .vf-header {
          margin-bottom: 3rem;
          text-align: center;
        }
        
        .vf-title {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        
        .vf-subtitle {
          color: var(--text-secondary);
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .vf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        
        @media (max-width: 900px) {
          .vf-grid { grid-template-columns: 1fr; }
        }
        
        .vf-panel {
          background-color: var(--bg-surface);
          border: var(--border-glass);
          border-radius: var(--border-radius-lg);
          padding: 2.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }
        
        .panel-title {
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 1rem;
        }
        
        .input-group {
          margin-bottom: 2rem;
        }
        
        .input-label {
          display: block;
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
          font-weight: 500;
        }
        
        .range-slider {
          width: 100%;
          accent-color: var(--accent-sky);
          cursor: pointer;
        }
        
        .value-display {
          display: flex;
          justify-content: space-between;
          color: var(--accent-sky);
          font-weight: 600;
          font-family: var(--font-space-grotesk);
          margin-top: 0.5rem;
          font-size: 1.125rem;
        }
        
        .select-input {
          width: 100%;
          padding: 1rem;
          background-color: var(--bg-void);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          border-radius: var(--border-radius-md);
          font-family: inherit;
          font-size: 1rem;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }
        
        .select-input:focus {
          border-color: var(--accent-sky);
        }
        
        .metric-card {
          background-color: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: var(--border-radius-md);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .metric-value {
          font-size: 2.5rem;
          color: var(--accent-emerald);
          font-family: var(--font-space-grotesk);
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.5rem;
        }
        
        .metric-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .matched-solutions {
          margin-top: 2.5rem;
        }
        
        .solution-badge {
          display: inline-block;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.2);
          color: var(--accent-sky);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .btn-transfer {
          width: 100%;
          background: var(--accent-emerald);
          color: #000;
          border: none;
          padding: 1.25rem;
          border-radius: var(--border-radius-md);
          font-weight: 700;
          font-size: 1rem;
          font-family: var(--font-inter);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          margin-top: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-transfer:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px -10px rgba(16, 185, 129, 0.5);
        }
        
        .btn-transfer:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
      `}} />

      <div className="vf-header">
        <h1 className="vf-title display-font">Operational Bottleneck Diagnostic</h1>
        <p className="vf-subtitle">
          Quantify administrative friction and map your operational deficit to 
          exact execution architectures. Data processes entirely in-browser.
        </p>
      </div>

      <div className="vf-grid">
        {/* Triage Inputs */}
        <div className="vf-panel">
          <h2 className="panel-title display-font">
            <span style={{color: 'var(--accent-sky)'}}>01.</span> Triage Parameters
          </h2>
          
          <div className="input-group">
            <label className="input-label">Primary Operational Bottleneck</label>
            <select 
              className="select-input"
              value={metrics.bottleneck}
              onChange={(e) => setMetrics({...metrics, bottleneck: e.target.value as BottleneckType})}
            >
              <option value="inventory_bookkeeping">Manual Inventory & Bookkeeping</option>
              <option value="appointment_scheduling">Appointment Scheduling & Intake</option>
              <option value="lead_qualification">Lead Qualification & Triage</option>
              <option value="client_onboarding">Client Onboarding & Portals</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Administrative Hours Wasted (Weekly)</label>
            <input 
              type="range" 
              min="1" 
              max="40" 
              step="1"
              value={metrics.hoursWastedPerWeek}
              onChange={(e) => setMetrics({...metrics, hoursWastedPerWeek: parseInt(e.target.value)})}
              className="range-slider"
            />
            <div className="value-display">
              <span>1 hr</span>
              <span>{metrics.hoursWastedPerWeek} hrs</span>
              <span>40+ hrs</span>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Average Deal / Client Value ($)</label>
            <input 
              type="range" 
              min="100" 
              max="10000" 
              step="100"
              value={metrics.averageDealValue}
              onChange={(e) => setMetrics({...metrics, averageDealValue: parseInt(e.target.value)})}
              className="range-slider"
            />
            <div className="value-display">
              <span>$100</span>
              <span>${metrics.averageDealValue.toLocaleString()}</span>
              <span>$10k+</span>
            </div>
          </div>
        </div>

        {/* Diagnostic Output & Router */}
        <div className="vf-panel" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <h2 className="panel-title display-font">
            <span style={{color: 'var(--accent-emerald)'}}>02.</span> Revenue Reclamation
          </h2>
          
          <div className="metric-card">
            <div className="metric-value">
              ${roi.projectedAnnualRevenueLift.toLocaleString()}
            </div>
            <div className="metric-label">Projected Annual Revenue Lift</div>
          </div>
          
          <div className="metric-card" style={{ background: 'rgba(56, 189, 248, 0.05)', borderColor: 'rgba(56, 189, 248, 0.2)' }}>
            <div className="metric-value" style={{ color: 'var(--accent-sky)' }}>
              {roi.annualHoursRecovered.toLocaleString()}
            </div>
            <div className="metric-label">Annual Hours Recovered</div>
          </div>

          <div className="matched-solutions">
            <label className="input-label">Matched Architectures</label>
            <div>
              {matchedSolutions.map(solution => (
                <span key={solution.id} className="solution-badge">
                  {solution.name}
                </span>
              ))}
            </div>
          </div>

          <button 
            className="btn-transfer"
            onClick={handleTransfer}
            disabled={isProcessing}
          >
            {isProcessing ? 'Serializing State...' : 'Initialize Launch7 Studio Protocol →'}
          </button>
        </div>
      </div>
    </div>
  );
}
